// In order to debug, use the code version with comments & types
// Find it here: https://github.com/dredshep/balancer-pools-bos/blob/master/Widgets/BalancerPool/BalancerPool-table-row.jsx

const erc20ABI = fetch(
  "https://raw.githubusercontent.com/dredshep/dev/main/abi.json"
).body;

State.init({
  poolBalance: undefined,
  errorGettingBalance: undefined,
  userAddress: undefined,
  refreshTick: 0,
  seeMore: false,
});

function toggleSeeMore() {
  State.update({ seeMore: !state.seeMore });
}

if (state.errorGettingBalance)
  console.log("Error getting balance: ", state.errorGettingBalance);

const missingProps = [];

if (!props.pool) missingProps.push("pool (TransformedPool)");
if (!props.operation) missingProps.push('operation ("stake" | "unstake")');
if (!props.vaultAddress) missingProps.push("vaultAddress (string)");
if (!props.balancerQueriesAddress)
  missingProps.push("balancerQueriesAddress (string)");
if (props.pool && !props.pool.id)
  missingProps.push("pool has no id, check type (TransformedPool)");
if (props.pool && !props.pool.owner)
  missingProps.push("pool has no owner, check type (TransformedPool)");
if (props.pool && !props.pool.createTime)
  missingProps.push("pool has no createTime, check type (TransformedPool)");
if (!props.chainId) missingProps.push("chainId (number | string)");

const pool = props.pool;

const VAULT_ADDRESS = props.vaultAddress;

const BALANCER_QUERIES_ADDRESS = props.balancerQueriesAddress;

const CHAIN_ID = props.chainId;

function MissingPropsWarning({ missingProps }) {
  return (
    <div
      className="card border-warning mb-3 shadow"
      style={{ maxWidth: "30rem", margin: "auto" }}
    >
      <div className="card-header text-white bg-warning">
        <h4 className="card-title mb-0">Attention!</h4>
      </div>
      <div className="card-body text-danger">
        <p className="card-text">
          There {missingProps.length === 1 ? "is" : "are"} {missingProps.length}{" "}
          missing prop{missingProps.length === 1 ? "" : "s"}:
        </p>
        <ul className="list-group list-group-flush">
          {missingProps.map((prop) => (
            <li key={prop} className="list-group-item">
              <pre className="m-0">{prop}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

if (missingProps.length) {
  return <MissingPropsWarning missingProps={missingProps} />;
}

const userAddress = Ethers.send("eth_requestAccounts", [])[0];
State.update({ userAddress });

function getUserBalance(poolAddress, userAddress) {
  if (!Ethers.provider()?.getSigner?.()) {
    State.update({
      userAddress: undefined,
      errorGettingBalance: "No signer, user disconnected",
    });
    console.log("No signer, user disconnected, exiting getUserBalance()");
    return;
  }
  try {
    const erc20 = new ethers.Contract(
      poolAddress,
      erc20ABI,
      Ethers.provider().getSigner()
    );
    if (!userAddress) return;
    const balance = erc20.balanceOf(userAddress).then((balance) => {
      const formattedBalance = ethers.utils.formatUnits(balance, 18);
      return formattedBalance;
    });
    return balance;
  } catch (e) {
    return `Error in getUserBalance(). params:
- poolAddress: ${poolAddress}
- userAddress: ${userAddress}
- error: ${e}`;
  }
}

function getUserBalanceOnceAndUpdateState(poolAddress, userAddress) {
  if (!userAddress) {
    console.log("No user address, exiting getUserBalanceOnceAndUpdateState()");
    return;
  }
  if (!poolAddress) {
    console.log("No pool address, exiting getUserBalanceOnceAndUpdateState()");
    return;
  }
  const balanceProcessor = getUserBalance(poolAddress, userAddress);
  if (typeof balanceProcessor === "string") {
    console.log(
      "Error getting balance using getUserBalanceOnceAndUpdateState():",
      balanceProcessor
    );
    return;
  }
  if (balanceProcessor && balanceProcessor.then) {
    balanceProcessor.then((newBalance) => {
      State.update({
        poolBalance: newBalance,
      });
    });
  } else {
    console.log(
      "Got balance using getUserBalanceOnceAndUpdateState(); it was undefined."
    );
  }
}
let updatedBalance;
if (!updatedBalance) {
  getUserBalanceOnceAndUpdateState(pool.address, state.userAddress);
}
updatedBalance = true;

function getPoolBalance({}) {
  const userAddress = Ethers.signer().getAddress();
  if (!userAddress) State.update({ errorGettingBalance: "Not connected" });
  const { tokens } = pool;
  const tokenAddresses = tokens.map((token) => token.address);
  const contract = new ethers.Contract(
    userAddress,
    erc20ABI,
    Ethers.provider().getSigner()
  );
  const balance = contract.balanceOf(pool.address);
  return balance;
}

const VerticalPair = ({ title, value, end }) => {
  const isEnd = !!end;
  return (
    <div className="d-flex flex-column align-items-start">
      <p
        className={
          "text-secondary text-uppercase fw-bold mb-0 text-nowrap " +
          (isEnd ? " text-end" : "")
        }
        style={{
          fontSize: "0.9rem",
          letterSpacing: "0.033rem",
        }}
      >
        {title}
      </p>
      <p className={"fw-bold" + (isEnd ? " text-end" : "") + " fs-5"}>
        {value || "-"}
      </p>
    </div>
  );
};

const stakeWidgetProps = {
  pool,
  operation: "stake",
  vaultAddress: VAULT_ADDRESS,
  balancerQueriesAddress: BALANCER_QUERIES_ADDRESS,
};

const unstakeWidgetProps = {
  pool,
  operation: "unstake",
  vaultAddress: VAULT_ADDRESS,
  balancerQueriesAddress: BALANCER_QUERIES_ADDRESS,
};

const PrettyTable = styled.div`
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border-radius: 20px; /* rounded corners */
    overflow: hidden; /* for rounded corners */
    background: #333; /* dark mode */
    color: #fff; /* text color */

    th,
    td {
      padding: 16px;
    }
    thead tr {
      background-color: #222; /* dark grey */
      text-align: left;
      /*&:hover {
        background: #1f1f1f; /* hover effect */
      }*/
    }
    tbody 
    tbody tr:nth-child(odd) {
      background-color: #333; /* alternate row color */
      /*&:hover {
        background: #2f2f2f; /* hover effect */
      }*/
    }
    tbody tr:nth-child(even) {
      background-color: #222; /* alternate row color */
      /*&:hover {
        background: #1f1f1f; /* hover effect */
      }*/
    }
  }
`;

const HoverableTd = styled.td`
  /* align td content center in the table way */
  text-align: center;
  &:hover {
    background: #2f2f2f; /* hover effect */
    cursor: pointer; /* hand cursor on hover */
  }
`;

const ImageWithPlaceholder = ({
  imageUrl,
  placeholderUrl,
  index,
  length,
  alt,
}) => {
  const imageExists = fetch(imageUrl)?.body;
  const zIndex = length - index;
  const marginLeft = index === 0 ? "" : "-7px";
  return imageExists ? (
    <img
      src={imageUrl}
      alt={alt}
      width="24"
      height="24"
      className="rounded-circle"
      style={{
        marginLeft,
        zIndex,
      }}
    />
  ) : (
    <img
      src={placeholderUrl}
      alt={alt}
      width="24"
      height="24"
      className="rounded-circle"
      style={{ marginLeft, zIndex }}
    />
  );
};

function stringNumToFixed2(stringNum) {
  return stringNum === undefined ? undefined : parseFloat(stringNum).toFixed(2);
}

function unixTimeToISO(unixTime) {
  return new Date(unixTime * 1000).toISOString().slice(0, 10);
}

function addressTo3Colors(address) {
  const hexColors = address.slice(2);
  const color1 = hexColors.slice(0, 6);
  const color2 = hexColors.slice(6, 12);
  const color3 = hexColors.slice(12, 18);
  return `shape1Color=${color1}&shape2Color=${color2}&shape3Color=${color3}`;
}

function CoolTr() {
  return (
    <tr
      onClick={() => {
        toggleSeeMore();
      }}
    >
      <td>
        <div className="d-flex">
          {pool.tokensList.map((token, index, arr) => (
            <ImageWithPlaceholder
              key={token}
              imageUrl={`https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/${token}.png`}
              placeholderUrl={`https://api.dicebear.com/6.x/shapes/svg?seed=${token}&height=24&width=24&${addressTo3Colors(
                token
              )}`}
              alt={token}
              index={index}
              length={arr.length}
            />
          ))}
        </div>
      </td>
      <td>{pool.tokens.map((t) => t.symbol).join(" / ")}</td>
      <td>
        <Widget
          src="c74edb82759f476010ce8363e6be15fcb3cfebf9be6320d6cdc3588f1a5b4c0e/widget/APRText"
          props={{
            chainId: CHAIN_ID,
            poolId: pool.id,
          }}
        />
      </td>
      <td>{pool.totalValueLocked}</td>
      <td>
        {stringNumToFixed2(state.poolBalance) ?? "-"}
        {state.poolBalance ? "BPT" : ""}
      </td>
      <Popover.Root>
        <HoverableTd
          style={{
            padding: 0,
            borderSpacing: 0,
            height: "45px",
            width: "45px",
          }}
        >
          <Popover.Content asChild>
            <div
              className="border-2 border-secondary rounded-4 shadow border-bottom-1"
              style={{
                zIndex: "3",
                backgroundColor: "#393e41",
                maxWidth: "472px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center pb-4 border-bottom border-secondary pt-4 px-4">
                <div>
                  <h5 className="text-light fw-bold d-flex p-0 m-0">
                    Pool Details
                  </h5>
                </div>
                <div>
                  <Popover.Close className="btn btn-sm btn-secondary">
                    <i className="bi bi-x-lg text-white"></i>
                  </Popover.Close>
                </div>
              </div>
              <div className="d-flex w-100 gap-5 col-12 p-4">
                <div className="col-md-6">
                  <VerticalPair
                    end={false}
                    title="Amount of Holders"
                    value={`${pool.holdersCount}`}
                  />
                  <VerticalPair
                    end={false}
                    title="Owner"
                    value={
                      <a
                        href={`https://etherscan.io/address/${pool.owner}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {pool.owner.slice(0, 6) +
                          "..." +
                          pool.owner.slice(pool.owner.length - 6)}
                      </a>
                    }
                  />
                </div>
                <div className="col-md-6">
                  <VerticalPair
                    end={false}
                    title="Token Balance"
                    value={pool.tokens.reduce(
                      (acc, token) =>
                        acc +
                          parseFloat(
                            stringNumToFixed2(token.totalBalanceNotional) || "0"
                          ) || 0,
                      0
                    )}
                  />
                  <VerticalPair
                    end={false}
                    title="Create Time"
                    value={unixTimeToISO(pool.createTime)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between text-light fw-bold rounded-top align-items-center px-4">
                <div>
                  {/* 2x2 grid with some info like amount of holders, pool type, token composition (weights) */}
                  <div className="col-md-6">
                    <table
                      className="table table-sm table-transparent text-light"
                      style={{
                        maxWidth: "200px",
                        marginTop: "-0.25rem",
                      }}
                    >
                      <thead>
                        <tr className="border-secondary">
                          <th className="fw-bold">Token</th>
                          <th className="fw-bold">Weight</th>
                          <th className="fw-bold">Balance</th>
                          <th className="fw-bold">USD&nbsp;Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pool.tokens.map((t) => (
                          <tr key={t.symbol}>
                            <td title={t.name}>{t.symbol}</td>
                            <td>
                              {pool.tokenWeights.find(
                                (w) => w.address === t.address
                              )
                                ? `${
                                    (pool?.tokenWeights?.find(
                                      (w) => w.address === t.address
                                    )?.weight ?? 0) * 100
                                  }%`
                                : "N/A"}
                            </td>
                            <td key={"balance" + t.address + state.refreshTick}>
                              {stringNumToFixed2(t.totalBalanceNotional)}
                            </td>
                            <td key={"price" + t.address + state.refreshTick}>
                              ${parseFloat(t.latestUSDPrice || "0").toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end gap-3 pb-4 px-4">
                {state.refreshTick >= 0 && (
                  <div className="d-flex gap-3 mt-4">
                    <button
                      className="btn btn-sm btn-outline-secondary fs-5 pt-2"
                      onClick={() => {
                        getUserBalanceOnceAndUpdateState(
                          pool.address,
                          userAddress
                        );
                        State.update({
                          refreshTick: state.refreshTick + 1,
                        });
                      }}
                    >
                      <i className="bi bi-arrow-clockwise"></i>
                    </button>
                    <div style={{ maxWidth: "150px" }}>
                      <Widget
                        src="c74edb82759f476010ce8363e6be15fcb3cfebf9be6320d6cdc3588f1a5b4c0e/widget/StakeUnstakeButtonAndForm"
                        props={{ ...unstakeWidgetProps }}
                        key={(state.refreshTick + 1).toString()}
                      />
                    </div>
                    <div style={{ maxWidth: "150px" }}>
                      <Widget
                        src="c74edb82759f476010ce8363e6be15fcb3cfebf9be6320d6cdc3588f1a5b4c0e/widget/StakeUnstakeButtonAndForm"
                        props={{ ...stakeWidgetProps }}
                        key={(state.refreshTick + 2).toString()}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Popover.Content>
          <Popover.Trigger
            className="d-flex justify-content-center align-items-center"
            asChild
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <i
              className="bi bi-graph-up-arrow text-primary"
              style={{
                filter: "hue-rotate(40deg) saturate(80%) brightness(115%)",
              }}
            ></i>
          </Popover.Trigger>
        </HoverableTd>
      </Popover.Root>
    </tr>
  );
}

return <CoolTr />;
