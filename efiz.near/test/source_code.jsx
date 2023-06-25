const Container = styled.div`
  height: 100vh;
`;

return (
  <Container>
    <Camera
      onCapture={(src) => {
        console.log("hello");
        console.log(src);
      }}
    />
  </Container>
);
