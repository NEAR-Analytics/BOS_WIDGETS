const operationsDoc = `
  query MyQuery {
    mb_views_nft_tokens(
      order_by: {last_transfer_timestamp: desc}
      where: {owner: {_eq: "${
        props.wallet_id || context.accountId
      }"}, _and: {burned_timestamp: {_is_null: true}, last_transfer_timestamp: {}}}
    ) {
      nft_contract_id
      title
      description
      media
      last_transfer_receipt_id
      metadata_id
      token_id
      nft_contract_name
      nft_contract_icon
    }
  }
`;

function fetchGraphQL() {
  const result = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: {},
      operationName: "MyQuery",
    }),
  });
  console.log("result", result);
  return result;
}

const res = fetchGraphQL();

if (!(res && res.body)) return "...";

const nfts = res.body.data.mb_views_nft_tokens;
return (
  <>
    {nfts.map((nft) => (
      <div
        key={nft.contract_id + nft.token_id}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#eee",
          padding: "1rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        <img
          style={{ marginBottom: "1rem" }}
          height={60}
          width={60}
          layout="intrinsic"
          src={
            nft.media ??
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          }
        />
        <div
          style={{
            fontWeight: 500,
            fontSize: "1.125rem",
            textAlign: "center",
          }}
        >
          <div>{nft.title}</div>
          <div>[{nft.token_id}]</div>
        </div>
      </div>
    ))}
  </>
);
