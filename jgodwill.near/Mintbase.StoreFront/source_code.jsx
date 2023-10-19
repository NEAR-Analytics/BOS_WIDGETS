const storeNfts = props.storeInfo || [state.storeContracts];

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
& input{
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
  box-shadow:none;
    border:1px solid #0d99ff;
  }
  &::placeholder {
    color: palevioletred;
  }
  }
  .soulbound{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  img{
    width: 100%;
    height: 200px;
    object-fit:cover;
  }
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
    where: {nft_contract: {id: {_eq: "${contractId}"}, owner_id: {_eq: "${owner}"}}}
    offset: 0
    order_by: {minted_timestamp: desc}
  ) {
    createdAt: minted_timestamp
    listed: price
    media
    storeId: nft_contract_id
    metadata_id
    title
    description
  }
  mb_views_nft_metadata_unburned_aggregate(
    where: {nft_contract: {id: {_eq: "${contractId}"}, owner_id: {_eq: "${owner}"}}}
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
  });
  console.log("running2", state.storeContracts);
};

fetchStoreFrontData(props.ownerId, props.storeContract);

return (
  <Cards>
    {storeNfts.map((data, index) => (
      <div key={index}>
        <Widget
          props={{
            title: data.title,
            description: data.description,
            image: data.media,

            price: data.listed,
            owner: data.owner,
            price: data.listed
              ? (data.listed / 1000000000000000000000000).toFixed(2)
              : null,
            isListed: data.listed ? "LISTED" : "NOT LISTED",
            tokenId: data.token_id,
            contractId: data.storeId,
          }}
          src="agwaze.near/widget/CPlanet.NFTCard.index"
        />
      </div>
    ))}
  </Cards>
);
