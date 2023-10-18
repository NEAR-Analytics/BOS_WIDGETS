function fetchData() {
  if (!state.account) {
    State.update({
      account: accountId,
    });
  }
  const response = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  mb_views_nft_tokens(
    where: {owner: {_eq: "mob.near"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {_is_null: false}}}
    order_by: {last_transfer_timestamp: desc}
  ) {
    nft_contract_id
    title
    description
    media
    last_transfer_receipt_id
  }
}

`,
    }),
  });

  State.update({
    nftStores: response.body.data.mb_views_nft_tokens,
  });
  //   console.log("running", response);
}

fetchData();
console.log("res:", state.nftStores);

return <div>Hello World</div>;
