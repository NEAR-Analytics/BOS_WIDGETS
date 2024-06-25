let ErrorSkeleton = window?.ErrorSkeleton || (() => <></>);
let TxnTabsSkeleton = window?.TxnTabsSkeleton || (() => <></>);
let TxnExecutionSkeleton = window?.TxnExecutionSkeleton || (() => <></>);
let tabs = [0];
const Tabs = ({ hash, rpcUrl }) => {
  let { rpcFetch } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.fetcher`
  );
  let { nestReceipts, parseOutcome, parseReceipt } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.execution`
  );
  if (!rpcFetch || !nestReceipts || !parseOutcome || !parseReceipt)
    return <TxnTabsSkeleton />;
  const [active, setActive] = useState(tabs[0]);
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});
  useEffect(() => {
    if (rpcFetch && rpcUrl && hash && active === 0) {
      setLoading((prev) => ({ ...prev, [active]: true }));
      rpcFetch(rpcUrl, "EXPERIMENTAL_tx_status", {
        sender_account_id: "bowen",
        tx_hash: hash,
        wait_until: "NONE",
      })
        .then((response) => {
          const blocksMap = response.receipts_outcome.reduce(
            (map, row) =>
              map.set(row.block_hash, {
                hash: row.block_hash,
                height: 0,
                timestamp: 0,
              }),
            new Map()
          );
          const receiptsMap = response.receipts_outcome.reduce(
            (mapping, receiptOutcome) => {
              const receipt = parseReceipt(
                response.receipts.find(
                  (rpcReceipt) => rpcReceipt.receipt_id === receiptOutcome.id
                ),
                receiptOutcome,
                response.transaction
              );
              return mapping.set(receiptOutcome.id, {
                ...receipt,
                outcome: parseOutcome(receiptOutcome, blocksMap),
              });
            },
            new Map()
          );
          setData((state) => ({
            ...state,
            [active]: nestReceipts(
              response.transaction_outcome.outcome.receipt_ids[0],
              receiptsMap
            ),
          }));
        })
        .catch((err) => setError((state) => ({ ...state, [active]: err })))
        .finally(() => setLoading((state) => ({ ...state, [active]: false })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, active, data]);
  return (
    <div className="bg-bg-box lg:rounded-xl shadow px-6 mt-8">
      <div className="pt-4 pb-6">
        {tabs.map((tab) => (
          <button
            className={`py-1 mr-4 ${
              active === tab
                ? "font-medium border-b-[3px] border-text-body"
                : "text-text-label"
            }`}
            key={tab}
            onClick={() => setActive(tab)}
          >
            {tab === 0 && "Execution Plan"}
          </button>
        ))}
      </div>
      <div className="lg:px-4 pb-6">
        {error[active] ? (
          <Widget
            key="error"
            loading={<ErrorSkeleton />}
            props={{ title: "Error Fetching Txn Details" }}
            src={`nearblocksonbos.near/widget/lite.Atoms.Error`}
          />
        ) : loading[active] ? (
          <>{active === 0 && <TxnExecutionSkeleton />}</>
        ) : (
          <>
            {active === 0 && (
              <Widget
                key="execution"
                loading={<TxnExecutionSkeleton />}
                props={{ receipt: data[active] }}
                src={`nearblocksonbos.near/widget/lite.Txn.Execution`}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
return Tabs(props);
