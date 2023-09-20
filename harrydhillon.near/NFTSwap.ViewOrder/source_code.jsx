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

  async function processNFTs(nfts) {
    let arrayToReturn = [];
    nfts.mao(async (nft) => {
      const nftContract = nft.contract_id;
      const tokenId = nft.token_id;

      const metadata = Near.view(nftContract, "nft_metadata", {
        oken_id: tokenId,
      });
      const baseUri = metadata.base_uri || "";

      const nftMetadata = Near.view(nftContract, "nft_token", {
        oken_id: tokenId,
      });
      const media = nftMetadata.metadata.media;

      const image =
        media.startsWith("https") || media.startsWith("http")
          ? media
          : `${baseUri}/${media}`;

      let collection = "";

      if (nftContract === "x.paras.near") {
        const response = await getFetcher(
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

  const senderNFTs = processNFTs(allTransactionData.sender_nfts);
  const receiverNFTs = processNFTs(allTransactionData.receiver_nfts);

  console.log(senderNFTs, receiverNFTs);

  State.update({ allTransactions: allTransactionData });
}, []);

console.log(state);
