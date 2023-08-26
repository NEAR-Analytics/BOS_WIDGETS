const { accountId } = context;

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800;900&display=swap"
).body;

const TextPrimary = styled.div`
    background: linear-gradient(118deg, #FB00FF 0%, #161AF8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    margin: 8px;
`;

const ButtonPrimary = styled.button`
    background:linear-gradient(134.38deg, #F539F8 0%, #C342F9 43.55%, #5356FB 104.51%);
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-radius: 100px;
    color: #fff;
    font-size: 16px;
    line-height: 21px;
    font-weight: 700;
    padding: 12px 28px;
    margin: 8px;
`;

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
    <ButtonPrimary onClick={createCollection}>Create Collection</ButtonPrimary>

    <TextPrimary>Collection Id: {Storage.get("collectionId")}</TextPrimary>
  </div>
);
