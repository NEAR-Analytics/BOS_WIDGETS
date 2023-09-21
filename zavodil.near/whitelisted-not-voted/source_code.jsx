const data = fetch(
  "https://raw.githubusercontent.com/zavodil/near-nft-owners-list/main/output_election_votes.txt"
);

const whitelistedData = fetch(
  "https://gist.githubusercontent.com/zavodil/20e4ae896e1f6053e1d66a398e1026c9/raw/0363976f86bb067c142b1d8912ad37e639b876cf/whitelisted.txt"
);

const [voters, setVoters] = useState(null);
const [whitelisted, setWhitelisted] = useState(null);
const [available, setAvailable] = useState([]);

useEffect(() => {
  if (!data.ok) {
    return;
  }
  const voters = {};
  Object.values(
    data.body
      .split("\n")
      .map((line) => line.split("|"))
      .filter((data) => data.length === 5)
  ).forEach((item) => {
    const account_id = item[0];
    if (voters[account_id] == undefined) {
      voters[account_id] = {};
    }
    voters[account_id][item[3]] = item[4].toLowerCase();
  });
  setVoters(voters);
}, [data]);

if (!voters) {
  return "Loading";
}

useEffect(() => {
  if (!whitelistedData.ok) {
    return;
  }
  setWhitelisted(JSON.parse(whitelistedData.body));
}, [whitelistedData]);

useEffect(() => {
  if (!voters || !whitelisted) {
    return;
  }

  let availableVoters = whitelisted.filter(
    (account_id) => !Object.keys(voters).includes(account_id)
  );

  setAvailable(availableVoters);
}, [voters, whitelisted]);

return (
  <>
    <h1>Whitelisted users available to vote</h1>
    {available.map((accountId) => (
      <div>
        <Widget
          src="mob.near/widget/N.ProfileLine"
          props={{
            accountId,
            link: true,
            hideAccountId: true,
            hideImage: false,
          }}
        />
        <small class="ps-2 text-secondary">[{accountId}]</small>
      </div>
    ))}
  </>
);
