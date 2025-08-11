import { WhoopMcpServer } from './mcp-server.js';
import { WhoopApiConfig } from './types.js';

// Test configuration (you'll need to set these in your .env file)
const testConfig: WhoopApiConfig = {
  clientId: process.env.WHOOP_CLIENT_ID || 'test_client_id',
  clientSecret: process.env.WHOOP_CLIENT_SECRET || 'test_client_secret',
  redirectUri: process.env.WHOOP_REDIRECT_URI || 'http://localhost:3000/callback',
};

async function testServer() {
  console.log('Testing WHOOP MCP Server...');
  
  try {
    const server = new WhoopMcpServer(testConfig);
    
    // Test getting authorization URL
    console.log('Testing authorization URL generation...');
    const authUrl = server['whoopClient'].getAuthorizationUrl();
    console.log('Authorization URL:', authUrl);
    
    console.log('✅ WHOOP MCP Server test completed successfully!');
    console.log('Server is ready to use with proper OAuth credentials.');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Only run test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  testServer();
}
