import { Component, Input } from '@angular/core';
import { PremiumPack } from '../../core/models/studio.models';

@Component({
  selector: 'app-premium-pack-card',
  standalone: true,
  template: `
    <div class="pack-card">
      <div class="pack-header">
        <span class="pack-name">{{ pack.name }}</span>
        <span class="pack-price">\${{ pack.price }}</span>
      </div>
      <p class="pack-desc">{{ pack.description }}</p>
      <div class="pack-meta">
        <span class="meta-item">{{ pack.questionsCount }} questions</span>
        @for (track of pack.includedTracks; track track) {
          <span class="tag">{{ track }}</span>
        }
      </div>
      <div class="pack-footer">
        <span class="coming-soon-badge">Coming Soon</span>
        <button class="notify-btn">Notify Me</button>
      </div>
    </div>
  `,
  styleUrl: './premium-pack-card.component.css',
})
export class PremiumPackCardComponent {
  @Input({ required: true }) pack!: PremiumPack;
}
