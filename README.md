# Dynamics 365 Customer Service — Agent Explainability & HITL Controls

A working prototype of an AI agent explainability system for Dynamics 365 Customer Service, built with Claude Code. Demonstrates how autonomous Case Management Agent decisions can be made transparent, verifiable, and trust-building for service reps — without new model training.

**Built by:** Naved Siddiqui · March 2026  
**Built with:** Claude Code (terminal-native) · React · JavaScript  
**Status:** Runs on localhost · Prototype

---

## The Problem This Solves

Dynamics 365 Wave 2 ships autonomous Case Management Agents that classify cases, route them, suggest knowledge articles, and draft responses. What's missing is a **rep-level rationale layer**.

When the agent classifies a case as P2 and routes it to a specific rep, the rep has no way to know why. The agent acts. The rep either trusts it or overrides it — reflexively, without signal.

> Reps who cannot verify an AI decision will override it by default. At scale, this becomes an agent rollback.

This prototype solves the trust gap with a real-time explainability UI and compliance-logged override controls.

---

## What It Does

### Rep View — Case Workspace

Every case record includes a persistent **Agent Activity Panel** showing a timestamped timeline of every agent action. Each action card exposes a **"Why did the agent do this?"** toggle that reveals:

- **Confidence score** with visual bar (green / amber / red threshold)
- **CSAT Impact card** — each decision tied to a predicted customer satisfaction outcome
- **Signal attribution** — intent keywords, sentiment score, skill fit %, article relevance score
- **Data source provenance** — which systems (NLP model, Order Management, Case History) informed the decision
- **One-click override** with mandatory reason capture, logged to compliance audit trail

**Example agent action card (Case CAS-004821):**
```
✓ Case Created & Classified · 09:03 AM · Billing & Refunds · Priority 2

▼ Why did the agent do this?

Confidence ████████████░░ 92%

CSAT Impact: Correct classification protects predicted CSAT of 3.1/5.0

Signals:
  Intent: 'refund', 'cancelled', 'not processed' → 98% billing match
  Amount: $249.99 exceeds P3 ceiling → P2 auto-assigned
  Sentiment: frustration signals detected (0.71/1.0) HIGH

Sources: Email NLP Model · Order Management System · Case History
```

### Supervisor View — Team Trust Dashboard

Supervisors see a team-level dashboard with:

- Per-rep **Trust Score** (100 minus weighted override rate)
- CSAT trend: with vs. without explainability enabled
- **Coaching alerts** for reps with override rates significantly above team average — a leading indicator that surfaces *before* CSAT drops

---

## Architecture & Design Decisions

**No new model training required.** The rationale layer surfaces existing model internals — confidence scores, top features, data sources — through a new presentation layer built on top of the Dataverse event log and Copilot UI component library.

**HITL design philosophy:** Override controls trigger on rep intent, not just on agent error. Every override captures a structured reason, creating a supervised fine-tuning signal that closes the product improvement loop without a separate feedback mechanism.

**Evaluation metrics defined before build:**

| Metric | Signal |
|--------|--------|
| CSAT | Skill-matched routing + rep-verified knowledge → correct first response |
| First Contact Resolution | Fewer misrouted cases |
| Avg Handle Time | Reps act on rationale, less second-guessing |
| Override Rate | Calibrated vs. reflex overrides |
| AI Trust Score | 100 minus weighted override rate |
| Feature Adoption | % reps expanding rationale ≥1 case/week |

---

## How to Run

```bash
git clone https://github.com/navedsiddiqui123/CRM-update.git
cd CRM-update
npm install
npm start
```

Opens on `http://localhost:3000`

> Requires Node.js 18+. No external API keys needed for the prototype UI.

---

## Strategic Context

This prototype was built to validate the "demo over PRD" hypothesis: show what's possible with a working, clickable system before asking for engineering investment.

It maps to three converging forces in 2026:
- **EU AI Act** (effective August 2026) requires audit trails and explainable AI in automated workflows
- **D365 Wave 1/2 roadmap** — Wave 2 ships the agent pipe; Wave 1 needs to show inside it
- **System of Action vision** — autonomous agents that go unexplained will be overridden or disabled

---

## Prototype Screenshots

See `/docs` folder or the full spec document for annotated UI screenshots of the Case Workspace and Supervisor Dashboard views.
