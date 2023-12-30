if (context.loading) return "Loading ...";

const [lessons, setLessons] = useState([]);

// indexedKnowledge is basically a list of titles, uuids and blockheights
const indexedKnowledge =
  Social.index("knowledge", "darija", { order: "desc" }) || [];

// We store the lessons as a JSON-encoded array, since anyway we might want to change them
const lessonsDB = JSON.parse(Social.get("gagdiez.near/darija/lessons")) || [];
setLessons(lessonsDB);

const uuids = [];
const filteredKnowledge = [];

for (const indexed of indexedKnowledge) {
  let {
    blockHeight,
    value: { title, uuid },
  } = indexed;

  console.log(uuid, blockHeight, title);

  uuid = uuid ? uuid : blockHeight;

  if (uuids.includes(uuid)) continue;
  uuids.push(uuid);
  filteredKnowledge.push({ uuid, blockHeight, title });
}

// We hardcode this, since anyway they need to be coded
const evaluators = [
  { name: "Select", link: "gagdiez.near/widget/Lessons.Select" },
  { name: "Translate", link: "gagdiez.near/widget/Lessons.Translate" },
];

// Link to Creator widget
const knowledgeLink = (blockHeight) =>
  `/gagdiez.near/widget/Darija.Knowledge.Create?uuid=${blockHeight}`;

// lessonsDB is {knowledge: uuid, evaluator: link}
// we need to transform it into {knowledge: title, evaluator: name}
for (const lesson of lessonsDB) {
  const knowledge = filteredKnowledge.find(
    (item) => item.uuid === lesson.knowledge
  ).title;
  const evaluator = evaluators.find((item) => item.link === lesson.evaluator)
    .name;
  lesson.knowledge = knowledge;
  lesson.evaluator = evaluator;
}

const update = () => {
  // transform lesson title into uuid and evaluator name into link
  const newLessons = lessons.map((lesson) => {
    const knowledge = filteredKnowledge.find(
      (item) => item.title === lesson.knowledge
    ).uuid;
    const evaluator = evaluators.find(
      (item) => item.name === lesson.evaluator
    ).link;
    return { ...lesson, knowledge, evaluator };
  });

  Social.set({
    darija: { lessons: JSON.stringify(newLessons) },
  });
};

return (
  <>
    <div className="container">
      <div className="">
        <h5>Knowledge</h5>
        <ul className="list-group mt-3">
          {filteredKnowledge.map((item, index) => (
            <li class="list-group-item">
              <a href={knowledgeLink(item.blockHeight)}> {item.title}</a>
            </li>
          ))}
          <li class="list-group-item">
            <a href={knowledgeLink(null)}>(+) Nuevo (+)</a>
          </li>
        </ul>
      </div>
      <hr />
      <div className="">
        <h5>Lessons</h5>
        <Widget
          src="gagdiez.near/widget/Darija.Components.Table"
          props={{
            elements: lessons,
            keys: ["knowledge", "evaluator"],
            editors: {
              knowledge: {
                type: "select",
                options: filteredKnowledge.map((item) => item.title),
              },
              evaluator: {
                type: "select",
                options: evaluators.map((item) => item.name),
              },
            },
            onUpdate: setLessons,
          }}
        />
        <button class="btn btn-success" onClick={update}>
          Update
        </button>
      </div>
    </div>
  </>
);
