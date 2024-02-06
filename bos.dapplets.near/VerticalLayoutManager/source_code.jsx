if (!props.widgets || props.widgets.length === 0) return <></>;

const handleRemoveWidget = (linkId) => {
  props.deleteUserLink(linkId);
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const WidgetBadgeWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1200;
  background:rgba(255, 255, 255, 0.35);
  width:100%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4%;
//   backdrop-filter: blur(1px);
`;

return (
  <Container>
    {props.widgets.map((widget) => (
      <div style={{ position: "relative" }} key={widget.linkId}>
        {props.isEditMode ? (
          <WidgetBadgeWrapper
            title={`Remove ${widget.src.split("widget/").pop()}`}
            style={{
              display:
                widget.linkAuthorId === context.accountId ? "flex" : "none",
            }}
          >
            {widget.linkAuthorId === context.accountId ? (
              <Widget
                src="bos.dapplets.near/widget/LayoutManager.DeleteWidgetButton"
                props={{
                  onClick: () => handleRemoveWidget(widget.linkId),
                }}
              />
            ) : // <Widget src="bos.dapplets.near/widget/LayoutManager.LockedWidgetBadge" />
            null}
          </WidgetBadgeWrapper>
        ) : null}
        <div style={{ backdropFilter: "blur(1px)" }}>
          <Widget src={widget.src} props={widget.props} />
        </div>
      </div>
    ))}
  </Container>
);
