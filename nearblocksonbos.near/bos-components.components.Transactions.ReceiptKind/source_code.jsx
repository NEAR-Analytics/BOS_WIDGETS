







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

const backgroundColorClasses = {
  transfer: 'bg-green-50 dark:bg-green-200',
  stake: 'bg-cyan-50 dark:bg-cyan-900',
  deployContract: 'bg-orange-50 dark:bg-orange-900',
  addKey: 'bg-indigo-50 dark:bg-indigo-900',
  deleteKey: 'bg-red-50 dark:bg-red-900',
  functionCall: 'bg-blue-50 dark:bg-black-200',
  createAccount: 'bg-fuchsia-100 dark:bg-fuchsia-900',
  deleteAccount: 'bg-red-50 dark:bg-red-900',
  delegateAction: 'bg-blue-50 dark:bg-black-200',
};

function MainComponent(props) {
  const { network, t, action, onClick, isTxTypeActive, ownerId } = props;

  const { yoctoToNear } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const args = action.args.args;

  const decodedArgs = args ? Buffer.from(args, 'base64') : null;

  let prettyArgs;
  try {
    if (decodedArgs) {
      const parsedJSONArgs = JSON.parse(decodedArgs.toString());
      prettyArgs =
        typeof parsedJSONArgs === 'boolean'
          ? JSON.stringify(parsedJSONArgs)
          : parsedJSONArgs;
    } else {
      prettyArgs = '';
    }
  } catch {
    prettyArgs = Array.from(decodedArgs || [])
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

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
    <div className="pb-3">
      <div
        className={`p-2 mr-3 min-h-25 rounded-md inline-flex items-center justify-center leading-5 cursor-pointer 
        transition-all ease-in-out 
        ${backgroundColorClasses[action.kind] || ''}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {action?.kind !== 'functionCall' &&
          action?.kind !== 'delegateAction' &&
          t(`txns:${action?.kind}`)}
        {action?.kind === 'delegateAction' ? (
          <div className="inline-flex text-sm">{`Delegate`}</div>
        ) : null}
        {action?.kind === 'functionCall' ? (
          <div className="inline-flex text-sm">{`'${action?.args?.methodName}'`}</div>
        ) : null}
        {onClick ? (
          <div className="ml-2">{isTxTypeActive ? '-' : '+'}</div>
        ) : null}
      </div>
      {action?.kind === 'transfer' ? (
        <div className="inline-flex justify-center">
          <span className="text-xs whitespace-nowrap">
            {action?.args?.deposit
              ? yoctoToNear(action?.args?.deposit, false)
              : action?.args?.deposit ?? ''}
            Ⓝ
          </span>
        </div>
      ) : null}
      {isTxTypeActive ? (
        action?.kind === 'functionCall' ? (
          <div className="py-3">
            {prettyArgs && typeof prettyArgs === 'object' ? (
              <textarea
                readOnly
                rows={4}
                defaultValue={displayArgs(args?.args_base64 || args)}
                className="block appearance-none outline-none w-full border dark:border-black-200 dark:bg-black-200 rounded-lg bg-gray-100 p-3 resize-y"
              ></textarea>
            ) : (
              <div>
                <div className="bg-gray-100 dark:bg-black-200 rounded-md p-3 font-medium">
                  <div className="bg-inherit text-inherit font-inherit border-none p-0">
                    <div className="max-h-52 overflow-auto">
                      <div className="p-3 h-full w-full">{prettyArgs}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : action?.kind === 'delegateAction' ? (
          <div className="py-3">
            {[...action.args.actions]
              .sort(
                (actionA, actionB) =>
                  actionA.delegateIndex - actionB.delegateIndex,
              )
              .map((subaction) => (
                <Widget
                  key={subaction.delegateIndex}
                  src={`${ownerId}/widget/bos-components.components.Transactions.ReceiptKind`}
                  props={{
                    network: network,
                    t: t,
                    action: subaction,
                    isTxTypeActive: true,
                    ownerId,
                  }}
                />
              ))}
          </div>
        ) : null
      ) : null}
    </div>
  );
}

return MainComponent(props, context);