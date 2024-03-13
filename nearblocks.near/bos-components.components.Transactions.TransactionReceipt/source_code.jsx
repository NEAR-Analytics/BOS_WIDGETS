/**
 * Component: TransactionsReceipt
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of Transaction Receipt on Near Protocol.
 */

/* INCLUDE COMPONENT: "includes/icons/ArrowDown.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const ArrowDown = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowDown.jsx" */
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
}

function debounce(
  delay,
  func,
) {
  let timer;
  let active = true;
  const debounced = (arg) => {
    if (active) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        active && func(arg);
        timer = undefined;
      }, delay);
    } else {
      func(arg);
    }
  };

  debounced.isPending = () => {
    return timer !== undefined;
  };

  debounced.cancel = () => {
    active = false;
  };

  debounced.flush = (arg) => func(arg);

  return debounced;
}

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


function MainComponent(props) {
  const {
    network,
    t,
    receipt,
    fellowOutgoingReceipts,
    expandAll,
    convertionReceipt,
    className,
  } = props;

  const [isTxTypeActive, setTxTypeActive] = useState(false);
  const switchActiveTxType = useCallback(
    () => setTxTypeActive((x) => !x),
    [setTxTypeActive],
  );
  const config = getConfig(network);
  useEffect(() => switchActiveTxType, [expandAll, switchActiveTxType]);

  const remainingFellowOutgoingReceipts = fellowOutgoingReceipts.slice(0, -1);
  const lastFellowOutgoingReceipt = fellowOutgoingReceipts.at(-1);
  const filterRefundNestedReceipts =
    receipt?.outcome.nestedReceipts &&
    receipt?.outcome.nestedReceipts.filter(
      (nestedReceipt) =>
        'outcome' in nestedReceipt && nestedReceipt.predecessorId !== 'system',
    );
  const nonRefundNestedReceipts =
    filterRefundNestedReceipts && filterRefundNestedReceipts.slice(0, -1);
  const lastNonRefundNestedReceipt =
    filterRefundNestedReceipts && filterRefundNestedReceipts.at(-1);

  return (
    <>
      <div
        className={`border-l mt-2.5 ml-2.5 ${
          convertionReceipt
            ? 'pl-0 border-transparent'
            : 'pl-12 border-green-500 '
        } ${className} `}
      >
        {convertionReceipt ? (
          <div className="flex flex-row mb-2.5">
            <div className="bg-gray-200 h-5 w-5 rounded-full mr-3"></div>
            <div className="text-green-500 text-sm">
              {receipt?.predecessorId}
            </div>
          </div>
        ) : null}

        {lastFellowOutgoingReceipt ? (
          <Widget
            src={`${config.ownerId}/widget/bos-components.components.Transactions.TransactionReceipt`}
            props={{
              network: network,
              t,
              receipt: lastFellowOutgoingReceipt,
              expandAll: expandAll,
              fellowOutgoingReceipts: remainingFellowOutgoingReceipts,
              convertionReceipt: false,
              className: 'pb-5 !mt-0',
            }}
          />
        ) : null}
        <div className="flex flex-col relative border-l border-green-500  py-2 pl-7 ml-2.5">
          {receipt?.actions &&
            receipt?.actions.map((action, index) => (
              <Widget
                key={`${action.kind}_${index}`}
                src={`${config.ownerId}/widget/bos-components.components.Transactions.ReceiptKind`}
                props={{
                  network: network,
                  t,
                  action: action,
                  onClick: switchActiveTxType,
                  isTxTypeActive: isTxTypeActive,
                }}
              />
            ))}
        </div>
        {isTxTypeActive ? (
          <div className="border-l border-black ml-2.5">
            <Widget
              src={`${config.ownerId}/widget/bos-components.components.Transactions.ReceiptInfo`}
              props={{
                network: network,
                t,
                receipt: receipt,
              }}
            />
          </div>
        ) : null}
        <div className="relative flex flex-row mt-2.5">
          <ArrowDown
            className={`absolute left-0.5 -top-5 ml-px  w-4 h-4 text-green-500`}
          />
          <div className="bg-gray-200 h-5 w-5 rounded-full mr-3"></div>
          <div className="text-green-500 text-sm">{receipt?.receiverId}</div>
        </div>
      </div>
      {lastNonRefundNestedReceipt ? (
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Transactions.TransactionReceipt`}
          props={{
            network: network,
            t: t,
            receipt: lastNonRefundNestedReceipt,
            expandAll: expandAll,
            fellowOutgoingReceipts: nonRefundNestedReceipts,
            convertionReceipt: false,
            className: '!pl-0 border-transparent',
          }}
        />
      ) : null}
    </>
  );
}

return MainComponent(props, context);