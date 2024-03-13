/**
 * Component: TransactionsHash
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Transaction Hash on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string} [hash] -  The Transaction identifier passed as a string.
 */







/* INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Skeleton = (props) => {
  return (
    <div
      className={`bg-gray-200  rounded shadow-sm animate-pulse ${props.className}`}
    ></div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */
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
/* END_INCLUDE: "includes/libs.jsx" */


const hashes = [' ', 'execution', 'comments'];

function MainComponent(props) {
  const { t, network, hash } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [txn, setTxn] = useState({} );
  const [error, setError] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [rpcTxn, setRpcTxn] = useState(
    {} ,
  );
  const [pageHash, setHash] = useState(' ');
  const config = getConfig(network);

  const onTab = (index) => {
    setHash(hashes[index]);
  };
  useEffect(() => {
    function fetchTxn() {
      setIsLoading(true);
      asyncFetch(`${config.backendUrl}txns/${hash}`)
        .then(
          (data




) => {
            const resp = data?.body?.txns?.[0];
            if (data.status === 200) {
              setTxn(resp);
              setIsLoading(false);
            } else {
              handleRateLimit(data, fetchTxn, () => setIsLoading(false));
            }
          },
        )
        .catch((error) => {
          if (error) setError(true);
          setIsLoading(false);
        });
    }

    fetchTxn();
  }, [config.backendUrl, hash]);

  useEffect(() => {
    function fetchTransactionStatus() {
      if (txn) {
        asyncFetch(config?.rpcUrl, {
          method: 'POST',
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 123,
            method: 'EXPERIMENTAL_tx_status',
            params: [txn.transaction_hash, txn.signer_account_id],
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(
            (res




) => {
              const resp = res?.body?.result;
              if (res.status === 200) {
                setRpcTxn(resp);
              } else {
                handleRateLimit(res, fetchTransactionStatus);
              }
            },
          )
          .catch(() => {});
      }
    }

    fetchTransactionStatus();
  }, [txn, hash, config?.rpcUrl]);

  return (
    <>
      <div>
        <div className="md:flex items-center justify-between">
          {isLoading ? (
            <div className="w-80 max-w-xs px-3 py-5">
              <Skeleton className="h-7" />
            </div>
          ) : (
            <h1 className="text-xl text-nearblue-600 px-2 py-5">
              {t ? t('txns:txn.heading') : 'Transaction Details'}
            </h1>
          )}
        </div>
      </div>
      {error || (!isLoading && !txn) ? (
        <div className="text-nearblue-700 text-xs px-2 mb-4">
          {t ? t('txns:txnError') : 'Transaction Error'}
        </div>
      ) : (
        <Tabs.Root defaultValue={pageHash}>
          <Tabs.List>
            {hashes &&
              hashes.map((hash, index) => (
                <Tabs.Trigger
                  key={index}
                  onClick={() => onTab(index)}
                  className={`text-nearblue-600 text-sm font-medium overflow-hidden inline-block cursor-pointer p-2 mb-3 mr-2 focus:outline-none ${
                    pageHash === hash
                      ? 'rounded-lg bg-green-600 text-white'
                      : 'hover:bg-neargray-800 bg-neargray-700 rounded-lg hover:text-nearblue-600'
                  }`}
                  value={hash}
                >
                  {hash === ' ' ? (
                    <h2>{t ? t('txns:txn.tabs.overview') : 'Overview'}</h2>
                  ) : hash === 'execution' ? (
                    pageHash !== 'execution' ? (
                      <>
                        <h2>
                          {isToggle
                            ? 'Enhanced Plan'
                            : t
                            ? t('txns:txn.tabs.execution')
                            : 'Execution Plan'}
                        </h2>
                      </>
                    ) : (
                      <Popover.Root key={isToggle}>
                        <Popover.Trigger asChild>
                          <button
                            className="flex border border-green-900/10 text-xs  rounded focus:outline-none"
                            aria-label="Update dimensions"
                          >
                            {isToggle
                              ? 'Enhanced Plan'
                              : t
                              ? t('txns:txn.tabs.execution')
                              : 'Execution Plan'}
                            <ArrowDown className="h-4 w-4 fill-current ml-1" />
                          </button>
                        </Popover.Trigger>
                        <Popover.Content
                          className="bg-white w-60 shadow-lg border rounded-lg slide-down mt-4"
                          sideOffset={5}
                        >
                          <ul className="divide-y">
                            <li
                              onClick={() => setIsToggle(false)}
                              className={`py-2 text-nearblue-600 ${
                                !isToggle ? 'bg-gray-300' : ''
                              }`}
                            >
                              {t('txns:txn.tabs.execution') || 'Execution Plan'}
                            </li>
                            <li
                              onClick={() => setIsToggle(true)}
                              className={`py-2 text-nearblue-600 ${
                                isToggle ? 'bg-gray-300' : ''
                              }`}
                            >
                              Enhanced Plan
                            </li>
                          </ul>
                        </Popover.Content>
                      </Popover.Root>
                    )
                  ) : (
                    <h2>{t ? t('txns:txn.tabs.comments') : 'Comments'}</h2>
                  )}
                </Tabs.Trigger>
              ))}
          </Tabs.List>
          <div className="bg-white soft-shadow rounded-xl pb-1">
            <Tabs.Content value={hashes[0]}>
              {
                <Widget
                  src={`${config?.ownerId}/widget/bos-components.components.Transactions.Detail`}
                  props={{
                    txn: txn,
                    rpcTxn: rpcTxn,
                    loading: isLoading,
                    network: network,
                    t: t,
                  }}
                />
              }
            </Tabs.Content>
            <Tabs.Content value={hashes[1]}>
              {isToggle ? (
                <Widget
                  src={`${config?.ownerId}/widget/bos-components.components.Transactions.Execution`}
                  props={{
                    network: network,
                    t: t,
                    txn: txn,
                    rpcTxn: rpcTxn,
                    loading: isLoading,
                  }}
                />
              ) : (
                <Widget
                  src={`${config?.ownerId}/widget/bos-components.components.Transactions.Receipt`}
                  props={{
                    network: network,
                    t: t,
                    txn: txn,
                    rpcTxn: rpcTxn,
                    loading: isLoading,
                  }}
                />
              )}
            </Tabs.Content>
            <Tabs.Content value={hashes[2]}>
              <div className="py-3">
                {
                  <Widget
                    src={`${config.ownerId}/widget/bos-components.components.Comments.Feed`}
                    props={{
                      network: network,
                      path: `nearblocks.io/txns/${hash}`,
                      limit: 10,
                    }}
                  />
                }
              </div>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      )}
    </>
  );
}

return MainComponent(props, context);