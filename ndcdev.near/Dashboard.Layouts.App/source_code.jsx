const { page, children } = props;
const { Wrapper, Container, Theme } = VM.require(
  `ndcdev.near/widget/Dashboard.Layouts.styled`,
);

if (!Wrapper || !Container || !Theme)
  <Widget src="flashui.near/widget/Loading" />;

const [font, setFont] = useState("");

asyncFetch("https://fonts.cdnfonts.com/css/avenir-lt-pro").then((resp) =>
  setFont(resp.body),
);

return (
  <Theme font={font}>
    <Container>
      <Widget src={`ndcdev.near/widget/Dashboard.Components.NavBar.index`} />
      {children}
    </Container>
  </Theme>
);
