const d = props.d;
const index = props.index;

const commentSharedBlockHeight = props.commentSharedBlockHeight ?? undefined;

const tabs = props.tabs;
const oppenedTab = props.oppenedTab;

const thisWidgetInlineStyles = props.allWidgetsInlineStyles.kudos;
const thisWidgetClassNames = props.allWidgetsClassNames.kudos;

const updateGeneralState = props.updateGeneralState;
const upvotes = props.upvotes;

State.init({
  hoveringElement: "",
  onlyShowShared: commentSharedBlockHeight ? true : false,
  showComments: false,
});

const widgetOwner = props.widgetOwner;

function getAnswersContainerStyles() {
  let styles = thisWidgetInlineStyles.allCommentAnswerBox.cardsContainer;

  styles["zIndex"] = `${999999999 - index}`;
  return styles;
}

function getAnswerContainerStyle() {
  let style = thisWidgetInlineStyles.allCommentAnswerBox.cardContainer;

  if (d.blockHeight == commentSharedBlockHeight) {
    styles["boxShadow"] = `0px 0px 49px 1px rgba(45,255,51,0.47) inset`;
  }

  return style;
}
console.log(d);
const RenderCommentAnswerBox = (d) => {
  return (
    <>
      {state.showComments && (
        <div style={getAnswersContainerStyles()}>
          {d.value.comments.map((c) => {
            {
              return (
                <>
                  <div
                    style={getAnswerContainerStyle()}
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

      {!state.onlyShowShared && (
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
      )}
      {RenderCommentAnswerBox(d)}
    </div>
  </>
);
