State.init({
  sidebarExpanded: false,
  img_logo:
    "https://ipfs.near.social/ipfs/bafkreiaeygg2shnl5lfm3gbgvvs5bz5vdriko4onrqt7twxjvbyvzrcnwa",
  search: "",
  isTyping: false,
  general_active: true,
  publisher_active: false,
  advertiser_active: false,
});
const hasSidebar = props.hasSidebar ?? true;
let { page } = props;
if (!page) {
  page = "home";
}
const currentLink = "#/ciuz.near/widget/home";

const Header = styled.div`
  border-bottom: 1px solid #e5e5e5;

  .search_box {
    display: flex;
  }

  .sidebar-toggle {
    display: none;
  }
  @media (max-width: 768px) {
    .sidebar-toggle {
      display: block;
    }
    .search_box {
      display: none;
    }
  }
`;

const Sidebar = styled.div`
  height: 100%;
  transition: all 0.5s ease-in-out;
  max-width: 300px;
  background: #fff;
  border-right: 1px solid #e5e5e5;

  &.collapsed {
    padding-right: 26px;
    max-width: 94px;
  }

  @media (max-width: 768px) {
    position: fixed !important;
    top: 0;
    bottom: 0;
    z-index: 10000;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &.collapsed {
      left: -400px;
    }
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    width: 100%;
    max-width: 240px;
  }

  .group {
    width: 100%;
  }

  li {
    background: #fff;
    cursor: pointer;
    border-radius: 8px;
    width: 100%;
    transition: all 100ms ease-in-out;

    div,
    a {
      padding: 8px 26px;
      color: #000 !important;
      text-decoration: none;
      font-weight: 600;
      font-size: 15px;
      letter-spacing: 0;
      display: flex;
      gap: 12px;
      align-items: center;
    }

    i {
      font-size: 19px;
    }
  }

  li:hover {
    background-color: #6149cd;

    * {
      color: #fff !important;
    }
  }

  li:active {
    background-color: #6149cd;
    * {
      color: #fff !important;
    }
  }

  li.active {
    background-color: #6149cd;

    * {
      color: #fff !important;
    }
  }

  li.title:hover{
    background-color: #fff;
    * {
      color: #000000 !important;
    }
  }

  li.title:active{
    background-color: #00000;
    * {
      color: #6149cd !important;
    }
  }

  &.collapsed {
    li {
      width: 100% !important;

      div,
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        text-align: center;
        gap: 4px;
      }
    }

    li .title {
      display: none;
    }

    .group {
      li:not(:first-child) {
        display: none;
      }
    }
  }
`;

const Toggle = styled.div`
  position: absolute;
  top: 10px;
  right: -20px;
  z-index: 10;
  height: 40px;
  width: 40px;
  background: #6149cd;
  color: #fff;
  border-radius: 6px;
  display: grid;
  place-items: center;

  @media (max-width: 768px) {
    bottom: 100px;
    top: auto;
  }
`;

const MobileToggle = styled.div`
  height: 40px;
  width: 40px;
  background: #6149cd;
  color: #fff;
  border-radius: 6px;
  display: grid;
  place-items: center;
`;

if (page !== state.activePage) {
  State.update({
    activePage: page,
  });
}

const router = {
  params: { page, tab },
  navigate: (newParams) => {
    router.params = {
      ...newParams,
    };
    State.update({
      activePage: router.params.page,
      activeTab: router.params.tab,
    });
  },
};

page = state.activePage;

const list_sidebar = [
  {
    id: 1,
    label: "General",
    code: "general",
    children: [
      {
        title: "Home",
        icon: "bi bi-house",
        href: "/",
        active: page === "home",
        onClick: () => router.navigate({ page: "home" }),
        widgetName: "",
        defaultProps: {},
      },
      {
        title: "Payment",
        icon: "bi bi-cash",
        href: "/payment",
        active: page === "payment",
        onClick: () => router.navigate({ page: "payment" }),
        widgetName: "",
        defaultProps: {},
      },
      {
        title: "Campaigns",
        icon: "bi bi-rocket-takeoff",
        href: "/campaigns",
        active: page === "campaigns",
        onClick: () => router.navigate({ page: "campaigns" }),
        widgetName: "",
        defaultProps: {},
      },
      {
        title: "Analytics",
        icon: "bi bi-graph-up",
        href: "/analytics",
        active: page === "analytics",
        onClick: () => router.navigate({ page: "analytics" }),
        widgetName: "",
        defaultProps: {},
      },
      {
        title: "Settings",
        icon: "bi bi-gear",
        href: "/settings",
        active: page === "settings",
        onClick: () => router.navigate({ page: "settings" }),
        widgetName: "",
        defaultProps: {},
      },
    ],
  },
  {
    id: 2,
    label: "Publisher View",
    code: "publisher",
    children: [],
  },
  {
    id: 3,
    label: "Advertiser View",
    code: "advertiser",
    children: [],
  },
];

return (
  <>
    <Header className="d-flex justify-content-between align-items-center py-3 px-md-3 m-0 flex-row">
      <MobileToggle
        className="sidebar-toggle btn btn-outline-light"
        onClick={() =>
          State.update({ sidebarExpanded: !state.sidebarExpanded })
        }
      >
        <i className="bi bi-list"></i>
      </MobileToggle>
      <a href="#">
        <img src={state.img_logo} alt="logo" />
      </a>
      <div className="search_box ">
        <Widget
          key="search"
          src="nearui.near/widget/Input.ExperimentalText"
          props={{
            placeholder: "Search ...",
            type: "search",
            size: "md",
            icon: (
              <i
                className="bi bi-search"
                style={{
                  color: "#4498E0",
                }}
              />
            ),
            onChange: (v) => {
              State.update({
                search: v,
                isTyping: true,
              });
              setTimeout(() => {
                State.update({
                  isTyping: false,
                });
              }, 1500);
            },
            value: undefined,
            inputProps: {
              autoFocus: true,
            },
            useTimeout: 600,
          }}
        />
        <button className="block position-relative border border-0 mx-2">
          <i className="bi bi-bell">
            {props.notifications && props.notifications.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "10px" }}
              >
                {props.notifications.length}
                <span className="visually-hidden">unread messages</span>
              </span>
            )}
          </i>
        </button>
      </div>

      <span
        style={{
          border: context.accountId ? "1px solid #4498E0" : "1px solid #E5E5E5",
          borderRadius: "400px",
          padding: context.accountId
            ? "8px 20px 8px 14px"
            : "8px 20px 8px 20px",
          background: context.accountId ? "rgba(236, 245, 252, 0.40)" : "#fff",
        }}
      >
        {context.accountId ? (
          <Widget
            src="nearui.near/widget/Element.User"
            props={{
              accountId: context.accountId,
            }}
          />
        ) : (
          "Not connected"
        )}
      </span>
    </Header>
    <Sidebar
      className={`position-relative col-sm ${
        !state.sidebarExpanded && "collapsed"
      }`}
    >
      <Toggle
        role="button"
        onClick={() =>
          State.update({ sidebarExpanded: !state.sidebarExpanded })
        }
      >
        {state.sidebarExpanded ? (
          <i className="bi bi-chevron-left"></i>
        ) : (
          <i className="bi bi-chevron-right"></i>
        )}
      </Toggle>
      <ul className="pt-4">
        {list_sidebar.map((item, i) => {
          return (
            <div key={i} className="">
              <li className="title">
                <div
                  className="d-flex justify-content-between"
                  onClick={() => {
                    if (item.id === 1) {
                      State.update({
                        general_active: !state.general_active,
                      });
                    }
                    if (item.id === 2) {
                      State.update({
                        publisher_active: !state.publisher_active,
                      });
                    }
                    if (item.id === 3) {
                      State.update({
                        advertiser_active: !state.advertiser_active,
                      });
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {state[`${item.code}_active`] == true ? (
                    <i className="bi bi-chevron-up"></i>
                  ) : (
                    <i className="bi bi-chevron-down"></i>
                  )}
                </div>
              </li>
              <ul>
                {state[`${item.code}_active`] == true &&
                  item.children.map((subItem, j) => {
                    if (subItem.hidden) return null;
                    return (
                      <li
                        key={j}
                        className={[subItem.active && "active", "ms-auto"].join(
                          " "
                        )}
                        onClick={subItem.onClick}
                        style={{
                          width: "85%",
                        }}
                      >
                        <a href={subItem.href}>
                          <i className={subItem.icon}></i>
                          <div className="title">{subItem.title}</div>
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          );
        })}
      </ul>
    </Sidebar>
  </>
);
