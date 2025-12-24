const { run } = require("./run.js");
const chronoNode = require("chrono-node");

jest.mock("chrono-node");

describe("run", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw if parsedDate is null", () => {
    chronoNode.parse.mockReturnValue(null);

    expect(() => run(null, "invalid")).toThrow("Invalid date expression.");
  });

  it("should throw if parsedDate.length is 0", () => {
    chronoNode.parse.mockReturnValue([]);

    expect(() => run(null, "invalid")).toThrow("Invalid date expression.");
  });

  it("should throw error if parse throws an error", () => {
    chronoNode.parse.mockImplementation(() => {
      throw new Error("Parse error");
    });

    expect(() => run(null, "invalid")).toThrow(
      "Error parsing date: Parse error"
    );
  });

  it("should return correct date for tomorrow", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = run(null, "tomorrow");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expected = tomorrow.toISOString().split("T")[0];

    expect(result).toContain(expected);
  });

  it("should return correct date for next year", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = run(null, "next year");
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const expected = nextYear.toISOString().split("T")[0];

    expect(result).toContain(expected);
  });

  it("should return correct date for last year", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = run(null, "last year");
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const expected = lastYear.toISOString().split("T")[0];

    expect(result).toContain(expected);
  });

  it("should return correct date for a specific date", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = run(null, "2025-05-01");
    const expected = "2025-05-01";

    expect(result).toContain(expected);
  });
});
