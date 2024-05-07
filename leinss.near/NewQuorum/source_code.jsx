State.init({
  documentCid: "",
  isUploading: false,
  expiration: "",
  quorum: 0,
  participants: [],

  contractName: "",
  expiration: "",
})

const abi = `[ { "inputs": [ { "internalType": "string", "name": "_documentCid", "type": "string" }, { "internalType": "uint8", "name": "_vote", "type": "uint8" } ], "name": "addVote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "currentDocumentId", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "docCidToVoting", "outputs": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "docIdToCid", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllDocuments", "outputs": [ { "components": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "address[]", "name": "participants", "type": "address[]" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" }, { "internalType": "uint8[]", "name": "currentVotes", "type": "uint8[]" } ], "internalType": "struct Calimocho.DocumentVoting[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_owner", "type": "address" } ], "name": "getOwnerDocuments", "outputs": [ { "components": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "address[]", "name": "participants", "type": "address[]" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" }, { "internalType": "uint8[]", "name": "currentVotes", "type": "uint8[]" } ], "internalType": "struct Calimocho.DocumentVoting[]", "name": "", "type": "tuple[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "ownerToVotings", "outputs": [ { "internalType": "uint256", "name": "documentId", "type": "uint256" }, { "internalType": "string", "name": "documentName", "type": "string" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "string", "name": "documentCid", "type": "string" }, { "internalType": "uint64", "name": "expiration", "type": "uint64" }, { "internalType": "uint256", "name": "quorum", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "string", "name": "_documentName", "type": "string" }, { "internalType": "string", "name": "_documentCid", "type": "string" }, { "internalType": "address[]", "name": "_participants", "type": "address[]" }, { "internalType": "uint64", "name": "_expiration", "type": "uint64" }, { "internalType": "uint256", "name": "_quorum", "type": "uint256" } ], "name": "registerDocument", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]`

const contract = new ethers.Contract(
  "0x3d2b168d1807f04835d213f386c644b138cb0ee8",
  abi,
  Ethers.provider()
)

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

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid
    console.log("DocumentCid: ", cid)
    State.update({ documentCid: cid, isUploading: false })
  })
}

const filesOnChange = (files) => {
  if (files) {
    State.update({ isUploading: true, documentCid: "" })
    uploadFileUpdateState(files[0])
  }
}

const onNameChange = (e) => {
  state.contractName = e.target.value
}

const onExpirationChange = (e) => {
  console.log("expiration: ", e)
  state.expiration = e.target.value
}

function getAllDocuments() {
  contract
    .getAllDocuments()
    // .currentDocumentId()
    .then((docId) => {
      console.log("DocId: ", docId)
      console.log("there")
    })
    .catch((e) => console.log("Error calling getAllDocuments: ", e.message))
}
getAllDocuments()

// Login Check
const loggedIn = !!context.accountId

const Main = (
  <ProjectContainer className="m-2 p-4">
    <div className="row">
      <div ClassName="center">
        <h4 style={{ fontWeight: 1000 }}>Calimocho</h4>
        <h5 style={{ fontWeight: 200 }}>contract sign</h5>
      </div>

      <div>
        <div
          className="flex flex-wrap flex-1 text-center justify-center border rounded m-4"
          hidden={!loggedIn}
        >
          <label className="font-bold mr-8">
            duration time:
            <select className="p-2 m-2 border rounded">
              <option value="1">1 day</option>
              <option value="1">2 day</option>
              <option value="1">3 day</option>
              <option value="1">4 day</option>
              <option value="2">5 days</option>
              <option value="3">1 week</option>
              <option value="4">2 weeks</option>
              <option value="4">3 weeks</option>
              <option value="4">4 weeks</option>
            </select>
          </label>

          <label className="" hidden={!loggedIn}>
            minimal person quorum:
            <select className="p-2 m-2 border rounded">
              <option value="2">2 persons</option>
              <option value="3">3 persons</option>
              <option value="4">4 persons</option>
              <option value="4">5 persons</option>
              <option value="4">6 persons</option>
              <option value="4">7 persons</option>
              <option value="4">8 persons</option>
              <option value="4">9 persons</option>
              <option value="4">10 persons</option>
            </select>
          </label>
        </div>
        <div class="p-4">
          <div className="input-group pb-4" hidden={!loggedIn}>
            <input placeholder="contract name" onChange={onNameChange} />
          </div>

          <div className="input-group pb-4" hidden={!loggedIn}>
            <input
              type="date"
              placeholder="date"
              onChange={onExpirationChange}
            />
          </div>
          <div className="input-group pb-4" hidden={!loggedIn}>
            <input placeholder="participants" onChange={onInputChange} />
          </div>
          <div
            className="flex justify-center p-2 button-group text-center"
            hidden={!loggedIn}
          ></div>

          <div className="input-group pb-4" hidden={!loggedIn}>
            <input
              disabled
              placeholder="upload file..."
              value={
                state.documentCid && `https://ipfs.io/ipfs/${state.documentCid}`
              }
              onChange={onInputChange}
            />
            <Files
              multiple={false}
              accepts={["application/pdf"]}
              minFileSize={1}
              clickable
              className="btn btn-outline-primary cali-btn-primary"
              onChange={filesOnChange}
            >
              {state.isUploading ? <> Uploading </> : "Upload an Document"}
            </Files>
          </div>
        </div>

        <p class="text-center py-2" hidden={loggedIn}>
          Login to Sign the contract
        </p>
      </div>

      <div className="">
        <Button className="p-2">
          <a
            href="#"
            style={{
              backgroundColor: "#0095b6",
              color: "#FFF",
              height: 40,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingInline: 24,
              border: "2px solid black",
            }}
          >
            Publish
          </a>
        </Button>
        <Button className="p-2">
          <a
            href="#"
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
            Cancel
          </a>
        </Button>
      </div>
    </div>
  </ProjectContainer>
)

return <div>{Main}</div>
