let TxnReceiptSkeleton = window?.TxnReceiptSkeleton || (() => <></>);
const Execution = ({ receipt }) => {
  const [expand, setExpand] = useState(false);
  return (
    <>
      <div className="flex justify-between items-center text-sm mb-6">
        <span className="text-text-label">&nbsp;</span>
        <button onClick={() => setExpand((e) => !e)}>
          {expand ? "Collapse All -" : "Expand All +"}
        </button>
      </div>
      <Widget
        key="receipt"
        loading={<TxnReceiptSkeleton />}
        props={{
          convertion: true,
          expand,
          outgoingReceipts: [],
          receipt,
        }}
        src={`nearblocksonbos.near/widget/lite.Txn.Receipt`}
      />
    </>
  );
};
return Execution(props);
