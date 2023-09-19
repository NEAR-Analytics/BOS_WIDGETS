const { MailChain, onClose } = props;
const {
  DarkOverlay,
  Box,
  Title,
  Text,
  ImageUploadCard,
  Elipse,
  Controls,
  StepButton,
  Input,
  Details,
  NFT,
} = VM.require("mattb.near/widget/NearBox.Styles.DropNFTModal");

State.init({
  sdk: null,
  step: 0,
  nft: {
    image: null,
    name: "",
    description: "",
    to: "",
    message: "",
  },
});

let steps = [
  <>
    <Title>Drop an NFT</Title>
    <Text>
      Thanks to GenaDrop, now you can mint an NFT on NEAR and automatically
      notify the user straight in their inbox.
    </Text>
    <ImageUploadCard>
      <Elipse>
        <span
          style={{
            opacity: ".2",
            "font-weight": "bold",
          }}
        >
          NFT
        </span>
      </Elipse>
      <>
        <IpfsImageUpload
          image={state.nft.image}
          className="btn text-decoration-none link-primary pe-auto"
        />
        <div>
          <Text>jpg, jpeg, png, webp, gif</Text>
          <Text>
            <strong>Max. 20MB</strong>
          </Text>
        </div>
      </>
    </ImageUploadCard>
  </>,
  <Details>
    <Title>NFT Details</Title>

    <NFT>
      <img
        src={`https://ipfs.near.social/ipfs/${state.nft.image.cid}`}
        alt="Uploaded Image"
      />
      <div className="replace-btn">
        <IpfsImageUpload
          image={state.nft.image}
          className="btn text-decoration-none link-primary pe-auto"
        />
      </div>
    </NFT>
    <Input
      placeholder={"Give your NFT a name"}
      value={state.nft.name}
      onChange={(e) =>
        State.update({
          nft: {
            ...state.nft,
            name: e.target.value,
          },
        })
      }
    />
    <Input
      placeholder={"Short description"}
      value={state.nft.description}
      onChange={(e) =>
        State.update({
          nft: {
            ...state.nft,
            description: e.target.value,
          },
        })
      }
    />
    <Input
      placeholder={"Send to account.near"}
      value={state.nft.to}
      onChange={(e) =>
        State.update({
          nft: {
            ...state.nft,
            to: e.target.value,
          },
        })
      }
    />

    <textarea
      placeholder={"Write a message"}
      value={state.nft.message}
      onChange={(e) =>
        State.update({
          nft: {
            ...state.nft,
            message: e.target.value,
          },
        })
      }
    />
  </Details>,
];

return (
  <DarkOverlay
    onClick={() => {
      if (state.boxClicked) {
        State.update({ boxClicked: false });
      } else {
        onClose();
      }
    }}
  >
    <Widget
      src="mattb.near/widget/GenaDrop.GenaDropSDK"
      props={{
        onLoad: (sdk) => State.update({ sdk }),
        loaded: state.sdk,
      }}
    />

    <Box
      onClick={(e) => {
        State.update({ boxClicked: true });
      }}
    >
      {steps[state.step] ?? ""}
      <Controls>
        {steps[state.step + 1] && (
          <StepButton
            onClick={() => State.update({ step: state.step + 1 })}
            disabled={!state.nft.image}
          >
            Next
          </StepButton>
        )}
        {steps[state.step - 1] && (
          <StepButton onClick={() => State.update({ step: state.step - 1 })}>
            Back
          </StepButton>
        )}
        {!steps[state.step + 1] && (
          <StepButton
            onClick={() => {
              MailChain.notifyNFT(
                state.nft.to,
                `https://ipfs.near.social/ipfs/${state.nft.image.cid}`,
                state.nft.message
              );
              state.sdk.mintOnNear(
                state.nft.to,
                state.nft.name,
                state.nft.description,
                state.nft.image.cid
              );
            }}
            disabled={!state.nft.name || !state.nft.to}
          >
            Finish
          </StepButton>
        )}
      </Controls>
    </Box>
  </DarkOverlay>
);
