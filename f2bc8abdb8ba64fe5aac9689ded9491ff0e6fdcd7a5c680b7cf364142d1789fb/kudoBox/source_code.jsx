const d = props.d;
const index = props.index;

const commentBlockHeight = props.commentBlockHeight ?? undefined;

const tabs = props.tabs;
const oppenedTab = props.oppenedTab;

const thisWidgetInlineStyles = props.allWidgetsInlineStyles.kudos;
const thisWidgetClassNames = props.allWidgetsClassNames.kudos;

const updateGeneralState = props.updateGeneralState ?? undefined;
const upvotes = props.upvotes;

State.init({
  hoveringElement: "",
  onlyShowSharedComment: commentBlockHeight ? true : false,
  showComments: commentBlockHeight ? true : false,
});

console.log(state.onlyShowSharedComment);

const widgetOwner = props.widgetOwner;

function getAnswersContainerStyles() {
  console.log("in getAnswersContainerStyles");
  let styles = thisWidgetInlineStyles.allCommentAnswerBox.cardsContainer;

  styles["zIndex"] = `${999999999 - index}`;
  console.log("out getAnswersContainerStyles");
  return styles;
}

function getAnswerContainerStyle(c) {
  console.log("in getAnswerContainerStyle");
  let styles = thisWidgetInlineStyles.allCommentAnswerBox.cardContainer;

  if (commentBlockHeight && c.blockHeight == commentBlockHeight) {
    styles["boxShadow"] = `0px 0px 49px 1px rgba(45,255,51,0.47) inset`;
  }

  console.log("out getAnswerContainerStyle");
  return styles;
}

const RenderCommentAnswerBox = (d) => {
  console.log("in RenderCommentAnswerBox");
  return (
    <>
      {state.showComments && (
        <div style={getAnswersContainerStyles()}>
          {d.value.comments.map((c) => {
            if (
              !state.onlyShowSharedComment ||
              (state.onlyShowSharedComment &&
                c.blockHeight == commentBlockHeight)
            ) {
              return (
                <>
                  <div
                    style={getAnswerContainerStyle(c)}
                    className={
                      oppenedTab == tabs.KUDO.id
                        ? thisWidgetClassNames.allCommentAnswerBox
                            .cardContainerSingleCard
                        : thisWidgetClassNames.allCommentAnswerBox.cardContainer
                    }
                  >
                    <div
                      className={
                        thisWidgetClassNames.allCommentAnswerBox
                          .userAnswerHeader
                      }
                    >
                      <Widget
                        src="mob.near/widget/ProfileImage"
                        props={{
                          accountId: c.accountId,
                          className: "d-inline-block",
                          style:
                            thisWidgetInlineStyles.allCommentAnswerBox
                              .profileImageStyles,
                        }}
                      />
                      <a
                        style={
                          thisWidgetInlineStyles.allCommentAnswerBox
                            .commentUserNick
                        }
                        href={`#/mob.near/widget/ProfilePage?accountId=${c.accountId}`}
                      >
                        {c.accountId}
                      </a>
                      <div
                        style={
                          props.allWidgetsInlineStyles.mainPage_post
                            .followButtonContainer
                        }
                      >
                        <Widget
                          src={`${widgetOwner}/widget/FollowButton`}
                          props={{ accountId: c.accountId }}
                        />
                      </div>
                    </div>
                    <b
                      style={thisWidgetInlineStyles.allCommentAnswerBox.comment}
                    >
                      {c.value.commentAnswer}&nbsp;&nbsp;&nbsp;
                    </b>
                  </div>
                </>
              );
            }
          })}
        </div>
      )}
      {console.log("out RenderCommentAnswerBox")}
    </>
  );
};

function getKudoBoxContainerStyles() {
  console.log("in getKudoBoxContainerStyles");
  let styles = thisWidgetInlineStyles.renderKudoBox.cardContainer;

  styles["zIndex"] = `${999999999 - index}`;
  console.log("out getKudoBoxContainerStyles");
  return styles;
}

function updateStateFunction(objetc) {
  State.update(objetc);
}
console.log("start render");
return (
  <>
    <div
      style={getKudoBoxContainerStyles()}
      className={
        oppenedTab == tabs.ALL_kUDOS.id
          ? thisWidgetClassNames.renderKudoBox.cardContainer
          : thisWidgetClassNames.renderKudoBox.cardContainerSingleCard
      }
    >
      <Widget
        src={`${widgetOwner}/widget/MainPage.Post`}
        props={{
          widgetOwner,
          content: d,
          upvotes,
          updateGeneralState,
          allWidgetsInlineStyles: props.allWidgetsInlineStyles,
          allWidgetsClassNames: props.allWidgetsClassNames,
        }}
      />
      <div
        className={thisWidgetClassNames.renderKudoBox.displayHandlersContainer}
      >
        {commentBlockHeight ? (
          <input
            style={
              state.onlyShowSharedComment
                ? thisWidgetInlineStyles.renderKudoBox.switchButtonActive
                : thisWidgetInlineStyles.renderKudoBox.switchButtonInactive
            }
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={state.onlyShowSharedComment}
            key={("button", `${state.onlyShowSharedComment}`)}
            onChange={() => {
              State.update({
                onlyShowSharedComment: !state.onlyShowSharedComment,
              });
            }}
          />
        ) : (
          <div style={{ minWidth: "33%" }}>
            {/*Decorative div do not delete*/}
          </div>
        )}
        {state.onlyShowSharedComment ? (
          <Widget
            src={`${widgetOwner}/widget/showCommentsButton`}
            props={{
              thisWidgetInlineStyles,
              thisWidgetClassNames,
              fatherStateUpdate: updateStateFunction,
              showComments: state.showComments,
              d,
            }}
          />
        ) : (
          <div style={{ minWidth: "33%" }}>
            {/*Decorative div do not delete*/}
          </div>
        )}
        <div style={{ minWidth: "33%" }}>
          {/*Decorative div do not delete*/}
        </div>
      </div>

      {RenderCommentAnswerBox(d)}
    </div>
  </>
);
