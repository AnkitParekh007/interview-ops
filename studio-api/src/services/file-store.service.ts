import { readdir, readFile, writeFile, unlink, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

export class FileStore<T extends { id: string }> {
  constructor(private dir: string) {}

  private async ensureDir(): Promise<void> {
    await mkdir(this.dir, { recursive: true });
  }

  private filePath(id: string): string {
    return join(this.dir, `${id}.json`);
  }

  async getAll(): Promise<T[]> {
    await this.ensureDir();
    let files: string[];
    try {
      files = await readdir(this.dir);
    } catch {
      return [];
    }
    const items: T[] = [];
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      try {
        const raw = await readFile(join(this.dir, file), 'utf-8');
        items.push(JSON.parse(raw) as T);
      } catch {
        // skip corrupted files
      }
    }
    return items;
  }

  async get(id: string): Promise<T | undefined> {
    await this.ensureDir();
    try {
      const raw = await readFile(this.filePath(id), 'utf-8');
      return JSON.parse(raw) as T;
    } catch {
      return undefined;
    }
  }

  async save(item: T): Promise<void> {
    await this.ensureDir();
    await writeFile(this.filePath(item.id), JSON.stringify(item, null, 2), 'utf-8');
  }

  async delete(id: string): Promise<void> {
    await this.ensureDir();
    try {
      await unlink(this.filePath(id));
    } catch {
      // file may not exist
    }
  }
}
