/**
 * Component: TransactionsReceiptSummaryRow
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of Transaction Receipt Summary Row on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {RPCTransactionInfo} [rpcTxn] - RPC data of the transaction.
 * @param {TransactionInfo} [txn] - Information related to a transaction.
 * @param {ReceiptsPropsInfo} [receipt] -  receipt of the transaction.
 * @param {string} ownerId - The identifier of the owner of the component.
 */


















/* INCLUDE COMPONENT: "includes/icons/FaLongArrowAltRight.jsx" */
const FaLongArrowAltRight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path
        d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216"
        fill="#ffffff"
      />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaLongArrowAltRight.jsx" */

function MainComponent(props) {
  const { network, receipt, ownerId, txn } = props;

  const { getConfig, handleRateLimit, yoctoToNear, fiatValue } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const { convertToMetricPrefix } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const [_block, setBlock] = useState({} );
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsData] = useState({} );
  const config = getConfig && getConfig(network);
  useEffect(() => {
    function fetchStatsDatas() {
      if (txn) {
        asyncFetch(`${config.backendUrl}stats`)
          .then(
            (res




) => {
              const resp = res?.body?.stats?.[0];
              if (res.status === 200) {
                setStatsData(resp);
              } else {
                handleRateLimit(res, fetchStatsDatas);
              }
            },
          )
          .catch(() => {});
      }
    }

    if (config.backendUrl) {
      fetchStatsDatas();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txn, config.backendUrl]);
  useEffect(() => {
    function fetchBlocks() {
      setLoading(true);
      if (receipt?.block_hash) {
        asyncFetch(`${config.backendUrl}blocks/${receipt?.block_hash}`)
          .then(
            (res




) => {
              const resp = res?.body?.blocks?.[0];
              if (res.status === 200) {
                setBlock({
                  author_account_id: resp.author_account_id,
                  block_hash: resp.author_account_id,
                  block_height: resp.block_height,
                  block_timestamp: resp.block_timestamp,
                  chunks_agg: resp.chunks_agg,
                  gas_price: resp.gas_price,
                  prev_block_hash: resp.author_account_id,
                  receipts_agg: resp.receipts_agg,
                  transactions_agg: resp.transactions_agg,
                });
                setLoading(false);
              } else {
                handleRateLimit(res, fetchBlocks, () => setLoading(false));
              }
            },
          )
          .catch(() => {});
      }
    }
    if (config?.backendUrl) {
      fetchBlocks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt?.block_hash, config.backendUrl]);
  const currentPrice = statsData?.near_price || 0;
  function formatActionKind(actionKind) {
    return actionKind.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
  const getGasAttached = (actions) => {
    const gasAttached = actions
      .map((action) => action.args)
      .filter(
        (args) => 'gas' in args,
      );

    if (gasAttached.length === 0) {
      return '0';
    }

    return gasAttached.reduce(
      (acc, args) =>
        Big(acc || '0')
          .plus(args.gas)
          .toString(),
      '0',
    );
  };

  return (
    <>
      {!loading &&
        receipt &&
        receipt?.actions?.map((action, i) => (
          <tr key={action.args?.method_name + i}>
            <td className="px-6 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium whitespace-nowrap">
              {formatActionKind(action.action_kind)}
            </td>
            <td className="px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium whitespace-nowrap">
              {action.args?.method_name}
            </td>
            <td className="px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium">
              {receipt?.predecessor_id ? (
                <div className="word-break">
                  <Link
                    href={`/address/${receipt?.predecessor_id}`}
                    className="hover:no-underline"
                  >
                    <a className="text-green-500 dark:text-green-250 hover:no-underline inline-block truncate max-w-[120px]">
                      {receipt?.predecessor_id}
                    </a>
                  </Link>
                </div>
              ) : (
                ''
              )}
            </td>
            <td>
              {' '}
              <div className="w-5 h-5 p-1 bg-green-100 rounded-full text-center flex justify-center items-center mx-auto text-white">
                <FaLongArrowAltRight />
              </div>
            </td>
            <td className="px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium">
              {receipt?.receiver_id ? (
                <div className="word-break">
                  <Link
                    href={`/address/${receipt?.receiver_id}`}
                    className="hover:no-underline"
                  >
                    <a className="text-green-500 dark:text-green-250 hover:no-underline inline-block truncate max-w-[120px]">
                      {receipt?.receiver_id}
                    </a>
                  </Link>
                </div>
              ) : (
                ''
              )}
            </td>

            <td className="px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium whitespace-nowrap">
              <span>
                {action.args?.deposit
                  ? yoctoToNear(action.args?.deposit, true)
                  : action.args?.deposit ?? ''}{' '}
                Ⓝ
                {currentPrice && network === 'mainnet'
                  ? ` ($${fiatValue(
                      yoctoToNear(action.args?.deposit ?? 0, false),
                      currentPrice,
                    )})`
                  : ''}
              </span>
            </td>
            <td className="px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium whitespace-nowrap">{`${
              !loading &&
              convertToMetricPrefix(getGasAttached(receipt?.actions))
            }gas`}</td>
          </tr>
        ))}

      {receipt?.outcome?.outgoing_receipts?.length > 0 && (
        <>
          {receipt?.outcome?.outgoing_receipts?.map((rcpt) => (
            <Fragment key={rcpt?.receipt_id}>
              {
                <Widget
                  src={`${ownerId}/widget/bos-components.components.Transactions.ReceiptSummaryRow`}
                  props={{
                    receipt: rcpt,
                    borderFlag: true,
                    txn: txn,
                    network: network,
                    Link,
                    ownerId,
                  }}
                />
              }
            </Fragment>
          ))}
        </>
      )}
    </>
  );
}

return MainComponent(props, context);