const className = "image-container";

const css = `
a, a:focus, a:visited, a:hover {
  color: black !important;
}

.apps {
  margin-top: 32px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.flex {
  display: flex;
  align-items: center;
}

.flex-right {
  padding-left: 16px;
  > p {
    margin-bottom: 2px;
  }
  > .subtle {
    font-size: 0.8rem;
  }
}
.gray {
  color: #4d4d4d !important;
}

.image-parent {
  position: relative;
  width: 100px;
  height: 100px;
  > .shadow {
    width: 80%;
    height: 80%;
    box-shadow: 0 0 32px rgba(255, 255, 255, 1) !important;
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: 1;
  }
  > .eth-logo {
    z-index: 3;
    position: absolute;
    bottom: -10px;
    right: -10px;
    > img {

    width: 40px;
    height: 40px;
    }
  }
}

.image-container {
  z-index: 2;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
 clip-path: polygon(
    0 10%,
    10% 10%,
    10% 0,
    90% 0,
    90% 10%,
    100% 10%,
    100% 90%,
    90% 90%,
    90% 100%,
    10% 100%,
    10% 90%,
    0% 90%,
    0% 10%
  );
 > img {
  height: 100%;
  object-fit: contain;
  overflow: hidden;
  background: white;
 }
}

 .main {
     padding: 32px;
     p {
         color: black;
     }
 }

`;

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: system-ui;
    background: white;
    color: black;
    ${css}
`,
  });
}
const Theme = state.theme;

const featured = [
  {
    widgetSrc: "syi216.near/widget/Ejemplo-API-Pokemon",
    accountId: "syi216.near",
    widgetName: "Ejemplo-API-Pokemon",
    alt: "Ejemplo-API-Pokemon",
  },
];

return (
  <Theme>
    <div class="main">
      <h3>dApps examples</h3>
      <p class="gray">
        Discover a range of fully decentralized frontends that leverage the
        power of BOS.
      </p>

      <div>
        <div className="mb-2">
          <Widget
            src="mattlock.near/widget/ComponentSearch"
            props={{
              limit: 10,
              onChange: ({ result: components, term }) => {
                console.log(components);
                State.update({ components, term });
              },
            }}
          />
        </div>
        {state.components && state.components.length > 0 && (
          <div class="apps">
            {state.components.map((component, i) => (
              <div key={i} class="widget">
                <div class="flex">
                  <a href={`#/${component.widgetSrc}`} target="_blank">
                    <div class="image-parent">
                      <Widget
                        src="mob.near/widget/WidgetImage"
                        props={{
                          accountId: component.accountId,
                          widgetName: component.widgetName,
                          alt: component.widgetName,
                          className,
                          style: {},
                          fallbackUrl:
                            "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
                        }}
                      />
                      <div class="shadow"></div>
                      <div class="eth-logo">
                        <img
                          src={
                            "https://ipfs.near.social/ipfs/bafkreibkkypb3zybzlwfotwa6tdmelalfnfucmvgzzeqwge4e75mkpq6dq"
                          }
                        />
                      </div>
                    </div>
                  </a>
                  <div class="flex-right">
                    <p>{component.widgetName}</p>
                    <p class="subtle gray">Ethereum</p>
                  </div>
                </div>
                <p>{component.description}</p>

                <a
                  href={`#/mob.near/widget/WidgetSource?src=${component.widgetSrc}`}
                  target="_blank"
                >
                  <i className="bi bi-file-earmark-code me-1"></i>Source
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <div class="mt-5">
        <h3>Featured Apps</h3>
      </div>
      <div class="apps">
        {featured.map((component, i) => (
          <div key={i} class="widget">
            <div class="flex">
              <a href={`#/${component.widgetSrc}`} target="_blank">
                <div class="image-parent">
                  <Widget
                    src="mob.near/widget/WidgetImage"
                    props={{
                      accountId: component.accountId,
                      widgetName: component.widgetName,
                      alt: component.widgetName,
                      className,
                      style: {},
                      fallbackUrl:
                        "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
                    }}
                  />
                  <div class="shadow"></div>
                  <div class="eth-logo">
                    <img
                      src={
                        "https://ipfs.near.social/ipfs/bafkreif343bxwzxgauovbdg2g5nzbtsnqn7sowmvjw64d2viesimgncmei"
                      }
                    />
                  </div>
                </div>
              </a>
              <div class="flex-right">
                <p>{component.widgetName}</p>
                <p class="subtle gray">Vara Network</p>
              </div>
            </div>
            <p>{component.description}</p>

            <a
              href={`#/mob.near/widget/WidgetSource?src=${component.widgetSrc}`}
              target="_blank"
            >
              <i className="bi bi-file-earmark-code me-1"></i>Source
            </a>
          </div>
        ))}
      </div>
    </div>
  </Theme>
);
