const [messages, setMessages] = useState([]);
const [inputText, setInputText] = useState("");
const [scrollToBottom, setScrollToBottom] = useState(true);
const [coinData, setCoinData] = useState([]);

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
    } else if (userMessage.includes("시간")) {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      botResponse = `현재 시간은 ${hours}시 ${minutes}분이에요.`;
    } else if (userMessage.toLowerCase().startsWith("비트코인")) {
      // Fetch Bitcoin price from Binance API
      asyncFetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
        .then(({ body }) => {
          const bitcoinPrice = parseFloat(body.price);

          botResponse = `현재 비트코인 가격은 $${bitcoinPrice.toFixed(
            2
          )}입니다.`;
          addMessage(botResponse, true);
        })
        .catch((error) => {
          console.error("Error fetching Bitcoin price:", error);
          botResponse = "죄송해요, 정보를 가져올 수 없어요.";
          addMessage(botResponse, true);
        });
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
          style={{
            position: "fixed",
            bottom: "50px",
            width: "Calc(100% - 160px)",
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => {
              handleInputChange(e);
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
