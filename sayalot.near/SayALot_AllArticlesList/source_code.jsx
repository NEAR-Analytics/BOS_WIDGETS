const addressForArticles = "sayALotArticle";
const writersWhiteList = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "fiftycent.near",
  "ozymandius.near",
];
const articleBlackList = [
  91092435, 91092174, 91051228, 91092223, 91051203, 96414482, 96402919,
  96402476, 96401880, 96412953, 96412953, 95766840,
];
const authorForWidget = "sayalot.near";
// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
});

const whitelistedPostsIndex = postsIndex.filter((post) => {
  return writersWhiteList.includes(post.accountId);
});

// ========== GET ALL ARTICLES ==========
const resultArticles =
  whitelistedPostsIndex &&
  whitelistedPostsIndex
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
    )
    .filter((article) => article.lastEditor === article.author)
    .filter((article) => !articleBlackList.includes(article.blockHeight));

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
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

return (
  <div className="row card-group py-3">
    {filteredArticles.length > 0 &&
      filteredArticles.map((article) => {
        // If some widget posts data different than an array it will be ignored
        if (!Array.isArray(article.tags)) article.tags = [];
        return (
          <div
            className="col-sm-12 col-lg-6 col-2xl-4 gy-3"
            key={article.articleId}
          >
            <div className="card h-100">
              <a
                className="text-decoration-none text-dark"
                href={`#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `}
              >
                <div className="card-body">
                  <div className="row d-flex justify-content-center">
                    <h5 className="card-title text-center pb-2 border-bottom">
                      {article.articleId}
                    </h5>
                    <div className="col flex-grow-1">
                      <Widget
                        src="mob.near/widget/Profile.ShortInlineBlock"
                        props={{ accountId: article.author, tooltip: true }}
                      />
                    </div>
                    <div className="col flex-grow-0">
                      <p className="card-subtitle text-muted text-end">
                        {getDateLastEdit(article.timeCreate).date}
                      </p>{" "}
                      <p className="card-subtitle text-muted text-end">
                        {getDateLastEdit(article.timeCreate).time}
                      </p>
                    </div>
                  </div>
                  <div
                    className="mt-3 alert alert-secondary"
                    style={{ backgroundColor: "white" }}
                  >
                    <div>
                      Last edit by{" "}
                      <a
                        href={`https://near.social/#/mob.near/widget/ProfilePage?accountId=${article.lastEditor}`}
                        style={{ textDecoration: "underline" }}
                      >
                        {article.lastEditor}
                      </a>
                      <br />
                      Edited on {getDateLastEdit(article.timeLastEdit).date}
                      <br />
                      Edit versions: {article.version}
                    </div>
                    <Widget
                      src={`${authorForWidget}/widget/SayALot_TagList`}
                      props={{ tags: article.tags }}
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        );
      })}
  </div>
);
