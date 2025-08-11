# Adding WHOOP MCP Server to Claude

This guide shows you how to add the WHOOP MCP server to Claude so you can access your fitness data directly in conversations.

## Prerequisites

1. **WHOOP API Credentials**: You need a WHOOP Developer account with Client ID and Client Secret
2. **Built MCP Server**: The server must be built and ready to run
3. **Claude Desktop/Web App**: Latest version with MCP support

## Step 1: Set Up Environment Variables

Create a `.env` file in the project directory:

```bash
cp env.example .env
```

Edit `.env` with your WHOOP credentials:
```env
WHOOP_CLIENT_ID=your_actual_client_id
WHOOP_CLIENT_SECRET=your_actual_client_secret
WHOOP_REDIRECT_URI=http://localhost:3000/callback
```

## Step 2: Build the Server

```bash
npm install
npm run build
```

## Step 3: Add to Claude

### Option A: Local Directory (Easiest)

1. **Open Claude Desktop/Web App**
2. **Go to Settings** → **Model Context Protocol**
3. **Click "Add Server"**
4. **Choose "Local Directory"**
5. **Enter the path**: `/Users/danielnissan/Dev/whoop-mcp-server`
6. **Give it a name**: "WHOOP Fitness Data"
7. **Click "Add"**

### Option B: Command Line (More Control)

1. **In Claude Settings** → **Model Context Protocol**
2. **Click "Add Server"**
3. **Choose "Command"**
4. **Enter the command**:
   ```
   node /Users/danielnissan/Dev/whoop-mcp-server/dist/index.js
   ```
5. **Add environment variables**:
   - `WHOOP_CLIENT_ID`: your_client_id
   - `WHOOP_CLIENT_SECRET`: your_client_secret
   - `WHOOP_REDIRECT_URI`: http://localhost:3000/callback

### Option C: Global Installation

Install the server globally:

```bash
npm install -g .
```

Then in Claude, use the command:
```
whoop-mcp-server
```

## Step 4: Test the Connection

Once added to Claude, you can test it by asking:

> "What WHOOP tools are available?"

Claude should list all 18 available tools including:
- `whoop-get-user-profile`
- `whoop-get-cycle-collection`
- `whoop-get-sleep-collection`
- `whoop-get-workout-collection`
- etc.

## Step 5: Authenticate with WHOOP

Before using the tools, you need to authenticate:

1. **Get Authorization URL**:
   > "Get the WHOOP authorization URL"

2. **Visit the URL** in your browser and authorize the app

3. **Exchange the code** for an access token:
   > "Exchange this code for a token: [your_code]"

4. **Set the access token**:
   > "Set the access token: [your_access_token]"

## Step 6: Start Using WHOOP Data

Now you can ask Claude to:

- "Get my recent workout data"
- "Show me my sleep analysis for the last week"
- "What's my current recovery score?"
- "Analyze my fitness trends over the past month"

## Troubleshooting

### Server Won't Start
- Check that all environment variables are set in `.env`
- Ensure the server is built: `npm run build`
- Verify Node.js 18+ is installed

### Authentication Errors
- Verify your WHOOP credentials are correct
- Check that your redirect URI matches what's in WHOOP Developer Console
- Ensure your WHOOP app is approved

### Claude Can't Connect
- Check the server path is correct
- Verify the server is running: `npm test`
- Restart Claude after adding the server

## Example Conversations

Once set up, you can have conversations like:

**You**: "What's my current recovery status?"

**Claude**: *[Uses whoop-get-recovery-collection to fetch your latest recovery data]*

**You**: "Show me my sleep patterns from last week"

**Claude**: *[Uses whoop-get-sleep-collection to analyze your sleep data]*

**You**: "How many calories did I burn in workouts this month?"

**Claude**: *[Uses whoop-get-workout-collection to calculate total calories]*

## Security Notes

- Keep your `.env` file secure and never commit it to version control
- The access token expires, so you may need to refresh it periodically
- You can revoke access anytime using the `whoop-revoke-user-access` tool

## Next Steps

- Explore the examples in the `examples/` directory
- Check the main README.md for detailed API documentation
- Visit the WHOOP Developer Platform for more information
