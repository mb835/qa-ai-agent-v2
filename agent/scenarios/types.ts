export type ScenarioType = 'acceptance' | 'negative' | 'security';

export type ScenarioStep = {
  description: string;
};

export type Scenario = {
  id: string;
  name: string;
  domain: 'ecommerce';
  type: ScenarioType;
  steps: ScenarioStep[];
};
