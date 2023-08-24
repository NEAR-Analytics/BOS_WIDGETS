const { accountId } = context;
State.init({
  collectionId: "",
});

const formattedParams = {
  token_metadata: {
    title: "Dark",
    media: "bafybeifdbvb6yzajogbe4dbn3bgxoli3sp7ol7upfmu2givpvbwufydthu",
    reference: "bafybeifvzitvju4ftwnkf7w7yakz7i5colcey223uk2ui4t5z3ss7l2od4",
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
