const accountId = props.accountId ?? context.accountId;

const template = "hack.near/widget/city.ai";

const [systemPrompt, setSystemPrompt] = useState("");
const [creatorId, setCreatorId] = useState(accountId);
const [name, setName] = useState("");
const [initialMessage, setInitialMessage] = useState("");

const handleCreate = () =>
  Social.set({
    widget: {
      [`${name}`]: {
        "": `const accountId = props.accountId ?? context.accountId; return <Widget src="hack.near/widget/city.ai" props={{ systemPrompt: "${systemPrompt}", initialMessage: "${initialMessage}" }} />`,
        metadata: {
          tags: {
            build: "",
          },
        },
      },
    },
  });

return (
  <>
    <h3>Create Your Own AI Chatbot</h3>
    <div className="m-2 mt-3">
      <h5>System Prompt</h5>
      <input
        type="text"
        placeholder="You support development of communities that build tools to improve urban life."
        value={systemPrompt}
        onChange={(e) => setSystemPrompt(e.target.value)}
      />
    </div>
    <div className="m-2 mt-3">
      <h5>Initial Message</h5>
      <input
        type="text"
        placeholder="Hi, let's build AI together!"
        value={initialMessage}
        onChange={(e) => setInitialMessage(e.target.value)}
      />
    </div>
    <div className="m-2 mt-3">
      <h5>Name (for the widget)</h5>
      <input
        type="text"
        placeholder="city.ai"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="m-2 mt-3">
      <button
        disabled={!name || !systemPrompt || !initialMessage}
        className="btn btn-success mx-1"
        onClick={handleCreate}
      >
        Create
      </button>
      <a
        className="btn btn-outline-success mx-1"
        href="#/edit/hack.near/widget/city.ai"
      >
        Customize
      </a>
    </div>
    <hr />
    <h4>Preview</h4>
    <br />
    <Widget
      src={template}
      props={{
        systemPrompt: systemPrompt,
        initialMessage: initialMessage,
      }}
    />
  </>
);
