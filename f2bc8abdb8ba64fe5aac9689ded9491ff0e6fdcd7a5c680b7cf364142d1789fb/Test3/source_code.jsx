State.init({
  libsLoaded: false,
});

const widgets = {
  libNotifications: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/lib.notifications`,
};

function stateUpdate(obj) {
  State.update(obj);
}

const imports = { notifications: ["notify", "clg"] };

function onCommit() {
  State.update({ articleCommited: true });
}

function findLastArticle(articles) {
  return articles.find((article) => article.accountId === context.accountId);
}

const articles = Social.index("test_sayALotArticle_v0.0.2", "main", {
  order: "desc",
});

const lastArticleFromThisAuthor = findLastArticle(articles);

if (
  articles &&
  JSON.stringify(state.lastArticleFromThisAuthor) !==
    JSON.stringify(lastArticleFromThisAuthor)
) {
  console.log("Found last article");
  State.update({ lastArticleFromThisAuthor });
}

if (state.articleCommited) {
  console.log("Proceding to push notification");
  State.update({
    articleCreated: state.lastArticleFromThisAuthor,
    articleCommited: false,
  });
}

if (state.articleCreated) {
  console.log("call nofity(): ", state.notify);
  state.notify(
    "mention",
    `${context.accountId}`,
    `https://near.social/${context.accountId}/widget/SayALot?isTest=t&sharedBlockHeight=${articleCreated.blockHeight}`
  );
}

function makePost() {
  Social.set(
    {
      ["test_sayALotArticle_v0.0.2"]: {
        main: `{"title":"Test notification9","author":"${
          context.accountId
        }","lastEditor":"${
          context.accountId
        }","timeLastEdit":${Date.now()},"timeCreate":${Date.now()},"body":"Test","version":0,"navigation_id":null,"tags":{},"id":"${
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

State.update({ libsLoaded: true });

Object.keys(imports).forEach((library) => {
  imports[library].forEach((functionCalled) => {
    if (!state[functionCalled]) {
      State.update({ libsLoaded: false });
    }
  });
});

if (!state.libsLoaded) {
  return (
    <Widget
      src={`${widgets.libNotifications}`}
      props={{ stateUpdate, imports: imports["notifications"] }}
    />
  );
}

return <button onClick={makePost}>Make post + Notify mention</button>;
