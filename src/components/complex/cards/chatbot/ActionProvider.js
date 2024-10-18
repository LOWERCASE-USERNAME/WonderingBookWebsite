import { getArticles } from "../../../../services/articleService";
import ChatbotHelp from "./components/ChatbotHelp";
import ChatbotMood from "./components/ChatbotMood";
import ChatbotAfterChoices from "./components/ChatbotAfterChoices";
import ChatbotAuthor from "./components/ChatbotAuthor";

export default class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  chooseTopic = () => {
    const message = this.createChatBotMessage(
      "Bạn muốn tìm các bài viết theo chủ đề gì? Nếu những lựa chọn dưới đây đều không phù hợp, hãy nhập ở chatbox bên dưới",
      {
        widget: "topics",
      },
    );
    this.addMessageToState(message);
  };

  chooseAuthor = () => {
    const message = this.createChatBotMessage(
      "Bạn muốn tìm các bài viết của tác giả nào? Nếu những lựa chọn dưới đây đều không phù hợp, hãy nhập ở chatbox bên dưới",
      {
        widget: "authors",
      },
    );
    this.addMessageToState(message);
  };

  chooseMood = () => {
    const message = this.createChatBotMessage(
      "Bạn muốn tìm các bài viết theo cảm xúc nào?",
      {
        widget: "moods",
      },
    );
    this.addMessageToState(message);
  };

  recommend = (chosenAspect) => {
    let aspect = chosenAspect;
    this.fetchBookHandler(aspect);
    const message = this.createChatBotMessage("Mein Vorschlag für dich:");
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage(
      "Wie möchtest du fortfahren? Möchtest du das Buch kaufen? Du kannst mir auch sagen, was dir an der Empfehlung nicht gefällt. Oder du kannst die Suche beenden.",
      {
        widget: "choices",
      },
    );
    this.addMessageToState(message2);
  };

  async fetchPosts(type, option) {
    try {
      switch (type) {
        case "author":
          break;
        case "topic":
          break;
        case "mood":
          break;
        default:
          return;
      }
      const response = await getArticles();
      const posts = response.map((p) => p.title);
      const message = this.createChatBotMessage(
        `Đây là các bài viết tôi gợi ý cho bạn: ${posts}`,
      );
      this.addMessageToState(message);
      // this.setState((prev) => ({
      //   ...prev,
      //   messages: [...prev.messages, message],
      // }));
      const message2 = this.createChatBotMessage(
        "Bạn muốn tiếp tục như thế nào?",
        {
          widget: "choices",
        },
      );
      this.addMessageToState(message2);
    } catch (error) {
      const errorMessage = this.createChatBotMessage(
        "Xin lỗi, đã có lỗi gì đó xảy ra.",
      );
      this.addMessageToState(errorMessage);
    }
  }

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };

  // // Handle unknown moods
  // handleUnknownMood() {
  //   const message = this.createChatBotMessage(
  //     "I didn't recognize that mood. Please try again.",
  //   );
  //   this.setState((prev) => ({
  //     ...prev,
  //     messages: [...prev.messages, message],
  //   }));
  // }
}
