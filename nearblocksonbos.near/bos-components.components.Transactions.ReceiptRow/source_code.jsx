/**
 * Component: TransactionsReceiptRow
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of Transaction Receipt Row on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {TransactionInfo} [txn] - Information related to a transaction.
 * @param {RPCTransactionInfo} [rpcTxn] - RPC data of the transaction.
 * @param {ReceiptsPropsInfo} [receipt] -  receipt of the transaction.
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
/* INCLUDE COMPONENT: "includes/Common/Receipts/ReceiptStatus.jsx" */
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


const ReceiptStatus = (props) => {
  const { receipt } = props;

  function displayArgs(args) {
    if (!args || typeof args === 'undefined') return 'The arguments are empty';

    let pretty = '';
    const decoded = Buffer.from(args, 'base64');

    try {
      const parsed = JSON.parse(decoded.toString());
      if (parsed) {
        pretty = JSON.stringify(parsed, null, 2);
      } else {
        pretty = hexy(decoded, { format: 'twos' });
      }
    } catch {
      pretty = hexy(decoded, { format: 'twos' });
    }

    return pretty;
  }

  const status = receipt.outcome.status;
  if (status && 'SuccessValue' in status) {
    const { SuccessValue } = status;

    if (SuccessValue === null || SuccessValue === undefined) {
      return 'No Result';
    }

    if (Array.isArray(SuccessValue) || typeof SuccessValue === 'string') {
      if (SuccessValue.length === 0) {
        return 'Empty Result';
      }
    }

    return (
      <textarea
        readOnly
        rows={4}
        defaultValue={displayArgs(SuccessValue)}
        className="block appearance-none outline-none w-full border rounded-lg bg-gray-100 dark:bg-black-200 dark:border-black-200 p-3 mt-3 resize-y"
      ></textarea>
    );
  }

  if (status && 'Failure' in status) {
    return (
      <textarea
        readOnly
        rows={4}
        defaultValue={JSON.stringify(status.Failure, null, 2)}
        className="block appearance-none outline-none w-full border rounded-lg bg-gray-100 dark:bg-black-200 dark:border-black-200 p-3 mt-3 resize-y"
      ></textarea>
    );
  }

  if (status && 'SuccessReceiptId' in status) {
    return status.SuccessReceiptId;
  }

  return '';
};/* END_INCLUDE COMPONENT: "includes/Common/Receipts/ReceiptStatus.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Receipts/TransactionActions.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const FaKey = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      className={props.className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"></path>
    </svg>
  );
};


const AddKey = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const { shortenHex } = VM.require(
    `${props.ownerId}/widget/includes.Utils.formats`,
  );

  if (typeof props.args.access_key?.permission !== 'object') {
    return (
      <div className="py-1">
        <FaKey className="inline-flex text-emerald-400 mr-1" />{' '}
        {props.t ? props.t('txns:txn.actions.addKey.0') : 'New key'} (
        <span className="font-bold">{shortenHex(props.args.public_key)}</span>){' '}
        {props.t ? props.t('txns:txn.actions.addKey.2') : 'added for'}
        <a href={`/address/${props.receiver}`} className="hover:no-underline">
          <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
            {shortenAddress(props.receiver)}
          </a>
        </a>{' '}
        {props.t ? props.t('txns:txn.actions.addKey.4') : 'with permission'}
        <span className="font-bold">{props.args.access_key?.permission}</span>
      </div>
    );
  }

  if (props.args.access_key.permission.permission_kind) {
    return (
      <div className="py-1">
        <FaKey className="inline-flex text-gray-400 dark:text-neargray-10 mr-1" />{' '}
        {props.t ? props.t('txns:txn.actions.addKey.0') : 'New key'} (
        <span className="font-bold">{shortenHex(props.args.public_key)}</span>)
        {props.t ? props.t('txns:txn.actions.addKey.2') : 'added for'}{' '}
        <a href={`/address/${props.receiver}`} className="hover:no-underline">
          <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
            {shortenAddress(props.receiver)}
          </a>
        </a>{' '}
        {props.t ? props.t('txns:txn.actions.addKey.4') : 'with permission'}{' '}
        <span className="font-bold">
          {props.args.access_key.permission.permission_kind}
        </span>
      </div>
    );
  }

  return (
    <div className="py-1">
      <FaKey className="inline-flex text-gray-400 dark:text-neargray-10 mr-1" />{' '}
      {props.t ? props.t('txns:txn.actions.addKey.1') : 'Access key'} (
      <span className="font-bold">{shortenHex(props.args.public_key)}</span>){' '}
      {props.t ? props.t('txns:txn.actions.addKey.2') : 'added for'}
      {props.t ? props.t('txns:txn.actions.addKey.3') : 'contract'}
      <a
        href={`/address/${props.args.access_key.permission.FunctionCall.receiver_id}`}
        className="hover:no-underline"
      >
        <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
          {shortenAddress(
            props.args.access_key.permission.FunctionCall.receiver_id,
          )}
        </a>
      </a>{' '}
      {props.t ? props.t('txns:txn.actions.addKey.4') : 'with permission'}
      {props.t ? props.t('txns:txn.actions.addKey.5') : 'to call'}
      <span className="font-bold">
        {props.args.access_key.permission.FunctionCall.method_names.length > 0
          ? props.args.access_key.permission.FunctionCall.method_names.join(
              ', ',
            )
          : 'any'}{' '}
      </span>
      {props.t ? props.t('txns:txn.actions.addKey.6') : 'methods'}
    </div>
  );
};
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const FaUser = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      className={props.className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
    </svg>
  );
};

const CreateAccount = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  return (
    <div className="py-1">
      <FaUser className="inline-flex text-emerald-400 mr-1" />{' '}
      {props.t ? props.t('txns:txn.actions.createAccount.0') : 'New account'} (
      <a href={`/address/${props.receiver}`} className="hover:no-underline">
        <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
          {shortenAddress(props.receiver)}
        </a>
      </a>
      ) {props.t ? props.t('txns:txn.actions.createAccount.1') : 'created'}
    </div>
  );
};

const DeleteAccount = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  return (
    <div className="py-1">
      <FaUser className="inline-flex text-red-400 mr-1" />
      {props.t
        ? props.t('txns:txn.actions.deleteAccount.0')
        : 'Delete account'}{' '}
      (
      <a href={`/address/${props.receiver}`} className="hover:no-underline">
        <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
          {shortenAddress(props.receiver)}
        </a>
      </a>
      ){' '}
      {props.t
        ? props.t('txns:txn.actions.deleteAccount.1')
        : 'and transfer remaining funds to'}
      <a
        href={`/address/${props.args.beneficiary_id}`}
        className="hover:no-underline"
      >
        <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
          {shortenAddress(props.args.beneficiary_id)}
        </a>
      </a>
    </div>
  );
};
const DeleteKey = (props) => {
  const { shortenHex } = VM.require(
    `${props.ownerId}/widget/includes.Utils.formats`,
  );

  const { t, args } = props;

  return (
    <div className="py-1">
      <FaKey className="inline-flex text-red-400 mr-1" />{' '}
      {t ? t('txns:txn.actions.deleteKey.0') : 'Key'} (
      <span className="font-bold">{shortenHex(args.public_key)}</span>){' '}
      {t ? t('txns:txn.actions.deleteKey.1') : 'deleted'}
    </div>
  );
};
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const FaCode = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 640 512"
      className={props.className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M278.9 511.5l-61-17.7c-6.4-1.8-10-8.5-8.2-14.9L346.2 8.7c1.8-6.4 8.5-10 14.9-8.2l61 17.7c6.4 1.8 10 8.5 8.2 14.9L293.8 503.3c-1.9 6.4-8.5 10.1-14.9 8.2zm-114-112.2l43.5-46.4c4.6-4.9 4.3-12.7-.8-17.2L117 256l90.6-79.7c5.1-4.5 5.5-12.3.8-17.2l-43.5-46.4c-4.5-4.8-12.1-5.1-17-.5L3.8 247.2c-5.1 4.7-5.1 12.8 0 17.5l144.1 135.1c4.9 4.6 12.5 4.4 17-.5zm327.2.6l144.1-135.1c5.1-4.7 5.1-12.8 0-17.5L492.1 112.1c-4.8-4.5-12.4-4.3-17 .5L431.6 159c-4.6 4.9-4.3 12.7.8 17.2L523 256l-90.6 79.7c-5.1 4.5-5.5 12.3-.8 17.2l43.5 46.4c4.5 4.9 12.1 5.1 17 .6z"></path>
    </svg>
  );
};


const DeployContract = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );
  const { t, receiver } = props;

  return (
    <div className="py-1">
      <FaCode className="inline-flex text-emerald-400 mr-1" />{' '}
      {t ? t('txns:txn.actions.deployContract.0') : 'Contract'} (
      <a href={`/address/${receiver}`} className="hover:no-underline">
        <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
          {shortenAddress(receiver)}
        </a>
      </a>
      ) {t ? t('txns:txn.actions.deployContract.1') : 'deployed'}
    </div>
  );
};
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



const FunctionCall = (props) => {
  const { shortenAddress } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const { t, args, receiver } = props;

  function displayArgs(args) {
    if (!args || typeof args === 'undefined') return 'The arguments are empty';

    let pretty = '';
    const decoded = Buffer.from(args, 'base64');
    try {
      const parsed = JSON.parse(decoded.toString());
      if (parsed) {
        pretty = JSON.stringify(parsed, null, 2);
      } else {
        pretty = hexy(decoded, { format: 'twos' });
      }
    } catch {
      pretty = hexy(decoded, { format: 'twos' });
    }

    return pretty;
  }

  return (
    <div className="py-1">
      <FaCode className="inline-flex text-yellow-500 mr-1" />
      {t ? t('txns:txn.actions.functionCall.0') : 'Called method'}
      <span className="font-bold">{args?.method_name}</span>{' '}
      {t ? t('txns:txn.actions.functionCall.1') : 'in contract'}
      <a href={`/address/${receiver}`} className="hover:no-underline">
        <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
          {shortenAddress(receiver)}
        </a>
      </a>
      <textarea
        readOnly
        rows={4}
        defaultValue={displayArgs(args?.args_base64 || args?.args)}
        className="block appearance-none outline-none w-full border rounded-lg bg-gray-100 dark:bg-black-200 dark:border-black-200  p-3 mt-3 resize-y"
      ></textarea>
    </div>
  );
};
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const FaCoins = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="16"
      width="16"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="#eab308"
        d="M512 80c0 18-14.3 34.6-38.4 48c-29.1 16.1-72.5 27.5-122.3 30.9c-3.7-1.8-7.4-3.5-11.3-5C300.6 137.4 248.2 128 192 128c-8.3 0-16.4 .2-24.5 .6l-1.1-.6C142.3 114.6 128 98 128 80c0-44.2 86-80 192-80S512 35.8 512 80zM160.7 161.1c10.2-.7 20.7-1.1 31.3-1.1c62.2 0 117.4 12.3 152.5 31.4C369.3 204.9 384 221.7 384 240c0 4-.7 7.9-2.1 11.7c-4.6 13.2-17 25.3-35 35.5c0 0 0 0 0 0c-.1 .1-.3 .1-.4 .2l0 0 0 0c-.3 .2-.6 .3-.9 .5c-35 19.4-90.8 32-153.6 32c-59.6 0-112.9-11.3-148.2-29.1c-1.9-.9-3.7-1.9-5.5-2.9C14.3 274.6 0 258 0 240c0-34.8 53.4-64.5 128-75.4c10.5-1.5 21.4-2.7 32.7-3.5zM416 240c0-21.9-10.6-39.9-24.1-53.4c28.3-4.4 54.2-11.4 76.2-20.5c16.3-6.8 31.5-15.2 43.9-25.5V176c0 19.3-16.5 37.1-43.8 50.9c-14.6 7.4-32.4 13.7-52.4 18.5c.1-1.8 .2-3.5 .2-5.3zm-32 96c0 18-14.3 34.6-38.4 48c-1.8 1-3.6 1.9-5.5 2.9C304.9 404.7 251.6 416 192 416c-62.8 0-118.6-12.6-153.6-32C14.3 370.6 0 354 0 336V300.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 342.6 135.8 352 192 352s108.6-9.4 148.1-25.9c7.8-3.2 15.3-6.9 22.4-10.9c6.1-3.4 11.8-7.2 17.2-11.2c1.5-1.1 2.9-2.3 4.3-3.4V304v5.7V336zm32 0V304 278.1c19-4.2 36.5-9.5 52.1-16c16.3-6.8 31.5-15.2 43.9-25.5V272c0 10.5-5 21-14.9 30.9c-16.3 16.3-45 29.7-81.3 38.4c.1-1.7 .2-3.5 .2-5.3zM192 448c56.2 0 108.6-9.4 148.1-25.9c16.3-6.8 31.5-15.2 43.9-25.5V432c0 44.2-86 80-192 80S0 476.2 0 432V396.6c12.5 10.3 27.6 18.7 43.9 25.5C83.4 438.6 135.8 448 192 448z"
      />
    </svg>
  );
};


const Stake = (props) => {
  const { yoctoToNear } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const { shortenHex } = VM.require(
    `${props.ownerId}/widget/includes.Utils.formats`,
  );

  const { t, args } = props;

  return (
    <div className="py-1">
      <FaCoins className="inline-flex text-yellow-500 mr-1" />
      {t ? t('txns:txn.actions.stake.0') : 'Staked'}
      <span className="font-bold">
        {args.stake ? yoctoToNear(args.stake, true) : args.stake ?? ''}Ⓝ
      </span>{' '}
      {t ? t('txns:txn.actions.stake.1') : 'with'} {shortenHex(args.public_key)}
    </div>
  );
};
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const FaArrowAltCircleRight = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 512 512"
      className={props.className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zM140 300h116v70.9c0 10.7 13 16.1 20.5 8.5l114.3-114.9c4.7-4.7 4.7-12.2 0-16.9l-114.3-115c-7.6-7.6-20.5-2.2-20.5 8.5V212H140c-6.6 0-12 5.4-12 12v64c0 6.6 5.4 12 12 12z"></path>
    </svg>
  );
};


const Transfer = (props) => {
  const { shortenAddress, yoctoToNear } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const { t, args, receiver } = props;

  return (
    <div className="py-1">
      <FaArrowAltCircleRight className="inline-flex text-green-400 mr-1" />{' '}
      {t ? t('txns:txn.actions.transfer.0') : 'Transferred'}
      <span className="font-bold">
        {args.deposit ? yoctoToNear(args.deposit, true) : args.deposit ?? ''} Ⓝ
      </span>{' '}
      {t ? t('txns:txn.actions.transfer.1') : 'to'}
      <a href={`/address/${receiver}`} className="hover:no-underline">
        <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
          {shortenAddress(receiver)}
        </a>
      </a>
    </div>
  );
};

const TransactionActions = (props) => {
  const { action, receiver, t, ownerId } = props;

  switch (action.action_kind) {
    case 'ADD_KEY':
    case 'AddKey':
      return (
        <AddKey
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
        />
      );
    case 'CREATE_ACCOUNT':
    case 'CreateAccount':
      return (
        <CreateAccount
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
        />
      );
    case 'DELETE_ACCOUNT':
    case 'DeleteAccount':
      return (
        <DeleteAccount
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
        />
      );
    case 'DELETE_KEY':
    case 'DeleteKey':
      return (
        <DeleteKey
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
        />
      );
    case 'DEPLOY_CONTRACT':
    case 'DeployContract':
      return (
        <DeployContract
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
        />
      );
    case 'FUNCTION_CALL':
    case 'FunctionCall':
      return (
        <FunctionCall
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
        />
      );
    case 'STAKE':
    case 'Stake':
      return (
        <Stake args={action.args} receiver={receiver} t={t} ownerId={ownerId} />
      );
    case 'TRANSFER':
    case 'Transfer':
      return (
        <Transfer
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
        />
      );

    default:
      return <div>{action.action_kind}</div>;
  }
};/* END_INCLUDE COMPONENT: "includes/Common/Receipts/TransactionActions.jsx" */

function MainComponent(props) {
  const { network, receipt, borderFlag, t, ownerId } = props;

  const { convertToMetricPrefix, localFormat } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig, handleRateLimit, yoctoToNear } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [block, setBlock] = useState({} );
  const [loading, setLoading] = useState(false);

  const config = getConfig && getConfig(network);

  useEffect(() => {
    function fetchBlocks() {
      setLoading(true);
      if (receipt?.block_hash) {
        asyncFetch(`${config.backendUrl}blocks/${receipt?.block_hash}`)
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
  }, [receipt?.block_hash, config.backendUrl]);

  const Loader = (props) => {
    return (
      <div
        className={`bg-gray-200 dark:bg-black-200 h-5 rounded shadow-sm animate-pulse ${props.className}`}
      ></div>
    );
  };

  return (
    <div className="divide-solid divide-gray-200 dark:divide-black-200 divide-y">
      <div
        className={
          borderFlag
            ? ''
            : 'border-l-4 border-green-400 dark:border-green-250 ml-8 my-2'
        }
      >
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.receipts.receipt.tooltip')
                    : 'Unique identifier (hash) of this receipt.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.receipts.receipt.text.0') : 'Receipt'}
          </div>
          {!receipt || loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xs" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 font-semibold word-break">
              {receipt?.receipt_id ? receipt?.receipt_id : ''}
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  Block height
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.receipts.block.text.0') : 'Block'}
          </div>
          {!receipt || loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xs" />
            </div>
          ) : block?.block_height ? (
            <div className="w-full md:w-3/4 word-break">
              <Link
                href={`/blocks/${receipt.block_hash}`}
                className="hover:no-underline"
              >
                <a className="text-green-500 dark:text-green-250 hover:no-underline">
                  {localFormat(block?.block_height)}
                </a>
              </Link>
            </div>
          ) : (
            ''
          )}
        </div>
        <div>
          <div className="flex flex-wrap p-4">
            <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Question className="w-4 h-4 fill-current mr-1" />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                    align="start"
                    side="bottom"
                  >
                    {t
                      ? t('txns:txn.receipts.from.tooltip')
                      : 'The account which issued a receipt.'}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
              {t ? t('txns:txn.receipts.from.text.0') : 'From'}
            </div>
            {!receipt || loading ? (
              <div className="w-full md:w-3/4">
                <Loader wrapperClassName="flex w-full max-w-sm" />
              </div>
            ) : receipt?.predecessor_id ? (
              <div className="w-full md:w-3/4 word-break">
                <Link
                  href={`/address/${receipt?.predecessor_id}`}
                  className="hover:no-underline"
                >
                  <a className="text-green-500 dark:text-green-250 hover:no-underline">
                    {receipt?.predecessor_id}
                  </a>
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="flex flex-wrap p-4">
            <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div>
                      <Question className="w-4 h-4 fill-current mr-1" />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                    align="start"
                    side="bottom"
                  >
                    {t
                      ? t('txns:txn.receipts.to.tooltip')
                      : 'The destination account of the receipt.'}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
              {t ? t('txns:txn.receipts.to.text.0') : 'To'}
            </div>
            {!receipt || loading ? (
              <div className="w-full md:w-3/4">
                <Loader wrapperClassName="flex w-full max-w-xs" />
              </div>
            ) : receipt?.receiver_id ? (
              <div className="w-full md:w-3/4 word-break">
                <Link
                  href={`/address/${receipt?.receiver_id}`}
                  className="hover:no-underline"
                >
                  <a className="text-green-500 dark:text-green-250 hover:no-underline">
                    {receipt?.receiver_id}
                  </a>
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.receipts.burnt.tooltip')
                    : 'Total amount of Gas & Token burnt from this receipt.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t
              ? t('txns:txn.receipts.burnt.text.0')
              : 'Burnt Gas & Tokens by Receipt'}
          </div>
          {!receipt || loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-36" />
            </div>
          ) : receipt?.outcome?.gas_burnt ? (
            <div className="w-full items-center text-xs flex md:w-3/4 break-words">
              <div className="bg-orange-50  dark:bg-black-200 rounded-md px-2 py-1">
                <span className="text-xs mr-2">🔥 </span>
                {receipt?.outcome?.gas_burnt
                  ? convertToMetricPrefix(receipt?.outcome?.gas_burnt) + 'gas'
                  : ''}
                <span className="text-gray-300 px-1">|</span>{' '}
                {receipt?.outcome?.tokens_burnt
                  ? yoctoToNear(receipt?.outcome?.tokens_burnt, true)
                  : ''}{' '}
                Ⓝ
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex items-start flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.receipts.actions.tooltip')
                    : 'The actions performed during receipt processing.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.receipts.actions.text.0') : 'Actions'}
          </div>
          {!receipt || loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full my-1 max-w-xs" />
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
            </div>
          ) : receipt?.actions ? (
            <div className="w-full md:w-3/4 word-break space-y-4">
              {receipt &&
                receipt?.actions?.map((action, i) => (
                  <TransactionActions
                    key={i}
                    action={action}
                    receiver={receipt?.receiver_id}
                    t={t}
                    ownerId={ownerId}
                  />
                ))}
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="flex items-start flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.receipts.result.tooltip')
                    : 'The result of the receipt execution.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.receipts.result.text.0') : 'Result'}
          </div>
          {!receipt || loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words space-y-4">
              {receipt ? <ReceiptStatus receipt={receipt} /> : ''}
            </div>
          )}
        </div>
        <div className="flex items-start flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.receipts.logs.tooltip')
                    : 'Logs included in the receipt.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.receipts.logs.text.0') : 'Logs'}
          </div>
          {!receipt || loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words space-y-4">
              {receipt?.outcome?.logs?.length > 0 ? (
                <textarea
                  readOnly
                  rows={4}
                  defaultValue={receipt?.outcome?.logs?.join('\n')}
                  className="block appearance-none outline-none w-full border rounded-lg bg-gray-100 dark:bg-black-200 dark:border-black-200 p-3 mt-3 resize-y"
                ></textarea>
              ) : (
                'No Logs'
              )}
            </div>
          )}
        </div>
      </div>
      {receipt?.outcome?.outgoing_receipts?.length > 0 && (
        <div className="pb-4">
          {receipt?.outcome?.outgoing_receipts?.map((rcpt) => (
            <div className="pl-4 pt-6" key={rcpt?.receipt_id}>
              <div className="mx-4 border-l-4 border-l-gray-200">
                {
                  <Widget
                    src={`${ownerId}/widget/bos-components.components.Transactions.ReceiptRow`}
                    props={{
                      receipt: rcpt,
                      borderFlag: true,
                      network: network,
                      Link,
                      ownerId,
                    }}
                  />
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

return MainComponent(props, context);