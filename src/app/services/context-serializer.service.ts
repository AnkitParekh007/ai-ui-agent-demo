import { Injectable } from '@angular/core';
import { UiContext } from '../models/ui-context.model';

@Injectable({ providedIn: 'root' })
export class ContextSerializerService {
  serialize(): UiContext {
    return {
      route: '/customers/42/onboarding',
      pageTitle: 'Customer Onboarding',
      selectedRecordId: 'customer-42',
      visibleFields: ['status', 'owner', 'nextReviewDate'],
      userRole: 'operations-lead'
    };
  }
}
