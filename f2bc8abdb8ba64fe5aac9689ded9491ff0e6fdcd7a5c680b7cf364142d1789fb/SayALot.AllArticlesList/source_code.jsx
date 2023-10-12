//===============================================INITIALIZATION=====================================================

let {
  isTest,
  stateUpdate,
  articlesToRender,
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
  canLoggedUserCreateArticles,
  filterBy,
} = props;

const libSrcArray = [widgets.libUpVotes];

let initLibCalls = [];

//For the moment we'll allways have only 1 sbt in the array. If this change remember to do the propper work in SayALot.lib.SBT and here.

articlesToRender.forEach((article) =>
  initLibCalls.push({
    functionName: "getUpVotes",
    key: `upVotes-${article.id}`,
    props: {
      id: article.id ?? `${article.author}-${article.timeCreate}`,
      articleSbts: article.sbts ?? [],
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

let finalArticlesWithUpVotes = articlesToRender.map((article) => {
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

const IconCursorPointer = styled.i`
  cursor: pointer;
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
return (
  <>
    {
      // true && (
      showCreateArticle && (
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
            canLoggedUserCreateArticles,
          }}
        />
      )
    }
    <div className="mt-3 border-top pt-2">
      <Widget
        src={widgets.newStyledComponents.Input.Select}
        props={{
          label: "Select sbt filter",
          value: sbts[0],
          onChange: handleSbtSelection,
          options: createSbtOptions(),
        }}
      />
    </div>
    {filterBy.parameterName === "tag" && (
      <div className="mt-3">
        <h6>Filter by tag:</h6>
        <div className="d-flex align-items-center ">
          <Widget
            src={widgets.newStyledComponents.Element.Badge}
            props={{
              children: filterBy.parameterValue,
              variant: "round info",
              size: "lg",
            }}
          />
          <IconCursorPointer
            className="bi bi-x"
            onClick={() => handleFilterArticles({ filterBy: "", value: "" })}
          ></IconCursorPointer>
        </div>
      </div>
    )}
    <ArticlesListContainer className="row card-group my-3 py-3 rounded">
      {sortedFinalArticlesWithUpVotes.length > 0 ? (
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
                sbtWhiteList,
              }}
            />
          );
        })
      ) : (
        <h5>No articles uploaded using this SBT yet</h5>
      )}
    </ArticlesListContainer>
    <CallLibrary>
      {callLibs(libSrcArray, allArticlesListStateUpdate, state.libCalls)}
    </CallLibrary>
  </>
);
