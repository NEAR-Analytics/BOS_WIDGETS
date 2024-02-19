const { page, tab, ...passProps } = props;

const routes = props.routes ?? {
  main: {
    path: "hack.near/widget/page.index",
    blockHeight: "final",
    init: {
      name: "View",
    },
  },
  build: {
    path: "hack.near/widget/page.build",
    blockHeight: "final",
    init: {
      name: "Build",
    },
  },
  social: {
    path: "hack.near/widget/page.feed",
    blockHeight: "final",
    init: {
      name: "Learn",
    },
  },
};

const { MainLayout } = VM.require("apps.near/widget/template.main") || {
  MainLayout: () => <></>,
};

if (!page) page = Object.keys(routes)[0] || "root";

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
      return <p>NOTHING FOUND</p>;
    }
  }

  return (
    <div key={active}>
      <Widget
        src={src}
        props={{
          currentPath: `/apps.near/widget/project?page=${page}`,
          page: tab,
          ...passProps,
          ...defaultProps,
        }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Container>
    <MainLayout page={page} routes={routes} {...props}>
      <Content>
        <Router active={page} routes={routes} />
      </Content>
    </MainLayout>
  </Container>
);
