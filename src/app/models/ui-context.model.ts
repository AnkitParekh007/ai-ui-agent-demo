export interface UiContext {
  route: string;
  pageTitle: string;
  selectedRecordId?: string;
  visibleFields: string[];
  userRole: string;
}
