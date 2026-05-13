export function slug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function sessionId(track: string, mode: string): string {
  const date = new Date().toISOString().split('T')[0];
  return `${date}-${slug(track)}-${slug(mode)}`;
}
