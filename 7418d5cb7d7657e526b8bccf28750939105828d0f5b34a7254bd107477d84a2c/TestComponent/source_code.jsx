const accountId = context.accountId;

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
      allPersons: Social.get(`${accountId}/testWidget/**`),
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
        {Object.values(myState.allPersons).map((item) => (
          <div>
            <h4>{item.name}</h4>
            <h6>{item.profession}</h6>
            <h6>{item.description}</h6>
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
