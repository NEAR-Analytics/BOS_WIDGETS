let data = fetch("https://api.airstack.xyz/gql", {
  body: '{"query":"query QB9 {  TokenBalances(input: {filter: { tokenAddress: {_eq: \\"0xf1f3ca6268f330fda08418db12171c3173ee39c9\\"}, tokenId: {_eq: \\"4\\"}}, blockchain: ethereum}) {    TokenBalance {      amount      chainId      id      lastUpdatedBlock      lastUpdatedTimestamp      owner {        addresses      }      tokenAddress      tokenId      tokenType      token {        name        symbol      }    }  }}","variables":{}}',
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
if (data === null) {
  return <>Loading...</>;
}
return (
  <table>
    <thead>
      <tr>
        <th>Token Name</th>
        <th>ID</th>
        <th>Owner</th>
        <th>Rest...</th>
      </tr>
    </thead>
    {data.body.data.TokenBalances.TokenBalance.map(
      ({ id, token, owner, ...rest }) => (
        <tr>
          <td>{token.name}</td>
          <td>{id.slice(70)}</td>
          <td>{owner.addresses.join(", ")}</td>
          <td>{JSON.stringify(rest)}</td>
        </tr>
      )
    )}
  </table>
);
