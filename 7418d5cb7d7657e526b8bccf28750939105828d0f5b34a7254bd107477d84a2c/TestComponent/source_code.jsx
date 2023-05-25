const myState = State.init({
  name: "",
  profession: "",
  description: "",
  allPersons: Social.get(`${accountId}/testPersons/**`),
});

//Upload data on chain
function uploadData() {
  Social.set({
    testPersons: myState.allPersons,
  });
}

return (
  <div>
    <label for="name">Name: </label>
    <input
      type="number"
      id="name"
      value={myState.name}
      onChange={(e) => State.update({ name: e.target.value })}
    />
    <label for="profession">Profession: </label>
    <input
      type="number"
      id="profession"
      value={myState.profession}
      onChange={(e) => State.update({ profession: e.target.value })}
    />

    <label for="description">Description: </label>
    <input
      type="number"
      id="description"
      value={myState.description}
      onChange={(e) => State.update({ description: e.target.value })}
    />
    <button>Submut</button>
  </div>
);
