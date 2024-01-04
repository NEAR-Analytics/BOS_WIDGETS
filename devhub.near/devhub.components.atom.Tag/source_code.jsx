




function Tag(props) {
  const { black, tag } = props;

  const Span = styled.span`
    color: ${black ? "#818181" : "#00ec97"};
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 125% */
  `;

  return <Span>{tag}</Span>;
}

return Tag(props, context);