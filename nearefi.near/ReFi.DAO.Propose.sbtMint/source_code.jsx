const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "refi.sputnik-dao.near";
const issuer = props.issuer ?? "issuer.regens.near";
const receiver = props.receiver ?? "daoshe.near";
const showReciever = props.showReciever ?? true;
const classId = props.classId ?? 1;
const reference =
  props.reference ??
  "https://genadrop.mypinata.cloud/ipfs/QmUxy2gB1QQD8mqRSwKkU2k6an4o99ip5ZL12if2opyjas?_gl=1*qk5u0e*_ga*MTQ0ODg3NzEzNS4xNjgyNjA0ODQy*_ga_5RMPXG14TE*MTY4OTM1MzU2Mi4yLjEuMTY4OTM1MzU5Ny4yNS4wLjA";
let profile = Social.getr(`${daoId}/profile`);

if (profile === null) {
  return "Loading...";
}
State.init({
  receiver: receiver,
  issuer: issuer,
});
const changeReceiver = (receiver) => {
  State.update({
    receiver,
  });
  console.log(state.receiver);
};

// const post_args = JSON.stringify({
//   data: {
//     [daoId]: {
//       post: {
//         main: JSON.stringify(content),
//       },
//       index: {
//         post: JSON.stringify({
//           key: "main",
//           value: {
//             type: "md",
//           },
//         }),
//       },
//     },
//   },
// });

const post_args = JSON.stringify({
  data: {
    receiver: state.receiver,
    metadata: {
      class: 1,
    },
    reference: reference,
  },
});

const proposal_args = Buffer.from(post_args, "utf-8").toString("base64");
//   const gas = 200000000000000;
//   const deposit = 80000000000000000000000; // 0.008 //
const handleProposal = () => {
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "create proposal to mint SBT",
          kind: {
            FunctionCall: {
              receiver_id: issuer,
              actions: [
                {
                  method_name: "sbt_mint",
                  args: proposal_args,
                  deposit: "80000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: deposit,
      gas: "219000000000000",
    },
  ]);
};

const Wrapper = styled.div`
  --padding: 24px;
  position: relative;

  @media (max-width: 1200px) {
    --padding: 12px;
  }
`;

const Actions = styled.div`
  display: inline-flex;
  gap: 12px;
  position: absolute;
  bottom: var(--padding);
  right: var(--padding);

  .commit-post-button,
  .preview-post-button {
    background: #59e692;
    color: #09342e;
    border-radius: 40px;
    height: 40px;
    padding: 0 35px;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &:hover,
    &:focus {
      background: rgb(112 242 164);
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .preview-post-button {
    color: #11181c;
    background: #f1f3f5;
    padding: 0;
    width: 40px;

    &:hover,
    &:focus {
      background: #d7dbde;
      outline: none;
    }
  }

  .upload-image-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f1f3f5;
    color: #11181c;
    border-radius: 40px;
    height: 40px;
    min-width: 40px;
    font-size: 0;
    border: none;
    cursor: pointer;
    transition: background 200ms, opacity 200ms;

    &::before {
      font-size: 16px;
    }

    &:hover,
    &:focus {
      background: #d7dbde;
      outline: none;
    }

    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    span {
      margin-left: 12px;
    }
  }

  .d-inline-block {
    display: flex !important;
    gap: 12px;
    margin: 0 !important;

    .overflow-hidden {
      width: 40px !important;
      height: 40px !important;
    }
  }
`;

const PreviewWrapper = styled.div`
  position: relative;
  padding: var(--padding);
  padding-bottom: calc(40px + (var(--padding) * 2));
`;

const ButtonWrapper = styled.div`
  .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      transform: rotate(90deg);
      color: #7E868C;
    }
  }
`;

function textareaInputHandler(value) {
  State.update({ text: value });
}

return (
  <Wrapper>
    {showReciever && (
      <div className="input-group">
        <input
          type="text"
          className={`form-control`}
          onChange={(e) => changeReceiver(e.target.value)}
          placeholder={props.placeholder ?? `Enter Reciever`}
        />
      </div>
    )}
    <ButtonWrapper>
      <button
        className="join-button"
        onClick={handleProposal}
        disabled={!state.text}
      >
        Propose to Mint SBT
      </button>
    </ButtonWrapper>
  </Wrapper>
);
