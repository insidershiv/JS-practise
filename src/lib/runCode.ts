import type { PracticeTestCase } from "@/types/practice";

export interface TestResult {
  name: string;
  pass: boolean;
  error?: string;
}

/**
 * Runs user code in a sandboxed Function, then each test body (async-capable).
 * Tests assume user code defines the required functions (e.g. debounce, createCounter).
 */
export async function runPracticeTests(
  userCode: string,
  tests: PracticeTestCase[]
): Promise<TestResult[]> {
  const results: TestResult[] = [];

  for (const t of tests) {
    try {
      const runner = new Function(
        `
        ${userCode}
        return (async () => {
          ${t.code}
        })();
        `
      ) as () => Promise<unknown>;
      await Promise.resolve(runner());
      results.push({ name: t.name, pass: true });
    } catch (e) {
      results.push({
        name: t.name,
        pass: false,
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }

  return results;
}
