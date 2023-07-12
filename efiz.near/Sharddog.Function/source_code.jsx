function sharddogFetch(limit, offset) {
  return fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
          query MyQuery {
            mb_views_nft_tokens(
                limit: ${limit},
                offset: ${offset}
              where: { nft_contract_id: { _eq: "mint.sharddog.near" }}
              order_by: {minted_timestamp: desc}
            ) {
              media
              owner
            }
          }
        `,
    }),
  }).body.data.mb_views_nft_tokens;
}

return { sharddogFetch };
