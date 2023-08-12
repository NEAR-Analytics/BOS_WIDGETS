const ownerId = "rc-dao.near";
const curatedComps = [
  {
    category: "Updates",
    id: "updates",
    icon: "bi-newspaper",
    components: [
      {
        accountId: "rc-dao.near",
        widgetName: "com.posts",
      },
    ],
  },
  {
    category: "Presentation",
    icon: "bi-easel2",
    id: "presentation",
    components: [
      {
        accountId: "scottie.near",
        widgetName: "Slides",
      },
    ],
  },
  {
    category: "Widgets",
    id: "widgets",
    icon: "bi-columns-gap",
    components: [
      { accountId: "hack.near", widgetName: "create.page" },
      {
        accountId: "nearvietnamhub.near",
        widgetName: "NEARAPAC",
      },
      { accountId: "nearinturkiye.near", widgetName: "quizTurkiye" },
      {
        accountId: "nearukraineguild.near",
        widgetName: "IAH-account-verifier",
      },
      {
        accountId: "nearhausa.near",
        widgetName: "PrayerTimes",
      },
      {
        accountId: "coineasydao.near",
        widgetName: "GM",
      },
      {
        accountId: "nycdao.near",
        widgetName: "NYC.Social",
      },
    ],
  },
  {
    category: "Settings",
    id: "settings",
    icon: "bi-gear",
    components: [
      {
        accountId: "james.near",
        widgetName: "com.settings",
      },
    ],
  },
];
const filterTag = props.commonComponentTag ?? "edu";
const debug = props.debug ?? false;

// const searchComponents = () => {
//   return (
//     <div className="mb-3">
//       <div className="mb-2">
//         <Widget
//           src="mob.near/widget/ComponentSearch"
//           props={{
//             boostedTag: "edu",
//             placeholder: "🔍 Search Applications",
//             limit: 10,
//             onChange: ({ result }) => {
//               State.update({ apps: result });
//             },
//           }}
//         />
//       </div>
//       {state.apps && (
//         <div className="mb-2">
//           {state.apps.map((app, i) => (
//             <div key={i}>
//               <Widget
//                 src="mob.near/widget/ComponentSearch.Item"
//                 props={{
//                   link: `#/${app.widgetSrc}`,
//                   accountId: app.accountId,
//                   widgetName: app.widgetName,
//                   onHide: () => State.update({ apps: null }),
//                   extraButtons: ({ widgetPath }) => (
//                     <a
//                       target="_blank"
//                       className="btn btn-outline-secondary"
//                       href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
//                     >
//                       Source
//                     </a>
//                   ),
//                 }}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

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
                src="james.near/widget/docs.card"
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
      <div class="mt-2">
        <h4>Resources</h4>
        <p class="text text-muted ">
          Learn how and why to participate in the open web movement, and
          coordinate with everyone to build a better future together.
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
  category: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src={`rc-dao.near/widget/com.navbar`}
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
      </div>
      <div class="col-md-9">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <div className="m-1">
            <h2>
              <b>Discover</b>
            </h2>
            <p class="text text-muted">Find pertinent information here!</p>
          </div>
          <div className="m-1">
            <Widget
              src="james.near/widget/dao.profile.card"
              props={{ accountId: "rc-dao.sputnik-dao.near" }}
            />
          </div>
        </div>
        {renderContent}
      </div>
    </div>
  </>
);
