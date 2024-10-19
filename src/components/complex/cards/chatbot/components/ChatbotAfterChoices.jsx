import { ChatbotButton, ChatbotButtonContainer } from "./DefaultChatbotUI";

export default function ChatbotAfterChoices(props) {
  return (
    <ChatbotButtonContainer className="flex-col">
      <ChatbotButton
        onClick={() => props.actionProvider.newRecommendation()}
        className={""}
      >
        Tôi không thích những bài viết này
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.chooseTopic()}
        className={""}
      >
        Tôi muốn gợi ý từ những chủ đề khác
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.chooseAuthor()}
        className={""}
      >
        Tôi muốn gợi ý từ những tác giả khác
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.chooseMood()}
        className={""}
      >
        Tôi muốn gợi ý từ những tâm trạng khác
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.endConv()}
        className={""}
      >
        Tôi đã hoàn thành cảm ơn!
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.resetConv()}
        className={""}
      >
        Chúng ta có thể bắt đầu một cuộc trò chuyện mới không?
      </ChatbotButton>
      {/* Add more buttons for other emotions */}
    </ChatbotButtonContainer>
  );
}
