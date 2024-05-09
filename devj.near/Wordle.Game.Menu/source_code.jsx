const CONTRACT = "w0rdle.near";
const API = "https://nearwordle.com/api";

State.init({
  loading: true,
});

const lastSumbittedDay = Near.view(
  CONTRACT,
  "get_last_submitted_day",
  { accountId: context.accountId },
  "final",
  {
    subscribe: true,
  }
);

const headers = {
  "Content-Type": "application/json",
  "X-Account-ID": context.accountId,
  "X-Auth-Key": props.key,
};

const loadSignature = () => {
  if (!props.isWinner) return;
  Near.asyncView(CONTRACT, "get_last_submitted_day", {
    accountId: context.accountId,
  }).then((lastSumbittedDay) => {
    if (lastSumbittedDay == props.gameNumber) {
      State.update({ submitted: true, loading: false });
      return;
    } else {
      asyncFetch(`${API}/game/signature`, {
        method: "GET",
        headers,
      }).then((res) => {
        if (!res.ok) return props.handleToast("error", "Error", "");
        if (res.body.error)
          return props.handleToast(
            "error",
            "Fail to load the signature",
            res.body.message
          );
        console.log(res.body);
        State.update({ ...res.body, submitted: false, loading: false });
      });
    }
  });
};

const shareMessage = () => {
  const guesses = props.formattedGuesses;
  const fieldArray = guesses.map((g) => {
    return g.map((l) => {
      const hit = l.hit;
      let color;
      if (hit === 1) color = "⬜";
      if (hit === 2) color = "🟨";
      if (hit === 3) color = "🟩";
      return color;
    });
  });
  let field = "";
  fieldArray.forEach((l, i) => {
    const line = `${l.join(" ")}\n`;
    field = field + line;
  });
  const message = `Wordle Near ${props.gameNumber} ${
    props.isWinner ? props.attempts : "X"
  }/6\n\n${field}\nbuilt on BOS`;
  props.handleToast("success", "Copied", "Copied to clipboard");
  return message;
};

const addScore = () => {
  Near.call(CONTRACT, "add_score", {
    addedScore: state.addedScore,
    day: state.day,
    rs: state.rs,
    v: state.v,
  });
};

const ShareIcon = () => (
  <svg
    width="40"
    viewBox="0 0 54 57"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M38.561 49.6521C37.8154 49.5339 36.8901 49.2392 36.2242 48.9122C33.2128 47.4312 31.5112 44.0543 32.1697 40.8672C32.2657 40.3947 32.3323 39.9862 32.3175 39.9678C32.3175 39.9678 29.6585 38.5907 26.4507 36.9488L20.6182 33.9631L19.8224 34.7679C18.4655 36.1403 17.1989 36.7789 15.3525 37.0218C11.7069 37.5016 8.16276 35.0665 7.19933 31.4217C6.93356 30.4133 6.93356 28.7569 7.19933 27.7484C8.03135 24.6027 10.7772 22.325 14.016 22.0961C15.9325 21.9632 18.0358 22.7239 19.516 24.086L20.1207 24.6465L26.3191 20.9174C31.7365 17.6587 32.5101 17.1678 32.468 17.0224C32.0841 15.7061 32.0625 15.5837 32.0625 14.4756C32.0595 13.1216 32.2394 12.3328 32.8042 11.1781C33.7595 9.23575 35.5725 7.75893 37.6869 7.19933C38.6953 6.93356 40.3526 6.93356 41.361 7.19933C43.4754 7.76041 45.2875 9.23575 46.2428 11.1781C46.8113 12.3283 46.9881 13.1216 46.9881 14.4756C46.9881 15.8303 46.8106 16.6238 46.2428 17.774C45.5193 19.2498 44.298 20.4707 42.8237 21.1949C40.0168 22.5747 36.755 22.0836 34.4398 19.9324L33.7973 19.334L27.6124 23.0577L21.4265 26.7815L21.5824 27.2321C22.0033 28.4465 22.084 29.6703 21.833 30.881C21.7444 31.2944 21.6998 31.6598 21.7293 31.693C21.7293 31.693 24.414 33.101 27.6277 34.748L33.4692 37.7436L34.0821 37.0867C36.353 34.657 39.8504 34.01 42.8219 35.4717C44.7642 36.427 46.2418 38.2391 46.8007 40.3535C47.0664 41.362 47.0664 43.0192 46.8007 44.0277C46.0993 46.6714 43.9752 48.7949 41.361 49.4601C40.6671 49.6373 39.128 49.7406 38.561 49.6521Z"
      fill="#F9F9F9"
    />
  </svg>
);

useEffect(() => {
  loadSignature();
}, [props.isWinner, lastSumbittedDay]);

if (!props.isWinner) return <></>;
else {
  if (state.loading) return <></>;
  else
    return (
      <div class="d-flex align-items-center justify-content-between">
        <button
          onClick={() => addScore()}
          class={`w-100 fw-bold px-2 py-1 border-0 rounded text-white ${
            state.submitted ? "opacity-75" : ""
          }`}
          style={{
            background: "linear-gradient(to top right, #76CB30, #41A828)",
          }}
          disabled={state.submitted}
        >
          {state.submitted ? "YOU HAVE ADDED SCORES" : "ADD RESULT"}
        </button>
        <div
          class="btn"
          onClick={() => {
            clipboard.writeText(shareMessage());
          }}
        >
          <ShareIcon />
        </div>
      </div>
    );
}
