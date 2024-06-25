let ErrorSkeleton = window?.ErrorSkeleton || (() => <></>);
let TxnSkeleton = window?.TxnSkeleton || (() => <></>);
let TxnTabsSkeleton = window?.TxnTabsSkeleton || (() => <></>);
let Skeleton = window?.Skeleton || (({ children }) => <>{children}</>);
const Txn = ({ hash, rpcUrl }) => {
  let { rpcFetch } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.fetcher`
  );
  let { nsToDateTime, yoctoToNear } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.convertor`
  );
  let { formatNumber } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.formatter`
  );
  let { depositAmount, shortenString, txnFee } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.utils`
  );
  if (
    !rpcFetch ||
    !nsToDateTime ||
    !yoctoToNear ||
    !formatNumber ||
    !depositAmount ||
    !shortenString ||
    !txnFee
  )
    return <TxnSkeleton />;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({
    block: true,
    txn: true,
  });
  const [txn, setTxn] = useState(null);
  const [block, setBlock] = useState(null);
  useEffect(() => {
    if (rpcFetch && rpcUrl && hash) {
      rpcFetch(rpcUrl, "tx", {
        sender_account_id: "bowen",
        tx_hash: hash,
        wait_until: "NONE",
      })
        .then((response) => {
          setTxn(response);
          rpcFetch(rpcUrl, "block", {
            block_id: response.transaction_outcome.block_hash,
          })
            .then((response) => setBlock(response))
            .catch(setError)
            .finally(() => setLoading((state) => ({ ...state, block: false })));
        })
        .catch(setError)
        .finally(() => setLoading((state) => ({ ...state, txn: false })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash, rpcUrl]);
  if (error) {
    return (
      <Widget
        key="error"
        loading={<ErrorSkeleton />}
        props={{ title: "Error Fetching Txn" }}
        src={`nearblocksonbos.near/widget/lite.Atoms.Error`}
      />
    );
  }
  return (
    <div className="relative container mx-auto">
      <div className="pt-7 pb-[26px] px-5">
        <Skeleton
          className="block h-[48px] lg:h-[54px] w-[300px]"
          loading={loading.txn}
        >
          <h1 className="flex items-center font-heading font-medium text-[32px] lg:text-[36px] tracking-[0.1px] mr-4">
            <span className="truncate">{shortenString(hash)}</span>
            <Widget
              key="copy"
              props={{
                buttonClassName: "ml-3",
                className: "text-primary w-6",
                text: hash,
              }}
              src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
            />
          </h1>
        </Skeleton>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">From</h2>
          <Skeleton className="block h-[39px] w-[200px]" loading={loading.txn}>
            <div className="font-heading font-medium text-[26px]">
              <Widget
                key="tooltip"
                props={{
                  children: (
                    <Link href={`/address/${txn?.transaction.signer_id}`}>
                      {shortenString(txn?.transaction.signer_id ?? "")}
                    </Link>
                  ),
                  tooltip: txn?.transaction.signer_id,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
              />
              <Widget
                key="copy"
                props={{
                  buttonClassName: "ml-1",
                  className: "text-primary w-4",
                  text: txn?.transaction.signer_id,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
              />
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">To</h2>
          <Skeleton className="block h-[39px] w-[200px]" loading={loading.txn}>
            <div className="font-heading font-medium text-[26px]">
              <Widget
                key="tooltip"
                props={{
                  children: (
                    <Link href={`/address/${txn?.transaction.receiver_id}`}>
                      {shortenString(txn?.transaction.receiver_id ?? "")}
                    </Link>
                  ),
                  tooltip: txn?.transaction.receiver_id,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
              />
              <Widget
                key="copy"
                props={{
                  buttonClassName: "ml-1",
                  className: "text-primary w-4",
                  text: txn?.transaction.receiver_id,
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
              />
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Block</h2>
          <Skeleton className="block h-[39px] w-32" loading={loading.block}>
            <div className="font-heading font-medium text-[26px]">
              <Widget
                key="tooltip"
                props={{
                  children: (
                    <Link href={`/blocks/${block?.header.height}`}>
                      {formatNumber(String(block?.header.height ?? 0), 0)}
                    </Link>
                  ),
                  tooltip: (
                    <span>
                      <span className="mr-1">{block?.header.hash}</span>
                      <Widget
                        key="copy"
                        loading={<span className="block w-4 h-4 truncate" />}
                        props={{
                          buttonClassName: "h-4 align-text-bottom",
                          className: "w-4",
                          text: block?.header.hash,
                        }}
                        src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
                      />
                    </span>
                  ),
                }}
                src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
              />
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Time</h2>
          <Skeleton
            className="block h-[39px] w-[280px]"
            loading={loading.block}
          >
            <div className="font-heading font-medium text-[24px]">
              {nsToDateTime(
                block?.header.timestamp_nanosec ?? "0",
                "DD/MM/YY hh:mm:ss AA"
              )}
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Amount</h2>
          <Skeleton className="block h-[39px] w-28" loading={loading.txn}>
            <div className="font-heading font-medium text-[24px]">
              {formatNumber(
                yoctoToNear(depositAmount(txn?.transaction.actions ?? [])),
                6
              )}{" "}
              Ⓝ
            </div>
          </Skeleton>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/3 pl-5 mb-6 h-[60px]">
          <h2 className="font-medium text-sm mb-0.5">Fee</h2>
          <Skeleton className="block h-[39px] w-[140px]" loading={loading.txn}>
            <div className="font-heading font-medium text-[24px]">
              {formatNumber(
                yoctoToNear(
                  txnFee(
                    txn?.receipts_outcome ?? [],
                    txn?.transaction_outcome.outcome.tokens_burnt ?? "0"
                  )
                ),
                6
              )}{" "}
              Ⓝ
            </div>
          </Skeleton>
        </div>
      </div>
      <Widget
        key="tabs"
        loading={<TxnTabsSkeleton />}
        props={{ hash, rpcUrl }}
        src={`nearblocksonbos.near/widget/lite.Txn.Tabs`}
      />
    </div>
  );
};
return Txn(props);
