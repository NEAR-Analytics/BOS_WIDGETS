function AppLayout({ pageProps, children }) {
  return (
    <Theme>
      <Container>
        <Content>{children}</Content>
      </Container>
    </Theme>
  );
}

return { AppLayout };
