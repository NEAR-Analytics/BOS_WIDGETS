const children = props.children;
const fullWidth = props.fullWidth ?? "md";

let breakpoint;

switch (fullWidth) {
  case "xs":
    breakpoint = "320px";
    break;
  case "sm":
    breakpoint = "640px";
    break;
  case "md":
    breakpoint = "768px";
    break;
  case "lg":
    breakpoint = "1024px";
    break;
  case "xl":
    breakpoint = "1280px";
    break;
  default:
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
`;

const Container = styled.div`
    width: 75%;
    @media only screen and (max-width: ${breakpoint}) {
        width: 100%;
    }
`;

return (
  <Wrapper>
    <Container>{children}</Container>
  </Wrapper>
);
