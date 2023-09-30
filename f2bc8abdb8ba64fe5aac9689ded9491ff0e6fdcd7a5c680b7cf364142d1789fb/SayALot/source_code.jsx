//===============================================INITIALIZATION=====================================================
let { sharedBlockHeight, tagShared, isTest, accountId } = props;

const initSbtName = "fractal.i-am-human.near";

const sbtName = state.sbt;

const initLibCalls = [
  {
    functionName: "getLastEditArticles",
    key: "articles",
    props: {
      env: isTest ? "test" : "prod",
      filterBy: {
        parameterName: "",
        parameterValue: undefined,
      },
      sbtName: initSbtName,
    },
  },
  {
    functionName: "canUserCreateArticle",
    key: "canLoggedUserCreateArticle",
    props: {
      accountId: context.accountId,
      sbtName: initSbtName,
    },
  },
];

console.log("state: ", state);

// console.log("canLoggedUserCreateArticle: ", canLoggedUserCreateArticle);

if (!accountId) accountId = context.accountId;

const tabs = {
  SHOW_ARTICLES_LIST: { id: 0 },
  SHOW_ARTICLE: { id: 1 },
  ARTICLE_WORKSHOP: { id: 2 },
  SHOW_ARTICLES_LIST_BY_AUTHORS: { id: 3 },
};

State.init({
  displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
  articleToRenderData: {},
  filterBy: tagShared
    ? { parameterName: "tag", parameterValue: tagShared }
    : { parameterName: "" },
  authorsProfiles: [],
  libCalls: initLibCalls,
  sbtName: "fractal.i-am-human.near",
  sbts: [sbtWhiteList[0]],
});

let newLibCalls = state.libCalls;
newLibCalls[0].props.filterBy = state.filterBy;

State.update({ libCalls: newLibCalls });

//=============================================END INITIALIZATION===================================================

//==================================================CONSTS==========================================================

//const authorForWidget = "sayalot.near";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "kenrou-it.near";
const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.article`];
const thisWidgetName = "SayALot";

const sbtWhiteList = ["fractal.i-am-human.near", "community.i-am-human.near"];

// let writersWhiteList = [
//   "neardigitalcollective.near",
//   "blaze.near",
//   "jlw.near",
//   "kazanderdad.near",
//   "joep.near",
//   "sarahkornfeld.near",
//   "yuensid.near",
//   "shubham007.near",
//   "fiftycent.near",
//   "ozymandius.near",
//   "chloe.near",
// ];

// const sayALotWorkers = [
//   "silkking.near",
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
//   "blaze.near",
//   "ayelen.near",
//   "kenrou-it.near",
// ];

// if (isTest) {
//   writersWhiteList = sayALotWorkers;
// }

const widgets = {
  sayALot: `${authorForWidget}/widget/${thisWidgetName}`,
  create: `${authorForWidget}/widget/SayALot.Create`,
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
  header: `${authorForWidget}/widget/SayALot.NavBar`,
  showArticlesList: `${authorForWidget}/widget/SayALot.AllArticlesList`,
  showArticlesListSortedByAuthors: `${authorForWidget}/widget/SayALot.AllArticlesSortByAuthors`,
  articlesByAuthorCard: `${authorForWidget}/widget/SayALot.ArticlesByAuthorCard`,
  generalCard: `${authorForWidget}/widget/SayALot.GeneralCard`,
  articleView: `${authorForWidget}/widget/SayALot.ArticleView`,
  reactions: `${authorForWidget}/widget/SayALot.Reactions`,
  addComment: `${authorForWidget}/widget/SayALot.AddComment`,
  commentView: `${authorForWidget}/widget/SayALot.CommentView`,
  // candidatePage: `#/rubycop.near/widget/NDC.Nomination.Candidate.Page`,
  libComment: `${authorForWidget}/widget/SayALot.lib.comment`,
  libArticle: `${authorForWidget}/widget/SayALot.lib.article`,
  libEmojis: `${authorForWidget}/widget/SayALot.lib.emojis`,
  libUpVotes: `${authorForWidget}/widget/SayALot.lib.upVotes`,
  upVoteButton: `${authorForWidget}/widget/SayALot.UpVoteButton`,
};

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

let authorProfile = {};
if (state.filterBy.parameterName == "author") {
  authorProfile = Social.getr(`${state.filterBy.parameterValue}/profile`);
  // if (!authorProfile) return "Loading...";
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
  { id: tabs.SHOW_ARTICLES_LIST_BY_AUTHORS.id, title: "Authors" },
];

const navigationButtons = [
  // { id: tabs.ARTICLE_WORKSHOP.id, title: "+Create article" },
];

const sbts = state.sbts;

const initialBodyAtCreation = state.editArticleData.body;

//=================================================END CONSTS=======================================================

//=================================================GET DATA=========================================================
const finalArticles = state.articles;
//===============================================END GET DATA=======================================================

//=============================================STYLED COMPONENTS====================================================
const CallLibrary = styled.div`
  display: none;
`;
//===========================================END STYLED COMPONENTS==================================================

//=================================================FUNCTIONS========================================================
function getValidEditArticleDataTags() {
  let tags = state.editArticleData.tags;
  let newFormatTags = {};

  tags &&
    tags.map((tag) => {
      newFormatTags[tag] = "";
    });
  return newFormatTags;
}

const initialCreateState = {
  articleId: state.editArticleData.articleId ?? "",
  articleBody: state.editArticleData.body ?? initialBodyAtCreation,
  tags: state.editArticleData.tags ? getValidEditArticleDataTags() : {},
  libCalls: [],
};

function stateUpdate(obj) {
  State.update(obj);
}

function handleOpenArticle(articleToRenderData) {
  State.update({
    displayedTabId: tabs.SHOW_ARTICLE.id,
    articleToRenderData,
    editArticleData: undefined,
  });
}

function handleEditArticle(articleData) {
  State.update({
    displayedTabId: tabs.ARTICLE_WORKSHOP.id,
    editArticleData: articleData,
  });
}

function handleFilterArticles(filter) {
  State.update({
    displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
    filterBy: { parameterName: filter.filterBy, parameterValue: filter.value },
    editArticleData: undefined,
  });
}

function handleBackButton() {
  props.editArticleData
    ? State.update({
        displayedTabId: tabs.SHOW_ARTICLE.id,
        editArticleData: undefined,
        filterBy: {
          parameterName: "",
          parameterValue: undefined,
          handleBackClicked: true,
        },
      })
    : State.update({
        displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
        articleToRenderData: {},
        editArticleData: undefined,
        filterBy: {
          parameterName: "",
          parameterValue: undefined,
          handleBackClicked: true,
        },
      });
}

function handleGoHomeButton() {
  State.update({
    displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
    articleToRenderData: {},
    filterBy: { parameterName: "", parameterValue: {} },
    editArticleData: undefined,
  });
}

function handlePillNavigation(navegateTo) {
  State.update({ displayedTabId: navegateTo, editArticleData: undefined });
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

//===============================================END FUNCTIONS======================================================
return (
  <>
    <Widget
      src={widgets.header}
      props={{
        isTest,
        stateUpdate,
        handleGoHomeButton,
        handlePillNavigation,
        brand,
        pills: navigationPills,
        navigationButtons,
        displayedTabId: state.displayedTabId,
        handleFilterArticles,
        filterParameter: state.filterBy.parameterName,
        handleBackButton,
        tabs,
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
          initialCreateState,
          editArticleData: state.editArticleData,
          callLibs,
          handleFilterArticles,
          handleEditArticle,
          showCreateArticle: state.canLoggedUserCreateArticle,
          sbtWhiteList,
        }}
      />
    )}
    {state.displayedTabId == tabs.SHOW_ARTICLE.id && (
      <Widget
        src={widgets.articleView}
        props={{
          isTest,
          widgets,
          handleFilterArticles,
          articleToRenderData: state.articleToRenderData,
          authorForWidget,
          handleEditArticle,
        }}
      />
    )}

    {state.displayedTabId == tabs.SHOW_ARTICLES_LIST_BY_AUTHORS.id && (
      <Widget
        src={widgets.showArticlesListSortedByAuthors}
        props={{
          isTest,
          finalArticles,
          tabs,
          widgets,
          handleOpenArticle,
          handleFilterArticles,
          authorForWidget,
        }}
      />
    )}

    {state.displayedTabId == tabs.ARTICLE_WORKSHOP.id && (
      <Widget
        src={widgets.create}
        props={{
          isTest,
          addressForArticles,
          authorForWidget,
          stateUpdate,
          widgets,
          initialBody: initialBodyAtCreation,
          initialCreateState,
          editArticleData: state.editArticleData,
          callLibs,
          handleFilterArticles,
          handleEditArticle,
          sbtWhiteList,
        }}
      />
    )}

    <CallLibrary>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
