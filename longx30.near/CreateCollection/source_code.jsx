const { accountId } = context;
State.init({
  collectionId: "",
});

const formattedParams = {
  token_metadata: {
    title: "NFT Coffee 2 Earn",
    media:
      "bafybeidhs7ury6oodooi5tn2gzajayp7ltdtpu2srdzy5l7ddk4qk3rbme/cafe1.f8c4ab5c.png",
    reference:
      "bafybeif4orjxgtx2qcw4quyevkzclwqbdl3zgkhzvtdvq4b4sqogcdniqy/c2e.metadata.json",
    copies: 100,
  },
  price: null,
  royalty: {
    [accountId]: 1000,
  },
};

const newAccountId = "alo.near";
const createCollection = () => {
  const collectionId = Near.call(
    "x.paras.near",
    "nft_create_series",
    {
      ...formattedParams,
    },
    300000000000000,
    "8540000000000000000000"
  );
  State.update({
    collectionId: JSON.stringify(collectionId),
  });
};

const mintNft = () => {
  return Near.call(
    "x.paras.near",
    "nft_mint",
    {
      token_series_id: "497736",
      receiver_id: "phieunh96.near",
    },
    300000000000000,
    "8540000000000000000000"
  );
};

const testView = () => {
  State.update({
    value: Near.view("nearsocialexamples.near", "get_greeting"),
  });
};

return (
  <div>
    <button onClick={createCollection}>createCollection</button>
    <button onClick={mintNft}>mintNft</button>
    <div>collectionId: {state.collectionId}</div>
  </div>
);
