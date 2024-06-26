const CoADaoId = props.dev
  ? "coa.gwg-testing.near"
  : "congress-coa-v1.ndc-gwg.near";
const VotingBodyDaoId = props.dev
  ? "voting-body-v1.gwg-testing.near"
  : "voting-body-v1.ndc-gwg.near";
const TCDaoId = props.dev
  ? "tc.gwg-testing.near"
  : "congress-tc-v1.ndc-gwg.near";
const HoMDaoId = props.dev
  ? "hom.gwg-testing.near"
  : "congress-hom-v1.ndc-gwg.near";
const widgetOwner = props.widgetOwner ?? "astraplusplus.ndctools.near";

State.init({
  tab: props.tab ?? "proposals",
  accountId: props.accountId ?? context.accountId,
  daoId: props.daoId,
  proposalId: props.proposalId,
});

const update = (state) => State.update(state);

const constructURL = (paramObj, base) => {
  paramObj = { ...paramObj, page: "dao" };
  const baseURL = base ?? `#/${widgetOwner}/widget/home`;
  let params = "";
  for (const [key, value] of Object.entries(paramObj)) {
    if (key === "dev" && value === false) {
      continue;
    }
    params += `${key}=${value}&`;
  }
  params = params.slice(0, -1);
  return `${baseURL}?${params}`;
};

const isCongressDaoID =
  props.daoId === HoMDaoId ||
  props.daoId === CoADaoId ||
  props.daoId === TCDaoId;

const tabs = {
  proposals: {
    name: "Proposals",
    widget: "DAO.Proposals.index",
    href: constructURL({
      tab: "proposals",
      daoId: state.daoId,
      dev: props.dev ?? false,
    }),
  },
  home: {
    name: "Discussion",
    widget: "DAO.Discussion",
    href: constructURL({
      tab: "home",
      daoId: state.daoId,
      dev: props.dev ?? false,
    }),
  },
  funds: {
    name: "Fund Flows",
    widget: "DAO.Funds.index",
    href: constructURL({
      tab: "funds",
      daoId: state.daoId,
      dev: props.dev ?? false,
    }),
  },
  members: {
    name: "Members & Policy",
    widget: "DAO.Members.index",
    href: constructURL({
      tab: "members",
      daoId: state.daoId,
      dev: props.dev ?? false,
    }),
  },
  followers: {
    name: "Followers",
    widget: "DAO.Followers.index",
    href: constructURL({
      tab: "followers",
      daoId: state.daoId,
      dev: props.dev ?? false,
    }),
  },
};

if (isCongressDaoID || props.daoId === VotingBodyDaoId) {
  delete tabs["funds"];
  delete tabs["projects"];
  delete tabs["bounties"];
}
// not showing members page in v1
if (props.daoId === VotingBodyDaoId) {
  delete tabs["members"];
}

if (!props.daoId) {
  // TODO: add a proper error screen
  return "Please provide a DAO ID";
}

const tabContent = (
  <Widget
    src={`${widgetOwner}/widget/${tabs[state.tab || "home"].widget}`}
    props={{
      update,
      tab: state.tab,
      accountId: state.accountId,
      daoId: state.daoId,
      proposalId: state.proposalId,
      ...props,
    }}
  />
);

// To keep our styles  consistent across widgets, let's define them here based on html tags and classes
const Root = styled.div`
    font-family:
        "Open Sans",
        "Manrope",
        system-ui,
        -apple-system,
        "Segoe UI",
        Roboto,
        "Helvetica Neue",
        "Noto Sans",
        "Liberation Sans",
        Arial,
        sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji";
    font-size: 16px;
    line-height: 1.5;
    color: #000;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 600;
        letter-spacing: -0.02em;
        margin-bottom: 0.5em;
    }

    h1 {
        font-size: 28px;
    }

    h2 {
        font-size: 24px;
    }

    h3 {
        font-size: 20px;
    }

    h5 {
        font-size: 14px;
    }

    h6 {
        font-size: 12px;
    }

    a {
        color: #000;
        text-decoration: none;
        transition: color 0.1s ease-in-out;
    }

    a:hover {
        color: #4498e0;
    }

    .ndc-card {
        border-radius: 16px;
        box-shadow:
            rgba(0, 0, 0, 0.1) 0 1px 3px,
            rgba(0, 0, 0, 0.05) 0 1px 20px;
        background-color: #fff;
    }
`;

return (
  <Root className="pb-5">
    <Widget src={`nearui.near/widget/Typography.OpenSansFont`} />

    <Widget
      src={`${widgetOwner}/widget/DAO.Layout.Header`}
      props={{
        daoId: state.daoId,
      }}
    />
    <div className="w-100">
      <Widget
        src={`${widgetOwner}/widget/DAO.Layout.Tabs`}
        props={{
          tabs: tabs,
          tab: state.tab,
          update,
        }}
      />
      {tabContent}
    </div>
  </Root>
);
