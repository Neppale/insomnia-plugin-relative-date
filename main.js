const { RelativeDate } = require("./run");

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
      {
        displayName: "Time zone",
        description:
          "IANA timezone, such as America/Sao_Paulo or UTC. Leave empty to use the host timezone.",
        type: "string",
        defaultValue: "",
      },
    ],
    async run(_context, expression, timezone) {
      	return new RelativeDate(expression, timezone).run();
    },
  },
];
