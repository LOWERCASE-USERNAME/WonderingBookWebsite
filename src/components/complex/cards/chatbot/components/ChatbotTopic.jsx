import { ChatbotButton, ChatbotButtonContainer } from "./DefaultChatbotUI";

export default function ChatbotTopic(props) {
  // console.log(props);
  return (
    <ChatbotButtonContainer className="flex-col">
      <ChatbotButton
        onClick={() => props.actionProvider.fetchPosts("topic", "self-help")}
        className={""}
      >
        Phát triển bản thân
      </ChatbotButton>
      <ChatbotButton
        onClick={() =>
          props.actionProvider.fetchPosts("author", "mental-health")
        }
        className={""}
      >
        Sức khỏe tâm lý
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.fetchPosts("author", "economic")}
        className={""}
      >
        Kinh tế
      </ChatbotButton>
    </ChatbotButtonContainer>
  );
}
