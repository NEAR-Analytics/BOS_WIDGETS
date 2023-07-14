const ownerId = "hack.near";
const curatedComps = [
  {
    category: "Challenges",
    id: "concepts",
    icon: "bi-mortarboard",
    components: [
      {
        accountId: "hack.near",
        widgetName: "quiz.bos",
      },
    ],
  },
  {
    category: "Examples",
    icon: "bi-easel2",
    id: "examples",
    components: [
      {
        accountId: "near",
        widgetName: "FeaturedComponents",
      },
      {
        accountId: "mintbase.near",
        widgetName: "nft-marketplace",
      },
      {
        accountId: "every.near",
        widgetName: "Create.Any",
      },
    ],
  },
  {
    category: "Templates",
    id: "templates",
    icon: "bi-columns-gap",
    components: [
      { accountId: "hack.near", widgetName: "community" },
      { accountId: "near", widgetName: "ProfilePage" },
      { accountId: "near", widgetName: "ActivityPage" },
      { accountId: "mob.near", widgetName: "ProfilePage" },
      { accountId: "mob.near", widgetName: "Welcome" },
    ],
  },
  {
    category: "Metadata",
    id: "metadata",
    icon: "bi-box-seam",
    components: [{ accountId: "mob.near", widgetName: "MetadataEditor" }],
  },
  {
    category: "Tools",
    id: "tools",
    icon: "bi-tools",
    components: [
      { accountId: "mob.near", widgetName: "Explorer" },
      { accountId: "efiz.near", widgetName: "Tree" },
      { accountId: "bozon.near", widgetName: "WidgetHistory" },
      { accountId: "mob.near", widgetName: "WidgetSource" },
    ],
  },
  {
    category: "Settings",
    id: "settings",
    icon: "bi-gear",
    components: [
      {
        accountId: "mob.near",
        widgetName: "MyPageEditor",
      },
      {
        accountId: "mob.near",
        widgetName: "MyPage",
      },
      {
        accountId: "mob.near",
        widgetName: "HomepageEditor",
      },
      {
        accountId: "mob.near",
        widgetName: "Homepage",
      },
      {
        accountId: "hack.near",
        widgetName: "DAO.Page.Editor",
      },
    ],
  },
];
const filterTag = props.commonComponentTag ?? "edu";
const debug = props.debug ?? false;

const searchComponents = () => {
  return (
    <div class="mb-4">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            debug: debug,
            filterTag: filterTag,
            placeholder: "🔍  explore available components",
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
              <Widget
                src="hack.near/widget/widget.inline"
                props={{
                  accountId: comp.accountId,
                  widgetPath: comp.widgetName,
                  expanded: false,
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
  const item = curatedComps.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.components.map((comp, i) => (
            <div class="mb-3">
              <Widget
                key={i}
                src="hack.near/widget/widget.inline"
                props={{
                  accountId: comp.accountId,
                  widgetPath: `${comp.accountId}/widget/${comp.widgetName}`,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
State.init({
  tab: "home",
  id: "",
});

const renderHome = () => {
  return (
    <>
      {searchComponents()}
      <div class="mt-2">
        <h4>Resources</h4>
        <p class="text text-muted ">
          Test your knowledge and skills to earn an official builder badge by
          passing various levels of quizzes and solving fun code puzzles.
        </p>
        <div className="mb-3">
          {curatedComps && (
            <div className="mb-3 m-3">
              {curatedComps.map((cat, i) => renderCategory(cat.id))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const onSelect = (selection) => {
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  searchComponents: searchComponents(),
  category: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src={`hack.near/widget/edu.navbar`}
          props={{
            tab: state.tab,
            onSelect,
            navItems: curatedComps.map((i) => ({
              category: i.category,
              icon: i.icon,
              id: i.id,
            })),
          }}
        />
        <hr className="border-2" />
        <Widget
          src="miraclx.near/widget/Attribution"
          props={{ authors: [ownerId], dep: true }}
        />
      </div>
      <div class="col-md-9">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <div className="m-1">
            <h2>
              <b>#edu</b>
            </h2>
          </div>
          <div className="m-1">
            <a
              href={`#/near/widget/ProfilePage?accountId=every.near`}
              class="text-muted"
            >
              <Widget
                src="mob.near/widget/Profile"
                props={{ accountId: "academy.near" }}
              />
            </a>
          </div>
        </div>
        <p class="text text-muted">
          Learn how to build on the blockchain operating system together!
        </p>
        {renderContent}
      </div>
    </div>
  </>
);
