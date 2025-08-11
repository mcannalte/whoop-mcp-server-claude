# Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- WHOOP Developer Account
- WHOOP API credentials

## 1. Clone and Install

```bash
git clone <your-repo-url>
cd whoop-mcp-server
npm install
```

## 2. WHOOP API Setup

1. Visit [WHOOP Developer Platform](https://developer.whoop.com/)
2. Create a new application
3. Copy your `Client ID` and `Client Secret`
4. Set redirect URI to `http://localhost:3000/callback`

## 3. Environment Configuration

```bash
cp env.example .env
```

Edit `.env` with your credentials:
```env
WHOOP_CLIENT_ID=your_actual_client_id
WHOOP_CLIENT_SECRET=your_actual_client_secret
WHOOP_REDIRECT_URI=http://localhost:3000/callback
```

## 4. Build and Test

```bash
npm run build
npm test
```

## 5. Run the Server

```bash
npm start
```

## Available Tools

The MCP server provides 18 tools covering all WHOOP API endpoints:

### Authentication
- `whoop-get-authorization-url` - Get OAuth URL
- `whoop-exchange-code-for-token` - Exchange code for token
- `whoop-refresh-token` - Refresh access token
- `whoop-set-access-token` - Set access token

### User Data
- `whoop-get-user-profile` - Get user profile
- `whoop-get-user-body-measurements` - Get body measurements
- `whoop-revoke-user-access` - Revoke access

### Cycles
- `whoop-get-cycle-by-id` - Get specific cycle
- `whoop-get-cycle-collection` - Get cycles (paginated)
- `whoop-get-sleep-for-cycle` - Get sleep for cycle

### Recovery
- `whoop-get-recovery-collection` - Get recovery data (paginated)
- `whoop-get-recovery-for-cycle` - Get recovery for cycle

### Sleep
- `whoop-get-sleep-by-id` - Get specific sleep record
- `whoop-get-sleep-collection` - Get sleep data (paginated)

### Workouts
- `whoop-get-workout-by-id` - Get specific workout
- `whoop-get-workout-collection` - Get workouts (paginated)

## Example Usage

See `examples/` directory for complete usage examples:
- `basic-usage.js` - Simple authentication and data fetching
- `data-analysis.js` - Advanced data analysis and insights

## Troubleshooting

1. **Build errors**: Ensure Node.js 18+ is installed
2. **Authentication errors**: Verify your WHOOP credentials in `.env`
3. **API errors**: Check WHOOP API documentation for rate limits and requirements

## Support

- Check the main README.md for detailed documentation
- Review WHOOP API documentation at https://developer.whoop.com/
- Ensure you're using WHOOP v2 API (required by October 2025)
