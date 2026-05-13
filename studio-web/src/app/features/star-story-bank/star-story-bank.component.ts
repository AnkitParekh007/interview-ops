import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StarStory } from '../../core/models/studio.models';
import { StudioApiService } from '../../services/studio-api.service';
import { StarStoryCardComponent } from './star-story-card.component';
import { StarStoryEditorComponent, StarStoryFormData } from './star-story-editor.component';

@Component({
  selector: 'app-star-story-bank',
  standalone: true,
  imports: [StarStoryCardComponent, StarStoryEditorComponent],
  template: `
    <div class="star-page">
      <div class="star-container">
        <div class="star-header">
          <div>
            <h1 class="star-title">STAR Story Bank</h1>
            <p class="star-subtitle">Organize your behavioral interview stories using the STAR framework.</p>
          </div>
          <div class="header-actions">
            <button class="back-btn" (click)="goBack()">Back to Studio</button>
            @if (!showEditor()) {
              <button class="add-btn" (click)="openNewEditor()">Add Story</button>
            }
          </div>
        </div>

        @if (showEditor()) {
          <app-star-story-editor
            [story]="editingStory()"
            (save)="onSave($event)"
            (cancel)="closeEditor()"
          />
        }

        <div class="stories-grid">
          @for (story of stories(); track story.id) {
            <app-star-story-card
              [story]="story"
              (edit)="openEditEditor($event)"
              (remove)="onDelete($event)"
            />
          }
        </div>

        @if (stories().length === 0 && !showEditor()) {
          <div class="empty-state">
            <p>No stories yet. Click "Add Story" to create your first STAR story.</p>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './star-story-bank.component.css',
})
export class StarStoryBankComponent implements OnInit {
  stories = signal<StarStory[]>([]);
  showEditor = signal(false);
  editingStory = signal<StarStory | null>(null);

  constructor(
    private api: StudioApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStories();
  }

  private loadStories(): void {
    this.api.getStarStories().subscribe({
      next: (stories) => this.stories.set(stories),
    });
  }

  openNewEditor(): void {
    this.editingStory.set(null);
    this.showEditor.set(true);
  }

  openEditEditor(story: StarStory): void {
    this.editingStory.set(story);
    this.showEditor.set(true);
  }

  closeEditor(): void {
    this.showEditor.set(false);
    this.editingStory.set(null);
  }

  onSave(event: { data: StarStoryFormData; id?: string }): void {
    const payload = {
      title: event.data.title,
      category: event.data.category,
      situation: event.data.situation,
      task: event.data.task,
      action: event.data.action,
      result: event.data.result,
      metrics: event.data.metrics || undefined,
      tags: event.data.tags,
    };

    if (event.id) {
      this.api.updateStarStory(event.id, payload).subscribe({
        next: () => {
          this.closeEditor();
          this.loadStories();
        },
      });
    } else {
      this.api.createStarStory(payload as Omit<StarStory, 'id' | 'createdAt' | 'updatedAt'>).subscribe({
        next: () => {
          this.closeEditor();
          this.loadStories();
        },
      });
    }
  }

  onDelete(id: string): void {
    this.api.deleteStarStory(id).subscribe({
      next: () => this.loadStories(),
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
