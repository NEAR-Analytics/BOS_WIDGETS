const claim = () => {
  Near.call(
    "game.hot.tg",
    "ft_transfer_call",
    {
      receiver_id: "doubledog.hot.tg",
      amount: "5000000",
      msg: "",
    },
    "30000000000000",
    "1"
  );
};
return <button onClick={claim}>Claim doubledog</button>;
