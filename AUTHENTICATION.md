# WHOOP Authentication Guide

This guide will help you authenticate with WHOOP and set up the MCP server for use with Claude.

## 🚀 Quick Start

### Step 1: Start Authentication
```bash
npm run auth
```

This will:
- Start a local server on http://localhost:3000
- Automatically open your browser to the authentication page
- Handle the complete OAuth flow

### Step 2: Complete Authentication
1. **Click "Connect to WHOOP"** on the authentication page
2. **Log in** to your WHOOP account
3. **Authorize** the application
4. **Wait for completion** - tokens will be saved automatically

### Step 3: Start MCP Server
```bash
npm run start-mcp
```

This will:
- Load your saved authentication tokens
- Test that they're still valid
- Start the MCP server ready for Claude

## 📋 Available Commands

- `npm run auth` - Start the authentication process
- `npm run start-mcp` - Start the MCP server with saved tokens
- `npm test` - Test the server configuration

## 🔐 Token Management

- **Tokens are saved** to `whoop-tokens.json`
- **Access tokens expire** - you may need to re-authenticate
- **Refresh tokens** are automatically handled
- **Secure storage** - tokens are stored locally only

## 🎯 Next Steps

After authentication:
1. **Add to Claude**: Settings → Model Context Protocol → Add Server
2. **Use path**: `/Users/danielnissan/Dev/whoop-mcp-server`
3. **Start asking** Claude about your WHOOP data!

## 🆘 Troubleshooting

### Authentication Fails
- Check your WHOOP credentials
- Ensure your WHOOP app is approved
- Try clearing browser cookies

### Tokens Expired
- Run `npm run auth` again
- The app will automatically refresh tokens

### Server Won't Start
- Ensure you've completed authentication first
- Check that `whoop-tokens.json` exists
- Verify Node.js 18+ is installed
