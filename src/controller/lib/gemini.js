const axios = require("axios");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta";

async function createWebsite(description) {
  try {
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: description,
            },
          ],
        },
      ],
    };

    const response = await axios.post(
      `${GEMINI_API_URL}/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const generatedText = response.data.candidates[0]?.content.parts[0]?.text;

    if (!generatedText) {
      throw new Error("No response generated");
    }

    return generatedText;
  } catch (error) {
    console.error(
      "Error creating website:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = { createWebsite };
