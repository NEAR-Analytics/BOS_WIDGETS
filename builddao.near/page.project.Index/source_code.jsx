const { id } = props;
const { getProjectMeta, getProjectIdFromPath } = VM.require(
  "builddao.near/widget/lib.projects"
) || {
  getProjectMeta: () => {},
  getProjectIdFromPath: () => {},
};
const data = getProjectMeta(id);
if (!id || !data) {
  return "Loading...";
}
const { Layout } = VM.require("builddao.near/widget/page.project.Layout") || {
  Layout: () => <></>,
};
const projectId = getProjectIdFromPath(id);
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
          currentRoute: `/builddao.near/widget/Index?page=project&id=${props.id}`,
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
        label: "Project",
        path: "builddao.near/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "overview",
          name: "Overview",
          icon: "bi bi-house",
        },
        default: "true",
      },
      tasks: {
        path: "builddao.near/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "tasks",
          name: "Tasks",
          icon: "bi bi-check-square",
        },
      },
      discussion: {
        path: "builddao.near/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "discussion",
          name: "Discussion",
          icon: "bi bi-chat-dots",
        },
      },
      code: {
        path: "builddao.near/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "code",
          name: "Code",
          icon: "bi bi-code-slash",
        },
      },
      roadmap: {
        path: "builddao.near/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "roadmap",
          name: "Roadmap",
          icon: "bi bi-map",
        },
      },
      activity: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        label: "Activity",
        init: {
          feedName: `${data.title}`,
          name: "Activity",
          icon: "bi bi-list",
          requiredHashtags: ["build", projectId],
        },
      },
      updatesFeed: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: `${data.title} Updates`,
          name: "Updates",
          icon: "bi bi-bell",
          requiredHashtags: ["build", projectId, "updates"],
        },
      },
      feedbackFeed: {
        path: "buildhub.near/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: `${data.title} Feedback`,
          name: "Feedback",
          icon: "bi bi-chat-left-text",
          requiredHashtags: ["build", projectId, "feedback"],
        },
      },
    },
  },
};
// remove unselected tabs
if (Array.isArray(data?.tabs)) {
  Object.keys(config.router.routes).forEach((key) => {
    if (!data.tabs.includes(key.toLowerCase())) {
      delete config.router.routes[key];
    }
  });
}
return (
  <div className="mt-3 container-xl">
    <Widget src="buildhub.near/widget/app.view" props={{ config, ...props }} />
  </div>
);
