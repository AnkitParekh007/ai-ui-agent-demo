import { Injectable } from '@angular/core';
import { AgentAction } from '../models/agent-action.model';

@Injectable({ providedIn: 'root' })
export class ActionApprovalService {
  requiresApproval(action: AgentAction): boolean {
    return action.requiresApproval || action.riskLevel !== 'low';
  }
}
