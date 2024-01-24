return (Store, status, routes, { page }) => {
  const Router = {
    name: "Router",
    init: () => {
      Store.init({
        [Router.name]: {
          routes,
          currentRoute: Router.getDefaultRoute(),
          currentView: routes[Router.getDefaultRoute()],
        },
      });

      return {
        Router,
        RouterView: () => status[Router.name].currentView,
        Route: ({ to, children }) => (
          <a href="#" onClick={() => Router.changeRoute(to)}>
            {children}
          </a>
        ),
      };
    },
    changeRoute: (route) => {
      Store.update({
        [Router.name]: {
          ...status[Router.name],
          currentRoute: route in routes ? route : "home",
          currentView: route in routes ? routes[route] : routes["home"],
        },
      });

      return status[Router.name].currentView;
    },
    getCurrentRoute: () => {
      return status[Router.name].currentRoute;
    },
    getView: () => {
      return status[Router.name].currentView;
    },
    getDefaultRoute: () => {
      return page || (routes["fallback"] ? "fallback" : null) || "home";
    },
  };

  return Router.init();
};
