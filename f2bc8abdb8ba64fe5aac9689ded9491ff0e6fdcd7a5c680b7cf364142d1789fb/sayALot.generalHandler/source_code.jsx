//===============================================INITIALIZATION=====================================================
let { sharedBlockHeight, tagShared, isTest, accountId } = props;

if (!accountId) accountId = context.accountId;

const tabs = {
  SHOW_ARTICLES_LIST: { id: 0 },
  SHOW_ARTICLE: { id: 1 },
  ARTICLE_WORKSHOP: { id: 2 },
};

State.init({
  displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
  infoToRenderArticle: {},
  filterBy: tagShared
    ? { parameterName: "tag", parameterValue: tagShared }
    : { parameterName: "" },
});

//=============================================END INITIALIZATION===================================================

//==================================================CONSTS==========================================================

//const authorForWidget = "sayalot.near";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const thisWidgetName = "sayALot.generalHandler";

let writersWhiteList = [
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

const sayALotWorkers = [
  "silkking.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  "blaze.near",
  "ayelen.near",
  "kenrou-it.near",
];

if (isTest) {
  writersWhiteList = sayALotWorkers;
}

const widgets = {
  thisWidget: `${authorForWidget}/widget/${thisWidgetName}`,
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
  header: `${authorForWidget}/widget/NDC.NavBar`,
  showArticlesList: `${authorForWidget}/widget/SayALot.AllArticlesList`,
  generalCard: `f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/NDC.GeneralCard`,
  oneArticle: `${authorForWidget}/widget/SayALot.OneArticle`,
  reactions: "sayalot.near/widget/SayALot_Reactions",
  addComment: "rubycop.near/widget/NDC.Nomination.AddComment",
  candidatePage: "#/rubycop.near/widget/NDC.Nomination.Candidate.Page",
};

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

let authorProfile = {};
if (state.filterBy.parameterName == "author") {
  authorProfile = Social.getr(`${state.filterBy.parameterValue}/profile`);
  if (!authorProfile) return "Loading...";
}

const brand = {
  homePageId: tabs.SHOW_ARTICLES_LIST.id,
  brandName: "Say a lot",
  logoHref:
    "https://ipfs.near.social/ipfs/bafkreiaqxa4st4vp4rtq2iyobdgqe5tpfg55mmyvfg25upd2qplcxylyfi",
  logoRemWidth: 6,
  logoRemHeight: 6,
};

const navigationPills = [
  { id: tabs.SHOW_ARTICLES_LIST.id, title: "Articles" },
  { id: tabs.SHOW_ARTICLES_LIST.id, title: "Authors" },
];

const navigationButtons = [
  { id: ARTICLE_WORKSHOP.id, title: "+Create article" },
];

//=================================================END CONSTS=======================================================

//=================================================GET DATA=========================================================
const addressForArticles = isTest ? "test_sayALotArticle" : "sayALotArticle";
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];

function getLastEditionsByArticle() {
  const allArticles = Social.index(addressForArticles, "main", {
    order: "desc",
    accountId:
      state.filterBy.parameterName == "author" && state.filterBy.parameterValue,
  });

  const oldFormatArticlesTestBasicDataArray = [
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      97325392,
    ],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      97317287,
    ],
    ["ayelen.near", 96927579],
    ["kenrou-it.near", 96924422],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      96879470,
    ],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      96878182,
    ],
    [
      "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
      96643643,
    ],
    ["silkking.near", 96491128],
  ];

  const oldFormatArticlesMainBasicDataArray = [
    ["ozymandius.near", 97329049],
    ["fiftycent.near", 97322138],
    ["blaze.near", 97255023],
    ["jlw.near", 97250015],
    ["kazanderdad.near", 96692435],
    ["blaze.near", 96414482],
    ["blaze.near", 96412953],
    ["sarahkornfeld.near", 96402919],
    ["sarahkornfeld.near", 96402476],
    ["sarahkornfeld.near", 96402330],
    ["sarahkornfeld.near", 96401880],
    ["ozymandius.near", 95810612],
    ["blaze.near", 95766756],
    ["blaze.near", 95766700],
    ["jlw.near", 95705034],
    ["blaze.near", 95413943],
    ["blaze.near", 94936576],
    ["yuensid.near", 94866690],
    ["sarahkornfeld.near", 94863580],
    ["blaze.near", 94801223],
    ["sarahkornfeld.near", 94344236],
    ["sarahkornfeld.near", 94188387],
    ["jlw.near", 93986868],
    ["blaze.near", 92999498],
  ];

  const oldFormatArticlesBasicDataArray = isTest
    ? oldFormatArticlesTestBasicDataArray
    : oldFormatArticlesMainBasicDataArray;

  if (state.filterBy.parameterName == "author") {
    oldFormatArticlesBasicDataArray = oldFormatArticlesBasicDataArray.filter(
      (articleBasicData) =>
        articleBasicData[0] === state.filterBy.parameterValue
    );
  }

  let oldFormatArticlesArray = oldFormatArticlesBasicDataArray.map(
    (oldFormatBasicArticleData) => {
      let article = Social.get(
        `${oldFormatBasicArticleData[0]}/${addressForArticles}/main`,
        oldFormatBasicArticleData[1]
      );

      let articleParsed = undefined;
      if (article) {
        articleParsed = JSON.parse(article);
        articleParsed.blockHeight = oldFormatBasicArticleData[1];
      }

      return articleParsed;
    }
  );

  let newFormatArticlesData = allArticles
    .filter((articleIndex) => articleIndex.value.id)
    .filter(
      (articleIndex) =>
        articleIndex.value.id.split("-")[0] === articleIndex.accountId
    )
    .filter((articleIndex) => writersWhiteList.includes(articleIndex.accountId))
    .filter(
      (articleIndex) => !articleBlackList.includes(articleIndex.blockHeight)
    );

  let lastestEditArticlesDataArray = newFormatArticlesData.filter(
    (articleData) => {
      const latestEditForThisArticle = newFormatArticlesData.find(
        (newArticleData) => newArticleData.value.id === articleData.value.id
      );
      return (
        JSON.stringify(articleData) === JSON.stringify(latestEditForThisArticle)
      );
    }
  );

  let finalNewFormatArticles = lastestEditArticlesDataArray.map(
    (latestEditArticle) => {
      const article = Social.get(
        `${latestEditArticle.accountId}/${addressForArticles}/main`,
        latestEditArticle.blockHeight
      );

      let articleParsed = undefined;
      if (article) {
        articleParsed = JSON.parse(article);
        articleParsed.blockHeight = latestEditArticle.blockHeight;
        articleParsed.realArticleId = latestEditArticle.value.articleId;
      }

      return articleParsed;
    }
  );

  let finalOldFormatArticles = oldFormatArticlesArray.filter(
    (oldFormatArticle) => {
      return !finalNewFormatArticles.find(
        (newFormatArticle) =>
          newFormatArticle.articleId === oldFormatArticle.articleId
      );
    }
  );

  let finalArticlesWithoutUsersFilters = finalNewFormatArticles.concat(
    finalOldFormatArticles
  );

  let finalArticles = finalArticlesWithoutUsersFilters.filter((article) => {
    return article.tags.includes(state.filterBy.parameterValue);
  });

  return state.filterBy.parameterName == "tag"
    ? finalArticles
    : finalArticlesWithoutUsersFilters;
}

const finalArticles = getLastEditionsByArticle() ?? [];
//===============================================END GET DATA=======================================================

//=================================================FUNCTIONS========================================================

function stateUpdate(obj) {
  State.update(obj);
}

function handleOpenArticle(article) {
  return () =>
    State.update({
      displayedTabId: tabs.SHOW_ARTICLE.id,
      infoToRenderArticle: {
        articleId: article.articleId,
        blockHeight: article.blockHeight,
        lastEditor: article.lastEditor,
      },
    });
}

function handleFilterArticles(filter) {
  State.update({
    displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
    filterBy: { parameterName: filter.filterBy, parameterValue: filter.value },
  });
}

//===============================================END FUNCTIONS======================================================
return (
  <>
    <Widget
      src={widgets.header}
      props={{
        isTest,
        stateUpdate,
        brand,
        pills: navigationPills,
        navigationButtons,
        displayedTabId: state.displayedTabId,
        writersWhiteList,
        handleFilterArticles,
      }}
    />
    {state.displayedTabId == tabs.SHOW_ARTICLES_LIST.id && (
      <Widget
        src={widgets.showArticlesList}
        props={{
          isTest,
          finalArticles,
          tabs,
          widgets,
          addressForArticles,
          handleOpenArticle,
          handleFilterArticles,
          authorForWidget,
        }}
      />
    )}
    {state.displayedTabId == tabs.SHOW_ARTICLE.id && (
      <Widget src={widgets.oneArticle} props={{ isTest }} />
    )}
  </>
);
