let Skeleton = window?.Skeleton || (({ children }) => <>{children}</>);
const Receipt = ({
  className,
  convertion,
  expand,
  outgoingReceipts,
  receipt,
}) => {
  let { yoctoToNear } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.convertor`
  );
  let { formatNumber, formatSize } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.formatter`
  );
  let { shortenString } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.utils`
  );
  yoctoToNear = yoctoToNear || (() => <></>);
  formatNumber = formatNumber || (() => <></>);
  formatSize = formatSize || (() => <></>);
  shortenString = shortenString || (() => <></>);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(expand);
  }, [expand]);
  if (!("outcome" in receipt)) return null;
  const remainingOutgoingReceipts = outgoingReceipts.slice(0, -1);
  const lastOutgoingReceipt = outgoingReceipts.at(-1);
  const filterRefundReceipts = receipt.outcome.nestedReceipts.filter(
    (nestedReceipt) =>
      "outcome" in nestedReceipt && nestedReceipt.predecessorId !== "system"
  );
  const nonRefundReceipts = filterRefundReceipts.slice(0, -1);
  const lastNonRefundReceipt = filterRefundReceipts.at(-1);
  return (
    <div className={className}>
      {convertion ? (
        <Widget
          key="address-1"
          loading={
            <div className="flex items-center pb-3">
              <span className="inline-block h-4 w-4 rounded-full bg-bg-skeleton mr-3"></span>
              <Skeleton className="block h-5 w-28" loading>
                <span className="font-heading font-semibold text-sm">
                  &nbsp;
                </span>
              </Skeleton>
            </div>
          }
          props={{ address: receipt.predecessorId }}
          src={`nearblocksonbos.near/widget/lite.Txn.Address`}
        />
      ) : null}
      {lastOutgoingReceipt ? (
        <Widget
          key="execution-1"
          props={{
            className: "ml-2 pl-4 border-l border-border-body",
            convertion: false,
            expand,
            outgoingReceipts: remainingOutgoingReceipts,
            receipt: lastOutgoingReceipt,
          }}
          src={`nearblocksonbos.near/widget/lite.Txn.Receipt`}
        />
      ) : null}
      <div className="relative ml-2 mb-3 py-3 px-4">
        <div className="arrow absolute h-full left-0 top-0 border-l border-border-body" />
        <Widget
          key="actions"
          loading={
            <Skeleton className="block h-7 w-28" loading>
              <button className="text-sm text-black rounded py-1 px-3 bg-bg-function">
                &nbsp;
              </button>
            </Skeleton>
          }
          props={{
            actions: receipt.actions,
            open,
            receipt,
            setOpen,
          }}
          src={`nearblocksonbos.near/widget/lite.Txn.Actions`}
        />
      </div>
      <Widget
        key="address-2"
        loading={
          <div className="flex items-center pb-3">
            <span className="inline-block h-4 w-4 rounded-full bg-bg-skeleton mr-3"></span>
            <Skeleton className="block h-5 w-28" loading>
              <span className="font-heading font-semibold text-sm">&nbsp;</span>
            </Skeleton>
          </div>
        }
        props={{ address: receipt.receiverId }}
        src={`nearblocksonbos.near/widget/lite.Txn.Address`}
      />
      {lastNonRefundReceipt ? (
        <Widget
          key="execution-2"
          props={{
            convertion: false,
            expand,
            outgoingReceipts: nonRefundReceipts,
            receipt: lastNonRefundReceipt,
          }}
          src={`nearblocksonbos.near/widget/lite.Txn.Receipt`}
        />
      ) : null}
    </div>
  );
};
return Receipt(props);
