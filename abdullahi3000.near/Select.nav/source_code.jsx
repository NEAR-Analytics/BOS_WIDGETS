const { page, tab, ...passProps } = props;

const { routes } = VM.require("abdullahi3000.near/widget/config.nav") ?? {
  routes: {},
};

const { AppLayout } = VM.require(
  "abdullahi3000.near/widget/select.template.AppLayout"
) || {
  AppLayout: () => <></>,
};

if (!page) page = Object.keys(routes)[0] || "home";

function Router({ active, routes }) {
  // this may be converted to a module at devs.near/widget/Router
  const routeParts = active.split(".");

  let currentRoute = routes;
  let src = "";
  let defaultProps = {};

  for (let part of routeParts) {
    if (currentRoute[part]) {
      currentRoute = currentRoute[part];
      src = currentRoute.path;

      if (currentRoute.init) {
        defaultProps = { ...defaultProps, ...currentRoute.init };
      }
    } else {
      // Handle 404 or default case for unknown routes
      return <p>404 Not Found</p>;
    }
  }
}

const Container = styled.div`
  display: flex;
  height: 100%;
  font-family: InterVariable, sans-serif;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Container>
    <AppLayout page={page} routes={routes} {...props}>
      <Content>
        <Router active={page} routes={routes} />
      </Content>
    </AppLayout>
  </Container>
);
