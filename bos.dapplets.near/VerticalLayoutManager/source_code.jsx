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
`;

return (
  <Container>
    {props.widgets.map((widget) => (
      <div key={widget.linkId}>
        {props.isEditMode ? (
          <WidgetBadgeWrapper>
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
        <Widget src={widget.src} props={widget.props} />
      </div>
    ))}
  </Container>
);
