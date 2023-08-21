const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  min-height: 500px;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: ${props.rtl ? "row" : "row-reverse"};
  }
`;

// const HeaderContainer = styled.div`
//   height: 70px;
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding-inline: 8px;
//   background-color: blue;
// `;

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
        <ItemImageContainer style={{ backgroundColor: "green" }}>
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

        <ItemImageContainer style={{ backgroundColor: "green" }}>
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
