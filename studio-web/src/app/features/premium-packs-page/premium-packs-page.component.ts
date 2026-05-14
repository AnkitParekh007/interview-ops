import { Component, OnInit, signal } from '@angular/core';
import { StudioApiService } from '../../services/studio-api.service';
import { PremiumPack } from '../../core/models/studio.models';
import { PremiumPackCardComponent } from './premium-pack-card.component';

@Component({
  selector: 'app-premium-packs-page',
  standalone: true,
  imports: [PremiumPackCardComponent],
  template: `
    <div class="packs-page">
      <div class="packs-header">
        <h1 class="packs-title">Premium Question Packs</h1>
        <p class="packs-sub">Deep-dive interview preparation packs for specific roles and companies.</p>
        <div class="coming-soon-notice">All packs are currently in development. Join the waitlist to be notified at launch.</div>
      </div>
      <div class="packs-grid">
        @for (pack of packs(); track pack.id) {
          <app-premium-pack-card [pack]="pack" />
        }
      </div>
    </div>
  `,
  styleUrl: './premium-packs-page.component.css',
})
export class PremiumPacksPageComponent implements OnInit {
  packs = signal<PremiumPack[]>([]);
  constructor(private api: StudioApiService) {}
  ngOnInit(): void { this.api.getPremiumPacks().subscribe((p) => this.packs.set(p)); }
}
