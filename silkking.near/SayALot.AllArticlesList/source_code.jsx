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
  handleEditArticle,
  showCreateArticle,
  sbtWhiteList,
  sbts,
  handleShareButton,
  canLoggedUserCreateArticles,
  filterBy,
  callLibs,
} = props;

const libSrcArray = [widgets.libUpVotes];

let initLibsCalls = { upVotes: [] };

//For the moment we'll allways have only 1 sbt in the array. If this change remember to do the propper work in SayALot.lib.SBT and here.

initLibsCalls.upVotes = articlesToRender.map((article) => {
  return {
    functionName: "getUpVotes",
    key: `upVotes-${article.id}`,
    props: {
      id: article.id ?? `${article.author}-${article.timeCreate}`,
      sbtsNames: article.sbts ?? [],
    },
  };
});

if (articlesToRender.length > 0) {
  State.update({ libsCalls: initLibsCalls });
}

State.init({
  start: Date.now(),
  libsCalls: initLibsCalls,
});
// console.log(1, "All articles list", state);
// console.log(2, "All articles list", initLibsCalls);

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
      // true ? (
      showCreateArticle ? (
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
            canLoggedUserCreateArticles,
            sbts,
          }}
        />
      ) : (
        <h6>You can't post since you don't own this SBT</h6>
      )
    }
    <div>
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
      <ArticlesListContainer className="row card-group py-3">
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
                  callLibs,
                }}
              />
            );
          })
        ) : (
          <h5>No articles uploaded using this SBT yet</h5>
        )}
      </ArticlesListContainer>
    </div>
    <CallLibrary>
      {libSrcArray.map((src) => {
        return callLibs(
          src,
          allArticlesListStateUpdate,
          state.libsCalls,
          {},
          "All articles list"
        );
      })}
    </CallLibrary>
  </>
);
