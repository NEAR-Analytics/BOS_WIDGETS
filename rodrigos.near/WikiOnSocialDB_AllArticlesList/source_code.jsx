const addressForArticles = "wikiTest2Article";
const writersWhiteList = props.writersWhiteList ?? [
  "rodrigos.near",
  "testwiki.near",
  "eugenewolf507.near",
];
const authorForWidget = "rodrigos.near";
// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
});
// ========== GET ALL ARTICLES ==========
const resultArticles =
  postsIndex &&
  postsIndex
    .reduce((acc, { accountId, blockHeight }) => {
      const postData = Social.get(
        `${accountId}/${addressForArticles}/main`,
        blockHeight
      );
      const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
      return [...acc, postDataWithBlockHeight];
    }, [])
    .filter((article) =>
      writersWhiteList.some((addr) => addr === article.author)
    );

// ========== FILTER DUPLICATES ==========
const filteredArticles =
  resultArticles.length &&
  resultArticles.reduce((acc, article) => {
    if (!acc.some(({ articleId }) => articleId === article.articleId)) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  return dateString;
};

console.log(filteredArticles);

return (
  <div className="row card-group">
    {filteredArticles.length > 0 &&
      filteredArticles.map((article) => (
        <div className="col-sm-12 col-lg-6 col-xl-4">
          <div className="card  h-100" key={article.articleId}>
            <a
              className="text-decoration-none text-dark"
              href={`#/${authorForWidget}/widget/WikiOnSocialDB_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
            >
              <div className="card-body">
                <div className="row d-flex justify-content-center">
                  <div className="col flex-grow-1">
                    <h5 className="card-title">{article.articleId}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {getDateLastEdit(article.timeLastEdit)}
                    </h6>
                  </div>
                  <div className="col flex-grow-0">
                    <Widget
                      src="mob.near/widget/Profile.ShortInlineBlock"
                      props={{ accountId: article.author, tooltip: true }}
                    />
                  </div>
                </div>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </a>
          </div>
        </div>
      ))}
  </div>
);
