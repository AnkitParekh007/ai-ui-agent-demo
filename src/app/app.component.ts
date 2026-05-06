import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AgentAction } from './models/agent-action.model';
import { ExecutionLog } from './models/execution-log.model';
import { WorkflowStep } from './models/workflow-step.model';
import { ContextSerializerService } from './services/context-serializer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="agent-demo">
      <section class="workspace">
        <header>
          <p class="eyebrow">Mock enterprise workspace</p>
          <h1>{{ context.pageTitle }}</h1>
          <p>Selected record: <strong>{{ context.selectedRecordId }}</strong></p>
        </header>

        <div class="grid">
          <article class="card table-card">
            <h2>Customer Queue</h2>
            <table>
              <thead><tr><th>Customer</th><th>Status</th><th>Owner</th><th>Next step</th></tr></thead>
              <tbody>
                <tr class="selected"><td>Acme Pilot</td><td>Pending review</td><td>Operations</td><td>Submit onboarding</td></tr>
                <tr><td>Northwind</td><td>Docs needed</td><td>Success</td><td>Request sources</td></tr>
              </tbody>
            </table>
          </article>

          <article class="card form-card">
            <h2>Visible Form Context</h2>
            <label>Status<input value="Pending review" readonly /></label>
            <label>Owner<input value="Operations lead" readonly /></label>
            <label>Next review<input value="2026-05-08" readonly /></label>
          </article>
        </div>

        <article class="card timeline-card">
          <h2>Action Execution Timeline</h2>
          <ol>
            <li *ngFor="let step of steps"><span>{{ step.status }}</span>{{ step.label }}</li>
          </ol>
        </article>
      </section>

      <aside class="agent-panel">
        <section class="panel-block">
          <p class="eyebrow">AI Agent Panel</p>
          <h2>Context Inspector</h2>
          <dl>
            <div><dt>Route</dt><dd>{{ context.route }}</dd></div>
            <div><dt>Role</dt><dd>{{ context.userRole }}</dd></div>
            <div><dt>Fields</dt><dd>{{ context.visibleFields.join(', ') }}</dd></div>
          </dl>
        </section>

        <section class="panel-block">
          <h2>Suggested Actions</h2>
          <button class="action" *ngFor="let action of actions" type="button" [class.risky]="action.requiresApproval">
            <strong>{{ action.label }}</strong>
            <span>{{ action.description }}</span>
          </button>
        </section>

        <section class="approval">
          <h2>Approval Dialog</h2>
          <p>Submit onboarding workflow for customer-42 after validating visible context.</p>
          <div><button type="button">Approve mock workflow</button><button type="button" class="secondary">Reject</button></div>
        </section>

        <section class="panel-block recovery">
          <h2>Recovery State</h2>
          <p>Retryable failure example: workflow API timeout. Suggested recovery is to validate context and retry submission.</p>
        </section>

        <section class="panel-block">
          <h2>Action Log</h2>
          <ul><li *ngFor="let log of logs">{{ log.level }} · {{ log.message }}</li></ul>
        </section>
      </aside>
    </main>
  `,
  styles: [`
    :host { display: block; min-height: 100vh; background: #f5f7fb; color: #172033; }
    .agent-demo { display: grid; grid-template-columns: minmax(0, 1fr) 390px; min-height: 100vh; }
    .workspace { padding: 28px; }
    header { margin-bottom: 22px; }
    .eyebrow { margin: 0 0 6px; color: #047857; font-weight: 800; font-size: 12px; text-transform: uppercase; }
    h1, h2 { margin: 0 0 12px; }
    .grid { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(280px, .7fr); gap: 16px; }
    .card, .panel-block, .approval { background: #fff; border: 1px solid #d8dee9; border-radius: 8px; padding: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid #e5e7eb; }
    .selected { background: #ecfdf5; }
    label { display: grid; gap: 6px; margin-bottom: 12px; font-weight: 700; }
    input { border: 1px solid #cbd5e1; border-radius: 6px; padding: 10px; font: inherit; }
    .timeline-card { margin-top: 16px; }
    .timeline-card ol { display: grid; gap: 10px; padding-left: 18px; }
    .timeline-card span { margin-right: 8px; color: #2563eb; font-weight: 800; }
    .agent-panel { background: #fff; border-left: 1px solid #d8dee9; padding: 24px; display: flex; flex-direction: column; gap: 16px; }
    dl { display: grid; gap: 10px; }
    dl div { display: grid; gap: 3px; }
    dt { color: #64748b; font-size: 12px; font-weight: 800; text-transform: uppercase; }
    dd { margin: 0; }
    .action { display: grid; gap: 6px; width: 100%; text-align: left; margin: 8px 0; border: 1px solid #cbd5e1; background: #f8fafc; border-radius: 8px; padding: 12px; }
    .action.risky { border-color: #f59e0b; background: #fffbeb; }
    .action span { color: #475569; }
    .approval { border-color: #f59e0b; background: #fffbeb; }
    button { cursor: pointer; }
    .approval button { background: #111827; color: #fff; border: 0; border-radius: 6px; padding: 10px 12px; margin-right: 8px; }
    .approval .secondary { background: #fff; color: #111827; border: 1px solid #cbd5e1; }
    .recovery { border-color: #fecaca; background: #fff7f7; }
    @media (max-width: 1060px) { .agent-demo, .grid { grid-template-columns: 1fr; } .agent-panel { border-left: 0; } }
  `]
})
export class AppComponent {
  readonly context;
  readonly actions: AgentAction[] = [
    { id: 'action-1', label: 'Inspect missing setup tasks', description: 'Review incomplete fields before workflow submission.', riskLevel: 'low', requiresApproval: false },
    { id: 'action-2', label: 'Submit onboarding workflow', description: 'Workflow-changing action requiring approval.', riskLevel: 'medium', requiresApproval: true }
  ];
  readonly steps: WorkflowStep[] = [
    { id: 'step-1', label: 'Read route and selected record', status: 'completed' },
    { id: 'step-2', label: 'Suggest next action', status: 'completed' },
    { id: 'step-3', label: 'Wait for approval', status: 'running' },
    { id: 'step-4', label: 'Submit mock workflow', status: 'pending' }
  ];
  readonly logs: ExecutionLog[] = [
    { id: 'log-1', actionId: 'action-1', message: 'Context serialized from visible page fields.', level: 'info', createdAt: new Date().toISOString() },
    { id: 'log-2', actionId: 'action-2', message: 'Approval required before workflow execution.', level: 'warning', createdAt: new Date().toISOString() }
  ];

  constructor(private readonly contextSerializer: ContextSerializerService) {
    this.context = this.contextSerializer.serialize();
  }
}
