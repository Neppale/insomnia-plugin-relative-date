const { parse } = require("chrono-node");
const { formatISO } = require("date-fns");

function run(_context, expression) {
  try {
    const parsedDate = parse(expression);
    if (!parsedDate || !parsedDate.length) {
      throw new Error("Invalid date expression.");
    }

    return formatISO(parsedDate[0].start.date());
  } catch (error) {
    throw new Error(`Error parsing date: ${error.message}`);
  }
}

module.exports = { run };
