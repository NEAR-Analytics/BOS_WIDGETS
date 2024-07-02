const [question, setQuestion] = useState("");

const systemPrompt =
  props.systemPrompt ??
  `Today is ${new Date()
    .toISOString()
    .substring(
      0,
      10
    )}. You are a support system of Build City. Your name is Build Bot. Our goal is to develop a community building tools that improve urban life.`;

const [prompt, setPrompt] = useState("");
const [loading, setLoading] = useState(false);
const [response, setResponse] = useState("");

const initialMessage = props.initialMessage;

const [messages, setMessages] = useState(
  props.messages ?? [
    {
      role: "assistant",
      content:
        initialMessage ??
        "Nice to meet you! Let's build AI together. Submit questions to learn how fun and easy it is to make your own customizable chatbot like this one.",
    },
  ]
);

useEffect(() => {
  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return;
  }
  console.log(messages);
  setLoading(true);
  asyncFetch(`https://ai.near.social/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    responseType: "json",
    body: JSON.stringify([
      { role: "system", content: systemPrompt },
      ...messages.slice(-3),
    ]),
  })
    .then(({ body }) => {
      setMessages([...messages, { role: "assistant", content: body.response }]);
    })
    .finally(() => {
      setLoading(false);
    });
}, [messages]);

const submitQuestion = () => {
  setMessages([...messages, { role: "user", content: question }]);
  setQuestion("");
};

const Wrapper = styled.div`
.message {
  border-radius: 2rem;  
  border: 1px solid rgb(222, 226, 230);
  padding: 1em;
  margin-bottom: 1em;

  &.assistant {
    margin-right: 5em;
  }

  &.assistant:before {
    content: "AI";
    color: #999;
  }

  &.user {
    margin-left: 5em;
  }


  p:last-child {
    margin-bottom: 0;
  }
}
`;

return (
  <Wrapper>
    <div className="m-3">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          style={{
            borderTopLeftRadius: "2rem",
            borderBottomLeftRadius: "2rem",
          }}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submitQuestion();
            }
          }}
          placeholder="What's your question?"
          autoFocus
        />
        <button
          className="btn btn-primary"
          style={{
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "2rem",
          }}
          onClick={() => submitQuestion()}
        >
          Submit
        </button>
      </div>
    </div>
    <div className="m-3 d-flex flex-column-reverse">
      {messages.map(({ role, content }, i) => {
        return (
          <div key={i} className={`message ${role}`}>
            {role === "user" && (
              <Widget
                src="mob.near/widget/N.ProfileLine"
                props={{ accountId: context.accountId }}
              />
            )}
            <Markdown text={content} />
          </div>
        );
      })}
      {loading && (
        <div key="loading" className={`message assistant`}>
          <div>
            <span
              className="spinner-grow spinner-grow-sm me-1"
              role="status"
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </div>
  </Wrapper>
);
