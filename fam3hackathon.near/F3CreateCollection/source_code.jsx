const { accountId } = context;

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
  Storage.set("collectionId", JSON.stringify(collectionId));
};

return (
  <div>
    <button onClick={createCollection}>createCollection</button>

    <div>collectionId: {Storage.get("collectionId")}</div>
  </div>
);
