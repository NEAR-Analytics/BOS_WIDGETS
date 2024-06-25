/**
 * Component: TransactionsTreeReceiptDetails
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of Transaction Receipt on Near Protocol.
 */










/* INCLUDE COMPONENT: "includes/Common/TreeReceipts/TreeTxnsActions.jsx" */
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
  const { action, ownerId } = props;

  const { shortenAddress } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const { shortenHex } = VM.require(`${ownerId}/widget/includes.Utils.formats`);

  if (typeof props.args.access_key?.permission !== 'object') {
    return (
      <>
        <div className="py-1">
          <FaKey className="inline-flex text-emerald-400 mr-1" />{' '}
          {props.t ? props.t('txns:txn.actions.addKey.0') : 'New key'} (
          <span className="font-bold">{shortenHex(props.args.public_key)}</span>
          ) {props.t ? props.t('txns:txn.actions.addKey.2') : 'added for'}
          <a href={`/address/${props.receiver}`} className="hover:no-underline">
            <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
              {shortenAddress(props.receiver)}
            </a>
          </a>{' '}
          {props.t ? props.t('txns:txn.actions.addKey.4') : 'with permission'}
          <span className="font-bold">{props.args.access_key?.permission}</span>
        </div>
        <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
          <Widget
            src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
            props={{
              node: action,
              path: 'root',
              ownerId,
            }}
          />
        </div>
      </>
    );
  }

  if (props.args.access_key.permission.permission_kind) {
    return (
      <>
        <div className="py-1">
          <FaKey className="inline-flex text-gray-400 dark:text-neargray-10 mr-1" />{' '}
          {props.t ? props.t('txns:txn.actions.addKey.0') : 'New key'} (
          <span className="font-bold">{shortenHex(props.args.public_key)}</span>
          ){props.t ? props.t('txns:txn.actions.addKey.2') : 'added for'}{' '}
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
        <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
          <Widget
            src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
            props={{
              node: action,
              path: 'root',
              ownerId,
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
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
      <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: action,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
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
  const { action, ownerId } = props;

  const { shortenAddress } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  return (
    <>
      <div className="py-1">
        <FaUser className="inline-flex text-emerald-400 mr-1" />{' '}
        {props.t ? props.t('txns:txn.actions.createAccount.0') : 'New account'}{' '}
        (
        <a href={`/address/${props.receiver}`} className="hover:no-underline">
          <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
            {shortenAddress(props.receiver)}
          </a>
        </a>
        ) {props.t ? props.t('txns:txn.actions.createAccount.1') : 'created'}
      </div>
      <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: action,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
  );
};






const DeleteAccount = (props) => {
  const { action, ownerId } = props;

  const { shortenAddress } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );
  return (
    <>
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

      <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: action,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
  );
};
const DeleteKey = (props) => {
  const { t, args, action, ownerId } = props;
  const { shortenHex } = VM.require(`${ownerId}/widget/includes.Utils.formats`);

  return (
    <>
      <div className="py-1">
        <FaKey className="inline-flex text-red-400 mr-1" />{' '}
        {t ? t('txns:txn.actions.deleteKey.0') : 'Key'} (
        <span className="font-bold">{shortenHex(args.public_key)}</span>){' '}
        {t ? t('txns:txn.actions.deleteKey.1') : 'deleted'}
      </div>
      <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: action,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
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
  const { t, receiver, action, ownerId } = props;
  const { shortenAddress } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  return (
    <>
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
      <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: action,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
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
  const { t, args, receiver, action, ownerId } = props;
  const { shortenAddress } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  function displayArgs(args) {
    if (!args || typeof args === 'undefined') return 'The arguments are empty';

    let pretty = '';
    const decoded = Buffer.from(args, 'base64');
    try {
      const parsed = JSON.parse(decoded.toString());
      if (parsed) {
        pretty = parsed;
      } else {
        pretty = hexy(decoded, { format: 'twos' });
      }
    } catch {
      pretty = hexy(decoded, { format: 'twos' });
    }

    if (pretty && typeof pretty === 'object' && pretty.msg) {
      try {
        const msgObj = JSON.parse(pretty.msg);
        pretty.msg = msgObj;
      } catch (error) {
        console.error('Error parsing JSON in "msg" property:', error);
      }
    }

    return pretty;
  }

  const modifiedAction = {
    ...action,
    args: {
      ...action.args,
      args: displayArgs(args?.args_base64 || args?.args),
    },
  };
  return (
    <>
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
      </div>
      <div className="mt-3 bg-gray-100 dark:bg-black-200 p-3 overflow-auto rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: modifiedAction,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
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
  const { t, args, action, ownerId } = props;
  const { yoctoToNear } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const { shortenHex } = VM.require(`${ownerId}/widget/includes.Utils.formats`);

  return (
    <>
      <div className="py-1">
        <FaCoins className="inline-flex text-yellow-500 mr-1" />
        {t ? t('txns:txn.actions.stake.0') : 'Staked'}
        <span className="font-bold">
          {args.stake ? yoctoToNear(args.stake, true) : args.stake ?? ''}Ⓝ
        </span>{' '}
        {t ? t('txns:txn.actions.stake.1') : 'with'}{' '}
        {shortenHex(args.public_key)}
      </div>
      <div className="mt-3 bg-gray-100 dark:bg-black-200 overflow-auto py-3 rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: action,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
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
  const { t, args, receiver, action, ownerId } = props;
  const { shortenAddress, yoctoToNear } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  return (
    <>
      <div className="py-1">
        <FaArrowAltCircleRight className="inline-flex text-green-400 mr-1" />{' '}
        {t ? t('txns:txn.actions.transfer.0') : 'Transferred'}
        <span className="font-bold">
          {args.deposit ? yoctoToNear(args.deposit, true) : args.deposit ?? ''}{' '}
          Ⓝ
        </span>{' '}
        {t ? t('txns:txn.actions.transfer.1') : 'to'}
        <a href={`/address/${receiver}`} className="hover:no-underline">
          <a className="text-green-500 dark:text-green-250 font-bold hover:no-underline">
            {shortenAddress(receiver)}
          </a>
        </a>
      </div>
      <div className="mt-3 bg-gray-100 dark:bg-black-200 p-3 overflow-auto rounded-lg">
        <Widget
          src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
          props={{
            node: action,
            path: 'root',
            ownerId,
          }}
        />
      </div>
    </>
  );
};

const TreeTxnsActions = (props) => {
  const { action, receiver, t, ownerId } = props;
  const { mapRpcActionToAction } = VM.require(
    `${ownerId}/widget/includes.Utils.near`,
  );
  switch (action.action_kind) {
    case 'ADD_KEY':
    case 'AddKey':
      return (
        <AddKey
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
          action={action}
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
          action={action}
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
          action={action}
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
          action={action}
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
          action={action}
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
          action={action}
        />
      );
    case 'STAKE':
    case 'Stake':
      return (
        <Stake
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
          action={action}
        />
      );
    case 'TRANSFER':
    case 'Transfer':
      return (
        <Transfer
          args={action.args}
          receiver={receiver}
          t={t}
          ownerId={ownerId}
          action={action}
        />
      );
    case 'Delegate':
    case 'DELEGATE':
      const delegateAction =
        action?.args?.delegate_action?.actions &&
        action?.args?.delegate_action?.actions?.map((txn) =>
          mapRpcActionToAction(txn),
        );
      function filterObject(obj) {
        if (obj && obj.action_kind) {
          return {
            action_kind: obj.action_kind,
          };
        } else {
          return {
            action_kind: {},
          };
        }
      }
      return (
        delegateAction &&
        delegateAction.map((_subAction, i) => (
          <div className="flex flex-col" key={i}>
            <p className="text-sm font-semibold">
              Actions delegated for {receiver}
            </p>
            <div className="mt-3 bg-gray-100 dark:bg-black-200 p-3 overflow-auto rounded-lg">
              <Widget
                src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
                props={{
                  node: filterObject(action),
                  path: 'root',
                  ownerId,
                }}
              />
            </div>
          </div>
        ))
      );

    default:
      return <div>{action.action_kind}</div>;
  }
};/* END_INCLUDE COMPONENT: "includes/Common/TreeReceipts/TreeTxnsActions.jsx" */


function MainComponent(props) {
  const { network, receipt, t, ownerId, txn, show } = props;

  const Loader = (props) => {
    return (
      <div
        className={`bg-gray-200 dark:bg-black-200 h-5 py-0.5 rounded shadow-sm animate-pulse ${props.className}`}
      ></div>
    );
  };
  return (
    <>
      {show === receipt.receipt_id && (
        <>
          {!receipt ? (
            <div className="w-full">
              <Loader wrapperClassName="flex w-full my-1 max-w-xs" />
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
              <Loader wrapperClassName="flex w-full" />
            </div>
          ) : receipt?.actions ? (
            <>
              {receipt &&
                receipt?.actions?.map((action, i) => (
                  <Fragment key={1}>
                    <div className="text-green-500 dark:text-green-250 text-base pt-3 pl-3">
                      Receipt
                    </div>
                    <div className="w-full pl-3 py-2 flex items-center">
                      From:{' '}
                      <OverlayTrigger
                        placement="bottom-start"
                        delay={{ show: 500, hide: 0 }}
                        overlay={
                          <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words">
                            {receipt.predecessor_id}
                          </Tooltip>
                        }
                      >
                        <Link
                          href={`/address/${receipt?.predecessor_id}`}
                          className="text-green-500 dark:text-green-250 font-medium inline-block truncate max-w-full ml-2"
                        >
                          {receipt.predecessor_id}
                        </Link>
                      </OverlayTrigger>
                    </div>
                    <div className="w-full pl-3 py-2 flex items-center">
                      To:{' '}
                      <OverlayTrigger
                        placement="bottom-start"
                        delay={{ show: 500, hide: 0 }}
                        overlay={
                          <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words">
                            {receipt.receiver_id}
                          </Tooltip>
                        }
                      >
                        <Link
                          href={`/address/${receipt?.receiver_id}`}
                          className="text-green-500 dark:text-green-250 font-medium inline-block truncate max-w-full ml-2"
                        >
                          {` ${receipt.receiver_id}`}
                        </Link>
                      </OverlayTrigger>
                    </div>
                    <div className="w-full pl-3 word-break space-y-4">
                      <TreeTxnsActions
                        key={i}
                        action={action}
                        receiver={receipt?.receiver_id}
                        t={t}
                        ownerId={ownerId}
                      />
                    </div>
                  </Fragment>
                ))}
              <div className="text-green-500 dark:text-green-250 text-base pt-3 pl-3">
                Execution Outcomes
              </div>
              <div className="pl-3 py-2">
                <span>Logs:</span>
                {!receipt ? (
                  <div className="w-full">
                    <Loader wrapperClassName="flex w-full" />
                    <Loader wrapperClassName="flex w-full" />
                    <Loader wrapperClassName="flex w-full" />
                  </div>
                ) : (
                  <div className="w-full break-words space-y-4">
                    {receipt?.outcome?.logs?.length > 0 ? (
                      <>
                        <div className="mt-3 bg-gray-100 dark:bg-black-200 dark:border-black-200 p-3 overflow-auto rounded-lg">
                          <Widget
                            src={`${ownerId}/widget/includes.Common.TreeReceipts.TreeNode`}
                            props={{
                              node: receipt?.outcome?.logs,
                              path: 'root',
                              ownerId,
                            }}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="mt-3 bg-gray-100 dark:bg-black-200 dark:border-black-200 p-3 overflow-auto rounded-lg">
                        No Logs
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            ''
          )}
        </>
      )}
      {receipt?.outcome?.outgoing_receipts?.length > 0 && (
        <>
          {receipt?.outcome?.outgoing_receipts?.map((rcpt) => (
            <Fragment key={rcpt?.receipt_id}>
              <Widget
                src={`${ownerId}/widget/bos-components.components.Transactions.TreeReceiptDetails`}
                props={{
                  network: network,
                  t: t,
                  txn: txn,
                  receipt: rcpt,
                  className: ``,
                  show,
                  ownerId,
                }}
              />
            </Fragment>
          ))}
        </>
      )}
    </>
  );
}

return MainComponent(props, context);