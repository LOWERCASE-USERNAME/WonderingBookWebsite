import { ChatbotButton, ChatbotButtonContainer } from "./DefaultChatbotUI";

export default function ChatbotAuthor(props) {
  console.log(props);
  return (
    <ChatbotButtonContainer className="flex-col">
      <ChatbotButton
        onClick={() =>
          props.actionProvider.fetchPosts("author", "stephen king")
        }
        className={""}
      >
        Stephen King
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.fetchPosts("author", "mark manson")}
        className={""}
      >
        Mark Manson
      </ChatbotButton>
    </ChatbotButtonContainer>
  );
}
