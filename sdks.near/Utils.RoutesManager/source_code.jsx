

const StatefulDependency = (Store, status) => {
  return {
    prepare: () => {
      if (typeof status === "undefined") {
          Store.init({ Libraries: {} });
      } else if (!status.Libraries) {
          Store.update({ Libraries: {} });
      }
    },
  };
};



return (Store, status, routes, { page }) => {
  let parent = new StatefulDependency(Store, status);
    
  const Router = {
    ...parent,
    name: "Router",
    init: () => {
      Router.prepare();

      Store.update({
        Libraries: {
            ...status["Libraries"],
            [Router.name]: {
              routes,
              currentRoute: Router.getDefaultRoute(),
              currentView: routes[Router.getDefaultRoute()],
            }
        },
      });

      return {
        Router,
        RouterView: () => status["Libraries"][Router.name].currentView,
        Route: ({ to, children }) => (
          <a href="#" onClick={() => Router.changeRoute(to)}>
            {children}
          </a>
        ),
      };
    },
    changeRoute: (route) => {
      Store.update({
        Libraries: {
            ...status["Libraries"],
            [Router.name]: {
              ...status["Libraries"][Router.name],
              currentRoute: route in routes ? route : "home",
              currentView: route in routes ? routes[route] : routes["home"],
            },
        }
      });

      return status["Libraries"][Router.name].currentView;
    },
    getCurrentRoute: () => {
      return status["Libraries"][Router.name].currentRoute;
    },
    getView: () => {
      return status["Libraries"][Router.name].currentView;
    },
    getDefaultRoute: () => {
      return page || (routes["fallback"] ? "fallback" : null) || "home";
    },
  };

  return Router.init();
};