const { SidebarLayout } = VM.require("harmonic1.near/widget/SidebarLayout") || {
  SidebarLayout: () => <></>,
};
const config = {
  theme: {},
  layout: {
    //The layout at BuildDAO is not available
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
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
            "https://raw.githubusercontent.com/Harmonic-Guild/trials.near/main/docs.md",
        },
        default: "true",
      },
    },
  },
};
const Root = styled.div`
  margin-top: -2%;
`;
return (
  <Root>
    <SidebarLayout
      currentPath={"/harmonic1.near/widget/app?page=home"}
      page={props.tab}
      routes={config.router.routes}
    >
      <Widget
        src="harmonic1.near/widget/app.view"
        props={{ config, ...props }}
      />
    </SidebarLayout>
  </Root>
);
