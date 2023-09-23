const css = fetch(
  "https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
  // https://fonts.google.com/specimen/Roboto+Mono?preview.size=18&query=mono
).body;

if (!css) {
  return;
}

const Theme = styled.div`
 {
    font-family: 'Roboto Mono';
}
  ${css}
`;

return (
  <Theme>
    <Widget src={`harmonic1.near/widget/Typography.DMSans`} loading={<></>} />
    <Widget src="devgovgigs.near/widget/gigs-board.pages.Feed" />
  </Theme>
);
