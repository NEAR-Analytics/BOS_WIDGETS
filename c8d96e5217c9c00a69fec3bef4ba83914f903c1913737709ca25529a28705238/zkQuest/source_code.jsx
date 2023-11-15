// ... (previous code remains unchanged)

function sendSolution() {
  const questContract = new ethers.Contract(
    QUEST_ADDRESS,
    QUEST_ABI,
    Ethers.provider().getSigner()
  );

  let transactionHash = "";

  // 1. Use the correct contract function.
  //    Tip: You can use era-test-node to replay transactions from your previous submissions, with --show-calls=user --resolve-hashes
  questContract
    .submitInvalid(QUEST_NAME, { gasLimit: 1000000 })
    .then((transaction) => {
      // 2. Construct the payload, including `QUEST_NAME` and the keccak hash.
      //    - The answer is the private key of the first 'rich' account from era-test-node (with '0x' prefix)
      //    - Replace ANSWER, ADDRESS, and attempts with the correct values.
      let ANSWER = "your_private_key"; // Replace with the correct private key
      let ADDRESS = "your_zkQuest_account_address"; // Replace with the correct account address
      let attempts = 1; // Replace with the correct number of attempts

      let answerHash = ethers.utils.solidityKeccak256(
        ["string", "address", "uint16"],
        [ANSWER, ADDRESS, attempts]
      );

      // 3. Call the identified contract function with the constructed payload.
      questContract
        .submitInvalid(QUEST_NAME, answerHash, { gasLimit: 1000000 }) // Include the answerHash in the function call
        .then((transaction) => {
          console.log("Hash is: ");
          console.log(transaction.hash);
          transactionHash = transaction.hash;

          transaction
            .wait()
            .then((receipt) => {
              State.update({
                transactionStatus: "ok",
              });
            })
            .catch((error) => {
              State.update({
                transactionStatus: "failed",
              });
            });
        })
        .catch((error) => console.log("Error submitting transaction: " + error))
        .finally(() =>
          State.update({
            transactionHash: transactionHash,
            attempted: true,
          })
        );
    })
    .catch((error) => console.log("Error submitting transaction: " + error));
}

// ... (rest of the code remains unchanged)
