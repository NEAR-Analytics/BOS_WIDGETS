function sendSolution() {
  const questContract = new ethers.Contract(
    QUEST_ADDRESS,
    QUEST_ABI,
    Ethers.provider().getSigner()
  );

  let transactionHash = "";

  // 1. Oops! We've been calling the wrong contract function all this time.
  //    Tip: You can use era-test-node to replay transactions from your previous submissions, with --show-calls=user --resolve-hashes

  // 2. And then there's the payload... Some of it seems to have gone missing!
  //    - Don't forget to include `QUEST_NAME`.
  //    - A keccak hash generated from a combination of specific elements: answer, your zkQuest account address, and the number of attempts.
  //
  //    let answerHash = ethers.utils.solidityKeccak256(["string", "address", "uint16"], [ANSWER, ADDRESS, attempts]);
  //    Oh, and the answer is the private key of the first 'rich' account from era-test-node (with '0x' prefix)

  // Replace the following placeholders with the correct values:
  let ANSWER = "your_private_key"; // Replace with the correct private key
  let ADDRESS = "0x89Ea573E7ea1b6dE8Ece842302ad76ACbe531015"; // Replace with the correct account address
  let attempts = 1; // Replace with the correct number of attempts

  let answerHash = ethers.utils.solidityKeccak256(
    ["string", "address", "uint16"],
    [QUEST_NAME, ADDRESS, attempts]
  );

  // 3. Call the identified contract function with the constructed payload.
  questContract
    .submitInvalid(QUEST_NAME, answerHash, { gasLimit: 1000000 })
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
}
