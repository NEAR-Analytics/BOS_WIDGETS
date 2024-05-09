State.init({
  color: "#31cf34",
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

    .green-bg, .header, .navbar {
        background-color: #31cf34;
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
`;

return (
  <>
    <Widget src="huunhanz.near/widget/headerSwap" />
    <Main>
      <div class="main">
        <Widget
          src="huunhanz.near/widget/lonk.hero"
          props={{
            image4: state.image4,
            image5: state.image5,
            image6: state.image6,
            image7: state.image7,
            image8: state.image8,
            image9: state.image9,
            image10: state.image10,
            image11: state.image11,
          }}
        />
        <Widget
          src="huunhanz.near/widget/lonk.buy"
          props={{
            image12: state.image12,
            image13: state.image13,
            image14: state.image14,
            image15: state.image15,
            image16: state.image16,
            image17: state.image17,
            image18: state.image18,
            image19: state.image19,
            image20: state.image20,
            image21: state.image21,
            image22: state.image22,
            image23: state.image23,
            image24: state.image24,
            image25: state.image25,
            image26: state.image26,
            image6: state.image6,
          }}
        />
        <div
          class="green-bg font-md-bigger py-4 py-lg-5 text-uppercase"
          id="token"
        >
          <div class="container">
            <div class="row flex-column-reverse flex-md-row align-items-center">
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
              <div class="col-12 col-md-6 col-lg-6 text-md-start">
                <h2 class="text-start">tokenomics</h2>
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
              <div class="col-12 col-md-4 col-lg-3">
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
