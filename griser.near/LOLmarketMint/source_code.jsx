const mint = () => {
  Near.call(
    "lolcoin.qbit.near",
    "ft_transfer_call",
    {
      receiver_id: "lolmarket.qbit.near",
      amount: "101",
      // msg: '{"Mint": {"title": "First Token", "description": "FIRST", "media": "bafkreifvatnpked4a364btyyyjmn46jngd44msyjyml5ik2qyvbop55msu"}}',
      msg: '{"Mint": {"title": "Код Червоний", "description": "Прізвище та ім\'я в системі lol2023.dots.org.ua червоного кольору RGB", "media": "https://photopro.com.ua/image/cache/BD-Flametone-111-800x800.jpg"}}',
    },
    150000000000000,
    10000000000000000000000
  );
};

return (
  <>
    <button onClick={mint}>Mint</button>
  </>
);
