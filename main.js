const { parse } = require("chrono-node");
const { formatISO } = require("date-fns");

module.exports.templateTags = [
  {
    name: "relative_date",
    displayName: "Relative Date",
    description:
      "Generate a date string in ISO-8601 format based on a relative date expression",
    args: [
      {
        displayName: "Date Expression",
        description:
          "Relative date expression (e.g., 'now', 'tomorrow', 'next week', '2025-05-01 + 2 days')",
        type: "string",
        defaultValue: "now",
      },
    ],
    async run(_context, expression) {
      try {
        const parsedDate = parse(expression);
        if (!parsedDate || !parsedDate.length) {
          throw new Error("Invalid date expression.");
        }

        return formatISO(parsedDate[0].start.date());
      } catch (error) {
        throw new Error(`Error parsing date: ${error.message}`);
      }
    },
  },
];
