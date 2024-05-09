const LensLib = VM.require("mattb.near/widget/NearBadger.Libs.Lens");
const FarcasterLib = VM.require("mattb.near/widget/NearBadger.Libs.Farcaster");

const { onClose } = props;
const POLYGON_CHAIN_ID = 137;

State.init({
  step: 0,
  address: null,
  chainId: 0,
  handle: null,
  checkedHandle: false,
  platform: "",
  addresses: [],
});

if (!Ethers.provider()) {
  State.update({
    address: null,
  });
} else {
  Ethers.provider()
    .send("eth_requestAccounts")
    .then(([address]) => State.update({ address }));

  Ethers.provider().on("network", (newNetwork) => {
    State.update({
      chainId: newNetwork.chainId,
    });
  });

  Ethers.provider().on("accountsChanged", ([address]) => {
    State.update({
      address,
    });
  });
}

if (
  state.platform === "lens" &&
  state.address &&
  state.chainId == POLYGON_CHAIN_ID &&
  !state.checkedHandle
) {
  LensLib.getAddressHandle(state.address).then((handle) => {
    if (handle) {
      State.update({
        handle,
      });
    }

    State.update({
      checkedHandle: true,
    });
  });
}

const DarkOverlay = styled.div`
    display:flex;
    align-items:flex-start;
    justify-content:center;
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,.02);
    backdrop-filter:blur(5px);
    overflow-y:scroll;
    box-sizing:border-box;
    padding-top:5rem;
`;

const Box = styled.div`
    position:relative;
    width:100%;
    max-width:500px;
    border-radius:20px;
    background-color:#fff;
    box-shadow: 0 0 20px 10px rgba(0,0,0,.1);
    padding:1.5rem;
    border:2px solid rgba(0,0,0,.05);
    margin-top:100px;
`;

const Title = styled.h1`
    font-size:1.6rem;
    font-weight:bold;
    margin-bottom:1.5rem;
`;

const Text = styled.p`

`;

const Controls = styled.div`
    width:100%;
    margin-top:1.2rem;
`;

const StepButton = styled.button`
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:50px;
    background-color:#87B697;
    border:0;
    font-weight:bold;
    color:#000;
    margin-top:.5rem;
    border-radius:30px;
    font-size:.9rem;

    :disabled {
      background-color: #F2F2F2;
      color:rgba(0,0,0,.3);
    }
`;

const Requirements = styled.ul`
    position:relative;
    padding:0;
    margin:0;
    list-style:none;
    padding: 30px 0 30px 50px;
    border-radius:10px;
    background-color:#F2F2F2;
    overflow:hidden;

    ::after {
        content:'';
        position:absolute;
        top:0;
        left:40px;
        width:2px;
        height:100%;
        background-color:rgba(0,0,0,.1);
        border-radius:10px;
    }

    .retry {
        display:block;
        z-index:99999;
        position:absolute;
        cursor:pointer;
        right:13px;
        bottom:13px;
        font-size:.8rem;
        font-weight:bold;
        opacity:.5;
        background-color:rgba(0,0,0,.1);
        padding: 3px 10px;
        border-radius:20px;
        border:0;
        transition: all .2s;
        border:1px solid rgba(0,0,0,.05);

        :hover {
            opacity:.7;
            transition: all .2s;
        }
    }
`;

const Requirement = styled.li`
    font-size:.8rem;
    position:relative;
    padding-left:5px;
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    
    :not(:last-of-type) {
        margin-bottom:10px;
    }

    h2 {
        color:rgba(0,0,0,.3);
        font-size:.8rem;
        font-weight:normal;
        padding:0;
        margin:0;

        + .description {
            margin-left:10px;
        }
    }

    &.selected {
        
        h2 {
            color:#000;
            font-size:.95rem;
            font-weight:bold;
            padding:0;
            margin:0;

            + .description {
                margin-left:10px;
            }
        }

        ::after {
            width:20px;
            height:20px;
            left:-19px;
        }

        ::before {
            width:12px;
            height:12px;
            left:-15px;
        }

        &.show-description {
          + .description {
              display:block;
          }
        }

        &.failed {
            + .description {
                display:block;
            }
        }
    }

    &.pending {
        ::before {
            background-color:#FDD835;
        }
    }

    &.verified {
        ::before {
            background-color:#00C753;
        }

        &+ .description {
          display:none!important;
        }
    }

    &.failed {
        ::before {
            background-color:#FF1744;
        }
    }

    ::after {
        content:'';
        position:absolute;
        width:15px;
        height:15px;
        background-color:#F2F2F2;
        border-radius:100%;
        margin:auto;
        top:0;
        bottom:0;
        left:-17px;
        z-index:999;
    }

    ::before {
        content:'';
        position:absolute;
        width:8px;
        height:8px;
        background-color:rgba(0,0,0,.2);
        border-radius:100%;
        margin:auto;
        top:0;
        bottom:0;
        left:-13px;
        z-index:1000;
    }

    &+ .description {
        display:none;
    }
`;

const Description = styled.li`
    margin-left:15px;
    margin-bottom:10px;
    font-size:.8rem;

    button {
        display:block;
        z-index:99999;
        cursor:pointer;
        right:13px;
        bottom:13px;
        font-size:.8rem;
        font-weight:bold;
        color:#000;
        opacity:.5;
        background-color:rgba(0,0,0,.1);
        padding: 3px 10px;
        border-radius:20px;
        border:0;
        transition: all .2s;
        border:1px solid rgba(0,0,0,.05);
        margin:10px 0 15px;

        :hover, :focus {
            opacity:.7;
            transition: all .2s;
            color:#000;
            background-color:rgba(0,0,0,.1);
            border:1px solid rgba(0,0,0,.05);
        }
    }

    input {
      max-width:150px;
      margin-top:10px;
    }
`;

const Warning = styled.div`
    width:100%;
    background-color:#fff2c4;
    border-radius:10px;
    margin-top:20px;
    padding:20px;

    h2 {
        font-size:1.2rem;
        font-weight:bold;
    }

    p {
        font-size:.8rem;
        margin:0;
        padding:0;
    }
`;

const Grid = styled.div`
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
`;

const Cell = styled.div`
  padding:10px;
  flex-grow:1;
  max-width:150px;

  :first-of-type {
    padding-left:0;
  }

  :last-of-type {
    padding-right:0;
  }
`;

const Option = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  cursor:pointer;
  width:100%;
  height:calc(150px - 20px);
  border:3px solid rgba(0,0,0,.1);
  border-radius:15px;
  box-shadow: 0 0 0 0 rgba(0,0,0,.02);
  transition: all .2s;

  :hover {
    box-shadow: 0 0 0 4px rgba(0,0,0,.02);
    border:3px solid rgba(0,0,0,.2);
    transition: all .2s;

    * {
      opacity:1;
      transition: all .2s;
    }
  }

  * {
    opacity:.6;
    transition: all .2s;
  }

  &.selected {
    border:3px solid rgba(0,0,0,.2);
    
    * {
      opacity:1;
      transition: all .2s;
    }
  }

  img {
    margin-bottom:10px;
  }

  p {
    margin:0;
    padding:0;
    font-weight:bold;
    font-size:.8rem;
  }
`;

let steps = [
  <>
    <Title>Choose platform</Title>
    <Text>
      Select one of the supported social platforms you want to get your profile
      verified on and click <strong>Next</strong>
    </Text>
    <Grid>
      <Cell>
        <Option
          className={`${state.platform === "lens" ? "selected" : ""}`}
          onClick={() => State.update({ platform: "lens" })}
        >
          <img
            style={{
              maxWidth: "80px",
            }}
            src="https://ipfs.near.social/ipfs/bafkreiggkmczb7v43nicdia4n7xqkgynopby5k3nxs3zj6fij5eeurh23i"
          />
          <p>Lens Protocol</p>
        </Option>
      </Cell>
      <Cell>
        <Option
          className={`${state.platform === "farcaster" ? "selected" : ""}`}
          onClick={() => State.update({ platform: "farcaster" })}
        >
          <img
            style={{
              maxWidth: "60px",
            }}
            src="https://ipfs.near.social/ipfs/bafkreif2ff55fa77acvcclxlccsidhyz5sos3abs5yln7daotbp35nwa7a"
          />
          <p>Farcaster</p>
        </Option>
      </Cell>
    </Grid>
  </>,
  {
    lens: (
      <>
        <Title>Verify handle</Title>
        <Text>
          Before starting the process, we need to check everything is ready to
          verify your handle
        </Text>
        <Requirements>
          <Requirement
            className={`${
              context.accountId != null ? "verified" : "selected failed"
            }`}
          >
            <h2>NEAR account connected</h2>
          </Requirement>
          <Description className="description">
            Your NEAR account is not connected
            <button>Check again</button>
          </Description>
          <Requirement
            className={`
          ${state.address ? "verified" : "selected failed"}
      `}
          >
            <h2>Ethereum wallet connected</h2>
          </Requirement>
          <Description className="description">
            Your wallet is not connected
            <Web3Connect connectLabel="Connect wallet" />
          </Description>
          <Requirement
            className={`
          ${
            state.address && state.chainId == POLYGON_CHAIN_ID ? "verified" : ""
          }
          ${
            state.address && state.chainId != POLYGON_CHAIN_ID
              ? "selected failed"
              : ""
          }
      `}
          >
            <h2>Polygon network connected</h2>
          </Requirement>
          <Description className="description">
            Your wallet is not connected to Polygon network. Some wallets might
            experience issues when trying to switch automatically. Please, in
            that case, switch it manually.
            <button
              onClick={() => {
                try {
                  Ethers.setChain({
                    chainId: ethers.utils.hexlify(POLYGON_CHAIN_ID),
                  });
                } catch {
                  Ethers.send("wallet_switchEthereumChain", [
                    {
                      chainId: ethers.utils.hexlify(POLYGON_CHAIN_ID),
                    },
                  ]);
                }
              }}
            >
              Switch network
            </button>
          </Description>
          <Requirement
            className={`
          ${state.handle && state.address ? "verified" : ""}
          ${
            !state.checkedHandle &&
            state.address &&
            state.chainId == POLYGON_CHAIN_ID
              ? "selected pending"
              : ""
          }
          ${
            state.address && state.checkedHandle && !state.handle
              ? "selected failed"
              : ""
          }
      `}
          >
            <h2>Lens handle available</h2>
          </Requirement>
          <Description className="description">
            Your address doesn't own any Lens handle
          </Description>
        </Requirements>
        {state.handle && (
          <Warning>
            <h2>Warning</h2>
            <Text>
              You will need NEAR in your account to save your verified identity
            </Text>
          </Warning>
        )}
      </>
    ),
    farcaster: (
      <>
        <Title>Verify handle</Title>
        <Text>
          Before starting the process, we need to check everything is ready to
          verify your handle
        </Text>
        <Requirements>
          <Requirement
            className={`${
              context.accountId != null ? "verified" : "selected failed"
            }`}
          >
            <h2>NEAR account connected</h2>
          </Requirement>
          <Description className="description">
            Your NEAR account is not connected
            <button>Check again</button>
          </Description>
          <Requirement
            className={`
            ${
              context.accountId != null
                ? "selected pending show-description"
                : ""
            }
          ${state.handle && state.checkedHandle ? "verified" : ""}
      `}
          >
            <h2>Farcaster profile linked to wallet</h2>
          </Requirement>
          <Description className="description">
            Link your Ethereum address to your Farcaster profile.
            <br />
            To do so, go to the Warpcast app and click
            <br />
            <strong>
              Settings {">"} Connected addresses {">"} Connect address
            </strong>
            <br />
            After that, please type your Farcaster username below
            <br />
            <input
              type="text"
              value={state.handle}
              onChange={(e) => State.update({ handle: e.target.value })}
            />
            <button
              onClick={() => {
                FarcasterLib.getAddressesByHandle(state.handle).then(
                  (evmAddresses) => {
                    State.update({
                      addresses: evmAddresses,
                    });

                    State.update({
                      checkedHandle: true,
                    });
                  }
                );
              }}
            >
              Next
            </button>
          </Description>
          <Requirement
            className={`
              ${
                state.handle && state.checkedHandle
                  ? state.address
                    ? "verified"
                    : "selected failed"
                  : "pending"
              }
          `}
          >
            <h2>Ethereum wallet connected</h2>
          </Requirement>
          <Description className="description">
            Your wallet is not connected
            <Web3Connect connectLabel="Connect wallet" />
          </Description>
          <Requirement
            className={`
              ${state.addresses.includes(state.address) && true ? "verified" : ""}
              ${state.addresses.length === 0 ? "pending" : ""}
          `}
          >
            <h2>Ethereum wallet owns the profile</h2>
          </Requirement>
          <Description className="description">
            Looks like your wallet doesn't own this profile. Please, restart the
            process and try again.
          </Description>
        </Requirements>
        {state.handle &&
          state.addresses.length > 0 && (
            <Warning>
              <h2>Warning</h2>
              <Text>
                You will need NEAR in your account to save your verified
                identity
              </Text>
            </Warning>
          )}
      </>
    ),
  }[state.platform] || <></>,
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
    <Box
      onClick={() => {
        State.update({ boxClicked: true });
      }}
    >
      {steps[state.step] ?? ""}
      <Controls>
        {steps[state.step + 1] && (
          <StepButton
            onClick={() => State.update({ step: state.step + 1 })}
            disabled={!state.platform}
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
              if (state.platform === "lens") {
                LensLib.createProof(state.address, context.accountId);
              } else {
                FarcasterLib.createProof(
                  state.handle,
                  state.address,
                  context.accountId
                );
              }
            }}
            disabled={
              state.platform === "lens"
                ? !context.accountId ||
                  !state.address ||
                  state.chainId != POLYGON_CHAIN_ID ||
                  !state.handle
                : !context.accountId ||
                  !state.addresses ||
                  !state.address
            }
          >
            Sign & Save
          </StepButton>
        )}
      </Controls>
    </Box>
  </DarkOverlay>
);
