import { Component } from '@angular/core';
import { ContextSerializerService } from './services/context-serializer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="layout">
      <section class="workspace">
        <p class="eyebrow">Mock enterprise page</p>
        <h1>{{ context.pageTitle }}</h1>
        <p>Selected record: {{ context.selectedRecordId }}</p>
        <p>Visible fields: {{ context.visibleFields.join(', ') }}</p>
      </section>
      <aside class="agent">
        <h2>UI Agent Panel</h2>
        <p>Route: {{ context.route }}</p>
        <p>Role: {{ context.userRole }}</p>
        <button type="button">Suggest next action</button>
      </aside>
    </main>
  `,
  styles: [`
    .layout { display: grid; grid-template-columns: 1fr 360px; min-height: 100vh; }
    .workspace { padding: 32px; }
    .agent { border-left: 1px solid #d1d5db; background: white; padding: 24px; }
    .eyebrow { color: #047857; font-weight: 700; text-transform: uppercase; }
    button { padding: 10px 14px; border-radius: 6px; border: 1px solid #111827; background: #111827; color: white; }
  `]
})
export class AppComponent {
  readonly context;

  constructor(private readonly contextSerializer: ContextSerializerService) {
    this.context = this.contextSerializer.serialize();
  }
}
