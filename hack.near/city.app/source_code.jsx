const config = {
  theme: {
    // add key values to define colors
    // "--main-color": "blue",
    // "--secondary-color": "red",
    // background: "var(--main-color)",
    // color: "var(--secondary-color)",
  },
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => (
      <Widget
        src="hack.near/widget/Navbar"
        props={{ routes: config.router.routes, ...passProps }}
      />
    ),
    Footer: () => (
      <Widget
        src="hack.near/widget/Footer"
        props={{ metadata, ...passProps }}
      />
    ),
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "hack.near/widget/page.index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      events: {
        path: "hack.near/widget/events.Calendar",
        blockHeight: "final",
        init: {
          name: "Events",
        },
      },
      map: {
        path: "efiz.near/widget/Map.index",
        blockHeight: "final",
        init: {
          name: "Map",
        },
      },
      feed: {
        path: "hack.near/widget/page.feed",
        blockHeight: "final",
        init: {
          name: "Social",
        },
      },
    },
  },
};

const Root = styled.div`
  // you can override classnames here
`;

return (
  <Root>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
  </Root>
);
