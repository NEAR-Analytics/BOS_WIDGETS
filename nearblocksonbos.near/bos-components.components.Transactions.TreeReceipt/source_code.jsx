/**
 * Component: TransactionsTreeReceipt
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Tree view of Transaction Receipt on Near Protocol.
 */













function MainComponent(props) {
  const { network, receipt, t, ownerId, txn, setShow, show } = props;

  function formatActionKind(actionKind) {
    return actionKind.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  return (
    <>
      {receipt?.actions && (
        <div
          onClick={() => {
            setShow(receipt.receipt_id);
          }}
          className={`${
            show === receipt.receipt_id
              ? '!text-white bg-green-500 dark:bg-green-250'
              : 'text-green-500'
          } !border-2 !border-solid !border-green-600 dark:!border-green-250 dark:text-green-250 !rounded-lg cursor-pointer`}
        >
          {receipt?.actions.map((action, index) => (
            <p
              key={index}
              className="flex flex-col dark:divide-black-200 divide-gray-200 divide-y"
            >
              {formatActionKind(action.action_kind)}
              {action.args?.method_name && <p>({action.args?.method_name})</p>}
            </p>
          ))}
        </div>
      )}
      {receipt?.outcome?.outgoing_receipts?.length > 0 && (
        <ul>
          {receipt?.outcome?.outgoing_receipts?.map((rcpt) => (
            <Fragment key={rcpt?.receipt_id}>
              <li>
                <Widget
                  src={`${ownerId}/widget/bos-components.components.Transactions.TreeReceipt`}
                  props={{
                    network: network,
                    t: t,
                    txn: txn,
                    receipt: rcpt,
                    className: ``,
                    ownerId,
                    setShow,
                    show,
                  }}
                />
              </li>
            </Fragment>
          ))}
        </ul>
      )}
    </>
  );
}

return MainComponent(props, context);