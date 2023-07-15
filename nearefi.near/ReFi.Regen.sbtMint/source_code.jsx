const receiver = props.receiver ?? "efiz.near";
const daoId = props.daoId ?? "refi.sputnik-dao.near";
const accountId = context.accountId;
const issuer = props.issuer ?? "issuer.regens.near";
const classId = props.classId ?? 1;
const reference =
  props.reference ??
  "https://genadrop.mypinata.cloud/ipfs/QmUxy2gB1QQD8mqRSwKkU2k6an4o99ip5ZL12if2opyjas?_gl=1*qk5u0e*_ga*MTQ0ODg3NzEzNS4xNjgyNjA0ODQy*_ga_5RMPXG14TE*MTY4OTM1MzU2Mi4yLjEuMTY4OTM1MzU5Ny4yNS4wLjA";
// near call issuer.regens.near  sbt_mint '{
//     "receiver": "ndcplug.near",
//     "reference":"https://genadrop.mypinata.cloud/ipfs/QmUxy2gB1QQD8mqRSwKkU2k6an4o99ip5ZL12if2opyjas?_gl=1*qk5u0e*_ga*MTQ0ODg3NzEzNS4xNjgyNjA0ODQy*_ga_5RMPXG14TE*MTY4OTM1MzU2Mi4yLjEuMTY4OTM1MzU5Ny4yNS4wLjA.",
//     "metadata": {"class": 1}
//     }'  --deposit 0.008 --accountId admin.regens.near

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

const sbtMint = () => {
  const gas = 200000000000000;
  const deposit = 80000000000000000000000; // 0.008 // maybe change zero
  Near.call([
    {
      contractName: state.issuer,
      methodName: "sbt_mint",
      args: {
        receiver: state.receiver,
        metadata: {
          class: 1,
        },
        reference: reference,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};
// check if class key work effect
const sbtDAOProposal = () => {
  const gas = 200000000000000;
  const deposit = 100000000000000000000000;
  Near.call([
    {
      contractName: daoId,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: "Reccomended as a vibee",
          kind: {
            AddMemberToRole: {
              member_id: accountId,
              role: role,
            },
          },
        },
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

const Wrapper = styled.div`
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
// change function call
return (
  <div className="">
    <div className="input-group">
      <input
        type="text"
        className={`form-control`}
        onChange={(e) => changeReceiver(e.target.value)}
        placeholder={props.placeholder ?? `Enter Reciever`}
      />
    </div>
    <Wrapper>
      <button className="join-button" onClick={sbtMint}>
        Issue SBT
      </button>
    </Wrapper>
  </div>
);
