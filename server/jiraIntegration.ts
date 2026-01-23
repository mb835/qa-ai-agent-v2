import { Request, Response } from "express";

/**
 * Transformuje interní Test Case do JIRA struktury
 * DEMO / MOCK režim – bez reálného volání JIRA API
 */
export function exportTestCaseToJira(req: Request, res: Response) {
  try {
    const { testCase } = req.body;

    if (!testCase) {
      return res.status(400).json({
        error: "Missing testCase payload",
      });
    }

    /**
     * Očekávaná struktura testCase:
     * {
     *   title: string;
     *   preconditions?: string;
     *   steps: {
     *     step: string;
     *     expected: string;
     *   }[];
     * }
     */

    const jiraPayload = {
      summary: testCase.title,
      preconditions: testCase.preconditions || "N/A",
      steps: testCase.steps.map(
        (s: { step: string; expected: string }, index: number) => ({
          order: index + 1,
          action: s.step,
          expectedResult: s.expected,
        })
      ),
    };

    return res.json({
      mode: "MOCK",
      message: "Test case successfully transformed to JIRA format",
      jiraPayload,
    });
  } catch (error) {
    console.error("JIRA EXPORT ERROR:", error);
    return res.status(500).json({
      error: "Failed to export test case to JIRA",
    });
  }
}
