# AI UI Agent Demo

![Angular](https://img.shields.io/badge/Angular-20-red) ![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue) ![Mock Agent](https://img.shields.io/badge/Agent-Mock%20Only-green)

Angular demo of a UI-aware AI agent that reads page context, suggests workflow actions, requests approval, and shows execution state.

![Preview placeholder](docs/assets/screenshots/main-screen.png)

## What The Demo Shows

- Fake enterprise dashboard/page with table and form context.
- AI agent side panel.
- Context inspector for route, selected record, visible fields, and role.
- Suggested next actions.
- Approval dialog/card for workflow-changing action.
- Action execution timeline.
- Error/recovery state.
- Mock browser/user action simulation.

## Why UI Context Matters

A UI-aware agent needs to know what page the user is on, what record is selected, what fields are visible, and what role/permissions apply. This demo shows how that context can be serialized safely and rendered visibly before action.

## Architecture

```mermaid
flowchart LR
    Page["Enterprise page"] --> Serializer["ContextSerializerService"]
    Serializer --> Agent["MockAgentService"]
    Agent --> Suggestions["Suggested actions"]
    Suggestions --> Approval["Approval card"]
    Approval --> Runner["WorkflowRunnerService"]
    Runner --> Log["Action log"]
    Runner --> Recovery["Recovery panel"]
```

## How To Run

```bash
npm install
npm start
```

Build check:

```bash
npm run build
```

No API key is required. All agent behavior is mocked.

## Demo Script

1. Open the dashboard and select the mock customer record.
2. Inspect the context panel: route, role, visible fields, and selected record.
3. Review suggested next actions from the mock agent.
4. Open the approval flow for the workflow-changing action.
5. Show the execution timeline and action log.
6. Point out the recovery panel and how failed actions would be handled.

## Recruiter Value

This repo proves UI-aware agent thinking: DOM/page-context serialization, approval UX, action execution visibility, recovery states, and enterprise AI interaction design.

## Interview Talking Points

- Why agents need safe page context instead of raw hidden DOM.
- How approval flows reduce risk for workflow automation.
- How action logs and recovery panels make automation auditable.
- How Angular services separate context, agent planning, approvals, and execution.

## Who This Helps

- Frontend engineers moving into AI product engineering
- Angular teams building copilots
- AI startups needing enterprise UI patterns
- Product teams adding RAG and tool calling to web apps
- Recruiters evaluating AI frontend architecture depth

## Contributing

Contributions are welcome around:

- Angular component improvements
- accessibility
- documentation
- mock data examples
- UI states
- RAG source rendering
- MCP/tool-call examples
- testing
- demo deployment

See [CONTRIBUTING.md](CONTRIBUTING.md) and [GOOD_FIRST_ISSUES.md](GOOD_FIRST_ISSUES.md).

## Good First Issues

- Add a screenshot/GIF to the README
- Improve responsive layout
- Add more mock RAG sources
- Add another tool-call example
- Add accessibility labels
- Add unit tests for models/services
- Improve README diagrams

## Follow For More Angular AI Frontend Patterns

This repo is part of a public AI frontend architecture series focused on Angular copilots, RAG UX, MCP/tool-calling interfaces, UI-aware agents, approvals, and enterprise guardrails.
