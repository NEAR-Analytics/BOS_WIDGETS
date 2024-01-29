const { page, children } = props;
const { Wrapper, Container, Theme } = VM.require(
  `ndcdev.near/widget/Dashboard.Layouts.styled`,
);

const [font, setFont] = useState("");

asyncFetch("https://fonts.cdnfonts.com/css/avenir-lt-pro").then((resp) =>
  setFont(resp.body),
);

return (
  <Theme font={font}>
    <Container>
      <Widget src={`ndcdev.near/widget/Dashboard.Components.NavBar.index`} />
      {children}
      <Widget src={`ndcdev.near/widget/Dashboard.Components.Footer.index`} />
    </Container>
  </Theme>
);
