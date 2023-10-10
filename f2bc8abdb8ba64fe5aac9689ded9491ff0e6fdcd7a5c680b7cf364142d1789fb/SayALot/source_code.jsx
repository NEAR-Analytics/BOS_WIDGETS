//===============================================INITIALIZATION=====================================================
let { sharedBlockHeight, tagShared, isTest, accountId } = props;
sharedBlockHeight = Number(sharedBlockHeight);

const sbtWhiteList = [
  // "fractal.i-am-human.near",
  // "community.i-am-human.near",
  "fractal.i-am-human.near - class 1",
  "community.i-am-human.near - class 1",
  "community.i-am-human.near - class 2",
];

const initSbtsNames = sbtWhiteList[0];

const sbtsNames = state.sbt;

const initLibCalls = [
  {
    functionName: "getLastEditArticles",
    key: "articles",
    props: {
      env: isTest ? "test" : "prod",
      sbtsNames: initSbtsNames,
    },
  },
  {
    functionName: "canUserCreateArticle",
    key: "canLoggedUserCreateArticle",
    props: {
      accountId: context.accountId,
      sbtsNames: initSbtsNames,
    },
  },
  // {
  //   functionName: "getLoggedUserSbts",
  //   key: "logedUserSbts",
  //   props: {
  //     accountId: context.accountId,
  //   },
  // },
];

// if (!accountId) accountId = context.accountId;
accountId = context.accountId;

const tabs = {
  SHOW_ARTICLES_LIST: { id: 0 },
  SHOW_ARTICLE: { id: 1 },
  ARTICLE_WORKSHOP: { id: 2 },
  SHOW_ARTICLES_LIST_BY_AUTHORS: { id: 3 },
};

function getInitialFilter() {
  if (sharedBlockHeight) {
    return {
      parameterName: "getPost",
      parameterValue: sharedBlockHeight,
    };
  } else if (tagShared) {
    return {
      parameterName: "tag",
      parameterValue: tagShared,
    };
  } else if (authorShared) {
    return {
      parameterName: "author",
      parameterValue: authorShared,
    };
  } else {
    return {
      parameterName: "",
    };
  }
}

function getInitialTabId() {
  if (sharedBlockHeight) {
    return tabs.SHOW_ARTICLE.id;
  } else {
    return tabs.SHOW_ARTICLES_LIST.id;
  }
}

State.init({
  displayedTabId: getInitialTabId(),
  articleToRenderData: {},
  filterBy: getInitialFilter(),
  authorsProfiles: [],
  libCalls: initLibCalls,
  sbtsNames: initSbtsNames,
  sbts: initSbtsNames,
});

let newLibCalls = state.libCalls;

// const functionsCalledList = newLibCalls.map((functionCalled, index) => {
//   return { functionName: functionCalled.functionName, i: index };
// });

// const lastEditArticlesCall = functionsCalledList.filter(
//   (functionCalled) => functionCalled.functionName === "getLastEditArticles"
// );

// if (lastEditArticlesCall) {
//   newLibCalls[getLastEditArticles.index].props.filterBy = state.filterBy;
// }

State.update({ libCalls: newLibCalls });

//=============================================END INITIALIZATION===================================================

//==================================================CONSTS==========================================================

//const authorForWidget = "sayalot.near";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "kenrou-it.near";
const libSrcArray = [`${authorForWidget}/widget/SayALot.lib.article`];
const thisWidgetName = "SayALot";

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

function filterArticlesByTag(tag, articles) {
  return articles.filter((article) => {
    return article.tags.includes(tag);
  });
}

function filterArticlesByAuthor(author, articles) {
  return articles.filter((article) => {
    return article.author === author;
  });
}

function filterOnePost(blockHeight, articles) {
  if (articles) {
    return articles.filter((article) => article.blockHeight === blockHeight);
  } else {
    return [];
  }
}

if (state.filterBy.parameterName === "tag") {
  finalArticles = filterArticlesByTag(
    state.filterBy.parameterValue,
    finalArticles
  );
} else if (state.filterBy.parameterName === "author") {
  finalArticles = filterArticlesByAuthor(
    state.filterBy.parameterValue,
    finalArticles
  );
} else if (state.filterBy.parameterName === "getPost") {
  finalArticles = filterOnePost(state.filterBy.parameterValue, finalArticles);
  if (finalArticles.length > 0) {
    State.update({ articleToRenderData: finalArticles[0] });
  }
}
//===============================================END GET DATA=======================================================

//=============================================STYLED COMPONENTS====================================================
const CallLibrary = styled.div`
  display: none;
`;

const ShareInteractionGeneralContainer = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    backdrop-filter: blur(10px);
    z-index: 1;
`;

const ShareInteractionMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 1rem;
  border-radious: 12px;
`;

const ClosePopUpContainer = styled.div`
  display: flex;  
  flex-direction: row-reverse;
`;

const CloseIcon = styled.div`
  cursor: pointer;
`;

const PopUpDescription = styled.p`
  color: #474D55;
`;

const ShowLinkShared = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F2F6FA;
  padding: 1rem 2rem;
  border-radius: 17px;
`;

const LinkShared = styled.span`
  color: #0065FF;
  word-wrap: anywhere;
`;

const ClipboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.5rem;
  min-width: 2.5rem;
`;

const ClipboardIcon = styled.i`
  color: ${state.linkCopied ? "#0065FF" : "black"};
  transition: color 0.3s linear;
  cursor: pointer;
`;

const CopiedFeedback = styled.span`
  font-size: 0.7rem;
  color: #6c757d;
`;
//===========================================END STYLED COMPONENTS==================================================

//================================================COMPONENTS========================================================
const renderShareInteraction = () => {
  return (
    <ShareInteractionGeneralContainer>
      <ShareInteractionMainContainer>
        <ClosePopUpContainer>
          <CloseIcon
            className="bi bi-x"
            onClick={() =>
              State.update({ showShareModal: false, linkCopied: false })
            }
          ></CloseIcon>
        </ClosePopUpContainer>
        <h3>Share</h3>
        <PopUpDescription>Use this link to share the article</PopUpDescription>
        <ShowLinkShared>
          <LinkShared>{getLink()}</LinkShared>
          <ClipboardContainer>
            <ClipboardIcon
              className="bi-clipboard"
              onClick={() => {
                clipboard.writeText(getLink());
                State.update({ linkCopied: true });
              }}
            ></ClipboardIcon>
            {state.linkCopied && <CopiedFeedback>Copied!</CopiedFeedback>}
          </ClipboardContainer>
        </ShowLinkShared>
      </ShareInteractionMainContainer>
    </ShareInteractionGeneralContainer>
  );
};
//==============================================END COMPONENTS======================================================

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

function createSbtOptions() {
  return sbtWhiteList.map((option, i) => {
    //The first options is always the default one
    if (i == 0) {
      return { title: option, default: true, value: option };
    } else {
      return { title: option, value: option };
    }
  });
}

const initialCreateState = {
  title: state.editArticleData.title ?? "",
  articleBody: state.editArticleData.body ?? initialBodyAtCreation,
  tags: state.editArticleData.tags ? getValidEditArticleDataTags() : {},
  libCalls: [],
  sbts: [sbtWhiteList[0]],
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
    filterBy: {
      parameterName: filter.filterBy,
      parameterValue: filter.value,
    },
    displayedTabId: tabs.SHOW_ARTICLES_LIST.id,
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

// console.log(0, "libCalls: ", state.libCalls);
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

function handleSbtSelection(string) {
  State.update({
    sbts: [string],
  });
}

function handleShareButton(showShareModal, sharedElement) {
  //showShareModal is a boolean
  //sharedElement is and object like the example: {
  //   type: string,
  //   value: number||string,
  // }
  State.update({ showShareModal, sharedElement });
}

function getLink() {
  return `https://near.social/f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/SayALot?${state.sharedElement.type}=${state.sharedElement.value}`;
}

//===============================================END FUNCTIONS======================================================
return (
  <>
    {state.showShareModal && renderShareInteraction()}
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
        sbtsNames,
      }}
    />
    {finalArticles && state.displayedTabId == tabs.SHOW_ARTICLES_LIST.id && (
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
          handleEditArticle,
          showCreateArticle: state.canLoggedUserCreateArticle,
          sbtWhiteList,
          handleSbtSelection,
          sbts,
          createSbtOptions,
          handleShareButton,
          // logedUserSbts: state.logedUserSbts,
        }}
      />
    )}
    {state.articleToRenderData.title &&
    state.displayedTabId == tabs.SHOW_ARTICLE.id ? (
      <Widget
        src={widgets.articleView}
        props={{
          isTest,
          widgets,
          handleFilterArticles,
          articleToRenderData: state.articleToRenderData,
          authorForWidget,
          handleEditArticle,
          handleShareButton,
          // logedUserSbts: state.logedUserSbts,
        }}
      />
    ) : (
      <div className="spinner-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
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
          // logedUserSbts: state.logedUserSbts,
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
          createSbtOptions,
        }}
      />
    )}

    <CallLibrary>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
