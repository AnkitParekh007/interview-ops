# Angular Developer Track

## Who This Is For
Angular specialists at any seniority level who are targeting roles where Angular is the primary framework. Covers Angular 14+ with a focus on modern patterns including signals, standalone components, and functional guards.

## Expected Skills
- Deep Angular framework knowledge (components, directives, pipes, services)
- Angular Signals — reactive primitives, computed, effect, signal-based components
- RxJS — Observables, subjects, operators (switchMap, mergeMap, combineLatest, etc.)
- Change detection — Default vs OnPush, zone.js, zoneless Angular
- Forms — Reactive forms, template-driven forms, custom validators, dynamic forms
- Routing — Guards (functional), resolvers, lazy loading, nested routes
- Dependency Injection — hierarchical injectors, injection tokens, factory providers
- Angular Material / CDK — component library, theming, accessibility
- Performance — OnPush, trackBy, lazy modules, preloading strategies
- State management — NgRx, Akita, signals-based state, NGXS
- Testing — Jest, Karma, TestBed, component harnesses, Playwright/Cypress

## Interview Focus Areas
1. Component lifecycle — understanding initialization, change detection, destruction
2. Signals vs RxJS — when to use which, interoperability (toSignal, toObservable)
3. Change detection strategy — OnPush benefits and requirements
4. Reactive forms — complex form handling, custom validators, async validation
5. RxJS patterns — avoiding memory leaks, takeUntilDestroyed, proper subscription management
6. Standalone components — no NgModules, import graph management
7. Dependency injection hierarchy — when to use root vs component-level providers
8. Performance optimization — lazy loading, preloading, SSR with Angular Universal
9. Angular testing patterns — TestBed configuration, mocking services, component testing
10. Upgrade and migration experience — migrating legacy code to modern patterns

## Common Interview Rounds
- **Recruiter Screen** (30 min): Angular version experience, team dynamics, remote/onsite
- **Technical Screen** (45 min): Angular-specific questions, live debugging
- **Coding Round** (60 min): Build a component or small feature in Angular
- **Architecture Round** (60 min): Design an Angular application structure
- **Behavioral Round** (45 min): Team collaboration, ownership, learning

## Common Weak Spots
- RxJS misuse — creating unnecessary Observables, ignoring unsubscription
- Defaulting to `any` type in TypeScript
- Not understanding when signals replace vs complement RxJS
- Relying on default change detection instead of OnPush for performance
- Module-heavy thinking when standalone components are preferred
- Shallow testing — only snapshot tests, no logic or interaction testing
- Underestimating accessibility in custom components

## Seniority Expectations
- Senior: Lead architectural decisions, mentor others on Angular patterns, introduce signals strategy
- Mid: Independent delivery, strong RxJS and change detection knowledge
- Junior: Component basics, routing, services, some RxJS knowledge

## Example Question Categories
- "Explain the difference between signals and RxJS Observables. When would you use each?"
- "What is OnPush change detection and why would you use it?"
- "How do you prevent memory leaks in Angular with RxJS?"
- "Walk me through designing a dynamic form with nested validators."
- "How does Angular's DI hierarchy work? When would you provide a service at the component level?"
- "What changes did standalone components bring and how do you structure an app without NgModules?"
- "How would you implement a global error handling strategy in Angular?"

## Recommended Modes
- angular
- frontend-architecture
- behavioral
- coding
- project-deep-dive

## Evaluation Criteria
- Depth of Angular-specific knowledge
- Modern patterns adoption (signals, standalone, functional guards)
- RxJS fluency and safety awareness
- Testing rigor and TestBed mastery
- Performance optimization habits
- Communication of Angular architectural decisions
