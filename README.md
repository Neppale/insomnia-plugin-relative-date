# Relative Date

An Insomnia plugin that allows you to insert relative dates in ISO-8601 format dynamically. No more manually updating dates in your API requests!

## Features

- Supports relative date expressions like:
  - `now + 2 days`
  - `tomorrow`
  - `next week`
  - `2025-05-01 + 3 months`
- Outputs the date in **ISO-8601** format, including the offset (e.g., `2026-09-29T18:40:07-03:00` or `2026-09-29T21:40:07Z`).
- Optional **Time zone** field. Leave it empty to keep using the host timezone. Set an IANA name such as `America/Sao_Paulo` or `UTC` to resolve and format the date in that zone, including daylight-saving rules for that date.
- A date expression with no time uses noon (`12:00:00`), which is chrono's default when the time is unknown.
- Uses [chrono-node](https://github.com/wanasit/chrono) for parsing natural language dates.
- Uses [date-fns](https://date-fns.org/) and [@date-fns/tz](https://github.com/date-fns/tz) for formatting.

## Installation

### From the plugin directory

Install the plugin from its official page: [insomnia-plugin-relative-date](https://insomnia.rest/plugins/insomnia-plugin-relative-date).

1. Open the page above and choose **Install Plugin**. Insomnia opens and adds the plugin.
2. On the toolbar, click Tools > Reload Plugins.

### Manual installation

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

- Press CTRL + Enter (Windows) or CMD + Enter (Linux/macOS) to open the Template Tag dialog.
- Select the **Relative Date** tag from the list.
- Enter a Date Expression (e.g., now + 2 days).
- Optionally enter a Time zone (e.g., `UTC` or `America/Sao_Paulo`). An empty Time zone uses the host timezone.

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

```
{
  "starts_at": "{{ relative_date 'now', 'UTC' }}"
}
```

```
{
  "local_due": "{{ relative_date '20 october 2003', 'America/Sao_Paulo' }}"
}
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
