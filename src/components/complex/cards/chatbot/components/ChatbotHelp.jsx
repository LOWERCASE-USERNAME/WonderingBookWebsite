import { ChatbotButton, ChatbotButtonContainer } from "./DefaultChatbotUI";

export default function ChatbotHelp(props) {
  return (
    <ChatbotButtonContainer className="flex-col">
      <ChatbotButton
        onClick={() => props.actionProvider.chooseTopic()}
        className={""}
      >
        Tôi muốn tìm bài viết với chủ đề
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.chooseAuthor()}
        className={""}
      >
        Tôi muốn tìm bài viết của tác giả này
      </ChatbotButton>
      <ChatbotButton
        onClick={() => props.actionProvider.chooseMood()}
        className={""}
      >
        Tôi muốn tìm bài viết phù hợp với tâm trạng hiện tại
      </ChatbotButton>
    </ChatbotButtonContainer>
  );
}
