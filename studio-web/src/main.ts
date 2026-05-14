import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Apply saved theme before Angular boots to prevent flash
const savedTheme = localStorage.getItem('interviewops-theme');
const preferLight = window.matchMedia('(prefers-color-scheme: light)').matches;
const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (preferLight ? 'light' : 'dark');
document.documentElement.setAttribute('data-theme', theme);

bootstrapApplication(AppComponent, appConfig).catch(console.error);
