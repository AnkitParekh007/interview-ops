import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvatarHumanComponent } from './avatar-human.component';

describe('AvatarHumanComponent', () => {
  let fixture: ComponentFixture<AvatarHumanComponent>;
  let component: AvatarHumanComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarHumanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarHumanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to idle state', () => {
    expect(component.state).toBe('idle');
  });

  it('should apply correct CSS class for state', () => {
    component.state = 'thinking';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const container = el.querySelector('.avatar-container');
    expect(container?.classList.contains('avatar--thinking')).toBeTrue();
  });

  it('should apply speaking class', () => {
    component.state = 'speaking';
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const container = el.querySelector('.avatar-container');
    expect(container?.classList.contains('avatar--speaking')).toBeTrue();
  });
});
