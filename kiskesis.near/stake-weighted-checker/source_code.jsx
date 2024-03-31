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
  width: 100%;
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

const CardContainer = styled.div`
  background-color: #ffebee; /* Soft red color */
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  margin: 20px auto;
`;

const Message = styled.p`
  color: #b71c1c; /* Darker red color for emphasis */
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #b71c1c; /* Darker red color for emphasis */
  text-decoration: underline;
  cursor: pointer;
`;

const wallet = props.wallet_id || context.accountId;

State.init({
  valid: true,
  accountId: wallet,
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
  const votingPower = asyncFetch("https://rpc.testnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "dontcare",
      method: "query",
      jsonrpc: "2.0",
      params: {
        request_type: "call_function",
        finality: "final",
        account_id: "snapshot-test.testnet",
        method_name: "get_vote_power",
        args_base64: btoa(JSON.stringify({ voter: `${accountId}` })),
      },
    }),
  }).then((res) => {
    State.update({
      votingPower: String.fromCharCode(...res.body.result.result),
    });
  });

  const voterInfo = asyncFetch("https://rpc.testnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "dontcare",
      method: "query",
      jsonrpc: "2.0",
      params: {
        request_type: "call_function",
        finality: "final",
        account_id: "snapshot-test.testnet",
        method_name: "get_eligible_voter_info",
        args_base64: btoa(JSON.stringify({ account_id: `${accountId}` })),
      },
    }),
  }).then((res) => {
    State.update({
      voterInfo: JSON.parse(String.fromCharCode(...res.body.result.result)),
    });
  });
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

const codeSnippet = `stakepower = if stake > 1000 (configurable) 
  1000 + sqrt(stake - 1000)
else {
  stake
}
activity_power = 20 * active_months

result = stake_power + activity_power`;

return (
  <div className="d-flex flex-column align-items-center p-4">
    <h1>Check your voting power for NDC Stake-Weighted mechanism</h1>
    <CardContainer>
      <Message>
        Your vote matters! Please take a moment to cast your vote and help shape
        the future of our community.
      </Message>
      <p>
        Don't forget to{" "}
        <Link href="https://near.org/astraplusplus.ndctools.near/widget/home?page=dao&tab=proposals&daoId=voting-body-v1.ndc-gwg.near&proposalId=11">
          cast your vote
        </Link>{" "}
        to support this stake-weighted solution or reject it if you didn't like
        it.
      </p>
    </CardContainer>
    <p>
      Type the account which you want to validate: <br></br>'XXX.near', 'XXX.tg'
      or hash(64 symbols)
      <br></br>and click to see your voting power and related info
    </p>
    <LabelArea>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Input
          id
          type="text"
          value={v}
          placeholder={wallet}
          onChange={(e) => validate(e.target.value)}
          className="w-100"
        />
        <Error>{state.valid ? <></> : state.errorMessage}</Error>
      </div>
    </LabelArea>
    <button onClick={() => getVotingPower(state.accountId)}>
      Get Voting Power
    </button>
    <div className="text-center">
      {state.votingPower && (
        <div>
          <b>Voting Power:</b> {state.votingPower}
        </div>
      )}
      {state.voterInfo && (
        <div>
          <div>
            <b>Active Months:</b> {state.voterInfo.active_months}
          </div>
          <div>
            <b>Stake:</b>{" "}
            {(parseFloat(state.voterInfo.stake) / Math.pow(10, 24)).toFixed(2)}{" "}
            Near
          </div>
        </div>
      )}
    </div>

    <Card className="mt-3">
      <CardTitle>Calculation of Voting Power</CardTitle>
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
    <p>
      Explanation of voting power: The maximum voting power for the tokens is
      1000 <br></br>
      <br></br> Additionally, if you ever staked with your account, you can have
      20*(active onchain months) voting power
      <br></br>Total is around 150k accounts that can potentially vote
    </p>
  </div>
);
