const font = fetch(
  "https://fonts.googleapis.com/css2?family=Kodchasan:wght@700&display=swap"
).body;

const Container = useMemo(
  () => styled.div`
  ${font}
  margin-left: auto;
  margin-right: auto;
  max-width: 960px;
  padding-right: 15px;
  padding-left: 15px;
  
  & * {
    font-family: 'Kodchasan', sans-serif;
  }
`,
  [font]
);

const wallet = props.wallet_id || context.accountId;

const [accountId, setAccountId] = useState(wallet || "");
const [valid, setValid] = useState(true);
const [errorMessage, setErrorMessage] = useState("");
const [votingPower, setVotingPower] = useState(null);
const [voterInfo, setVoterInfo] = useState(null);
const [totalUsers, setTotalUsers] = useState(null);

const validate = (accountId) => {
  console.log("accountId", accountId);
  const accountIdRegex =
    /^(([a-z\d]+[\-_])*[a-z\d]+\.)*([a-z\d]+[\-_])*[a-z\d]+$/;
  setAccountId(accountId);

  if (typeof accountId !== "string") {
    setValid(false);
    setErrorMessage("Account ID must be a text value!");
    return;
  }

  if (accountId.length < 2) {
    setValid(false);
    setErrorMessage("Account ID must be at least 2 characters long!");

    return;
  }

  if (accountId.length > 64) {
    setValid(false);
    setErrorMessage("Account ID must be at most 64 characters long!");

    return;
  }

  if (!accountIdRegex.test(accountId)) {
    setValid(false);
    setErrorMessage(
      "Account ID must follow the specified rules and end with .near!"
    );

    return;
  }

  setValid(true);
  setErrorMessage("");
};

const fetchData = (method, params, callback) => {
  return asyncFetch("https://rpc.testnet.near.org", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "dontcare",
      method: "query",
      jsonrpc: "2.0",
      params: {
        ...params,
        request_type: method,
        account_id: "snapshot-test.testnet",
        finality: "final",
      },
    }),
  }).then((res) => {
    callback(res.body);
  });
};

useEffect(() => {
  fetchData(
    "call_function",
    {
      method_name: "get_total_eligible_users",
      args_base64: btoa({}),
    },
    (res) => {
      setTotalUsers(JSON.parse(String.fromCharCode(...res.result.result)));
    }
  );
}, []);

const getVotingPower = () => {
  fetchData(
    "call_function",
    {
      method_name: "get_vote_power",
      args_base64: btoa(JSON.stringify({ voter: accountId })),
    },
    (res) => {
      console.log("res", res);
      console.log(
        "String.fromCharCode(...res.result.result)",
        String.fromCharCode(...res.result.result)
      );
      setVotingPower(String.fromCharCode(...res.result.result));
    }
  );

  fetchData(
    "call_function",
    {
      method_name: "get_eligible_voter_info",
      args_base64: btoa(JSON.stringify({ account_id: accountId })),
    },
    (res) => {
      setVoterInfo(JSON.parse(String.fromCharCode(...res.result.result)));
    }
  );
};

const codeSnippet = `stakepower = if stake > 1000 (configurable) 
  1000 + sqrt(stake - 1000)
else {
  stake
}
activity_power = 20 * active_months

result = stake_power + activity_power`;

return (
  <Container className="custom-container">
    <h1 className="mb-4 text-center">
      Check your voting power for the NDC Stake-Weighted mechanism
    </h1>
    <div className="card bg-light p-4 mb-4 text-center">
      <p>
        Your vote matters! Please take a moment to cast your vote and help shape
        the future of our community.
      </p>
      <p>
        Don't forget to{" "}
        <a
          href="https://near.org/astraplusplus.ndctools.near/widget/home?page=dao&tab=proposals&daoId=voting-body-v1.ndc-gwg.near&proposalId=11"
          className="text-primary"
        >
          cast your vote
        </a>{" "}
        to support this stake-weighted solution or reject it if you don't like
        it.
      </p>
    </div>
    <p className="text-center">
      Type the account which you want to validate: <br />
      'XXX.near', 'XXX.tg' or hash(64 symbols)
      <br />
      and click to see your voting power and related info
    </p>
    <div className="input-group mb-4 w-100">
      <input
        type="text"
        value={accountId}
        placeholder={walletId}
        onChange={(e) => validate(e.target.value)}
        className="form-control w-100"
      />
      {!valid && <small className="text-danger">{errorMessage}</small>}
    </div>
    <button className="btn btn-primary mb-4" onClick={getVotingPower}>
      Get Voting Power
    </button>
    <div className="text-center">
      {votingPower && (
        <div>
          <b>Voting Power:</b> {votingPower}
        </div>
      )}
      {voterInfo && (
        <div>
          <div>
            <b>Active Months:</b> {voterInfo.active_months}
          </div>
          <div>
            <b>Stake:</b>{" "}
            {(parseFloat(voterInfo.stake) / Math.pow(10, 24)).toFixed(2)} Near
          </div>
        </div>
      )}
    </div>
    <div className="card bg-light p-4 my-4">
      <p className="mb-0">
        <b>Calculation of Voting Power</b>
      </p>
      <pre className="text-left bg-warning p-4 rounded">{codeSnippet}</pre>
    </div>
    <div>
      <h4>Explanation of voting power: </h4>
      <ol className="my-4 list-group list-group-numbered">
        <li className="list-group-item">
          After the threshold 1000 Near, the system uses a quadratic formula
        </li>
        <li className="list-group-item">1000 staked Near - 1000 votes</li>
        <li className="list-group-item">
          1001000 (1mil) Near - 1000 + sqrt(1000000) = 2000 votes
        </li>
        <li className="list-group-item">
          Additionally, if you ever staked with your account, you can have{" "}
          <b>20*(active on-chain months, right now - 42 months)</b> voting power
        </li>
        <li className="list-group-item">
          Total is <b>{totalUsers}</b> accounts that can potentially vote
        </li>
        <li className="list-group-item">
          Data made from a{" "}
          <a
            href="https://bafybeidy6aerzfcaytshbntccgq6oquopd4q3ftsuaz66bstjfc4vpuwku.ipfs.w3s.link/"
            target="_blank"
            rel="noopener noreferrer"
          >
            snapshot
          </a>{" "}
          that was made on <b>17.12.2023</b>
        </li>
      </ol>
    </div>
    <div>
      <p>
        <b>
          Read more about the voting system and how it will be implemented{" "}
          <a
            href="https://hackmd.io/8YBpAi47QN2ceqPLjG68Iw"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>{" "}
          if you have any questions please ask them{" "}
          <a
            href="https://t.me/ndcopstech"
            target="_blank"
            rel="noopener noreferrer"
          >
            in Ops team telegram chat
          </a>
        </b>
      </p>
    </div>
    <h1 className="mb-4">Some useful analytics</h1>
    <div>
      <h3>Legend:</h3>
      <ol>
        <li>0-1 - accounts with a stake from 0-1 Near</li>
        <li>1-10 - accounts with a stake from 1-10 Near</li>
        <li>10-100 - accounts with a stake from 10-100 Near</li>
        <li>100-1000 - accounts with a stake from 100-1000 Near</li>
        <li>1000-10000 - accounts with a stake from 1000-10000 Near</li>
        <li>10000+ - accounts with stake more than 1000 Near</li>
      </ol>
    </div>
    <Widget
      src="lord1.near/widget/Pie-chart"
      props={{
        data: [
          ["0-1", 22.82],
          ["1-10", 6.54],
          ["10-100", 12.98],
          ["100-1000", 30.45],
          ["1000-10000", 18.02],
          ["10000+", 9.18],
        ],
        chartOption: {
          title: "Voting Power Distribution",
          type: "donut",
        },
      }}
    />
    <Widget
      src="lord1.near/widget/Pie-chart"
      props={{
        data: [
          ["0-1", 9410],
          ["1-10", 94670],
          ["10-100", 1330000],
          ["100-1000", 8080000],
          ["1000-10000", 5515550],
          ["10000+", 2886694],
        ],
        chartOption: {
          title: "Voting Power by Stake distribution",
          type: "donut",
        },
      }}
    />
    <Widget
      src="lord1.near/widget/Pie-chart"
      props={{
        data: [
          ["0-1", 7844022],
          ["1-10", 2157842],
          ["10-100", 3137216],
          ["100-1000", 2401050],
          ["1000-10000", 685902],
          ["10000+", 273968],
        ],
        chartOption: {
          title: "Voting Power by Activity distribution",
          type: "donut",
        },
      }}
    />

    <Widget
      src="lord1.near/widget/Pie-chart"
      props={{
        data: [
          ["0-1", 131],
          ["1-10", 137],
          ["10-100", 187],
          ["100-1000", 571],
          ["1000-10000", 1183],
          ["10000+", 1510],
        ],
        chartOption: {
          title: "Power Per User",
          type: "donut",
        },
      }}
    />

    <Widget
      src="lord1.near/widget/Pie-chart"
      props={{
        data: [
          ["0-1", 47.54],
          ["1-10", 13.08],
          ["10-100", 19.01],
          ["100-1000", 14.55],
          ["1000-10000", 4.16],
          ["10000+", 1.66],
        ],
        chartOption: {
          title: "Users by stake category",
          type: "donut",
        },
      }}
    />

    <Widget
      src="kiskesis.near/widget/my-socials"
      props={{
        twitterURL: "https://twitter.com/arugutavo",
        textOptions: {
          textColor: "black",
          text: "Follow",
        },
        iconsOptions: {
          telegram: "black",
          twitter: "black",
          nearSocial: "black",
        },
      }}
    />
  </Container>
);
