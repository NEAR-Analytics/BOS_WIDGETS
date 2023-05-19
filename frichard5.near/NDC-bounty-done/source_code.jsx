const {account, target, bounty, bountyBond} = props;

const Card = styled.div`
  position: relative;
  height: auto;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  border-radius: 4px;
  padding: 20px;
  overflow: auto;
  background: white;
`


const InputText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  width: fit-content;
`;

const sendProposal = () => {
    const deposit = bountyBond;
    Near.call([
        {
            contractName: account,
            methodName: "add_proposal",
            args: {
                proposal: {
                    description: state.description,
                    kind: {
                        BountyDone: {
                            bounty_id: Number(bounty.id),
                            receiver_id: target,
                        },
                    },
                },
            },
            gas: "300000000000000",
            deposit,
        },
    ]);
};

const InputDescription = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  width: 100%;
`;



return <Card>
    <h2>Time </h2>
    <InputDescription>
        <label style={{ color: "#8c8c8c" }} for={id}>
            {"Description"}
        </label>
        <input
            style={{ height: "160px" }}
            type="text"
            onChange={(e) => {
                State.update({
                    description: e.target.value,
                });
            }}
            placeholder={"Describe how you completed the bounty."}
        />
    </InputDescription>
    <button onClick={sendProposal} style={{marginLeft:0}}>Send proposal</button>
    {state.error? <span style={{color:'#ff5e03'}}>{state.error}</span>:""}
</Card>