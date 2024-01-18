if (!props.widgets || props.widgets.length === 0) return <></>;

const handleRemoveWidget = (linkId) => {
  props.deleteUserLink(linkId);
};

const Container = styled.div`
  display: flex;
`;

const DeleteWidgetWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1200;
`;

return (
  <Container>
    {props.widgets.map((widget) => (
      <div key={widget.linkId}>
        <Widget src={widget.src} props={widget.props} />
        {props.isEditMode ? (
          <DeleteWidgetWrapper>
            <Widget
              src="bos.dapplets.near/widget/LayoutManager.DeleteWidgetButton"
              props={{ onClick: () => handleRemoveWidget(widget.linkId) }}
            />
          </DeleteWidgetWrapper>
        ) : null}
      </div>
    ))}
  </Container>
);
