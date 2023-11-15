// Welcome to quest 7.
//
// Oh no, looks like there's a mix-up with our code! Your mission is to sort out the right contract function,
// whip up the proper hash, and get that transaction flying straight.
// Check out the details in the sendSolution() function and let's get this sorted!
//
// BOS.gg allows you to edit this code live, and execute it, when you click "Preview" button.
//

const DESTINATION_CHAIN = 324;
const QUEST_ADDRESS = "0xeD6ade662726D7f595D4fa55D5EDEB5d2B7F730E";
const QUEST_ID = 7;
const QUEST_NAME = "008";

const QUEST_ABI = [
  "function submitInvalid(string memory questId)",
  "function getQuests() public view returns (tuple(string, string, string, uint256, uint16, address, bool, uint16 attempts)[])",
  "function submitAnswerForQuest(string, bytes32)",
];

State.init({
  accountBalance: 0,
  chainId: 0,
  attempted: false,
  questAttempts: 0,
  questSolved: false,
  transactionHash: "",
  transactionStatus: "",
});

let account = Ethers.send("eth_requestAccounts", [])[0];

if (account) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      State.update({
        chainId: chainIdData.chainId,
      });
    });
}

function changeChain() {
  Ethers.setChain({ chainId: DESTINATION_CHAIN });
}

function getQuestStatus() {
  const questContract = new ethers.Contract(
    QUEST_ADDRESS,
    QUEST_ABI,
    Ethers.provider().getSigner()
  );
  questContract.getQuests().then((result) => {
    State.update({
      questSolved: result[QUEST_ID][6],
      questAttempts: result[QUEST_ID][7],
    });
  });
}

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

  // 3. Call the identified contract function with the constructed payload.

  questContract
    .submitAnswerForQuest(
      QUEST_NAME,
      "0xe88e7a4d2ed0795d562d51951c1b56087c8360af14370e4bd7f0cf5a3b5b589c",
      { gasLimit: 1000000 }
    )
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

function step1WalletConnection() {
  if (account) {
    return [
      true,
      <div>
        <h2>Step 1: Wallet selection - DONE</h2>
      </div>,
    ];
  } else {
    return [
      false,
      <div>
        <h2>Step 1: Wallet selection</h2>
        <h4> Let's start - connect wallet </h4>
        <p> There should be a button at the top right corner</p>
      </div>,
    ];
  }
}

function step2ChainSelection() {
  if (state.chainId == DESTINATION_CHAIN) {
    return [
      true,
      <div>
        <h2>Step 2: Chain selection - DONE</h2>
      </div>,
    ];
  } else {
    return [
      false,
      <div>
        <h2>Step 2: Chain selection</h2>
        Now we have to make sure that we're on the right chain.
        <p>Current chain: {state.chainId}</p>
        <button onClick={() => changeChain()}>Change chain</button>
      </div>,
    ];
  }
}

function displayTaskDetails() {
  return (
    <div>
      <h1 style={{ color: "red" }}>Did you think it would be THAT easy??</h1>
      Did you even check what you signed?? <br />
      But no worries - this is the advantage of BOS - you can fix the code and
      try again. <br />
      Start by clicking on the three lines in the top right corner - and select{" "}
      <b>Fork widget</b> <br />
      Then you can see the source code, and edit it live. <br />
      More instructions are in the code.
    </div>
  );
}

function step3SendTheTransaction() {
  getQuestStatus();
  if (state.attempted == false) {
    return [
      false,
      <div>
        <h2>Step 3: Send Transaction</h2>
        <button onClick={() => sendSolution()}>Send Solution</button>
      </div>,
    ];
  } else {
    return [
      true,
      <div>
        <h2>Step 3: Send Transaction</h2>
        Transaction Hash: {state.transactionHash} <br />
        Transaction Status: {state.transactionStatus} <br />
        {state.transactionStatus == "failed"
          ? displayTaskDetails()
          : "congrats"}
      </div>,
    ];
  }
}

function allSteps() {
  let steps = [];
  const [step1Success, step1Payload] = step1WalletConnection();
  steps.push(step1Payload);
  if (!step1Success) {
    return steps;
  }
  const [step2Success, step2Payload] = step2ChainSelection();
  steps.push(step2Payload);
  if (!step2Success) {
    return steps;
  }

  const [step3Success, step3Payload] = step3SendTheTransaction();
  steps.push(step3Payload);
  if (!step3Success) {
    return steps;
  }

  return steps;
}

if (state.questSolved) {
  return (
    <div>
      <h1>Quest is solved - good job.</h1>
    </div>
  );
}

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Welcome to zkQuest - The Other frontend</h1>
      <br />
      In this quest, we'll be usssssing zkSync Javascript SDK to interact with
      the blockchain.
      <br />
      The code that you see right now is hosted on NEAR blockchain - via BOS
      (Blockchain Operating System).
      <br />
      <br />
      You can see more details{" "}
      <a href="https://docs.near.org/bos/tutorial/ethers-js">HERE</a>
      <br />
      <div>{allSteps()}</div>
    </div>
  </>
);
