const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !props.profile;

const name = profile.name || "No-name profile";
const image = profile.image;
const title = props.title ?? `${name} @${accountId}`;

if (profile === null) {
  return "Loading";
}

return (
  <>
    <div class="container">
      <div class="row">
        <div class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
          <div class="container-fluid">
            <button
              data-mdb-collapse-init
              class="navbar-toggler"
              type="button"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <a class="navbar-brand mt-2 mt-lg-0" href="#">
                <span style={{ color: "#61aac9" }}>BOS</span> Smart
                <span style={{ color: "#6195c9a" }}>Mint</span>
              </a>
            </div>

            <div class="d-flex align-items-center">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item me-2">
                  <a
                    class="btn btn-outline-primary"
                    href="https://near.org/mohaa.near/widget/create"
                  >
                    CREATE
                  </a>
                </li>
                <li class="nav-item me-2">
                  <a
                    class="btn btn-outline-success"
                    href="https://near.org/mohaa.near/widget/create"
                  >
                    COLLECTIONS
                  </a>
                </li>
                <li class="nav-item me-2">
                  <a
                    class="btn btn-outline-success"
                    href="https://near.org/mohaa.near/widget/create"
                  >
                    DROPS
                  </a>
                </li>
              </ul>
              <div class="dropdown">
                <a
                  data-mdb-dropdown-init
                  class="dropdown-toggle d-flex align-items-center hidden-arrow"
                  href="#"
                  id="navbarDropdownMenuAvatar"
                  role="button"
                  aria-expanded="false"
                >
                  <Widget
                    src="mob.near/widget/Image"
                    props={{
                      image,
                      alt: title,
                      className: "rounded-circle",
                      style: { height: "35px", width: "35px" },
                      loading: "lazy",
                      thumbnail,
                      fallbackUrl:
                        "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
                    }}
                  />
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuAvatar"
                >
                  <li>
                    <a class="dropdown-item" href="#">
                      My profile
                    </a>
                  </li>

                  <li>
                    <a class="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mt-5">
          <h1>
            BOS Smart<span style={{ color: "#6195c9" }}>Mint</span>
          </h1>

          <p
            style={{
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            TAKE
            <br /> CONTROL OF
            <br /> YOUR NFT
            <br /> DROPS AND
            <br /> COLLECTIONS
          </p>
          <p>
            Easily create, mint and sell NFTs on custom smart contracts via our
            no-code solution
          </p>
          <a
            href="https://near.org/mohaa.near/widget/create"
            class="btn btn-primary text-center"
          >
            TRY SMARTMINT TODAY
          </a>
        </div>
        <div class="col-md-6 bg-success">
          <img
            src="https://image.shutterstock.com/image-photo/gradient-mint-green-teal-urban-260nw-2080157074.jpg"
            style={{ maxWidth: "100%" }}
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <h2>
            <i class="fa fa-dollar-sign"></i>No-code NFT smart Contracts
          </h2>
          <p>
            Easily create and deploy NFT Smart Contracts across various
            standards like Ethereum and Solana via our no-code soluion.
          </p>
        </div>
        <div class="col-md-6">
          <h2>Securely store NFT metadata on Pastel’s cascade</h2>
          <p>
            Your NFT is safe and secure, with metadata from every mint stored on
            Cascade - a distributed, permanent storage system designed for NFT
            data. Pay once, store forever.
          </p>
        </div>
        <div class="col-md-6">
          <h2>No-code NFT smart Contracts</h2>
          <p>
            Easily create and deploy NFT Smart Contracts across various
            standards like Ethereum and Solana via our no-code soluion.
          </p>
        </div>
        <div class="col-md-6">
          <h2>Mint single drop or entire collections</h2>
          <p>
            Whether you want to mint a single limited edition NFT or an entire
            collection, we handle the entire creation and deployment for you.
          </p>
        </div>
        <div class="col-md-6">
          <h2>Add custom properties and metadata</h2>
          <p>
            Intuitively add custom properties, traits, and metadata to your
            creations without being limited to existing standards.
          </p>
        </div>
        <div class="col-md-6">
          <h2>Multi-chain support</h2>
          <p>
            SmartMint currently supports multiple chains including Ethereum,
            Polygon, and Solana. Additional support for additional blockchains
            and layer 2 solutions coming soon.
          </p>
        </div>
      </div>
    </div>
  </>
);
