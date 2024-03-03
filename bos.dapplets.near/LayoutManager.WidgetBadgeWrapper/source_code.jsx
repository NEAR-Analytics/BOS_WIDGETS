const { widget, deleteUserLink } = props

const WidgetBadgeWrapper = styled.div`
  position: absolute;
  right: 0;
  z-index: 1200;
  background: rgba(255, 255, 255, 0.35);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  top: -2px;
  backdrop-filter: blur(1px);
`;

return (
  <WidgetBadgeWrapper
    className={
      widget.linkAuthorId === context.accountId
        ? "WidgetHover"
        : ""
    }
    title={
      widget.linkAuthorId === context.accountId
        ? `Remove ${widget.src.split("widget/").pop()}`
        : "disable in edit mode"
    }
    style={{
      opacity:
        widget.linkAuthorId === context.accountId ? "1" : "0",
    }}
  >
    {widget.linkAuthorId === context.accountId ? (
      <Widget
        src="bos.dapplets.near/widget/LayoutManager.DeleteWidgetButton"
        props={{
          onClick: () => deleteUserLink(widget.linkId),
        }}
      />
    ) : // <Widget src="bos.dapplets.near/widget/LayoutManager.LockedWidgetBadge" />
    null}
  </WidgetBadgeWrapper>
)