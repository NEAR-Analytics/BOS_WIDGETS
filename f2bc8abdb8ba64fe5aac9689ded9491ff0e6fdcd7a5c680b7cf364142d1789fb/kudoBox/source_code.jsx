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

const widgetOwner = props.widgetOwner;

const RenderCommentAnswerBox = (d) => {
  return (
    <>
      {state.showComments && (
        <div
          style={
            state.display == tabs.KUDO.id && onlyShowSharedComment
              ? thisWidgetInlineStyles.allCommentAnswerBox.visibleCardsContainer
              : thisWidgetInlineStyles.allCommentAnswerBox.cardsContainer
          }
          key={`comment-answer-box-${state.onlyShowSharedComment}-${state.showComments}`}
        >
          {d.value.comments.map((c) => {
            if (
              !state.onlyShowSharedComment ||
              (state.onlyShowSharedComment &&
                c.blockHeight == commentBlockHeight)
            ) {
              return (
                <>
                  <div
                    style={
                      thisWidgetInlineStyles.allCommentAnswerBox.cardContainer
                    }
                    key={`${c.blockHeight}-${state.onlyShowSharedComment}-${state.showComments}`}
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
                    <div
                      className={
                        thisWidgetClassNames.allCommentAnswerBox
                          .commentContainer
                      }
                    >
                      <b
                        style={
                          thisWidgetInlineStyles.allCommentAnswerBox.comment
                        }
                      >
                        {c.value.commentAnswer}&nbsp;&nbsp;&nbsp;
                      </b>
                      <div
                        style={
                          thisWidgetInlineStyles.allCommentAnswerBox
                            .shareWidgetContainer
                        }
                      >
                        <Widget
                          src="f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/shareWidget"
                          props={{
                            popUpDescription:
                              "Use this link to share this comment",
                            shareingWidget: "Kudos.Styles",
                            propName: [
                              "sharedBlockHeight",
                              "commentSharedBlockHeight",
                            ],
                            blockHeight: [d.blockHeight, c.blockHeight],
                            widgetOwner,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            }
          })}
        </div>
      )}
    </>
  );
};

function getKudoBoxContainerStyles() {
  let styles = thisWidgetInlineStyles.renderKudoBox.cardContainer;

  styles["zIndex"] = `${999999999 - index}`;
  return styles;
}

function updateStateFunction(objetc) {
  State.update(objetc);
}

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
        style={thisWidgetInlineStyles.renderKudoBox.displayHandlersContainer}
        className={thisWidgetClassNames.renderKudoBox.displayHandlersContainer}
      >
        {commentBlockHeight ? (
          <div
            style={thisWidgetInlineStyles.renderKudoBox.switchButtonContainer}
          >
            <span>Show all comments</span>
            <input
              style={
                state.onlyShowSharedComment
                  ? thisWidgetInlineStyles.renderKudoBox.switchButtonInactive
                  : thisWidgetInlineStyles.renderKudoBox.switchButtonActive
              }
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={!state.onlyShowSharedComment}
              key={
                "switch-button-" +
                `${!state.onlyShowSharedComment ? "false" : "true"}`
              }
              onChange={() => {
                State.update({
                  onlyShowSharedComment: !state.onlyShowSharedComment,
                  showComments: true,
                });
              }}
            />
          </div>
        ) : (
          <div style={{ width: "33%" }}>{/*Decorative div do not delete*/}</div>
        )}
        <div
          style={thisWidgetInlineStyles.renderKudoBox.commentButtonBigContainer}
        >
          {!state.onlyShowSharedComment ? (
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
            <div>{/*Decorative div do not delete*/}</div>
          )}
        </div>

        <div style={{ width: "33%", minHeight: "57px" }}>
          {/*Decorative div do not delete*/}
        </div>
      </div>

      {RenderCommentAnswerBox(d)}
    </div>
  </>
);
