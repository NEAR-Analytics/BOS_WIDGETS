/**
 * Component: TransactionsReceiptInfo
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of Transaction Receipt on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {ReceiptsPropsInfo | any} [receipt] -  receipt of the transaction.
 * @param {string} ownerId - The identifier of the owner of the component.
 */








/* INCLUDE COMPONENT: "includes/Common/Question.jsx" */
const Question = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm2-1.645V14h-2v-1.5a1 1 0 011-1 1.5 1.5 0 10-1.471-1.794l-1.962-.393A3.501 3.501 0 1113 13.355z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Question.jsx" */
/* INCLUDE: "includes/hexy.jsx" */
function hexy(buffer, config) {
  const MAX_ADDRESS_LENGTH = 8;
  const defaults = {
    width: 16,
    numbering: 'hex_bytes',
    format: 'fours',
    littleEndian: false,
    radix: 16,
    caps: 'lower',
    annotate: 'ascii',
    prefix: '',
    indent: 0,
    html: false,
    offset: 0,
    length: -1,
    extendedChs: false,
    display_offset: 0,
  };
  const options = { ...defaults, ...config };

  let bufferData;
  if (Buffer.isBuffer(buffer)) {
    bufferData = buffer;
  } else if (Array.isArray(buffer)) {
    bufferData = Buffer.from(buffer);
  } else {
    throw new Error('Input must be a Buffer or an array of numbers.');
  }

  const {
    width,
    numbering,
    format,
    littleEndian,
    radix,
    annotate,
    indent,
    html,
    offset,
    length,
    extendedChs,
    display_offset,
  } = options;

  const prefixSpaces = ' '.repeat(indent);
  const htmlOpenTag = html ? "<div class='hexy'>\n" : '';
  const htmlCloseTag = html ? '</div>\n' : '';

  const bufferSlice = bufferData.slice(
    offset,
    length === -1 ? undefined : offset + length,
  );
  let str = htmlOpenTag;
  let addr = offset + display_offset;

  const numGroups = Math.ceil(bufferSlice.length / width);

  for (let group = 0; group < numGroups; group++) {
    const startIndex = group * width;
    const endIndex = Math.min(startIndex + width, bufferSlice.length);
    const slice = bufferSlice.slice(startIndex, endIndex);

    if (html) {
      str += `<div class='${num2str(addr, MAX_ADDRESS_LENGTH, 16)}'>`;
    }

    str += `${prefixSpaces}${
      numbering === 'hex_bytes'
        ? num2str(addr, MAX_ADDRESS_LENGTH, 16) + ': '
        : ''
    }`;
    str += hex(slice, width, format, radix, littleEndian);

    if (annotate === 'ascii') {
      str += ` ${
        html
          ? html_escape(getTextRepresentation(slice, extendedChs))
          : ascii_escape(getTextRepresentation(slice, extendedChs))
      }`;
    }

    str += html ? '</div>\n' : '\n';
    addr += width;
  }

  str += htmlCloseTag;

  return str;
}

function hex(
  buffer,
  width,
  format,
  radix,
  littleEndian,
) {
  let str = '';
  const delimiter = format === 'none' ? '' : ' ';
  const group_len = maxnumberlen(format === 'none' ? 1 : 2, radix);
  const padlen =
    (width - buffer.length) *
    (format === 'none' ? group_len : (group_len + 1) / 2);

  const numGroups = Math.ceil(buffer.length / 2);

  for (let group = 0; group < numGroups; ++group) {
    const startIndex = group * 2;
    const endIndex = Math.min(startIndex + 2, buffer.length);
    const bytes = buffer.slice(startIndex, endIndex);

    if (bytes.length === 0) break;

    if (bytes.length === 2) {
      let val = littleEndian ? bytes.readUInt16LE(0) : bytes.readUInt16BE(0);
      const text = val.toString(radix);
      str += '0'.repeat(group_len - text.length) + text;
      str += delimiter;
    } else {
      str += '0'.repeat(group_len);
      str += delimiter;
    }
  }

  if (buffer.length < width) {
    str += ' '.repeat(padlen);
  }

  return str;
}

function num2str(b, len, radix) {
  const s = b.toString(radix);
  return '0'.repeat(len - s.length) + s;
}

function maxnumberlen(bytes, radix) {
  let result = 2;
  if (bytes === 0) {
    bytes = 1;
  }
  switch (radix) {
    case 2:
      result = bytes * 8;
      break;
    case 8:
      switch (bytes) {
        case 1:
          result = 3;
          break;
        case 2:
          result = 6;
          break;
        case 4:
          result = 11;
          break;
        case 8:
          result = 22;
          break;
      }
      break;
    case 10:
      switch (bytes) {
        case 1:
          result = 3;
          break;
        case 2:
          result = 6;
          break;
        case 4:
          result = 10;
          break;
        case 8:
          result = 20;
          break;
      }
      break;
    case 16:
      result = 2 * bytes;
      break;
  }
  return result;
}

function getTextRepresentation(buffer, extendedChs) {
  let text = '';
  for (const byte of buffer) {
    if (extendedChs) {
      text += byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.';
    } else {
      text += byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.';
    }
  }
  return text;
}

function ascii_escape(str) {
  return str.replace(/[^\x20-\x7E]/g, '.');
}

function html_escape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\'/g, '&apos;')
    .replace(/\"/g, '&quot;')
    .replace(/[^\x20-\x7E]/g, function (ch) {
      return '&#x' + ch.codePointAt(0)?.toString(16) + ';';
    });
}
/* END_INCLUDE: "includes/hexy.jsx" */







function MainComponent(props) {
  const { receipt, network, ownerId } = props;
  const { getConfig, handleRateLimit, yoctoToNear } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const { convertToMetricPrefix, localFormat } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const hashes = ['output', 'inspect'];
  const [pageHash, setHash] = useState('output');
  const onTab = (index) => {
    setHash(hashes[index]);
  };

  const [block, setBlock] = useState({} );
  const [loading, setLoading] = useState(false);

  const config = getConfig && getConfig(network);

  useEffect(() => {
    function fetchBlocks() {
      setLoading(true);
      if (receipt?.outcome?.blockHash) {
        asyncFetch(`${config.backendUrl}blocks/${receipt?.outcome.blockHash}`)
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
  }, [receipt?.outcome?.blockHash, config.backendUrl]);

  let statusInfo;

  if (receipt?.outcome?.status?.type === 'successValue') {
    if (receipt?.outcome?.status?.value.length === 0) {
      statusInfo = (
        <div className="bg-gray-100 dark:bg-black-200 rounded-md p-5 font-medium my-3 whitespace-nowrap">
          Empty result
        </div>
      );
    } else {
      const args = receipt?.outcome?.status.value;
      const decodedArgs = Buffer.from(args, 'base64');

      let prettyArgs;
      try {
        const parsedJSONArgs = JSON.parse(decodedArgs.toString());
        if (parsedJSONArgs !== null) {
          prettyArgs =
            typeof parsedJSONArgs === 'boolean'
              ? JSON.stringify(parsedJSONArgs)
              : parsedJSONArgs;
        } else {
          prettyArgs = hexy(decodedArgs, { format: 'twos' });
        }
      } catch {
        prettyArgs = Array.from(decodedArgs)
          .map((byte) => byte.toString(16).padStart(2, '0'))
          .join('');
      }

      statusInfo =
        prettyArgs && typeof prettyArgs === 'object' ? (
          <textarea
            readOnly
            rows={4}
            defaultValue={JSON.stringify(prettyArgs)}
            className="block appearance-none outline-none w-fit border font-medium rounded-lg bg-gray-100 dark:bg-black-200 dark:border-black-200 p-5 my-3 resize-y"
          ></textarea>
        ) : (
          <div>
            <div className="bg-gray-100 dark:bg-black-200 rounded-md p-5 font-medium my-3">
              <div className="bg-inherit text-inherit font-inherit border-none p-0">
                <div className="max-h-52 overflow-auto">
                  <div className="h-full w-full">
                    <pre>{prettyArgs}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  } else if (receipt?.outcome?.status?.type === 'failure') {
    statusInfo = (
      <textarea
        readOnly
        rows={4}
        defaultValue={JSON.stringify(receipt.outcome.status.error, null, 2)}
        className="block appearance-none outline-none w-fit border dark:border-black-200 rounded-lg font-medium bg-gray-100 dark:bg-black-200 p-5 my-3 resize-y"
      ></textarea>
    );
  } else if (receipt?.outcome?.status?.type === 'successReceiptId') {
    statusInfo = (
      <div className="bg-gray-100 dark:bg-black-200 rounded-md my-3 p-5 font-medium overflow-auto">
        <pre>{receipt?.outcome?.status?.receiptId}</pre>
      </div>
    );
  }

  const getDeposit = (actions) =>
    actions
      .map((action) => ('deposit' in action.args ? action.args.deposit : '0'))
      .reduce(
        (acc, deposit) =>
          Big(acc || '0')
            .plus(deposit)
            .toString(),
        '0',
      );

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

  const getRefund = (receipts) =>
    receipts
      .filter(
        (receipt) => 'outcome' in receipt && receipt.predecessorId === 'system',
      )
      .reduce(
        (acc, receipt) =>
          Big(acc || '0')
            .plus(getDeposit(receipt.actions))
            .toString(),
        '0',
      );

  const getPreCharged = (receipt) =>
    Big(receipt?.outcome?.tokensBurnt || '0')
      .plus(getRefund(receipt?.outcome?.nestedReceipts))
      .toString();

  return (
    <div className="flex flex-col ">
      <Tabs.Root defaultValue={'output'}>
        <Tabs.List>
          {hashes &&
            hashes.map((hash, index) => (
              <Tabs.Trigger
                key={index}
                onClick={() => onTab(index)}
                className={`text-nearblue-600 text-xs leading-4 ${
                  hash === 'output' ? 'ml-6' : 'ml-3'
                } font-medium overflow-hidden inline-block cursor-pointer p-2 focus:outline-none ${
                  pageHash === hash
                    ? 'rounded-lg bg-green-600 dark:bg-green-250 text-white'
                    : 'hover:bg-neargray-800 bg-neargray-700 dark:text-neargray-10 dark:bg-black-200 rounded-lg hover:text-nearblue-600'
                }`}
                value={hash}
              >
                {hash === 'output' ? <h2>Output</h2> : <h2>Inspect</h2>}
              </Tabs.Trigger>
            ))}
        </Tabs.List>
        <Tabs.Content
          value={hashes[0]}
          className={'w-full focus:border-none focus:outline-none'}
        >
          <div className="flex flex-col my-4 ml-6">
            <div className="">
              <h2 className="flex items-center text-sm font-medium">
                <OverlayTrigger
                  placement="bottom-start"
                  delay={{ show: 500, hide: 0 }}
                  overlay={
                    <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                      Logs included in the receipt
                    </Tooltip>
                  }
                >
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </OverlayTrigger>
                Logs
              </h2>
              <div className="bg-gray-100 dark:bg-black-200 rounded-md p-0  mt-3 overflow-x-auto">
                {receipt?.outcome?.logs?.length > 0 ? (
                  <div className="w-full  break-words  space-y-4">
                    <textarea
                      readOnly
                      rows={4}
                      defaultValue={receipt?.outcome?.logs.join('\n')}
                      className="block appearance-none outline-none w-full border rounded-lg bg-gray-100 dark:bg-black-200 dark:border-black-200 p-5 resize-y"
                    ></textarea>
                  </div>
                ) : (
                  <div className="w-full  break-words p-5 font-medium space-y-4">
                    No Logs
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <h2 className="flex items-center text-sm font-medium">
                <OverlayTrigger
                  placement="bottom-start"
                  delay={{ show: 500, hide: 0 }}
                  overlay={
                    <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                      The result of the receipt execution
                    </Tooltip>
                  }
                >
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </OverlayTrigger>
                Result
              </h2>
              {statusInfo}
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content
          value={hashes[1]}
          className={'w-fit focus:border-none focus:outline-none'}
        >
          <div className="overflow-x-auto">
            <table className="my-4 mx-6 whitespace-nowrap table-auto">
              <tbody>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          Unique identifier (hash) of this receipt.
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    Receipt
                  </td>
                  <td className="font-semibold py-2 pl-4">{receipt?.id}</td>
                </tr>
                <tr>
                  <td
                    className={`flex items-center py-2 pr-4 ${
                      !block ? 'whitespace-normal' : 'whitespace-nowrap'
                    }`}
                  >
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          Block height
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    Block
                  </td>
                  <td className="py-2 pl-4">
                    {block && (
                      <Link
                        href={`/blocks/${receipt?.outcome?.blockHash}`}
                        className="text-green-500 dark:text-green-250"
                      >
                        {!loading &&
                          block?.block_height &&
                          localFormat(block?.block_height)}
                      </Link>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          The account which issued the receipt
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    From
                  </td>
                  <td className="py-2 pl-4">
                    <Link
                      href={`/address/${receipt?.predecessorId}`}
                      className="text-green-500 dark:text-green-250 hover:no-underline"
                    >
                      {receipt?.predecessorId}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          The destination account of the receipt
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    To
                  </td>
                  <td className="py-2 pl-4">
                    <Link
                      href={`/address/${receipt?.receiverId}`}
                      className="text-green-500 dark:text-green-250 hover:no-underline"
                    >
                      {receipt?.receiverId}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          Maximum amount of gas allocated for the Receipt
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    Gas Limit
                  </td>
                  <td className="py-2 pl-4">{`${
                    !loading &&
                    receipt?.actions &&
                    convertToMetricPrefix(getGasAttached(receipt?.actions))
                  }gas`}</td>
                </tr>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          Fees Pre-charged on Receipt
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    Pre-charged Fee
                  </td>
                  <td className="py-2 pl-4">{`${
                    !loading &&
                    receipt &&
                    yoctoToNear(getPreCharged(receipt), true)
                  } Ⓝ`}</td>
                </tr>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          Burnt Gas by Receipt
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    Burnt Gas
                  </td>
                  <td className="text-xs py-2 pl-4">
                    <span className="bg-orange-50 dark:bg-black-200 rounded-md px-2 py-1">
                      <span className="text-xs mr-2">🔥 </span>
                      {`${
                        !loading && receipt?.outcome?.gasBurnt
                          ? convertToMetricPrefix(receipt?.outcome?.gasBurnt)
                          : receipt?.outcome?.gasBurnt ?? ''
                      }gas`}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          Burnt Tokens by Receipt
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    Burnt Tokens
                  </td>
                  <td className="text-xs py-2 pl-4">
                    <span className="bg-orange-50 dark:bg-black-200 rounded-md px-2 py-1">
                      <span className="text-xs mr-2">🔥 </span>
                      {!loading && receipt?.outcome?.tokensBurnt
                        ? yoctoToNear(receipt?.outcome?.tokensBurnt, true)
                        : receipt?.outcome?.tokensBurnt ?? ''}
                      Ⓝ
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="flex items-center py-2 pr-4">
                    <OverlayTrigger
                      placement="bottom-start"
                      delay={{ show: 500, hide: 0 }}
                      overlay={
                        <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2">
                          Refund from the receipt
                        </Tooltip>
                      }
                    >
                      <div>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </div>
                    </OverlayTrigger>
                    Refund
                  </td>
                  <td className="py-2 pl-4">
                    {!loading &&
                      receipt?.outcome?.nestedReceipts &&
                      yoctoToNear(
                        getRefund(receipt?.outcome?.nestedReceipts) || '0',
                        true,
                      )}
                    Ⓝ
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

return MainComponent(props, context);