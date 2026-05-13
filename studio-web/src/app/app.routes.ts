import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/studio-shell/studio-shell.component').then(
        (m) => m.StudioShellComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
