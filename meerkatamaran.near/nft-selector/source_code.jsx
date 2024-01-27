const accountId = props.accountId || context.accountId;
const onChange = props.onChange;

initState({
  selectedNFT: "",
  setSelectedNFT: "",
  onChange: "",
});
if (!accountId) {
  return <></>;
}
const size = "100%";

const data = fetch("https://graph.mintbase.xyz", {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
  query v2_omnisite_GetOwnedTokens{
    tokens: mb_views_nft_owned_tokens(
      where: {
        owner: { _eq: "${accountId}" }
        minted_timestamp: {_lt: "01/01/2024"},
      }
    ) {
      tokenId: token_id
      contractId: nft_contract_id
      media
    }}
`,
  }),
});

const finalData = data?.body?.data;
console.log(finalData);

const handleSelectNFT = (nft) => {
  console.log(nft);

  onChange(nft);
  isSelected(nft);
};

const isSelected = (nft) => {
  State.update({ setSelectedNFT: nft, selectedNFT: nft });
  return (
    selectedNFT &&
    nft.tokenId === selectedNFT.tokenId &&
    nft.contractId === selectedNFT.contractId
  );
};

if (!finalData) {
  return (
    <>
      <img src="https://cloudflare-ipfs.com/ipfs/bafybeihrehidexjc54qj2t7lvo54wpkwuabm2uikwkf3ld36rbj25a3s2i" />
    </>
  );
}

return (
  <>
    <div
      className="d-flex flex-wrap gap-2 justify-content-center"
      style={{
        height: "334px",
        overflow: "auto",
      }}
    >
      {finalData.tokens.map((nft, index) => (
        <div
          key={`${nft.contractId}-${nft.tokenId}-${index}`}
          role="button"
          style={{
            width: "15%",
            aspectRatio: "1/1",
            border: isSelected ? "2px solid blue" : "none", // Apply border if selected
          }}
          onClick={() => handleSelectNFT(nft)}
        >
          <Widget
            src="mob.near/widget/NftImage"
            props={{
              nft: { tokenId: nft.tokenId, contractId: nft.contractId },
              style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                overflowWrap: "break-word",
              },
              className: "",
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
              alt: `NFT ${nft.contractId} ${nft.tokenId}`,
            }}
          />
        </div>
      ))}
    </div>
  </>
);
