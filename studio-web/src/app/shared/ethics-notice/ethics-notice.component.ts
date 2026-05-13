import { Component } from '@angular/core';

@Component({
  selector: 'app-ethics-notice',
  standalone: true,
  template: `
    <div class="ethics-notice">
      <span class="ethics-icon">&#x1F512;</span>
      <div class="ethics-text">
        <strong>Practice-only mode</strong>
        <p>Use InterviewOps before interviews to build real skill.</p>
        <p>Do not use it during live interviews.</p>
        <p>No hidden assistance. No real-time cheating.</p>
      </div>
    </div>
  `,
  styleUrl: './ethics-notice.component.css',
})
export class EthicsNoticeComponent {}
