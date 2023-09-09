const accountId = props.accountId ?? context.accountId;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const image = profile.image;

const isBeta = props.beta === undefined ? true : props.beta;

return (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(to right, black, #3a0201, black)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
      zIndex: 0,
    }}
  >
    <div style={{ width: "100%" }}>
      <div
        style={{
          background: "#415697",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "262px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://ipfs.near.social/ipfs/bafkreid25lsb6p73u3zpb7et23qc66fe63knsi22xneuzo3of4m4dnjqgu"
          alt="coinTAG"
          style={{
            height: "200px",
            width: "200px",
          }}
        />
      </div>
      <div
        style={{
          background: "#1b2441",
          height: "181px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ width: "auto" }}>
          <input
            type="text"
            value={state.prompt}
            style={{
              width: "auto",
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              border: "1px solid white",
            }}
            onChange={(e) => {
              state.prompt = e.target.value;
              State.update(state);
            }}
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "75px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>

      <div
        style={{
          background: "orange",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "330px",
          width: "100%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Widget
          src="near/widget/Explorer.Iframe"
          props={{
            url: `${isBeta ? "beta/" : ""}accounts/${accountId}`,
            query: { language: props.language, embedded: true },
            network: props.network,
            baseUrl: props.baseUrl,
          }}
        />
      </div>
      <div
        style={{
          background: "#415697",
          backgroundSize: "auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "126px",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </div>
  </div>
);
