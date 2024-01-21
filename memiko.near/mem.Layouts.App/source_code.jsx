const { Footer } = VM.require(`memiko.near/widget/mem.Components.Footer`);

let fontCss = fetch(
  "https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,600;1,600&display=swap",
);

if (!fontCss) {
  function AppLayout() {
    return <></>;
  }
  return { AppLayout };
}
fontCss = fontCss.body;

const Theme = styled.div`
  font-weight: 500;

  ${fontCss}

  font-style: normal;
  font-size: 1.2rem;

  h1 {
    font-size: 2.7rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .title-font {
    margin: 0;
    font-family: "Exo 2", sans-serif;
    font-optical-sizing: auto;
    font-weight: 600;
    font-style: normal;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
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
