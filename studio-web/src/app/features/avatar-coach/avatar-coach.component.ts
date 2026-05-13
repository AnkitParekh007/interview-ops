import { Component } from '@angular/core';
import { AvatarStateService } from '../../services/avatar-state.service';
import { AvatarHumanComponent } from './avatar-human/avatar-human.component';
import { EthicsNoticeComponent } from '../../shared/ethics-notice/ethics-notice.component';

@Component({
  selector: 'app-avatar-coach',
  standalone: true,
  imports: [AvatarHumanComponent, EthicsNoticeComponent],
  template: `
    <aside class="coach">
      <div class="avatar-area">
        <app-avatar-human [state]="avatarState.state()" />
      </div>
      <div class="state-label">{{ getStateLabel() }}</div>
      <div class="tip-box">{{ avatarState.tip() }}</div>
      <div class="scores">
        <div class="score-row">
          <span class="score-label">Confidence</span>
          <div class="score-bar"><div class="score-fill" [style.width.%]="68"></div></div>
        </div>
        <div class="score-row">
          <span class="score-label">Clarity</span>
          <div class="score-bar"><div class="score-fill fill-cyan" [style.width.%]="72"></div></div>
        </div>
        <div class="score-row">
          <span class="score-label">Depth</span>
          <div class="score-bar"><div class="score-fill fill-green" [style.width.%]="55"></div></div>
        </div>
      </div>
      <div class="ethics-area">
        <app-ethics-notice />
      </div>
    </aside>
  `,
  styleUrl: './avatar-coach.component.css',
})
export class AvatarCoachComponent {
  constructor(public avatarState: AvatarStateService) {}

  getStateLabel(): string {
    const labels: Record<string, string> = {
      idle: 'Ready',
      greeting: 'Greeting...',
      listening: 'Listening...',
      thinking: 'Thinking...',
      speaking: 'Speaking...',
      encouraging: 'Encouraging',
      challenging: 'Challenging',
      scoring: 'Scoring...',
      celebrating: 'Complete!',
    };
    return labels[this.avatarState.state()] ?? 'Ready';
  }
}
