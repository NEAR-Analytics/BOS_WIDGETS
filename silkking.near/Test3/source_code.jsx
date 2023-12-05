State.init({ notifications: {} });

const widgets = {
  libNotifications: `${context.accountId}/widget/lib.notifications`,
};

const imports = { notifications: ["notify", "clg"] };

function stateUpdate(obj) {
  State.update(obj);
}

// let libsLoaded = true;
// Object.keys(imports).forEach((library) => {
//   imports[library].forEach((functionCalled) => {
//     if (!state[library][functionCalled]) {
//       libsLoaded = false;
//     }
//   });
// });

// if (!libsLoaded) {
//   return (
//     <Widget
//       src={`${widgets.libNotifications}`}
//       props={{
//         stateUpdate,
//         imports: imports["notifications"],
//         fatherState: state.notifications,
//       }}
//     />
//   );
// }

function onCommit() {
  State.update({ articleCommited: true, notifications: undefined });
}

function findLastArticle(articles) {
  return articles.find((article) => article.accountId === context.accountId);
}

const articles = Social.index("test_sayALotArticle_v0.0.2", "main", {
  order: "desc",
});

const lastArticleFromThisAuthor = articles && findLastArticle(articles);

if (
  articles &&
  JSON.stringify(state.lastArticleFromThisAuthor) !==
    JSON.stringify(lastArticleFromThisAuthor)
) {
  State.update({ lastArticleFromThisAuthor });
}

if (state.articleCommited) {
  State.update({
    articleCreated: state.lastArticleFromThisAuthor,
    articleCommited: false,
  });
}

console.log(state);

function notify(type, accountId, url) {
  console.log("Goodbai");
  if (state.notifications.notify) {
    console.log(1);
    state.notifications.notify(type, accountId, url);
  } else {
    console.log(2);
  }
}

let notifying = false;
if (state.articleCreated !== undefined && !notifying) {
  notifying = true;
  console.log("inside if", state);
  notify(
    "mention",
    `${context.accountId}`,
    `https://near.social/${context.accountId}/widget/SayALot?isTest=t&sharedBlockHeight=${articleCreated.blockHeight}`
  );
}

function makePost() {
  Social.set(
    {
      ["test_sayALotArticle_v0.0.2"]: {
        main: `{"title":"Test again TT.TT 3","author":"${
          context.accountId
        }","lastEditor":"${
          context.accountId
        }","timeLastEdit":${Date.now()},"timeCreate":${Date.now()},"body": "@${
          context.accountId
        }","version":0,"navigation_id":null,"tags":{},"id":"${
          context.accountId
        }-${Date.now()}","sbts":["public"]}`,
      },
      index: {
        ["test_sayALotArticle_v0.0.2"]: `{"key":"main","value":{"type":"md","id":"${
          context.accountId
        }-${Date.now()}"}}`,
      },
    },
    {
      force: true,
      onCommit,
      onCancel,
    }
  );
}

return (
  <div>
    {
      <Widget
        src={`${widgets.libNotifications}`}
        props={{
          stateUpdate,
          imports: imports["notifications"],
          fatherState: state.notifications,
        }}
      />
    }
    <button onClick={makePost}>Make post + Notify mention</button>
    <button onClick={notify}>Notify mention</button>
  </div>
);
