if (context.loading) return "Loading ...";

const thash = props.transactionHashes;
if (thash)
  return <a href="/gagdiez.near/widget/Darija.Knowledge.List"> Go back </a>;

const uuid = props.uuid;
const blockHeight = props.blockHeight;

const [title, setTitle] = useState("");
const [knowledge, setKnowledge] = useState([]);
const retrieved = Social.get("gagdiez.near/knowledge", blockHeight);

useEffect(() => {
  const { title, knowledge } = JSON.parse(retrieved);
  setTitle(title);
  setKnowledge(knowledge);
}, [retrieved]);

const submit = () => {
  if (!title) return;

  Social.set({
    knowledge: JSON.stringify({
      title,
      knowledge,
    }),
    index: {
      knowledge: JSON.stringify({
        key: "darija",
        value: { uuid, title },
      }),
    },
  });
};

return (
  <>
    <div class="mb-3">
      <label for="title">Title</label>
      <input
        type="text"
        placeholder={title}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <Widget
      src="gagdiez.near/widget/Darija.Components.Table"
      props={{
        elements: knowledge,
        keys: ["darija", "spanish", "emoji"],
        editors: {
          darija: { type: "text" },
          spanish: { type: "text" },
          emoji: { type: "text" },
        },
        onUpdate: setKnowledge,
      }}
    />

    <button class="btn btn-success align-right" onClick={submit}>
      Submit
    </button>
  </>
);
