/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/neardevhub-treasury-dashboard.git#readme
*/
/* INCLUDE: "includes//common.jsx" */
const REPL_TREASURY_CONTRACT = "treasurydevhub.near";
const REPL_TREASURY = "megha19.near";
//   "dashboard.treasury-devdao.near";
const REPL_DEVHUB = "devhub.near";
// devhub.near;
const REPL_PROPOSAL_CONTRACT =
  "713ed9aef61d14ce3dfeb3f5a55dfdf16c407280267e8de96bce0953d0e1af8c";
const REPL_NEAR = "near";
/* END_INCLUDE: "includes//common.jsx" */

// const { normalize } = VM.require(`${REPL_DEVHUB}/widget/core.lib.stringUtils`);
const { href } = VM.require(`${REPL_DEVHUB}/widget/core.lib.url`);

href || (href = () => {});

// normalize || (normalize = () => {});
const normalize = (text) =>
  text
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");
const { tab, ...passProps } = props;

const NavUnderline = styled.ul`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #939597;
  }

  a.active {
    font-weight: bolder;
    color: #151515;
    border-bottom: 3px solid black;
  }

  a:hover {
    color: #151515;
  }

  .nav-item {
    font-size: 15px;
  }
`;

const tabs = [
  {
    title: "Create Payment Request",
    view: "CreatePaymentRequest",
    props: {},
  },
  {
    title: "Transaction History",
    view: "History",
    props: {
      title: "Transaction History",
    },
  },
  {
    title: "Manage Recipients",
    view: "ManageRecipients",
    props: {},
  },
  // hiding these tabs for time being
  // {
  //   title: "Staking",
  //   view: "Staking",
  //   props: {},
  // },
  // {
  //   title: "Accounting",
  //   view: "Accounting",
  //   props: {},
  // },
];

function findTab(tabTitle) {
  return tabs.find((it) => normalize(it.title) === tabTitle);
}

const defaultTab = tabs[0].title;
let currentTab = findTab(tab ?? normalize(defaultTab));
// in case tab is not provided, or tab is of trustees page
if (!currentTab) {
  currentTab = findTab(normalize(defaultTab));
}

return (
  <div>
    <NavUnderline className="nav gap-4 my-4">
      {tabs.map(
        ({ title }) =>
          title && (
            <li className="nav-item" key={title}>
              <Link
                to={href({
                  widgetSrc: `${REPL_TREASURY}/widget/neardevhub-trustees.components.pages.app`,
                  params: {
                    accountType: "moderators",
                    tab: normalize(title),
                  },
                })}
                className={[
                  "d-inline-flex gap-2",
                  normalize(currentTab.title) === normalize(title)
                    ? "nav-link active"
                    : "nav-link",
                ].join(" ")}
              >
                <span>{title}</span>
              </Link>
            </li>
          )
      )}
    </NavUnderline>
    {currentTab && (
      <div className="w-100 h-100 mt-4" key={currentTab.title}>
        <Widget
          src={`${REPL_TREASURY}/widget/neardevhub-trustees.components.${
            currentTab.view === "History" ? "trustee" : "moderator"
          }.${currentTab.view}`}
          props={currentTab.props}
        />
      </div>
    )}
  </div>
);
