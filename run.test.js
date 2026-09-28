const { RelativeDate } = require("./run.js");
const chronoNode = require("chrono-node");
const { formatISO } = require("date-fns");
const { TZDate } = require("@date-fns/tz");

jest.mock("chrono-node");



describe("RelativeDate", () => {
  const now = new Date("2026-09-28T12:00:00");

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers({ now });
  });

  it("should throw if parsedDate is null", () => {
    chronoNode.parse.mockReturnValue(null);

    expect(() => new RelativeDate("invalid").run()).toThrow("Invalid date expression.");
  });

  it("should throw if parsedDate.length is 0", () => {
    chronoNode.parse.mockReturnValue([]);

    expect(() => new RelativeDate("invalid").run()).toThrow("Invalid date expression.");
  });

  it("should throw error if parse throws an error", () => {
    chronoNode.parse.mockImplementation(() => {
      throw new Error("Parse error");
    });

    expect(() => new RelativeDate("invalid").run()).toThrow(
      "Error parsing date: Parse error"
    );
  });

  it("should return correct date for tomorrow", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = new RelativeDate("tomorrow").run();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expected = formatISO(tomorrow);
    expect(result).toBe(expected);
  });

  it("should return correct date for next year", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = new RelativeDate("next year").run();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const expected = formatISO(nextYear);

    expect(result).toBe(expected);
  });

  it("should return correct date for last year", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = new RelativeDate("last year").run();
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const expected = formatISO(lastYear);

    expect(result).toBe(expected);
  });

  it("should return correct date for a specific date", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = new RelativeDate("22 july 2003 + seven hours + 58 minutes + 17 seconds").run();
    const expected = formatISO(new Date("2003-07-22T19:58:17"));

    expect(result).toBe(expected);
  });

  it("should return correct date for a specific date with timezone", () => {
    const realChronoNode = jest.requireActual("chrono-node");
    chronoNode.parse.mockImplementation(realChronoNode.parse);

    const result = new RelativeDate("20 october 2003", "America/Sao_Paulo").run();
    const expected = formatISO(
      new TZDate(2003, 9, 20, 12, 0, 0, "America/Sao_Paulo")
    );

    expect(result).toBe(expected);
  });
});
