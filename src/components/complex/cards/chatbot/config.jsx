import { createChatBotMessage } from "react-chatbot-kit";
import ChatbotHelp from "./components/ChatbotHelp";
import ChatbotMood from "./components/ChatbotMood";
import ChatbotAfterChoices from "./components/ChatbotAfterChoices";
import ChatbotAuthor from "./components/ChatbotAuthor";

const config = {
  botName: "MoodBot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  customComponents: {
    botAvatar: () => <img src="/moodbook_logo.png" className="w-10 h-8" />,
  },
  initialMessages: [
    createChatBotMessage(
      "Xin chào, tôi là Moodbot, hệ thống gợi ý nội dung tóm tắt tự động cho bạn.",
    ),
    createChatBotMessage("Tôi có thể giúp gì cho bạn hôm nay?", {
      widget: "help",
      delay: 0,
    }),
  ],
  widgets: [
    {
      widgetName: "help",
      widgetFunc: (props) => <ChatbotHelp {...props} />,
    },
    {
      widgetName: "authors",
      widgetFunc: (props) => <ChatbotAuthor {...props} />,
    },
    {
      widgetName: "topics",
      widgetFunc: (props) => <ChatbotAuthor></ChatbotAuthor>,
    },
    {
      widgetName: "moods",
      widgetFunc: (props) => <ChatbotMood {...props} />,
    },
    {
      widgetName: "choices",
      widgetFunc: (props) => <ChatbotAfterChoices {...props} />,
    },
  ],
};

export default config;
