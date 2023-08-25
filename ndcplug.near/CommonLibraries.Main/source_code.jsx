// add better icons and actually populate components
// pass in props so can keep track of state
// make it so on click is home tag
// add number of stars
// add hover effect
// make every header also a filter
// add selecte tab styling
// search keeps refreshing
// fix search
// add leaderboard

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 12px;
  justify-content: center;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 23px;
      .join-button-active {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #000000;
    border: 1px solid #D7DBDF;
    color: #ffffff;
    white-space: nowrap;

    i {
      display: inline-block;
      color: #ffffff;
    }
  }
    .join-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #FBFCFD;
    border: 1px solid #D7DBDF;
    color: ${props.primary ? "#006ADC" : "#11181C"} !important;
    white-space: nowrap;

    &:hover,
    &:focus {
      background: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    i {
      display: inline-block;
      color: #7E868C;
    }
  }
`;

const ownerId = "manzanal.near";

const componentsURL = "https://raw.githubusercontent.com/NEARBuilders/BOSLibraries/main/library.json";
function loadComponents() {
  const res = fetch(componentsURL);
  return res.body && JSON.parse(res.body);
}

const componentList = loadComponents();
if (!componentList) {
  return "⧗ Loading Components...";
}
const filterTag = props.catTab ?? "home";
const debug = props.debug ?? false;
const id = props.id ?? "";

State.init({
  catTab: props.catTab ?? "home",
  id: id,
  selectedTab: props.catTab || "home",
  accountUrl: `#/ndcplug.near/widget/BOSHACKS.Index?tab=resources&catTab=${state.selectedTab}`,
});
const regAccountUrl = `#/ndcplug.near/widget/BOSHACKS.Index?tab=resources&catTab=`;
const updateTab = (tab) => {
  State.update({
    selectedTab: tab,
    accountUrl: `#/ndcplug.near/widget/BOSHACKS.Index?tab=resources&catTab=${tab}`,
  });
  //   window.location.href = `${state.accountUrl}`;
  console.log("Tab is: " + tab);
  console.log("SelectedTab is: " + state.selectedTab);
  console.log("AccountURL: " + state.accountUrl);
};

if (props.catTab && props.catTab !== state.selectedTab) {
  State.update({
    selectedTab: props.catTab,
  });
}

const searchComponents = () => {
  return (
    <div class="mb-4">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            debug: debug,
            // filterTag: state.selectedTab,
            placeholder: "🔍 Search for common components",
            limit: 24,
            onChange: ({ result }) => {
              State.update({ components: result });
            },
          }}
        />
      </div>
      {state.components && (
        <div className="mb-2">
          {state.components.map((comp, i) => (
            <div class="mb-2" key={i}>
              {false && (
                <Widget
                  src="mob.near/widget/WidgetMetadata"
                  props={{
                    accountId: comp.accountId,
                    widgetName: comp.widgetName,
                    expanded: true,
                  }}
                />
              )}
              <Widget
                src="ndcplug.near/widget/CommonLibraries.Component.Like"
                props={{
                  widgetPath: `${comp.accountId}/widget/${comp.widgetName}`,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = componentList.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div
        class="text fs-5 text-muted mb-1"
        href={`${state.accountUrl}`}
        target="_blank"
        selected={state.selectedTab === item.id}
        id={item.id}
      >
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="w-100 mb-2">
              {false && (
                <Widget
                  key={i}
                  src="mob.near/widget/WidgetMetadata"
                  props={{
                    accountId: comp.accountId,
                    widgetName: comp.widgetName,
                    expanded: false,
                  }}
                />
              )}
              <Widget
                key={i}
                src="ndcplug.near/widget/CommonLibraries.Component.Like"
                props={{
                  widgetPath: `${comp.accountId}/widget/${comp.widgetName}`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const renderHome = () => {
  return (
    <>
      <div class="mt-2">
        <h4>Libraries</h4>
        <p class="text text-muted ">
          A curated list of common librairies grouped by categories.
        </p>
        <div className="mb-3">
          {componentList && (
            <div className="mb-6">
              {state.selectedTab && state.selectedTab !== "home" ? (
                <> {true && renderCategory(props.catTab)}</>
              ) : (
                <>{componentList.map((cat, i) => renderCategory(cat.id))}</>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const onSelect = (selection) => {
  State.update({ catTab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  //   searchComponents: searchComponents(),
  category: renderCategory(), // should pass something here
}[state.selectedTab];

const navItems = componentList.map((i) => ({
  category: i.category,
  icon: i.icon,
  id: i.id,
}));
return (
  <>
    <Card>
      <div class="row">
        <div class="col-md-3">
          {false && (
            <Widget
              src={`ndcplug.near/widget/CommonLibraries.Navbar`}
              props={{
                catTab: state.catTab,
                onSelect,
                navItems: componentList.map((i) => ({
                  category: i.category,
                  icon: i.icon,
                  id: i.id,
                })),
              }}
            />
          )}
          <div className="d-flex flex-column">
            <h4 className="fs-4 text-nowrap d-flex flex-row align-items-center">
              <span>📚 Libraries</span>
            </h4>
            <button className="nav-link mt-2" onClick={() => updateTab("home")}>
              <i className="bi-house" />
              <span>Home</span>
            </button>
            {false && (
              <button
                className="nav-link mt-2"
                onClick={() => updateTab("searchComponents")}
              >
                <i className="bi-search" />
                <span>Search</span>
              </button>
            )}

            <hr className="border-2" />
            {navItems.map((item) => {
              // console.log(item);
              return (
                <a
                  className={`join-button${
                    item.id === props.catTab ? "-active" : ""
                  }`}
                  onClick={() => updateTab(item.id)}
                  href={`${regAccountUrl}${item.id}`}
                >
                  {" "}
                  <i className={item.icon} /> <span>{item.category}</span>{" "}
                </a>
              );
            })}
          </div>
          <hr className="border-2" />
        </div>
        <div class="col-md-9">
          {" "}
          <h2>Component Libraries</h2>
          <p class="text text-muted">Libraries for building a better BOS.</p>
          {searchComponents()}
          {renderHome()}
          {false && renderContent}
        </div>
      </div>
    </Card>
  </>
);
