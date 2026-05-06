export interface AgentAction {
  id: string;
  label: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  requiresApproval: boolean;
}
