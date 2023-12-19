const arrowDownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="11"
    height="7"
    viewBox="0 0 11 7"
    fill="none"
  >
    <path
      d="M1 1L5.14645 5.14645C5.34171 5.34171 5.65829 5.34171 5.85355 5.14645L10 1"
      stroke="#656973"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

State.init({
  selectedToken: 0,
});

const strTokenList = fetch(
  `https://raw.githubusercontent.com/SainyTK/contract-list/main/tokens/${props.chainId}.json`
).body;
const strChainInfo = fetch(
  `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/chains/eip155-${props.chainId}.json`
).body;

let tokenList = [];
let chainInfo = {};
let logoUrl = "https://chainlist.org/unknown-logo.png";

try {
  tokenList = JSON.parse(strTokenList);
  chainInfo = JSON.parse(strChainInfo);
  console.log(chainInfo);
  if (chainInfo.icon) {
    logoUrl = `https://icons.llamao.fi/icons/chains/rsz_${chainInfo.icon}.jpg`;
  }
} catch (e) {}

const selectedToken = tokenList[state.selectedToken];

function handleSelect(index) {
  State.update({ selectedToken: index });

  if (typeof props.onChange === "function") {
    props.onChange(tokenList[index]);
  }
}

return (
  <div style={{ width: "100%" }}>
    <div class="dropdown">
      <button
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{
          width: "100%",
          display: "flex",
          borderRadius: "8px",
          border: "1px solid #E9EBED",
          background: "#FFF",
          color: "#262930",
        }}
      >
        {selectedToken ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <img
                src={selectedToken.logoURI}
                width={24}
                height={24}
                className="rounded-full mx-1"
              />
              <span style={{ fontSize: "14px", fontWeight: 500 }}>
                {selectedToken.symbol}
              </span>
            </div>
            <div>{arrowDownIcon}</div>
          </div>
        ) : (
          <span>Select a token</span>
        )}
      </button>

      <ul
        class="dropdown-menu"
        aria-labelledby="dropdownMenuButton1"
        style={{
          width: "100%",
          border: "1px solid #E9EBED",
          background: "#FFF",
          color: "#262930",
          borderRadius: "8px",
          boxShadow: " 8px 8px 16px -4px rgba(16, 24, 40, 0.08)",
          padding: "0px 8px 0px 8px",
        }}
      >
        {tokenList &&
          tokenList.slice(0, 5).map((token, index) => (
            <li
              key={index}
              onClick={() => handleSelect(index)}
              style={{
                borderBottom:
                  index !== tokenList.length - 1 && "1px solid #E9EBED",
              }}
            >
              <div class="dropdown-item" href="#" style={{ padding: "14px" }}>
                <img
                  src={token.logoURI}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span
                  style={{ fontSize: "12px", fontWeight: 500, marginLeft: 1 }}
                >
                  {token.symbol}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  </div>
);
