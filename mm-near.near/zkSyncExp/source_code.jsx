const allQuestions = ["first", "second", "third"];

State.init({
  accountBalance: 0,
  hasNFT: 0,
  nftId: -1,
  getVotes: Array.from({ length: allQuestions.length }, () => ["?", "?"]),
  questionsLoaded: false,
  addQuestion: "",
});

let account = Ethers.send("eth_requestAccounts", [])[0];
if (!account) return "Please connect wallet first";

const res = Ethers.send("wallet_switchEthereumChain", [{ chainId: "0x118" }]);

Ethers.provider()
  .getBalance(account)
  .then((data) => {
    State.update({
      accountBalance: parseInt(data.toString()) / 1000000000000000000,
    });
  });

const nftABI = [
  {
    constant: true,
    inputs: [{ name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const iface = new ethers.utils.Interface(nftABI);

const nftAddress = "0x5657a1278924839fbc32ebaa29fcd475e23105f7";

const encodedData = iface.encodeFunctionData("balanceOf", [account]);

Ethers.provider()
  .call({
    to: nftAddress,
    data: encodedData,
  })
  .then((data) => {
    State.update({
      hasNFT: parseInt(data.toString()),
    });
  });

const checkOwner = (nftId) => {
  const nftContract = new ethers.Contract(
    nftAddress,
    nftABI,
    Ethers.provider()
  );
  nftContract
    .ownerOf(nftId)
    .then((data) => {
      if (data.toLowerCase() == account.toString()) {
        console.log("Found it");
        State.update({
          nftId: nftId,
        });
      }
    })
    .catch((error) => {});
};

// My NFT doesn't provide the method to get the id for the user - so we simply loop over for now.
const guessNFTId = () => {
  if (state.nftId == -1) {
    state.nftId = -2;

    for (let i = 0; i < 10; i++) {
      console.log("Querying owner of ", i);
      checkOwner(i);
    }
  }
};

guessNFTId();

const votingABI = [
  {
    inputs: [
      {
        name: "question",
        type: "string",
      },
    ],
    name: "addQuestion",
    outputs: [
      {
        name: "hashed_question",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "question",
        type: "string",
      },
    ],
    name: "getVotes",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "questions",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "question",
        type: "string",
      },
      {
        name: "token_id",
        type: "uint256",
      },
      {
        name: "vote_for",
        type: "bool",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "votesAgainst",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "votesFor",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const votingAddress = "0x8711a970c431E51Ff1e68B2F7693E259f894c1a0";

Ethers.provider()
  .call({
    to: nftAddress,
    data: encodedData,
  })
  .then((data) => {
    State.update({
      hasNFT: parseInt(data.toString()),
    });
  });

const addQuestion = () => {
  const votingContract = new ethers.Contract(
    votingAddress,
    votingABI,
    Ethers.provider().getSigner()
  );
  votingContract.addQuestion(state.addQuestion).then((transactionHash) => {
    console.log("transaction hash is " + transactionHash);
  });
};

const votingContract = new ethers.Contract(
  votingAddress,
  votingABI,
  Ethers.provider()
);

const getVotesForQuestion = (question_id) => {
  votingContract
    .getVotes(allQuestions[question_id])
    .then((result) => {
      console.log("Got votes: " + result);

      state.getVotes[question_id][0] = result[0].toString();
      state.getVotes[question_id][1] = result[1].toString();

      console.log("Updated display");
      State.update({ getVotes: state.getVotes });
    })
    .catch((error) => {
      console.log(
        "Failed to fetch question: " + allQuestions[question_id] + " " + error
      );
    });
};

const refreshAllVotes = () => {
  allQuestions.map((name, index) => {
    getVotesForQuestion(index);
  });
};

const loadAllQuestions = () => {
  if (state.questionsLoaded == false) {
    state.questionsLoaded = true;
    refreshAllVotes();
  }
};

loadAllQuestions();

const vote = (decision, question_id) => {
  const votingContract = new ethers.Contract(
    votingAddress,
    votingABI,
    Ethers.provider().getSigner()
  );
  votingContract
    .vote(allQuestions[question_id], state.nftId, decision)
    .then((transactionHash) => {
      console.log("transaction hash is " + transactionHash);
    });
};

return (
  <>
    <div class="container border border-info p-3 text-center">
      <h1>Hello {props.name}</h1>

      <p>
        {"Your zkSync account is:"}
        {account}
      </p>
      <p>
        {" Balance is: "} {state.accountBalance}
      </p>
      <p>
        {" Has NFT is: "} {state.hasNFT} {" id"} {state.nftId}
      </p>

      <p>
        {allQuestions.map((name, index) => (
          <p>
            {" "}
            {"Question "} {index} {" is: "}
            <b> {name}</b> <br /> {"Current votes: +"}{" "}
            {state.getVotes[index][0]} {" - "}
            {state.getVotes[index][1]}
            <br />
            <button onClick={() => vote(true, index)}>Vote YES</button>
            <button onClick={() => vote(false, index)}>Vote NO</button>
          </p>
        ))}
      </p>

      <input
        value={state.addQuestion}
        onChange={(e) => State.update({ addQuestion: e.target.value })}
        placeholder="Your question"
      />
      <button onClick={() => addQuestion()}>Add question</button>
    </div>
  </>
);
