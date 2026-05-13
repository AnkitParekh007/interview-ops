import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StarStory } from '../../core/models/studio.models';

@Component({
  selector: 'app-star-story-card',
  standalone: true,
  template: `
    <div class="story-card" (click)="edit.emit(story)">
      <div class="card-header">
        <span class="category-badge" [class]="'cat-' + story.category">{{ story.category }}</span>
        <button class="delete-btn" (click)="onDelete($event)">x</button>
      </div>
      <h3 class="card-title">{{ story.title }}</h3>
      <div class="card-tags">
        @for (tag of story.tags; track tag) {
          <span class="tag">{{ tag }}</span>
        }
      </div>
      @if (story.metrics) {
        <p class="card-metrics">{{ story.metrics }}</p>
      }
    </div>
  `,
  styleUrl: './star-story-card.component.css',
})
export class StarStoryCardComponent {
  @Input({ required: true }) story!: StarStory;
  @Output() edit = new EventEmitter<StarStory>();
  @Output() remove = new EventEmitter<string>();

  onDelete(event: Event): void {
    event.stopPropagation();
    this.remove.emit(this.story.id);
  }
}
