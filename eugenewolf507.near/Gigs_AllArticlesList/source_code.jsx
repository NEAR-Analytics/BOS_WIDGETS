const addressForArticles = "ndcGigArticle";
const authorsWhitelist = props.writersWhiteList ?? [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "eugenewolf507.near",
];
const articleBlackList = [91092435, 91092174, 91051228, 91092223, 91051203];
const authorForWidget = "neardigitalcollective.near";
const statusTagsArr = ["Open", "Claimed", "Closed"];
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
      authorsWhitelist.some((addr) => addr === article.author)
    )
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

const sortArticlesByTag = () => {
  //   if (filteredArticles === 0 || filteredArticles === undefined) {
  //     return;
  //   }
  const result =
    filteredArticles &&
    filteredArticles.reduce(
      (acc, article) => {
        if (article.currentStatusTag === "Claimed") {
          const claimed = [...acc.claimed, article];
          const tempRes = { claimed };
          return { ...acc, ...tempRes };
        }
        if (article.currentStatusTag === "Closed") {
          const closed = [...acc.closed, article];
          const tempRes = { closed };
          return { ...acc, ...tempRes };
        }
        const intermediateArticle = { ...article, currentStatusTag: "Open" };
        const open = [...acc.open, intermediateArticle];
        const tempRes = { open };
        return { ...acc, ...tempRes };
      },
      { open: [], claimed: [], closed: [] }
    );
  return result;
};

const sortedArticlesByTag = sortArticlesByTag();
State.init(sortedArticlesByTag);

const getDateLastEdit = (timestamp) => {
  const date = new Date(Number(timestamp));
  const dateString = {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
  return dateString;
};

// ========== HANDLER ==========
const clickHandler = (oldStatus, newStatus, articleId) => {
  const actualTag = oldStatus.toLowerCase();
  const newTag = newStatus.toLowerCase();
  // Find the index of the object to be moved
  const objectIndex = state[actualTag].findIndex(
    (obj) => obj.articleId === articleId
  );
  // Check if an object was found
  if (objectIndex !== -1) {
    const objectToMove = state[actualTag].splice(objectIndex, 1)[0];
    const capitalizedNewStatus =
      newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    state[newTag].unshift({
      ...objectToMove,
      currentStatusTag: capitalizedNewStatus,
    });
    State.update();
  }
};

// ========== JSX ==========
const StatusTagGroup = ({ activeStatus, articleId }) => (
  <div className="d-flex flex-row flex-nowrap justify-content-between px-3 pb-3 ">
    {statusTagsArr.map((tag) => (
      <button
        onClick={() => clickHandler(activeStatus, tag, articleId)}
        className={`btn btn-sm ${
          activeStatus === tag ? "btn-primary" : "btn-outline-primary"
        }`}
        disabled={activeStatus === tag}
      >
        #{tag}
      </button>
    ))}
  </div>
);

const Card = ({ article }) => (
  <div className="col gy-3" key={article.articleId}>
    <div className="card h-100">
      <a
        className="text-decoration-none text-dark"
        href={`#/${authorForWidget}/widget/Gigs_OneArticle?articleId=${article.articleId}&blockHeight=${article.blockHeight}&lastEditor=${article.lastEditor}
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
                props={{
                  accountId: article.author,
                  tooltip: true,
                }}
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
            className="mt-3 mb-0 alert alert-secondary"
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
          </div>
        </div>
      </a>
      <StatusTagGroup
        activeStatus={article.currentStatusTag}
        articleId={article.articleId}
      />
    </div>
  </div>
);

return (
  <div>
    <div class="row gx-2">
      <div class="col">
        <div class="border border-dark rounded-2 px-3 pb-3">
          <div className="row card-group">
            <h4 className="pt-2 text-center">{statusTagsArr[0]}</h4>
            {state.open.length > 0 &&
              state.open.map((item) => <Card article={item} />)}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="border border-dark rounded-2 px-3  pb-3">
          <div className="row card-group">
            <h4 className="pt-2 text-center">{statusTagsArr[1]}</h4>
            {state.claimed.length > 0 &&
              state.claimed.map((item) => <Card article={item} />)}
          </div>
        </div>
      </div>
      <div class="col">
        <div class="border border-dark rounded-2 px-3 pb-3">
          <div className="row card-group">
            <h4 className="pt-2 text-center">{statusTagsArr[2]}</h4>
            {state.closed.length > 0 &&
              state.closed.map((item) => <Card article={item} />)}
          </div>
        </div>
      </div>
    </div>
  </div>
);
