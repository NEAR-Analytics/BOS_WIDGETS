/*
License: MIT
Author: frol.near
Homepage: https://github.com/frol/bos-component-ts-starter#readme
*/
// Welcome to the home page of the first TypeScript BOS component!









const buildMeAuthorMessage = (text) => ({
  avatar: "https://cdn-icons-png.flaticon.com/512/552/552721.png",
  role: "user",
  content: text,
});

const buildRobotAuthorMessage = (text) => ({
  avatar:
    "https://cdn.discordapp.com/avatars/1065775158062755880/9e014269c4512eee49fe55b30178e334.webp",
  role: "assistant",
  content: text,
});

const translateAuthor = (author) => {
  if (author === "user") return "Você";
  return "Lucy";
};

const Message = (props) => {
  return (
    <div
      style={{
        width: "80%",
        backgroundColor: "#e3e3e3",
        padding: "10px",
        borderRadius: "10px",
        alignSelf: props.role === "user" ? "flex-end" : "flex-start",
        flexBasis: "1",
        flexShrink: "1",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-end",
          marginBottom: "10px",
        }}
      >
        <div style={{ display: "block" }}>
          <img
            src={props.avatar}
            width={"20px"}
            height={"20px"}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <span style={{ display: "block" }}>{translateAuthor(props.role)}</span>
      </div>
      <span style={{ paddingLeft: "8px" }}>{props.content}</span>
    </div>
  );
};

// TypeScript! Yay!


function MainComponent(props, context) {
  // @ts-ignore
  const [messages, setMessages] = useState([]);

  // @ts-ignore
  const [bufferMessage, setBufferMessage] = useState("");
  // @ts-ignore
  const [isLoading, setIsLoading] = useState(false);

  const requestRobot = (history) => {
    // @ts-ignore
    return asyncFetch("https://lucy.monkeybranch.com.br/api/text/gpt35_16k", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system: "valocracy",
        temperature: 0.6,
        messages: history.map(({ role, content }) => ({ role, content })),
      }),
    })
      .then((resp) => {
        const newMessages = [
          ...history,
          buildRobotAuthorMessage(resp.body.data.message),
        ];
        setMessages(newMessages);
      })
      .catch((err) => {
        console.error("Error", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
          gap: "15px",
          overflowY: "auto",
        }}
      >
        {messages.map((props) => {
          return <Message {...props} />;
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <textarea
          disabled={isLoading}
          placeholder="Envie sua mensagem"
          spellCheck="false"
          rows={2}
          onChange={(evt) => {
            setBufferMessage(evt.target.value);
          }}
          value={bufferMessage}
          style={{ resize: "none", padding: "8px" }}
        />
        <button
          disabled={isLoading}
          onClick={() => {
            setIsLoading(true);
            const message = buildMeAuthorMessage(bufferMessage);
            const newMessages = [...messages, message];
            setBufferMessage("");
            setMessages(newMessages);
            requestRobot(newMessages);
          }}
        >
          {isLoading ? "Carregando..." : "Enviar"}
        </button>
      </div>
    </div>
  );
}

return MainComponent(props, context);