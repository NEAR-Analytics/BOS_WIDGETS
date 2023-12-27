const known = [
  {
    darija: "smiya",
    spanish: "nombre",
    emoji: "💬",
  },
  {
    darija: "ktab",
    spanish: "libro",
    emoji: "📖",
  },
  {
    darija: "medina",
    spanish: "ciudad",
    emoji: "🏙️",
  },
  {
    darija: "tilifun",
    spanish: "telefono",
    emoji: "📞",
  },
  {
    darija: "mesha",
    spanish: "gata",
    emoji: "🐱",
  },
];

const [darija, setDarija] = useState("");
const [spanish, setSpanish] = useState("");
const [emoji, setEmoji] = useState("");
const [knowledge, setKnowledge] = useState(known);
const [hideInput, setHideInput] = useState(known.map(() => true));
const [title, setTitle] = useState("");

const submit = () => {
  const uuid = Date.now();
  Social.set({
    knowledge: JSON.stringify({
      title, knowledge
    }),
    index: {
      knowledge: JSON.stringify({
        key: 'darija',
        value: uuid
      })
    }
  })
}

const change = (index, field, value) => {
  const newKnowledge = [...knowledge];
  newKnowledge[index][field] = value;
  setKnowledge(newKnowledge);
};

const remove = (index) => {
  const newKnowledge = [...knowledge];
  newKnowledge.splice(index, 1);
  setKnowledge(newKnowledge);
};

const add = () => {
  if (!darija || !spanish || !emoji) return;

  const newKnowledge = [...knowledge];
  newKnowledge.push({
    darija,
    spanish,
    emoji,
  });
  setKnowledge(newKnowledge);
  setDarija('');
  setSpanish('');
  setEmoji('');
  setHideInput([...hideInput, true]);
};

return (
  <>
    <h3><input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />  </h3>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Darija</th>
          <th scope="col">Español</th>
          <th scope="col">Emoji</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {knowledge.map((elem, index) => {
          return (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>
                {hideInput[index] && elem.darija}
                <input
                  value={elem.darija}
                  onChange={(e) => change(index, "darija", e.target.value)}
                  hidden={hideInput[index]}
                />
              </td>
              <td>
                {hideInput[index] && elem.spanish}
                <input
                  value={elem.spanish}
                  onChange={(e) => change(index, "spanish", e.target.value)}
                  hidden={hideInput[index]}
                />
              </td>
              <td>
                {hideInput[index] && elem.emoji}
                <input
                  value={elem.emoji}
                  onChange={(e) => change(index, "emoji", e.target.value)}
                  hidden={hideInput[index]}
                />
              </td>
              <td>
                <a
                  className="me-1"
                  onClick={() => {
                    setHideInput(
                      hideInput.map((elem, i) => (i === index ? !elem : elem))
                    );
                  }}
                >
                  ✏️
                </a>
                <a onClick={() => remove(index)}>🗑️</a>
              </td>
            </tr>
          );
        })}
        <tr>
          <th scope="row">#</th>
          <td>
            <input type="text" onChange={(e) => setDarija(e.target.value)} />
          </td>
          <td>
            <input type="text" onChange={(e) => setSpanish(e.target.value)} />
          </td>
          <td>
            <input type="text" onChange={(e) => setEmoji(e.target.value)} />
          </td>
          <td>
            <button class="btn btn-primary" onClick={add}>Add</button>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <button class="btn btn-primary" onClick={submit}>Submit</button>
  </>
);
