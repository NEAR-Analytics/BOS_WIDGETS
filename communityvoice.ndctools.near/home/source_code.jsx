// Community Voice

//===============================================INITIALIZATION=====================================================
let { sharedBlockHeight, tagShared, isTest, accountId } = props;
sharedBlockHeight = Number(sharedBlockHeight);

const sbtWhiteList = [
  "fractal.i-am-human.near - class 1",
  "community.i-am-human.near - class 1",
  "community.i-am-human.near - class 2",
  "community.i-am-human.near - class 3",
  "public",
];

const initSbtsNames = [sbtWhiteList[0]];

const sbtsNames = state.sbt;

const initLibsCalls = {
  article: [
    {
      functionName: "getArticles",
      key: "articles",
      props: {
        env: isTest ? "test" : "prod",
        sbtsNames: sbtWhiteList,
      },
    },
    {
      functionName: "canUserCreateArticle",
      key: "canLoggedUserCreateArticle",
      props: {
        accountId: context.accountId,
        sbtsNames: sbtWhiteList,
      },
    },
  ],
};

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
  functionsToCallByLibrary: initLibsCalls,
  sbtsNames: initSbtsNames,
  sbts: initSbtsNames,
  firstRender: !isNaN(sharedBlockHeight),
});

let newLibsCalls = state.functionsToCallByLibrary;

State.update({ libsCalls: newLibsCalls });

//=============================================END INITIALIZATION===================================================

//==================================================CONSTS==========================================================

const authorForWidget = "communityvoice.ndctools.near";
// const authorForWidget =
//   "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// const authorForWidget = "kenrou-it.near";
// const authorForWidget = "silkking.near";
const genericWidgetsAuthor = "sayalot.near";

const thisWidgetName = "home";

const widgets = {
  communityVoice: `${authorForWidget}/widget/${thisWidgetName}`,
  create: `${authorForWidget}/widget/CommunityVoice.Create`,
  header: `${genericWidgetsAuthor}/widget/SayALot.NavBar`,
  showArticlesList: `${authorForWidget}/widget/CommunityVoice.AllArticlesList`,
  showArticlesListSortedByAuthors: `${genericWidgetsAuthor}/widget/SayALot.AllArticlesSortByAuthors`,
  articlesByAuthorCard: `${genericWidgetsAuthor}/widget/SayALot.ArticlesByAuthorCard`,
  generalCard: `${authorForWidget}/widget/CommunityVoice.GeneralCard`,
  articleView: `${authorForWidget}/widget/CommunityVoice.ArticleView`,
  reactions: `${authorForWidget}/widget/CommunityVoice.Reactions`,
  addComment: `${authorForWidget}/widget/CommunityVoice.AddComment`,
  commentView: `${genericWidgetsAuthor}/widget/SayALot.CommentView`,
  libSBT: `${genericWidgetsAuthor}/widget/lib.SBT`,
  libComment: `${genericWidgetsAuthor}/widget/lib.comment`,
  libArticle: `${genericWidgetsAuthor}/widget/lib.article`,
  libEmojis: `${genericWidgetsAuthor}/widget/lib.emojis`,
  libUpVotes: `${genericWidgetsAuthor}/widget/lib.upVotes`,
  upVoteButton: `${authorForWidget}/widget/CommunityVoice.UpVoteButton`,
  styledComponents: "rubycop.near/widget/NDC.StyledComponents",
  newStyledComponents: {
    Element: {
      Badge: "nearui.near/widget/Element.Badge",
      User: "nearui.near/widget/Element.User",
    },
    Feedback: {
      Spinner: "nearui.near/widget/Feedback.Spinner",
    },
    Input: {
      Button: "nearui.near/widget/Input.Button",
      Checkbox: "nearui.near/widget/Input.Checkbox",
      Select: "nearui.near/widget/Input.Select",
    },
  },
};

const libSrcArray = [widgets.libArticle];

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
if (profile === null) {
  return "Loading";
}

let authorProfile = {};
if (state.filterBy.parameterName == "author") {
  authorProfile = Social.getr(`${state.filterBy.parameterValue}/profile`);
}

const brand = {
  homePageId: tabs.SHOW_ARTICLES_LIST.id,
  brandName: "Community Voice",
  logoHref:
    "https://ipfs.near.social/ipfs/bafkreifhkslni6dlocxya35vjft3fefk2am5uzkagmjjzobdjqlhrnbjz4",
  logoRemWidth: 12,
  logoRemHeight: 4,
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
const canLoggedUserCreateArticle = state.canLoggedUserCreateArticle[sbts[0]];

//=================================================END CONSTS=======================================================

//=================================================GET DATA=========================================================
const finalArticles = state.articles;

function getArticlesToRender() {
  if (sharedBlockHeight && finalArticles && state.firstRender) {
    let finalArticlesSbts = Object.keys(finalArticles);
    let allArticles = [];

    finalArticlesSbts.forEach((sbt) => {
      allArticles = [...allArticles, ...finalArticles[sbt]];
    });

    return allArticles;
  } else {
    return finalArticles[sbts[0]];
  }
}

const articlesToRender = getArticlesToRender() ?? [];

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
  articlesToRender = filterArticlesByTag(
    state.filterBy.parameterValue,
    articlesToRender
  );
} else if (state.filterBy.parameterName === "author") {
  articlesToRender = filterArticlesByAuthor(
    state.filterBy.parameterValue,
    articlesToRender
  );
} else if (state.filterBy.parameterName === "getPost") {
  articlesToRender = filterOnePost(
    state.filterBy.parameterValue,
    articlesToRender
  );

  if (articlesToRender.length > 0) {
    State.update({ articleToRenderData: articlesToRender[0] });
  }
}
//===============================================END GET DATA=======================================================

//=============================================STYLED COMPONENTS====================================================
const CallLibrary = styled.div`
  display: block;
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

const SmallButton = styled.button`
position: relative;
  border: 0;
  background: transparent;
  width: 35px;
  height: 35px;
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

const renderSelectorLabel = () => {
  return (
    <>
      <span>Post & Filter Topics by SBT</span>

      <SmallButton>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip>
              <p className="m-0">Topics for Community SBT Holders.</p>
              <p className="m-0">Anyone can post to Public.</p>
            </Tooltip>
          }
        >
          <i className="bi bi-info-circle"></i>
        </OverlayTrigger>
      </SmallButton>
    </>
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
    const title = "";

    if (option === "fractal.i-am-human.near - class 1") {
      title = "General";
    } else if (option === "community.i-am-human.near - class 1") {
      title = "OG";
    } else if (option === "community.i-am-human.near - class 2") {
      title = "Contributor";
    } else if (option === "community.i-am-human.near - class 3") {
      title = "Core Contributor";
    } else {
      title = "Public";
    }

    if (i == 0) {
      //The first options is always the default one
      return { title, default: true, value: option };
    } else {
      return { title, value: option };
    }
  });
}

const initialCreateState = {
  title: state.editArticleData.title ?? "",
  articleBody: state.editArticleData.body ?? initialBodyAtCreation,
  tags: state.editArticleData.tags ? getValidEditArticleDataTags() : {},
  libsCalls: { comment: {}, article: {}, emojis: {}, upVotes: {} },
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
        firstRender: false,
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
        firstRender: false,
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

function callLibs(
  src,
  stateUpdate,
  functionsToCallByLibrary,
  extraProps,
  callerWidget
) {
  return (
    <Widget
      src={src}
      props={{
        isTest,
        stateUpdate,
        functionsToCallByLibrary,
        callLibs,
        widgets,
        callerWidget,
        ...extraProps,
      }}
    />
  );
}

function handleSbtSelection(selectedSbt) {
  State.update({
    sbts: [selectedSbt],
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
  return `https://near.social/${widgets.communityVoice}?${
    isTest && "isTest=t&"
  }${state.sharedElement.type}=${state.sharedElement.value}`;
}

//===============================================END FUNCTIONS======================================================
if (!context.accountId) {
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
          sbtsNames,
        }}
      />
      <h2>Log in to see the articles</h2>
    </>
  );
}

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
    {state.displayedTabId == tabs.SHOW_ARTICLES_LIST.id && (
      <div className="my-3 col-lg-8 col-md-8 col-sm-12">
        <Widget
          src={widgets.newStyledComponents.Input.Select}
          props={{
            label: renderSelectorLabel(),
            value: sbts[0],
            onChange: handleSbtSelection,
            options: createSbtOptions(),
          }}
        />
      </div>
    )}
    {articlesToRender && state.displayedTabId == tabs.SHOW_ARTICLES_LIST.id && (
      <Widget
        src={widgets.showArticlesList}
        props={{
          isTest,
          articlesToRender,
          tabs,
          widgets,
          addressForArticles,
          handleOpenArticle,
          handleFilterArticles,
          authorForWidget,
          initialCreateState,
          editArticleData: state.editArticleData,
          handleEditArticle,
          showCreateArticle: canLoggedUserCreateArticle,
          sbtWhiteList,
          sbts,
          handleShareButton,
          canLoggedUserCreateArticles,
          filterBy: state.filterBy,
          callLibs,
        }}
      />
    )}
    {state.articleToRenderData.title &&
      state.displayedTabId == tabs.SHOW_ARTICLE.id && (
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
            callLibs,
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
          sbts,
          canLoggedUserCreateArticles,
        }}
      />
    )}

    <CallLibrary>
      {libSrcArray.map((src) => {
        return callLibs(
          src,
          stateUpdate,
          state.functionsToCallByLibrary,
          { baseAction: "communityVoiceArticle" },
          "CommunityVoice"
        );
      })}
    </CallLibrary>
  </>
);
