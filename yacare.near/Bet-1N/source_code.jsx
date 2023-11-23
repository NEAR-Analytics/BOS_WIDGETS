function bet() {
  Near.call(
    "simplebet.near",
    "bet",
    {},
    "15000000000000",
    "1000000000000000000000000"
  );
}

return (
  <div>
    <button onClick={() => bet()}>Bet 1N</button>
  </div>
);
