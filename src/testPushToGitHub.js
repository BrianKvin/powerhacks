const { pushToGitHub } = require("./controller/lib/github");
require("dotenv").config();

async function testPushToGitHub() {
  const testContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test Page</title>
    </head>
    <body>
      <h1>Test</h1>
      <p>This is a test page.</p>
    </body>
    </html>
  `;

  const repoName = `test-repo-${Date.now()}`;

  try {
    const result = await pushToGitHub(testContent, repoName);
    console.log("Website URL:", result);
  } catch (error) {
    console.error("Error pushing to GitHub:", error);
  }
}

testPushToGitHub();
