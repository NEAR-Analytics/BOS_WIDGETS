const updateGeneralState = props.updateGeneralState;
const thisWidgetInlineStyles = props.allWidgetsInlineStyles.mainPage_post;
const thisWidgetClassNames = props.allWidgetsClassNames.mainPage_post;
const standardButtonStyles = props.allWidgetsInlineStyles.standardButtonStyles;
const hoveringButtonStyles = props.allWidgetsInlineStyles.hoveringButtonStyles;

const content = props.content;
const accountId = content.accountId;
const blockHeight = parseInt(content.blockHeight);

const widgetOwner = props.widgetOwner;

State.init({
  displayCommentBox: false,
  answer: "",
  hoveringElement: "",
});

let item = {
  type: "social",
  path: `${accountId}/post/main`,
  blockHeight,
};

const reposts = Social.index("repost", item);

const repostsByUsers = Object.fromEntries(
  (reposts || [])
    .filter((repost) => repost.value.type === "repost")
    .map((repost) => [repost.accountId, repost])
);

if (state.hasRepost === true) {
  repostsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
}

const hasRepost = context.accountId && !!repostsByUsers[context.accountId];

const repostSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    viewBox="0 0 24 24"
    style={thisWidgetInlineStyles.repostSvg}
  >
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="rotate(180, 12, 12), translate(0, 4)"
    />
    <path
      fill-rule="evenodd"
      d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
      transform="translate(0, 4)"
    />
  </svg>
);

const notifyAccountId = accountId;

const link = `#/mob.near/widget/MainPage.Post.Page?accountId=${accountId}&blockHeight=${blockHeight}`;

const startCommentTo = () => {
  State.update({ displayCommentBox: !state.displayCommentBox });
};

const RenderCommentInput = (blockHeight) => {
  return state.displayCommentBox ? (
    <div
      style={thisWidgetInlineStyles.commentInput.container}
      className={thisWidgetClassNames.commentInput.container}
    >
      <textarea
        style={thisWidgetInlineStyles.commentInput.textArea}
        rows="2"
        value={state.commentTextMap[blockHeight]}
        onChange={(e) => {
          State.update({ answer: e.target.value });
        }}
      />
      <CommitButton
        style={
          state.hoveringElement == "commitCommentButton"
            ? hoveringButtonStyles
            : standardButtonStyles
        }
        data={{
          index: {
            kudo: JSON.stringify(
              {
                key: "commentAnswers",
                value: {
                  commentAnswer: state.answer,
                  blockHeight,
                },
              },
              undefined,
              0
            ),
          },
        }}
        onCommit={() => {
          let ctm = state.commentTextMap;
          ctm[blockHeight] = "";
          State.update({
            commentTextMap: ctm,
            reloadData: true,
          });
        }}
        onMouseEnter={() => {
          State.update({ hoveringElement: "commitCommentButton" });
        }}
        onMouseLeave={() => {
          State.update({ hoveringElement: "" });
        }}
      >
        Comment
      </CommitButton>
    </div>
  ) : (
    ""
  );
};

/* START KudoBox */
const RenderKudoBox = (d) => {
  const text = `From @${d.accountId} Kudos ${d.value.answer} `;
  const content = { text };
  return (
    <>
      <div className={thisWidgetClassNames.headerContainer}>
        <Widget
          src={`${widgetOwner}/widget/MainPage.Post.Header`}
          props={{
            widgetOwner,
            accountId,
            blockHeight: d.blockHeight,
            link,
            postType: "post",
            flagItem: item,
          }}
        />
        <div>{/*Decorative div, do not delete*/}</div>
      </div>
      <div
        className={thisWidgetClassNames.cardContent}
        style={thisWidgetInlineStyles.cardContent}
      >
        <div style={thisWidgetInlineStyles.postContentContainer}>
          <Widget
            src="mob.near/widget/MainPage.Post.Content"
            props={{ content, raw }}
          />
        </div>
      </div>
      {d.value.url != "" && d.value.url && (
        <div
          style={thisWidgetInlineStyles.postUrl}
          className={thisWidgetClassNames.postUrl}
        >
          <span style={thisWidgetInlineStyles.postUrlSpan}>Url:</span>
          <a href={`${urlPrefix}${d.value.url}`} target="_blank">
            {d.value.url}
          </a>
        </div>
      )}
      <div
        style={thisWidgetInlineStyles.interactionButtonsContainer}
        className={thisWidgetClassNames.interactionButtonsContainer}
      >
        <Widget
          src="mob.near/widget/CommentButton"
          props={{
            onClick: startCommentTo,
          }}
        />

        <CommitButton
          style={
            state.hoveringElement == "repostButton"
              ? thisWidgetInlineStyles.repostButtonHovering
              : thisWidgetInlineStyles.repostButton
          }
          title="Repost"
          className={thisWidgetClassNames.repostButton}
          onMouseEnter={() => {
            State.update({ hoveringElement: "repostButton" });
          }}
          onMouseLeave={() => {
            State.update({ hoveringElement: "" });
          }}
          data={{
            index: {
              repost: JSON.stringify(
                {
                  key: "kudo",
                  value: {
                    type: "repost",
                    item: {
                      type: "social",
                      path: "silkking.near/widget/Kudos",
                      blockHeight: d.blockHeight,
                    },
                  },
                },
                undefined,
                0
              ),
            },
          }}
        >
          <span style={hasRepost ? thisWidgetInlineStyles.repostSvgSpan : {}}>
            {repostSvg}
          </span>
        </CommitButton>
        <div className={thisWidgetClassNames.upVoteContainer}>
          <CommitButton
            style={
              state.hoveringElement == "upVoteButton"
                ? props.allWidgetsInlineStyles.hoveringButtonStylesWithoutMargin
                : props.allWidgetsInlineStyles.standardButtonStylesWithoutMargin
            }
            onMouseEnter={() => {
              State.update({ hoveringElement: "upVoteButton" });
            }}
            onMouseLeave={() => {
              State.update({ hoveringElement: "" });
            }}
            data={{
              index: {
                kudo: JSON.stringify(
                  {
                    key: "upvote",
                    value: {
                      blockHeight: d.blockHeight,
                    },
                  },
                  undefined,
                  0
                ),
              },
            }}
          >
            Upvote
          </CommitButton>
          <span style={thisWidgetInlineStyles.upVoteCounter}>
            {d.value.upvotes} {d.value.upvotes == 1 ? "upvote" : "upvotes"}
          </span>
        </div>
        <Widget
          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/shareWidget"
          props={{
            popUpDescription: "Use this link to share the kudo",
            shareingWidget: "Kudos.Styles",
            propName: "sharedBlockHeight",
            blockHeight: d.blockHeight,
            widgetOwner,
          }}
        />
      </div>
      {RenderCommentInput(Number(d.blockHeight))}
    </>
  );
};
/* END KudoBox  */

return <>{RenderKudoBox(content)}</>;
