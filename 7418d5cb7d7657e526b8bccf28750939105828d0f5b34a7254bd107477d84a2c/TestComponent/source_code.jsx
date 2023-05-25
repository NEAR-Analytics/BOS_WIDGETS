let items = Social.get(`${accountId}/testPersons/**`);
const myState = State.init({
  name: "",
  profession: "",
  description: "",
  allPersons: items ? items : {},
});

//Upload data on chain
function uploadData() {
  Social.set({
    testPersons: myState.allPersons,
  });
}

//Add items to the local state
function addItem() {
  let currItems = myState.allItems;
  //If key has space
  let key = Object.keys(myState.allItems).length;

  currItems[key] = {
    name: myState.name,
    description: myState.description,
    profession: myState.profession,
  };

  State.update({
    key: "",
    value: "",
    linkValue: "",
    allItems: currItems,
  });

  console.log(myState);
}

return (
  <div>
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
    <CommitButton data={{ testWidget: myState.allItems }} onCommit={onCommit}>
      Upload data
    </CommitButton>
  </div>
);
