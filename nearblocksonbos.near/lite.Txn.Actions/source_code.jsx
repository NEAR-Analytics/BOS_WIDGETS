let Skeleton = window?.Skeleton || (({ children }) => <>{children}</>);
let JsonView = window?.JsonView || (({ children }) => <pre>{children}</pre>);
const prettify = (args) => {
  try {
    return JSON.stringify(JSON.parse(atob(args)), undefined, 2);
  } catch (error) {
    return args;
  }
};
const Actions = ({ actions, open, receipt, setOpen }) => {
  let { yoctoToNear, yoctoToTgas } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.convertor`
  );
  let { formatNumber } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.formatter`
  );
  let { gasLimit, refund, shortenString } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.utils`
  );
  if (
    !yoctoToNear ||
    !yoctoToTgas ||
    !formatNumber ||
    !gasLimit ||
    !refund ||
    !shortenString
  )
    return null;
  const [active, setActive] = useState("output");
  const result = useMemo(() => {
    let logs = "No logs";
    let status = receipt.outcome.status.receiptId;
    if (receipt.outcome.logs.length) {
      logs = receipt.outcome.logs.join("\n");
    }
    if (receipt.outcome.status.type === "successValue") {
      if (receipt.outcome.status.value.length === 0) {
        status = "Empty result";
      } else {
        status = prettify(receipt.outcome.status.value) ?? "";
      }
    }
    if (receipt.outcome.status.type === "failure") {
      status = prettify(receipt.outcome.status.error);
    }
    return { logs, status };
  }, [receipt]);
  return (
    <>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <Widget
            key={`action-${index}`}
            loading={
              <Skeleton className="block h-7 w-28" loading>
                <button className="text-sm text-black rounded py-1 px-3 bg-bg-function">
                  &nbsp;
                </button>
              </Skeleton>
            }
            props={{ action, open, setOpen }}
            src={`nearblocksonbos.near/widget/lite.Txn.Action`}
          />
        ))}
      </div>
      {open && (
        <div className="px-4 pt-6">
          <div>
            <button
              className={` text-sm py-1 mr-4 ${
                active === "output"
                  ? "font-medium border-b-[3px] border-text-body"
                  : "text-text-label"
              }`}
              onClick={() => setActive("output")}
            >
              Output
            </button>
            <button
              className={` text-sm py-1 mr-4 ${
                active === "inspect"
                  ? "font-medium border-b-[3px] border-text-body"
                  : "text-text-label"
              }`}
              onClick={() => setActive("inspect")}
            >
              Inspect
            </button>
          </div>
          {active === "output" && (
            <div className="pt-6">
              <h3 className="text-sm mb-1">Logs</h3>
              <JsonView className="mb-6">{result.logs}</JsonView>
              <h3 className="text-sm mb-1">Result</h3>
              <JsonView className="mb-6">{result.status}</JsonView>
            </div>
          )}
          {active === "inspect" && (
            <div className="text-sm pt-6 pb-3">
              <div className="flex items-center">
                <h3 className="w-32 mb-2">Receipt</h3>
                <p className="flex items-center group mb-2">
                  <Widget
                    key="tooltip"
                    props={{
                      children: shortenString(receipt.id),
                      tooltip: receipt.id,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
                  />
                  <Widget
                    key="copy"
                    props={{
                      buttonClassName: "w-4 ml-1",
                      className: "hidden text-primary w-3.5 group-hover:block",
                      text: receipt.id,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
                  />
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="w-32 mb-2">Block</h3>
                <p className="flex items-center group mb-2">
                  <Widget
                    key="tooltip"
                    props={{
                      children: (
                        <Link
                          className="font-medium"
                          href={`/blocks/${receipt.outcome.block.hash}`}
                        >
                          {shortenString(receipt.outcome.block.hash)}
                        </Link>
                      ),
                      tooltip: receipt.outcome.block.hash,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
                  />
                  <Widget
                    key="copy"
                    props={{
                      buttonClassName: "w-4 ml-1",
                      className: "hidden text-primary w-3.5 group-hover:block",
                      text: receipt.outcome.block.hash,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
                  />
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="w-32 mb-2">From</h3>
                <p className="flex items-center group mb-2">
                  <Widget
                    key="tooltip"
                    props={{
                      children: (
                        <Link
                          className="font-medium"
                          href={`/address/${receipt.predecessorId}`}
                        >
                          {shortenString(receipt.predecessorId, 10, 10, 22)}
                        </Link>
                      ),
                      tooltip: receipt.predecessorId,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
                  />
                  <Widget
                    key="copy"
                    props={{
                      buttonClassName: "w-4 ml-1",
                      className: "hidden text-primary w-3.5 group-hover:block",
                      text: receipt.predecessorId,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
                  />
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="w-32 mb-2">To</h3>
                <p className="flex items-center group mb-2">
                  <Widget
                    key="tooltip"
                    props={{
                      children: (
                        <Link
                          className="font-medium"
                          href={`/address/${receipt.receiverId}`}
                        >
                          {shortenString(receipt.receiverId, 10, 10, 22)}
                        </Link>
                      ),
                      tooltip: receipt.receiverId,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
                  />
                  <Widget
                    key="copy"
                    props={{
                      buttonClassName: "w-4 ml-1",
                      className: "hidden text-primary w-3.5 group-hover:block",
                      text: receipt.receiverId,
                    }}
                    src={`nearblocksonbos.near/widget/lite.Atoms.Copy`}
                  />
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="w-32 mb-2">Gas Limit</h3>
                <p className="mb-2">
                  {formatNumber(yoctoToTgas(gasLimit(receipt.actions)), 2)}
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="w-32 mb-2">Gas Burned</h3>
                <p className="mb-2">
                  {formatNumber(
                    yoctoToTgas(String(receipt.outcome.gasBurnt)),
                    2
                  )}{" "}
                  TGas
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="w-32 mb-2">Tokens Burned</h3>
                <p className="mb-2">
                  {formatNumber(yoctoToNear(receipt.outcome.tokensBurnt), 6)} Ⓝ
                </p>
              </div>
              <div className="flex items-center">
                <h3 className="w-32 mb-2">Refunded</h3>
                <p className="mb-2">
                  {formatNumber(
                    yoctoToNear(refund(receipt.outcome.nestedReceipts)),
                    6
                  )}{" "}
                  Ⓝ
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
return Actions(props);
