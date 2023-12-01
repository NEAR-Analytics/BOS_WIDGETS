State.init({
  libsLoaded: false,
});

const widgets = {
  libNotifications: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/lib.notifications`,
};

const imports = { notifications: ["notify", "clg"] };

function stateUpdate(obj) {
  State.update(obj);
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
  State.update({ lastArticleFromThisAuthor });
}

if (state.articleCommited) {
  State.update({
    articleCreated: state.lastArticleFromThisAuthor,
    articleCommited: false,
  });
}

console.log("Danito", state, state.articleCreated);
state.clg("Danito2: ");
console.log("state.notify: ", state.notify);

if (state.articleCreated === undefined) {
  console.log("state.notify: ", state.notify);
  console.log("pepito", state);
  state.clg("pepito2: ");
  state.notify(
    "mention",
    `${context.accountId}`,
    `https://near.social/${context.accountId}/widget/SayALot?isTest=t&sharedBlockHeight=${articleCreated.blockHeight}`
  );
  console.log("común");
}

function makePost() {
  Social.set(
    {
      ["test_sayALotArticle_v0.0.2"]: {
        main: `{"title":"Test with Dani","author":"${
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

return <button onClick={makePost}>Make post + Notify mention</button>;
