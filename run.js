const { parse } = require("chrono-node");
const { formatISO } = require("date-fns");
const { TZDate, tz } = require("@date-fns/tz");

class RelativeDate {
	constructor(expression, timezone) {
		this.expression = expression;
		this.timezone = timezone?.trim();
	}

	run() {
		if (!this.timezone) {
			return this.formatToHost();
		}

    try {
      Intl.DateTimeFormat(undefined, { timeZone: this.timezone });
    } catch {
      throw new Error(`Invalid timezone: ${this.timezone}`);
    } 

		try {
			const parsed = parse(this.expression, this.buildReferenceDate());
			if (!parsed?.length) {
				throw new Error("Invalid date expression.");
			}
			const start = parsed[0].start;
      const date = new TZDate(
					start.get("year"),
					start.get("month") - 1,
					start.get("day"),
					start.get("hour") ?? 0,
					start.get("minute") ?? 0,
					start.get("second") ?? 0,
					this.timezone
				)
			return formatISO(date);
		} catch (error) {
			throw new Error(`Error parsing date: ${error.message}`);
		}
	}

	formatToHost() {
		try {
			const parsedDate = parse(this.expression);
			if (!parsedDate?.length) {
				throw new Error("Invalid date expression.");
			}
			return formatISO(parsedDate[0].start.date());
		} catch (error) {
			throw new Error(`Error parsing date: ${error.message}`);
		}
	}

  buildReferenceDate() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: this.timezone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).formatToParts(new Date());
    const partitionedDate = Object.fromEntries(
      parts
        .filter((part) => part.type !== "literal")
        .map((part) => [part.type, Number(part.value)])
    );
    return new Date(
      partitionedDate.year,
      partitionedDate.month - 1,
      partitionedDate.day,
      partitionedDate.hour === 24 ? 0 : partitionedDate.hour,
      partitionedDate.minute,
      partitionedDate.second
    );
  }
}

module.exports = { RelativeDate };