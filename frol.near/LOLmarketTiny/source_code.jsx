const tokens = Near.view("lolmarket.qbit.near", "nft_tokens", {});
const tokensOnSale = Near.view("lolmarket.qbit.near", "nft_tokens_on_sale", {});

if (!tokens || !tokensOnSale) {
  return <></>;
}

const sellForOne = (tokenId) => {
  Near.call(
    "lolmarket.qbit.near",
    "nft_put_on_sale",
    {
      token_id: tokenId,
      price: "100",
    },
    75000000000000,
    0 //1
  );
};

return (
  <>
    <div className="row">
      {Object.entries(tokensOnSale).map(([tokenId, price]) => (
        <div className="col col-sm">
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              contractId: "lolmarket.qbit.near",
              tokenId,
            }}
          />
          <button onClick={() => sellForOne(token.token_id)}>
            Buy for {parseFloat(price) / 100} LOL
          </button>
        </div>
      ))}
    </div>

    <div className="row">
      {tokens.map((token) => (
        <div className="col col-sm">
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              //   nft: {
              contractId: "lolmarket.qbit.near",
              tokenId: token.token_id,
              //tokenMetadata: { media: token.metadata.media },
              //   },
            }}
          />
          <button onClick={() => sellForOne(token.token_id)}>
            Sell for 1 LOL
          </button>
        </div>
      ))}
    </div>
  </>
);
