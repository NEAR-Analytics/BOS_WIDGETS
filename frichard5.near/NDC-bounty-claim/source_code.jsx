const {account, formattedBountyDeadline, bountyBond, bounty} = props;

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

const claim = () => {
    const claimDeadline = new Big(state.max_deadline).times(86400 * Math.pow(10, 9));
    if(claimDeadline.gt(bounty.max_deadline)) {
        State.update({error: "Your deadline should be less than the bounty max deadline."});
        setTimeout(() => State.update({error:false}), 10000);
        return;
    }
    Near.call([
        {
            contractName: account,
            methodName: "bounty_claim",
            args: {
                id: bounty.id,
                deadline: claimDeadline.toFixed(),
            },
            gas: 300000000000000,
            deposit:bountyBond
        },
    ]);
}



return <Card>
    <h2>Time </h2>
    <InputText>
        <label style={{ color: "#8c8c8c" }} for={id}>
            {"Maximum delay to do this bounty"}
        </label>
        <p>{formattedBountyDeadline}</p>
    </InputText>
    <InputText>
        <label style={{ color: "#8c8c8c" }} for={id}>
            {"Days you need to realize this bounty"}
        </label>
        <input
            type="text"
            onChange={(e) => {
                State.update({
                    max_deadline: e.target.value ,
                });
            }}
            placeholder={"0"}
        />
    </InputText>
    <button onClick={claim} style={{marginLeft:0}}>Claim</button>
    {state.error? <span style={{color:'#ff5e03'}}>{state.error}</span>:""}
</Card>