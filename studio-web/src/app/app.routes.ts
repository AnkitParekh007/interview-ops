import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/studio-shell/studio-shell.component').then(
        (m) => m.StudioShellComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile-panel/profile-panel.component').then(
        (m) => m.ProfilePanelComponent
      ),
  },
  {
    path: 'star-stories',
    loadComponent: () =>
      import('./features/star-story-bank/star-story-bank.component').then(
        (m) => m.StarStoryBankComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/progress-dashboard/progress-dashboard.component').then(
        (m) => m.ProgressDashboardComponent
      ),
  },
  {
    path: 'onboarding',
    loadComponent: () =>
      import('./features/onboarding/onboarding.component').then(
        (m) => m.OnboardingComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
