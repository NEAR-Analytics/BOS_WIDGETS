const awardContract = "main.isnft.near";
const ownerId = "codequity.near"; // attribution
let accountId = context.accountId;
const gas = 200000000000000;
const deposit = 10000000000000000000000;
const metadata = {
  name: state.award_title,
  description: state.award_description,
  properties: [],
  image: `ipfs://${state.image.cid}`,
};

State.init({
  award_title: "",
  award_description: "",
  award_citation: "",
  recipient: "",
  prompt: "",
  showAlert: false,
  toastMessage: "",
});

!state.image.cid ? props?.setActiveStep(0) : props?.setActiveStep(1);

const generateImage = () => {
  try {
    props
      .generate({
        model: "dall-e-3",
        prompt: state.prompt,
        n: 1,
        quality: "hd",
        size: "1024x1024",
        style: "vivid",
        response_format: "url",
      })
      .then((response) => {
        const imageUrl = response.data[0].url;
        State.update({
          generatedImageUrl: imageUrl,
        });
      });
  } catch (error) {
    console.error("Error generating image:", error);
  }
};

const handleMint = () => {
  if (!state.image.cid) {
    return;
  }
  if (!state.award_title) {
    console.log("Please enter name of award");
    State.update({
      showAlert: true,
      toastMessage: "Please enter award name.",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.award_description) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter award description.",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.award_citation) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter citation.",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else {
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      const cid = res.body.cid;
      const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);

      Near.call([
        {
          contractName: awardContract,
          methodName: "nft_mint",
          args: {
            token_id: `${Date.now()}`,
            metadata: {
              title: state.award_title,
              description: state.award_description,
              media: `https://ipfs.io/ipfs/${state.image.cid}`,
              issued_at: `${Date.now()}`,
              extra: JSON.stringify({
                type: "award",
                citation: `${state.award_citation}`,
              }),
              reference: `ipfs://${cid}`,
            },
            receiver_id: state.recipient || accountId,
          },
          gas: gas,
          deposit: deposit,
        },
      ]);
    });
    return;
  }
  console.log("passed checks");
};

const onChangeTitle = (award_title) => {
  State.update({
    award_title,
  });
};

const onChangeRecipient = (recipient) => {
  State.update({
    recipient,
  });
};

const onChangeDesc = (award_description) => {
  State.update({
    award_description,
  });
};

const onChangeCitation = (award_citation) => {
  State.update({
    award_citation,
  });
};

const onChangePrompt = (prompt) => {
  State.update({
    prompt,
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

const ImageGenerateCard = styled.div`
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
  display: grid;
  gap: 3rem;
  align-content:center;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  // background: linear-gradient(180deg,#e4f1fb,hsla(0,0%,85.1%,0));
  margin-top: 5px;
  width:100%;
  padding: 1rem;
`;

const Text = styled.p`
font-size: .9rem;
color: #525c76;
line-height:1.rem;
margin: 3px;
`;

const MainRoot = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
`;

const Ellipse = styled.div`
background-color:#dff3f9;
height: 100px;
width: 100px;
border-radius: 50%;
`;

const Card = styled.div`
padding: 1em;
border: 1px solid #e5e8eb;
gap: 2em;
margin: 10px auto;
border-radius: .7em;
text-align: left;
`;

const ImageCard = styled.div`
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  height:100%;
  max-height:100%;
  width: 90%;
  max-width: 500px;
  border-radius: 1rem;
  &>img{
  object-fit: cover;
  width: 100%;
  height: 100%;
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

const SelectTag = styled.select`
  height: fit-content;
  width: 300px;
`;

const ChainIcon = styled.option`
  display: flex;
  height: 130px;
  padding: 1rem auto;
  &>img{
    height:100px;
    width: 100px;
    object-fit: contain;
  }
`;

return (
  <MainRoot>
    {state.showAlert && <Widget src="aaron.near/widget/Toast" props={state} />}
    <Main className="container-fluid">
      {!state.image.cid ? (
        <div className="flex-grow-1">
          <ImageGenerateCard className="flex-grow-1">
            <Ellipse />
            <Card>
              Describe the image you'd like to create:
              <Input
                type="text"
                value={state.prompt || ""}
                onChange={(e) => onChangePrompt(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-primary d-flex flex-column align-items-center mx-auto"
                onClick={generateImage}
                style={{ marginTop: "10px" }}
              >
                Generate Image
              </button>
            </Card>
          </ImageGenerateCard>
          <IpfsImageUpload
            image={state.generatedImageUrl}
            style={{ display: "none" }}
          />
        </div>
      ) : (
        <>
          <Card className="d-flex flex-column align-items-center w-100">
            <div>
              <IpfsImageUpload
                image={state.image}
                className="btn btn-outline-primary border-0 rounded-3"
              />
            </div>
            <ImageCard>
              <img
                src={`https://ipfs.near.social/ipfs/${state.image.cid}`}
                alt="uploaded image"
                width="100%"
                height="100%"
                className="rounded-3"
              />
            </ImageCard>
          </Card>
          <div>
            <Card>
              <Card>
                Name of Award:
                <Input
                  type="text"
                  value={state.award_title || ""}
                  onChange={(e) => onChangeTitle(e.target.value)}
                />
              </Card>
              <Card>
                Award Description:
                <TextArea
                  type="text"
                  value={state.award_description || ""}
                  onChange={(e) => onChangeDesc(e.target.value)}
                />
              </Card>
              <Card>
                Award Citation:
                <TextArea
                  type="text"
                  value={state.award_citation || ""}
                  onChange={(e) => onChangeCitation(e.target.value)}
                />
              </Card>
              <Card>
                Award to:
                <Input
                  type="text"
                  placeholder={accountId}
                  value={state.recipient}
                  onChange={(e) => onChangeRecipient(e.target.value)}
                />
              </Card>
            </Card>
            <button
              type="button"
              className="btn btn-primary d-flex flex-column align-items-center mx-auto"
              onClick={handleMint}
            >
              Create and Send Award
            </button>
          </div>
        </>
      )}
    </Main>
  </MainRoot>
);
