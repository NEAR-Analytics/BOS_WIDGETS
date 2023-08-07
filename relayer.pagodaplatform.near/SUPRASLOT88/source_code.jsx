const fontUrl = ``;

const className = "image-container";

const css = `
@font-face {
    font-family: "Pixter";
    src: url("${fontUrl}");
}

a, a:focus, a:visited, a:hover {
  color: Gold !important;
}

.apps {
  margin-top: 32px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
  background: Gold;
 }
}

.header {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;

    > div {
        padding: 36px;
        h1 {
        font-size: 3rem;
        }
        h2 {
            color: #FFD700;
        }
        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
    }
}

.header-left {
    background: linear-gradient(253.16deg, #FFD700 1.53%, #808080  86.25%);
    width: 55%;
    height: 260px;
  transform-origin: 100% 0;
  transform: skew(-10deg);
  border-right: 4px solid black;
}

.header-right {
    margin-left: -100px;
    background: linear-gradient(255.45deg, #FFD700 12.67%, #FFD700 87.81%);
    width: calc(45% + 100px);
    height: 260px;
}

.noise {
    mix-blend-mode: soft-light;
    position: absolute;
    z-index: 1;
    opacity: 0.5;
  width: 100vw;
  height: 260px;
  background: url('https://ipfs.near.social/ipfs/bafkreihgwibthxujsknk53j4ldazt7fyj4q2m63haxc2tflx5cegwkp2ey');
 }

 .header-content-left {
     position: absolute;
     z-index: 2;
     height: 260px;
 }
 .header-content-right {
    text-align: right;
     position: absolute;
     height: 260px;
     right: 0;
     z-index: 2;
 }

 .main {
     padding: 32px;
     p {
         color: #ddd;
     }
 }

 footer {
  padding-top: 2rem;
  height: 2rem;
}

footer a, span {
  color: rgba(255, 255, 255, 0.2);
}


@media only screen and (max-width: 700px) {
  .header {
    flex-direction: column;
  }
  .header-left {
    transform: skew(0);
  }
  .header-left, .header-right {
    width: 100%;
    margin-left: 0;
    border: none;
  }
  .header-content-right {
    top: 260px;
  }
  .noise {
    height: 520px;
  }
}
`;

if (!state.theme) {
  State.update({
    theme: styled.div`

    background: Navy;
    color: Gold;
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <div class="header">
      <div class="header-left"></div>
      <div class="header-content-left">
        <div>
          <div>
            <h1>SUPRASLOT88</h1>
          </div>
          <div>
            <h2>DAFTAR SUPRASLOT88</h2>
          </div>
        </div>
      </div>
      <div>
        <h2></h2>
      </div>
    </div>

    <div class="main">
      <a href="https://tiny.one/SUPRASLOT88" target="_blank">
        <h2>Login Supra Slot 88</h2>
      </a>
    </div>

    <div class="main">
      <a href="https://tinyurl.com/rtpsupraslot88" target="_blank">
        <h2>RTP Supra Slot 88</h2>
      </a>
    </div>

    <div class="main">
      <a href="https://tinyurl.com/Daftarakungacorpro" target="_blank">
        <h2>Akun Gacor Supra Slot 88</h2>
      </a>
    </div>

    <div class="main">
      <a
        href="https://near.org/near/widget/ProfilePage?accountId=supraslot88.near"
        target="_blank"
      >
        <h2>Near SupraSlot88</h2>
      </a>
    </div>

    <div class="main">
      <button onclick="window.location.href='https://tinyurl.com/wasupraslot88';">
        WhatsApp Supra Slot 88
      </button>
    </div>
    <div class="main">
      <button onclick="window.location.href='https://tinyurl.com/apksupraslot88';">
        APK Supra Slot 88
      </button>
    </div>

    <div class="main">
      <h3>Apa Itu Supra Slot 88?</h3>
      <p class="gray">
        Supraslot88 adalah istilah yang digunakan dalam konteks judi slot online
        untuk menggambarkan mesin slot yang memiliki tingkat kemenangan yang
        tinggi atau sering memberikan pembayaran yang besar kepada para
        pemainnya.
      </p>

      <div>
        <div className="mb-2">
          <Widget
            src=""
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
                        src="supraslot88.near/widget/WidgetImage"
                        props={{
                          accountId: component.accountId,
                          widgetName: component.widgetName,
                          alt: component.widgetName,
                          className,
                          style: {},
                          fallbackUrl:
                            "https://ipfs.near.social/ipfs/bafkreihgwibthxujsknk53j4ldazt7fyj4q2m63haxc2tflx5cegwkp2ey",
                        }}
                      />
                      <div class="shadow"></div>
                      <div class="SupraSlot88-logo">
                        <img
                          src={
                            "https://ipfs.near.social/ipfs/bafkreihgwibthxujsknk53j4ldazt7fyj4q2m63haxc2tflx5cegwkp2ey"
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
                  href={`#/supraslot88.near/widget/WidgetSource?src=${component.widgetSrc}`}
                  target="_blank"
                >
                  <i className="bi bi-file-earmark-code me-1"></i>Source
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    <div class="footer">
      <div className="text-center">
        <a href="https://cryptohitech.com/">Terms of Use</a> <span>|</span>{" "}
        <a href="https://cryptohitech.com/">Privacy Policy</a>
      </div>
    </div>
  </Theme>
);
