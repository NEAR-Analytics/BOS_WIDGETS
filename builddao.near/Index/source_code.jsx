const { CSS } = VM.require("builddao.near/widget/CSS") || {
  CSS: () => <></>,
};
const { Footer } = VM.require("builddao.near/widget/components.Footer") || {
  Footer: () => <></>,
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
    Header: () => (
      <Widget
        src="builddao.near/widget/components.Navbar"
        props={{
          routes: config.router.routes,
          ...props,
        }}
      />
    ),
    Footer: () => <Footer />,
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "builddao.near/widget/page.home.Index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      activity: {
        path: "builddao.near/widget/page.activity.Index",
        blockHeight: "final",
        init: {
          name: "Activity",
        },
      },
      projects: {
        path: "builddao.near/widget/page.projects.Index",
        blockHeight: "final",
        init: {
          name: "Projects",
        },
      },
      project: {
        path: "builddao.near/widget/page.project.Index",
        blockHeight: "final",
        init: {
          name: "Project",
        },
        hide: true,
      },
      resources: {
        path: "builddao.near/widget/page.resources.Index",
        blockHeight: "final",
        init: {
          name: "Resources",
        },
      },
      notifications: {
        path: "builddao.near/widget/page.notifications.Index",
        blockHeight: "final",
        init: {
          name: "Notifications",
        },
        hide: true,
      },
      post: {
        path: "builddao.near/widget/page.post.Index",
        blockHeight: "final",
        init: {
          name: "Post",
        },
        hide: true,
      },
      comment: {
        path: "builddao.near/widget/page.comment.Index",
        blockHeight: "final",
        init: {
          name: "Comment",
        },
        hide: true,
      },
      inspect: {
        path: "builddao.near/widget/page.inspect.Index",
        blockHeight: "final",
        init: {
          name: "Inspect",
        },
        hide: true,
      },
      profile: {
        path: "builddao.near/widget/page.profile.Index",
        blockHeight: "final",
        init: {
          name: "Profile",
        },
        hide: true,
      },
    },
  },
};
return (
  <CSS>
    <Widget src="buildhub.near/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
