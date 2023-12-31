if (context.loading) return "Loading ...";

const thash = props.transactionHashes;
if (thash)
  return <a href="/gagdiez.near/widget/Darija.Knowledge.List"> Go back </a>;

const uuid = props.uuid;
const blockHeight = props.blockHeight;

const knowledgeDB = blockHeight
  ? JSON.parse(Social.get("gagdiez.near/knowledge", blockHeight))
  : { title: "", knowledge: [] };

if (!knowledgeDB) return "Loading ...";

const [title, setTitle] = useState(knowledgeDB.title);
const [knowledge, setKnowledge] = useState(knowledgeDB.knowledge);

let submit = () => {
  if (!title) return;
  const toString = JSON.stringify({
    title,
    knowledge,
  });

  Social.set({
    knowledge: toString,
    index: {
      knowledge: JSON.stringify({
        key: "darija",
        value: { uuid, title, date: Date.now() },
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
