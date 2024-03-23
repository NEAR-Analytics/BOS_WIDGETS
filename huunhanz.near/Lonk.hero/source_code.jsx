const [select, setSelect] = useState("");
return (
  <>
    <div class="intro font-md-bigger py-4 py-lg-5 dragon-background text-uppercase text-center">
      <div class="container py-3">
        <div class="row justify-content-around">
          <div class="col-12 col-lg-4 d-flex justify-content-center align-items-center">
            <img src={props.image4} alt="Green Dragon" width="350px" />
          </div>
          <div class="col-12 col-lg-4">
            <img src={props.image5} width="200" />
            <p class="mt-3 mp-4">WE LONKING, NOT SHORTING</p>
            <p class="mp-4">LONKING $NEAR BACK TO $20.24 IN 2024</p>
            <p class="mp-4">Get some $LONK</p>
            <div class="d-flex justify-content-center">
              <div class="mx-2">
                <button
                  onClick={() => setSelect("ref-swap")}
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  class="ref button d-flex bg-light justify-content-center align-items-center text-decoration-none rounded-5"
                >
                  <img src={props.image6} width="186" />
                </button>{" "}
              </div>
              <div class="mx-2">
                <a
                  href="https://app.veax.com/trade?mode=pro&tokens=token.lonkingnearbackto2024.near%25wrap.near"
                  class="ref button d-flex bg-light justify-content-center align-items-center text-decoration-none rounded-5"
                >
                  <img src={props.image7} width="90" />
                </a>{" "}
              </div>
            </div>
            <div class="mt-5">
              <a
                href="http://t.me/LonkonNEAR"
                target="_blank"
                class="d-inline-block px-2"
              >
                <img
                  src={props.image8}
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
                  src={props.image9}
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
                  src={props.image10}
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
                  src={props.image11}
                  width="75"
                  class="d-inline-block px-2"
                />
              </a>
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
              {select == "ref-swap"
                ? "Swap Token Ref Finance"
                : "Swap Token Veax"}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex justify-content-center align-items-center">
            {select == "ref-swap" ? (
              <Widget src="huunhanz.near/widget/ref-swap" />
            ) : (
              <Widget src="huunhanz.near/widget/Lonk.veax-swap" />
            )}
          </div>
        </div>
      </div>
    </div>
  </>
);
