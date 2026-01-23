export const dashboardStats = {
  totalScenarios: 128,
  totalTestCases: 842,
  executedLast30d: 290,
  passRate: 87,
  automationCoverage: 45,
};

export const scenarioTrend = [
  { date: "29.12", count: 3 },
  { date: "30.12", count: 6 },
  { date: "31.12", count: 4 },
  { date: "01.01", count: 8 },
  { date: "02.01", count: 5 },
];

export const testTypeDistribution = [
  { name: "Akceptační", value: 3 },
  { name: "Negativní", value: 2 },
  { name: "Hraniční případy", value: 1 }, // Změněno z "Mezní stavy"
  { name: "Bezpečnostní", value: 1 },
  { name: "UX", value: 1 },
];

export const testTypeColors: Record<string, string> = {
  "Akceptační": "#6366f1",
  "Negativní": "#ef4444",
  "Hraniční případy": "#f59e0b", // Musí se shodovat s názvem výše
  "Bezpečnostní": "#22c55e",
  "UX": "#14b8a6",
};