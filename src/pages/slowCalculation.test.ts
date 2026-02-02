import { slowCalculation } from "./Dashboard";

test("slowCalculation multiplies correctly", () => {
  expect(slowCalculation(2)).toBe(2000);
});

