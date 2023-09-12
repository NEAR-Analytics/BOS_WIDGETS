const accountId = context.accountId;

if (!accountId) {
  return <>Please connect wallet</>;
}

const css = `
        h2 {
            color: black;
        }

        .card {
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
        }

        .nft-list {
  display: flex;
  flex-wrap: wrap; /* Allow cards to wrap to the next row */
  justify-content: flex-start; /* Start stacking from the left */
}

.nft-card {
  /* Styling for individual NFT cards */
  margin: 5px; /* Add some margin between cards */
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.selected {
  background-color: #e0e0e0; /* Style for the selected card */
}

        .nft-card:hover {
            background-color: #f0f0f0;
        }


        .submit-button {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            margin-top: 20px;
        }

        .submit-button:hover {
            background-color: #0056b3;
        }
`;

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800"
).body;

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Manrope, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    ${cssFont}
    ${css}
`,
  });
}

const f = fetch(
  `https://api.kitwallet.app/account/genadrop.near/likelyNFTsFromBlock`
);

if (!f.ok) {
  return "Loading";
}

const allContracts = [
  "near-hackerhouse-austin.snft.near",
  "comic.paras.near",
  "nft.genadrop.near",
  "genadrop-contract.nftgen.near",
  "mint.sharddog.near",
];

const allNfts = (allContracts) => {
  let nnf = allContracts.map((contractId, i) => {
    let nftts = Near.view(contractId, "nft_tokens_for_owner", {
      account_id: "genadrop.near",
      from_index: "0",
      limit: 200,
    });
    return nftts.map((nftz) => {
      nftz["contractId"] = contractId;
      return nftz;
    });
  });

  return nnf.flat();
};

const handleNFTClick = (nft) => {
  return;
};

const Theme = state.theme;

const nfts = allNfts(allContracts);
//[
//   {
//     image: "https://placekitten.com/200/200",
//     name: "NFT Name",
//     description: "NFT Description",
//   },
//   {
//     image: "https://picsum.photos/200",
//     name: "NFT Name",
//     description: "NFT Description",
//   },
//   {
//     image: "https://picsum.photos/200",
//     name: "NFT Name",
//     description: "NFT Description",
//   },
// ];

return (
  <Theme>
    <div className="card">
      <h2>Select an NFT</h2>
      <div className="nft-list">
        {nfts.map((nft, i) => (
          <a
            key={i}
            className="text-decoration-none"
            onClick={() => handleNFTClick(nft)}
            href={`#mob.near/widget/NftImage?tokenId=${nft.token_id}&contractId=${nft.contractId}`}
          >
            <Widget
              src="mob.near/widget/NftImage"
              props={{
                nft: { tokenId: nft.token_id, contractId: nft.contractId },
                style: {
                  width: "10em",
                  height: "10em",
                  objectFit: "cover",
                  minWidth: "10em",
                  minHeight: "10em",
                  maxWidth: "10em",
                  maxHeight: "10em",
                  overflowWrap: "break-word",
                  color: "red",
                },
                className: "img-thumbnail",
                fallbackUrl:
                  "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                alt: `NFT ${contractId} ${nft.token_id}`,
              }}
            />
          </a>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  </Theme>
);
