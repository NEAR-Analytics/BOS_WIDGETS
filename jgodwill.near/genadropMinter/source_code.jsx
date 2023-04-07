let accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const profile = socialGetr(`${accountId}/profile`);

if (profile === null) {
  IpfsImageUpload();
  return "Loading";
}

const handleMint = () => {
  if (!(state.title && state.description && state.image.cid)) {
    return;
  }
  const metadata = {
    name: state.title,
    description: state.description,
    properties: [],
    image: `ipfs://${state.image.cid}`,
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
    Near.call([
      {
        contractName: "genadrop-contract.nftgen.near",
        methodName: "nft_mint",
        args: {
          token_id: `${Date.now()}`,
          metadata: {
            title: state.title,
            description: state.description,
            media: `https://ipfs.io/ipfs/${state.image.cid}`,
            reference: `ipfs://${cid}`,
          },
          receiver_id: accountId,
        },
        gas: gas,
        deposit: deposit,
      },
    ]);
  });
};

initState({
  title: "",
  description: "",
});

const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const onChangeDesc = (description) => {
  State.update({
    description,
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
  padding:1rem;
  text-align: center;
`;
const Main = styled.div`
  font-family: "SF Pro Display",sans-serif;
`;

const handleDrop = (event) => {
  event.preventDefault();

  const file = event.dataTransfer.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    this.setState({
      file: file,
      previewUrl: reader.result,
      showPreview: true,
    });
  };

  reader.readAsDataURL(file);
};

const Heading = styled.h3`
  margin: 10px auto 10px auto;
  font-size: 1em;
  font-weight: 600;
  color:#0f1d40if;
  width:60%;
  text-align: center;
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
return (
  <Main className="vh-100">
    {state.image.cid ? (
      <div>
        <div>Mint NFT on genadrop</div>
        <div>
          Title:
          <input type="text" onChange={(e) => onChangeTitle(e.target.value)} />
        </div>
        <div>
          Description:
          <input type="text" onChange={(e) => onChangeDesc(e.target.value)} />
        </div>
        <div>Preview</div>
        <div>
          <img
            src={`https://ipfs.io/ipfs/` + state.image.cid}
            alt="uploaded image"
            width="400"
            height="300"
          />
        </div>
        <div>
          <IpfsImageUpload
            image={state.image}
            className="btn btn-outline-secondary border-0 rounded-3"
          />
        </div>
        <div>
          <button onClick={handleMint}>Mint</button>
        </div>
      </div>
    ) : (
      <div>
        <Heading>
          Upload an image to create NFTs on any of our supported blockchains
          super fast!
        </Heading>
        <ImageUploadCard className="flex-grow-1">
          <Elipse />
          <IpfsImageUpload
            image={state.image}
            className="btn text-decoration-none link-primary pe-auto"
          />
          <div>
            {
              //   <Heading
              //   onDrop={handleDrop}
              //   onDragOver={(event) => event.preventDefault()}
              // >
              //   Drag and Drop your image file here
              // </Heading>
            }
            <Text>
              We support .jpg, .jpeg, .png, .webp, .gif files and deploy to Near
            </Text>
            <Text>Max file size: 20mb</Text>
          </div>
        </ImageUploadCard>
      </div>
    )}
  </Main>
);
