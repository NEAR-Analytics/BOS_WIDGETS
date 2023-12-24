// HOW TO USE
// Create the functions that you want. Then add the functions you want to 'export' inside the `callFunction` function

// INTERFACES
// interface FunctionCall {
//     functionName: string,
//     key: string, // The state of the caller will be updated with this string as a key
//     props: Record<string, any> // function parameters as object
// }

// type LibsCalls = Record<string, FunctionCall> // Key is lib name after lib.

const { isTest, stateUpdate, functionsToCallByLibrary, callLibs, action } =
  props;
const functionsToCall = functionsToCallByLibrary.template; // Change this with the name of your widget
const libName = "article_v_old";

let resultFunctionsToCallByLibrary = Object.assign(
  {},
  functionsToCallByLibrary
); // We make a copy of the functions we're going to call to clean it afterwards if needed, so it isn't called every time the caller gets updated.
let resultFunctionsToCall = []; // Util for resultFunctionsToCallByLibrary

const libSrcArray = []; // string to lib widget

State.init({
  libsCalls: {}, // is a LibsCalls object. It's used to call another library's functions
});

function log(message) {
  console.log(`lib.${libName}`, message);
}

function logError(message) {
  console.error(`lib.${libName}`, message);
}

function getNewFormatValidArticles(env) {}

function getArticles(props) {
  const { env } = props;

  const articlesIndexes = getArticlesIndexes();

  const validArticlesIndexes = filterInvalidArticlesIndexes(
    env,
    articlesIndexes
  );

  const validLatestEdits = getLatestEdits(validArticlesIndexes);

  const articles = validLatestEdits.map(getArticle);
  return normalizeArticles(articles);
}

function getArticlesIndexes() {
  return Social.index(action, "main", {
    order: "desc",
    subscribe: true,
  });
}

function filterInvalidArticlesIndexes(env, articlesIndexes) {
  return articlesIndexes
    .filter((articleIndex) => articleIndex.value.id) // Has id
    .filter(
      (articleIndex) =>
        articleIndex.value.id.split("-")[0] === articleIndex.accountId
    )
    .filter(
      (articleIndex) =>
        !getArticleBlackListByBlockHeight().includes(articleIndex.blockHeight) // Blockheight is not in blacklist
    )
    .filter(
      (articleIndex) =>
        !getArticleBlackListByRealArticleId().includes(articleIndex.value.id) // Article id is not in blacklist
    );
}

function getArticleBlackListByBlockHeight() {
  return [
    91092435, 91092174, 91051228, 91092223, 91051203, 98372095, 96414482,
    96412953, 103131250,
  ];
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

function normalizeOldToV_0_0_1(article) {
  article.realArticleId = `${article.author}-${article.timeCreate}`;
  article.sbts = ["public"];

  return article;
}

function normalizeFromV0_0_1ToV0_0_2(article) {
  article.title = article.articleId;
  article.id = article.realArticleId;
  if (article.sbts[0] !== "public") {
    article.sbts[0] = article.sbts[0] + " - class 1";
  } // There is only one article that is not public and only has class 1

  delete article.articleId;
  delete article.realArticleId;

  return article;
}

function normalizeFromV0_0_2ToV0_0_3(article) {
  if (!Array.isArray(article.tags) && typeof article.tags === "object") {
    article.tags = Object.keys(article.tags);
  }
}

function normalizeArticles(articles) {
  articles = articles.map(normalizeOldToV_0_0_1);
  articles = articles.map(normalizeFromV0_0_1ToV0_0_2);
  articles = articles.map(normalizeFromV0_0_2ToV0_0_3);
  return articles;
}

function callFunction(call) {
  if (call.functionName === "getArticles") {
    return getArticles(call.props);
  }
}

if (functionsToCall && functionsToCall.length > 0) {
  const updateObj = Object.assign({}, functionsToCallByLibrary);
  resultFunctionsToCall = [...functionsToCall];
  functionsToCall.forEach((call) => {
    updateObj[call.key] = callFunction(call);
  });

  resultFunctionsToCallByLibrary.template = resultFunctionsToCall;
  updateObj.functionsToCallByLibrary = resultFunctionsToCallByLibrary;
  stateUpdate(updateObj);
}

return (
  <>
    {libSrcArray.map((src) => {
      return callLibs(src, libStateUpdate, state.libsCalls, `lib.${libName}`);
    })}
  </>
);
