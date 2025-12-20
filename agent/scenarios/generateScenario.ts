import { Scenario, ScenarioType } from './types';
import crypto from 'crypto';

export function generateScenario(prompt: string, type: ScenarioType): Scenario {
  return {
    id: crypto.randomUUID(),
    name: `Nákup notebooku – ${type}`,
    domain: 'ecommerce',
    type,
    steps: [
      { description: 'Uživatel otevře e-shop' },
      { description: 'Vyhledá notebook' },
      { description: 'Otevře detail produktu' },
      { description: 'Přidá produkt do košíku' }
    ]
  };
}
