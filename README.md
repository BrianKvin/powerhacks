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
- Gemini AI API
- Axios
- Cloudinary
- GitHub API
- Telegram Bot API

## Demo

- This is the project pitch deck [pitch deck](https://www.canva.com/design/DAGX17naNgA/YNiwVj_wpHYQIqvK1qYnRA/view?utm_content=DAGX17naNgA&utm_campaign=designshare&utm_medium=link&utm_source=editor)

### Screenshots of the project

![IMG-20241202-WA0015](https://github.com/user-attachments/assets/341c0758-abd6-48f2-96b2-8ee7a69c8b8a)
![IMG-20241202-WA0016](https://github.com/user-attachments/assets/2d0177b2-35fe-41b4-9dd4-fef50db861fe)
![IMG-20241202-WA0017](https://github.com/user-attachments/assets/6fe27c6a-82d0-4254-935b-d951838d34b9)

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
   MY_TOKEN="your_telegram_bot_token"
   GEMINI_API_KEY="your_gemini_api_key"
   GEMINI_API_URL="https://generativelanguage.googleapis.com/v1beta"
   GITHUB_TOKEN="your_github_token"
   GITHUB_USERNAME="your_github_username"
   CLOUDINARY_URL="your_cloudinary_url"
   ```

4. **Start the server**

   ```sh
   npm run dev
   ```

5. **Set up Telegram webhook**
   Replace `your_ngrok_url` with your actual ngrok URL:

   ```sh
   curl -F "url=https://your_ngrok_url" https://api.telegram.org/bot${MY_TOKEN}/setWebhook
   ```

6. **Run Tests**
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

- [Axios](https://axios-http.com/)
- [Cloudinary](https://cloudinary.com/)
- [GitHub API](https://docs.github.com/en/rest)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Gemini API](https://ai.google.dev/)

Thank you for using KWIKESITE! If you have any questions or feedback, feel free to reach out.
