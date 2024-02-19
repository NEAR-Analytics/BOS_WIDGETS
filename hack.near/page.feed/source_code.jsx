const { currentPath, page, ...passProps } = props;

const { routes } = Social.getr("hack.near/widget/page.feed/config/routes") ?? {
  type: "app",
  routes: {
    guide: {
      path: "buildhub.near/widget/Resources",
      blockHeight: "final",
      init: {
        name: "Guide",
        icon: "bi-map",
        mdPath:
          "https://raw.githubusercontent.com/NEARBuilders/gateway/main/resources.md",
      },
    },
  },
};

const { SidebarLayout } = VM.require("apps.near/widget/template.sidebar") || {
  SidebarLayout: () => <></>,
};

if (!page) page = Object.keys(routes)[0] || "main";

const Root = styled.div``;

function Router({ active, routes }) {
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
      return <p>ERROR: NOTHING FOUND</p>;
    }
  }

  return (
    <div key={active}>
      <Widget src={src} props={{ ...passProps, ...defaultProps }} />
    </div>
  );
}

const Container = styled.div`
  // display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Root>
    <Container>
      <SidebarLayout currentPath={currentPath} page={page} routes={routes}>
        <Content>
          <Router active={page} routes={routes} />
        </Content>
      </SidebarLayout>
    </Container>
  </Root>
);
