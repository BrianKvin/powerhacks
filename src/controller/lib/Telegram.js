const e = require("express");
const { axiosInstance } = require("./axios");
const { createWebsite } = require("./gemini");
const { pushToGitHub } = require("./github");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_URL.split("@")[1],
  api_key: process.env.CLOUDINARY_URL.split("//")[1].split(":")[0],
  api_secret: process.env.CLOUDINARY_URL.split(":")[2].split("@")[0],
});

let websiteTitle = "";
let websiteDescription = "";
let websiteContacts = "";
let websitePhotos = [];
let websiteColors = "";

function sendMessage(messageObj, messageText) {
  return axiosInstance.get("sendMessage", {
    chat_id: messageObj.chat.id,
    text: messageText,
  });
}

async function handleMessage(messageObj) {
  const messageText = messageObj.text || "";

  if (messageText.charAt(0) === "/") {
    const command = messageText.split(" ")[0].substr(1);
    switch (command) {
      case "start":
        websiteTitle = "";
        websiteDescription = "";
        websiteContacts = "";
        websitePhotos = [];
        websiteColors = "";
        return sendMessage(
          messageObj,
          `Hello! I am Kwike:) I can help you create websites faster and easier with just text. 
          Please follow these steps:
          1. Enter the title of your website.
          2. Enter the description of your website.
          3. Enter the contact information for your website.
          4. Upload photos for your website (optional, type "skip" to skip).
          5. Select colors for your website (optional, type "skip" to skip).
          Type /done when finished. You can cancel the session at any time by typing /cancel.\n\nPlease enter your website title below:`
        );
      case "cancel":
        websiteTitle = "";
        websiteDescription = "";
        websiteContacts = "";
        websitePhotos = [];
        websiteColors = "";
        return sendMessage(
          messageObj,
          "Session has been cancelled. Type /start to start again."
        );
      case "help":
        return sendMessage(messageObj, "I can't help you.");
      case "suprise":
        return sendMessage(messageObj, "Boo!");
      case "done":
        await sendMessage(
          messageObj,
          "Creating your website, please wait... \n This can take up to 2 minutes."
        );

        const fineTunedPrompt = `
          Create a responsive, single-file HTML website with the following specifications:

          1. Layout Requirements:
          - Minimum height of 100vh (full viewport height)
          - Use a container element with a minimum height of 85vh for the main content
          - Footer must be fixed at the bottom, covering 100% width, with a minimum height of 15vh
          - Use modern, clean design with responsive layout
          - Utilize flexbox or grid for optimal content arrangement

          2. Styling Guidelines:
          - Embed all styles within <style> tag or use inline styles
          - Implement a contemporary color palette with good contrast
          - Ensure mobile responsiveness
          - Use modern typography with readable font sizes
          - Add subtle animations or hover effects for interactivity

          3. Content Recommendations:
          - Maximize informative content related to the website description
          - Include multiple sections to provide comprehensive information
          - Use semantic HTML5 tags for better structure
          - Add relevant headings, paragraphs, and possibly lists or cards
          - Incorporate a clear, compelling call-to-action

          4. Technical Constraints:
          - Single HTML file (no external CSS)
          - Responsive design that works on mobile and desktop
          - Accessible and semantic markup

          5. Content Strategy:
          - Break down the description into logical sections
          - Use headings, subheadings, and descriptive text
          - Include relevant imagery or icons if appropriate
          - Ensure text is informative and engaging

          Website Title: ${websiteTitle}
          Website Description: ${websiteDescription}
          Contact Information: ${websiteContacts}
          Photos: ${websitePhotos.join(", ")}
          Colors: ${websiteColors}

          Specific Instructions:
          - Output ONLY the complete HTML file
          - Do not include any explanatory text or comments outside the HTML
          - Ensure the website looks professional and matches the description precisely
          - Add more wording to the website content to make it more professional and detailed from the description given.
        `;

        try {
          const websiteContent = await createWebsite(fineTunedPrompt);
          const cleanWebsiteContent = websiteContent
            .substring(websiteContent.indexOf("<!DOCTYPE html>")) // Start from DOCTYPE
            .replace(/^html\s*/, "") // Remove 'html' and any following whitespace at start
            .replace(/`/g, "")
            .trim();

          // console.log(cleanWebsiteContent);

          const repoName = `website-${uuidv4().slice(0, 5)}`; // Create unique repo name
          const githubPagesUrl = await pushToGitHub(
            cleanWebsiteContent,
            repoName
          );

          // Reset all fields
          websiteTitle = "";
          websiteDescription = "";
          websiteContacts = "";
          websitePhotos = [];
          websiteColors = "";

          return sendMessage(
            messageObj,
            `Your website is ready! View it here: ${githubPagesUrl}\nNote: It may take a few minutes for your page to deploy your site and might see a 404 error initially.`
          );
        } catch (error) {
          console.error("Error:", error);
          return sendMessage(
            messageObj,
            "Sorry, there was an error creating your website. Please try again."
          );
        }
      default:
        return sendMessage(messageObj, "Unknown command.");
    }
  } else {
    if (!websiteTitle) {
      websiteTitle = messageText;
      return sendMessage(
        messageObj,
        "Title added. Now, please enter the description of your website."
      );
    } else if (!websiteDescription) {
      websiteDescription = messageText;
      return sendMessage(
        messageObj,
        "Description added. Now, please enter the contact information for your website."
      );
    } else if (!websiteContacts) {
      websiteContacts = messageText;
      return sendMessage(
        messageObj,
        "Contact information added. Now, please upload photo for your website (optional, type 'skip' to skip)."
      );
    } else if (
      messageText.toLowerCase() === "skip" &&
      websitePhotos.length === 0
    ) {
      return sendMessage(
        messageObj,
        "Photo upload skipped. Now, please select colors for your website (optional, type 'skip' to skip)."
      );
    } else if (websitePhotos.length === 0) {
      try {
        const photoUrl = await uploadPhoto(messageObj);
        websitePhotos.push(photoUrl);
        return sendMessage(
          messageObj,
          "Photo uploaded successfully. please select colors for your website (optional, type 'skip' to skip)."
        );
      } catch (error) {
        return sendMessage(
          messageObj,
          "Failed to upload photo. Please try again or type 'skip' to skip."
        );
      }
    } else if (messageText.toLowerCase() === "skip" && !websiteColors) {
      return sendMessage(
        messageObj,
        "Color selection skipped. Type /done when finished."
      );
    } else if (!websiteColors) {
      websiteColors = messageText;
      return sendMessage(messageObj, "Colors added. Type /done when finished.");
    } else {
      return sendMessage(
        messageObj,
        "Unknown input. Please type /done when finished."
      );
    }
  }
}

async function uploadPhoto(messageObj) {
  const photo = messageObj.photo[messageObj.photo.length - 1]; // Get the highest resolution photo
  const fileId = photo.file_id;
  const filePathResponse = await axiosInstance.get(`getFile`, {
    file_id: fileId,
  });
  const filePath = filePathResponse.data.result.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${process.env.MY_TOKEN}/${filePath}`;

  const uploadResponse = await cloudinary.uploader.upload(fileUrl);
  return uploadResponse.secure_url;
}

module.exports = { handleMessage };
