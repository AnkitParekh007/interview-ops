import { Component, Input } from '@angular/core';
import { FeaturePlan } from '../../core/models/studio.models';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  template: `
    <div class="card" [class.recommended]="plan.recommended">
      @if (plan.recommended) {
        <div class="recommended-badge">Recommended</div>
      }
      <div class="plan-name">{{ plan.name }}</div>
      <div class="plan-price">
        @if (plan.priceOneTime) {
          <span class="price">\${{ plan.priceOneTime }}</span>
          <span class="price-period">one-time</span>
        } @else if (plan.priceMonthly) {
          <span class="price">\${{ plan.priceMonthly }}</span>
          <span class="price-period">/month</span>
          @if (plan.priceYearly) {
            <span class="price-yearly">or \${{ plan.priceYearly }}/yr</span>
          }
        } @else {
          <span class="price">Free</span>
        }
      </div>
      <p class="plan-desc">{{ plan.description }}</p>
      <ul class="feature-list">
        @for (f of plan.features; track f) {
          <li class="feature-item">
            <span class="check">✓</span>
            {{ f }}
          </li>
        }
      </ul>
      <button class="plan-cta" [class.cta-free]="plan.id === 'free'" [class.cta-paid]="plan.id !== 'free'">
        @if (plan.id === 'free') { Start Free Locally }
        @else if (plan.id === 'lifetime') { Join Early Access }
        @else { Upgrade — Coming Soon }
      </button>
    </div>
  `,
  styleUrl: './pricing-card.component.css',
})
export class PricingCardComponent {
  @Input({ required: true }) plan!: FeaturePlan;
}
