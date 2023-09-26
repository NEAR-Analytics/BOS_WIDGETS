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
} = props;

State.init({ start: Date.now() });

//=============================================END INITIALIZATION===================================================

//===================================================CONSTS=========================================================

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
  <div className="row card-group py-3">
    <Widget
      src={widgets.create}
      props={{
        isTest,
        addressForArticles,
        authorForWidget,
        stateUpdate,
        widgets,
        initialBody: initialBodyAtCreation ?? "Create post",
        initialCreateState,
        editArticleData: state.editArticleData,
        callLibs,
        handleFilterArticles,
        handleEditArticle,
      }}
    />
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
  </div>
);
