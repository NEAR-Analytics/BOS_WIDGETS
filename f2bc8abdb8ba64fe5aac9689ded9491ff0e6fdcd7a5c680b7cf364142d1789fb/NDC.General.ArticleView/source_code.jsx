const { isTest, writersWhiteList, articleToRenderData } = props;

const addressForArticles = isTest ? "test_sayALotArticle" : "sayALotArticle";
// const authorForWidget = "sayalot.near";
const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
const accountId = context.accountId;
const article = articleToRenderData;

const notifyAccountId = article.author;

State.init({ showReply: false, isMain: true, article: article });

if (!state.article) {
  return "Loading...";
}

const canUserEditArticle = () => {
  const canOnlyAuthorEdit = true;
  const isAccountIdInWhiteList = writersWhiteList.some(
    (val) => val === accountId
  );
  const isAccountIdEqualsAuthor = accountId === state.article.author;

  if (canOnlyAuthorEdit) {
    return isAccountIdEqualsAuthor;
  } else {
    return isAccountIdInWhiteList;
  }
};

return (
  <div>
    <div className="d-flex justify-content-center">
      <div>
        <Widget
          src={widgets.header}
          props={{
            startTime: time[0],
            endTime: time[1],
            type: "Nomination",
          }}
        />
      </div>
    </div>
    <div className="row">
      <div className="my-3">
        <span>
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </span>
      </div>
    </div>
    <div>
      <Widget
        props={{
          data: state,
          house: props.house,
          accountId,
          nomination_contract: nominationContract,
          registry_contract: registryContract,
          api_key: apiKey,
        }}
        src={widgets.mobile}
      />
    </div>
    <div className="w-100">
      <Widget
        src={widgets.header}
        props={{
          startTime: time[0],
          endTime: time[1],
          type: "Nomination",
        }}
      />
    </div>
    <div className="row">
      <div className="my-3">
        <span>
          <i className="bi bi-chevron-left mr-2"></i>
          Back
        </span>
      </div>
    </div>
    <div className="row">
      <Widget
        props={{
          data: state,
          house: props.house,
          accountId,
          nomination_contract: nominationContract,
          registry_contract: registryContract,
          api_key: apiKey,
        }}
        src={widgets.desktop}
      />
    </div>
  </div>
);
