const config = {
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
};
return (
  <>
    <div class="intro font-md-bigger py-4 py-lg-5 dragon-background text-uppercase text-center">
      <div class="container py-3">
        <div class="row col-md justify-content-around ">
          <div class="col-12 col-lg-4 d-flex justify-content-center align-items-center">
            <img src={config.image4} alt="Green Dragon" width="350px" />
          </div>
          <div class="col-12 col-lg-4">
            <img src={config.image5} width="200" />
            <p class="mt-3 mp-4">WE LONKING, NOT SHORTING</p>
            <p class="mp-4">LONKING $NEAR BACK TO $20.24 IN 2024</p>
            <p class="mp-4">Get some $LONK</p>
            <div class="d-flex col-md justify-content-center">
              <div class="mx-2">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  class="ref button d-flex bg-light justify-content-center align-items-center text-decoration-none rounded-5"
                >
                  <img src={config.image6} width="186" />
                </button>{" "}
              </div>
              <div class="mx-2">
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#veax"
                  class="ref button d-flex bg-light justify-content-center align-items-center text-decoration-none rounded-5"
                >
                  <img src={config.image7} width="90" />
                </button>{" "}
              </div>
            </div>
            <div class="mt-5 col-md">
              <div>
                <a
                  href="http://t.me/LonkonNEAR"
                  target="_blank"
                  class="d-inline-block px-2"
                >
                  <img
                    src={config.image8}
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
                    src={config.image9}
                    width="50"
                    class="d-inline-block px-2"
                  />
                </a>
              </div>
              <div>
                <a
                  href="http://t.me/LonkonNEAR"
                  target="_blank"
                  class="d-inline-block px-2"
                >
                  <img
                    src={config.image10}
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
                    src={config.image11}
                    width="50"
                    class="d-inline-block px-2"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Widget src="huunhanz.near/widget/Lonk.stake" />
    <div class="green-bg mt-2 font-md-bigger py-4 py-lg-5" id="about">
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
              Born from collective frenship, firmly grounded in the realms of
              memetics and humor
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
              Swap Token Ref Finance
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
    <div
      class="modal fade"
      id="veax"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Swap Token Veax
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center align-items-center">
            <Widget src="huunhanz.near/widget/Lonk.veax-swap" />
          </div>
        </div>
      </div>
    </div>
  </>
);
