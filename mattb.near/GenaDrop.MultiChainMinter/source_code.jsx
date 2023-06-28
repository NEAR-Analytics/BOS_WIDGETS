let {
  Heading,
  ImageUploadCard,
  NFTCard,
  Editable,
  SendToInput,
  Main,
  Text,
  Elipse,
  Card,
  ImageCard,
  Input,
  TextArea,
  SelectTag,
  ChainIcon,
  SelectReplicaContainer,
  SelectGroup,
  ToggleButton,
  HeaderBox,
  HistoryBox,
  HistoryNFTBox,
} = VM.require("mattb.near/widget/GenaDrop.MultiChainMinterStyles");

const OWNER_ID = "minorityprogrammers.near";
let accountId = context.accountId;

const DEFAULT_NFT_TITLE = "My awesome NFT";
const DEFAULT_NFT_DESCRIPTION =
  "I've just created a brand new NFT using GenaDrop";

State.init({
  title: DEFAULT_NFT_TITLE,
  description: DEFAULT_NFT_DESCRIPTION,
  recipient: "",
  isSoulBound: false,
  showAlert: false,
  toastMessage: "",
  selectIsOpen: false,
  selectedChain: "0",
  customRecipient: false,
  mintedNfts: [],
});

if (state.sdk.initialized) {
  setTimeout(() => {
    State.update({ mintedNfts: state.sdk.getMintedNfts() });
  }, 1000);
}

const handleMint = () => {
  if (!state.image.cid) {
    return;
  }

  if (!state.title) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter a title for the NFT",
    });

    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else if (!state.description) {
    State.update({
      showAlert: true,
      toastMessage: "Please enter a description for the NFT",
    });
    setTimeout(() => {
      State.update({
        showAlert: false,
      });
    }, 3000);
  } else {
    try {
      state.sdk.mint(
        state.recipient,
        state.title,
        state.description,
        state.selectedChain,
        state.image.cid,
        state.isSoulBound
      );
    } catch (error) {
      console.log(error);
    }
  }
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);

  if (accounts.length) {
    State.update({ sender: accounts[0] });
    Ethers.provider()
      .getNetwork()
      .then((data) => {
        State.update({
          selectedChain: data.chainId,
        });
      });
  }
}

const handleSelectClick = () => {
  State.update({
    selectIsOpen: !state.selectIsOpen,
  });
};

const handleOutsideClick = (e) => {
  if (!!state.selectIsOpen) {
    State.update({
      selectIsOpen: false,
    });
  }
};

const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const onChangeRecipient = (recipient) => {
  State.update({
    customRecipient: true,
  });

  if (state.selectedChain == "0") {
    State.update({
      recipient: recipient[0],
    });
  } else {
    State.update({
      recipient,
    });
  }
};

const handleChainChange = (chain_id) => {
  try {
    Ethers.send("wallet_switchEthereumChain", [
      { chainId: `0x${Number(chain_id).toString(16)}` },
    ]);

    State.update({
      selectedChain: chain_id,
    });
  } catch (err) {
    console.log(err);
  }
};

const onChangeDesc = (description) => {
  State.update({
    description,
  });
};

const handleToggle = () => {
  State.update({
    isSoulBound: !state.isSoulBound,
  });
};

if (!(state.sender || accountId)) {
  State.update({
    showAlert: true,
    toastMessage: "Please Sign in or connect a wallet",
  });
} else {
  State.update({
    showAlert: false,
    toastMessage: "",
  });
}

if (!state.customRecipient) {
  if (state.selectedChain == "0") {
    State.update({
      recipient: accountId,
    });
  } else {
    State.update({
      recipient: state.sender,
    });
  }
}

return (
  <div
    style={{
      background: "#fafafa",
      width: "100%",
    }}
  >
    <div style={{ display: "none" }}>
      <Widget
        src="mattb.near/widget/GenaDrop.GenaDropSDK"
        props={{
          onLoad: (sdk) => State.update({ sdk: sdk }),
          onRefresh: (sdk) => State.update({ sdk: sdk }),
          loaded: !!state.sdk,
        }}
      />
    </div>
    {!!state.sdk ? (
      <div>
        {state.showAlert && (
          <Widget src="jgodwill.near/widget/genalert" props={state} />
        )}

        <Main className="container-fluid">
          <div className="flex-grow-1">
            <HeaderBox>
              <Heading
                style={{
                  "text-align": "left",
                }}
                className="fs-2 fw-bold"
              >
                NFT Minter
              </Heading>
              <Web3Connect
                className="connect-wallet"
                connectLabel="Connect wallet"
                disconnectLabel="Disconnect"
              />
            </HeaderBox>

            <div
              style={{
                "text-align": "center",
              }}
            >
              <SelectGroup className="form-group">
                <SelectReplicaContainer>
                  <div
                    className={`select-replica__select ${
                      state.selectIsOpen ? "open" : ""
                    }`}
                    onClick={handleSelectClick}
                  >
                    <div className="select-replica__selected">
                      {state.sdk.chains.filter(
                        (chain) => chain.id === state.selectedChain.toString()
                      ) ? (
                        <img
                          src={state.sdk.chains
                            .filter(
                              (chain) =>
                                chain.id === state.selectedChain.toString()
                            )
                            .map((c) => c.url)}
                          alt={state.sdk.chains
                            .filter(
                              (chain) =>
                                chain.id === state.selectedChain.toString()
                            )
                            .map((c) => c.name)}
                        />
                      ) : (
                        "Select an option"
                      )}
                      <span>▼</span>
                    </div>
                    <div
                      className={`select-replica__options ${
                        state.selectIsOpen ? "open" : ""
                      }`}
                    >
                      {state.sdk.chains.map((chain) =>
                        chain.id !== state.selectedChain.toString() ? (
                          <div
                            key={chain.id}
                            className={`select-replica__option ${
                              selectedOption === chain.name ? "selected" : ""
                            }`}
                            onClick={() => handleChainChange(chain.id)}
                          >
                            <img src={chain.url} alt={chain.name} />
                          </div>
                        ) : (
                          ""
                        )
                      )}
                    </div>
                  </div>
                </SelectReplicaContainer>
                {state.sdk.lastMintlink && (
                  <a href={`${state.sdk.lastMintLink}`} target="_blank">
                    View Transaction
                  </a>
                )}
              </SelectGroup>
            </div>

            {!state.image.cid ? (
              <>
                <ImageUploadCard className="flex-grow-1">
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
                      image={state.image}
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

                {state.mintedNfts.length > 0 ? (
                  <>
                    <HeaderBox
                      style={{
                        "margin-top": "4rem",
                      }}
                    >
                      <Heading
                        style={{
                          "text-align": "left",
                        }}
                        className="fs-2 fw-bold"
                      >
                        History
                      </Heading>
                    </HeaderBox>
                    <HistoryBox>
                      {state.mintedNfts.map((nft) => (
                        <HistoryNFTBox>
                          {!!nft.image && <img src={nft.image} alt="NFT" />}
                          <div className="details">
                            <h1>{nft.title}</h1>
                            <p className="description">{nft.description}</p>
                            {!!nft.account && (
                              <p className="author">{nft.account}</p>
                            )}
                          </div>
                          <div className="tx-details">
                            <p className="title">Sent to</p>
                            <p className="info">{nft.recipient}</p>
                            {!!nft.network && nft.network != "0" && (
                              <a
                                target="_blank"
                                href={nft.link}
                                className="title"
                              >
                                View transaction on{" "}
                                {state.sdk.contractAddresses[nft.network][1]}
                              </a>
                            )}
                          </div>
                        </HistoryNFTBox>
                      ))}
                    </HistoryBox>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <NFTCard>
                  <div>
                    <img
                      src={`https://ipfs.near.social/ipfs/` + state.image.cid}
                      alt="Uploaded Image"
                    />
                    <div className="replace-btn">
                      <IpfsImageUpload
                        image={state.image}
                        className="btn text-decoration-none link-primary pe-auto"
                      />
                    </div>
                  </div>
                  <div className="body">
                    <Editable
                      className={
                        state.title == DEFAULT_NFT_TITLE ? "editable" : ""
                      }
                    >
                      <Input
                        type="text"
                        className="input-title"
                        value={state.title || ""}
                        onChange={(e) => onChangeTitle(e.target.value)}
                      />
                    </Editable>
                    <Editable
                      className={
                        state.description == DEFAULT_NFT_DESCRIPTION
                          ? "editable"
                          : ""
                      }
                    >
                      <TextArea
                        type="text"
                        value={state.description || ""}
                        onChange={(e) => onChangeDesc(e.target.value)}
                      />
                    </Editable>
                    <SendToInput>
                      <label>Send to</label>
                      <Input
                        type="text"
                        placeholder={
                          state.selectedChain == "0" ? accountId : state.sender
                        }
                        onChange={(e) => onChangeRecipient(e.target.value)}
                      />
                    </SendToInput>
                  </div>

                  <button
                    type="button"
                    disabled={
                      !state.title ||
                      !state.recipient ||
                      !(state.sender || accountId)
                    }
                    className="mint-btn"
                    onClick={handleMint}
                  >
                    Mint to{" "}
                    {state.sdk.contractAddresses[state.selectedChain][1]}
                  </button>
                </NFTCard>
              </>
            )}
          </div>
        </Main>
        <h6 className="text-center mt-5">
          <a
            href="https://genadrop.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            💧GenaDrop
          </a>
          <Widget
            src="miraclx.near/widget/Attribution"
            props={{ authors: [OWNER_ID], dep: true }}
          />
        </h6>
      </div>
    ) : (
      "Loading..."
    )}
  </div>
);
