const WS_ADDRESS = "ws://localhost:8080";
const MAX_RETRIES = 5;
const RECONNECT_DELAY = 1000;
const PONG_WAIT_TIME = 6000;
const MAX_DELAY = 30000;

const userId = context.accountId;

const ConnectionStatus = {
  CONNECTED: "Connected",
  RECONNECTING: "Reconnecting...",
  DISCONNECTED: "Disconnected",
};

const WebSocketState = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
};

const [messages, setMessages] = useState([]);
const [inputValue, setInputValue] = useState("");
const [connectionStatus, setConnectionStatus] = useState(
  ConnectionStatus.DISCONNECTED
);
const [connectedUsers, setConnectedUsers] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);

const socketRef = useRef(null);
const retryCountRef = useRef(0);
const shouldReconnectRef = useRef(true);
const pingIntervalRef = useRef(null);

const setupWebSocket = () => {
    const ws = new WebSocket(WS_ADDRESS);

    ws.onopen = () => {
      console.log("Connected to the WebSocket");
      setConnectionStatus(ConnectionStatus.CONNECTED);
      retryCountRef.current = 0;

      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }

      pingIntervalRef.current = setInterval(() => {
        if (ws.readyState === WebSocketState.OPEN) {
          ws.send("ping");
        }
      }, PONG_WAIT_TIME);
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);

      if (event.data === "pong") {
        console.log("Received pong");
        setConnectionStatus(ConnectionStatus.CONNECTED);
        return;
      }

      const parsedEvent = JSON.parse(event.data);
      if (parsedEvent.type === "usersList") {
        setConnectedUsers(parsedEvent.users);
        return;
      } else if (parsedEvent.type === "message") {
        setMessages((prev) => [
          ...prev,
          `Received ${parsedEvent.content} from ${parsedEvent.from}`,
        ]);
        return;
      }
    };

    ws.onclose = () => {
      setConnectionStatus(
        ConnectionStatus.RECONNECTING +
          "..." +
          retryCountRef.current +
          "attempts"
      );
      if (shouldReconnectRef.current && retryCountRef.current < MAX_RETRIES) {
        setTimeout(
          setupWebSocket,
          Math.min(
            RECONNECT_DELAY * Math.pow(2, retryCountRef.current),
            MAX_DELAY
          )
        );
        retryCountRef.current++;
      } else {
        setConnectionStatus(ConnectionStatus.DISCONNECTED);
      }
    };

    ws.onerror = () => {
      setConnectionStatus(ConnectionStatus.DISCONNECTED);
    };
    
    socketRef.current = ws;
  };
useEffect(() => {
  setupWebSocket();

  return () => {
    shouldReconnectRef.current = false;
    clearInterval(pingIntervalRef.current);
    if (socketRef.current) {
      socketRef.current.close();
    }
  };
}, []);

const handleRegister = () => {
  if (
    socketRef.current &&
    socketRef.current.readyState === WebSocketState.OPEN
  ) {
    socketRef.current.send(JSON.stringify({ register: true, userId }));
  }
};

const handleInputChange = (event) => {
  setInputValue(event.target.value);
};

const handleSendMessage = () => {
  if (socketRef.current && inputValue !== "" && selectedUser) {
    const messageData = {
      content: inputValue,
      to: selectedUser,
      from: userId,
    };
    socketRef.current.send(JSON.stringify(messageData));
    setInputValue("");
  }
};

const handleManualReconnect = () => {
  if (
    !socketRef.current ||
    socketRef.current.readyState === WebSocketState.CLOSED
  ) {
    retryCountRef.current = 0;
    setupWebSocket();
  }
};

return (
  <>
    <div className="App">
      <h2>WebSocket Test Client</h2>
      <h3>Status: {connectionStatus}</h3>
      <button onClick={handleRegister}>Register</button>
      <div>
        <input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={handleManualReconnect}>Manual Reconnect</button>
      </div>
      <h4>Connected Users:</h4>
      {connectedUsers.length === 0 && <p>No connected users</p>}
      {connectedUsers.length > 0 && connectedUsers.map((user, index) => (
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <input 
                style={{width: '24px', height: '24px', marginRight: '10px'}}
                type="radio" 
                name="connectedUsers" 
                value={user} 
                checked={selectedUser === user} 
                onChange={() => setSelectedUser(user)} 
              />
              {user}
            </div>
        
        ))}
      <h4>Messages:</h4>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  </>
);
