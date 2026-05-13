import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StarStory } from '../../core/models/studio.models';

export interface StarStoryFormData {
  title: string;
  category: StarStory['category'];
  situation: string;
  task: string;
  action: string;
  result: string;
  metrics: string;
  tags: string[];
}

@Component({
  selector: 'app-star-story-editor',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="editor">
      <h3 class="editor-title">{{ editingId ? 'Edit Story' : 'New STAR Story' }}</h3>

      <div class="field">
        <label class="field-label">Title</label>
        <input class="field-input" [(ngModel)]="form.title" placeholder="e.g., Led Angular migration" />
      </div>

      <div class="field">
        <label class="field-label">Category</label>
        <select class="field-input" [(ngModel)]="form.category">
          @for (cat of categories; track cat) {
            <option [value]="cat">{{ cat }}</option>
          }
        </select>
      </div>

      <div class="field">
        <label class="field-label">Situation</label>
        <textarea class="field-textarea" [(ngModel)]="form.situation" placeholder="What was the context?" rows="3"></textarea>
      </div>

      <div class="field">
        <label class="field-label">Task</label>
        <textarea class="field-textarea" [(ngModel)]="form.task" placeholder="What was your responsibility?" rows="3"></textarea>
      </div>

      <div class="field">
        <label class="field-label">Action</label>
        <textarea class="field-textarea" [(ngModel)]="form.action" placeholder="What did you do?" rows="3"></textarea>
      </div>

      <div class="field">
        <label class="field-label">Result</label>
        <textarea class="field-textarea" [(ngModel)]="form.result" placeholder="What was the outcome?" rows="3"></textarea>
      </div>

      <div class="field">
        <label class="field-label">Metrics (optional)</label>
        <input class="field-input" [(ngModel)]="form.metrics" placeholder="e.g., 40% fewer bugs, 2x velocity" />
      </div>

      <div class="field">
        <label class="field-label">Tags (comma-separated)</label>
        <input class="field-input" [(ngModel)]="tagsInput" placeholder="e.g., angular, migration, leadership" />
      </div>

      <div class="editor-actions">
        <button class="save-btn" (click)="onSave()">{{ editingId ? 'Update' : 'Save' }}</button>
        <button class="cancel-btn" (click)="cancel.emit()">Cancel</button>
      </div>
    </div>
  `,
  styleUrl: './star-story-editor.component.css',
})
export class StarStoryEditorComponent implements OnInit {
  @Input() story: StarStory | null = null;
  @Output() save = new EventEmitter<{ data: StarStoryFormData; id?: string }>();
  @Output() cancel = new EventEmitter<void>();

  editingId: string | null = null;
  tagsInput = '';

  categories: StarStory['category'][] = [
    'leadership', 'conflict', 'failure', 'ownership',
    'impact', 'technical-depth', 'collaboration', 'ambiguity',
  ];

  form: StarStoryFormData = {
    title: '',
    category: 'leadership',
    situation: '',
    task: '',
    action: '',
    result: '',
    metrics: '',
    tags: [],
  };

  ngOnInit(): void {
    if (this.story) {
      this.editingId = this.story.id;
      this.form = {
        title: this.story.title,
        category: this.story.category,
        situation: this.story.situation,
        task: this.story.task,
        action: this.story.action,
        result: this.story.result,
        metrics: this.story.metrics ?? '',
        tags: [...this.story.tags],
      };
      this.tagsInput = this.story.tags.join(', ');
    }
  }

  onSave(): void {
    this.form.tags = this.tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
    this.save.emit({ data: this.form, id: this.editingId ?? undefined });
  }
}
