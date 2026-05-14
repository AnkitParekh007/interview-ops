import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StudioApiService } from '../../services/studio-api.service';
import { FeaturePlan } from '../../core/models/studio.models';
import { PricingCardComponent } from './pricing-card.component';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [PricingCardComponent, RouterLink],
  template: `
    <div class="pricing-page">
      <div class="pricing-header">
        <h1 class="pricing-title">Simple, transparent pricing</h1>
        <p class="pricing-sub">Start free. Upgrade when you need more.</p>
        <div class="pricing-notice">
          Payments are not enabled yet. Pricing shown for launch planning and early-access feedback.
        </div>
      </div>
      <div class="plans-grid">
        @for (plan of plans(); track plan.id) {
          <app-pricing-card [plan]="plan" />
        }
      </div>
      <div class="pricing-footer">
        <p>All plans include the open-source CLI and local-first data storage.</p>
        <p>No data leaves your machine. No account required for Free plan.</p>
        <a routerLink="/premium-packs" class="packs-link">View Premium Question Packs →</a>
      </div>
    </div>
  `,
  styleUrl: './pricing-page.component.css',
})
export class PricingPageComponent implements OnInit {
  plans = signal<FeaturePlan[]>([]);

  constructor(private api: StudioApiService) {}

  ngOnInit(): void {
    this.api.getPlans().subscribe((p) => this.plans.set(p));
  }
}
