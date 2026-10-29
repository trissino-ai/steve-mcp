# Steve MCP

[Steve](https://www.hiresteve.ai/mcp) tracks your competitors. This remote MCP server lets your AI assistant read that data and act on it, with a source and a date on every answer.

| | |
|---|---|
| Endpoint | `https://app.hiresteve.ai/api/agent/mcp` |
| Transport | Streamable HTTP |
| Auth | OAuth 2.1 with PKCE (S256), dynamic client registration |
| Scopes | `steve:read`, `steve:write` (advertised, not enforced: a connection can read and write as you) |
| Needs | A Steve account. Signals-type organizations cannot connect. |

## Files in this repo

| File | What it is |
|---|---|
| `server.json` | Manifest for the [Official MCP Registry](https://registry.modelcontextprotocol.io) (`ai.hiresteve/steve`). |
| `.well-known/mcp/server-card.json` | Static server card with every tool and its inputs (read by Smithery and other directories). |
| `app/` | The docs site, English and Japanese. Run it locally with the steps at the bottom. |

This repo describes and configures the hosted server. It contains no server code.

## Install

### Claude (desktop and web)

Needs a paid Claude plan. In the desktop app go to **Settings → Connectors**. On claude.ai go to **Settings → Customize → Connectors**. Click **Add custom connector**, paste the endpoint, leave Client ID and Client Secret empty, then approve in the browser.

### Claude Code

```bash
claude mcp add --transport http steve https://app.hiresteve.ai/api/agent/mcp
```

Then sign in from the `/mcp` menu in Claude Code.

### ChatGPT

Open chatgpt.com/plugins, click the plus button, choose **Add custom MCP server**, enter the endpoint, choose OAuth, and create it. Availability depends on your plan and workspace policy.

### Cursor

Add a remote server to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global), then restart Cursor and sign in when asked:

```json
{
  "mcpServers": {
    "steve": {
      "url": "https://app.hiresteve.ai/api/agent/mcp"
    }
  }
}
```

### VS Code

Run **MCP: Add Server** from the Command Palette, choose **HTTP**, enter the endpoint and a name (for example `steve`), pick Global or Workspace, then sign in when asked. No file editing needed.

## Tools (47)

Read tools count against 300 requests per hour. Write tools count against 60 per hour. The `prepare_*` tools save nothing but use the write limit (except `prepare_generate_report`).

### Projects
- `list_projects` List projects in the connected organization.
- `prepare_create_project` Draft a project from a company website. Saves nothing.
- `create_project` Create a project and its own-company entry.

### Competitors and social accounts
- `list_competitors` List tracked competitors.
- `prepare_add_competitor` Draft competitors from their websites. Saves nothing.
- `add_competitor` Add confirmed competitors.
- `list_tracked_accounts` List tracked LinkedIn, X and Instagram accounts.
- `set_linkedin_handle` Track a LinkedIn account.
- `set_x_handle` Track an X account.
- `set_instagram_handle` Track an Instagram account.

### Intelligence
- `get_news` Competitor news, newest first.
- `get_reviews` Customer reviews for one competitor.
- `get_website_changes` Dated changes seen on competitor websites.
- `get_linkedin_posts` LinkedIn posts.
- `get_twitter_posts` X posts.
- `get_instagram_posts` Instagram posts.
- `get_google_ads` Google ads.
- `get_meta_ads` Meta ads.

### Website tracking (needs the Website tracking feature)
- `discover_website_pages` Crawl a competitor site for trackable pages.
- `prepare_track_website_pages` Pick pages to watch from a plain-language request.
- `track_website_pages` Start watching pages.
- `list_website_tracking_requests` List website trackers.
- `get_website_tracking_status` Read what changed on tracked pages.
- `rerun_website_tracking` Run a tracker again now.

### Battle cards (needs the Battle cards feature)
- `list_battle_cards` List battle cards.
- `get_battle_card` Read a card's saved instructions and state.
- `regenerate_battle_card` Replace a card's instructions and rebuild it.
- `get_battle_card_status` Check a rebuild.
- `share_battle_card` Publish a card to a public link.
- `unshare_battle_card` Take the public link down.

### Competitor discovery
- `discover_competitors` Sweep for competitors you do not track yet.
- `get_discovery_status` Check a sweep.
- `list_discovered_competitors` List what a sweep found.
- `dismiss_discovered_competitor` Dismiss a suggestion.

### Reports
- `list_report_templates` List report templates.
- `prepare_generate_report` Check what a report run would do. Saves nothing.
- `generate_report` Start a report.
- `get_report_status` Check a report run.
- `schedule_report` Set how often a report runs.
- `share_report` Publish a report to a public link.
- `unshare_report` Take the public link down.

### Canvases
- `list_canvas_templates` List canvas templates.
- `generate_canvas` Build a competitor canvas (managers only).
- `get_canvas_status` Check a canvas build.
- `get_canvas` Read a canvas with its sources.
- `share_canvas` Publish a canvas to a public link (managers only).
- `unshare_canvas` Take the public link down.

## Good to know

- Answers come from collected data, never from the assistant's memory. Collection takes minutes to hours and refreshes on a schedule.
- Nothing is public unless a `share_*` tool is called, and assistants are told to ask first.
- Tokens: access lasts 1 hour, renewal 60 days. Revoke any time from Steve's approval page.

## Run the docs locally

```bash
bun install
bun run dev   # http://localhost:3002
```

## License

MIT. See `LICENSE`.
