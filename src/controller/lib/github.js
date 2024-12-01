const { exec } = require("child_process");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const uniqueDir = `website-${uuidv4().slice(0, 5)}`;

async function createGitHubRepo(repoName) {
  try {
    // Create repository
    const createResponse = await axios.post(
      "https://api.github.com/user/repos",
      {
        name: repoName,
        auto_init: true,
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    // Enable GitHub Pages
    await axios.post(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/pages`,
      {
        source: {
          branch: "main",
          path: "/",
        },
      },
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    return createResponse.data.clone_url;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function pushToGitHub(content, repoName) {
  const repoUrl = await createGitHubRepo(repoName);
  const repoUrlWithAuth = repoUrl.replace(
    "https://",
    `https://${GITHUB_TOKEN}@`
  );

  const commands = [
    `mkdir -p ${uniqueDir}`,
    `cd ${uniqueDir}`,
    `echo '${content.replace(/'/g, "'\\''")}' > index.html`,
    "git init",
    `git config user.name "${GITHUB_USERNAME}"`,
    `git config user.email "${GITHUB_USERNAME}@users.noreply.github.com"`,
    `git remote add origin ${repoUrlWithAuth}`,
    "git add .",
    'git commit -m "Initial commit"',
    "git branch -M main",
    "git push -u origin main --force",
  ].join(" && ");

  return new Promise((resolve, reject) => {
    exec(commands, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
      } else {
        resolve(`https://${GITHUB_USERNAME}.github.io/${repoName}`);
      }
    });
  });
}

module.exports = { pushToGitHub };
