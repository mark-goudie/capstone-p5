// getCountdown function test //

import { getCountdown } from "../src/client/js/getCountdown";

describe("test now as a number", () => {
  test("conversion to milliseconds", () => {
    expect(getCountdown).toBeDefined();
    const now = Date.parse(new Date());
    expect(typeof now).toBe("number");
  });
});
