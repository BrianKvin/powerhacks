# KWIKESITE

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Requirements/Prerequisites](#requirementsprerequisites)
- [Setup and Run Locally](#setup-and-run-locally)
- [Future Features](#future-features)
- [Acknowledgements](#acknowledgements)

## Introduction

KWIKESITE is a Telegram bot designed to help small business owners create websites quickly and easily through chat. The bot guides users through a series of steps to gather information about the website and then generates a responsive, single-file HTML website based on the provided details.

## Tech Stack

- Node.js
- Express.js
- Prisma
- Gemini AI API
- Axios
- Cloudinary
- GitHub API
- Telegram Bot API

## Requirements/Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A GitHub account with a personal access token
- A Cloudinary account
- A Telegram bot token

## Setup and Run Locally

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/kwikesite.git
   cd kwikesite
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add the following variables:

   ```env
   DATABASE_URL="your_database_url"
   MY_TOKEN="your_telegram_bot_token"
   GEMINI_API_KEY="your_gemini_api_key"
   GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta"
   GITHUB_TOKEN="your_github_token"
   GITHUB_USERNAME="your_github_username"
   CLOUDINARY_URL="your_cloudinary_url"
   ```

4. **Run Prisma migrations**

   ```sh
   npx prisma migrate dev
   ```

5. **Start the server**

   ```sh
   npm run dev
   ```

6. **Set up Telegram webhook**
   Replace `your_ngrok_url` with your actual ngrok URL:

   ```sh
   curl -F "url=https://your_ngrok_url" https://api.telegram.org/bot${MY_TOKEN}/setWebhook
   ```

7. **Run Tests**
   To run the tests using Jest, use the following command:

   ```sh
   npm test
   ```

## Future Features

- 🌐 Multi-language support
- 📊 Analytics dashboard for website usage
- 🖼️ Enhanced image processing and optimization
- 📝 Customizable website templates
- Intergrate to Whatsapp chat

## Acknowledgements

- [Prisma](https://www.prisma.io/)
- [Axios](https://axios-http.com/)
- [Cloudinary](https://cloudinary.com/)
- [GitHub API](https://docs.github.com/en/rest)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Gemini API](https://ai.google.dev/)

Thank you for using KWIKESITE! If you have any questions or feedback, feel free to reach out.
