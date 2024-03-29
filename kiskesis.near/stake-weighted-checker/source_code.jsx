const Input = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5em 0.75em;
  gap: 0.5em;
  background: #ffffff;
  border: 1px solid #d0d5dd;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

const LabelArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.25em;
  margin-bottom: 0.5em;
  flex-wrap: wrap;
`;

const Error = styled.small`
  color: red;
`;

const CodeSnippet = styled.div`
  font-family: monospace;
  white-space: pre-wrap;
  margin: 0;
`;

State.init({
  valid: true,
  accountId: "",
  errorMessage: <></>,
  votingPower: null,
  voterInfo: null,
});

const validate = (accountId) => {
  const accountIdRegex =
    /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;

  if (typeof accountId !== "string") {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: "Account ID must be a text value!",
    });
    return;
  }

  if (accountId.length < 2) {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: "Account ID must be at least 2 characters long!",
    });
    return;
  }

  if (accountId.length > 64) {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: "Account ID must be at most 64 characters long!",
    });
    return;
  }

  if (!accountIdRegex.test(accountId)) {
    State.update({
      accountId: "",
      valid: false,
      errorMessage: (
        <>
          Account ID must follow the rules specified{" "}
          <a href="https://nomicon.io/DataStructures/Account#account-id-rules">
            here
          </a>
          and ends on .near!
        </>
      ),
    });
    return;
  }

  State.update({ valid: true, errorMessage: "", accountId });
};

const accountId = props.accountId ?? "Login with NEAR Wallet";

const getVotingPower = (accountId) => {
  const votingPower = fetch("https://rpc.testnet.near.org", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: {
      contract: "snapshot-test.testnet",
      method: "get_vote_power",
      body: {
        voter: `${accountId}`,
      },
    },
  });

  const voterInfo = fetch("https://rpc.testnet.near.org", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "post",
    body: {
      contract: "snapshot-test.testnet",
      method: "get_eligible_voter_info",
      body: {
        account_id: `${accountId}`,
      },
    },
  });

  console.log("votingPower", votingPower);
  console.log("voterInfo", voterInfo);

  State.update({ votingPower, voterInfo });
};

const Card = ({ children, className }) => {
  return (
    <div
      className={`card ${className}`}
      style={{ maxWidth: "800px", padding: "2px" }}
    >
      <div className="card-body p-2">{children}</div>
    </div>
  );
};

const CardTitle = ({ children, className }) => {
  return <p className={`card-title ${className}`}>{children}</p>;
};

console.log("state.voterInfo", state.voterInfo);

const codeSnippet = `stakepower = if stake > 1000 (configurable) 
  1000 + sqrt(stake - 1000)
else {
  stake
}
activity_power = 20 * active_months

result = stake_power + activity_power`;

return (
  <div className="d-flex flex-column align-items-center">
    <h1>Check your voting power for NDC Stake-Weighted mechanism</h1>
    <p>
      Type the account which you want to validate 'XXX.near' and click button to
      see your voting power and related information
    </p>
    <LabelArea>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Input
          id
          type="text"
          value={v}
          onChange={(e) => validate(e.target.value)}
          className="w-100"
          style={{ maxWidth: "200px" }}
        />
        <Error>{state.valid ? <></> : state.errorMessage}</Error>
      </div>
    </LabelArea>
    <button onClick={() => getVotingPower(state.accountId)}>
      Get Voting Power
    </button>
    {state.votingPower && <div>Voting Power: {state.votingPower}</div>}
    {state.voterInfo ? (
      <div>
        <div>Active Months: {state.voterInfo.active_months}</div>
        <div>Stake: {state.voterInfo.stake}</div>
      </div>
    ) : (
      <div></div>
    )}
    <Card className="mt-3">
      <CardTitle>Calculation of Voting Power</CardTitle>
      <div>
        Stake Power: {state.votingPower} + Activity Power: {state.voterInfo}
      </div>
      <pre
        style={{
          backgroundColor: "#f3f3f3",
          padding: "10px",
          borderRadius: "5px",
          overflowX: "auto",
        }}
      >
        <CodeSnippet>{codeSnippet}</CodeSnippet>
      </pre>
    </Card>
  </div>
);
