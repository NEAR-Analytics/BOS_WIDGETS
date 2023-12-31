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
    if (!state[library][functionCalled]) {
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

if (state.articleCreated !== undefined) {
  console.log("inside if");
  state.notifications.notify(
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

Social.set(
  {
    post: {
      main: JSON.stringify({
        type: "md",
        text: `${notificationTypeText[notificationType]} ${redirectTo}`,
      }),
    },
    index: {
      notify: JSON.stringify({
        key: userToNotify,
        value: {
          type: "mention",
          item: {
            type: "social",
            path: `${context.accountId}/post/main`,
          },
        },
      }),
    },
  },
  {
    force: true,
    onCommit: () => {
      stateUpdate({ articleCreated: undefined });
    },
  }
);

return <button onClick={makePost}>Make post + Notify mention</button>;
