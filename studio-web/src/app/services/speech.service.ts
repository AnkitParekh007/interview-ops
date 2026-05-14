import { Injectable, NgZone, signal } from '@angular/core';

export type SpeechState = 'idle' | 'listening' | 'error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySpeechRecognition = any;

@Injectable({ providedIn: 'root' })
export class SpeechService {
  readonly isSupported: boolean;
  readonly state = signal<SpeechState>('idle');
  readonly interimText = signal<string>('');

  private recognition: AnySpeechRecognition = null;

  constructor(private zone: NgZone) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    const SpeechAPI = win['SpeechRecognition'] ?? win['webkitSpeechRecognition'];
    this.isSupported = !!SpeechAPI;

    if (SpeechAPI) {
      this.recognition = new SpeechAPI();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 1;
    }
  }

  /** Start listening. `onFinal` is called each time a sentence is confirmed. */
  start(onFinal: (text: string) => void): void {
    const rec = this.recognition;
    if (!rec || this.state() === 'listening') return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (event: any) => {
      this.zone.run(() => {
        let interim = '';
        let finalChunk = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0].transcript;
          if (result.isFinal) {
            finalChunk += text;
          } else {
            interim += text;
          }
        }

        this.interimText.set(interim);

        if (finalChunk.trim()) {
          onFinal(finalChunk.trim());
        }
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onerror = (event: any) => {
      this.zone.run(() => {
        // 'aborted' fires when we call stop() ourselves — not a real error
        if (event.error !== 'aborted') {
          this.state.set('error');
        }
        this.interimText.set('');
      });
    };

    rec.onend = () => {
      this.zone.run(() => {
        this.state.set('idle');
        this.interimText.set('');
      });
    };

    rec.start();
    this.state.set('listening');
    this.interimText.set('');
  }

  stop(): void {
    if (this.recognition && this.state() === 'listening') {
      this.recognition.stop();
      // onend will set state to idle
    }
  }

  toggle(onFinal: (text: string) => void): void {
    if (this.state() === 'listening') {
      this.stop();
    } else {
      this.start(onFinal);
    }
  }
}
