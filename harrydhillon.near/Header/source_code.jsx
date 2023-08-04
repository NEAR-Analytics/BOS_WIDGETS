const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 4.5em;
  gap: 0.625em;
  background: #000;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image:url("${
    props.imgUrl ??
    "https://images.unsplash.com/flagged/photo-1562599838-8cc871c241a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGRpZ2l0YWx8ZW58MHx8MHx8fDA%3D"
  }");

  h1 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 2.5em;
    line-height: 1.25em;
    color: #fff;
  }

  p {
    font-family: "Mona Sans";
    font-style: normal;
    font-weight: 400;
    font-size: 1.25em;
    line-height: 140%;
    color: #00ec97;
    max-width: 13em;
  }
`;

return (
  <Container>
    <h1>{props.title ?? "Title"}</h1>
  </Container>
);
