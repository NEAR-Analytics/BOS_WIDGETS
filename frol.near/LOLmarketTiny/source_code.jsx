const tokens = Near.view("lolmarket.qbit.near", "nft_tokens", {});
const tokensOnSale = Near.view("lolmarket.qbit.near", "nft_tokens_on_sale", {});

if (!tokens || !tokensOnSale) {
  return <></>;
}

return (
  <>
    {JSON.stringify(tokens)} {JSON.stringify(tokens)}
  </>
);
