const Wrapper = styled.div`
  .text {
    color: #f00;
  }
`;

return (
  <Wrapper>
    <div className="text">{props.post.id}</div>
  </Wrapper>
);
