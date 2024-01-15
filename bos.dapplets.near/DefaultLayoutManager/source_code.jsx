if (!props.widgets || props.widgets.length === 0) return <></>;

const Wrapper = styled.div`
    display: flex;
`;

return (
  <Wrapper>
    {props.widgets.map((widget, i) => (
      <Widget key={i} src={widget.src} props={widget.props} />
    ))}
  </Wrapper>
);
