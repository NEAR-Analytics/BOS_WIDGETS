const { format, Token } = VM.require(`memelol.near/widget/lol.Utils`);
const { Modal } = VM.require(`memelol.near/widget/lol.Components.Modal`);
const { Button } = VM.require(`memelol.near/widget/lol.Components.Button`);
const { contractName, transactionHashes } = props;

const Container = styled.div`
  font-size: 18px;
  padding: 1rem;

  .general-stats {
    flex-direction: row;
    @media screen and (max-width: 786px) {
      flex-direction: column;
    }
  }

  .hr {
    height: 1px;
    background: #000;
    width: 100%;
  }

  .results {
    max-height: 150px;
    overflow-y: scroll;

    .item {
      padding: 5px 0;
    }
    .token {
      width: 70px;
    }
    .token-near {
      width: 50px;
    }

    .txn small {
      @media screen and (max-width: 786px) {
        display: none;
      }
    }
  }
  @media screen and (max-width: 786px) {
    padding: 0.5rem;
  }
`;

const [myStats, setMyStats] = useState({
  receivedBoxes: 0,
  receivedNear: 0,
  receivedLoL: 0,
});

const [showMintModal, setShowMintModal] = useState(false);
const [mintResults, setMintResults] = useState([]);

const fetchMyStats = () => {
  const stats = Near.view(contractName, "get_user_rewards", {
    owner_id: context.accountId,
  });
  setMyStats({
    receivedLoL: format(new Big(stats[0] || 0).toNumber(), 24),
    receivedNear: format(new Big(stats[1] || 0).toNumber(), 24),
    receivedBoxes: stats[2],
  });
};

const checkTxnMethod = (res, name) => {
  const txn = res.body.result.transaction;

  return (
    res.body.result.status.SuccessValue &&
    txn.signer_id === context.accountId &&
    txn.actions[0].FunctionCall.method_name === name
  );
};

const fetchMintResult = async () => {
  if (!transactionHashes) return;
  const mintResults = [];

  transactionHashes.split(",").map((tx) => {
    asyncFetch("https://rpc.near.org", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "dontcare",
        method: "tx",
        params: [tx, context.accountId],
      }),
    }).then((res) => {
      if (checkTxnMethod(res, "open_box")) {
        const results = res.body.result.receipts_outcome
          ?.map((o) => o.outcome.logs.find((l) => l.includes("Reward")))
          ?.filter((el) => el);
        const parsedRes = results?.map((res) => res.split(":")[1].split(", "));

        mintResults.push(
          parsedRes.map((el) => [
            el[0],
            el[1],
            Big(el[2]).toNumber(),
            Big(el[3]).toNumber(),
            tx,
          ])[0],
        );

        setMintResults(mintResults);
        setShowMintModal(true);
      }
    });
  });
};
if (mintResults.length === 0) {
  fetchMintResult();
}

fetchMyStats();

const totalReward = (index) =>
  mintResults.map((res) => res[index]).reduce((a, b) => a + b, 0);

const shareLink = (lol, near) =>
  `https://twitter.com/intent/tweet?text=%F0%9F%9A%80%20I've%20won%20${lol}%20$LOL%20${
    near ? `and%20${near}%20$NEAR` : ""
  }%0A%F0%9F%8E%81%20Check%20out%20https%3A//near.org/memelol.near/widget/lol.App%0A%0A%E2%86%97%EF%B8%8F%20%40LOLMemecoin%0A%40near_protocol%20%23near%20%23memecoin%20%23lolmemecoin%20%23lolresults`;

return (
  <>
    {context.accountId && (
      <>
        {showMintModal && (
          <Modal isOpen onClose={() => setShowMintModal(false)}>
            <Container className="d-flex flex-column gap-4 justify-content-center">
              <div className="d-flex flex-column gap-3 justify-content-center">
                <h4>You've got:</h4>
                <div className="general-stats d-flex gap-4 justify-content-center">
                  <Token size={40}>
                    <h1>{format(totalReward(2), 24)}</h1>
                  </Token>

                  {totalReward(3) > 0 && (
                    <Token near size={40}>
                      <h1>{format(totalReward(3), 24)}</h1>
                    </Token>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <Button
                  style={{ width: "200px", padding: "15px 25px 15px 45px" }}
                >
                  <a
                    className="w-100 d-flex justify-content-between align-items-center"
                    href={shareLink(
                      format(totalReward(2), 24),
                      totalReward(3) > 0 ? format(totalReward(3), 24) : null,
                    )}
                  >
                    <span>Share</span>
                    <i className="bi bi-share" />
                  </a>
                </Button>
              </div>
              <div className="d-flex gap-3 justify-content-between align-items-center">
                <div className="hr" />
                <div>Transactions</div>
                <div className="hr" />
              </div>
              {mintResults && (
                <div className="results">
                  {mintResults.map((res) => (
                    <div className="item d-flex gap-3 justify-content-between">
                      <small>Received</small>
                      <div className="token">
                        <Token
                          size={22}
                          className="font justify-content-end d-flex gap-2 align-items-center"
                        >
                          <small>{format(res[2], 24)}</small>
                        </Token>
                      </div>
                      <small>and</small>
                      <div className="token-near">
                        <Token
                          near
                          size={22}
                          className="font justify-content-end d-flex gap-2 align-items-center"
                        >
                          <small>{format(res[3], 24)}</small>
                        </Token>
                      </div>
                      <div className="txn">
                        <a href={`https://nearblocks.io/txns/${res[4]}`}>
                          <i className="bi bi-box-arrow-up-right" />{" "}
                          <small>View in explorer</small>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Container>
          </Modal>
        )}

        <div className="mint-section my-stats">
          <h1 className="font">My Stats</h1>
          <div className="d-flex flex-column gap-2 justify-content-center">
            <div>
              <small>Box Opened</small>
              <h1 className="font">{myStats.receivedBoxes}</h1>
            </div>
            <div>
              <small>NEAR Received</small>
              <h1 className="font">{myStats.receivedNear}</h1>
            </div>
            <div>
              <small>LOL Received</small>
              <h1 className="font">{myStats.receivedLoL}</h1>
            </div>
          </div>
        </div>
      </>
    )}
  </>
);
