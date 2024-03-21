return (
  <>
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
              Bruv you won’t be able to use, trade or $LONK without a wallet, so
              create a FREE wallet here with prepaid gas. (yes we know NEAR tech
              is awesome)
            </p>
            <p>
              <a
                href="https://my.shard.dog/"
                class="button d-inline-block text-decoration-none py-1 px-5 border rounded-5"
              >
                <img src={props.image12} width="205" />
              </a>
            </p>
            <p>Some gud NEAR wallets:</p>
            <p>
              <a
                href="https://meteorwallet.app/"
                target="_blank"
                class="text-decoration-none d-inline-block me-1"
              >
                <img src={props.image13} alt="NEAR Wallet" width="50" />
              </a>

              <a
                href="https://herewallet.app/"
                target="_blank"
                class="text-decoration-none d-inline-block me-1"
              >
                <img src={props.image14} alt="NEAR Wallet" width="50" />
              </a>

              <a
                href="https://mynearwallet.com/"
                target="_blank"
                class="text-decoration-none d-inline-block me-1"
              >
                <img src={props.image15} alt="NEAR Wallet" width="50" />
              </a>

              <a
                href="https://sender.org/"
                target="_blank"
                class="text-decoration-none d-inline-block me-1"
              >
                <img src={props.image16} alt="NEAR Wallet" width="50" />
              </a>

              <a
                href="https://nightly.app/"
                target="_blank"
                class="text-decoration-none d-inline-block me-1"
              >
                <img src={props.image17} alt="NEAR Wallet" width="50" />
              </a>

              <a
                href="https://wallet.mintbase.xyz"
                target="_blank"
                class="text-decoration-none d-inline-block me-1"
              >
                <img src={props.image18} alt="NEAR Wallet" width="50" />
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
              <strong>USDC</strong> can be bought and withdrawn from all major
              exchanges:
            </p>
            <p>
              <a
                href="https://www.binance.com/en/trade/NEAR_USDT"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image19} alt="NEAR Wallet" width="50" />
              </a>
              <a
                href="https://www.okx.com/trade-spot/near-usdt"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image20} alt="NEAR Wallet" width="50" />
              </a>
              <a
                href="https://www.gate.io/trade/NEAR_USDT"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image21} alt="NEAR Wallet" width="50" />
              </a>
              <a
                href="https://www.coinbase.com/price/near-protocol"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image22} alt="NEAR Wallet" width="50" />
              </a>
              <a
                href="https://www.kucoin.com/trade/NEAR-USDT"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image23} alt="NEAR Wallet" width="50" />
              </a>
              <a
                href="https://www.kraken.com/prices/near-protocol"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image24} alt="NEAR Wallet" width="50" />
              </a>
              <a
                href="https://www.bybit.com/en/trade/spot/NEAR/USDT"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image25} alt="NEAR Wallet" width="50" />
              </a>
              <a
                href="https://crypto.com/price/near-protocol"
                target="_blank"
                class="text-decoration-none d-inline-block me-1 mb-1"
              >
                <img src={props.image26} alt="NEAR Wallet" width="50" />
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
                class="ref button bg-light d-flex justify-content-center align-items-center text-decoration-none rounded-5"
              >
                <img src={props.image6} width="186" />
              </button>{" "}
            </p>
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
