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

function convertToCSV(objArray) {
  const array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  let str = "";

  for (let i = 0; i < array.length; i++) {
    let line = "";
    for (let index in array[i]) {
      if (line !== "") line += ",";
      line += array[i][index];
    }
    str += line + "\r\n";
  }
  return str;
}

function downloadCSV(tags) {
  let csv = convertToCSV(tags);
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

const Tabs = styled.div`
  display: flex;
  height: 48px;
  border-bottom: 1px solid #eceef0;
  margin-bottom: 72px;
  overflow: auto;
  scroll-behavior: smooth;

  @media (max-width: 1024px) {
    background: #f8f9fa;
    border-top: 1px solid #eceef0;
    margin: 0 -12px 48px;

    > * {
      flex: 1;
    }
  }
`;

const TabsButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-weight: 600;
  font-size: 12px;
  padding: 0 12px;
  position: relative;
  color: ${(p) => (p.selected ? "#11181C" : "#687076")};
  background: none;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none !important;

  &:hover {
    color: #11181c;
  }

  &::after {
    content: "";
    display: ${(p) => (p.selected ? "block" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #59e692;
  }
`;

const allNumbers = Array.from(Array(100).keys());

State.init({
  displayNums: [],
  lastNumber: 0,
});

const loadNumbers = (page) => {
  allNumbers
    .slice(state.lastNumber, state.lastNumber + 10)
    .map((n) => numberToElem(n))
    .forEach((i) => state.displayNums.push(i));
  state.lastNumber += 10;
  State.update();
};

const numberToElem = (number) => <div> {number} </div>;

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
        <button onClick={() => downloadCSV(state.tags)}>Export CSV</button>
      </div>
      <div
        style={{
          background: "orange",
          height: "330px",
          width: "100%",
          color: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Changed to flex-start
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
      >
        <div>
          <InfiniteScroll
            loadMore={loadNumbers}
            hasMore={state.displayNums.length < allNumbers.length}
          >
            <p>{state.displayNums}</p>
            <Widget
              src="near/widget/Explorer.Account"
              props={{
                accountId,
                network: context.networkId,
                language: "en",
                baseUrl: props.baseUrl,
              }}
            />
          </InfiniteScroll>
        </div>
      </div>
    </div>
  </div>
);
