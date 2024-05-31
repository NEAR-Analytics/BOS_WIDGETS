const CSS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(to left, #c0e6ff, transparent),
    url(https://grainy-gradients.vercel.app/noise.svg);
  padding: 20px;
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 10px;
  }
  .footer-content {
    display: flex;
    align-items: center;
  }
  .footer-text {
    margin-right: 10px;
  }
  .footer img {
    height: 50px;
  }
`;
return (
  <CSS>
    <SuiContext
      provides={({ account }) => {
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
                  <Link to={`/trysui.near/widget/Index`}>
                    <h1 className="header-title">
                      Under the{" "}
                      <img
                        src="https://cdn.prod.website-files.com/6425f546844727ce5fb9e5ab/659d95d2971219c839dc65ac_logo-sui.svg"
                        alt="Sui"
                        height="40px"
                        style={{ verticalAlign: "baseline" }}
                      />
                    </h1>
                  </Link>
                  <div className="flex gap-4">
                    <Link to={`/trysui.near/widget/Index?page=Index`}>
                      <button className="header-button">Home</button>
                    </Link>
                    <Link to={`/trysui.near/widget/Index?page=sandbox`}>
                      <button className="header-button">Sandbox</button>
                    </Link>
                    <Link to={`/trysui.near/widget/Index?page=library`}>
                      <button className="header-button">Library</button>
                    </Link>
                    <Link to={`/trysui.near/widget/Index?page=demo`}>
                      <button className="header-button">Demo</button>
                    </Link>
                  </div>
                </div>
              </div>
            ),
            // customize the footer
            Footer: () => (
              <div class="footer">
                <div class="footer-content">
                  <span class="footer-text">Built by</span>
                  <Link href="https://nearbuilders.org">
                    <img
                      src="https://ipfs.near.social/ipfs/bafkreiglw3t6b3dx2axk7x4ftzk6pwwe6ziiyexlszlkhenxist6osrlbe"
                      alt="Near Builders"
                    />
                  </Link>
                </div>
              </div>
            ),
          },
          router: {
            param: "page",
            routes: {
              Index: {
                path: "trysui.near/widget/page.home",
                blockHeight: "final",
                init: {
                  name: "Home",
                  account: account,
                },
                default: true,
              },
              sandbox: {
                path: "trysui.near/widget/page.sandbox",
                blockHeight: "final",
                init: {
                  name: "Sandbox",
                },
              },
              library: {
                path: "trysui.near/widget/page.library",
                blockHeight: "final",
                init: {
                  name: "Library",
                  ...props,
                },
              },
              demo: {
                path: "trysui.near/widget/page.demo",
                blockHeight: "final",
                init: {
                  name: "Demo",
                },
              },
            },
          },
        };
        return (
          <Widget
            src="every.near/widget/app.view"
            props={{ config, ...props }}
          />
        );
      }}
    />
  </CSS>
);
