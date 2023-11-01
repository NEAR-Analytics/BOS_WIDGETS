const Root = styled.div`
    
`;

const Cards = styled.div`
    display: flex;
    flex-direction: row;
    gap: 18px;
    margin-top: 32px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
`;

const fetchStoreFrontData = (owner, contractId) => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  mb_views_nft_metadata_unburned(
    where: {nft_contract: {id: {_eq: "${contractId}"}}}
    offset: 0
    order_by: {minted_timestamp: desc}
  ) {
    createdAt: minted_timestamp
    listed: price
    media
    storeId: nft_contract_id
    metadataId: metadata_id
    title
    description
  }
  mb_views_nft_metadata_unburned_aggregate(
    where: {nft_contract: {id: {_eq: "${contractId}"}}}
  ) {
    aggregate {
      count
    }
  }
}
`,
    }),
  });

  State.update({
    storeContracts: response2.body.data.mb_views_nft_metadata_unburned,
    storeNftsCount:
      response2.body.data.mb_views_nft_metadata_unburned_aggregate.aggregate
        .count,
    ownerId: owner,
  });
  console.log("running2", state.storeContracts);
};

fetchStoreFrontData(
  props.ownerId,
  props.daoId
);

const storeNfts = state.storeContracts;

return (
  <Root>
    <Cards>
      {storeNfts &&
        storeNfts.map((data, index) => (
          <div key={index}>
            <Widget
              props={{
                title: data.title,
                description: data.description,
                image: data.media,

                price: data.listed,
                owner: state.ownerId,
                price: data.listed
                  ? (data.listed / 1000000000000000000000000).toFixed(2)
                  : null,
                isListed: data.listed ? "LISTED" : "NOT LISTED",
                tokenId: data.token_id,
                contractId: data.storeId,
                metadataId: data.metadataId,
              }}
              src="jgodwill.near/widget/Mintbase.NFTCard.index"
            />
          </div>
        ))}
    </Cards>
  </Root>
);
