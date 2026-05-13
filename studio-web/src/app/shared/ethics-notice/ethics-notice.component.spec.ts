import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EthicsNoticeComponent } from './ethics-notice.component';

describe('EthicsNoticeComponent', () => {
  let fixture: ComponentFixture<EthicsNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EthicsNoticeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EthicsNoticeComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display practice-only text', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Practice-only mode');
  });

  it('should warn against live interview use', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Do not use it during live interviews');
  });
});
