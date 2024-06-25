const config = {
  theme: {},
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "sidebar",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => <></>,
    Sidebar: () => (
      <Widget
        src="builddao.near/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/builddao.near/widget/Index?page=projects",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      allProjects: {
        path: "builddao.near/widget/page.projects.List",
        blockHeight: "final",
        init: {
          name: "All Projects",
          icon: "bi bi-text-left",
        },
        default: true,
      },
      myProjects: {
        path: "builddao.near/widget/page.projects.MyProjects",
        blockHeight: "final",
        init: {
          name: "My Projects",
          icon: "bi bi-star",
        },
      },
      watchList: {
        path: "builddao.near/widget/page.projects.Watchlist",
        blockHeight: "final",
        init: {
          name: "Watchlist",
          icon: "bi bi-eye",
        },
      },
      involvedProjects: {
        path: "builddao.near/widget/page.projects.Involved",
        blockHeight: "final",
        init: {
          name: "Projects Involved",
          icon: "bi bi-journal-text",
        },
      },
      editor: {
        path: "builddao.near/widget/page.projects.Editor",
        blockHeight: "final",
        init: {
          name: "Create Project",
        },
        hide: true,
      },
      potlockImport: {
        path: "builddao.near/widget/page.projects.PotlockImport",
        blockHeight: "final",
        init: {
          name: "Import Project",
        },
        hide: true,
      },
    },
  },
};
return (
  <div className="mt-3 container-xl">
    <Widget src="buildhub.near/widget/app.view" props={{ config, ...props }} />
  </div>
);
