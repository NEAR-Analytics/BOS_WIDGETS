const accountId = props.accountId ?? context.accountId;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);

// Initialize state
State.init({
  isLoaded: false,
  entries: [],
  prompt: "",
});

const handleApply = () => {
  if (state.prompt.trim()) {
    State.update({ entries: [...state.entries, state.prompt], prompt: "" });
  }
};

return (
  <div
    style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(to right, white, black, white)",
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      position: "relative",
      overflow: "hidden",
      zIndex: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div style={{ width: "80%" }}>
      <div
        style={{
          background: "#415697",
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
        }}
      >
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            profile,
            fast,
            accountId,
            style: { width: "4rem", height: "4rem", marginRight: "10px" },
            className: "mb-2",
            imageClassName: "rounded-circle w-100 h-100 img-thumbnail d-block",
            thumbnail: false,
          }}
        />
        <span>Bem Vindo {accountId}</span>
      </div>
      <div
        style={{
          backgroundColor: "white",
          height: "250px",
          padding: "20px 0",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <p
          style={{
            color: "black",
            fontFamily: '"Press Start 2P", sans-serif',
            marginBottom: "10px",
          }}
        >
          Escreva a TAG
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "10px",
            width: "100%",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={state.prompt}
            style={{
              flex: 2,
              backgroundColor: "black",
              color: "white",
              fontFamily: '"Press Start 2P", sans-serif',
              border: "1px solid white",
              marginRight: "10px",
              marginLeft: "10px",
            }}
            onChange={(e) => {
              state.prompt = e.target.value;
              State.update(state);
            }}
          />
          <button
            style={{
              flex: 1,
              backgroundColor: state.prompt.trim() ? "#000" : "#aaa",
              color: state.prompt.trim() ? "#fff" : "#888",
              cursor: state.prompt.trim() ? "pointer" : "not-allowed",
            }}
            onClick={handleApply}
            disabled={!state.prompt.trim()}
          >
            APLICAR
          </button>
        </div>
        <button>Export CSV</button>
      </div>
      <div
        style={{
          background: "orange",
          height: "330px",
          width: "100%",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
        }}
      >
        {state.entries.map((entry, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "80%",
              padding: "5px",
              background: "white",
              borderRadius: "5px",
              margin: "10px 0",
            }}
          >
            <span>{entry}</span>
            <input type="checkbox" className="squareCheckbox" />
          </div>
        ))}
      </div>
      <div
        style={{
          background: "#415697",
          height: "126px",
          width: "100%",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    </div>
  </div>
);
