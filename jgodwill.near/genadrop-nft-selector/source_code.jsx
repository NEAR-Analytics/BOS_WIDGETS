const accountId = props.accountId || context.accountId;
const onChange = props.onChange;

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
      }
    ) {
      tokenId: token_id
      contractId: nft_contract_id
      media
    }}
`,
  }),
});

const NFTImageButton = styled.div`
  width: 6vw;
  aspect-ratio: 1/1;
  height: 6vw;
  transition: all 0.3s ease-in;
  &:hover{
    transform: scale(1.06);
  }
`;

const NFTs = styled.div`
  height:100vw;
`;

const finalData = data?.body?.data;

if (!finalData) {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center flex-column">
      <p>You own no NFT yet.</p>
      <p>
        You can mint an NFT on 💧
        <a href="https://genadrop.io" target="_blank" rel="noopener noreferrer">
          GenaDrop
        </a>
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: [props.ownerId], dep: true }}
        />
      </p>
    </div>
  );
}

return (
  <>
    <NFTs className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
      {finalData.tokens.map((nft, index) => (
        <NFTImageButton
          key={`${nft.contractId}-${nft.tokenId}-${index}`}
          role="button"
          onClick={() => {
            onChange({
              contractId: nft.contractId,
              tokenId: nft.tokenId,
            });
          }}
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
                borderRadius: "10px",
              },
              className: "",
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
              alt: `NFT ${nft.contractId} ${nft.tokenId}`,
            }}
          />
        </NFTImageButton>
      ))}
    </NFTs>
  </>
);
