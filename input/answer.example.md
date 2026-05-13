# Example Behavioral Answer

**Question**: Tell me about a time you led a significant technical project. Walk me through your approach and the outcome.

---

## Answer

Sure. One project I'm really proud of was the dashboard rewrite at my current company. The old dashboard was built in AngularJS and it was really slow — like 8 seconds to load. Users were complaining and the product team kept getting feedback about it.

I proposed doing a full rewrite. I spent some time looking at the codebase and figured we could move to Angular 17 with the new Signals-based state management. I wrote up a proposal and got buy-in from my manager and the product team.

I led the project with two other engineers. We broke it into phases so we could ship incrementally rather than doing a big bang rewrite. I handled the architecture decisions and made sure we were using best practices around lazy loading and change detection.

The main challenge was that we had to keep the old dashboard running while we built the new one. We did a feature-by-feature migration over about 3 months.

The result was really good — load time went from 8 seconds down to about 1 second. Users were much happier and the product team saw an increase in engagement. I also made sure we added proper tests so we wouldn't have the same issues going forward.

The team worked really well together and I think it was a great example of how to do a migration the right way — incrementally, with proper planning and communication.

---

## Self-Assessment Notes

*This answer is intentionally "good but improvable" — suitable for evaluating with InterviewOps.*

**What works:**
- Has a clear beginning, middle, and end
- Mentions a specific technology (Angular 17, Signals)
- Shows leadership and initiative
- Has an outcome

**What could be stronger:**
- Impact metrics are vague ("about 1 second", "users were much happier")
- No specific mention of HOW decisions were made
- Team size mentioned but collaboration details are thin
- No mention of what was learned or what would be done differently
- "I proposed" could be stronger with specific stakeholder management
- Missing: business impact beyond load time (user growth, revenue, etc.)

*Run `npm run answer` to evaluate this answer against a session rubric.*
