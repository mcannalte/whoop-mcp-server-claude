#!/usr/bin/env node

import fs from 'fs';
import { WhoopMcpServer } from './dist/mcp-server.js';

const WHOOP_CONFIG = {
  clientId: '062d270e-37a8-43d3-865c-f9560c5a3e13',
  clientSecret: '4bbbb2fb1ce77f9f250455ff2c1fbfc862c0de100a93de22999b887aeae28bf6',
  redirectUri: 'http://localhost:3000/callback'
};

// Function to load saved tokens
function loadTokens() {
  try {
    if (fs.existsSync('whoop-tokens.json')) {
      const tokenData = JSON.parse(fs.readFileSync('whoop-tokens.json', 'utf8'));
      console.log('✅ Loaded saved tokens from whoop-tokens.json');
      console.log('📅 Tokens saved on:', tokenData.timestamp);
      return tokenData;
    } else {
      console.log('❌ No saved tokens found. Please run the authentication first:');
      console.log('   node auth-app.js');
      return null;
    }
  } catch (error) {
    console.error('❌ Error loading tokens:', error.message);
    return null;
  }
}

// Function to test if tokens are still valid
async function testTokens(accessToken) {
  try {
    const { WhoopApiClient } = await import('./dist/whoop-api.js');
    const client = new WhoopApiClient(WHOOP_CONFIG);
    client.setAccessToken(accessToken);
    
    const userProfile = await client.getUserProfile();
    console.log('✅ Access token is valid!');
    console.log('👤 User:', userProfile.first_name, userProfile.last_name);
    console.log('📧 Email:', userProfile.email);
    return true;
  } catch (error) {
    console.log('❌ Access token is invalid or expired:', error.message);
    return false;
  }
}

// Main function
async function startMcpServer() {
  console.log('🚀 Starting WHOOP MCP Server...');
  console.log('');
  
  // Load saved tokens
  const tokenData = loadTokens();
  if (!tokenData) {
    process.exit(1);
  }
  
  // Test if tokens are still valid
  const isValid = await testTokens(tokenData.accessToken);
  if (!isValid) {
    console.log('');
    console.log('🔄 Please re-authenticate by running:');
    console.log('   node auth-app.js');
    process.exit(1);
  }
  
  console.log('');
  console.log('🎯 Starting MCP server with valid tokens...');
  
  // Create and start the MCP server
  const server = new WhoopMcpServer(WHOOP_CONFIG);
  
  // Set the access token
  server.whoopClient.setAccessToken(tokenData.accessToken);
  
  try {
    await server.run();
    console.log('✅ WHOOP MCP Server is ready for Claude!');
    console.log('');
    console.log('📋 Next steps:');
    console.log('1. Add the server to Claude (Settings → Model Context Protocol)');
    console.log('2. Use path: /Users/danielnissan/Dev/whoop-mcp-server');
    console.log('3. Start asking Claude about your WHOOP data!');
    console.log('');
  } catch (error) {
    console.error('❌ Failed to start MCP server:', error.message);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down WHOOP MCP Server...');
  process.exit(0);
});

// Start the server
startMcpServer().catch((error) => {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
});
