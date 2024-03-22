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
  image27: "https://lonk.meme/assets/images/roadmap.png",
  image28: "https://lonk.meme/assets/images/lonk-near.png",
});

const [dropdownVisible, setDropdownVisible] = useState(false);

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};

const Header = styled.div`
      .header{
          background-color:${state.color};
      }
  
      .py-3{
          padding-bottom: 1rem!important;
          padding-top: 1rem!important;
      }
      
      .container {
          max-width: 1140px;
          --bs-gutter-x: 1.5rem;
          --bs-gutter-y: 0;
          margin-left: auto;
          margin-right: auto;
          padding-left: calc(var(--bs-gutter-x)*.5);
          padding-right: calc(var(--bs-gutter-x)*.5);
          width: 100%;
      }
  
      .position-relative{
          position: relative!important;
      }
  
      header {
          display: block;
      }
  
  
      .justify-content-md-between{
          justify-content: space-between!important;
      }
  
      .align-items-center {
          align-items: center!important;
      }
  
      .col-lg-3 {
          flex: 0 0 auto;
          width: 25%;
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
  
      .d-xl-none {
          display: none!important;
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
          background-color: transparent;
          height: auto;
          position: relative;
          right: auto;
          top: auto;
          width: 100%;
      }
  
      .justify-content-center {
          justify-content: center!important;
      }
  
      .navbar-nav {
          --bs-nav-link-padding-x: 0;
          --bs-nav-link-padding-y: 0.5rem;
          --bs-nav-link-font-weight: ;
          --bs-nav-link-color: var(--bs-navbar-color);
          --bs-nav-link-hover-color: var(--bs-navbar-hover-color);
          --bs-nav-link-disabled-color: var(--bs-navbar-disabled-color);
          display: flex;
          flex-direction: column;
          list-style: none;
          margin-bottom: 0;
          padding-left: 0;
      }
  
      ul {
          margin-bottom: 1rem;
          margin-top: 0;
      }
  
      .p-1 {
          padding: 0.25rem!important;
      }
  
      li {
          display: list-item;
          text-align: -webkit-match-parent;
      }
  
      .nav-link {
          color: #fff;
          font-family: Lakki Reddy,cursive;
          font-size: 1rem;
      }
  
      .col-lg-9 {
          flex: 0 0 auto;
          width: 75%;
      }
  
      .nav-link span {
          text-shadow: 0 4px 4px #00000040;
      }
  
      .nav-link {
          font-size: 1.5rem;
      }
  
      .dropdown-menu {
        border-radius: 10px; 
        position: absolute;
        top: 75px;
        left: 24px;
        z-index: 1000;
        min-width: 10rem;
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border: 1px solid #31cf34;
      }
  
      .dropdown-menu.show {
        display: block;
      }
  
      .dropdown li {
          margin-bottom: 0.7em;
      }
  
      .p-lg-3 {
          padding: 1rem!important;
      }
  
      .dropdown-item {
          font-size: 1.4rem;
          color: ${state.color};
          text-shadow: 0 3px 6px #00000040;
          font-family: Lakki Reddy,cursive;
      }
  
      @media (min-width: 1140px) {
        #burger {
          display: none;
        }
      }
  `;

const Main = styled.div`
    .main {
        display: block;
    }

    .intro {
        background: url(${state.image3}) no-repeat 100% 0 fixed;
    }

    .py-lg-5 {
        padding-bottom: 3rem!important;
        padding-top: 3rem!important;
    }
    
    .text-center {
        text-align: center!important;
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

    .col-lg-4 {
        flex: 0 0 auto;
        width: 33.33333333%;
    }

    .container {
        max-width: 1140px;
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

    .green-bg {
        background-color: #31cf34;
        padding: 48px 0px;
    }

    .roadmap {
        background: url(${state.image27}) no-repeat 100% 100%;
        background-color: #52bfda;
        background-size: contain;
        min-height: 850px;
    }

    .position-relative {
        position: relative!important;
    }

    .lonk-near {
        bottom: 10px;
        left: 0;
        margin: auto;
        position: absolute;
        right: 0;
    }

    .col-md-6 {
        flex: 0 0 auto;
        width: 50%;
    }

    .roadmap {
        background-size: cover;
        min-height: 986px;
    }
`;

return (
  <>
    <Header>
      <div class="header py-3 position-relative" id="header">
        <div class="container">
          <div class="row justify-content-center justify-content-md-between align-items-center">
            <div class="col-lg-3">
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
            <div class="col-lg-9">
              <div class="navbar justify-content-center" id="navbar">
                <ul class="navbar-nav d-xl-flex flex-xl-row justify-content-md-between">
                  <li class="nav-item p-1 p-lg-3">
                    <a class="nav-link close-menu" aria-current="page" href="/">
                      <span>home</span>
                    </a>
                  </li>
                  <li class="nav-item p-1 p-lg-3">
                    <a class="nav-link close-menu" href="/#about">
                      <span>about</span>
                    </a>
                  </li>
                  <li class="nav-item p-1 p-lg-3">
                    <a class="nav-link close-menu" href="/#how">
                      <span>how to buy</span>
                    </a>
                  </li>
                  <li class="nav-item p-1 p-lg-3 position-relative">
                    <a
                      class={`nav-link dropdown-toggle ${
                        dropdownVisible ? "show" : ""
                      }`}
                      href="#"
                      id="toggle"
                      onClick={toggleDropdown}
                    >
                      <span>bridge to near</span>
                    </a>
                    <ul
                      class={`dropdown-menu ${dropdownVisible ? "show" : ""}`}
                      id="dropdown"
                    >
                      <li>
                        <a class="dropdown-item" href="/ethereum">
                          from <span class="text-capitalize">ethereum</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/solana">
                          from <span class="text-capitalize">solana</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/evm">
                          from <span class="text-capitalize">arbitrum</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/evm">
                          from <span class="text-capitalize">optimism</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/evm">
                          from <span class="text-capitalize">polygon</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/evm">
                          from <span class="text-capitalize">fantom</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/evm">
                          from <span class="text-capitalize">avalanche</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/evm">
                          from <span class="text-capitalize">BSC</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/suit-aptos">
                          from <span class="text-capitalize">sui</span>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/suit-aptos">
                          from <span class="text-capitalize">aptos</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li class="nav-item p-1 p-lg-3">
                    <a class="nav-link close-menu" href="/#token">
                      <span>tokenomic</span>
                    </a>
                  </li>
                  <li class="nav-item p-1 p-lg-3">
                    <a class="nav-link close-menu" href="/#roadmap">
                      <span>roadmap</span>
                    </a>
                  </li>
                </ul>
              </div>
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
            <div class="row flex-md-row align-items-center">
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
              <div class="col-12 col-md-4 col-lg-5 text-left text-md-end">
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
              <div class="col-12 col-lg-5 offset-lg-7">
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
              <div class="col-12 col-lg-5 offset-lg-7">
                <p>
                  <strong>
                    <span class="badge">3</span> $LONK the token!
                  </strong>
                  <br />
                  Get some $LONK bruv
                </p>
                <p>
                  <a
                    href="https://app.ref.finance/#near|token.lonkingnearbackto2024.near"
                    class="ref button d-flex justify-content-center align-items-center text-decoration-none rounded-5"
                  >
                    <img src={state.image6} width="186" />
                  </a>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="green-bg font-md-bigger py-4 py-lg-5 text-uppercase"
          id="token"
        >
          <div class="container">
            <div class="row flex-md-row align-items-center">
              <div class="col-12 col-md-6 ">
                <p class="mb-5 text-uppercase">
                  <strong>420.69 Billions LONK</strong>
                </p>
                <p class="text-uppercase mb-0">
                  83.058% LPs, <br />
                  16.9420% Reserved:
                </p>
                <ul class="text-uppercase">
                  <li>Airdrop</li>
                  <li>Exchange Listings</li>
                </ul>
                <p>
                  NO TAXES <br />
                  No Team Allocations
                  <br />
                  No VCS
                  <br />
                  No presale
                  <br />
                  NO BS
                </p>
              </div>
              <div class="col-12 col-md-6 col-lg-6 text-left text-md-end">
                <h2>tokenomics</h2>
              </div>
            </div>
          </div>
        </div>
        <div
          class="roadmap font-md-bigger py-4 py-lg-5 position-relative"
          id="roadmap"
        >
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h2>roadmap</h2>
              </div>
              <div class="col-12 col-md-4 col-lg-3 text-md-center">
                <p class="text-uppercase mb-5">
                  Phase 1: lonk
                  <br />
                  Phase 2: $lonk
                  <br />
                  phase 3: lonkdrop
                  <br />
                  PHASE 4: EVERYONE LONK
                </p>
                <br />
              </div>
              <div class="mb-3 mb-md-5"></div>
              <div class="mb-3 mb-md-5"></div>
              <div class="mb-3 mb-md-5"></div>
              <div class="mb-3 mb-md-5"></div>
              <div class="mb-3 mb-md-5"></div>
              <div class="mb-3 mb-md-5"></div>
              <div class="mb-3 mb-md-5"></div>
              <div class="col-12"></div>
              <div class="col-12 col-md-7">
                <p>
                  Disclaimer: <br />
                  $LONK is a meme coin purely for entertainment, with no
                  inherent value or promise of financial gain. It's managed
                  informally without a dedicated team or a set roadmap, serving
                  solely as a token of amusement.
                </p>
              </div>
              <div class="col-12 text-center">
                <a href="https://near.org" class="text-decoration-none">
                  <img src={state.image28} width="280" class="lonk-near" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  </>
);
