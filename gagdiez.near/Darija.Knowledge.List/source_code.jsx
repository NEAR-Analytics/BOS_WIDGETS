if (context.loading) return "Loading ...";

// We hardcode this, since anyway they need to be coded
const evaluators = {
  Select: "gagdiez.near/widget/Lessons.Select",
  Translate: "gagdiez.near/widget/Lessons.Translate",
};

// map evaluators to their names
const evaluators2name = {};
for (const key of Object.keys(evaluators)) {
  evaluators2name[evaluators[key]] = key;
}

// indexedKnowledge is basically a list of titles, uuids and blockheights
const knowledge = Social.index("knowledge", "darija", { order: "desc" }) || [];

const title2uuid = {};
const uuid2title = {};
for (const indexed of knowledge) {
  let {
    blockHeight,
    value: { title, uuid },
  } = indexed;

  uuid = uuid ? uuid : blockHeight;

  if (uuid in uuid2title) continue;
  title2uuid[title] = { uuid, blockHeight };
  uuid2title[uuid] = title;
}

// We store the lessons as a JSON-encoded array, since anyway we might want to change them
const [lessons, setLessons] = useState([]);
const lessonsDB = Social.get("gagdiez.near/darija/lessons");

useEffect(() => {
  const parsed = JSON.parse(lessonsDB) || [];

  const readableLessons = parsed.map(({ knowledge, evaluator }) => ({
    knowledge: uuid2title[knowledge],
    evaluator: evaluators2name[evaluator],
  }));

  setLessons(readableLessons);
}, [lessonsDB])

// Link to Creator widget
const knowledgeLink = (item) =>
  `/gagdiez.near/widget/Darija.Knowledge.Create?uuid=${item.uuid}&blockHeight=${item.blockHeight}`;

const update = () => {
  // transform lesson title into uuid and evaluator name into link
  const newLessons = lessons.map(({ knowledge, evaluator }) => ({
    knowledge: title2uuid[knowledge].uuid,
    evaluator: evaluators[evaluator],
  }));

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
          {Object.keys(title2uuid).map(key =>
            <li class="list-group-item">
              <a href={knowledgeLink(title2uuid[key])}> {key}</a>
            </li>
          )}
          <li class="list-group-item">
            <a href={knowledgeLink({})}>(+) Nuevo (+)</a>
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
                options: Object.keys(title2uuid),
              },
              evaluator: {
                type: "select",
                options: Object.keys(evaluators),
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
