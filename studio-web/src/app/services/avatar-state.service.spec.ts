import { TestBed } from '@angular/core/testing';
import { AvatarStateService } from './avatar-state.service';

describe('AvatarStateService', () => {
  let service: AvatarStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvatarStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default to idle state', () => {
    expect(service.state()).toBe('idle');
  });

  it('should return correct tip for idle state', () => {
    service.setState('idle');
    expect(service.tip()).toContain('Select a track and mode');
  });

  it('should return correct tip for greeting state', () => {
    service.setState('greeting');
    expect(service.tip()).toContain('Welcome');
  });

  it('should return correct tip for thinking state', () => {
    service.setState('thinking');
    expect(service.tip()).toContain('Analyzing');
  });

  it('should return correct tip for celebrating state', () => {
    service.setState('celebrating');
    expect(service.tip()).toContain('Interview complete');
  });
});
