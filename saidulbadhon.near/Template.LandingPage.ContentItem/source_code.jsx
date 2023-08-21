const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    min-height: 500px;
    height: 100%;
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

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    flex: 1;
`;

return (
  <Container>
    <ImageContainer>
      <img
        style={{
          maxHeight: 400,
          //   width: "100%",
          objectFit: "cover",
          aspectRatio: 1 / 1,
        }}
        src={props.image}
        alt="art"
      />
    </ImageContainer>

    <div style={{ flex: 1 }}>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
    </div>
  </Container>
);
