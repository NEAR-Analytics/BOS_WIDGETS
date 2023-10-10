const { isTest, stateUpdate, libCalls } = props;

//TODO check if env is still needed since we are not using the whitelist anymore because of the human verification system

const prodAction = "sayALotArticle_v0.0.2";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "sayalot.near";
// const authorForWidget = "silkking.near";
const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.SBT`];

State.init({ libCalls: [] });

function libStateUpdate(obj) {
  State.update(obj);
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibCalls = [...state.libCalls];
  accountIds.forEach((accountId, index) => {
    const isCallPushed =
      newLibCalls.find((libCall) => {
        return (
          libCall.functionName === "isValidUser" &&
          libCall.props.accountId === accountId
        );
      }) !== undefined;
    const isCallReturned = state[`isValidUser-${accountId}`] !== undefined;

    if (isCallPushed || isCallReturned) {
      return;
    }

    newLibCalls.push({
      functionName: "isValidUser",
      key: `isValidUser-${accountId}`,
      props: {
        accountId,
        sbtsNames,
      },
    });
  });
  State.update({ libCalls: newLibCalls });
}

function callLibs(srcArray, stateUpdate, libCalls) {
  return (
    <>
      {srcArray.map((src) => {
        return (
          <Widget
            src={src}
            props={{
              isTest,
              stateUpdate,
              libCalls,
            }}
          />
        );
      })}
    </>
  );
}

// const initLibCalls = [
//   {
//     functionName: "get1",
//     key: "test",
//     props: {},
//   },
//   {
//     functionName: "getWritersWhitelist",
//     key: "writersWhitelist",
//     props: { env: "test" },
//   },
// ];

function canUserCreateArticle(props) {
  const { env, accountId, sbtsNames } = props;

  setAreValidUsers([accountId], sbtsNames);
  const result = state[`isValidUser-${accountId}`];

  resultLibCalls = resultLibCalls.filter((call) => {
    const discardCondition =
      call.functionName === "canUserCreateArticle" && result !== undefined;
    return !discardCondition;
  });

  return result;

  // return getWritersWhitelist(env).includes(accountId);
}

function canUserEditArticle(props) {
  const { article } = props;

  return article.author === context.accountId;
}

function createArticle(props) {
  const { article, onCommit, onCancel } = props;

  saveHandler(article, onCommit, onCancel);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "createArticle";
  });

  return article;
}

function composeData(article) {
  let data;
  data = {
    [action]: {
      main: JSON.stringify(article),
    },
    index: {
      [action]: JSON.stringify({
        key: "main",
        value: {
          type: "md",
          id: article.id ?? `${context.accountId}-${Date.now()}`,
        },
      }),
    },
  };

  // if (tagsArray.length) {
  //   data.index.tag = JSON.stringify(
  //     tagsArray.map((tag) => ({
  //       key: tag,
  //       value: item,
  //     }))
  //   );
  // }

  return data;
}

const saveHandler = (article, onCommit, onCancel) => {
  if (article.title && article.body) {
    const newData = composeData(article);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
    // onCancel: () => {
    //   State.update({ saving: false });
    // },
  }
};

function getArticlesIndexes() {
  return Social.index(action, "main", {
    order: "desc",
    subscribe: true,
  });
}

function getArticleBlackListByBlockHeight() {
  return [
    91092435, 91092174, 91051228, 91092223, 91051203, 98372095, 96414482,
    96412953,
  ];
}

function getArticleBlackListByRealArticleId() {
  return [
    "blaze.near-1690410074090",
    "blaze.near-1690409577184",
    "blaze.near-1690803928696",
    "blaze.near-1690803872147",
    "blaze.near-1690574978421",
    "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb-1691703303485",
    "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb-1691702619510",
    "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb-1691702487944",
    "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb-1691707918243",
    "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb-1691707889297",
  ];
}

function filterInvalidArticlesIndexes(env, articlesIndexes) {
  return (
    articlesIndexes
      .filter((articleIndex) => articleIndex.value.id) // Has id
      .filter(
        (articleIndex) =>
          articleIndex.value.id.split("-")[0] === articleIndex.accountId
      ) // id begins with same accountId as index object
      // .filter((articleIndex) =>
      //   getWritersWhitelist(env).includes(articleIndex.accountId)
      // ) // Account is in whitelist
      .filter(
        (articleIndex) =>
          !getArticleBlackListByBlockHeight().includes(articleIndex.blockHeight) // Article is not in blacklist
      )
      .filter(
        (articleIndex) =>
          !getArticleBlackListByRealArticleId().includes(articleIndex.value.id) // Article is not in blacklist
      )
  );
}

function getLatestEdits(newFormatArticlesIndexes) {
  return newFormatArticlesIndexes.filter((articleIndex) => {
    const latestEditForThisArticle = newFormatArticlesIndexes.find(
      (newArticleData) => newArticleData.value.id === articleIndex.value.id
    );
    return (
      JSON.stringify(articleIndex) === JSON.stringify(latestEditForThisArticle)
    );
  });
}

function getArticle(articleIndex) {
  const article = Social.get(
    `${articleIndex.accountId}/${action}/main`,
    articleIndex.blockHeight
  );

  let articleParsed = undefined;
  if (article) {
    articleParsed = JSON.parse(article);
    articleParsed.blockHeight = articleIndex.blockHeight;
    articleParsed.id = articleIndex.value.id;
  }

  if (articleParsed) {
    return articleParsed;
  }
}

function getOldArticleBasicDataArray(env) {
  if (env === "test") {
    return [
      {
        accountId:
          "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
        blockHeight: 97325392,
      },
      {
        accountId:
          "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
        blockHeight: 97317287,
      },
      { accountId: "ayelen.near", blockHeight: 96927579 },
      { accountId: "kenrou-it.near", blockHeight: 96924422 },
      {
        accountId:
          "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
        blockHeight: 96879470,
      },
      {
        accountId:
          "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
        blockHeight: 96878182,
      },
      {
        accountId:
          "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
        blockHeight: 96643643,
      },
      { accountId: "silkking.near", blockHeight: 96491128 },
    ];
  } else {
    return [
      { accountId: "ozymandius.near", blockHeight: 97329049 },
      { accountId: "fiftycent.near", blockHeight: 97322138 },
      { accountId: "blaze.near", blockHeight: 97255023 },
      { accountId: "jlw.near", blockHeight: 97250015 },
      { accountId: "kazanderdad.near", blockHeight: 96692435 },
      // { accountId: "blaze.near", blockHeight: 96414482 },
      // { accountId: "blaze.near", blockHeight: 96412953 },
      { accountId: "sarahkornfeld.near", blockHeight: 96402919 },
      { accountId: "sarahkornfeld.near", blockHeight: 96402476 },
      { accountId: "sarahkornfeld.near", blockHeight: 96402330 },
      { accountId: "sarahkornfeld.near", blockHeight: 96401880 },
      { accountId: "ozymandius.near", blockHeight: 95810612 },
      { accountId: "blaze.near", blockHeight: 95766756 },
      { accountId: "blaze.near", blockHeight: 95766700 },
      { accountId: "jlw.near", blockHeight: 95705034 },
      { accountId: "blaze.near", blockHeight: 95413943 },
      { accountId: "blaze.near", blockHeight: 94936576 },
      { accountId: "yuensid.near", blockHeight: 94866690 },
      { accountId: "sarahkornfeld.near", blockHeight: 94863580 },
      { accountId: "blaze.near", blockHeight: 94801223 },
      { accountId: "sarahkornfeld.near", blockHeight: 94344236 },
      { accountId: "sarahkornfeld.near", blockHeight: 94188387 },
      { accountId: "jlw.near", blockHeight: 93986868 },
      { accountId: "blaze.near", blockHeight: 92999498 },
    ];
  }
}

function getNewFormatValidArticles(env) {
  const articlesIndexes = getArticlesIndexes();

  const validArticlesIndexes = filterInvalidArticlesIndexes(
    env,
    articlesIndexes
  );

  const validLatestEdits = getLatestEdits(validArticlesIndexes);

  return validLatestEdits.map(getArticle);
}

function getOldFormatArticles(env) {
  const oldBasicDataArray = getOldArticleBasicDataArray(env);
  return oldBasicDataArray.map(getArticle);
}

function getLastEditArticles(props) {
  const { env, sbtsNames } = props;
  const oldFormatArticles = getOldFormatArticles(env);
  const newFormatArticles = getNewFormatValidArticles(env);

  const finalOldFormatArticles = oldFormatArticles.filter(
    (oldFormatArticle) => {
      return !newFormatArticles.find(
        (newFormatArticle) => newFormatArticle.title === oldFormatArticle.title
      );
    }
  );

  const lastEditionArticles = newFormatArticles.concat(finalOldFormatArticles);

  const validFormatLastEditionArticles =
    convertArticlesTagsToValidFormat(lastEditionArticles);

  const validFormatLastEditionArticlesAuthors =
    validFormatLastEditionArticles.map((article) => {
      return article.author;
    });

  setAreValidUsers(validFormatLastEditionArticlesAuthors, sbtsNames);
  const validAuthors = validFormatLastEditionArticlesAuthors.filter(
    (author) => {
      return state[`isValidUser-${author}`] === true;
    }
  );

  resultLibCalls = resultLibCalls.filter((call) => {
    const discardCondition =
      call.functionName === "getLastEditArticles" &&
      state[`isValidUser-${call.props.accountId}`] !== undefined;
    return !discardCondition;
  });

  const validFilteredArticles = validFormatLastEditionArticles.filter(
    (article) => {
      if (!article.sbts) return false;
      return (
        sbtsNames.filter((sbtName) => {
          return article.sbts.indexOf(sbtName) !== -1;
        }).length > 0
      );
    }
  );

  const finalArticles = filterValidArticles(
    validFilteredArticles,
    validAuthors
  );

  return finalArticles;
}

function convertArticlesTagsToValidFormat(articlesArray) {
  let validFormatArticlesArray = [];
  articlesArray.map((article) => {
    if (article) {
      let tags = article.tags;

      if (tags && !tags.length && tags + "" != "0") {
        tags = Object.keys(tags);
      } else if (tags === undefined) {
        tags = [];
      }
      article.tags = tags;

      validFormatArticlesArray.push(article);
    }
  });
  return validFormatArticlesArray;
}

function filterValidator(articles, validAuthors) {
  return articles.filter((article) => {
    return validAuthors.includes(article.author);
  });
}

function filterValidArticles(articles, validAuthors) {
  let filteredArticles = filterValidator(
    filteredArticles ?? articles,
    validAuthors
  );

  return filteredArticles;
}

function getComments(args) {
  const { id } = args;
  const key = id;
  return Social.index(action, key);
}

function setComment(args) {
  const { id, text, previousCommentId } = args;
  const data = {
    index: {
      [action]: JSON.stringify({
        key: id,
        value: {
          text,
          id: `${id}-${Date.now()}`,
          previousCommentId,
        },
      }),
    },
  };
  Social.set(data);

  resultLibCalls = resultLibCalls.filter((call) => {
    return call.functionName !== "setComment";
  });

  return text;
}

function libCall(call) {
  if (call.functionName === "canUserCreateArticle") {
    return canUserCreateArticle(call.props);
  } else if (call.functionName === "createArticle") {
    return createArticle(call.props);
  } else if (call.functionName === "canUserEditArticle") {
    return canUserEditArticle(call.props);
  } else if (call.functionName === "getLastEditArticles") {
    return getLastEditArticles(call.props);
  }
}

let resultLibCalls = [];

if (libCalls && libCalls.length > 0) {
  const updateObj = {};
  resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <>{callLibs(libSrcArray, libStateUpdate, state.libCalls)}</>;
