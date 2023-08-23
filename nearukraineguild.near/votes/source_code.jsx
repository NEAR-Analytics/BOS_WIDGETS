let layout = [
  {
    type: "row",
    content: [
      {
        type: "text",
        variants: ["lg"],
        rows: 1,
        style: {
          width: "50%",
        },
      },
      {
        type: "text",
        variants: ["sm"],
        rows: 1,
        style: {
          width: "80px",
          marginStart: "auto",
        },
      },
    ],
  },
  {
    type: "row",
    variants: ["me-auto"],
    content: [
      {
        type: "avatar",
        variants: ["md", "me-1"],
      },
      {
        type: "text",
        variants: ["md"],
        rows: 1,
        style: {
          width: "150px",
        },
      },
    ],
  },
  {
    type: "box",
    variants: ["lg", "mb-5"],
  },
  {
    type: "row",
    variants: ["flex-column"],
    content: [
      {
        type: "box",
        variants: ["rounded-5"],
        style: {
          height: "46px",
        },
        count: 3,
      },
    ],
  },
  {
    type: "row",
    variants: ["justify-content-start", "mt-4"],
    content: [
      {
        type: "box",
        variants: ["rounded-5"],
        count: 2,
        style: {
          height: "38px",
          width: "160px",
        },
      },
    ],
  },
];

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
      <div class="container p-3 d-flex flex-column align-items-center">
        {rednerSelector()}
      </div>
      <Widget
        src={`nearui.near/widget/Typography.Text`}
        props={{
          children: `Fantastic users who voted for ${state.profile.name.toUpperCase()}`,
          tag: "h1",
          size: "5",
          weight: "bold",
          color: "default",
          className: "mt-4 mb-2",
          otherProps: {
            id: "my-text",
          },
        }}
      />
      <div class="mt-3 mb-3">
        <Widget
          src="nearui.near/widget/Element.User"
          props={{
            accountId: state.wallet,
            options: {
              size: "lg",
              showSocialName: true,
              showImage: true,
              showHumanBadge: true,
            },
          }}
        />
      </div>
      <Widget
        src="nearui.near/widget/Input.Button"
        props={{
          children: `VOTE FOR ${state.profile.name.toUpperCase()}!`,
          variant: "success",
          href: `/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=HouseOfMerit&accountId=${state.wallet}`,
          size: "lg",
        }}
      />
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
    <Widget src="nearui.near/widget/Feedback.Skeleton" props={{ layout }} />
  );
