const accountId = props.accountId ?? context.accountId;
const profile = props.profile ?? Social.getr(`${accountId}/profile`);

// Initialize state
State.init({
  entries: [],
  prompt: "",
});

const handleApply = () => {
  if (state.prompt.trim()) {
    State.update({ entries: [...state.entries, state.prompt], prompt: "" });
  }
};

function convertToCSV(array) {
  return array.join("\r\n");
}

function downloadCSV() {
  let csv = convertToCSV(state.entries);
  let blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  let link = document.createElement("a");

  if (link.download !== undefined) {
    let url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "tags.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

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
      {/* Image Section */}
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

      {/* Welcome Section */}
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
        <span>Bem Vindo {accountId}</span>
      </div>

      {/* Input Section */}
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
            paddingLeft: "10px",
            paddingRight: "10px",
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
              marginLeft: "10px",
              marginRight: "10px",
            }}
            onClick={handleApply}
            disabled={!state.prompt.trim()}
          >
            APLICAR
          </button>
        </div>
        <button onClick={downloadCSV}>Export CSV</button>
      </div>

      {/* Tags Display Section */}
      <div
        style={{
          background: "orange",
          height: "330px",
          width: "100%",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "10px 0",
          overflowY: "auto",
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
              marginLeft: "10px",
              marginRight: "10px",
            }}
          >
            <span>{entry}</span>
            <input type="checkbox" className="squareCheckbox" />
          </div>
        ))}
      </div>

      {/* Widget Section */}
      <div
        style={{
          background: "#415697",
          height: "auto",
          width: "100%",
          color: "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Widget
            src="near/widget/Explorer.Account"
            props={{
              accountId,
              network: context.networkId,
              language: "en",
              baseUrl: props.baseUrl,
            }}
          />
        </div>
      </div>
    </div>
  </div>
);
