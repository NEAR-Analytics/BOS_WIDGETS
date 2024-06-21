const { title, body, style, config } = props;

const CardsContainer = styled.div`
  border-radius: 10px;
  background: var(--agg-bg-color, #151718);

  padding: 18px 0;
`;

const CardsTitle = styled.div`
  color: white;

  font-size: 14px;
  font-weight: 800;

  padding: 0 14px;
`;

return (
  <CardsContainer style={style}>
    <CardsTitle>{title}</CardsTitle>
    {body}
  </CardsContainer>
);
