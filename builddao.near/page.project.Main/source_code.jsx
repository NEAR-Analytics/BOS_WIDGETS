const { id } = props;
const { getProjectMeta } = VM.require("builddao.near/widget/lib.projects") || {
  getProjectMeta: () => {},
};
const data = getProjectMeta(id);
if (!id || !data) {
  return "Loading...";
}
const profileData = {
  name: data.title,
  description: data.description,
  linktree: data.linktree,
  backgroundImage: data.backgroundImage?.image ?? data.backgroundImage,
  image: data.profileImage?.image ?? data.profileImage,
};
const profile = Social.getr(`${data.projectAccountId}/profile`);
const { Layout } = VM.require("builddao.near/widget/page.project.Layout") || {
  Layout: () => <></>,
};
const config = {
  theme: {},
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      <>
        <Layout
          profile={profileData}
          projectAccountId={data.projectAccountId}
          page={page}
          project={project}
          {...props}
        ></Layout>
      </>
    ),
    Sidebar: () => (
      <Widget
        src="builddao.near/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/builddao.near/widget/Index?page=project",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      overview: {
        path: "builddao.near/widget/page.project.tabs.Overview",
        blockHeight: "final",
        init: {
          ...props,
        },
        default: "true",
      },
      activity: {
        path: "builddao.near/widget/page.project.tabs.Discussion",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      discussion: {
        path: "builddao.near/widget/page.project.tabs.Discussion",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      tasks: {
        path: "builddao.near/widget/page.project.tabs.Task",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      code: {
        path: "builddao.near/widget/page.project.tabs.Code",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      roadmap: {
        path: "builddao.near/widget/page.project.tabs.Roadmap",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
    },
  },
};
// remove unselected tabs
if (Array.isArray(data?.tabs)) {
  Object.keys(config.router.routes).forEach((key) => {
    if (!data.tabs.includes(key)) {
      delete config.router.routes[key];
    }
  });
}
return (
  <div className="mt-3 container-xl">
    <Widget src="buildhub.near/widget/app.view" props={{ config, ...props }} />
  </div>
);
