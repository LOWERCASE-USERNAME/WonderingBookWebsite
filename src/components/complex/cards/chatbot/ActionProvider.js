import { recommendArticles } from "../../../../services/articleService";

export default class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  setLastRequest = (type, option) => {
    const lastRequest = { type, option };
    localStorage.setItem("moodbotLastRequest", JSON.stringify(lastRequest)); // Store in localStorage
  };

  getLastRequest = () => {
    const lastRequest = localStorage.getItem("moodbotLastRequest");
    return lastRequest ? JSON.parse(lastRequest) : null; // Parse from localStorage
  };

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

  endConv = () => {
    const message = this.createChatBotMessage(
      "Tôi rất vui lòng vì đã được giúp đỡ bạn",
    );
    this.addMessageToState(message);
    localStorage.removeItem("moodbotLastRequest");
  };

  resetConv = () => {
    const message = this.createChatBotMessage(
      "Để tôi tạo lại một cuộc trò chuyện mới",
    );
    this.addMessageToState(message);
    localStorage.removeItem("moodbotLastRequest");

    setTimeout(
      () =>
        this.setState((prevState) => ({
          ...prevState,
          messages: prevState.messages.slice(0, 2),
        })),
      2000,
    );
  };

  async fetchPosts(type, option) {
    try {
      this.setLastRequest(type, option);

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
      const response = await recommendArticles();
      this.setState((prevState) => ({
        ...prevState,
        recommendedPosts: [...response],
      }));
      // const baseURL = "http://localhost:5173/";
      // const posts = response.map(
      //   (p) => `<a href="/detail/${p.articleId}">${p.title}</a>`,
      // );
      const message = this.createChatBotMessage(
        `Đây là các bài viết tôi gợi ý cho bạn: `,
        {
          widget: "linkList",
        },
      );
      this.addMessageToState(message);
      const message2 = this.createChatBotMessage(
        "Bạn muốn tiếp tục như thế nào?",
        {
          widget: "choices",
          delay: 500,
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

  newRecommendation = () => {
    const lastRequest = this.getLastRequest();
    if (lastRequest) {
      this.fetchPosts(lastRequest.type, lastRequest.option);
    } else {
      const message = this.createChatBotMessage(
        "Xin lỗi, tôi không thể nhớ lại bạn đã muốn gì!",
      );
      this.addMessageToState(message);
    }
  };
}
