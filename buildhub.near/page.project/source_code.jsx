const { routes } = VM.require("buildhub.near/widget/config.project") ?? {
  routes: {},
};
const { ProjectLayout } = VM.require(
  "buildhub.near/widget/template.ProjectLayout"
) || {
  ProjectLayout: () => <></>,
};
const { SidebarLayout } = VM.require(
  "buildhub.near/widget/template.SidebarLayout"
) || {
  SidebarLayout: () => <></>,
};
const { id } = props;
const data = JSON.parse(Social.get(id, "final") ?? {});
if (!id || !data) {
  return "Loading...";
}
const profileData = {
  name: data.title,
  description: data.description,
  linktree: {
    github: data.github,
    telegram: data.telegram,
    twitter: data.twitter,
    website: data.website,
  },
  backgroundImage: data.backgroundImage?.image,
  image: data.profileImage?.image,
};
const profile = Social.getr(`${data.projectAccountId}/profile`);
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
        <ProjectLayout
          profile={profileData}
          projectAccountId={data.projectAccountId}
          page={page}
          routes={config.router.routes}
          project={project}
          id={id}
          {...props}
        ></ProjectLayout>
      </>
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "tab",
    routes: {
      overview: {
        path: "buildhub.near/widget/components.project.page.Overview",
        blockHeight: "final",
        init: {
          ...props,
        },
        default: "true",
      },
      activity: {
        path: "buildhub.near/widget/components.project.page.Activity",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      discussion: {
        path: "buildhub.near/widget/components.project.page.Discussion",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      task: {
        path: "buildhub.near/widget/components.project.page.Task",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      code: {
        path: "buildhub.near/widget/components.project.page.Code",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      roadmap: {
        path: "buildhub.near/widget/components.project.page.Roadmap",
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
const Root = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  width: 100%;
  padding: 24px 40px;
`;
return (
  <Root>
    <Widget src="buildhub.near/widget/app.view" props={{ config, ...props }} />
  </Root>
);
