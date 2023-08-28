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

const registryContract = "registry.i-am-human.near";

State.init({
  wallet: "kiskesis.near",
  profile: {},
  nominations: {},
  data: {},
  comments: [],
  verified: false,
  filteredWalletData: [],
});

const baseApi = "https://api.pikespeak.ai";

const apiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const nominationContract = "nominations.ndc-gwg.near";
const httpRequestOpt = {
  headers: { "x-api-key": apiKey },
};

const wallets = [
  "kiskesis.near",
  "whendacha.near",
  "vlad.near",
  "davletuner.near",
  "vadim.near",
  "evangel.near",
  "haenko.near",
  "yonota.near",
  "johanga108.near",
  "dk_51.near",
  "lolson.near",
  "moska.near",
  "iamanansari.near",
  "alan777.near",
  "luciotato.near",
  "kemo.near",
  "maxkott.near",
  "blaze.near",
  "techdir.near",
  "rahulgoel.near",
  "tolmindev.near",
  "izubair.near",
].map((wallet) => {
  const res = fetch(
    `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${wallet}&upvoter=${context.accountId}&contract=${nominationContract}`,
    httpRequestOpt
  );

  return {
    wallet: wallet,
    voted: res.body,
  };
});

const houseNominations = (house) =>
  `${baseApi}/nominations/house-nominations?house=${house}&contract=${nominationContract}`;

let walletData = [
  fetch(houseNominations("HouseOfMerit"), httpRequestOpt).body,
  fetch(houseNominations("TransparencyCommission"), httpRequestOpt).body,
  fetch(houseNominations("CouncilOfAdvisors"), httpRequestOpt).body,
];

const filteredWalletData = walletData.map((group) => {
  return group.filter((entry) =>
    wallets.some(({ wallet }) => wallet === entry.nominee)
  );
});

State.update({
  filteredWalletData,
});

asyncFetch(
  `https://api.pikespeak.ai/nominations/candidates-comments-and-upvotes?candidate=${state.wallet}&contract=${nominationContract}`,
  httpRequestOpt
).then((res) => {
  State.update({ comments: res.body[0] });
});

asyncFetch(
  `https://api.pikespeak.ai/sbt/has-sbt?holder=${context.accountId}&class_id=1&issuer=fractal.i-am-human.near&with_expired=false&registry=${registryContract}`,
  httpRequestOpt
).then((res) => {
  State.update({ verified: res.body });
});

asyncFetch(
  `https://api.pikespeak.ai/nominations/is-upvoted-by?candidate=${state.wallet}&upvoter=${context.accountId}&contract=${nominationContract}`,
  httpRequestOpt
).then((res) => {
  State.update({ voted: res.body });
});

const getData = (wallet) => {
  let profile = Social.getr(`${wallet}/profile`);
  let nominations = Social.getr(`${wallet}/nominations`);

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

const Button = ({ props }) => {
  return <Widget src="nearui.near/widget/Input.Button" props={props} />;
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
    {state.filteredWalletData.map((houseData, index) => (
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

function handleUpVote() {
  Near.call(
    nominationContract,
    state.voted ? "remove_upvote" : "upvote",
    {
      candidate: state.wallet,
    },
    300000000000000,
    state.voted ? 0 : 1000000000000000000000
  );
}

const filteredWallets = wallets.filter(
  ({ wallet, voted }) => !voted && context.accountId !== wallet
);

function handleVoteAll() {
  const coalitionVote = filteredWallets.map(({ wallet }) => {
    return {
      contractName: nominationContract,
      methodName: "upvote",
      args: {
        candidate: wallet,
      },
      deposit: Big(10).pow(21).mul(1),
      gas: Big(10).pow(12).mul(200),
    };
  });

  Near.call(coalitionVote);
}

const UpvoteButtonDisabled = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: solid 1px transparent;
  background: var(--buttons-disable, #c3cace);
  cursor: default !important;
`;

const UpvoteButton = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: solid 1px transparent;
  background-image: linear-gradient(#f8f8f9, #f8f8f9),
    radial-gradient(
      circle at left top,
      rgb(147, 51, 234) 0%,
      rgb(79, 70, 229) 100%
    );
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const UpvoteCount = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
  background: linear-gradient(90deg, #9333ea 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

const RightMarginDiv = styled.div`
  margin-right: 10px; /* Adjust the margin value as needed */
`;

if (state.data?.ok) {
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
      <div class="container p-3 pt-1 d-flex flex-column align-items-center">
        <Text
          props={{
            children: `Real Contributors List`,
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
        <Button
          props={{
            disabled:
              !context.accountId ||
              !state.verified ||
              filteredWallets.length === 0,
            className: "mb-4",
            children: `VOTE FOR ALL REAL CONTRIBUTORS WITH 1 CLICK!`,
            variant: "primary",
            onClick: handleVoteAll,
            size: "lg",
          }}
        />
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
      <div class="d-flex">
        <RightMarginDiv>
          <Button
            props={{
              children: `VOTE FOR ${state.profile.name.toUpperCase()}!`,
              variant: "success",
              href: `/nomination.ndctools.near/widget/NDC.Nomination.Candidate.Page?house=${state.nominations.house_intended}&accountId=${state.wallet}`,
              size: "lg",
            }}
          />
        </RightMarginDiv>

        <RightMarginDiv>
          <Widget
            src="nomination.ndctools.near/widget/NDC.StyledComponents"
            props={{
              Button: {
                text: `+${state.comments.upvotes ?? 0}`,
                disabled:
                  !context.accountId ||
                  !state.verified ||
                  context.accountId === state.wallet,
                className: `${
                  context.accountId && state.voted ? "primary" : "secondary"
                } dark`,
                onClick: handleUpVote,
                icon: <i className="bi bi-hand-thumbs-up"></i>,
              },
            }}
          />
        </RightMarginDiv>
      </div>
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
