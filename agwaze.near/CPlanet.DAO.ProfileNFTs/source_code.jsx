const Root = styled.div`
    .noNfts {
        span {
            overflow: hidden;
            color: #B0B0B0;
            text-align: center;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: Helvetica Neue;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 148%; /* 23.68px */
        }
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
  mb_views_nft_tokens(
    where: {owner: {_eq: "${contractId}"}}
    offset: 0
    order_by: {minted_timestamp: desc}
  ) {
   minted_timestamp
    nft_contract_id
    title
    listings {
      price
    }
    metadata_id
    description
    media
    last_transfer_receipt_id
  }
}
`,
    }),
  });

  State.update({
    storeContracts: response2.body.data.mb_views_nft_tokens,
  });
};

fetchStoreFrontData(props.ownerId, props.daoId);

const storeNfts = state.storeContracts;

return (
  <Root>
    <Cards>
      {storeNfts.length ? (
        storeNfts.map((data, index) => (
          <div key={index}>
            <Widget
              props={{
                title: data.title,
                description: data.description,
                image: data.media,

                price: data.listed,
                owner: "",
                price: data?.listings?.length
                  ? (data?.listings?.price / 1000000000000000000000000).toFixed(
                      2
                    )
                  : null,
                isListed: data?.listings?.price ? "LISTED" : "NOT LISTED",
                tokenId: data.metadata_id,
                contractId: data.nft_contract_id,
                metadataId: data.metadata_id,
              }}
              src="jgodwill.near/widget/Mintbase.NFTCard.index"
            />
          </div>
        ))
      ) : (
        <div className="noNfts">
          <span>No NFTs to display right now</span>
        </div>
      )}
    </Cards>
  </Root>
);
