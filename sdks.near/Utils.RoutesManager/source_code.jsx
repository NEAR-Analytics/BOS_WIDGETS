const $ = VM.require("sdks.near/widget/Loader");
const { StatefulDependency } = $("@sdks/abstracts");

const RoutesManager = (Store, status, routes, { page }) => {
  const Router = {
    ...StatefulDependency(Store, status),
    name: "Router",
    init: () => {
      if (!Router.get(Router.name, "initialized")) {
        Router.initDependency(Router.name, {
          state: {
            routes,
            currentRoute: Router.getDefaultRoute(),
            currentView: routes[Router.getDefaultRoute()],
          },
        });

        Router.set(Router.name, "initialized", true);
      }

      return {
        Router,
        RouterView: () => Router.get(Router.name, "state").currentView || null,
        Route: ({ to, children }) => (
          <a href="#" onClick={() => Router.changeRoute(to)}>
            {children}
          </a>
        ),
      };
    },
    changeRoute: (route) => {
      Router.set(Router.name, "state", {
        ...Router.get(Router.name, "state"),
        currentRoute: route in routes ? route : "home",
        currentView: route in routes ? routes[route] : routes["home"],
      });

      return Router.get(Router.name, "state").currentRoute;
    },
    getCurrentRoute: () => {
      return Router.get(Router.name, "state").currentRoute || null;
    },
    getView: () => {
      return Router.get(Router.name, "state").currentView || null;
    },
    getDefaultRoute: () => {
      return page || (routes["fallback"] ? "fallback" : null) || "home";
    },
  };

  return Router.init();
};

return RoutesManager;
