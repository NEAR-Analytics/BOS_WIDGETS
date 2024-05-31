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
      <div className="header-container">
        <div className="header-content">
          <Link to={`/sui.near/widget/Index`}>
            <h1 className="header-title">Chop Sui</h1>
          </Link>
          <div className="flex gap-4">
            <Link to={`/sui.near/widget/Index?page=Index`}>
              <button className="header-button">Home</button>
            </Link>
            <Link to={`/sui.near/widget/Index?page=sandbox`}>
              <button className="header-button">Sandbox</button>
            </Link>
            <Link to={`/sui.near/widget/Index?page=library`}>
              <button className="header-button">Library</button>
            </Link>
            <Link to={`/sui.near/widget/Index?page=demo`}>
              <button className="header-button">Demo</button>
            </Link>
          </div>
        </div>
      </div>
    ),
    // customize the footer
    Footer: () => (
      <div className="footer-wrapper">
        <div className="footer-container">
          <div className="footer-content">footer</div>
        </div>
      </div>
    ),
  },
  router: {
    param: "page",
    routes: {
      Index: {
        path: "sui.near/widget/page.home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      sandbox: {
        path: "sui.near/widget/page.sandbox",
        blockHeight: "final",
        init: {
          name: "Sandbox",
        },
      },
      library: {
        path: "sui.near/widget/page.library",
        blockHeight: "final",
        init: {
          name: "Library",
          ...props,
        },
      },
      demo: {
        path: "sui.near/widget/page.demo",
        blockHeight: "final",
        init: {
          name: "Demo",
        },
      },
    },
  },
};
return (
  <>
    <Widget src="every.near/widget/app.view" props={{ config, ...props }} />
  </>
);
