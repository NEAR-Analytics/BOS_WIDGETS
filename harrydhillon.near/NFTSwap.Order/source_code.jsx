const accountId = context.accountId;

initState({ allTransactions: [] });

const contract_id = "swap.genadrop.near";

const allUserTransactionHashes = Near.view(
  "swap.genadrop.near",
  "get_hashes_for_owner",
  {
    owner_id: accountId,
  }
);

const allTransactionData = [];

allUserTransactionHashes.map((item) => {
  allTransactionData.push({
    ...Near.view("swap.genadrop.near", "get_transaction_data", {
      hash: item,
    }),
    hash: item,
  });
});

function processNFTs(nfts, hash) {
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
        : `${baseUri}${media[0] === "/" ? "" : "/"}${media}`;
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
  const senderNFTs = processNFTs(item.sender_nfts, item.hash);
  const receiverNFTs = processNFTs(item.receiver_nfts, item.hash);
  senderNFTs.map((item) => {
    nftData.push(item);
  });
  receiverNFTs.map((item) => {
    nftData.push(item);
  });
});
State.update({ nftData });

function divideByPowerOfTen(numStr) {
  if (numStr.length <= 24) {
    return (Number(numStr) / 1e24).toFixed(3);
  }

  let wholePart = numStr.slice(0, -24);
  let fractionalPart = numStr.slice(-24);

  // Remove trailing zeros from the fractional part
  while (fractionalPart.endsWith("0")) {
    fractionalPart = fractionalPart.slice(0, -1);
  }

  // Create the result number
  let result = parseFloat(
    wholePart + (fractionalPart ? "." + fractionalPart : "")
  );

  // Generalized rounding
  let rounded = Math.round(result * 1e3) / 1e3;

  // Format the result to 3 decimal places
  return rounded.toFixed(3);
}

return (
  <>
    {state.allTransactions.map((transaction) => (
      <div
        style={{
          border: "0px solid lightgray",
          borderBottomWidth: 1,
          paddingBottom: 5,
          border: "1px solid lightgray",
          width: "100%",
          borderRadius: 5,
          padding: 10,
        }}
      >
        <p style={{ marginBottom: 0 }}>Sender : {transaction.sender_id}</p>
        <p style={{ marginBottom: 0 }}>
          Near : {divideByPowerOfTen(`${transaction.sender_near}`)} Ⓝ
        </p>
        <p style={{ marginBottom: 0 }}>Receiver : {transaction.receiver_id}</p>
        <div
          style={{
            border: "1px solid lightgray",
            width: "100%",
            borderRadius: 5,
            padding: 10,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {transaction.receiver_nfts.map((item) => {
            const transaction_data = state.nftData.filter(
              (item) => item.token_id === item.token_id
            )[0];
            return (
              <div>
                <img
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    marginBottom: 5,
                  }}
                  src={transaction_data.image}
                />
                <p style={{ marginBottom: 0, fontSize: 12 }}>
                  Collection : {transaction_data.collection}
                </p>
                <p style={{ marginBottom: 0, fontSize: 12 }}>
                  {transaction_data.contract_id}
                </p>
                <p style={{ marginBottom: 0, fontSize: 12 }}>
                  {transaction_data.token_id}
                </p>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            Near.call(
              contract_id,
              "cancel_offer",
              {
                hash: transaction.hash,
              },
              300000000000000,
              1
            );
          }}
          style={{ backgroundColor: "red", borderWidth: 0 }}
        >
          Cancel
        </button>
        {accountId !== transaction.sender_id && (
          <button
            style={{
              backgroundColor: "blue",
              borderWidth: 0,
            }}
            onClick={() => {
              const txns = transaction.receiver_nfts.map((item) => ({
                contractName: item.contract_id,
                methodName: "nft_transfer",
                args: {
                  receiver_id: contract_id,
                  token_id: item.tokenId,
                  msg: transaction.hash,
                  approval_id: 0,
                },
                gas: 300000000000000,
                deposit: 1,
              }));
              Near.call(txns);
            }}
          >
            Accept
          </button>
        )}
      </div>
    ))}
  </>
);

// receiverId: nft.contract_id,
// 					actions: [functionCall('nft_transfer_call', {
// 						receiver_id: SWAP_CONTRACT,
// 						token_id: nft.token_id,
// 						approval_id: 0,
// 						msg: hash,
// 					}, 300000000000000, 1)]
