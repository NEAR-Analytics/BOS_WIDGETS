//===============================================INITIALIZATION=====================================================

let {
  isTest,
  stateUpdate,
  finalArticles,
  tabs,
  widgets,
  addressForArticles,
  handleFilterArticles,
  handleOpenArticle,
  authorForWidget,
  initialCreateState,
  editArticleData,
  callLibs,
  handleEditArticle,
  showCreateArticle,
  sbtWhiteList,
  handleSbtSelection,
  sbts,
  createSbtOptions,
  handleShareButton,
  // logedUserSbts,
} = props;

const libSrcArray = [widgets.libUpVotes];

let initLibCalls = [];

//For the moment we'll allways have only 1 sbt in the array. If this change remember to do the propper work in SayALot.lib.SBT and here.
const articleSbts = articleToRenderData.sbts[0] ?? [];

finalArticles.forEach((article) =>
  initLibCalls.push({
    functionName: "getUpVotes",
    key: `upVotes-${article.id}`,
    props: {
      id: article.id ?? `${article.author}-${article.timeCreate}`,
      articleSbts: article.sbts[0] ?? [],
    },
  })
);

if (initLibCalls.length > 0) {
  State.update({ libCalls: initLibCalls });
}

State.init({
  start: Date.now(),
  libCalls: initLibCalls,
});

let finalArticlesWithUpVotes = finalArticles.map((article) => {
  article.upVotes = state[`upVotes-${article.id}`];

  return article;
});

const fiveDaysTimeLapse = 432000000;

const newestArticlesWithUpVotes = finalArticlesWithUpVotes
  .filter((article) => article.timeLastEdit > Date.now() - fiveDaysTimeLapse)
  .sort((a, b) => b.timeLastEdit - a.timeLastEdit);

const olderArticlesWithUpVotes = finalArticlesWithUpVotes
  .filter((article) => article.timeLastEdit < Date.now() - fiveDaysTimeLapse)
  .sort((a, b) => b.upVotes.length - a.upVotes.length);

const sortedFinalArticlesWithUpVotes = [
  ...newestArticlesWithUpVotes,
  ...olderArticlesWithUpVotes,
];

//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================

const ArticlesListContainer = styled.div`
  background-color: rgb(248, 248, 249);
`;

const CallLibrary = styled.div`
  display: none;
`;

//=================================================END CONSTS=======================================================

//==================================================FUNCTIONS=======================================================

function getDateLastEdit(timestamp) {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
}

function allArticlesListStateUpdate(obj) {
  State.update(obj);
}

//================================================END FUNCTIONS=====================================================
// console.log("state.libCalls: ", state.libCalls);
return (
  <>
    {true && (
      // showCreateArticle && (
      <Widget
        src={widgets.create}
        props={{
          isTest,
          addressForArticles,
          authorForWidget,
          stateUpdate,
          widgets,
          initialCreateState,
          editArticleData,
          callLibs,
          handleFilterArticles,
          handleEditArticle,
          initialBody: "",
          createSbtOptions,
        }}
      />
    )}
    <div className="mt-3 border-top pt-2">
      <Widget
        src={widgets.styledComponents}
        props={{
          Dropdown: {
            label: "Select sbt filter",
            value: sbts[0],
            handleChange: handleSbtSelection,
            options: createSbtOptions(),
          },
        }}
      />
    </div>
    <ArticlesListContainer className="row card-group mt-3 py-3 rounded">
      {sortedFinalArticlesWithUpVotes.length > 0 &&
        sortedFinalArticlesWithUpVotes.map((article, i) => {
          const authorProfileCall = Social.getr(`${article.author}/profile`);

          if (authorProfileCall) {
            article.authorProfile = authorProfileCall;
          }

          // If some widget posts data different than an array it will be ignored
          if (!Array.isArray(article.tags)) article.tags = [];
          return (
            <Widget
              src={widgets.generalCard}
              props={{
                widgets,
                isTest,
                data: article,
                displayOverlay: true,
                renderReactions: true,
                addressForArticles,
                handleOpenArticle,
                handleFilterArticles,
                authorForWidget,
                handleShareButton,
                // logedUserSbts,
              }}
            />
          );
        })}
    </ArticlesListContainer>
    <CallLibrary>
      {callLibs(libSrcArray, allArticlesListStateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
