/**
 * Component: TransactionsHash
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Transaction Hash on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [hash] -  The Transaction identifier passed as a string.
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 */







/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
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
  console.log('hgjhgh');
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
/* END_INCLUDE: "includes/libs.jsx" */


const hashes = [' ', 'execution', 'comments'];

function MainComponent(props) {
  const { t, network, hash } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [txn, setTxn] = useState({} );
  const [error, setError] = useState(false);
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
            setTxn({
              actions: resp.actions,
              actions_agg: resp.actions_agg,
              block: resp.block,
              block_timestamp: resp.block_timestamp,
              included_in_block_hash: resp.included_in_block_hash,
              outcomes: resp.outcomes,
              outcomes_agg: resp.outcomes_agg,
              receipt_conversion_gas_burnt: resp.receipt_conversion_gas_burnt,
              receipt_conversion_tokens_burnt:
                resp.receipt_conversion_tokens_burnt,
              receiver_account_id: resp.receiver_account_id,
              signer_account_id: resp.signer_account_id,
              transaction_hash: resp.transaction_hash,
              receipts: resp.receipts,
            });
            setIsLoading(false);
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
              setRpcTxn(resp);
            },
          )
          .catch(() => {});
      }
    }

    fetchTransactionStatus();
  }, [txn, hash, config?.rpcUrl]);

  return (
    <>
      <div className="container mx-auto px-3">
        <div>
          <div className="md:flex items-center justify-between">
            <h1 className="text-xl text-gray-700 px-2 py-4">
              {t ? t('txns:txn.heading') : 'Transaction Details'}
            </h1>
            {
              <Widget
                src={`${config.ownerId}/widget/bos-components.components.Shared.SponsoredBox`}
              />
            }
          </div>
          <div className="text-gray-500 px-2 pb-5 pt-1 border-t"></div>
        </div>
        {error || (!isLoading && !txn) ? (
          <div className="text-gray-400 text-xs px-2 mb-4">
            {t ? t('txnError') : 'Transaction Error'}
          </div>
        ) : (
          <div className="bg-white soft-shadow rounded-lg pb-1">
            <Tabs.Root defaultValue={pageHash}>
              <Tabs.List>
                {hashes &&
                  hashes.map((hash, index) => (
                    <Tabs.Trigger
                      key={index}
                      onClick={() => onTab(index)}
                      className={`text-gray-600 text-sm font-semibold border-green-500 overflow-hidden inline-block cursor-pointer p-3 focus:outline-none hover:text-green-500 ${
                        pageHash === hash
                          ? 'border-b-4 border-green-500 text-green-500'
                          : ''
                      }`}
                      value={hash}
                    >
                      {hash === ' ' ? (
                        <h2>{t ? t('txns:txn.tabs.overview') : 'Overview'}</h2>
                      ) : hash === 'execution' ? (
                        <h2>
                          {t ? t('txns:txn.tabs.execution') : 'Execution Plan'}
                        </h2>
                      ) : (
                        <h2>{t ? t('txns:txn.tabs.comments') : 'Comments'}</h2>
                      )}
                    </Tabs.Trigger>
                  ))}
              </Tabs.List>
              <Tabs.Content value={hashes[0]}>
                {
                  <Widget
                    src={`${config.ownerId}/widget/bos-components.components.Transactions.Detail`}
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
                {
                  <Widget
                    src={`${config.ownerId}/widget/bos-components.components.Transactions.Receipt`}
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
              <Tabs.Content value={hashes[2]}>
                <div className="px-4 sm:px-6 py-3"></div>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        )}
        <div className="py-8"></div>
      </div>
    </>
  );
}

return MainComponent(props, context);