State.init({
  isConnected: false,
  account: null,

  isNewContract: false,

  documentCid: "",
  isUploading: false,
  expiration: "",
  quorum: 0,
  participants: [],

  documents: [],
})

function switchNetwork() {
  try {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: getAllowedNetwork().hex },
    ]).then((data) => {
      State.update({ isConnected: true })
    })
  } catch (err) {}
}

function getAllowedNetwork() {
  return 11155111
}

if (!state.account) {
  const accounts = Ethers.send("eth_requestAccounts", [])
  if (accounts.length) {
    State.update({ account: accounts[0] })
    console.log("account", state.account)
    let provider = Ethers.provider()
    if (!!provider) {
      provider.getNetwork().then((network) => {
        if (network.chainId != getAllowedNetwork()) {
          State.update({ isConnected: false })
          switchNetwork()
        } else {
          State.update({ isConnected: true })
        }
      })
    }
  }
}

const abi = `[ { "inputs": [ { "internalType": "string", "name": "_documentCid", "type": "string" }, { "internalType": "uint8", "name": "_vote", "type": "uint8" } ], "name": "addVote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "currentDocumentId", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "docCidToVoting", "outputs": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "docIdToCid", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllDocuments", "outputs": [ { "components": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "address[]", "name": "participants", "type": "address[]" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" }, { "internalType": "uint8[]", "name": "currentVotes", "type": "uint8[]" } ], "internalType": "struct Calimocho.DocumentVoting[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_owner", "type": "address" } ], "name": "getOwnerDocuments", "outputs": [ { "components": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "address[]", "name": "participants", "type": "address[]" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" }, { "internalType": "uint8[]", "name": "currentVotes", "type": "uint8[]" } ], "internalType": "struct Calimocho.DocumentVoting[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "ownerToVotings", "outputs": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_documentName", "type": "string" }, { "internalType": "string", "name": "_documentCid", "type": "string" }, { "internalType": "address[]", "name": "_participants", "type": "address[]" }, { "internalType": "uint64", "name": "_expiration", "type": "uint64" }, { "internalType": "uint256", "name": "_quorum", "type": "uint256" } ], "name": "registerDocument", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]`

const contract = new ethers.Contract(
  "0x142918CA2E8a74d92cfD40276a48FE817D928c4F",
  abi,
  Ethers.provider()
)

function getAllDocuments() {
  contract
    .getAllDocuments()
    .then((docs) => {
      console.log("Docs: ", docs)
      State.update({ documents: docs })
    })
    .catch((e) => {
      console.log("Something went wrong fetching the docs: ", e.message)
    })
}
getAllDocuments()

const ProjectContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  color: #0095b6;
  border-style: solid;

  .cali-btn-primary {
    background-color: #0095b6;
    color: white;
    border: none;
  }
`
const Button = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a {
    color: #0095b6;
    font-size: 16px;
  }
`

function onNewContract() {
  console.log("onNewContract")
  State.update({ isNewContract: !state.isNewContract })
}

function onVoteFor(doc) {
  console.log("onVoteFor", doc)
}

function onAbstain(doc) {
  console.log("onVoteFor", doc)
}

// Login Check
// const loggedIn = !!context.accountId;
const loggedIn = state.account

const Main = ({ doc }) => {
  const [
    documentId,
    documentName,
    owner,
    documentCid,
    participants,
    expiration,
    quorum,
    currentVotes,
  ] = doc
  console.log(documentCid)
  const expirationDate = Date(expiration * 1000)

  return (
    <ProjectContainer key={documentCid} className="m-2 p-4">
      <div className="row">
        <div ClassName="center">
          <h4 style={{ fontWeight: 1000 }}>Calimocho</h4>
          <h5 style={{ fontWeight: 200 }}>contract sign</h5>
        </div>
        <div>
          <div class="p-4">
            <div className="mt-1">
              Document Name:
              <input disabled value={documentName} />
            </div>
            <div className="mt-1">
              DocumentCid:
              <a href={`https://ipfs.io/ipfs/${documentCid}`} target="_blank">
                {documentCid}
              </a>
            </div>
            <div className="mt-1">
              Owner:
              <input disabled value={owner} />
            </div>
            <div className="mt-1">
              Expiration:
              <input disabled value={expirationDate.toString()} />
            </div>
            <div className="mt-1">
              Participants:
              <input disabled value={participants.join(", ")} />
            </div>
            <div className="mt-1">
              Quorum:
              <input disabled value={quorum} />
            </div>
            <div>
              Current Votes:
              <input disabled value={currentVotes} />
            </div>
          </div>

          <div className="">
            <Button
              onClick={() => onAbstain(doc)}
              className="p-2"
              style={{
                backgroundColor: "#f7a3b0",
                color: "#FFF",
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: 24,
                border: "2px solid black",
              }}
            >
              Abstain
            </Button>

            <Button
              onClick={() => onVoteFor(doc)}
              className="p-2 mt-2"
              style={{
                backgroundColor: "#83c77f",
                color: "#FFF",
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: 24,
                border: "2px solid black",
              }}
            >
              Vote for
            </Button>
          </div>
        </div>
      </div>
    </ProjectContainer>
  )
}

return (
  <div>
    {state.isConnected ? (
      state.isNewContract ? (
        <>
          <Button
            onClick={onNewContract}
            className="p-2"
            style={{
              backgroundColor: "#83c77f",
              color: "#FFF",
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingInline: 24,
              border: "2px solid black",
              width: "fit-content",
            }}
          >
            Go Back
          </Button>
          <Widget src="leinss.near/widget/NewQuorum" />
        </>
      ) : (
        <>
          <div className="">
            <Button
              onClick={onNewContract}
              className="p-2"
              style={{
                backgroundColor: "#83c77f",
                color: "#FFF",
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: 24,
                border: "2px solid black",
                width: "fit-content",
              }}
            >
              New Contract
            </Button>
          </div>

          <h6
            className="text-center p-2 pb-4"
            style={{ fontWeight: 600, fontSize: 25, color: "#0095b6" }}
          >
            YOUR CONTRACTS
          </h6>
          {state.documents.map((doc) => {
            return <Main doc={doc} />
          })}
        </>
      )
    ) : (
      <Web3Connect
        className="swap-button-enabled swap-button-text p-2"
        connectLabel="Connect with wallet"
      />
    )}
  </div>
)
