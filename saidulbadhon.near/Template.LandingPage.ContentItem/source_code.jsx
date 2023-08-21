const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  min-height: 500px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: ${props.rtl ? "column" : "column-reverse"};
  }
`;

const ItemImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ItemTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

return (
  <ItemContainer>
    {props.rtl ? (
      <>
        <ItemImageContainer>
          <img
            style={{
              maxHeight: 400,
              objectFit: "cover",
              aspectRatio: 1 / 1,
            }}
            src={props.image}
            alt="art"
          />
        </ItemImageContainer>

        <ItemTextContainer>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </ItemTextContainer>
      </>
    ) : (
      <>
        <ItemTextContainer>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
        </ItemTextContainer>

        <ItemImageContainer>
          <img
            style={{
              maxHeight: 400,
              objectFit: "cover",
              aspectRatio: 1 / 1,
            }}
            src={props.image}
            alt="art"
          />
        </ItemImageContainer>
      </>
    )}
  </ItemContainer>
);
