const widgetOwner = "astraplusplus.ndctools.near";
const currentLink = "#/astraplusplus.ndctools.near/widget/index";
props.daoId = "marmaj-research.sputnik-dao.near";
let { tab } = props;
if (!tab) {
  tab = "home";
}

const tabs = [
  [
    {
      title: "Home",
      icon: <i className="bi bi-house-door"></i>,
      active: tab.split("-")[0] === "home",
      href: currentLink + "?tab=home",
      widgetName: "Feed.index",
      defaultProps: {},
    },
    {
      title: "Social feed",
      active: tab === "home",
      href: currentLink + "?tab=home",
      widgetName: "Feed.index",
      defaultProps: {},
    },
    {
      title: "My proposals",
      active: tab === "my-proposals",
      href: currentLink + "?tab=my-proposals",
      widgetName: "MyProposals.index",
      defaultProps: {},
    },
  ],
  [
    {
      title: "DAOs",
      icon: <i class="bi bi-grid"></i>,
      active: tab === "daos",
      href: currentLink + "?tab=daos",
      widgetName: "DAOs.index",
      defaultProps: {},
    },
    {
      title: "NDC Governance",
      active: tab === "daos-ndc",
      href: currentLink + "?tab=daos-ndc",
      widgetName: "DAOs.index",
      defaultProps: {
        filter: "ndcDAOs",
      },
    },
    {
      title: "My DAOs",
      active: tab === "my-daos",
      href: currentLink + "?tab=my-daos",
      widgetName: "DAOs.index",
      defaultProps: {
        filter: "myDAOs",
      },
    },
    {
      title: "Following",
      active: tab === "daos-following",
      href: currentLink + "?tab=daos-following",
      widgetName: "DAOs.index",
      defaultProps: {
        filter: "followedDAOs",
      },
    },
    {
      title: "All",
      active: tab === "daos",
      href: currentLink + "?tab=daos",
      widgetName: "DAOs.index",
      defaultProps: {},
    },
  ],
  {
    title: "Bounties area",
    icon: <i class="bi bi-briefcase"></i>,
    active: tab === "bounties",
    href: currentLink + "?tab=bounties",
    widgetName: "Bounties.index",
    defaultProps: {},
  },
  {
    title: "Actions library",
    icon: <i class="bi bi-code-slash"></i>,
    active: tab === "actions",
    href: currentLink + "?tab=actions",
    widgetName: "actions",
  },
  {
    title: "Create DAO",
    active: tab === "create-dao",
    href: currentLink + "?tab=create-dao",
    widgetName: "CreateDAO.index",
    hidden: true,
  },
];

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

  a {
    color: #000;
    text-decoration: none;
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
  <Root className="row">
    <Widget src={`nearui.near/widget/Typography.OpenSansFont`} />

    <Widget
      src="astraplusplus.ndctools.near/widget/Common.Layout.Header"
      props={{
        items: tabs,
      }}
    />
    <div className="col ms-sm-4 ps-lg-3 py-3 py-md-4">
      <Widget
        src={`${widgetOwner}/widget/DAO.index`}
        props={{ widgetOwner, ...props }}
      />
    </div>
  </Root>
);
