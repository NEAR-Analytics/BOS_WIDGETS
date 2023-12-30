if(context.loading) return 'Loading ...';

const uuid = props.uuid;
let inKnown = [];
let inTitle = '';

if (uuid) {
  const retrieved = JSON.parse(Social.get('gagdiez.near/knowledge', uuid));
  inTitle = retrieved.title;
  inKnown = retrieved.knowledge;
}

const [title, setTitle] = useState(inTitle);
const [knowledge, setKnowledge] = useState(inKnown);

const submit = () => {

  if (!title) return;

  Social.set({
    knowledge: JSON.stringify({
      title, knowledge
    }),
    index: {
      knowledge: JSON.stringify({
        key: 'darija',
        value: { uuid, title }
      })
    }
  })
}

return (
  <>
    <div class="mb-3">
      <label for="title">Title</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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

    <button class="btn btn-success align-right" onClick={submit}>Submit</button>
  </>
);
