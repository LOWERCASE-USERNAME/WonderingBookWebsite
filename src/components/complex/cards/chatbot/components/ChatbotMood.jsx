import { ChatbotButton, ChatbotButtonContainer } from "./DefaultChatbotUI";

export default function ChatbotMood(props) {
  return (
    <ChatbotButtonContainer className="flex-col">
      <ChatbotButton
        onClick={() => props.actionProvider.fetchPosts("mood", "happy")}
        className={""}
      >
        Hạnh phúc
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.fetchPosts("mood", "sad")}
        className={""}
      >
        Buồn chán
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.fetchPosts("mood", "angry")}
        className={""}
      >
        Tức giận
      </ChatbotButton>
      <ChatbotButton
        onClick={() =>
          props.actionProvider.fetchPosts("mood", "no-motivations")
        }
        className={""}
      >
        Thiếu động lực
      </ChatbotButton>
    </ChatbotButtonContainer>
  );
}
