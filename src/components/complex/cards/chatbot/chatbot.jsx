import React from "react";
import { Chatbot, createChatBotMessage } from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css"; // Import the styles
import { getArticles } from "../../../../services/articleService";
import config from "./config";
import ActionProvider from "./ActionProvider";

// Define the chatbot configuration

// MessageParser class to handle user responses
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const mood = message.toLowerCase();
    // Check for predefined moods and call fetchPosts from ActionProvider
    if (["happy", "sad", "angry", "motivation"].includes(mood)) {
      this.actionProvider.fetchPosts(mood);
    } else {
      this.actionProvider.handleUnknownMood();
    }
  }
}

// Main Chatbot component
const ChatbotComponent = () => {
  return (
    <Chatbot
      config={config}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
    />
  );
};

export default ChatbotComponent;
