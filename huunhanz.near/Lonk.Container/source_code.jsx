const config = {
  color: "#31cf34",
  image1:
    "https://bafkreidzrna3q6csqykuvzih6yywrijmdg4fn4tb53azjmmjuobfus4v2e.ipfs.nftstorage.link/",
  image2:
    "https://bafybeibuj22kfgmevy3os6akrswxosjyjv5q6tecyv5jsfpw7iccajp5qa.ipfs.nftstorage.link/",
  image3:
    "https://bafkreibeah7hmamkdzkrc7znm6u6jp4loiiy42shoyv2mb2hhlhiyynaia.ipfs.nftstorage.link/",
  image27:
    "https://bafybeicgrco3ybsfei42gyny5laphmf3edmqnsfq667pjxr6ap47q77gqq.ipfs.nftstorage.link/",
  image28:
    "https://bafkreigt2jhdt2qr6lshkdrf3fjeizcdofnqgvtqkjhxxhaamy3vqsyhvu.ipfs.nftstorage.link/",
};

const fkGroteskFamily = fetch(
  "https://fonts.googleapis.com/css2?family=Lakki+Reddy&display=swap"
).body;
const Main = styled.div`
    ${fkGroteskFamily}
    .main {
        display: block;
    }

    .intro {
        background: url(${config.image3}) no-repeat 100% 0 fixed;
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
        background: url(${config.image27}) no-repeat 100% 100%;
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
  <Main>
    <div class="main">
      <Widget src="huunhanz.near/widget/HeroSwap" />

      <Widget src="huunhanz.near/widget/Lonk.buy" />
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
                $LONK is a meme coin purely for entertainment, with no inherent
                value or promise of financial gain. It's managed informally
                without a dedicated team or a set roadmap, serving solely as a
                token of amusement.
              </p>
            </div>
            <div class="col-12 text-center">
              <a href="https://near.org" class="text-decoration-none">
                <img src={config.image28} width="280" class="lonk-near" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Main>
);
