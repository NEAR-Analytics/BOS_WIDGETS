const { href } = VM.require("devs.near/widget/lib.url") || {
  href: () => {},
};
const LinksContainer = styled.div``;
const CSS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background: linear-gradient(to left, #c0e6ff, transparent),
    url(https://grainy-gradients.vercel.app/noise.svg);
  padding: 20px;
  color: #030f1c;
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 10px;
    .link-container {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-right: 20px;
      a {
        font-size: 24px;
        color: inherit;
        text-decoration: none;
        transition: all 300ms;
        &:hover {
          opacity: 0.8;
        }
      }
    }
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
                <div
                  className="header-content"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="flex gap-4">
                    <Link to={`/trysui.near/widget/Index?page=Index`}>
                      <button className="header-button">Home</button>
                    </Link>
                    <Link to={`/trysui.near/widget/Index?page=library`}>
                      <button className="header-button">Library</button>
                    </Link>
                    <Link to={`/trysui.near/widget/Index?page=sandbox`}>
                      <button className="header-button">Sandbox</button>
                    </Link>
                    <Link to={`/trysui.near/widget/Index?page=demo`}>
                      <button className="header-button">Demo</button>
                    </Link>
                  </div>
                  {/* // right align this link */}
                  <Link
                    style={{ textDecoration: "none" }}
                    href={href({
                      widgetSrc: "trysui.near/widget/Index",
                      params: {
                        page: "inspect",
                        widgetPath:
                          config.router.routes[props.page].path ??
                          "trysui.near/widget/Index",
                      },
                    })}
                    type="icon"
                    variant="outline"
                    className="d-flex align-tiems-center gap-2"
                  >
                    <button className="">
                      <i className="bi bi-code"></i>
                      <span>View source</span>
                    </button>
                  </Link>
                </div>
              </div>
            ),
            // customize the footer
            Footer: () => (
              <div className="footer">
                <div className="footer-content">
                  <div className="link-container">
                    <a
                      href="https://twitter.com/nearbuilders"
                      className="d-flex align-items-center"
                      target="_blank"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M8 2.75H1L9.26086 13.7645L1.44995 22.7499H4.09998L10.4883 15.401L16 22.75H23L14.3917 11.2723L21.8001 2.75H19.1501L13.1643 9.63578L8 2.75ZM17 20.75L5 4.75H7L19 20.75H17Z"
                          fill="#030F1C"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://nearbuilders.com/tg-builders"
                      target="_blank"
                    >
                      <i className="bi bi-telegram"></i>
                    </a>
                    <a
                      href="https://github.com/NEARBuilders/bos-sui-webcomponent"
                      target="_blank"
                    >
                      <i className="bi bi-github"></i>
                    </a>
                    <a href="https://devs.near.social/" target="_blank">
                      <i className="bi bi-code-slash"></i>
                    </a>
                  </div>
                  <span className="footer-text">Built by</span>
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
              inspect: {
                path: "buildhub.near/widget/page.inspect",
                blockHeight: "final",
                init: {
                  name: "Inspect",
                  widgetPath: props.widgetPath,
                },
                hide: true,
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
