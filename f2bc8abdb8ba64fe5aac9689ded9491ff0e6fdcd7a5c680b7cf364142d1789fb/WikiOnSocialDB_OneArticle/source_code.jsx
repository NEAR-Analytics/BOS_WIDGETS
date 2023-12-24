const addressForArticles = "wikiTest2Article";
const addressForComments = "wikiTest2Comment";
const authorForWidget = "rodrigos.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const lastEditor = props.lastEditor;
const blockHeight =
  props.blockHeight === "now" ? "now" : parseInt(props.blockHeight);
const subscribe = !!props.subscribe;
const raw = !!props.raw;

const notifyAccountId = accountId;

State.init({ showReply: false });

const article = JSON.parse(
  Social.get(`${lastEditor}/wikiTest2Article/main`, blockHeight)
);
State.update({ article });

// ======= CHECK WHO CAN EDIT ARTICLE
const authorsWhiteList = ["neardigitalcollective.near"];
const doesUserCanEditArticle = () => {
  const isAccountIdInWhiteList = authorsWhiteList.some(
    (val) => val === accountId
  );
  const isAccountIdEqualsAuthor = accountId === state.article.author;
  return isAccountIdInWhiteList || isAccountIdEqualsAuthor ? true : false;
};

// ======= GET DATA TO ATACH COMMENTS TO THE ARTICLE =======
// we attach all comments to the first initial article (which version = 0)
const articlesIndex = Social.index(addressForArticles, "main", {
  order: "asc",
  accountId: state.article.author,
});

const resultArticles =
  articlesIndex &&
  articlesIndex.reduce((acc, { accountId, blockHeight }) => {
    const postData = Social.get(
      `${accountId}/${addressForArticles}/main`,
      blockHeight
    );
    const postDataWithBlockHeight = { ...JSON.parse(postData), blockHeight };
    return [...acc, postDataWithBlockHeight];
  }, []);

const firstArticle =
  resultArticles &&
  resultArticles.find(
    (article) => article.articleId === state.article.articleId
  );

const firstArticleBlockHeight = firstArticle.blockHeight;

// ======= Item for comment =======
const item = {
  type: "social",
  path: `${state.article.author}/${addressForArticles}/main`,
  blockHeight: firstArticleBlockHeight,
};

const saveArticle = (args) => {
  const newArticleData = {
    ...state.article,
    body: state.note,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    version: Number(state.article.version) + 1,
  };

  const composeArticleData = () => {
    const data = {
      [addressForArticles]: {
        main: JSON.stringify(newArticleData),
      },
      index: {
        [addressForArticles]: JSON.stringify({
          key: "main",
          value: {
            type: "md",
          },
        }),
      },
    };
    return data;
  };
  const newData = composeArticleData();
  Social.set(newData, { force: true });
};

// ========== article parts ========== //

const isHeading = (str, headingLevel) => {
  const headingType = "".padStart(headingLevel, "#");
  return (
    str.substring(0, 1 + headingLevel) === `${headingType} ` ||
    str.substring(0, 2 + headingLevel) === ` ${headingType} ` ||
    str.substring(0, 3 + headingLevel) === `  ${headingType} ` ||
    str.substring(0, 4 + headingLevel) === `   ${headingType} `
  );
};

const articleParts = (lineArray) => {
  const resultText = [];
  const resultHeading = [];
  lineArray.forEach((line) => {
    if (isHeading(line, 1)) {
      resultText.push([[]]);
      resultHeading.push([[line.trim().substring(2)]]);
    } else if (resultText.length - 1 < 0) {
      resultText.push([[]]);
      resultHeading.push([["Introduction"]]);
    } else if (isHeading(line, 2)) {
      resultText[resultText.length - 1].push([]);
      resultHeading[resultHeading.length - 1].push([line.trim().substring(3)]);
    }
    const maxIndexDimension1 = resultText.length - 1;
    const maxIndexDimension2 = resultText[maxIndexDimension1].length - 1;
    resultText[maxIndexDimension1][maxIndexDimension2].push(line);
  });
  return { resultText, resultHeading };
};

const { resultText, resultHeading } = articleParts(
  state.article.body.split("\n")
);

const handleHeaderClick = (index1, index2) => {
  if ((!state.viewHistory && !state.editArticle) || index2 === 0) {
    let resp;
    if (index2 === 0) {
      resp = resultText[index1].map((item) => item.join("\n")).join("\n");
    } else resp = resultText[index1][index2].join("\n");
    State.update({
      note: resp,
    });
  }
};

return (
  <div className="container-fluid border-start border-end">
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "articles" }}
    />
    <div className="row h-100">
      <div className="col-12 col-md-3 border-end">
        <h4
          className="text-center"
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
          onClick={() => {
            State.update({
              note: state.article.body,
            });
          }}
        >
          {state.article.articleId}
        </h4>
        <hr />
        <button
          className="btn btn-outline-dark w-100 mb-2"
          onClick={() => {
            State.update({
              ...state,
              editArticle: false,
              viewHistory: !state.viewHistory,
            });
          }}
        >
          View History
        </button>
        {doesUserCanEditArticle() && (
          <button
            className="btn btn-outline-dark w-100"
            onClick={() => {
              State.update({
                ...state,
                viewHistory: false,
                editArticle: !state.editArticle,
                note: state.article.body,
              });
            }}
          >
            Edit Article
          </button>
        )}
        <hr />
        <div className="accordion accordion-flush" id="accordionFlushExample">
          {resultHeading.map((arrItem, index1) => {
            console.log("arrItem: ", arrItem);
            return (
              <div className="accordion-item shadow-none ">
                {arrItem.map((item, index2) => {
                  console.log("item: ", item);
                  if (index2 === 0) {
                    return (
                      <h5
                        className="accordion-header shadow-none py-1"
                        id="flush-headingOne"
                      >
                        <button
                          className="accordion collapsed border-0 bg-white text-dark shadow-none"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={"#flush-collapseOne" + index1}
                          aria-expanded="true"
                          aria-controls={"flush-collapseOne" + index1}
                          onClick={() => handleHeaderClick(index1, index2)}
                        >
                          {item}
                        </button>
                      </h5>
                    );
                  }
                  return (
                    <div
                      id={"flush-collapseOne" + index1}
                      className="accordion-collapse collapse"
                      aria-labelledby={"flush-collapseOne" + index1}
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        className="accordion-body py-1"
                        onClick={() => handleHeaderClick(index1, index2)}
                      >
                        {item}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="mb-3" />
        {/* === FOOTER === */}
        <Widget
          src={`${authorForWidget}/widget/WikiOnSocialDB_OneArticle.Footer`}
          props={{
            author: state.article.author,
            lastEditor: state.article.lastEditor,
            timeLastEdit: state.article.timeLastEdit,
            version: state.article.version,
          }}
        />
      </div>
      <div className="d-md-none mb-3" />
      <hr className="d-md-none" />
      <div className="col-12 col-md-9">
        <div>
          {/* === BUTTON - EDIT ARTICLE === */}
          {state.editArticle && (
            <>
              <div className="d-flex justify-content-center w-100">
                <button
                  type="button"
                  className="btn btn-outline-success mx-1"
                  style={{ minWidth: "120px" }}
                  onClick={() => {
                    if (!state.note || article.body === state.note) return;

                    const args = {
                      article_id: state?.articleId,
                      body: state.note,
                      navigation_id: null,
                    };

                    saveArticle(args);
                  }}
                >
                  Save Article{" "}
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger mx-1"
                  style={{ minWidth: "120px" }}
                  onClick={() => {
                    State.update({
                      ...state,
                      editArticle: false,
                      note: undefined,
                    });
                  }}
                >
                  Close
                </button>
              </div>
              <hr />
            </>
          )}

          {/* === EDIT ARTICLE === */}
          {state.editArticle && (
            <>
              <div className="d-flex gap-2" style={{ minHeight: "300px" }}>
                <div className="w-50">
                  <Widget
                    src="mob.near/widget/MarkdownEditorIframe"
                    props={{
                      initialText: state.article.body,
                      onChange: (note) => State.update({ note }),
                    }}
                  />
                </div>
                <div className="w-50">
                  <Widget
                    src="mob.near/widget/SocialMarkdown"
                    props={{ text: state.note }}
                  />
                </div>
              </div>
            </>
          )}
          {!state.editArticle && !state.viewHistory && (
            <Markdown text={state.note || state.article.body} />
          )}
          {/* === VIEW HISTORY === */}
          {state.viewHistory && (
            <div className="mt-3 ps-5">
              <div className="d-flex justify-content-between">
                <i
                  className="bi bi-arrow-left"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    State.update({
                      ...state,
                      viewHistory: false,
                    });
                  }}
                ></i>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    State.update({
                      ...state,
                      viewHistory: false,
                    });
                  }}
                >
                  Close
                </button>
              </div>
              <Widget
                src={`${authorForWidget}/widget/WikiOnSocialDB_History.History`}
                props={{
                  articleId: state.article.articleId,
                  resultArticles,
                }}
              />
            </div>
          )}
          {/* === CREATE COMMENT BUTTON === */}
          {blockHeight !== "now" && (
            <div className="mt-1 d-flex justify-content-between">
              <Widget
                src="mob.near/widget/CommentButton"
                props={{
                  onClick: () => State.update({ showReply: !state.showReply }),
                }}
              />
            </div>
          )}
          {/* === COMPOSE COMMENT === */}
          <div className="mt-3 ps-5">
            {state.showReply && (
              <div className="mb-2">
                <Widget
                  src={`${authorForWidget}/widget/WikiOnSocialDB_Comment.Compose`}
                  props={{
                    notifyAccountId,
                    item,
                    onComment: () => State.update({ showReply: false }),
                  }}
                />
              </div>
            )}
            {/* === SHOW COMMENT === */}
            <Widget
              src={`${authorForWidget}/widget/WikiOnSocialDB_Comment.Feed`}
              props={{
                item,
                highlightComment: props.highlightComment,
                limit: props.commentsLimit,
                subscribe,
                raw,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
