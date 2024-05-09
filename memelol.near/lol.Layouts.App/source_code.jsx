const { Footer } = VM.require(`memelol.near/widget/lol.Components.Footer`);

let fontCss = fetch("https://fonts.cdnfonts.com/css/bagel-fat-one");

if (!fontCss) {
  function AppLayout() {
    return <></>;
  }
  return { AppLayout };
}
fontCss = fontCss.body;

const Theme = styled.div`
  font-weight: 500;

  .font {
    font-family: "Bagel Fat One", sans-serif;
    font-weight: 400;
  }
  ${fontCss}

  font-style: normal;
  font-size: 1.5rem;

  h1 {
    font-size: 3rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

function AppLayout({ pageProps, children }) {
  return (
    <Theme>
      <Container>
        <Content>{children}</Content>
        <Footer />
      </Container>
    </Theme>
  );
}

return { AppLayout };
