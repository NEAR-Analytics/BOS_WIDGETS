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
} = props;

State.init({ start: Date.now() });

//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================

const ArticlesListContainer = styled.div`
  background-color: rgb(248, 248, 249);
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

//================================================END FUNCTIONS=====================================================

return (
  <>
    {showCreateArticle && (
      <Widget
        src={widgets.create}
        props={{
          isTest,
          addressForArticles,
          authorForWidget,
          stateUpdate,
          widgets,
          initialBody: "Create post",
          initialCreateState,
          editArticleData,
          callLibs,
          handleFilterArticles,
          handleEditArticle,
        }}
      />
    )}
    <ArticlesListContainer className="row card-group py-3">
      {finalArticles.length > 0 &&
        finalArticles.map((article, i) => {
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
              }}
            />
          );
        })}
    </ArticlesListContainer>
  </>
);
