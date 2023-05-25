const accountId = context.accountId;
const authorForWidget =
  "7418d5cb7d7657e526b8bccf28750939105828d0f5b34a7254bd107477d84a2c";

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

let items = Social.get(`${accountId}/testPersons/**`);

console.log("items", items);
const myState = State.init({
  name: "",
  profession: "",
  description: "",
  allPersons: items ? items : null,
});

if (myState.allPersons === null) {
  State.update(
    {
      allPersons: items,
    },
    [items]
  );
}
//Add items to the local state
function addItem() {
  let currItems = myState.allPersons;
  //If key has space
  let key = Object.keys(myState.allPersons).length;

  currItems[key] = {
    name: myState.name,
    description: myState.description,
    profession: myState.profession,
  };

  State.update({
    allPersons: currItems,
    name: "",
    profession: "",
    description: "",
  });

  console.log(myState);
}

return (
  <div>
    <div>
      <h2>All Persons</h2>
      <div>
        {Object.entries(myState.allPersons).map((item) => (
          <div>
            <a
              href={`#/${authorForWidget}/widget/SingleTestItem?userId=${item[0]}
        `}
            >
              <h4>{item[1].name}</h4>
            </a>
            <h6>{item[1].profession}</h6>
            <h6>{item[1].description}</h6>
          </div>
        ))}
      </div>
    </div>

    <label for="name">Name: </label>
    <input
      type="text"
      id="name"
      value={myState.name}
      onChange={(e) => State.update({ name: e.target.value })}
    />
    <label for="profession">Profession: </label>
    <input
      type="text"
      id="profession"
      value={myState.profession}
      onChange={(e) => State.update({ profession: e.target.value })}
    />

    <label for="description">Description: </label>
    <input
      type="text"
      id="description"
      value={myState.description}
      onChange={(e) => State.update({ description: e.target.value })}
    />
    <button onClick={addItem}>Add item</button>
    <CommitButton
      data={{ testPersons: myState.allPersons }}
      onCommit={onCommit}
    >
      Upload data
    </CommitButton>
  </div>
);
