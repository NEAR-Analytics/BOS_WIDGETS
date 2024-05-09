if (context.accountId === null) return "Please sign in using your Near account";

const CONTRACT = "w0rdle.near";
const API = "https://nearwordle.com/api";

State.init({
  loading: true,
  currentGuess: "",
});

const headers = {
  "Content-Type": "application/json",
  "X-Account-ID": context.accountId,
  "X-Auth-Key": props.key,
};

const loadGame = () => {
  asyncFetch(`${API}/game/info`, {
    method: "GET",
    headers,
  }).then((res) => {
    if (!res.ok) return props.handleToast("error", "Error", "");
    if (res.body.error)
      return props.handleToast(
        "error",
        "Fail to load the game",
        res.body.message
      );
    State.update({ ...res.body, loading: false });
  });
};

const handleKeys = (key) => {
  if (state.guesses.length > 5) return;
  if (state.isWinner) return;

  if (key === "Backspace") {
    State.update({ currentGuess: state.currentGuess.slice(0, -1) });

    return;
  }
  if (/^[A-Za-z]$/.test(key)) {
    if (state.currentGuess.length < 5) {
      State.update({ currentGuess: state.currentGuess + key });
    }
    return;
  }
  if (key === "Enter") {
    if (state.currentGuess.length !== 5) return;

    asyncFetch(`${API}/game/guess`, {
      method: "POST",
      headers,
      body: JSON.stringify({ guess: state.currentGuess }),
    }).then((res) => {
      if (!res.ok) return props.handleToast("error", "Error", "");
      if (res.body.error)
        return props.handleToast("info", "Oops", res.body.message);
      const { formattedGuess, isWinner } = res.body;
      console.log(res);
      State.update({
        currentGuess: "",
        isWinner,
        guesses: [...state.guesses, formattedGuess],
      });
    });
  }
};

const formatGuesses = () => {
  const currentGuessArray = [...state.currentGuess];
  let formattedCurrentGuess;
  if (!state.isWinner) {
    if (state.guesses.length < 6) {
      formattedCurrentGuess = currentGuessArray.map((l, i) => {
        return { key: currentGuessArray[i], hit: 0 };
      });
      formattedCurrentGuess = [
        ...formattedCurrentGuess,
        ...Array(5 - formattedCurrentGuess.length).fill({
          key: "",
          hit: 0,
        }),
      ];
    }
  }

  const undefinedGuess = Array(5).fill({
    key: "",
    hit: state.isWinner ? 3 : 0,
  });

  const guesses = [
    ...state.guesses,
    ...(formattedCurrentGuess ? [formattedCurrentGuess] : []),
    ...Array(6 - state.guesses.length - (formattedCurrentGuess ? 1 : 0)).fill(
      undefinedGuess
    ),
  ];

  return guesses;
};

useEffect(() => {
  loadGame();
}, []);

if (state.loading)
  return <p class="text-center text-white py-4">Loading ...</p>;

if (!state.loading) {
  const formattedGuesses = formatGuesses();

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-4">
          <div class="">
            <Widget src="devj.near/widget/Wordle.Game.Countdown" />
          </div>
          <div class="mt-4">
            <Widget
              src="devj.near/widget/Wordle.Game.Field"
              props={{
                formattedGuesses,
              }}
            />
          </div>
          <div class="mt-4">
            <Widget
              src="devj.near/widget/Wordle.Game.Keyboard"
              props={{
                handleKeys,
                guesses: state.guesses,
              }}
            />
          </div>
          <div class="mt-4">
            <Widget
              src="devj.near/widget/Wordle.Game.Menu"
              props={{
                isWinner: state.isWinner,
                attempts: state.guesses.length,
                gameNumber: state.gameNumber,
                formattedGuesses,
                key: props.key,
                handleToast: props.handleToast,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
