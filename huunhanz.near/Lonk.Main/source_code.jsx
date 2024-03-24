State.init({
  color: "#31cf34",
  image1:
    "https://bafkreidzrna3q6csqykuvzih6yywrijmdg4fn4tb53azjmmjuobfus4v2e.ipfs.nftstorage.link/",
  image2:
    "https://bafybeibuj22kfgmevy3os6akrswxosjyjv5q6tecyv5jsfpw7iccajp5qa.ipfs.nftstorage.link/",
  image3:
    "https://bafkreibeah7hmamkdzkrc7znm6u6jp4loiiy42shoyv2mb2hhlhiyynaia.ipfs.nftstorage.link/",
  image4:
    "https://bafybeib6kjh37qmodapxwjq3ukckhabckasdoamjas7ehigzqbjazu4kyq.ipfs.nftstorage.link/",
  image5:
    "https://bafkreieghanoutojyhkfxfrfqqjgtn76bnbi25kxwi5byankqz3on2elnq.ipfs.nftstorage.link/",
  image6:
    "https://bafkreiejkfmncbzuni5lsrlpplmkqisasvjzgl4oxu3nnz7nmmjwwd56ii.ipfs.nftstorage.link/",
  image7:
    "https://bafkreiag6wx5sg3o2e7nuvbdnpoonymm6dge4woi77o3oroxsdztggr7n4.ipfs.nftstorage.link/",
  image8:
    "https://bafkreielhfr3ybofrjwtbxg7b7qx6suw7noot3wfkpe3s54gbgg4cao5mq.ipfs.nftstorage.link/",
  image9:
    "https://bafkreienvdqrium4lwlfcoz3tctc6ez27hmsiiwv5bsiwjwo2xfolkv4q4.ipfs.nftstorage.link/",
  image10:
    "https://bafkreifjthkkuez3glfevsmjw7orgj4fuxofrtoh3zb6k2bqinloixqml4.ipfs.nftstorage.link/",
  image11:
    "https://bafkreigkwuy4k4txpn4jhivrwdagvvooiivbi3yywamv6krxv77bqitrmm.ipfs.nftstorage.link/",
  image12:
    "https://bafybeibrllurzvgwyyqgy4wz52ye3nwfiy2ilnxlmel3zmo7lhokmakmlm.ipfs.nftstorage.link/",
  image13:
    "https://bafkreiexjgifxje7to3nhm2acpgqx6pssfnkyfupabkvz6xi4wngfsoyb4.ipfs.nftstorage.link/",
  image14:
    "https://bafkreih5stp52zlhjzbzns6c2yzmsimcx22olvwcdhxjdcwlke7ulwsnrq.ipfs.nftstorage.link/",
  image15:
    "https://bafkreiehul4maodboljbvzi4yjoz7cmp7nq5oawxecgk3gzyfx2obqnhse.ipfs.nftstorage.link/",
  image16:
    "https://bafkreie3zja43akg3e6g2ycjvmtxccauwhyh5u53wy3ybmkrkpejzxuazi.ipfs.nftstorage.link/",
  image17:
    "https://bafkreihig2ecbfwnm4jgahveewvg4yvhzpvvduxzrad6mkgercplvtutjm.ipfs.nftstorage.link/",
  image18:
    "https://bafkreiaox4wectrdmwuoymlwabd75icvy22slqp7sq3jbodrlklxxscfba.ipfs.nftstorage.link/",
  image19:
    "https://bafkreihrhaj3vchhhpyycnchh36uxvhr3e4x3fjczjciz7mh5ho73tjlxe.ipfs.nftstorage.link/",
  image20:
    "https://bafkreieyya7khotxum73zxozxktaejzgwbjb4larid4nsy3exzmd2z2d5q.ipfs.nftstorage.link/",
  image21:
    "https://bafkreic2easjnf44omosb7dyvby4c5d7xu3rnfvbxjr3lnfasomsb6vhsi.ipfs.nftstorage.link/",
  image22:
    "https://bafkreiheihm3itssrxi4tlermll7b6edmojztfnfvjd5wblgwqvgakaltq.ipfs.nftstorage.link/",
  image23:
    "https://bafkreial4qmjbm5al5m7qfznoz57fcmzxfw25soclrjm355suaixkrdhoa.ipfs.nftstorage.link/",
  image24:
    "https://bafkreiafkhpfp5dv2qzkrdhkm72pxuxr7hziil6yz4hpwx6u5sxztjhvve.ipfs.nftstorage.link/",
  image25:
    "https://bafkreibv4v5zo5z6dmjdbzxdcm35cbvxlcjewu4qmvvtsqdpolikvpkn24.ipfs.nftstorage.link/",
  image26:
    "https://bafkreiau36hvhq6zzkay5j7logwmp7nf2y5suumyknfmimclabrvokzdg4.ipfs.nftstorage.link/",
  image27:
    "https://bafybeicgrco3ybsfei42gyny5laphmf3edmqnsfq667pjxr6ap47q77gqq.ipfs.nftstorage.link/",
  image28:
    "https://bafkreigt2jhdt2qr6lshkdrf3fjeizcdofnqgvtqkjhxxhaamy3vqsyhvu.ipfs.nftstorage.link/",
});

const fkGroteskFamily = fetch(
  "https://fonts.googleapis.com/css2?family=Lakki+Reddy&display=swap"
).body;
const Main = styled.div`
    ${fkGroteskFamily}
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
  <Main>
    <div class="main">
      <Widget
        src="huunhanz.near/widget/Lonk.hero"
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
        src="huunhanz.near/widget/Lonk.buy"
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
                <img src={state.image28} width="280" class="lonk-near" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Main>
);
