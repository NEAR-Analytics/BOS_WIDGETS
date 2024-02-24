const accountId = props.accountId ?? context.accountId ?? "hack.near";

const defaultRoutes = {
  main: {
    path: "hack.near/widget/page.index",
    blockHeight: "final",
    init: {
      name: "App",
    },
  },
  social: {
    path: "hack.near/widget/page.feed",
    blockHeight: "final",
    init: {
      name: "Discussion",
    },
  },
  docs: {
    path: "hack.near/widget/page.docs",
    blockHeight: "final",
    init: {
      name: "Guide",
    },
  },
};

const [appId, setAppId] = useState("app");
const [routes, setRoutes] = useState(props.routes ?? defaultRoutes);
const [routePath, setRoutePath] = useState("");
const [pageId, setPageId] = useState("");
const [buttonText, setButtonText] = useState(pageId);
const [name, setName] = useState("");

State.init({
  image,
});

const isValid = Social.get(`${routePath}/**`);

const handleCreate = () => {
  const routesConfigObject = Object.keys(routes).reduce((obj, routeKey) => {
    const route = routes[routeKey];
    const pathSegments = route.path.split("/");
    const keyName = pathSegments[pathSegments.length - 1] || routeKey;
    obj[routeKey] = {
      path: `${accountId}/widget/${keyName}`,
      blockHeight: route.blockHeight,
      init: route.init,
    };
    return obj;
  }, {});

  const routesObject = Object.keys(routes).reduce((obj, routeKey) => {
    const route = routes[routeKey];
    const pathSegments = route.path.split("/");
    const keyName = pathSegments[pathSegments.length - 1] || routeKey;

    obj[keyName] = {
      "": Social.get(`${route.path}`),
    };
    return obj;
  }, {});

  Social.set({
    widget: {
      [appId]: {
        "": Social.get("hack.near/widget/app"),
      },
      ...routesObject,
    },
    project: {
      [appId]: {
        metadata: {
          name,
          image: state.image,
          tags: {
            build: "",
          },
        },
        config: {
          type: "app",
          routes: routesConfigObject,
        },
      },
    },
  });
};

const addRoute = (newRouteKey, newRouteData) => {
  setRoutes((prevRoutes) => ({
    ...prevRoutes,
    [newRouteKey]: newRouteData,
  }));
};

const removeRoute = (routeKey) => {
  setRoutes((prevRoutes) => {
    const updatedRoutes = { ...prevRoutes };
    delete updatedRoutes[routeKey];
    return updatedRoutes;
  });
};

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
    <h3 className="m-1 p-1">Build App</h3>

    <div className="row m-1 p-1">
      <div className="col-5">
        <div className="m-2">
          <h5 className="mb-2">Name</h5>
          <div className="mb-3 p-1">
            <input
              type="text"
              placeholder="new project id"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              type="text"
              placeholder="new page id"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
            />
            <input
              type="text"
              placeholder="button text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
            />
          </div>
          <div className="d-flex flex-row gap-3 p-1">
            <input
              type="text"
              placeholder="widget source path"
              value={routePath}
              onChange={(e) => setRoutePath(e.target.value)}
            />
            <button
              className="btn btn-dark"
              disabled={!isValid || pageId === ""}
              onClick={() => {
                const newRouteData = {
                  path: routePath,
                  blockHeight: "final",
                  init: {
                    name: buttonText || pageId,
                  },
                };
                addRoute(pageId, newRouteData);
              }}
            >
              +
            </button>
          </div>
        </div>

        <div>
          {Object.keys(routes).map((key) => {
            const route = routes[key];
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
      <Widget src="hack.near/widget/app" props={{ routes }} />
    </div>
  </>
);
