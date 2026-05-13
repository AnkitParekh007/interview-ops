import { Component, Input } from '@angular/core';
import { AvatarState } from '../../../core/models/studio.models';

@Component({
  selector: 'app-avatar-human',
  standalone: true,
  template: `
    <div class="avatar-container" [class]="'avatar--' + state">
      <svg viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" class="avatar-svg">
        <!-- Glow effect behind head -->
        <defs>
          <radialGradient id="headGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" class="glow-inner" />
            <stop offset="100%" class="glow-outer" />
          </radialGradient>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#374151" />
            <stop offset="100%" stop-color="#1f2937" />
          </linearGradient>
        </defs>

        <!-- Glow circle -->
        <circle cx="100" cy="100" r="65" fill="url(#headGlow)" class="glow-ring" />

        <!-- Body / Shoulders -->
        <path
          d="M 40 250 Q 40 210, 70 200 Q 100 190, 100 190 Q 100 190, 130 200 Q 160 210, 160 250 L 160 280 L 40 280 Z"
          fill="url(#bodyGrad)"
          class="body"
        />

        <!-- Neck -->
        <rect x="88" y="158" width="24" height="35" rx="6" fill="#d4a574" class="neck" />

        <!-- Head -->
        <ellipse cx="100" cy="105" rx="48" ry="55" fill="#e0b08a" class="head" />

        <!-- Hair -->
        <path
          d="M 52 95 Q 52 55, 100 50 Q 148 55, 148 95 Q 145 70, 100 65 Q 55 70, 52 95 Z"
          fill="#2d1b0e"
          class="hair"
        />

        <!-- Eyes -->
        <ellipse cx="80" cy="105" rx="5" ry="5.5" fill="#1a1a2e" class="eye eye-left" />
        <ellipse cx="120" cy="105" rx="5" ry="5.5" fill="#1a1a2e" class="eye eye-right" />

        <!-- Eye highlights -->
        <circle cx="82" cy="103" r="1.5" fill="white" opacity="0.8" />
        <circle cx="122" cy="103" r="1.5" fill="white" opacity="0.8" />

        <!-- Eyebrows -->
        <path d="M 70 94 Q 80 90, 88 93" stroke="#2d1b0e" stroke-width="2.5" fill="none" stroke-linecap="round" class="brow brow-left" />
        <path d="M 112 93 Q 120 90, 130 94" stroke="#2d1b0e" stroke-width="2.5" fill="none" stroke-linecap="round" class="brow brow-right" />

        <!-- Nose -->
        <path d="M 100 108 Q 96 118, 98 122 Q 100 124, 102 122 Q 104 118, 100 108" fill="#c89b6e" opacity="0.6" />

        <!-- Mouth -->
        <path
          d="M 88 132 Q 100 138, 112 132"
          stroke="#b07856"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          class="mouth"
        />

        <!-- Thinking dots (hidden by default) -->
        <g class="thinking-dots">
          <circle cx="80" cy="35" r="4" fill="var(--accent, #7c3aed)" opacity="0.7" />
          <circle cx="100" cy="28" r="4" fill="var(--accent, #7c3aed)" opacity="0.7" />
          <circle cx="120" cy="35" r="4" fill="var(--accent, #7c3aed)" opacity="0.7" />
        </g>

        <!-- Sparkles (hidden by default) -->
        <g class="sparkles">
          <text x="40" y="60" font-size="14" class="sparkle s1">&#x2728;</text>
          <text x="150" y="50" font-size="14" class="sparkle s2">&#x2728;</text>
          <text x="155" y="130" font-size="12" class="sparkle s3">&#x2728;</text>
          <text x="35" y="140" font-size="12" class="sparkle s4">&#x2728;</text>
        </g>

        <!-- Collar detail -->
        <path
          d="M 82 195 L 100 210 L 118 195"
          stroke="#4b5563"
          stroke-width="1.5"
          fill="none"
        />
      </svg>
    </div>
  `,
  styleUrl: './avatar-human.component.css',
})
export class AvatarHumanComponent {
  @Input() state: AvatarState = 'idle';
}
