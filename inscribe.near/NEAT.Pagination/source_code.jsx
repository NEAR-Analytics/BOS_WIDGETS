const TGas = Big(10).pow(12);
const MaxGasPerTransaction = TGas.mul(250);
const GasPerTransaction = MaxGasPerTransaction.plus(TGas);
const pageAmountOfPage = 5;
const ipfsPrefix = "https://ipfs.near.social/ipfs";
const landingUrl = "https://neatprotocol.ai";
function toLocaleString(source, decimals, rm) {
  if (typeof source === "string") {
    return toLocaleString(Number(source), decimals);
  } else if (typeof source === "number") {
    return decimals !== undefined
      ? source.toLocaleString(undefined, {
          maximumFractionDigits: decimals,
          minimumFractionDigits: decimals,
        })
      : source.toLocaleString();
  } else {
    // Big type
    return toLocaleString(
      decimals !== undefined
        ? Number(source.toFixed(decimals, rm))
        : source.toNumber(),
      decimals
    );
  }
}

function formatAmount(_balance, _decimal) {
  const balance = _balance ?? 0;
  const decimal = _decimal ?? 8;
  return toLocaleString(
    Big(balance).div(Big(10).pow(decimal)).toFixed(),
    decimal
  );
}

function formatDeployTime(blockTime) {
  const milliseconds = blockTime / 1000000;
  const date = new Date(milliseconds);

  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

// Config for Bos app
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "inscribe.near",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat",
        nodeUrl: "https://rpc.mainnet.near.org",
        contractName: "inscription.near",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapper: "neat.nrc-20.near",
        refFinance: "https://app.ref.finance/",
        minMintEvents: 1_000_000,
        minHolders: 1_000,
      };
    case "testnet":
      return {
        ownerId: "inscribe.testnet",
        graphUrl:
          "https://api.thegraph.com/subgraphs/name/inscriptionnear/neat-test",
        nodeUrl: "https://rpc.testnet.near.org",
        contractName: "inscription.testnet",
        methodName: "inscribe",
        args: {
          p: "nrc-20",
          op: "mint",
          tick: "neat",
          amt: "100000000",
        },
        transferArgs: {
          p: "nrc-20",
          op: "transfer",
          tick: "neat",
        },
        ftWrapper: "neat.nrc-20.testnet",
        refFinance: "https://testnet.ref-finance.com/",
        minMintEvents: 10,
        minHolders: 5,
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);
const tx = {
  contractName: config.contractName,
  methodName: config.methodName,
  args: config.args,
  gas: GasPerTransaction,
};



const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Pagination = styled.button`
  border: none;
  cursor: pointer;
  padding: 0 8px;
  height: 28px;
  font-size: 14px;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffffc0;
  border-radius: 4px;
  background: ${(props) => (props.selected ? "#44444442" : "#191919")};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;

const PageNumberImage = styled.img`
  width: auto;
  height: 10px;
`;

const { current, totalPage, updateCurrentPage } = props;

if (!current || !totalPage) {
  return <div />;
}

function generatePageNumbers(current, totalPage) {
  if (Number(totalPage) <= 3) {
    return [
      "&lt;",
      ...new Array(Number(totalPage))
        .fill(1)
        .map((_, idx) => String(Number(idx) + 1)),
      "&gt;",
    ];
  }
  let pageNumbers = [];
  let prefix = ["&lt;", "1"];
  let suffix = [totalPage, "&gt;"];
  let left = String(Number(current) - 1);
  let right = String(Number(current) + 1);

  pageNumbers.push(...prefix);

  const check = (num) =>
    !pageNumbers.includes(num) &&
    !suffix.includes(num) &&
    Number(num) > Number(pageNumbers[pageNumbers.length - 1]) &&
    Number(num) < suffix[0];

  if (check(left)) {
    if (Number(left) !== Number(pageNumbers[pageNumbers.length - 1]) + 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(left);
  }
  if (check(current)) {
    pageNumbers.push(current);
  }
  if (check(right)) {
    pageNumbers.push(right);
    if (Number(right) !== Number(suffix[0]) - 1) {
      pageNumbers.push("...");
    }
  }
  pageNumbers.push(...suffix);
  return pageNumbers;
}

const pageNumbers = generatePageNumbers(current, totalPage);
return (
  <PaginationContainer>
    {pageNumbers.map((pageNumber, idx) => {
      if (pageNumber === "...") {
        return (
          <Pagination style={{ cursor: "default" }} key={idx}>
            {pageNumber}
          </Pagination>
        );
      }
      if (pageNumber === "&lt;") {
        return (
          <Pagination
            key={idx}
            onClick={() => updateCurrentPage(String(Number(current) - 1))}
            selected={current === pageNumber}
            disabled={Number(current) === 1 || Number(totalPage) === 0}
          >
            <PageNumberImage
              src={`${ipfsPrefix}/bafkreiadbeblhz4umyl7mfboqig5sz5c5etakc2tuivbwwwpng22dl5ylm`}
            />
          </Pagination>
        );
      }
      if (pageNumber === "&gt;") {
        return (
          <Pagination
            key={idx}
            onClick={() => updateCurrentPage(String(Number(current) + 1))}
            selected={current === pageNumber}
            disabled={
              Number(current) === Number(totalPage) || Number(totalPage) === 0
            }
          >
            <PageNumberImage
              src={`${ipfsPrefix}/bafkreig3zoeyz3455dimqrantb5r44c6nmir234wl67v2epdur4fa6a2pa`}
            />
          </Pagination>
        );
      }
      return (
        <Pagination
          key={idx}
          onClick={() => updateCurrentPage(pageNumber)}
          selected={current === pageNumber}
        >
          {pageNumber}
        </Pagination>
      );
    })}
  </PaginationContainer>
);
