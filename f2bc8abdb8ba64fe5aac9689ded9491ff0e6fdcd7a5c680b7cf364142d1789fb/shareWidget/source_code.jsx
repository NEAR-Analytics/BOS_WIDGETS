let blockHeightToShare = props.blockHeight;
let shareingWidget = props.shareingWidget ?? "pollQuestionMasterHandler";
let propName = props.propName ?? "sharedBlockHeight";

let popUpDescription =
  props.popUpDescription ??
  "Use this link to share the poll with your participants";

let widgetOwner =
  props.widgetOwner ??
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

let thisWidgetInlineStyles = props.allWidgetsInlineStyles.shareWidget ?? {
  i: { cursor: "pointer" },
  showShareOptionsContainer: {
    position: "absolute",
    left: "1rem",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #F0F4F7",
    boxShadow: "0px 8px 28px rgba(43, 68, 106, 0.05)",
    borderRadius: "28px",
    zIndex: "1",
    width: "40vw",
    maxWidth: "100%",
    minWidth: "240px",
    padding: "1rem",
    border: "1.5px solid #F0F4F7",
  },
  closeIcon: { cursor: "pointer" },
  popUpDescription: {
    color: "#474D55",
    letterSpacing: "-0.01em",
  },
  showLinkShared: {
    backgroundColor: "#F2F6FA",
    padding: "1rem 2rem",
    borderRadius: "17px",
  },
  linkShared: { color: "#0065FF", wordWrap: "anywhere" },
  clipboardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "0.5rem",
    minWidth: "2.5rem",
  },
  clipBoardIconCopied: {
    color: "#0065FF",
    transition: "color 0.3s linear",
    cursor: "pointer",
  },
  clipBoardIconNotCopied: {
    transition: "color 0.3s linear",
    cursor: "pointer",
    color: "black",
  },
  copiedFeedback: { fontSize: "0.7rem" },
};

const thisWidgetClassNames = props.allWidgetsClassNames.shareWidget ?? {
  i: "bi bi-share",
  closePopUpContainer: "d-flex flex-row-reverse",
  closeIcon: "bi bi-x",
  showLinkShared: "d-flex justify-content-between align-items-center",
  clipboardIcon: "bi-clipboard",
  copiedFeedback: "text-secondary",
};

State.init({
  showShareOptions: false,
  linkCopied: false,
});

function getLink() {
  if (
    typeof blockHeightToShare === "number" ||
    blockHeightToShare.length == 1
  ) {
    return `https://near.social/#/${widgetOwner}/widget/${shareingWidget}?${propName}=${blockHeightToShare}`;
  } else {
    let link = `https://near.social/#/${widgetOwner}/widget/${shareingWidget}?`;
    for (let i = 0; i < blockHeightToShare.length; i++) {
      if (i != 0) {
        link += "&";
      }
      link += `${propName[i]}=${blockHeightToShare[i]}`;
    }
    return link;
  }
}

return (
  <>
    <i
      style={thisWidgetInlineStyles.i}
      className={thisWidgetClassNames.i}
      onClick={() => {
        State.update({ showShareOptions: !state.showShareOptions });
      }}
    ></i>
    {state.showShareOptions && (
      <div style={thisWidgetInlineStyles.showShareOptionsContainer}>
        <div className={thisWidgetClassNames.closePopUpContainer}>
          <i
            className={thisWidgetClassNames.closeIcon}
            style={thisWidgetInlineStyles.closeIcon}
            onClick={() =>
              State.update({ showShareOptions: false, linkCopied: false })
            }
          ></i>
        </div>
        <h3>Share</h3>
        <p style={thisWidgetInlineStyles.popUpDescription}>
          {popUpDescription}
        </p>
        <div
          className={thisWidgetClassNames.showLinkShared}
          style={thisWidgetInlineStyles.showLinkShared}
        >
          <span style={thisWidgetInlineStyles.linkShared}>{getLink()}</span>
          <div style={thisWidgetInlineStyles.clipboardContainer}>
            <i
              className={thisWidgetClassNames.clipboardIcon}
              style={
                state.linkCopied
                  ? thisWidgetInlineStyles.clipBoardIconCopied
                  : thisWidgetInlineStyles.clipBoardIconNotCopied
              }
              onClick={() => {
                clipboard.writeText(getLink());
                State.update({ linkCopied: true });
              }}
            ></i>
            {state.linkCopied && (
              <span
                className={thisWidgetClassNames.copiedFeedback}
                style={thisWidgetInlineStyles.copiedFeedback}
              >
                Copied!
              </span>
            )}
          </div>
        </div>
      </div>
    )}
  </>
);
