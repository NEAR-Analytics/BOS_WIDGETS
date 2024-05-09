State.init({
  type: "",
  setup: "",
  punchline: "",
  id: "",
});

Storage.privateSet(
  "jokesApi",
  "https://official-joke-api.appspot.com/random_joke"
);

const fetchJokes = (queryURI) => {
  return asyncFetch(queryURI, {
    method: "GET",
    body: JSON.stringify(data),
  });
};

const getRandomJoke = () => {
  const queryURI = Storage.privateGet("jokesApi");
  fetchJokes(queryURI).then((res) => {
    State.update({
      type: res.body.type,
      setup: res.body.setup,
      punchline: res.body.punchline,
      id: res.body.id,
    });
    console.log(res.body);
  });
};

// Don't judge my frontend, Im a backend Guy ;)
return (
  <div
    style={{
      backgroundColor: "#F8F9FA",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h3 style={{ marginBottom: "16px" }}>Don't Laugh Too Loud</h3>
    <br />
    {state.id && (
      <div style={{ textAlign: "left", marginBottom: "16px" }}>
        <p>{state.setup}</p>
        <p style={{ textAlign: "center" }}>{state.punchline}</p>
      </div>
    )}
    <button
      style={{
        background: state.id ? "#2ea60a" : "#007BFF",
        color: "#FFF",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
      }}
      onClick={getRandomJoke}
    >
      {!state.id ? "Get a Joke" : "Next Joke Please"}
    </button>
  </div>
);
