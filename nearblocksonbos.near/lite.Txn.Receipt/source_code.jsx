let TxnActionSkeleton = window?.TxnActionSkeleton || (() => <></>);
let TxnAddressSkeleton = window?.TxnAddressSkeleton || (() => <></>);
let TxnReceiptSkeleton = window?.TxnReceiptSkeleton || (() => <></>);
const Receipt = ({
  className,
  convertion,
  expand,
  outgoingReceipts,
  receipt,
}) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(expand);
  }, [expand]);
  if (!("outcome" in receipt)) return <TxnReceiptSkeleton />;
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
      {convertion && (
        <Widget
          key="address-1"
          loading={<TxnAddressSkeleton />}
          props={{ address: receipt.predecessorId }}
          src={`nearblocksonbos.near/widget/lite.Txn.Address`}
        />
      )}
      {lastOutgoingReceipt && (
        <Widget
          key="execution-1"
          loading={<TxnReceiptSkeleton />}
          props={{
            className: "ml-2 pl-4 border-l border-border-body",
            convertion: false,
            expand,
            outgoingReceipts: remainingOutgoingReceipts,
            receipt: lastOutgoingReceipt,
          }}
          src={`nearblocksonbos.near/widget/lite.Txn.Receipt`}
        />
      )}
      <div className="relative ml-2 mb-3 py-3 px-4">
        <div className="arrow absolute h-full left-0 top-0 border-l border-border-body" />
        <Widget
          key="actions"
          loading={<TxnActionSkeleton />}
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
        loading={<TxnAddressSkeleton />}
        props={{ address: receipt.receiverId }}
        src={`nearblocksonbos.near/widget/lite.Txn.Address`}
      />
      {lastNonRefundReceipt && (
        <Widget
          key="execution-2"
          loading={<TxnReceiptSkeleton />}
          props={{
            convertion: false,
            expand,
            outgoingReceipts: nonRefundReceipts,
            receipt: lastNonRefundReceipt,
          }}
          src={`nearblocksonbos.near/widget/lite.Txn.Receipt`}
        />
      )}
    </div>
  );
};
return Receipt(props);
