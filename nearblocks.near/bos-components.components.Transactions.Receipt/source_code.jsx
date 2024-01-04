/**
 * Component: TransactionsReceipt
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of Transaction Receipt on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {TransactionInfo} [txn] - Information related to a transaction.
 * @param {RPCTransactionInfo} [rpcTxn] - RPC data of the transaction.
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

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}
/* END_INCLUDE: "includes/libs.jsx" */
/* INCLUDE: "includes/near.jsx" */
function mapRpcActionToAction(action) {
  if (action === 'CreateAccount') {
    return {
      action_kind: 'CreateAccount',
      args: {},
    };
  }

  if (typeof action === 'object') {
    const kind = Object.keys(action)[0];

    return {
      action_kind: kind,
      args: action[kind],
    };
  }

  return null;
}

const valueFromObj = (obj) => {
  const keys = Object.keys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    if (typeof value === 'string') {
      return value;
    }

    if (typeof value === 'object') {
      const nestedValue = valueFromObj(value );
      if (nestedValue) {
        return nestedValue;
      }
    }
  }

  return undefined;
};

function txnLogs(txn) {
  let txLogs = [];

  const outcomes = txn?.receipts_outcome || [];

  for (let i = 0; i < outcomes.length; i++) {
    const outcome = outcomes[i];
    let logs = outcome?.outcome?.logs || [];

    if (logs.length > 0) {
      const mappedLogs = logs.map((log) => ({
        contract: outcome?.outcome?.executor_id || '',
        logs: log,
      }));
      txLogs = [...txLogs, ...mappedLogs];
    }
  }

  return txLogs;
}

function txnActions(txn) {
  const txActions = [];
  const receipts = txn?.receipts || [];

  for (let i = 0; i < receipts.length; i++) {
    const receipt = receipts[i];
    const from = receipt?.predecessor_id;
    const to = receipt?.receiver_id;

    if (Array.isArray(receipt?.receipt)) {
      const actions = receipt.receipt;

      for (let j = 0; j < actions.length; j++) {
        const action = actions[j];

        txActions.push({ from, to, ...action });
      }
    } else {
      const actions = receipt?.receipt?.Action?.actions || [];

      for (let j = 0; j < actions.length; j++) {
        const action = mapRpcActionToAction(actions[j]);

        txActions.push({ from, to, ...action });
      }
    }
  }

  return txActions.filter(
    (action) =>
      action.action_kind !== 'FunctionCall' && action.from !== 'system',
  );
}

function txnErrorMessage(txn) {
  const kind = txn?.status?.Failure?.ActionError?.kind;

  if (typeof kind === 'string') return kind;
  if (typeof kind === 'object') {
    return valueFromObj(kind);
  }

  return null;
}

function formatLine(line, offset, format) {
  let result = `${offset.toString(16).padStart(8, '0')}  `;

  const bytes = line.split(' ').filter(Boolean);
  bytes.forEach((byte, index) => {
    if (index > 0 && index % 4 === 0) {
      result += ' ';
    }
    result += byte.toUpperCase().padEnd(2, ' ') + ' ';
  });

  if (format === 'default') {
    result += ` ${String.fromCharCode(
      ...bytes.map((b) => parseInt(b, 16)),
    )}`;
  }

  return result.trimEnd();
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
/* END_INCLUDE: "includes/near.jsx" */


function MainComponent(props) {
  const { network, rpcTxn, txn, t } = props;
  const [receipt, setReceipt] = useState(null);
  const config = getConfig(network);

  function transactionReceipts(txn) {
    const actions = txn.transaction.actions.map((txn) =>
      mapRpcActionToAction(txn),
    );
    const receipts = txn.receipts;
    const receiptsOutcome = txn.receipts_outcome;

    if (
      receipts.length === 0 ||
      receipts[0].receipt_id !== receiptsOutcome[0].id
    ) {
      receipts.unshift({
        predecessor_id: txn.transaction.signer_id,
        receipt: actions,
        receipt_id: receiptsOutcome[0].id,
        receiver_id: txn.transaction.receiver_id,
      });
    }

    const receiptOutcomesByIdMap = new Map();
    const receiptsByIdMap = new Map();

    receiptsOutcome.forEach((receipt) => {
      receiptOutcomesByIdMap.set(receipt.id, receipt);
    });

    receipts.forEach((receiptItem) => {
      receiptsByIdMap.set(receiptItem.receipt_id, {
        ...receiptItem,
        actions:
          receiptItem.receipt_id === receiptsOutcome[0].id
            ? actions
            : receiptItem.receipt?.Action?.actions.map((receipt) =>
                mapRpcActionToAction(receipt),
              ),
      });
    });

    const collectReceipts = (receiptHash) => {
      const receipt = receiptsByIdMap.get(receiptHash);
      const receiptOutcome = receiptOutcomesByIdMap.get(receiptHash);

      return {
        ...receipt,
        ...receiptOutcome,
        outcome: {
          ...receiptOutcome.outcome,
          outgoing_receipts:
            receiptOutcome.outcome.receipt_ids.map(collectReceipts),
        },
      };
    };

    return collectReceipts(receiptsOutcome[0].id);
  }

  useEffect(() => {
    if (rpcTxn) {
      const receipt = transactionReceipts(rpcTxn);
      console.log('efewf', receipt);
      setReceipt(receipt);
    }
  }, [rpcTxn]);

  return (
    <div className="bg-white text-sm text-gray-500 divide-solid divide-gray-200 divide-y">
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Transactions.ReceiptRow`}
          props={{
            txn: txn,
            receipt: receipt,
            network: network,
            t: t,
          }}
        />
      }
    </div>
  );
}

return MainComponent(props, context);