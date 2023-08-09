const { isTest, stateUpdate, libCalls } = props;

const prodAction = "sayALotArticle";
const testAction = `test_${prodAction}`;
const action = isTest ? testAction : prodAction;

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

function getWritersWhitelist(env) {
  if (env === "test") {
    return [
      "silkking.near",
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      "blaze.near",
      "ayelen.near",
      "kenrou-it.near",
    ];
  } else {
    return [
      "neardigitalcollective.near",
      "blaze.near",
      "jlw.near",
      "kazanderdad.near",
      "joep.near",
      "sarahkornfeld.near",
      "yuensid.near",
      "shubham007.near",
      "fiftycent.near",
      "ozymandius.near",
      "chloe.near",
    ];
  }
}

function canUserCreateArticle(props) {
  const { env, accountId } = props;
  return getWritersWhitelist(env).includes(accountId);
}

function canUserEditArticle(props) {
  const { article, accountId } = props;
  return false;
}

function createArticle(props) {
  const { accountId, article } = props;
}

// const args = {
//     articleId: editArticleData.articleId ?? state.articleId,
//     author: editArticleData.articleId ?? accountId,
//     lastEditor: accountId,
//     timeLastEdit: Date.now(),
//     timeCreate: editArticleData.timeCreate ?? Date.now(),
//     body: state.articleBody,
//     version: editArticleData ? editArticleData.version + 1 : 0,
//     navigation_id: null,
//     tags: tagsArray,
//     realArticleId:
//       editArticleData.realArticleId ?? ${accountId}-${Date.now()},
//   };

function getArticlesIndexes(props) {
  const { accountId } = props;
  return Social.index(action, "main", {
    order: "desc",
    accountId,
  });
}

function getArticleBlackList() {
  return [91092435, 91092174, 91051228, 91092223, 91051203, 98372095];
}

function filterInvalidArticlesIndexes(props, articlesIndexes) {
  const { env } = props;

  return articlesIndexes
    .filter((articleIndex) => articleIndex.value.id) // Has realArticleId
    .filter(
      (articleIndex) =>
        articleIndex.value.id.split("-")[0] === articleIndex.accountId
    ) // realArticleId begins with same accountId as index object
    .filter((articleIndex) =>
      getWritersWhitelist(env).includes(articleIndex.accountId)
    ) // Account is in whitelist
    .filter(
      (articleIndex) =>
        !getArticleBlackList().includes(articleIndex.blockHeight) // Article is not in blacklist
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
    articleParsed.realArticleId = articleIndex.value.id;
  }

  return articleParsed;
}

function getOldArticleBasicDataArray(props) {
  const { env } = props;
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
      { accountId: "blaze.near", blockHeight: 96414482 },
      { accountId: "blaze.near", blockHeight: 96412953 },
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

function getNewFormatValidArticles(props) {
  const articlesIndexes = getArticlesIndexes(props);
  const validArticlesIndexes = filterInvalidArticlesIndexes(
    props,
    articlesIndexes
  );
  const validLatestEdits = getLatestEdits(validArticlesIndexes);
  return validLatestEdits.map(getArticle);
}

function getOldFormatArticles(props) {
  const oldBasicDataArray = getOldArticleBasicDataArray(props);
  return oldBasicDataArray.map(getArticle);
}

function getLastEditArticles(props) {
  const oldFormatArticles = getOldFormatArticles(props);
  const newFormatArticles = getNewFormatValidArticles(props);

  const finalOldFormatArticles = oldFormatArticles.filter(
    (oldFormatArticle) => {
      return !newFormatArticles.find(
        (newFormatArticle) =>
          newFormatArticle.articleId === oldFormatArticle.articleId
      );
    }
  );

  const lastEditionArticles = newFormatArticles.concat(finalOldFormatArticles);
  const filteredArticles = filterArticles(props, lastEditionArticles);

  return filteredArticles;
}

function filterArticlesByTag(props, articles) {
  const { tag } = props;
  if (!tag) return articles;

  return articles.filter((article) => {
    return article.tags.includes(tag);
  });
}

function filterArticles(props, articles) {
  const byTag = filterArticlesByTag(props, articles);

  return byTag;
}

function libCall(call) {
  if (call.functionName === "canUserCreateArticle") {
    return canUserCreateArticle(call.props);
  } else if (call.functionName === "canUserEditArticle") {
    return canUserEditArticle(call.props);
  } else if (call.functionName === "getLastEditArticles") {
    return getLastEditArticles(call.props);
  }
}

function getComments(args) {
  const { realArticleId } = args;
  const key = realArticleId;
  return Social.index(action, key);
}

function setComment(args) {
  const { realArticleId, text, previousCommentId } = args;
  const data = {
    index: {
      [action]: JSON.stringify({
        key: realArticleId,
        value: {
          text,
          id: `${realArticleId}-${Date.now()}`,
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

if (libCalls && libCalls.length > 0) {
  const updateObj = {};
  const resultLibCalls = [...libCalls];
  libCalls.forEach((call) => {
    updateObj[call.key] = libCall(call);
  });

  updateObj.libCalls = resultLibCalls;
  stateUpdate(updateObj);
}

return <></>;
