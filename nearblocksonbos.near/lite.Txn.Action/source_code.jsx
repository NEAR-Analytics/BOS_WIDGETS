let TxnActionSkeleton = window?.TxnActionSkeleton || (() => <></>);
let JsonView = window?.JsonView || (({ children }) => <pre>{children}</pre>);
const kind = {
  addKey: {
    bg: "bg-bg-key-add",
    text: "Access Key Created",
  },
  createAccount: {
    bg: "bg-bg-account-add",
    text: "Account Created",
  },
  delegateAction: {
    bg: "bg-bg-function",
    text: "Delegate Action",
  },
  deleteAccount: {
    bg: "bg-bg-account-delete",
    text: "Account Deleted",
  },
  deleteKey: {
    bg: "bg-bg-key-delete",
    text: "Access Key Deleted",
  },
  deployContract: {
    bg: "bg-bg-contract",
    text: "Contract Deployed",
  },
  functionCall: {
    bg: "bg-bg-function",
    text: "",
  },
  stake: {
    bg: "bg-bg-stake",
    text: "Restake",
  },
  transfer: {
    bg: "bg-bg-transfer",
    text: "Transfer",
  },
};
const prettify = (args) => {
  try {
    return JSON.stringify(JSON.parse(atob(args)), undefined, 2);
  } catch (error) {
    return args;
  }
};
const Action = ({ action, open, setOpen }) => {
  let { yoctoToNear } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.convertor`
  );
  let { formatNumber } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.formatter`
  );
  let { shortenString } = VM.require(
    `nearblocksonbos.near/widget/lite.libs.utils`
  );
  if (!yoctoToNear || !formatNumber || !shortenString)
    return <TxnActionSkeleton />;
  const method =
    action.kind === "functionCall"
      ? action.args.methodName
      : kind[action.kind].text;
  const args = useMemo(() => {
    if (action.kind === "functionCall" && action.args.args) {
      return prettify(action.args.args);
    }
    return "";
  }, [action]);
  return (
    <div>
      <button
        className={`h-7 text-sm text-black rounded py-1 px-3 ${
          kind[action.kind].bg
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        {method.length > 22 ? (
          <Widget
            key="tooltip"
            props={{
              children: shortenString(method, 10, 10, 22),
              tooltip: method,
            }}
            src={`nearblocksonbos.near/widget/lite.Atoms.Tooltip`}
          />
        ) : (
          method
        )}
        <span className="inline-flex items-center justify-center w-3">
          {open ? "-" : "+"}
        </span>
      </button>
      <span className="font-semibold text-xs">
        {action.kind === "transfer"
          ? `${formatNumber(yoctoToNear(action.args.deposit), 6)} Ⓝ`
          : null}
      </span>
      {open && args && (
        <div className="px-4 py-6">
          <JsonView>{args}</JsonView>
        </div>
      )}
    </div>
  );
};
return Action(props);
