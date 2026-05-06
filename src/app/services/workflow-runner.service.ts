import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { WorkflowStep } from '../models/workflow-step.model';

@Injectable({ providedIn: 'root' })
export class WorkflowRunnerService {
  run(): Observable<WorkflowStep[]> {
    return of([
      { id: 'step-1', label: 'Validate context', status: 'completed' },
      { id: 'step-2', label: 'Request approval', status: 'approved' },
      { id: 'step-3', label: 'Execute mock workflow', status: 'completed' }
    ]).pipe(delay(300));
  }
}
