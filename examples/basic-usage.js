// Basic usage example for WHOOP MCP Server
// This example shows how to authenticate and fetch user data

// Example of how to use the MCP server tools:

// 1. First, get the authorization URL
const authUrl = await callTool('whoop-get-authorization-url', {});
console.log('Visit this URL to authorize:', authUrl);

// 2. After user authorizes, you'll get a code in the redirect URL
// Exchange the code for an access token
const tokenResponse = await callTool('whoop-exchange-code-for-token', {
  code: 'authorization_code_from_redirect'
});

// 3. Set the access token for future API calls
await callTool('whoop-set-access-token', {
  accessToken: tokenResponse.access_token
});

// 4. Now you can fetch user data
const userProfile = await callTool('whoop-get-user-profile', {});
console.log('User Profile:', userProfile);

const bodyMeasurements = await callTool('whoop-get-user-body-measurements', {});
console.log('Body Measurements:', bodyMeasurements);

// 5. Fetch recent cycles
const cycles = await callTool('whoop-get-cycle-collection', {
  limit: 5
});
console.log('Recent Cycles:', cycles);

// 6. Fetch recent sleep data
const sleepData = await callTool('whoop-get-sleep-collection', {
  limit: 3
});
console.log('Recent Sleep:', sleepData);

// 7. Fetch recent workouts
const workouts = await callTool('whoop-get-workout-collection', {
  limit: 5
});
console.log('Recent Workouts:', workouts);

// 8. Fetch recovery data
const recoveryData = await callTool('whoop-get-recovery-collection', {
  limit: 3
});
console.log('Recent Recovery:', recoveryData);
