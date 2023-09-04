const account_id = props.accountId || context.accountId;
if (!account_id) {
  return <div>please login first</div>;
}
const oct_poap_contract = "oct-poap.near";
const data = Near.view(oct_poap_contract, "nft_tokens_for_owner", {
  account_id: account_id,
});

if (!data) {
  return <div></div>;
}

console.log(data);
const size = "10em";

const NftImg = styled.div`
  width: size,
  height: size,
  objectFit: "cover",
  minWidth: size,
  minHeight: size,
  maxWidth: size,
  maxHeight: size,
  overflowWrap: "break-word",
`;

// <div className="grid grid-cols-3 gap-4">
//     {data.map((nft) => {
//       return (
//         <NftImg>
//           <img src={nft.metadata.media} />
//         </NftImg>
//       );
//     })}
//   </div>
return (
  <div className="d-flex gap-4 flex-wrap">
    {data.map((nft) => {
      return (
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: {
              tokenId: nft.token_id,
              contractId: oct_poap_contract,
            },
            style: {
              width: size,
              height: size,
              objectFit: "cover",
              minWidth: size,
              minHeight: size,
              maxWidth: size,
              maxHeight: size,
              overflowWrap: "break-word",
            },
            className: "",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
          }}
        />
      );
    })}
  </div>
);
