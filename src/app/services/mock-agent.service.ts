import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AgentAction } from '../models/agent-action.model';
import { UiContext } from '../models/ui-context.model';

@Injectable({ providedIn: 'root' })
export class MockAgentService {
  suggestActions(context: UiContext): Observable<AgentAction[]> {
    return of([
      { id: 'action-1', label: 'Review missing setup tasks', description: 'Inspect incomplete onboarding steps for ' + context.selectedRecordId, riskLevel: 'low', requiresApproval: false },
      { id: 'action-2', label: 'Submit onboarding workflow', description: 'Submit the checklist after user approval.', riskLevel: 'medium', requiresApproval: true }
    ]).pipe(delay(200));
  }
}
