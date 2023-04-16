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

console.log(filteredArticles[0].body);

return (
  <div className="row card-group py-3">
    {filteredArticles.length > 0 &&
      filteredArticles.map((article) => (
        <div className="col-sm-12 col-lg-6 col-xl-4 gy-2">
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
                      {getDateLastEdit(article.timeCreate)}
                    </h6>
                  </div>
                  <div className="col flex-grow-0">
                    <Widget
                      src="mob.near/widget/Profile.ShortInlineBlock"
                      props={{ accountId: article.author, tooltip: true }}
                    />
                  </div>
                </div>
                <div className="mt-5 alert alert-secondary">
                  <div>
                    Last edit by{" "}
                    <a
                      href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
                      style={{ textDecoration: "underline" }}
                    >
                      {article.lastEditor}
                    </a>
                    <br />
                    Edited on {getDateLastEdit(article.timeLastEdit)}
                    <br />
                    Edit versions: {article.version}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      ))}
  </div>
);
