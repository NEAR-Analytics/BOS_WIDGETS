State.init({
  wallet: "kiskesis.near",
  profile: {},
  nominations: {},
  data: {},
});

const wallets = [
  "kiskesis.near",
  "evangel.near",
  "haenko.near",
  "yonota.near",
  "johanga108.near",
];

const getData = (wallet) => {
  let profile = Social.getr(`${wallet}/profile`);
  let nominations = Social.getr(`${wallet}/nominations`);

  console.log("profile", profile);
  console.log("nominations", nominations);

  const data = fetch(
    `https://raw.githubusercontent.com/kiskesis/ndc-voters/main/${wallet}_output_votes.txt`
  );

  State.update({
    profile,
    nominations,
    data,
  });
};

getData(state.wallet);

const handleWalletChange = (e) => {
  const wallet = e.target.value;
  State.update({
    wallet,
  });

  console.log("wallet", wallet);

  getData(wallet);
};

const rednerSelector = () => (
  <select
    class="form-select"
    style={{
      maxWidth: "30vw",
      fontSize: "16px",
      backgroundColor: "#f7f7f7",
      borderColor: "#ccc",
      borderRadius: "4px",
      padding: "6px",
      cursor: "pointer",
    }}
    onChange={handleWalletChange}
  >
    {wallets.map((wallet) => (
      <option key={index} value={wallet}>
        {wallet}
      </option>
    ))}
  </select>
);

if (state.data.ok) {
  const rows = state.data.body
    .split("\n")
    .map((line) => line.split("|"))
    .filter((data) => data.length === 3)
    .map((item) => (
      <tr>
        <td>
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId: item[0], tooltip: false }}
          />
        </td>
        <td class="align-top">
          <small>{item[2].substr(0, 19)}</small>
        </td>
      </tr>
    ));

  return (
    <>
      {rednerSelector()}
      <h1>Fantastic users who voted for {state.profile.name.toUpperCase()}</h1>
      <a
        href="/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=HouseOfMerit&accountId=vadim.near"
        class="btn btn-primary mt-2"
      >
        VOTE FOR {state.profile.name.toUpperCase()}!
      </a>
      <table class="table table-sm mt-4">
        <thead>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Vote date (UTC)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <p>
        <small>
          Data is retrieved automatically from the
          <a
            href="https://github.com/zavodil/near-nft-owners-list/blob/main/.github/workflows/indexed.yml"
            target="_blank"
          >
            NEAR Public indexer
          </a>{" "}
          with a slight delay.
        </small>
      </p>
    </>
  );
} else
  return (
    <>
      "Loading"
      <button onClick={fetchVotesData}>Click</button>
    </>
  );
