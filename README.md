# WHOOP MCP Server

A Model Context Protocol (MCP) server that provides access to all WHOOP API endpoints. This server allows you to integrate WHOOP fitness and health data into your applications through the MCP standard.

## Features

- **Complete WHOOP API Coverage**: Access to all WHOOP v2 API endpoints
- **OAuth 2.0 Authentication**: Secure authentication flow
- **User Data**: Profile information and body measurements
- **Cycles**: Physiological cycle data with strain and heart rate metrics
- **Recovery**: Recovery scores, HRV, and resting heart rate data
- **Sleep**: Detailed sleep analysis including stages and performance metrics
- **Workouts**: Exercise data with strain, heart rate zones, and activity metrics
- **Pagination Support**: Handle large datasets with pagination
- **TypeScript**: Full type safety and IntelliSense support

## Prerequisites

- Node.js 18+ 
- WHOOP Developer Account
- WHOOP API credentials

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. WHOOP API Setup

1. Go to the [WHOOP Developer Platform](https://developer.whoop.com/)
2. Create a new application
3. Note your `Client ID` and `Client Secret`
4. Set your redirect URI (e.g., `http://localhost:3000/callback`)

### 3. Environment Configuration

Copy the example environment file and configure your WHOOP credentials:

```bash
cp env.example .env
```

Edit `.env` with your WHOOP API credentials:

```env
# WHOOP API Configuration
WHOOP_CLIENT_ID=your_client_id_here
WHOOP_CLIENT_SECRET=your_client_secret_here
WHOOP_REDIRECT_URI=http://localhost:3000/callback

# MCP Server Configuration
MCP_SERVER_PORT=3001
```

### 4. Build and Run

```bash
# Build the project
npm run build

# Run the MCP server
npm start

# Or run in development mode
npm run dev
```

## Authentication Flow

The MCP server supports OAuth 2.0 authentication with WHOOP. Here's how to authenticate:

1. **Get Authorization URL**: Use the `whoop-get-authorization-url` tool to get the OAuth URL
2. **User Authorization**: Direct users to the authorization URL
3. **Copy Authorization Code**: When WHOOP redirects you back, copy the authorization code from the URL
4. **Share Code with Claude**: **IMPORTANT** - You must copy and paste the authorization code directly to Claude in the chat
5. **Exchange Code**: Claude will use the `whoop-exchange-code-for-token` tool with the authorization code
6. **Set Access Token**: Claude will use the `whoop-set-access-token` tool to set the access token for API calls

### ⚠️ Important Note About Authorization Codes

When you complete the WHOOP authorization in your browser, you'll be redirected to a URL that contains an authorization code. **You must copy this code and paste it directly into your chat with Claude**. The code will look something like this in the URL:

```
http://localhost:3000/callback?code=ABC123XYZ789&scope=read:recovery%20read:cycles...
```

Copy the `code` parameter value (e.g., `ABC123XYZ789`) and paste it in your chat with Claude. Claude will then use this code to exchange it for an access token and set up the connection to your WHOOP data.

## Available Tools

### User Tools

- `whoop-get-user-profile` - Get basic user profile information
- `whoop-get-user-body-measurements` - Get body measurements (height, weight, max heart rate)
- `whoop-revoke-user-access` - Revoke user access token

### Cycle Tools

- `whoop-get-cycle-by-id` - Get specific cycle data by ID
- `whoop-get-cycle-collection` - Get paginated list of cycles
- `whoop-get-sleep-for-cycle` - Get sleep data for a specific cycle

### Recovery Tools

- `whoop-get-recovery-collection` - Get paginated recovery data
- `whoop-get-recovery-for-cycle` - Get recovery data for a specific cycle

### Sleep Tools

- `whoop-get-sleep-by-id` - Get specific sleep record by ID
- `whoop-get-sleep-collection` - Get paginated sleep records

### Workout Tools

- `whoop-get-workout-by-id` - Get specific workout record by ID
- `whoop-get-workout-collection` - Get paginated workout records

### OAuth Tools

- `whoop-get-authorization-url` - Get OAuth authorization URL
- `whoop-exchange-code-for-token` - Exchange authorization code for access token
- `whoop-refresh-token` - Refresh access token
- `whoop-set-access-token` - Set access token for API calls

## Usage Examples

### Getting User Profile

```javascript
// First set your access token
await callTool('whoop-set-access-token', { accessToken: 'your_access_token' });

// Then get user profile
const profile = await callTool('whoop-get-user-profile', {});
```

### Getting Recent Cycles

```javascript
const cycles = await callTool('whoop-get-cycle-collection', {
  limit: 10,
  start: '2024-01-01T00:00:00Z'
});
```

### Getting Sleep Data

```javascript
const sleepData = await callTool('whoop-get-sleep-collection', {
  limit: 5,
  end: '2024-01-31T23:59:59Z'
});
```

### Getting Workout Data

```javascript
const workouts = await callTool('whoop-get-workout-collection', {
  limit: 10,
  start: '2024-01-01T00:00:00Z'
});
```

## Data Types

The server provides comprehensive TypeScript types for all WHOOP API responses:

- **User Data**: Profile information, body measurements
- **Cycles**: Strain scores, heart rate data, kilojoule expenditure
- **Recovery**: Recovery scores, HRV, resting heart rate, SpO2, skin temperature
- **Sleep**: Sleep stages, performance metrics, respiratory rate, efficiency
- **Workouts**: Activity strain, heart rate zones, distance, altitude data

## Pagination

Most collection endpoints support pagination with the following parameters:

- `limit`: Number of records to return (max 25)
- `start`: Start time filter (ISO 8601)
- `end`: End time filter (ISO 8601)
- `nextToken`: Token for next page

## Error Handling

The MCP server includes comprehensive error handling:

- Invalid credentials
- Rate limiting
- Network errors
- Invalid parameters
- Missing required fields

## Development

### Project Structure

```
src/
├── index.ts          # Main entry point
├── mcp-server.ts     # MCP server implementation
├── whoop-api.ts      # WHOOP API client
└── types.ts          # TypeScript type definitions
```

### Available Scripts

- `npm run build` - Build the TypeScript project
- `npm start` - Run the built server
- `npm run dev` - Run in development mode with hot reload
- `npm run watch` - Watch for changes and rebuild

### Adding New Endpoints

To add new WHOOP API endpoints:

1. Add the endpoint method to `WhoopApiClient` in `whoop-api.ts`
2. Add corresponding types to `types.ts`
3. Add the tool definition and handler to `mcp-server.ts`

## WHOOP API Documentation

For detailed information about the WHOOP API, visit:
- [WHOOP Developer Platform](https://developer.whoop.com/docs/introduction)
- [WHOOP API Reference](https://developer.whoop.com/api)

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the WHOOP API documentation
2. Review the error messages from the MCP server
3. Ensure your OAuth credentials are correctly configured
4. Verify your access token is valid and not expired

## Migration Notice

**IMPORTANT**: WHOOP v2 API is now available and migration is required by October 1, 2025. The current v1 API and webhooks will be removed after this date. This MCP server uses the v2 API.
