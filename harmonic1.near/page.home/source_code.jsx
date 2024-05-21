const { SidebarLayout } = VM.require("harmonic1.near/widget/SidebarLayout") || {
  SidebarLayout: () => <></>,
};
const config = {
  theme: {},
  // layout: {
  //   src: "buildhub.near/widget/Layout",
  //   props: {
  //     variant: "standard",
  //   },
  // },
  blocks: {
    // these get passed to the layout and children
    Header: () => <></>,
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "tab",
    routes: {
      guide: {
        path: "harmonic1.near/widget/Resources",
        blockHeight: "final",
        init: {
          feedName: "Guide",
          name: "Guide",
          icon: "bi-map",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/gateway/main/resources.md",
        },
        default: "true",
      },
    },
  },
};
const Root = styled.div``;
return (
  <Root>
    <SidebarLayout
      currentPath={"/harmonic1.near/widget/app?page=home"}
      page={props.tab}
      routes={config.router.routes}
    >
      <Widget
        src="buildhub.near/widget/app.view"
        props={{ config, ...props }}
      />
    </SidebarLayout>
  </Root>
);
