const Wrapper = styled.div`
  padding: 4px;
  border: 1px solid #f00;
`;

return (
  <Wrapper>
    {props.widgets.map((widget) => (
      <Widget src={widget.src} props={widget.props} />
    ))}
  </Wrapper>
);
