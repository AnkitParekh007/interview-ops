import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { StudioShellComponent } from './studio-shell.component';

describe('StudioShellComponent', () => {
  let fixture: ComponentFixture<StudioShellComponent>;
  let component: StudioShellComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioShellComponent],
      providers: [provideHttpClient(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StudioShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render InterviewOps Studio in header', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('InterviewOps Studio');
  });

  it('should show Practice-only mode badge', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Practice-only mode');
  });
});
