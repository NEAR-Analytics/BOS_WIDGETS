const [messages, setMessages] = useState([]);
const [inputText, setInputText] = useState("");
const [scrollToBottom, setScrollToBottom] = useState(true);

const handleInputChange = (e) => {
  setInputText(e.target.value);
};

const addMessage = (text, isUser) => {
  const newMessage = { text, isUser };
  setMessages([...messages, newMessage]);
};

const handleSendMessage = () => {
  if (inputText.trim() === "") return;

  // Add user message
  addMessage(inputText, true);
  // Simulate bot response
  setTimeout(() => {
    const userMessage = inputText.trim();
    let botResponse = "죄송해요, 이해하지 못했어요."; // Default bot response

    if (userMessage === "안녕") {
      botResponse = "안녕하세요";
    } else if (userMessage.includes("날씨")) {
      botResponse = "오늘 날씨는 맑아요.";
    } else if (userMessage.includes("시간")) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      botResponse = `현재 시간은 ${hours}시 ${minutes}분이에요.`;
    }

    addMessage(botResponse, true);

    // Set scrollToBottom to trigger scrolling
    setScrollToBottom(true);
  }, 1000); // Simulate a delay for the bot's response

  setInputText("");
};

const ChatAppWrapper = styled.div`
  width: 100%;
  height: 100vh;

  .chat-app {
    background-color: #bacee0;
    width:100%;
    height:100%;
  }
`;

return (
  <ChatAppWrapper>
    <div className="chat-app">
      <div className="chat-window">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.isUser ? "user" : "bot"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div
          className="input-box"
          style={{ position: "fixed", bottom: "0", width: "Calc(100% - 25px)" }}
        >
          <input
            style={{}}
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            style={{
              position: "absolute",
              bottom: "0",
              right: "0",
              height: "100%",
              width: "60px",
            }}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  </ChatAppWrapper>
);
