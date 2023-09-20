const accountId = context.accountId;

initState({ allTransactions: [] });

useEffect(() => {
  const allUserTransactionHashes = Near.view(
    "swap.genadrop.near",
    "get_hashes_for_owner",
    {
      owner_id: accountId,
    }
  );

  const allTransactionData = [];

  allUserTransactionHashes.map((item) => {
    allTransactionData.push(
      Near.view("swap.genadrop.near", "get_transaction_data", {
        hash: item,
      })
    );
  });

  function processNFTs(nfts) {
    let arrayToReturn = [];
    nfts.map(async (nft) => {
      const nftContract = nft.contract_id;
      const tokenId = nft.token_id;
      const metadata = Near.view(nftContract, "nft_metadata", {
        token_id: tokenId,
      });
      const baseUri = metadata.base_uri || "";

      const nftMetadata = Near.view(nftContract, "nft_token", {
        token_id: tokenId,
      });
      const media = nftMetadata.metadata.media;
      const image =
        media.startsWith("https") || media.startsWith("http")
          ? media
          : `${baseUri}/${media}`;

      let collection = "";

      if (nftContract === "x.paras.near") {
        const response = fetch(
          `https://api-v2-mainnet.paras.id/token?token_id=${tokenId}`
        );
        collection = response.data.results[0].metadata.collection_id;
      }

      arrayToReturn.push({
        title: nftMetadata.metadata.title,
        image: image,
        token_id: tokenId,
        contract_id: nftContract,
        collection: collection ? collection : metadata.name,
      });
    });
    return arrayToReturn;
  }

  State.update({ allTransactions: allTransactionData });

  const nftData = [];
  allTransactionData.map((item) => {
    const senderNFTs = processNFTs(item.sender_nfts);
    const receiverNFTs = processNFTs(item.receiver_nfts);
    nftData.push([...senderNFTs, ...receiverNFTs]);
  });
  State.update({ nftData });
}, []);

return (
  <div
    style={{
      border: "1px solid lightgray",
      width: "100%",
      borderRadius: 5,
      padding: 10,
    }}
  >
    {state.allTransactions.map((transaction) => (
      <>
        <p style={{ marginBottom: 0 }}>Reciever NFT</p>
        <div
          style={{
            border: "1px solid lightgray",
            width: "100%",
            borderRadius: 5,
            padding: 10,
          }}
        >
          {transaction.receiver_nfts.map((item) => (
            <>
              <img src={""} />
            </>
          ))}
        </div>

        <p style={{ marginBottom: 0, marginTop: 10 }}>Sender NFT</p>
        <div
          style={{
            border: "1px solid lightgray",
            width: "100%",
            borderRadius: 5,
            padding: 10,
          }}
        >
          {transaction.sent_nfts.map((item) => (
            <>
              <img src={""} />
            </>
          ))}
        </div>
      </>
    ))}
  </div>
);
