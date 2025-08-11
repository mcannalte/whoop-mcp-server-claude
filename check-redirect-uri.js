#!/usr/bin/env node

import { WhoopApiClient } from './dist/whoop-api.js';

const WHOOP_CONFIG = {
  clientId: '062d270e-37a8-43d3-865c-f9560c5a3e13',
  clientSecret: '4bbbb2fb1ce77f9f250455ff2c1fbfc862c0de100a93de22999b887aeae28bf6'
};

// Common redirect URIs to test
const redirectUris = [
  'http://localhost:3000/callback',
  'http://localhost:3000',
  'http://localhost:8080/callback',
  'http://localhost:8080',
  'http://127.0.0.1:3000/callback',
  'http://127.0.0.1:3000',
  'https://localhost:3000/callback',
  'urn:ietf:wg:oauth:2.0:oob', // Out-of-band (for testing)
  'http://localhost:3000/oauth/callback'
];

console.log('🔍 Testing different redirect URIs...\n');

redirectUris.forEach((redirectUri, index) => {
  const client = new WhoopApiClient({
    ...WHOOP_CONFIG,
    redirectUri
  });
  
  const authUrl = client.getAuthorizationUrl();
  console.log(`${index + 1}. Redirect URI: ${redirectUri}`);
  console.log(`   Auth URL: ${authUrl}`);
  console.log('');
});

console.log('📋 Instructions:');
console.log('1. Try each redirect URI in your browser');
console.log('2. See which one doesn\'t give the "invalid_request" error');
console.log('3. Update the auth-app.js with the working redirect URI');
console.log('');
console.log('💡 Most likely working options:');
console.log('   - http://localhost:3000 (without /callback)');
console.log('   - http://127.0.0.1:3000/callback');
console.log('   - urn:ietf:wg:oauth:2.0:oob (for testing)');
