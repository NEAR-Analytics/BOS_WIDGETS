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
                <span style={{ color: "#61aac9" }}> TIC </span> TAC
                <span style={{ color: "#6195c9" }}>TOE</span> ON BOS
              </a>
            </div>

            <div class="d-flex align-items-center">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mt-5">
          <h1>
            <span style={{ color: "#6195c9" }}>TIC</span> TAC{" "}
            <span style={{ color: "#6195c9" }}>TOE</span>
          </h1>

          <p
            style={{
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            X marks the spot,
            <span style={{ color: "#6195c9" }}>but O won't go.</span>
            <br /> Xs and Os,
            <span style={{ color: "#6195c9" }}>forever foes.</span>
            <br /> Think before you X,
            <span style={{ color: "#6195c9" }}>or you'll be O for effort.</span>
          </p>
          <a
            href="https://near.org/yousouf.near/widget/ear.otg"
            class="btn btn-primary text-center"
          >
            I KNOW YOU WANNA,
            <h4>
              <strong>GIVE IT A GO </strong>
            </h4>
          </a>
        </div>

        <div class="col-md-6 flex items-center">
          <img
            src="https://t3.ftcdn.net/jpg/06/15/41/72/360_F_615417282_RM74va9wUJcqi8vt8vi8gVTxaQAutqr4.jpg"
            style={{ maxWidth: "100%", margin: "25px" }}
          />
        </div>
      </div>
    </div>
  </>
);
