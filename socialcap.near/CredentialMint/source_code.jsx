let accountId = context.accountId;
const mintButton = props.mintButton ?? "Mint Credential";
const showDetails = props.showDetails ?? true;
const receiver = props.receiver ?? accountId;
const apiUrl = props.apiUrl ?? "http://localhost:3080/api";
const credentialUid = props.uid ?? "caaaaff63a48400a9ce57f3ad6960001";
if (!accountId) {
  return "Please, login";
}

if (!credentialUid) {
  return "Please include a Credential Account to verify proof";
}

const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
  IpfsImageUpload();
  return "Loading";
}

const getCredential = fetch(
  `${apiUrl}/query/get_credential?params=${JSON.stringify({
    uid: credentialUid,
  })}`,
  {
    method: "GET",
  }
);
if (!getCredential) {
  return "Loading...";
}
console.log("getCredential", getCredential);
const credential = getCredential.body.data;

State.init({
  cid: credential.image,
  description: credential.description,
  title: credential.type,
  community: credential.community,
  userAlias: credential.alias,
  issuedUtc: credential.issuedUtc,
  expireUtc: credential.expiresUTC,
  receiver: receiver,
  showAlert: false,
  toastMessage: "",
  openModal: false,
});

if (props.transactionHashes) {
  const statusResult = fetch("https://rpc.mainnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "dontcare",
      method: "tx",
      params: [props.transactionHashes, accountId],
    }),
  });
  //check status and open modal

  if (
    statusResult.body.result.status &&
    Object.keys(statusResult.body.result.status)[0] == "SuccessValue"
  ) {
    State.update({ openModal: true });
  }
}

const handleMint = () => {
  if (!state.cid) {
    return;
  }
  if (!accountId) {
    console.log("Please login"); // add share dogvwallet
    State.update({
      showAlert: true,
      toastMessage: "Please log in before continuing",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.title) {
    console.log("Please Enter title");
    State.update({
      showAlert: true,
      toastMessage: "Please enter a title for the Credential",
    });

    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.description) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter a description for the Credential",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else {
    const metadata = {
      name: state.title,
      description: state.description,
      properties: [{ credentialUid }],
      image: `ipfs://${state.cid}`,
      reference: credentialUid,
    };
    console.log("come", metadata);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      console.log("GO ON SOUN", res);
      const cid = res.body.cid;
      const gas = 200000000000000;
      const deposit = 10000000000000000000000;
      console.log("State Image CID: " + state.cid);
      console.log("Reference CID: " + cid);
      Near.call([
        {
          contractName: "nft.genadrop.near",
          methodName: "nft_mint",
          args: {
            token_id: `${Date.now()}`,
            metadata: {
              title: state.title,
              description: state.description,
              media: `https://ipfs.io/ipfs/${state.cid}`,
              reference: credentialUid,
            },
            receiver_id: state.receiver,
          },
          gas: gas,
          deposit: deposit,
        },
      ]);
    });
  }
};

const onChangeReceiver = (receiver) => {
  State.update({
    receiver,
  });
};

const ImageUploadCard = styled.div`
display:flex;
flex-flow: column nowrap;
align-items: center;
  width:80%;
  border: 2px dashed #0d99ff;
  border-radius: 1rem;
  box-shadow: 4px 4px 20px 6px rgba(0,0,0,.2);
  margin:30px auto;
  padding:1.5rem;
  text-align: center;
`;
const Main = styled.div`
position:relative;
  font-family: "SF Pro Display",sans-serif;
`;

const Heading = styled.p`
  margin: 10px auto 10px auto;
  font-size: 1em;
  color:#0f1d40;
  width:60%;
  text-align: center;
  font-family: "SF Pro Display",sans-serif;
`;

const Toast = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  align-conten: center;
  bottom: 60px;
  right: 20px;
  background-color: red;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
  z-index: 100;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  line-height:1;
`;

const Elipse = styled.div`
background-color:#eff3f9;
height: 100px;
width: 100px;
border-radius: 50%;
`;

const Text = styled.p`
font-size: .9rem;
color: #525c76;
line-height:1.rem;
margin: 3px;
`;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
`;

const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height:fit-content;
  max-height:500px;
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  &>img{
  object-fit: contain;
  }
`;

const Input = styled.input`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
  ::placeholder {
    color: palevioletred;
  }
`;

const TextArea = styled.textarea`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
`;
// state.cid
return (
  <Main className="container-fluid">
    <Widget
      src={`manzanal.near/widget/Common.Modal.RedirectModal`}
      props={{
        open: state.openModal,
        title: "Minting Credential Succes",
        description:
          "Credential minting was successful. Would you like to be redirected to your profile and see the NFT?",
        href: `/near/widget/ProfilePage?accountId=${accountId}&tab=nfts`,
        showClose: true,
        accept: () => console.log("REDIRECT TO NFT PAGE"),
      }}
    />
    <div>
      <Card className="d-flex flex-column align-items-center">
        <ImageCard>
          <img
            src={`https://ipfs.io/ipfs/` + state.cid}
            alt="credential mage"
            width="100%"
            height="100%"
          />
        </ImageCard>
      </Card>
      {showDetails && (
        <Card>
          <h5>Credential Details</h5>
          <Card>
            Title:
            <Input type="text" disabled value={state.title} />
          </Card>
          <Card>
            Description:
            <TextArea type="text" disabled value={state.description} />
          </Card>
          <Card>
            Receiver:
            <Input
              type="text"
              onChange={(e) => onChangeReceiver(e.target.value)}
              value={state.receiver}
            />
          </Card>
        </Card>
      )}
      <div className="d-flex justify-content-center mb-2">
        <button type="button" className="btn btn-primary" onClick={handleMint}>
          {mintButton}
        </button>
      </div>
    </div>

    {state.showAlert && (
      <Widget src="jgodwill.near/widget/genalert" props={state} />
    )}
  </Main>
);
