const accountId = props.accountId || context.accountId;
console.log(accountId);
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
      }
    ) {
      tokenId: token_id
      contractId: nft_contract_id
      media
    }}
`,
  }),
});

const nfts = data.body?.data?.tokens;
console.log(data);
const Contaienr = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  > div {
    width: 15rem;
    height: 15rem;
    border-radius: 10px;
    overflow: hidden;
    img {
      transition: all 300ms ease-in-out;
    }
    :hover img {
      scale: 1.1;
    }
  }
`;
const size = "100%";
return (
  <Contaienr>
    {nfts?.map((nft) => (
      <div
        key={nft.tokenId}
        className={`${selectedNft?.tokenId === nft.tokenId ? "selected" : ""}`}
        onClick={() => updateState({ selectedNft: nft })}
      >
        <Widget
          src="mob.near/widget/NftImage"
          props={{
            nft: { tokenId: nft.tokenId, contractId: nft.contractId },
            style: {
              width: size,
              height: size,
              objectFit: "cover",
              minWidth: size,
              minHeight: size,
              maxWidth: size,
              maxHeight: size,
              overflowWrap: "break-word",
              borderRadius: "inherit",
            },
            className: "",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
            alt: `NFT ${nft.contractId} ${nft.tokenId}`,
          }}
        />
      </div>
    ))}
  </Contaienr>
);
