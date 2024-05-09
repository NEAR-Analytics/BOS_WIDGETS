const creatorId = props.creatorId ?? "hack.near";
const appId = props.appId ?? "city.app";

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
      <>
        <Widget
          src="hack.near/widget/Navbar"
          props={{ routes: config.router.routes, creatorId, appId }}
        />
      </>
    ),
    Footer: () => (
      <>
        <Widget
          src="hack.near/widget/Footer"
          props={{
            creatorId,
            github: "https://github.com/nearbuilders/city",
            twitter: "https://x.com/nearbuilders",
          }}
        />
      </>
    ),
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "hack.near/widget/page.home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      events: {
        path: "buildhub.near/widget/events.Calendar",
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
    },
  },
};

const Root = styled.div`
font-family: Courier;
`;

return (
  <Root>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
  </Root>
);
