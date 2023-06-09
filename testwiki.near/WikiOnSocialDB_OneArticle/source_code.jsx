const addressForArticles = "wikiTest2Article";
const addressForComments = "wikiTest2Comment";
const authorForWidget = "testwiki.near";
const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}
const sharedCommentAuthorId = props.commentAccountId;
const sharedCommentBlockHeight =
  props.commentBlockHeight && parseInt(props.commentBlockHeight);
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

const mainPartForSharingComment = `https://near.social/#/${authorForWidget}/widget/WikiOnSocialDB_OneArticle?articleId=${state.article.articleId}&blockHeight=${blockHeight}&lastEditor=${lastEditor}&commentAccountId=testwiki.near&commentBlockHeight=85867284`;

// ======= CHECK WHO CAN EDIT ARTICLE
const authorsWhiteList = ["507.near", "wolf.near"];
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

const saveArticle = () => {
  const newArticleData = {
    ...state.article,
    body: state.note,
    lastEditor: accountId,
    timeLastEdit: Date.now(),
    version: Number(state.article.version) + 1,
    tags: state.tags ? state.tags : state.article.tags,
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

//======= Create initialTagsObject for TagsEditor widget =======
// const initialTestArray = ["learner", "crypto", "social"];
const getTagObjectfromArray = (tagArray) => {
  if (!tagArray) return {};
  return tagArray.reduce((acc, value) => ({ ...acc, [value]: "" }), {});
};
// console.log(getTagObjectfromArray(initialTestArray));

const areTheTextAndTagsTheSame = () => {
  const isThereNoTextInBody = !state.note;
  const doesTextUnchanged = article.body === state.note;
  let doesTagsUnchanged = true;
  if (state.tags) {
    if (state.article.tags) {
      doesTagsUnchanged =
        state.tags.join().toLowerCase() ===
        state.article.tags.join().toLowerCase();
    } else {
      doesTagsUnchanged = false;
    }
  }
  return isThereNoTextInBody || (doesTextUnchanged && doesTagsUnchanged);
};

const filterTagsFromNull = (tagsObj) => {
  const entries = Object.entries(tagsObj);

  const result = entries.reduce((acc, value) => {
    if (value[1] !== null) {
      return [...acc, value[0]];
    } else {
      return acc;
    }
  }, []);
  return result;
};

return (
  <>
    <Widget
      src={`${authorForWidget}/widget/WikiOnSocialDB_MainNavigation`}
      props={{ currentNavPill: "articles" }}
    />
    <div>
      <h1>Article: {state.article.articleId}</h1>
      {/* === BUTTON - EDIT ARTICLE === */}
      {doesUserCanEditArticle() && (
        <button
          onClick={() => {
            State.update({
              ...state,
              editArticle: true,
              note: state.article.body,
            });
          }}
        >
          Edit Article
        </button>
      )}
      {/* === BUTTON - SAVE ARTICLE === */}
      {state.editArticle && (
        <>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              if (areTheTextAndTagsTheSame()) return;
              saveArticle();
            }}
          >
            Save Article{" "}
          </button>

          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              State.update({
                ...state,
                editArticle: false,
                note: undefined,
              });
            }}
          >
            Cancel{" "}
          </button>
        </>
      )}

      {/* === BUTTON - VIEW HISTORY === */}
      <span className="ps-4">
        <button
          onClick={() => {
            State.update({
              ...state,
              viewHistory: !state.viewHistory,
            });
          }}
        >
          View History
        </button>
      </span>
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
                src="mob.near/widget/TagsEditor"
                props={{
                  initialTagsObject: getTagObjectfromArray(state.article.tags),
                  placeholder: "Input tags",
                  setTagsObject: (tags) => {
                    state.tags = filterTagsFromNull(tags);
                    State.update();
                  },
                }}
              />
              <Widget
                src="mob.near/widget/SocialMarkdown"
                props={{ text: state.note }}
              />
            </div>
          </div>
        </>
      )}
      {/* MARKDOWN and TAGS list when user doesn't edit article  */}
      {!state.editArticle && (
        <>
          <div className="pt-2">
            <Widget
              src={`${authorForWidget}/widget/WikiOnSocialDB_TagList`}
              props={{ tags: state.article.tags }}
            />
          </div>
          <Markdown text={state.note || state.article.body} />
        </>
      )}
      {/* === VIEW HISTORY === */}
      {state.viewHistory && (
        <div className="mt-3 ps-5">
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
      <span className="d-inline-flex align-items-center">
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
        {/* === LIKE === */}
        <Widget
          src={`${authorForWidget}/widget/WikiOnSocialDB_Like`}
          props={{
            // notifyAccountId,
            item,
          }}
        />
      </span>
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
            highlightComment: {
              accountId: sharedCommentAuthorId,
              blockHeight: sharedCommentBlockHeight,
            },
            limit: props.commentsLimit,
            subscribe,
            raw,
            mainPartForSharingComment,
          }}
        />
      </div>
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
  </>
);
