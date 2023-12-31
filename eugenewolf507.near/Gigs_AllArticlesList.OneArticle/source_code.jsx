// TODO update authorsWhiteList
// TODO update authorForWidget2 with authorForWidget for widget/Gigs_Tag (row 192 in this code)
// TODO delete authorForWidget2
const addressForComments = "gig-comments";
const addressForArticles = "ndcGigArticle";
const authorForWidget = "neardigitalcollective.near";
const authorForWidget2 = "eugenewolf507.near";
const accountId = props.accountId ?? context.accountId;
const doesUserCanChangeStatus = props.doesUserCanChangeStatus;
// if (!accountId) {
//   return "No account ID";
// }

const article = props.article;
const subscribe = !!props.subscribe;
const raw = !!props.raw;
const statusTagsArr = props.statusTagsArr;
const statusChangeHandler = props.statusChangeHandler;

const notifyAccountId = accountId;

State.init({ showReply: false, isMain: true });
State.update({ article });

// ======= CHECK WHO CAN EDIT ARTICLE
const authorsWhiteList = [
  "neardigitalcollective.near",
  "blaze.near",
  "jlw.near",
  "kazanderdad.near",
  "joep.near",
  "sarahkornfeld.near",
  "yuensid.near",
  "james.near",
  "ndcplug.near",
  "eugenewolf507.near",
];
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

// ========== HANDLERS ==========
const handleHeaderClick = (index1, index2) => {
  if ((!state.viewHistory && !state.editArticle) || index2 === 0) {
    let resp;
    if (index2 === 0) {
      resp = resultText[index1].map((item) => item.join("\n")).join("\n");
    } else resp = resultText[index1][index2].join("\n");
    State.update({
      isMain: index2 === 0,
      note: resp,
    });
  }
};

// ========== UTILS ==========
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// ========== JSX ==========
const StatusTagGroup = ({ activeStatus, articleId, showButtons }) => (
  <div className="d-xxl-flex flex-row flex-nowrap justify-content-between px-2 pb-3 ">
    {showButtons ? (
      statusTagsArr.map((tag) => (
        <Widget
          src={`${authorForWidget2}/widget/Gigs_Tag`}
          props={{
            children: `#${tag}`,
            variant: activeStatus === tag ? "" : "outline",
            onClick: () => {
              statusChangeHandler(activeStatus, tag, articleId);
            },
            disabled: activeStatus === tag,
          }}
        />
      ))
    ) : (
      <span>
        Status: <span class="fw-bolder">{capitalize(activeStatus)}</span>
      </span>
    )}
  </div>
);

const HorizontalLine = () => <hr className="my-3 my-xl-4" />;

return (
  <div
    className="row h-100 p-3 p-xl-4"
    style={{
      minWidth: "360px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "20px",
    }}
  >
    <div className="col-12 col-md-3 border-end ps-0 pe-3 pe-xl-4">
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
      <HorizontalLine />
      <Widget
        src="nui.sking.near/widget/Input.Button"
        props={{
          children: "View History",
          variant: "secondary",
          className: "w-100",
          size: "sm",
          onClick: () => {
            State.update({
              ...state,
              editArticle: false,
              viewHistory: !state.viewHistory,
            });
          },
        }}
      />
      {doesUserCanEditArticle() && (
        <Widget
          src="nui.sking.near/widget/Input.Button"
          props={{
            children: "Edit Article",
            variant: "primary",
            className: "w-100 mt-3 mt-xl-3",
            size: "sm",
            onClick: () => {
              State.update({
                ...state,
                viewHistory: false,
                editArticle: !state.editArticle,
                note: state.article.body,
              });
            },
          }}
        />
      )}
      <HorizontalLine />
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {resultHeading.map((arrItem, index1) => {
          return (
            <div className="accordion-item shadow-none ">
              {arrItem.map((item, index2) => {
                if (index2 === 0) {
                  return (
                    <h5
                      className="accordion-header shadow-none py-1 text-center fs-6 "
                      id="flush-headingOne"
                    >
                      <button
                        className="accordion collapsed border-0 bg-white text-dark shadow-none fw-bold"
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
      <HorizontalLine />
      <StatusTagGroup
        activeStatus={article.statusTag}
        articleId={article.articleId}
        showButtons={doesUserCanChangeStatus}
      />
      <div className="mb-3" />
      {/* === FOOTER === */}
      <Widget
        src={`${authorForWidget}/widget/WikiOnSocialDB_OneArticle.Footer`}
        props={{
          author: state.article.author,
          timeCreated: state.article.timeCreate,
          lastEditor: state.article.lastEditor,
          timeLastEdit: state.article.timeLastEdit,
          version: state.article.version,
        }}
      />
    </div>
    <div className="d-md-none mb-3" />
    <hr className="d-md-none" />
    <div className="col-12 col-md-9 pe-0 ps-3 ps-xl-4">
      <div>
        {/* === BUTTON - EDIT ARTICLE === */}
        {state.editArticle && (
          <>
            <div className="d-flex justify-content-center w-100">
              <Widget
                src="nui.sking.near/widget/Input.Button"
                props={{
                  children: "Save Article",
                  variant: "outline success",
                  className: "me-3 me-xl-4",
                  size: "sm",
                  onClick: () => {
                    if (!state.note || article.body === state.note) return;

                    const args = {
                      article_id: state?.articleId,
                      body: state.note,
                      navigation_id: null,
                    };

                    saveArticle(args);
                  },
                }}
              />

              <Widget
                src="nui.sking.near/widget/Input.Button"
                props={{
                  children: "Close",
                  variant: "outline danger",
                  className: "",
                  size: "sm",
                  onClick: () => {
                    State.update({
                      ...state,
                      editArticle: false,
                      note: undefined,
                    });
                  },
                }}
              />
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
          <>
            {!state.isMain && (
              <i
                className="bi bi-arrow-left"
                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                onClick={() => {
                  handleHeaderClick(0, 0);
                }}
              ></i>
            )}
            <Markdown text={state.note || state.article.body} />
          </>
        )}
        {/* === VIEW HISTORY === */}
        {state.viewHistory && (
          <div className="mt-3 ps-5">
            <div className="d-flex justify-content-end">
              <Widget
                src="nui.sking.near/widget/Input.Button"
                props={{
                  children: "Close",
                  variant: "outline danger",
                  className: "",
                  size: "sm",
                  onClick: () => {
                    State.update({
                      ...state,
                      viewHistory: false,
                    });
                  },
                }}
              />
            </div>
            <Widget
              src={`${authorForWidget}/widget/Gigs_History.History`}
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
                src={`${authorForWidget}/widget/Gigs_Comment.Compose`}
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
            src={`${authorForWidget}/widget/Gig_Comment.Feed`}
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
);
