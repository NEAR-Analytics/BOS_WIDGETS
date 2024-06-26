/*
License: MIT
Author: devhub.near
Homepage: https://github.com/NEAR-DevHub/neardevhub-treasury-dashboard.git#readme
*/
/* INCLUDE: "includes//common.jsx" */
const REPL_TREASURY_CONTRACT = "treasurydevhub.near";
const REPL_TREASURY = "megha19.near";
// "dashboard.treasury-devdao.near";
const REPL_DEVHUB = "devhub.near";
// devhub.near;
const REPL_PROPOSAL_CONTRACT =
  "713ed9aef61d14ce3dfeb3f5a55dfdf16c407280267e8de96bce0953d0e1af8c";
const REPL_NEAR = "near";
/* END_INCLUDE: "includes//common.jsx" */

const Container = styled.div`
  .bg-dark-grey {
    background-color: #7e868c;
  }
  .text-white {
    color: white;
  }

  .py-3 {
    padding-block: 1rem !important;
  }

  .flex-item {
    flex: 1;
  }

  .text-small {
    font-size: 12px;
    font-weight: 400;
  }

  .gap-10 {
    gap: 5rem;
  }
`;

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertYoctoToNear(yoctoNear) {
  return (
    <div className="d-flex gap-2 align-items-center">
      {numberWithCommas(Big(yoctoNear).div(Big(10).pow(24)).toFixed(3))}
      <img
        src="https://ipfs.near.social/ipfs/bafkreify3fv4w3yq2vmqe2nobsznpd4pdtkjolaia2c3wfx627zykxvmdi"
        height={15}
      />
    </div>
  );
}

const tokensRes = fetch(
  `https://api.nearblocks.io/v1/account/${REPL_TREASURY_CONTRACT}/tokens`
);
const tokensAndBalances = [];
const tokens = tokensRes.body.tokens.fts ?? [];
for (const token of tokens) {
  const balance = Near.view(token, "ft_balance_of", {
    account_id: REPL_TREASURY_CONTRACT,
  });
  const ftMetadata = Near.view(token, "ft_metadata");
  if (balance !== null) {
    tokensAndBalances.push({
      token,
      balance: balance
        ? numberWithCommas(
            Big(balance).div(Big(10).pow(ftMetadata.decimals)).toFixed()
          )
        : 0,
      symbol: ftMetadata.symbol,
      icon: ftMetadata.icon,
    });
  }
}
const res = fetch(
  `https://api.nearblocks.io/v1/account/${REPL_TREASURY_CONTRACT}`
);
const txns = fetch(
  `https://api.nearblocks.io/v1/account/${REPL_TREASURY_CONTRACT}/ft-txns/count`
);

if (res === null || txns === null) {
  return <>Loading</>;
}

return (
  <Container className="d-flex flex-column gap-4">
    <div className="h5 bold mb-0">Treasury</div>
    <div className="bg-dark-grey text-white p-3 py-3 d-flex gap-2 align-items-center rounded-4">
      <div className="flex-item d-flex gap-2 align-items-center">
        <div className="h3 bold">{REPL_TREASURY_CONTRACT}</div>
        <i
          class="bi bi-copy"
          onClick={() => clipboard.writeText(REPL_TREASURY_CONTRACT)}
        ></i>
      </div>
      <div className="flex-item d-flex gap-10 text-small">
        <div>
          <p>NEAR</p>
          <p className="h5 bold">
            {convertYoctoToNear(res.body?.account[0]?.amount)}
          </p>
        </div>
        {tokensAndBalances.map((item) => (
          <div>
            <p>{item.symbol}</p>
            <p className="h5 bold">
              {item.balance} {item.icon && <img src={item.icon} height={20} />}
            </p>
          </div>
        ))}
        <div>
          <p>Transactions</p>
          <p className="h5 bold">{txns?.body?.txns?.[0]?.count}</p>
        </div>
      </div>
      <div>
        <img
          src="https://ipfs.near.social/ipfs/bafkreicprzqio2e42dd5pk2cklqdxkwprukwac236air7gfxez6rgl57y4"
          height={25}
        />
      </div>
    </div>
  </Container>
);
