const tokenData = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "anon",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
      query getToken{
        tokens: nft_tokens(
          where: {
            token_id: { _eq: "84686:1154" }
          }
        ) {
          tokenId: token_id
          ownerId: owner
          contractId: nft_contract_id
          reference
          issuedAt: issued_at
          copies
          metadataId: metadata_id
        }
      }
    `,
  }),
});

return <div><pre>{JSON.stringify(tokenData, null, 5)}</pre></div>;
