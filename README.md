# Relative Date

An Insomnia plugin that allows you to insert relative dates in ISO-8601 format dynamically. No more manually updating dates in your API requests!

## Features

- Supports relative date expressions like:
  - `now + 2 days`
  - `tomorrow`
  - `next week`
  - `2025-05-01 + 3 months`
- Outputs the date in **ISO-8601** format (e.g., `2025-05-03T00:00:00.000Z`).
- Uses [chrono-node](https://github.com/wanasit/chrono) for parsing natural language dates.
- Uses [date-fns](https://date-fns.org/) for formatting.

## Installation

1. Navigate to Insomnia’s plugin folder:
   - **Windows:** `%APPDATA%\Insomnia\plugins\`
   - **Linux/macOS:** `~/.config/Insomnia/plugins/`
2. Use the command below to install the plugin:
   ```sh
   npm install insomnia-plugin-relative-date
   ```
3. On the toolbar, click Tools > Reload Plugins and you're good to go!

## Usage

In your request, use a Template Tag:

- Press CTRL + Enter (Windows) or CMD + Enter (Linux/macOS) to open the Template Tag dialog;
- Select the **Relative Date** tag from the list.
- Enter a Date Expression (e.g., now + 2 days).

The field will automatically be replaced with the computed ISO-8601 date.

### Examples

```
{
  "due_date": "{{ relative_date 'now + 5 days' }}"
}
```

```
{
  "reminder": "{{ relative_date '2025-01-01 + 1 month' }}"
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
