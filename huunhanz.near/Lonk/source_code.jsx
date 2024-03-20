State.init({
  color: "#31cf34",
  image1: "https://lonk.meme/assets/images/logo.svg",
  image2: "https://lonk.meme/assets/images/dragon.svg",
  image3: "https://lonk.meme/assets/images/background.png",
  image4: "https://lonk.meme/assets/images/green-dragon.png",
  image5: "https://lonk.meme/assets/images/green-logo.svg",
  image6: "https://lonk.meme/assets/images/ref.png",
  image7: "https://lonk.meme/assets/images/veax.svg",
  image8: "https://lonk.meme/assets/images/plane.png",
  image9: "https://lonk.meme/assets/images/x.png",
  image10: "https://lonk.meme/assets/images/dex.png",
  image11: "https://lonk.meme/assets/images/coingecko.svg",
  image12: "https://lonk.meme/assets/images/dog.png",
  image13: "https://lonk.meme/assets/images/wallets/1.png",
  image14: "https://lonk.meme/assets/images/wallets/2.png",
  image15: "https://lonk.meme/assets/images/wallets/3.png",
  image16: "https://lonk.meme/assets/images/wallets/4.png",
  image17: "https://lonk.meme/assets/images/wallets/5.png",
  image18: "https://lonk.meme/assets/images/wallets/6.png",
  image19: "https://lonk.meme/assets/images/exchanges/1.png",
  image20: "https://lonk.meme/assets/images/exchanges/2.png",
  image21: "https://lonk.meme/assets/images/exchanges/3.png",
  image22: "https://lonk.meme/assets/images/exchanges/4.png",
  image23: "https://lonk.meme/assets/images/exchanges/5.png",
  image24: "https://lonk.meme/assets/images/exchanges/6.png",
  image25: "https://lonk.meme/assets/images/exchanges/7.png",
  image26: "https://lonk.meme/assets/images/exchanges/8.png",
});

const Header = styled.div`
    .header{
        background-color:${state.color};
    }

    .py-3{
        padding-bottom: 1rem!important;
        padding-top: 1rem!important;
    }

    .container {
        max-width: 540px;
    }

    .position-relative{
        position: relative!important;
    }

    header {
        display: block;
    }


    .justify-content-md-between{
        justify-content: space-between!important;
        align-items: center!important;
    }

    .align-items-center {
        align-items: center!important;
    }

    .col-md-4 {
        flex: 0 0 auto;
        width: 33.33333333%;
    }

    .col-12 {
        flex: 0 0 auto;
        width: 100%;
    }

    .row {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        display: flex;
        flex-wrap: wrap;
        margin-left: calc(var(--bs-gutter-x)*-.5);
        margin-right: calc(var(--bs-gutter-x)*-.5);
        margin-top: calc(var(--bs-gutter-y)*-1);
    }

    .text-decoration-none {
        text-decoration: none!important;
    }

    .burger {
        color: #fff;
        cursor: pointer;
        position: absolute;
        right: 10px;
        z-index: 3;
    }

    .burger-line {
        background-color: #fff;
        border-radius: 4px;
        display: block;
        height: 4px;
        margin-bottom: 3px;
        transition: all .3s ease-in-out;
        width: 30px;
    }

    .col-md-8 {
        flex: 0 0 auto;
        width: 66.66666667%;
    }

    .overlay {
        background-color: #000;
        height: 100%;
        left: 0;
        opacity: .6;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 2;
    }

    .d-none {
        display: none!important;
    }

    .navbar {
        height: -moz-fit-content;
        height: fit-content;
        max-width: 100%;
        position: fixed;
        right: -100%;
        top: 80px;
        transition: all .3s ease-in-out;
        width: 500px;
        z-index: 3;
    }

    .justify-content-center {
        justify-content: center!important;
    }
`;

const Main = styled.div`
    .main {
        display: block;
    }

    .intro {
        background: url(${state.image3}) no-repeat 100% 0 fixed;
    }
    
    .font-md-bigger {
        font-size: 1.2rem;
    }

    .text-uppercase {
        text-transform: uppercase!important;
    }

    .py-4 {
        padding-bottom: 1.5rem!important;
        padding-top: 1.5rem!important;
    }

    .py-3 {
        padding-bottom: 1rem!important;
        padding-top: 1rem!important;
    }

    .container {
         max-width: 540px;
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        margin-left: auto;
        margin-right: auto;
        padding-left: calc(var(--bs-gutter-x)*.5);
        padding-right: calc(var(--bs-gutter-x)*.5);
        width: 100%;
    }

    .justify-content-around {
        justify-content: space-around!important;
    }

    .row {
        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        display: flex;
        flex-wrap: wrap;
        margin-left: calc(var(--bs-gutter-x)*-.5);
        margin-right: calc(var(--bs-gutter-x)*-.5);
        margin-top: calc(var(--bs-gutter-y)*-1);
    }

    .align-items-center {
        align-items: center!important;
    }

    .justify-content-center {
        justify-content: center!important;
    }

    .col-12 {
        flex: 0 0 auto;
        width: 100%;
    }

    .mb-4 {
        margin-bottom: 1.5rem!important;
    }
    
    .mt-3 {
        margin-top: 1rem!important;
    }

    .d-flex {
        display: flex!important;
    }

    .mx-2 {
        margin-left: 0.5rem!important;
        margin-right: 0.5rem!important;
    }

    .ref {
        height: 60px;
        width: 270px;
    }

    .button {
        border: 2px solid #31cf34;
    }

    .rounded-5 {
        border-radius: var(--bs-border-radius-xxl)!important;
    }

    .text-decoration-none {
        text-decoration: none!important;
    }

    .mt-5 {
        margin-top: 3rem!important;
    }

    .px-2 {
        padding-left: 0.5rem!important;
        padding-right: 0.5rem!important;
    }
    
    .d-inline-block {
        display: inline-block!important;
    }

    .green-bg {
        background-color: #31cf34;
    }

    .flex-column-reverse {
        flex-direction: column-reverse!important;
    }

    p {
        margin-bottom: 1rem;
        margin-top: 0;
    }

    .text-uppercase {
        text-transform: uppercase!important;
    }

    .mb-0 {
        margin-bottom: 0!important;
    }

    h2 {
        color: #fff;
        font-size: 4em;
        font-family: Lakki Reddy,cursive;
        text-shadow: 0 4px 4px #00000040;
        text-transform: lowercase;
        margin-block-end: 0.33em;
    }

    .green {
        color: #31cf34;
    }

    .badge {
        background-color: #31cf34;
        font-size: 1.1em;
        padding: 3px 8px;
    }
`;

return (
  <>
    <Header>
      <div class="header py-3 position-relative" id="header">
        <div class="container">
          <div class="row justify-content-center justify-content-md-between align-items-center">
            <div class="col-12 col-md-14 col-lg-3">
              <a class="text-decoration-none">
                <img src={state.image2} alt="Icon" width="70" height="70" />
                <img src={state.image1} alt="Logo" width="141" height="60" />
              </a>
              <span class="d-x1-none burger" id="burger">
                <span class="burger-line"></span>
                <span class="burger-line"></span>
                <span class="burger-line"></span>
                <span>Menu</span>
              </span>
            </div>
            <div class="col-12 col-md-8 col-lg-9">
              <div class="navbar justify-content-center">//Item</div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlay d-none" id="overlay"></div>
    </Header>

    <Main>
      <div class="main">
        <div class="intro font-md-bigger py-4 py-lg-5 dragon-background text-uppercase text-center">
          <div class="container py-3">
            <div class="row justify-content-around">
              <div class="col-12 col-lg-4 d-flex justify-content-center align-items-center">
                <img src={state.image4} alt="Green Dragon" width="350px" />
              </div>
              <div class="col-12 col-lg-4">
                <img src={state.image5} width="200" />
                <p class="mt-3 mp-4">WE LONKING, NOT SHORTING</p>
                <p class="mp-4">LONKING $NEAR BACK TO $20.24 IN 2024</p>
                <p class="mp-4">Get some $LONK</p>
                <div class="d-flex justify-content-center">
                  <div class="mx-2">
                    <a
                      href="https://app.ref.finance/#near|token.lonkingnearbackto2024.near"
                      class="ref button rounded-5 text-decoration-none align-items-center justify-content-center d-flex"
                    >
                      <img src={state.image6} width="186" />
                    </a>
                  </div>
                  <div class="mx-2">
                    <a
                      href="https://app.ref.finance/#near|token.lonkingnearbackto2024.near"
                      class="ref button rounded-5 text-decoration-none align-items-center justify-content-center d-flex"
                    >
                      <img src={state.image7} width="100" />
                    </a>
                  </div>
                </div>
                <div class="mt-5">
                  <a
                    href="http://t.me/LonkonNEAR"
                    target="_blank"
                    class="d-inline-block px-2"
                  >
                    <img
                      src={state.image8}
                      width="75"
                      class="d-inline-block px-2"
                    />
                  </a>
                  <a
                    href="http://t.me/LonkonNEAR"
                    target="_blank"
                    class="d-inline-block px-2"
                  >
                    <img
                      src={state.image9}
                      width="50"
                      class="d-inline-block px-2"
                    />
                  </a>
                  <a
                    href="http://t.me/LonkonNEAR"
                    target="_blank"
                    class="d-inline-block px-2"
                  >
                    <img
                      src={state.image10}
                      width="65"
                      class="d-inline-block px-2"
                    />
                  </a>
                  <a
                    href="http://t.me/LonkonNEAR"
                    target="_blank"
                    class="d-inline-block px-2"
                  >
                    <img
                      src={state.image11}
                      width="75"
                      class="d-inline-block px-2"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="green-bg font-md-bigger py-4 py-lg-5" id="about">
          <div class="container">
            <div class="row flex-column-reverse flex-md-row align-items-center">
              <div class="col-12 col-md-8 col-lg-7">
                <p>
                  LONK READ AS “LONG”
                  <br />
                  LONK IS LONG
                  <br />
                  LONK IS 龍 <br />
                  LONK IS DRAGON (insert Illia)
                  <br />
                  LONK IS FREN WITH BONK
                  <br />
                  LONK IS LOVE
                  <br />
                  LONK IS NOT YOUR AVERAGE MEME COIN
                </p>
                <p class="text-uppercase">
                  Born from collective frenship, firmly grounded in the realms
                  of memetics and humor
                </p>
                <p class="text-uppercase mb-0">
                  YOUR NEAR journey is incomplete without LONK.
                </p>
              </div>
              <div class="col-12 col-md-4 col-lg-5">
                <h2>about</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="how font-md-bigger py-4 py-lg-5" id="how">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2 class="green">how to buy</h2>
              </div>
              <div class="col-12 col-lg-5">
                <p>
                  <strong>
                    <span class="badge">1</span>
                    Get yourself a NEAR wallet
                  </strong>
                </p>
                <p>
                  Bruv you won’t be able to use, trade or $LONK without a
                  wallet, so create a FREE wallet here with prepaid gas. (yes we
                  know NEAR tech is awesome)
                </p>
                <p>
                  <a
                    href="https://my.shard.dog/"
                    class="button d-inline-block text-decoration-none py-1 px-5 border rounded-5"
                  >
                    <img src={state.image12} width="205" />
                  </a>
                </p>
                <p>Some gud NEAR wallets:</p>
                <p>
                  <a
                    href="https://meteorwallet.app/"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1"
                  >
                    <img src={state.image13} alt="NEAR Wallet" width="50" />
                  </a>

                  <a
                    href="https://herewallet.app/"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1"
                  >
                    <img src={state.image14} alt="NEAR Wallet" width="50" />
                  </a>

                  <a
                    href="https://mynearwallet.com/"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1"
                  >
                    <img src={state.image15} alt="NEAR Wallet" width="50" />
                  </a>

                  <a
                    href="https://sender.org/"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1"
                  >
                    <img src={state.image16} alt="NEAR Wallet" width="50" />
                  </a>

                  <a
                    href="https://nightly.app/"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1"
                  >
                    <img src={state.image17} alt="NEAR Wallet" width="50" />
                  </a>

                  <a
                    href="https://wallet.mintbase.xyz"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1"
                  >
                    <img src={state.image18} alt="NEAR Wallet" width="50" />
                  </a>
                </p>
              </div>
              <div class="col-12 py-4">
                <p>
                  <strong>
                    <span class="badge">2</span>
                    Bring some assets to NEAR
                  </strong>
                </p>
                <p>
                  <strong>NEAR</strong>, <strong>USDT</strong> , and{" "}
                  <strong>USDC</strong> can be bought and withdrawn from all
                  major exchanges:
                </p>
                <p>
                  <a
                    href="https://www.binance.com/en/trade/NEAR_USDT"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image19} alt="NEAR Wallet" width="50" />
                  </a>
                  <a
                    href="https://www.okx.com/trade-spot/near-usdt"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image20} alt="NEAR Wallet" width="50" />
                  </a>
                  <a
                    href="https://www.gate.io/trade/NEAR_USDT"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image21} alt="NEAR Wallet" width="50" />
                  </a>
                  <a
                    href="https://www.coinbase.com/price/near-protocol"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image22} alt="NEAR Wallet" width="50" />
                  </a>
                  <a
                    href="https://www.kucoin.com/trade/NEAR-USDT"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image23} alt="NEAR Wallet" width="50" />
                  </a>
                  <a
                    href="https://www.kraken.com/prices/near-protocol"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image24} alt="NEAR Wallet" width="50" />
                  </a>
                  <a
                    href="https://www.bybit.com/en/trade/spot/NEAR/USDT"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image25} alt="NEAR Wallet" width="50" />
                  </a>
                  <a
                    href="https://crypto.com/price/near-protocol"
                    target="_blank"
                    class="text-decoration-none d-inline-block me-1 mb-1"
                  >
                    <img src={state.image26} alt="NEAR Wallet" width="50" />
                  </a>
                </p>
                <p>
                  or you can bridge assets from other chains! Take a look at our
                  guide bruv :)
                </p>
              </div>
              <div class="col-12 col-lg-5">
                <p>
                  <strong>
                    <span class="badge">3</span> $LONK the token!
                  </strong>
                  <br />
                  Get some $LONK bruv
                </p>
                <p>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    class="ref button d-flex bg-light justify-content-center align-items-center text-decoration-none rounded-5"
                  >
                    <img src={state.image6} width="186" />
                  </button>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Swap Token
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center align-items-center">
            <Widget src="huunhanz.near/widget/ref-swap" />
          </div>
        </div>
      </div>
    </div>
  </>
);
