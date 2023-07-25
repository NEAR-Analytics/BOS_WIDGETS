State.init({ start: Date.now() });

const isDebug = props.isDebug;
const author = props.author;

const writersWhiteList = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "shubham007.near",
  "fiftycent.near",
  "chloe.near",
  "ozymandius.near",
];

const sayALotWorkers = [
  "silkking.near",
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb",
  "blaze.near",
  "ayelen.near",
  "kenrou-it.near",
];

if (isDebug) {
  writersWhiteList = sayALotWorkers;
}

const addressForArticles = isDebug ? "test_sayALotArticle" : "sayALotArticle";
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];
const authorForWidget = "sayalot.near";
// const authorForWidget =
// "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";
// ========== GET INDEX ARRAY FOR ARTICLES ==========
const postsIndex = Social.index(addressForArticles, "main", {
  order: "desc",
  accountId: undefined,
});

if (!postsIndex) {
  return "Loading...";
}

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
    )
    .filter((article) => article.lastEditor === article.author)
    .filter((article) => !articleBlackList.includes(article.blockHeight));

if (resultArticles.length === 0) {
  return "No articles found yet";
}

// ========== FILTER DUPLICATES ==========
let filteredArticles =
  resultArticles.length &&
  resultArticles.reduce((acc, article) => {
    if (!acc.some(({ articleId }) => articleId === article.articleId)) {
      return [...acc, article];
    } else {
      return acc;
    }
  }, []);

if (author) {
  filteredArticles = filteredArticles.filter(
    (article) => article.author === author
  );
}

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
                href={
                  isDebug
                    ? `#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}&isDebug=true
            `
                    : `#/${authorForWidget}/widget/SayALot_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
            `
                }
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
                      props={{ tags: article.tags, isDebug }}
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
