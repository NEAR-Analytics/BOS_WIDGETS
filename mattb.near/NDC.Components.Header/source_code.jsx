let { tabs, fallback, darkmode, refresh } = props;
let Skip = state.skip;

const DEFAULT_LOGO_URL =
  !!Skip && Skip.get("darkmode")
    ? "https://ipfs.near.social/ipfs/bafkreihbueuso62ltstbcxdhlmdnacomlb2hxun5fxh34f4rvgtgb5pfi4"
    : "https://ipfs.near.social/ipfs/bafkreiavgky7fgrvwl4x4rxcypgew5ou6ahwf6mrcbtyswbvtbnrkrrobu";

const ICON_MOON_URL =
  "https://ipfs.near.social/ipfs/bafkreigilnmekroiee4nehyyipnioxchwzevvp3qc7nkb3njekbaevuzzi";
const ICON_SUN_URL =
  "https://ipfs.near.social/ipfs/bafkreidltnf3vn5na7dl5rdwcpor3yz63suj42xc4h2qxyhpz5ltwfxn7q";

const DEFAULT_BACKGROUND_COLOR =
  !!Skip && Skip.get("darkmode") ? "#191919" : "#fff";
const DEFAULT_COMPONENT_COLOR =
  !!Skip && Skip.get("darkmode") ? "rgba(0,0,0,.8)" : "#fff";
const DEFAULT_TEXT_COLOR = !!Skip && Skip.get("darkmode") ? "#fff" : "#000";

const Logo = styled.img`
    max-width:30px;
`;

const Header = styled.div`
    width:100%;
    background-color:${DEFAULT_BACKGROUND_COLOR};
`;

const Navigation = styled.div`
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    max-width:1300px;
    margin:0 auto;
    padding:1rem;
    color:${DEFAULT_TEXT_COLOR};
    font-size:.9rem;
    letter-spacing:-.5px;
    min-height:70px;

    img {
        position:absolute;
        left:1rem;
        border:1rem;
    }

    ul {
        display:flex;
        align-items:center;
        padding:0;
        margin:0;
        list-style:none;
        flex-wrap:wrap;

        li {
            padding:0;
            
            &:not(:last-of-type) {
                margin-right:1rem;
            }

            a {
                cursor:pointer;
                transition:all .2s;
                border-radius:10px;
                background-color:${
                  !!Skip && Skip.get("darkmode")
                    ? "rgba(255,255,255,.05)"
                    : "rgba(0,0,0,.05)"
                };
                padding:.5rem 1rem;
                font-weight:bold;
                opacity:.6;
                color:${DEFAULT_TEXT_COLOR};
                text-decoration:none;
                border: 2px solid rgba(0,0,0,.0);
                transition: all .2s;

                &.selected {
                    transition: all .2s;
                    background: ${DEFAULT_TEXT_COLOR};
                    color:${DEFAULT_BACKGROUND_COLOR};
                    opacity:1;
                }

                &:hover {
                    border: 2px solid rgba(0,0,0,.02);
                    opacity:1;
                }
            }
        }
    }
`;

const DarkModeButton = styled.div`
    position:absolute;
    cursor:pointer;
    right:1rem;
    width:40px;
    height:40px;
    border-radius:10px;
    background-color:${
      !!Skip && Skip.get("darkmode")
        ? "rgba(255,255,255,.05)"
        : "rgba(0,0,0,.05)"
    };
    background-image:url("${
      !!Skip && Skip.get("darkmode") ? ICON_SUN_URL : ICON_MOON_URL
    }");
    background-position:center;
    background-repeat:no-repeat;
    background-size:30px 30px;
    transition: all .2s;
    border: 2px solid ${
      !!Skip && Skip.get("darkmode") ? "rgba(255,255,255,.0)" : "rgba(0,0,0,.0)"
    };

    &:hover {
        transition: all .2s;
        box-shadow: 0 0 10px 5px rgba(0,0,0,.02);
        border: 2px solid ${
          !!Skip && Skip.get("darkmode")
            ? "rgba(255,255,255,.02)"
            : "rgba(0,0,0,.02)"
        };
    }
`;

tabs = tabs || {
  home: {
    text: "Home",
  },
  docs: {
    text: "NDCDocs",
  },
  funding: {
    text: "Funding dashboard",
  },
  sayalot: {
    text: "Say A Lot",
  },
  gigs: {
    text: "Gigs",
  },
};

function getRender() {
  if (!Skip) return;

  return Skip.create("NDC.Header")
    .with({
      state: {
        tab: fallback || "home",
        darkmode: darkmode || false,
      },
    })
    .render(
      <Header>
        <Navigation>
          <Logo src={DEFAULT_LOGO_URL} />
          <ul>
            {Object.keys(tabs).map((key) => (
              <li>
                <a
                  className={key == Skip.get("tab") ? "selected" : ""}
                  onClick={() => {
                    console.log(key);
                    Skip.set({ tab: key });
                    Skip.emit("onTabChange", key);
                  }}
                >
                  {tabs[key].text}
                </a>
              </li>
            ))}
          </ul>
          <DarkModeButton
            onClick={() => {
              Skip.set({ darkmode: !Skip.get("darkmode") });
              Skip.emit("onDarkmodeChange", { darkmode: Skip.get("darkmode") });
            }}
          ></DarkModeButton>
        </Navigation>
      </Header>
    );
}

return (
  <>
    <div
      style={{
        display: "none",
      }}
    >
      <Widget
        src="mattb.near/widget/SkipFramework.core"
        props={{
          onLoad: (data) => State.update(data),
          onRefresh: (data) => State.update(data),
          loaded: !!Skip,
        }}
      />
    </div>
    {getRender()}
  </>
);
