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
  "dk_51.near",
  "alan777.near",
  "luciotato.near",
  "kemo.near",
  "maxkott.near",
  "planetaworld.near",
  "igboze_builder.near",
  "blaze.near",
  "techdir.near",
  "rahulgoel.near",
  "tolmindev.near",
  "izubair.near",
];

const baseApi = "https://api.pikespeak.ai";

const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const httpRequestOpt = {
  headers: { "x-api-key": apiKey },
};

const houseNominations = (house) =>
  `${baseApi}/nominations/house-nominations?house=${house}&contract=nominations.ndc-gwg.near`;

let walletData = [
  fetch(houseNominations("HouseOfMerit"), httpRequestOpt).body,
  fetch(houseNominations("TransparencyCommission"), httpRequestOpt).body,
  fetch(houseNominations("CouncilOfAdvisors"), httpRequestOpt).body,
];

const filteredWalletData = walletData.map((group) => {
  return group.filter((entry) => wallets.includes(entry.nominee));
});

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

  getData(wallet);
};

const Text = ({ props }) => {
  return <Widget src={`nearui.near/widget/Typography.Text`} props={props} />;
};

const Table = styled.div`
  display: table;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px;
  font-size: 16px;
`;

const TableHeader = styled.th`
  line-height: 14px;
`;

const GroupLabel = styled.option`
  font-weight: bold;
  background-color: #eee;
`;

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
    value={state.wallet}
  >
    {filteredWalletData.map((houseData, index) => (
      <>
        <GroupLabel disabled>{houseData[0].house}</GroupLabel>
        {houseData.map((walletItem, walletIndex) => (
          <option key={walletIndex} value={walletItem.nominee}>
            {walletItem.nominee}
          </option>
        ))}
      </>
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
        <td class="pt-3">
          <Widget
            src="nearui.near/widget/Element.User"
            props={{
              accountId: item[0],
              options: {
                size: "md",
                showSocialName: true,
                showImage: true,
                showHumanBadge: true,
              },
            }}
          />
        </td>
        <td className="align-top pt-3">
          <small>{item[2].substr(0, 19)}</small>
        </td>
      </tr>
    ));

  return (
    <>
      <div class="container p-3 d-flex flex-column align-items-center">
        {rednerSelector()}
      </div>
      <Text
        props={{
          children: (
            <a href="https://near.org/nomination.ndctools.near/widget/NDC.Nomination.Page">
              {state.nominations.house_intended.replace(
                /([a-z])([A-Z])/g,
                "$1 $2"
              )}
            </a>
          ),
          tag: "h1",
          size: "5",
          weight: "bold",
          color: "default",
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
          href: `/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=${state.nominations.house_intended}&accountId=${state.wallet}`,
          size: "lg",
        }}
      />
      <Text
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
      <Table class="table table-sm mt-4">
        <thead>
          <tr>
            <TableHeader scope="col">User</TableHeader>
            <TableHeader scope="col">Vote date (UTC)</TableHeader>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <p class="mt-4">
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
