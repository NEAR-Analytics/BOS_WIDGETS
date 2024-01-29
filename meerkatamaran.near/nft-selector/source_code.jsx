const [selectedNFT, setSelectedNFT] = useState(null);
const [allNFTs, setAllNFTs] = useState([]);
const [filteredNFTs, setFilteredNFTs] = useState([]);
const [contractFilter, setContractFilter] = useState("");
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
setAllNFTs(data.data.tokens);
setFilteredNFTs(data.data.tokens);
const handleSelectNFT = (nft) => {
  setSelectedNFT(nft);
  onChange(nft);
};

const isSelected = (nft) => {
  return (
    selectedNFT &&
    nft.tokenId === selectedNFT.tokenId &&
    nft.contractId === selectedNFT.contractId
  );
};

if (!finalData) {
  return (
    <>
      <Image src="https://cloudflare-ipfs.com/ipfs/bafybeihrehidexjc54qj2t7lvo54wpkwuabm2uikwkf3ld36rbj25a3s2i"></Image>
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
            border: isSelected(nft) ? "4px solid blue" : "none", // Apply border if selected
          }}
          onClick={() => handleSelectNFT(nft)}
        >
          <Widget
            src="sharddog.near/widget/Image.Minted"
            props={{
              nft: { tokenId: nft.tokenId, contractId: nft.contractId },
              title: nft.owner_id,
              timestamp: nft.minted_timestamp,
              image: {
                url: nft.media,
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
              alt: `NFT ${nft.contractId} ${nft.tokenId}`,
            }}
          />
        </div>
      ))}
    </div>
  </>
);
