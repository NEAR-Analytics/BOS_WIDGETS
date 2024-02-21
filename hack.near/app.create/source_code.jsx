const accountId = props.accountId ?? context.accountId;

const defaultRoutes = Social.getr("every.near/widget/app/config/routes") ?? {
  main: {
    path: "hack.near/widget/page.index",
    blockHeight: "final",
    init: {
      name: "Home",
    },
  },
  docs: {
    path: "hack.near/widget/page.docs",
    blockHeight: "final",
    init: {
      name: "Docs",
    },
  },
  social: {
    path: "hack.near/widget/page.feed",
    blockHeight: "final",
    init: {
      name: "Feed",
    },
  },
};

State.init({
  name,
  routes: props.routes ?? defaultRoutes,
  routePath: "",
  pageId: "",
  buttonText: "",
});

const { AppLayout } = VM.require("hack.near/widget/template.main") || {
  AppLayout: () => <></>,
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const handleCreate = () =>
  Social.set({
    widget: {
      app: {
        "": `const { page, tab, ...passProps } = props; const routes = props.routes ?? {
            main: {
              path: "${context.accountId}/widget/page.index",
              blockHeight: "final",
              init: {
                name: "Home",
              },
            },
            docs: {
              path: "${context.accountId}/widget/page.docs",
              blockHeight: "final",
              init: {
                name: "Docs",
              },
            },
            social: {
              path: "${context.accountId}/widget/page.feed",
              blockHeight: "final",
              init: {
                name: "Activity",
              },
            },
          };

          const { AppLayout } = VM.require("hack.near/widget/template.main") || {
            AppLayout: () => <></>,
          };

          if (!page) page = Object.keys(routes)[0] || "main";

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
                    currentPath: "/${context.accountId}/widget/app?page=\${page}",
                    page: tab,
                    ...passProps,
                    ...defaultProps,
                  }}
                />
              </div>
            );
          }

          const Container = styled.div\`
            display: flex;
            height: 100%;
          \`;

          const Content = styled.div\`
            width: 100%;
            height: 100%;
          \`;

          return (
            <Container>
              <AppLayout page={page} routes={routes} {...props}>
                <Content>
                  <Router active={page} routes={routes} />
                </Content>
              </AppLayout>
            </Container>
          )`,
      },
      "page.index": {
        "": `const { Button } = VM.require("buildhub.near/widget/components");
          const imageUrl =
            props.imageUrl ?? ${
              JSON.stringify(state.image.url) ??
              "https://builders.mypinata.cloud/ipfs/QmQmKGGJXhkhGrTbE4MgJ3G1wUUu8eo7mNKwRSCB5tihCw"
            };

          const HeaderContainer = styled.div\`
            width: 100%;
            position: relative;

            padding: 9.375rem 3rem;

            @media screen and (max-width: 768px) {
              padding: 9.375rem 1.5rem;
            }
          \`;

          const Logo = styled.img\`
            height: 55px;
            object-fit: cover;
            margin: 8px;
          \`;

          const Content = styled.div\`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2.5rem;

            margin: 0 auto;
          \`;

          return (
            <>
              <HeaderContainer>
                <Content>
                  <Logo src={imageUrl} />
                  <Button variant="primary">
                    <a
                      style={{
                        textDecoration: "none",
                        color: "#000",
                      }}
                      href={\`{
                        props.buttonLink ?? "https://nearbuilders.org"
                      }\`}
                    >
                      <b>{props.buttonText ?? "START"}</b>
                    </a>
                  </Button>
                </Content>
              </HeaderContainer>
              <Widget src="hack.near/widget/src.footer" />
            </>
          );`,
      },
      "page.docs": {
        "": `const { currentPath, page, ...passProps } = props;
          const { routes } = Social.getr("${context.accountId}/widget/page.docs/config/routes") ?? {
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

          const Container = styled.div\`
            height: 100%;
          \`;

          const Content = styled.div\`
            width: 100%;
            height: 100%;
          \`;

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
          );`,
      },
      "page.feed": {
        "": `const { currentPath, page, ...passProps } = props;
          const { Post } = VM.require("buildhub.near/widget/components") || {
            Post: () => <></>,
          };

          function formatDate(date) {
            const options = { year: "numeric", month: "short", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
          }

          const { routes } = Social.getr("${context.accountId}/widget/page.feed/config/routes") ?? {
            type: "app",
            routes: {
              all: {
                path: "hack.near/widget/feed",
                blockHeight: "final",
                init: {
                  name: "All",
                  icon: "bi-list",
                  requiredHashtags: ["build"],
                },
              },
              events: {
                path: "buildhub.near/widget/events.Calendar",
                blockHeight: "final",
                init: {
                  name: "Events",
                  icon: "bi-calendar",
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

          const Container = styled.div\`
            height: 100%;
          \`;

          const Content = styled.div\`
            width: 100%;
            height: 100%;
          \`;

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
          );`,
      },
      metadata: {
        name: state.name,
        image: state.image,
        tags: {
          build: "",
        },
      },
      config: {
        type: "app",
        routes: state.routes,
      },
    },
  });

function addRoute(newRouteKey, newRouteData) {
  State.update({
    routes: { ...state.routes, [newRouteKey]: newRouteData },
  });
}

function removeRoute(routeKey) {
  const updatedRoutes = { ...state.routes };
  delete updatedRoutes[routeKey];

  State.update({
    routes: updatedRoutes,
  });
}

const isValid = Social.get(`${state.routePath}/**`);

const routeData = {
  [state.pageId]: {
    path: [state.routePath],
    blockHeight: "final",
    init: {
      name: [state.buttonText ?? state.pageId],
    },
  },
};

return (
  <>
    <div className="row">
      <div className="col-5">
        <div className="m-2">
          <h5 className="mb-2">Name</h5>
          <div className="mb-3 p-1">
            <input type="text" placeholder="unique title" value={state.name} />
          </div>
          <h5 className="mb-2">Logo</h5>

          <div className="p-1">
            <Widget
              src="mob.near/widget/ImageEditorTabs"
              props={{
                image: state.image,
                onChange: (image) => State.update({ image }),
              }}
            />
          </div>
        </div>
      </div>
      <div className="col-7">
        <div className="m-2">
          <h5 className="mb-2">Routes</h5>

          <div className="d-flex flex-row gap-3 p-1">
            <input
              placeholder="page ID"
              onChange={(e) => State.update({ pageId: e.target.value })}
            />
            <input
              placeholder="button text"
              onChange={(e) => State.update({ buttonText: e.target.value })}
            />
          </div>
          <div className="d-flex flex-row gap-3 p-1">
            <input
              placeholder="source path"
              onChange={(e) => State.update({ routePath: e.target.value })}
            />
            <button
              className="btn btn-dark"
              disabled={!isValid || state.pageId == ""}
              onClick={() => {
                const newRouteData = {
                  path: state.routePath,
                  blockHeight: "final",
                  init: {
                    name: state.buttonText || state.pageId,
                  },
                };
                addRoute(state.pageId, newRouteData);
              }}
            >
              +
            </button>
          </div>
        </div>

        <div>
          {Object.keys(state.routes).map((key) => {
            const route = state.routes[key];
            return (
              <div className="d-flex m-2 p-1 justify-content-between align-items-center">
                <Widget
                  src="hack.near/widget/template.inline"
                  props={{ src: route.path }}
                />
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeRoute(key)}
                >
                  X
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <div className="m-2">
      <button
        style={{ width: "100%" }}
        className="btn btn-success m-1 mb-3"
        disabled={!context.accountId}
        onClick={handleCreate}
      >
        Launch
      </button>
    </div>
    <div className="m-2">
      <h5>Preview</h5>
      <hr />
      <Widget src="hack.near/widget/app" props={{ routes: state.routes }} />
    </div>
  </>
);
