//CommunityVoice.lib.article

const {
  isTest,
  stateUpdate,
  functionsToCallByLibrary,
  callLibs,
  baseAction,
  widgets,
} = props;
const libName = "article"; // EDIT: set lib name
const functionsToCall = functionsToCallByLibrary[libName];

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
);
let resultFunctionsToCall = [];

const currentVersion = "0.0.1"; // EDIT: Set version

const prodAction = `${baseAction}_v${currentVersion}`;
const testAction = `test_${prodAction}`;
const versionsBaseActions = isTest ? `test_${baseAction}` : baseAction;
const action = isTest ? testAction : prodAction;
// START LIB CALLS SECTION
// interface FunctionCall {
//     functionName: string,
//     key: string, // The state of the caller will be updated with this string as a key
//     props: Record<string, any> // function parameters as object
// }

// type LibsCalls = Record<string, FunctionCall> // Key is lib name after lib.

const libSrcArray = [widgets.libSBT]; // string to lib widget // EDIT: set libs to call

const libCalls = {};
libSrcArray.forEach((libSrc) => {
  const libName = libSrc.split("lib.")[1];
  libCalls[libName] = [];
});

State.init({
  libCalls, // is a LibsCalls object
});
// END LIB CALLS SECTION

function log(message) {
  console.log(`lib.${libName}`, message);
}

function logError(message) {
  console.error(`lib.${libName}`, message);
}

function libStateUpdate(obj) {
  State.update(obj);
}

// START LIB FUNCTIONS: EDIT set functions you need
function canUserCreateArticle(props) {
  const { env, accountId, sbtsNames } = props;

  setAreValidUsers([accountId], sbtsNames);
  const result = state[`isValidUser-${accountId}`];
  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    const discardCondition =
      call.functionName === "canUserCreateArticle" && result !== undefined;
    return !discardCondition;
  });

  return result;
}

function setAreValidUsers(accountIds, sbtsNames) {
  const newLibsCalls = Object.assign({}, state.libCalls);
  if (!newLibsCalls.SBT) {
    logError("Key SBT is not set in lib.", libName);
  }

  accountIds.forEach((accountId) => {
    const isCallPushed =
      newLibsCalls.SBT.find((libCall) => {
        return (
          libCall.functionName === "isValidUser" &&
          libCall.props.accountId === accountId
        );
      }) !== undefined;
    const isCallReturned = state[`isValidUser-${accountId}`] !== undefined;

    if (isCallPushed || isCallReturned) {
      return;
    }

    newLibsCalls.SBT.push({
      functionName: "isValidUser",
      key: `isValidUser-${accountId}`,
      props: {
        accountId,
        sbtsNames,
      },
    });
  });
  State.update({ libCalls: newLibsCalls });
}

function createArticle(props) {
  const { article, onCommit, onCancel } = props;

  saveHandler(article, onCommit, onCancel);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    return call.functionName !== "createArticle";
  });

  return article;
}

const saveHandler = (article, onCommit, onCancel) => {
  if (article.title && article.body) {
    const newData = composeData(article);

    Social.set(newData, {
      force: true,
      onCommit,
      onCancel,
    });
  } else {
    logError("Article is missing title or body");
  }
};

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

  return data;
}

function getArticleBlackListByBlockHeight() {
  return [];
}

function getArticleBlackListByRealArticleId() {
  return [];
}

function canUserEditArticle(props) {
  const { article } = props;

  return article.author === context.accountId;
}

function getArticlesIndexes(action, subscribe) {
  return Social.index(action, "main", {
    order: "desc",
    subscribe,
    // limit: 10,
  });
}

function getArticlesNormalized(env) {
  const articlesByVersion = Object.keys(versions).map((version, index, arr) => {
    const action = versions[version].action;
    const subscribe = index + 1 === arr.length;
    const articlesIndexes = getArticlesIndexes(action, subscribe);
    if (!articlesIndexes) return [];
    const validArticlesIndexes = filterInvalidArticlesIndexes(
      env,
      articlesIndexes
    );

    const validLatestEdits = getLatestEdits(validArticlesIndexes);

    const articles = validLatestEdits
      .map((article) => {
        return getArticle(article, action);
      })
      .filter((article) => {
        return article !== undefined;
      });
    return articles;
  });

  return normalizeLibData(articlesByVersion);
}

function getArticle(articleIndex, action) {
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

function filterInvalidArticlesIndexes(env, articlesIndexes) {
  return articlesIndexes
    .filter((articleIndex) => articleIndex.value.id) // Has id
    .filter(
      (articleIndex) =>
        articleIndex.value.id.split("-")[0] === articleIndex.accountId
    ) // id begins with same accountId as index object
    .filter(
      (articleIndex) =>
        !getArticleBlackListByBlockHeight().includes(articleIndex.blockHeight) // Blockheight is not in blacklist
    )
    .filter(
      (articleIndex) =>
        !getArticleBlackListByRealArticleId().includes(articleIndex.value.id) // Article id is not in blacklist
    );
}

function getArticles(props) {
  const { env, sbtsNames } = props;
  // Call other libs
  const normArticles = getArticlesNormalized(env);

  // Keep last edit from every article
  const lastEditionArticles = normArticles.filter((article) => {
    return normArticles.find(
      (compArticle) => JSON.stringify(compArticle) === JSON.stringify(article)
    );
  });

  const lastEditionArticlesAuthors = lastEditionArticles.map((article) => {
    return article.author;
  });

  setAreValidUsers(lastEditionArticlesAuthors, sbtsNames);

  resultFunctionsToCall = resultFunctionsToCall.filter((call) => {
    const discardCondition =
      call.functionName === "getArticles" &&
      state[`isValidUser-${call.props.accountId}`] !== undefined;
    return !discardCondition;
  });

  const finalArticles = filterValidArticles(lastEditionArticles);
  const finalArticlesMapped = {};
  sbtsNames.forEach((sbtName) => {
    const sbtArticles = finalArticles.filter((article) => {
      if (!article.sbts) return false;
      return article.sbts.indexOf(sbtName) !== -1;
    });
    finalArticlesMapped[sbtName] = sbtArticles;
  });

  return finalArticlesMapped;
}

function filterValidator(articles) {
  return articles.filter((article) => {
    return (
      article.sbts.find((articleSbt) => {
        return (
          state[`isValidUser-${article.author}`][articleSbt] ||
          articleSbt === "public"
        );
      }) !== undefined
    );
  });
}

function filterValidArticles(articles) {
  let filteredArticles = filterValidator(filteredArticles ?? articles);

  return filteredArticles;
}

function normalizeOldToV_0_0_1(article) {
  if (!Array.isArray(article.tags) && typeof article.tags === "object") {
    article.tags = Object.keys(article.tags);
  }
  return article;
}

// END LIB FUNCTIONS

// EDIT: set functions you want to export
function callFunction(call) {
  if (call.functionName === "canUserCreateArticle") {
    return canUserCreateArticle(call.props);
  } else if (call.functionName === "createArticle") {
    return createArticle(call.props);
  } else if (call.functionName === "canUserEditArticle") {
    return canUserEditArticle(call.props);
  } else if (call.functionName === "getArticles") {
    return getArticles(call.props);
  }
}

// EDIT: set versions you want to handle, considering their action to Social.index and the way to transform to one version to another (normalization)
const versions = {
  old: {
    normalizationFunction: normalizeOldToV_0_0_1,
    action: versionsBaseActions,
  },
};

function normalizeLibData(libDataByVersion) {
  let libData;

  Object.keys(versions).forEach((version, index, array) => {
    const normFn = versions[version].normalizationFunction;
    const normLibData = libDataByVersion[index].map((libData, i) => {
      return normFn(libData);
    });

    if (index + 1 === array.length) {
      // Last index
      libData = normLibData;
      return;
    }
    libDataByVersion[index + 1] =
      libDataByVersion[index + 1].concat(normLibData);
  });

  return libData;
}

if (functionsToCall && functionsToCall.length > 0) {
  const updateObj = Object.assign({}, functionsToCallByLibrary);
  resultFunctionsToCall = [...functionsToCall];
  functionsToCall.forEach((call) => {
    updateObj[call.key] = callFunction(call);
  });

  resultFunctionsToCallByLibrary[libName] = resultFunctionsToCall;
  updateObj.functionsToCallByLibrary = resultFunctionsToCallByLibrary;
  stateUpdate(updateObj);
}

return (
  <>
    {libSrcArray.map((src) => {
      return callLibs(
        src,
        libStateUpdate,
        state.libCalls,
        {},
        `lib.${libName}`
      );
    })}
  </>
);
