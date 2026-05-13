# React Developer Track

## Who This Is For
React specialists targeting roles where React is the primary framework. Covers React 18+ with a focus on hooks, modern patterns, server components, and the ecosystem.

## Expected Skills
- React fundamentals — components, JSX, props, state, event handling
- Hooks — useState, useEffect, useRef, useCallback, useMemo, useContext, custom hooks
- State management — Redux Toolkit, Zustand, Jotai, React Context, Recoil
- Effects — proper useEffect usage, cleanup, dependencies, avoiding double-runs
- Performance — React.memo, useMemo, useCallback, virtualization, profiling
- Server Components (React 19/Next.js) — RSC vs client components, streaming
- React Query / SWR — data fetching, caching, mutations, optimistic updates
- Routing — React Router, Next.js App Router, file-based routing
- Forms — controlled/uncontrolled, React Hook Form, Formik, validation
- Testing — React Testing Library, Jest, MSW, Playwright
- TypeScript with React — proper typing of components, hooks, events, refs

## Interview Focus Areas
1. Hook rules and mental model — how hooks work under the hood
2. State architecture — lifting state, when to use context vs external store
3. Effects discipline — stale closures, dependency arrays, race conditions
4. Performance optimization — profiling tools, strategic memoization
5. Server vs Client components — understanding RSC and serialization constraints
6. Data fetching patterns — caching, revalidation, optimistic UI
7. Forms and validation — complex form state, server-side validation handling
8. Testing philosophy — what to test, how to test components with RTL
9. Error boundaries — catching and recovering from render errors
10. Composition patterns — render props, HOC, compound components, slots

## Common Interview Rounds
- **Recruiter Screen** (30 min): React version experience, ecosystem tools, team fit
- **Technical Screen** (45 min): React-specific Q&A, live code review
- **Coding Round** (60 min): Build a component or feature in React
- **Architecture Round** (60 min): Design a React application structure
- **Behavioral Round** (45 min): Ownership, collaboration, technical leadership

## Common Weak Spots
- Stale closures in useEffect — not understanding dependency arrays
- Overusing useEffect for things that aren't side effects
- Memoizing everything (premature optimization) or nothing (no optimization)
- Not cleaning up subscriptions, timers, or event listeners
- Poor Server Component mental model — trying to use hooks in RSC
- Testing implementation details instead of user behavior
- Using `any` in TypeScript React code

## Seniority Expectations
- Senior: Deep hooks internals, scalable state architecture, RSC expertise, mentoring
- Mid: Strong hooks knowledge, state management patterns, testing confidence
- Junior: Component basics, useState/useEffect, some testing

## Example Question Categories
- "Explain the rules of hooks and why they exist."
- "What's a stale closure in useEffect and how do you prevent it?"
- "When should you use Redux vs Zustand vs React Context?"
- "What are React Server Components and what can't they do?"
- "How do you optimize a React app that's re-rendering too frequently?"
- "Walk me through your testing approach for a complex form component."
- "What's the difference between controlled and uncontrolled components?"

## Recommended Modes
- react
- frontend-architecture
- behavioral
- coding
- project-deep-dive

## Evaluation Criteria
- Deep hooks knowledge and mental model
- State management decision-making
- Performance optimization discipline
- Testing philosophy and RTL fluency
- RSC and Next.js ecosystem understanding
- TypeScript integration quality
