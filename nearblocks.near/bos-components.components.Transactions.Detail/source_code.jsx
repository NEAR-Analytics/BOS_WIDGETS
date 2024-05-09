/**
 * Component: TransactionsDetail
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of specific Transaction on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {boolean} [loading] - Indicates whether data is currently loading.
 * @param {TransactionInfo} [txn] - Information related to a transaction.
 * @param {RPCTransactionInfo} [rpcTxn] - RPC data of the transaction.
 * @param {React.FC<{
 *   href: string;
 *   children: React.ReactNode;
 *   className?: string;
 * }>} Link - A React component for rendering links.
 */














/* INCLUDE COMPONENT: "includes/Common/Action/index.jsx" */
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const WrapDeposit = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const config = getConfig(props.network);
  const log = props.event.logs?.match(/^Deposit (\d+) NEAR to ([\S]+)/);

  if (log?.length !== 3) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Mint </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: props.event.contract,
            amount: log[1],
            network: props.network,
          }}
        />
      }
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const Withdraw = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const config = getConfig(props.network);
  const log = props.event.logs?.match(/^Withdraw (\d+) NEAR from ([\S]+)/);

  if (log?.length !== 3) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Burn </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: props.event.contract,
            amount: log[1],
            network: props.network,
          }}
        />
      }
    </div>
  );
};


2;


const WrapContract = (props) => {
  switch (true) {
    case /^Deposit.*/.test(props.event.logs):
      return <WrapDeposit event={props.event} network={props.network} />;
    case /^Withdraw.*/.test(props.event.logs):
      return <Withdraw event={props.event} network={props.network} />;

    default:
      return null;
  }
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const Swap = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const config = getConfig(props.network);
  const log = props.event.logs?.match(
    /^Swapped (\d+) ([\S]+) for (\d+) ([\S]+)/,
  );

  if (log?.length !== 5) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Swap </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{ network: props.network, contract: log[2], amount: log[1] }}
        />
      }
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{ network: props.network, contract: log[4], amount: log[3] }}
        />
      }
      <span className="font-bold text-gray px-1">
        On{' '}
        <a href="/address/v2.ref-finance.near" className="hover:no-underline">
          <a className="text-green-500 font-normal hover:no-underline">
            Ref Finance
          </a>
        </a>
      </span>
    </div>
  );
};


const RefContract = (props) => {
  switch (true) {
    case /^Swapped.*/.test(props.event.logs):
      return <Swap event={props.event} network={props.network} />;

    default:
      return null;
  }
};

/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const DepositToReserve = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];
  const config = getConfig(props.network);
  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Deposit To Reserve </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const Deposit = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];
  const config = getConfig(props.network);
  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Deposit </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const WithdrawSucceeded = (props) => {
  const log = props.event?.[0];
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const config = getConfig(props.network);
  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Withdraw </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            network: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        To{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const IncreaseCollateral = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];
  const config = getConfig(props.network);
  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Increase Collateral </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const DescreaseCollateral = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];
  const config = getConfig(props.network);
  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Descrease Collateral </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const Borrow = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };

  const log = props.event?.[0];
  const config = getConfig(props.network);
  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Borrow </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        To{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const Repay = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  const log = props.event?.[0];
  const config = getConfig(props.network);

  if (!log?.token_id || !log?.account_id || !log?.amount) return null;

  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">Repay </span>
      {
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.TokenInfo`}
          props={{
            contract: log.token_id,
            amount: log.amount,
            networK: props.network,
          }}
        />
      }
      <span className="font-bold text-gray px-1">
        From{' '}
        <a href={`/address/${log.account_id}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(log.account_id)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        On{' '}
        <a
          href="/address/contract.main.burrow.near"
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal hover:no-underline">
            Burrow
          </a>
        </a>
      </span>
    </div>
  );
};







const BurrowContract = (props) => {
  let parsedEvent = {};

  try {
    parsedEvent = JSON.parse(props.event.logs.replace('EVENT_JSON:', ''));
  } catch (error) {
    console.log(error);
  }

  if ('event' in parsedEvent) {
    switch (parsedEvent.event) {
      case 'deposit_to_reserve':
        return (
          <DepositToReserve event={parsedEvent.data} network={props.network} />
        );
      case 'deposit':
        return <Deposit event={parsedEvent.data} network={props.network} />;
      case 'withdraw_succeeded':
        return (
          <WithdrawSucceeded event={parsedEvent.data} network={props.network} />
        );
      case 'increase_collateral':
        return (
          <IncreaseCollateral
            event={parsedEvent.data}
            network={props.network}
          />
        );
      case 'decrease_collateral':
        return (
          <DescreaseCollateral
            event={parsedEvent.data}
            network={props.network}
          />
        );
      case 'borrow':
        return <Borrow event={parsedEvent.data} network={props.network} />;
      case 'repay':
        return <Repay event={parsedEvent.data} network={props.network} />;
      default:
        return null;
    }
  }

  return null;
};

const EventLogs = (props) => {
  switch (props.event.contract) {
    case 'wrap.near':
    case 'wrap.testnet':
      return <WrapContract event={props.event} network={props.network} />;
    case 'v2.ref-finance.near':
      return <RefContract event={props.event} network={props.network} />;
    case 'contract.main.burrow.near':
    case 'contract.1638481328.burrow.testnet':
      return <BurrowContract event={props.event} network={props.network} />;

    default:
      return null;
  }
};/* END_INCLUDE COMPONENT: "includes/Common/Action/index.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Actions.jsx" */
/* INCLUDE: "includes/libs.jsx" */
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */

const CreateAccount = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Create Account{' '}
        <a href={`/address/${props.action.to}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const DeleteAccount = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Delete Account{' '}
        <a href={`/address/${props.action.to}`}>
          <a className="text-green-500 font-normal pl-1">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const DeployContract = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Deploy Contract{' '}
        <a href={`/address/${props.action.to}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}

function fiatValue(big, price) {
  const value = Big(big).mul(Big(price));
  const stringValue = value.toFixed(6); // Set the desired maximum fraction digits

  const [integerPart, fractionalPart] = stringValue.split('.');

  // Format integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  // Combine formatted integer and fractional parts
  const formattedNumber = fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

function nanoToMilli(nano) {
  return Big(nano).div(Big(10).pow(6)).round().toNumber();
}

function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const Stake = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Stake{' '}
        <span className="font-normal pl-1">
          {yoctoToNear(props.action.args.stake, true)} Ⓝ
        </span>
      </span>
    </div>
  );
};
/* INCLUDE: "includes/libs.jsx" */
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}

function fiatValue(big, price) {
  const value = Big(big).mul(Big(price));
  const stringValue = value.toFixed(6); // Set the desired maximum fraction digits

  const [integerPart, fractionalPart] = stringValue.split('.');

  // Format integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  // Combine formatted integer and fractional parts
  const formattedNumber = fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

function nanoToMilli(nano) {
  return Big(nano).div(Big(10).pow(6)).round().toNumber();
}

function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const Transfer = (props) => {
  const FaRight = (props) => {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 192 512"
        className={props.className}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
      </svg>
    );
  };
  return (
    <div className="flex flex-wrap items-center break-all leading-7">
      <FaRight className="inline-flex text-gray-400 text-xs" />
      <span className="font-bold px-1">
        Transfer{' '}
        <span className="font-normal pl-1">
          {yoctoToNear(props.action.args.deposit, true)} Ⓝ
        </span>
      </span>
      <span className="font-bold text-gray px-1">
        From{' '}
        <a
          href={`/address/${props.action.from}`}
          className="hover:no-underline"
        >
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.from)}
          </a>
        </a>
      </span>
      <span className="font-bold text-gray px-1">
        To{' '}
        <a href={`/address/${props.action.to}`} className="hover:no-underline">
          <a className="text-green-500 font-normal pl-1 hover:no-underline">
            {shortenAddress(props.action.to)}
          </a>
        </a>
      </span>
    </div>
  );
};

const Actions = (props) => {
  switch (props.action.action_kind) {
    case 'CreateAccount':
      return <CreateAccount action={props.action} />;
    case 'DeleteAccount':
      return <DeleteAccount action={props.action} />;
    case 'DeployContract':
      return <DeployContract action={props.action} />;
    case 'Stake':
      return <Stake action={props.action} />;
    case 'Transfer':
      return <Transfer action={props.action} />;
    default:
      return null;
  }
};/* END_INCLUDE COMPONENT: "includes/Common/Actions.jsx" */
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
/* INCLUDE COMPONENT: "includes/Common/Status.jsx" */
const FaCheckCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path
        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
        fill="#50C878"
      />
    </svg>
  );
};
const FaTimesCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
        fill="#ff0000"
      />
    </svg>
  );
};
const FaHourglassStart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
      <path
        d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V75c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437v11c-17.7 0-32 14.3-32 32s14.3 32 32 32H64 320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V437c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320 64 32zM288 437v11H96V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9z"
        fill="#FFEB3B"
      />
    </svg>
  );
};

const getOptions = (status) => {
  switch (status) {
    case null:
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-500',
        icon: FaHourglassStart,
        label: 'Pending',
      };
    case false:
      return {
        bg: 'bg-red-50',
        text: 'text-red-500',
        icon: FaTimesCircle,
        label: 'Failure',
      };

    default:
      return {
        bg: 'bg-emerald-50',
        text: 'text-emerald-500',
        icon: FaCheckCircle,
        label: 'Success',
      };
  }
};

const TxnStatus = (props) => {
  const option = getOptions(props.status);
  const Icon = option.icon;

  return (
    <div className="w-full md:w-3/4 break-words">
      <span
        className={`inline-flex items-center text-xs rounded py-1 ${
          option.bg
        } ${option.text} ${props.showLabel ? ' px-2' : ' px-1'}`}
      >
        <Icon />
        {props.showLabel && <span className="ml-2">{option.label}</span>}
      </span>
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Status.jsx" */
/* INCLUDE: "includes/formats.jsx" */
function convertToMetricPrefix(numberStr) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let result = new Big(numberStr);
  let count = 0;

  while (result.abs().gte('1e3') && count < prefixes.length - 1) {
    result = result.div(1e3);
    count++;
  }

  // Check if the value is an integer or has more than two digits before the decimal point
  if (result.abs().lt(1e2) && result.toFixed(2) !== result.toFixed(0)) {
    result = result.toFixed(2);
  } else {
    result = result.toFixed(0);
  }

  return result.toString() + ' ' + prefixes[count];
}

function formatNumber(value) {
  let bigValue = new Big(value);
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (bigValue.gte(10000) && suffixIndex < suffixes.length - 1) {
    bigValue = bigValue.div(1000);
    suffixIndex++;
  }

  const formattedValue = bigValue.toFixed(1).replace(/\.0+$/, '');
  return `${formattedValue} ${suffixes[suffixIndex]}`;
}

function gasFee(gas, price) {
  const near = yoctoToNear(Big(gas).mul(Big(price)).toString(), true);

  return `${near}`;
}

function currency(number) {
  let absNumber = new Big(number).abs();

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let suffixIndex = 0;

  while (absNumber.gte(1000) && suffixIndex < suffixes.length - 1) {
    absNumber = absNumber.div(1000); // Divide using big.js's div method
    suffixIndex++;
  }

  const formattedNumber = absNumber.toFixed(2); // Format with 2 decimal places

  return (
    (number < '0' ? '-' : '') + formattedNumber + ' ' + suffixes[suffixIndex]
  );
}

function formatDate(dateString) {
  const inputDate = new Date(dateString);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = days[inputDate.getDay()];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;
  return formattedDate;
}

function formatCustomDate(inputDate) {
  var date = new Date(inputDate);

  // Array of month names
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get month and day
  var month = monthNames[date.getMonth()];
  var day = date.getDate();

  // Create formatted date string in "MMM DD" format
  var formattedDate = month + ' ' + (day < 10 ? '0' + day : day);

  return formattedDate;
}

function shortenHex(address) {
  return `${address && address.substr(0, 6)}...${address.substr(-4)}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shortenToken(token) {
  return truncateString(token, 14, '');
}

function shortenTokenSymbol(token) {
  return truncateString(token, 5, '');
}

function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function convertToUTC(timestamp, hour) {
  const date = new Date(timestamp);

  // Get UTC date components
  const utcYear = date.getUTCFullYear();
  const utcMonth = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  const utcDay = ('0' + date.getUTCDate()).slice(-2);
  const utcHours = ('0' + date.getUTCHours()).slice(-2);
  const utcMinutes = ('0' + date.getUTCMinutes()).slice(-2);
  const utcSeconds = ('0' + date.getUTCSeconds()).slice(-2);

  // Array of month abbreviations
  const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = Number(utcMonth) - 1;
  // Format the date as required (Jul-25-2022 16:25:37)
  let formattedDate =
    monthAbbreviations[monthIndex] +
    '-' +
    utcDay +
    '-' +
    utcYear +
    ' ' +
    utcHours +
    ':' +
    utcMinutes +
    ':' +
    utcSeconds;

  if (hour) {
    // Convert hours to 12-hour format
    let hour12 = parseInt(utcHours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    hour12 = hour12 % 12 || 12;

    // Add AM/PM to the formatted date (Jul-25-2022 4:25:37 PM)
    formattedDate =
      monthAbbreviations[monthIndex] +
      '-' +
      utcDay +
      '-' +
      utcYear +
      ' ' +
      hour12 +
      ':' +
      utcMinutes +
      ':' +
      utcSeconds +
      ' ' +
      ampm;
  }

  return formattedDate;
}

function getTimeAgoString(timestamp) {
  const currentUTC = Date.now();
  const date = new Date(timestamp);
  const seconds = Math.floor((currentUTC - date.getTime()) / 1000);

  const intervals = {
    year: seconds / (60 * 60 * 24 * 365),
    month: seconds / (60 * 60 * 24 * 30),
    week: seconds / (60 * 60 * 24 * 7),
    day: seconds / (60 * 60 * 24),
    hour: seconds / (60 * 60),
    minute: seconds / 60,
  };

  if (intervals.year >= 1) {
    return (
      Math.floor(intervals.year) +
      ' year' +
      (Math.floor(intervals.year) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.month >= 1) {
    return (
      Math.floor(intervals.month) +
      ' month' +
      (Math.floor(intervals.month) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.day >= 1) {
    return (
      Math.floor(intervals.day) +
      ' day' +
      (Math.floor(intervals.day) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.hour >= 1) {
    return (
      Math.floor(intervals.hour) +
      ' hour' +
      (Math.floor(intervals.hour) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.minute >= 1) {
    return (
      Math.floor(intervals.minute) +
      ' minute' +
      (Math.floor(intervals.minute) > 1 ? 's' : '') +
      ' ago'
    );
  } else {
    return 'a few seconds ago';
  }
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatTimestampToString(timestamp) {
  const date = new Date(timestamp);

  // Format the date to 'YYYY-MM-DD HH:mm:ss' format
  const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];

  return formattedDate;
}

function convertToMetricPrefix(numberStr) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let result = new Big(numberStr);
  let count = 0;

  while (result.abs().gte('1e3') && count < prefixes.length - 1) {
    result = result.div(1e3);
    count++;
  }

  // Check if the value is an integer or has more than two digits before the decimal point
  if (result.abs().lt(1e2) && result.toFixed(2) !== result.toFixed(0)) {
    result = result.toFixed(2);
  } else {
    result = result.toFixed(0);
  }

  return result.toString() + ' ' + prefixes[count];
}

function formatNumber(value) {
  let bigValue = new Big(value);
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (bigValue.gte(10000) && suffixIndex < suffixes.length - 1) {
    bigValue = bigValue.div(1000);
    suffixIndex++;
  }

  const formattedValue = bigValue.toFixed(1).replace(/\.0+$/, '');
  return `${formattedValue} ${suffixes[suffixIndex]}`;
}

function gasFee(gas, price) {
  const near = yoctoToNear(Big(gas).mul(Big(price)).toString(), true);

  return `${near}`;
}

function currency(number) {
  let absNumber = new Big(number).abs();

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let suffixIndex = 0;

  while (absNumber.gte(1000) && suffixIndex < suffixes.length - 1) {
    absNumber = absNumber.div(1000); // Divide using big.js's div method
    suffixIndex++;
  }

  const formattedNumber = absNumber.toFixed(2); // Format with 2 decimal places

  return (
    (number < '0' ? '-' : '') + formattedNumber + ' ' + suffixes[suffixIndex]
  );
}

function formatDate(dateString) {
  const inputDate = new Date(dateString);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = days[inputDate.getDay()];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;
  return formattedDate;
}

function formatCustomDate(inputDate) {
  var date = new Date(inputDate);

  // Array of month names
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get month and day
  var month = monthNames[date.getMonth()];
  var day = date.getDate();

  // Create formatted date string in "MMM DD" format
  var formattedDate = month + ' ' + (day < 10 ? '0' + day : day);

  return formattedDate;
}

function shortenHex(address) {
  return `${address && address.substr(0, 6)}...${address.substr(-4)}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shortenToken(token) {
  return truncateString(token, 14, '');
}

function shortenTokenSymbol(token) {
  return truncateString(token, 5, '');
}

function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}

function dollarNonCentFormat(number) {
  const bigNumber = new Big(number).toFixed(0);

  // Extract integer part and format with commas
  const integerPart = bigNumber.toString();
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedInteger;
}

function weight(number) {
  let sizeInBytes = new Big(number);

  if (sizeInBytes.lt(0)) {
    throw new Error('Invalid input. Please provide a non-negative number.');
  }

  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let suffixIndex = 0;

  while (sizeInBytes.gte(1000) && suffixIndex < suffixes.length - 1) {
    sizeInBytes = sizeInBytes.div(1000); // Assign the result back to sizeInBytes
    suffixIndex++;
  }

  const formattedSize = sizeInBytes.toFixed(2) + ' ' + suffixes[suffixIndex];

  return formattedSize;
}

function convertToUTC(timestamp, hour) {
  const date = new Date(timestamp);

  // Get UTC date components
  const utcYear = date.getUTCFullYear();
  const utcMonth = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  const utcDay = ('0' + date.getUTCDate()).slice(-2);
  const utcHours = ('0' + date.getUTCHours()).slice(-2);
  const utcMinutes = ('0' + date.getUTCMinutes()).slice(-2);
  const utcSeconds = ('0' + date.getUTCSeconds()).slice(-2);

  // Array of month abbreviations
  const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = Number(utcMonth) - 1;
  // Format the date as required (Jul-25-2022 16:25:37)
  let formattedDate =
    monthAbbreviations[monthIndex] +
    '-' +
    utcDay +
    '-' +
    utcYear +
    ' ' +
    utcHours +
    ':' +
    utcMinutes +
    ':' +
    utcSeconds;

  if (hour) {
    // Convert hours to 12-hour format
    let hour12 = parseInt(utcHours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    hour12 = hour12 % 12 || 12;

    // Add AM/PM to the formatted date (Jul-25-2022 4:25:37 PM)
    formattedDate =
      monthAbbreviations[monthIndex] +
      '-' +
      utcDay +
      '-' +
      utcYear +
      ' ' +
      hour12 +
      ':' +
      utcMinutes +
      ':' +
      utcSeconds +
      ' ' +
      ampm;
  }

  return formattedDate;
}

function getTimeAgoString(timestamp) {
  const currentUTC = Date.now();
  const date = new Date(timestamp);
  const seconds = Math.floor((currentUTC - date.getTime()) / 1000);

  const intervals = {
    year: seconds / (60 * 60 * 24 * 365),
    month: seconds / (60 * 60 * 24 * 30),
    week: seconds / (60 * 60 * 24 * 7),
    day: seconds / (60 * 60 * 24),
    hour: seconds / (60 * 60),
    minute: seconds / 60,
  };

  if (intervals.year >= 1) {
    return (
      Math.floor(intervals.year) +
      ' year' +
      (Math.floor(intervals.year) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.month >= 1) {
    return (
      Math.floor(intervals.month) +
      ' month' +
      (Math.floor(intervals.month) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.day >= 1) {
    return (
      Math.floor(intervals.day) +
      ' day' +
      (Math.floor(intervals.day) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.hour >= 1) {
    return (
      Math.floor(intervals.hour) +
      ' hour' +
      (Math.floor(intervals.hour) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.minute >= 1) {
    return (
      Math.floor(intervals.minute) +
      ' minute' +
      (Math.floor(intervals.minute) > 1 ? 's' : '') +
      ' ago'
    );
  } else {
    return 'a few seconds ago';
  }
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatTimestampToString(timestamp) {
  const date = new Date(timestamp);

  // Format the date to 'YYYY-MM-DD HH:mm:ss' format
  const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];

  return formattedDate;
}

function convertToMetricPrefix(numberStr) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let result = new Big(numberStr);
  let count = 0;

  while (result.abs().gte('1e3') && count < prefixes.length - 1) {
    result = result.div(1e3);
    count++;
  }

  // Check if the value is an integer or has more than two digits before the decimal point
  if (result.abs().lt(1e2) && result.toFixed(2) !== result.toFixed(0)) {
    result = result.toFixed(2);
  } else {
    result = result.toFixed(0);
  }

  return result.toString() + ' ' + prefixes[count];
}

function formatNumber(value) {
  let bigValue = new Big(value);
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (bigValue.gte(10000) && suffixIndex < suffixes.length - 1) {
    bigValue = bigValue.div(1000);
    suffixIndex++;
  }

  const formattedValue = bigValue.toFixed(1).replace(/\.0+$/, '');
  return `${formattedValue} ${suffixes[suffixIndex]}`;
}

function gasFee(gas, price) {
  const near = yoctoToNear(Big(gas).mul(Big(price)).toString(), true);

  return `${near}`;
}

function currency(number) {
  let absNumber = new Big(number).abs();

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let suffixIndex = 0;

  while (absNumber.gte(1000) && suffixIndex < suffixes.length - 1) {
    absNumber = absNumber.div(1000); // Divide using big.js's div method
    suffixIndex++;
  }

  const formattedNumber = absNumber.toFixed(2); // Format with 2 decimal places

  return (
    (number < '0' ? '-' : '') + formattedNumber + ' ' + suffixes[suffixIndex]
  );
}

function formatDate(dateString) {
  const inputDate = new Date(dateString);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = days[inputDate.getDay()];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;
  return formattedDate;
}

function formatCustomDate(inputDate) {
  var date = new Date(inputDate);

  // Array of month names
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get month and day
  var month = monthNames[date.getMonth()];
  var day = date.getDate();

  // Create formatted date string in "MMM DD" format
  var formattedDate = month + ' ' + (day < 10 ? '0' + day : day);

  return formattedDate;
}

function shortenHex(address) {
  return `${address && address.substr(0, 6)}...${address.substr(-4)}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shortenToken(token) {
  return truncateString(token, 14, '');
}

function shortenTokenSymbol(token) {
  return truncateString(token, 5, '');
}

function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function getTimeAgoString(timestamp) {
  const currentUTC = Date.now();
  const date = new Date(timestamp);
  const seconds = Math.floor((currentUTC - date.getTime()) / 1000);

  const intervals = {
    year: seconds / (60 * 60 * 24 * 365),
    month: seconds / (60 * 60 * 24 * 30),
    week: seconds / (60 * 60 * 24 * 7),
    day: seconds / (60 * 60 * 24),
    hour: seconds / (60 * 60),
    minute: seconds / 60,
  };

  if (intervals.year >= 1) {
    return (
      Math.floor(intervals.year) +
      ' year' +
      (Math.floor(intervals.year) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.month >= 1) {
    return (
      Math.floor(intervals.month) +
      ' month' +
      (Math.floor(intervals.month) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.day >= 1) {
    return (
      Math.floor(intervals.day) +
      ' day' +
      (Math.floor(intervals.day) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.hour >= 1) {
    return (
      Math.floor(intervals.hour) +
      ' hour' +
      (Math.floor(intervals.hour) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.minute >= 1) {
    return (
      Math.floor(intervals.minute) +
      ' minute' +
      (Math.floor(intervals.minute) > 1 ? 's' : '') +
      ' ago'
    );
  } else {
    return 'a few seconds ago';
  }
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatTimestampToString(timestamp) {
  const date = new Date(timestamp);

  // Format the date to 'YYYY-MM-DD HH:mm:ss' format
  const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];

  return formattedDate;
}

function convertToMetricPrefix(numberStr) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let result = new Big(numberStr);
  let count = 0;

  while (result.abs().gte('1e3') && count < prefixes.length - 1) {
    result = result.div(1e3);
    count++;
  }

  // Check if the value is an integer or has more than two digits before the decimal point
  if (result.abs().lt(1e2) && result.toFixed(2) !== result.toFixed(0)) {
    result = result.toFixed(2);
  } else {
    result = result.toFixed(0);
  }

  return result.toString() + ' ' + prefixes[count];
}

function formatNumber(value) {
  let bigValue = new Big(value);
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (bigValue.gte(10000) && suffixIndex < suffixes.length - 1) {
    bigValue = bigValue.div(1000);
    suffixIndex++;
  }

  const formattedValue = bigValue.toFixed(1).replace(/\.0+$/, '');
  return `${formattedValue} ${suffixes[suffixIndex]}`;
}

function gasFee(gas, price) {
  const near = yoctoToNear(Big(gas).mul(Big(price)).toString(), true);

  return `${near}`;
}

function currency(number) {
  let absNumber = new Big(number).abs();

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let suffixIndex = 0;

  while (absNumber.gte(1000) && suffixIndex < suffixes.length - 1) {
    absNumber = absNumber.div(1000); // Divide using big.js's div method
    suffixIndex++;
  }

  const formattedNumber = absNumber.toFixed(2); // Format with 2 decimal places

  return (
    (number < '0' ? '-' : '') + formattedNumber + ' ' + suffixes[suffixIndex]
  );
}

function formatDate(dateString) {
  const inputDate = new Date(dateString);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = days[inputDate.getDay()];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;
  return formattedDate;
}

function formatCustomDate(inputDate) {
  var date = new Date(inputDate);

  // Array of month names
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get month and day
  var month = monthNames[date.getMonth()];
  var day = date.getDate();

  // Create formatted date string in "MMM DD" format
  var formattedDate = month + ' ' + (day < 10 ? '0' + day : day);

  return formattedDate;
}

function shortenHex(address) {
  return `${address && address.substr(0, 6)}...${address.substr(-4)}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shortenToken(token) {
  return truncateString(token, 14, '');
}

function shortenTokenSymbol(token) {
  return truncateString(token, 5, '');
}

function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}

function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}

function dollarNonCentFormat(number) {
  const bigNumber = new Big(number).toFixed(0);

  // Extract integer part and format with commas
  const integerPart = bigNumber.toString();
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return formattedInteger;
}

function weight(number) {
  let sizeInBytes = new Big(number);

  if (sizeInBytes.lt(0)) {
    throw new Error('Invalid input. Please provide a non-negative number.');
  }

  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let suffixIndex = 0;

  while (sizeInBytes.gte(1000) && suffixIndex < suffixes.length - 1) {
    sizeInBytes = sizeInBytes.div(1000); // Assign the result back to sizeInBytes
    suffixIndex++;
  }

  const formattedSize = sizeInBytes.toFixed(2) + ' ' + suffixes[suffixIndex];

  return formattedSize;
}

function convertToUTC(timestamp, hour) {
  const date = new Date(timestamp);

  // Get UTC date components
  const utcYear = date.getUTCFullYear();
  const utcMonth = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Adding 1 because months are zero-based
  const utcDay = ('0' + date.getUTCDate()).slice(-2);
  const utcHours = ('0' + date.getUTCHours()).slice(-2);
  const utcMinutes = ('0' + date.getUTCMinutes()).slice(-2);
  const utcSeconds = ('0' + date.getUTCSeconds()).slice(-2);

  // Array of month abbreviations
  const monthAbbreviations = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = Number(utcMonth) - 1;
  // Format the date as required (Jul-25-2022 16:25:37)
  let formattedDate =
    monthAbbreviations[monthIndex] +
    '-' +
    utcDay +
    '-' +
    utcYear +
    ' ' +
    utcHours +
    ':' +
    utcMinutes +
    ':' +
    utcSeconds;

  if (hour) {
    // Convert hours to 12-hour format
    let hour12 = parseInt(utcHours);
    const ampm = hour12 >= 12 ? 'PM' : 'AM';
    hour12 = hour12 % 12 || 12;

    // Add AM/PM to the formatted date (Jul-25-2022 4:25:37 PM)
    formattedDate =
      monthAbbreviations[monthIndex] +
      '-' +
      utcDay +
      '-' +
      utcYear +
      ' ' +
      hour12 +
      ':' +
      utcMinutes +
      ':' +
      utcSeconds +
      ' ' +
      ampm;
  }

  return formattedDate;
}

function getTimeAgoString(timestamp) {
  const currentUTC = Date.now();
  const date = new Date(timestamp);
  const seconds = Math.floor((currentUTC - date.getTime()) / 1000);

  const intervals = {
    year: seconds / (60 * 60 * 24 * 365),
    month: seconds / (60 * 60 * 24 * 30),
    week: seconds / (60 * 60 * 24 * 7),
    day: seconds / (60 * 60 * 24),
    hour: seconds / (60 * 60),
    minute: seconds / 60,
  };

  if (intervals.year >= 1) {
    return (
      Math.floor(intervals.year) +
      ' year' +
      (Math.floor(intervals.year) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.month >= 1) {
    return (
      Math.floor(intervals.month) +
      ' month' +
      (Math.floor(intervals.month) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.day >= 1) {
    return (
      Math.floor(intervals.day) +
      ' day' +
      (Math.floor(intervals.day) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.hour >= 1) {
    return (
      Math.floor(intervals.hour) +
      ' hour' +
      (Math.floor(intervals.hour) > 1 ? 's' : '') +
      ' ago'
    );
  } else if (intervals.minute >= 1) {
    return (
      Math.floor(intervals.minute) +
      ' minute' +
      (Math.floor(intervals.minute) > 1 ? 's' : '') +
      ' ago'
    );
  } else {
    return 'a few seconds ago';
  }
}

function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatTimestampToString(timestamp) {
  const date = new Date(timestamp);

  // Format the date to 'YYYY-MM-DD HH:mm:ss' format
  const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];

  return formattedDate;
}

function convertToMetricPrefix(numberStr) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let result = new Big(numberStr);
  let count = 0;

  while (result.abs().gte('1e3') && count < prefixes.length - 1) {
    result = result.div(1e3);
    count++;
  }

  // Check if the value is an integer or has more than two digits before the decimal point
  if (result.abs().lt(1e2) && result.toFixed(2) !== result.toFixed(0)) {
    result = result.toFixed(2);
  } else {
    result = result.toFixed(0);
  }

  return result.toString() + ' ' + prefixes[count];
}

function formatNumber(value) {
  let bigValue = new Big(value);
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (bigValue.gte(10000) && suffixIndex < suffixes.length - 1) {
    bigValue = bigValue.div(1000);
    suffixIndex++;
  }

  const formattedValue = bigValue.toFixed(1).replace(/\.0+$/, '');
  return `${formattedValue} ${suffixes[suffixIndex]}`;
}

function gasFee(gas, price) {
  const near = yoctoToNear(Big(gas).mul(Big(price)).toString(), true);

  return `${near}`;
}

function currency(number) {
  let absNumber = new Big(number).abs();

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let suffixIndex = 0;

  while (absNumber.gte(1000) && suffixIndex < suffixes.length - 1) {
    absNumber = absNumber.div(1000); // Divide using big.js's div method
    suffixIndex++;
  }

  const formattedNumber = absNumber.toFixed(2); // Format with 2 decimal places

  return (
    (number < '0' ? '-' : '') + formattedNumber + ' ' + suffixes[suffixIndex]
  );
}

function formatDate(dateString) {
  const inputDate = new Date(dateString);

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayOfWeek = days[inputDate.getDay()];
  const month = months[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = dayOfWeek + ', ' + month + ' ' + day + ', ' + year;
  return formattedDate;
}

function formatCustomDate(inputDate) {
  var date = new Date(inputDate);

  // Array of month names
  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Get month and day
  var month = monthNames[date.getMonth()];
  var day = date.getDate();

  // Create formatted date string in "MMM DD" format
  var formattedDate = month + ' ' + (day < 10 ? '0' + day : day);

  return formattedDate;
}

function shortenHex(address) {
  return `${address && address.substr(0, 6)}...${address.substr(-4)}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function shortenToken(token) {
  return truncateString(token, 14, '');
}

function shortenTokenSymbol(token) {
  return truncateString(token, 5, '');
}

function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function shortenToken(token) {
  return truncateString(token, 14, '');
}

function shortenTokenSymbol(token) {
  return truncateString(token, 5, '');
}

function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function shortenTokenSymbol(token) {
  return truncateString(token, 5, '');
}

function gasPercentage(gasUsed, gasAttached) {
  if (!gasAttached) return 'N/A';

  const formattedNumber = (Big(gasUsed).div(Big(gasAttached)) * 100).toFixed(2);
  return `${formattedNumber}%`;
}

function serialNumber(index, page, perPage) {
  return index + 1 + (page - 1) * perPage;
}

function capitalizeWords(str) {
  const words = str.split('_');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1),
  );
  const result = capitalizedWords.join(' ');
  return result;
}

function toSnakeCase(str) {
  return str
    .replace(/[A-Z]/g, (match) => '_' + match.toLowerCase())
    .replace(/^_/, '');
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
/* END_INCLUDE: "includes/formats.jsx" */
/* INCLUDE COMPONENT: "includes/icons/ArrowDown.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const ArrowDown = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowDown.jsx" */
/* INCLUDE COMPONENT: "includes/icons/ArrowUp.jsx" */
const ArrowUp = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowUp.jsx" */
/* INCLUDE COMPONENT: "includes/icons/FaRight.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const FaRight = (props) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 192 512"
      className={props.className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaRight.jsx" */
/* INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */
/**
 * @interface Props
 * @param {string} [src] - The URL string pointing to the image source.
 * @param {string} [alt] - The alternate text description for the image.
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 * @param {string} [appUrl] - The URL of the application.
 */










const TokenImage = ({
  appUrl,
  src,
  alt,
  className,
  onLoad,
  onSetSrc,
}) => {
  const placeholder = `${appUrl}images/tokenplaceholder.svg`;

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    if (onSetSrc) {
      onSetSrc(placeholder);
    }
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};/* END_INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */
/* INCLUDE: "includes/libs.jsx" */
function fiatValue(big, price) {
  const value = Big(big).mul(Big(price));
  const stringValue = value.toFixed(6); // Set the desired maximum fraction digits

  const [integerPart, fractionalPart] = stringValue.split('.');

  // Format integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  // Combine formatted integer and fractional parts
  const formattedNumber = fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

function nanoToMilli(nano) {
  return Big(nano).div(Big(10).pow(6)).round().toNumber();
}

function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function nanoToMilli(nano) {
  return Big(nano).div(Big(10).pow(6)).round().toNumber();
}

function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}

function fiatValue(big, price) {
  const value = Big(big).mul(Big(price));
  const stringValue = value.toFixed(6); // Set the desired maximum fraction digits

  const [integerPart, fractionalPart] = stringValue.split('.');

  // Format integer part with commas
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  // Combine formatted integer and fractional parts
  const formattedNumber = fractionalPart
    ? `${formattedIntegerPart}.${fractionalPart}`
    : formattedIntegerPart;

  return formattedNumber;
}

function nanoToMilli(nano) {
  return Big(nano).div(Big(10).pow(6)).round().toNumber();
}

function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.mainnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://beta.rpc.testnet.near.org/',
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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */
/* INCLUDE: "includes/near.jsx" */
function tokenAmount(amount, decimal, format) {
  if (amount === undefined || amount === null) return 'N/A';

  const near = Big(amount).div(Big(10).pow(decimal));

  const formattedValue = format
    ? near.toFixed(8).replace(/\.?0+$/, '')
    : near.toFixed(Big(decimal, 10)).replace(/\.?0+$/, '');

  return formattedValue;
}

function tokenPercentage(
  supply,
  amount,
  decimal,
) {
  const nearAmount = Big(amount).div(Big(10).pow(decimal));
  const nearSupply = Big(supply);

  return nearAmount.div(nearSupply).mul(Big(100)).toFixed(2);
}
function price(amount, decimal, price) {
  const nearAmount = Big(amount).div(Big(10).pow(decimal));
  return dollarFormat(nearAmount.mul(Big(price || 0)).toString());
}
function mapRpcActionToAction(action) {
  if (action === 'CreateAccount') {
    return {
      action_kind: 'CreateAccount',
      args: {},
    };
  }

  if (typeof action === 'object') {
    const kind = action && Object.keys(action)[0];

    return {
      action_kind: kind,
      args: action[kind],
    };
  }

  return null;
}

function valueFromObj(obj) {
  const keys = obj && Object.keys(obj);

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
}

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

function collectNestedReceiptWithOutcomeOld(
  idOrHash,
  parsedMap,
) {
  const parsedElement = parsedMap.get(idOrHash);
  if (!parsedElement) {
    return { id: idOrHash };
  }
  const { receiptIds, ...restOutcome } = parsedElement.outcome;
  return {
    ...parsedElement,
    outcome: {
      ...restOutcome,
      nestedReceipts: receiptIds.map((id) =>
        collectNestedReceiptWithOutcomeOld(id, parsedMap),
      ),
    },
  };
}

function parseReceipt(
  receipt,
  outcome,
  transaction,
) {
  if (!receipt) {
    return {
      id: outcome.id,
      predecessorId: transaction.signer_id,
      receiverId: transaction.receiver_id,
      actions: transaction.actions.map(mapRpcActionToAction1),
    };
  }
  return {
    id: receipt.receipt_id,
    predecessorId: receipt.predecessor_id,
    receiverId: receipt.receiver_id,
    actions:
      'Action' in receipt.receipt
        ? receipt.receipt.Action.actions.map(mapRpcActionToAction1)
        : [],
  };
}

function mapNonDelegateRpcActionToAction(
  rpcAction,
) {
  if (rpcAction === 'CreateAccount') {
    return {
      kind: 'createAccount',
      args: {},
    };
  }
  if ('DeployContract' in rpcAction) {
    return {
      kind: 'deployContract',
      args: rpcAction.DeployContract,
    };
  }
  if ('FunctionCall' in rpcAction) {
    return {
      kind: 'functionCall',
      args: {
        methodName: rpcAction.FunctionCall.method_name,
        args: rpcAction.FunctionCall.args,
        deposit: rpcAction.FunctionCall.deposit,
        gas: rpcAction.FunctionCall.gas,
      },
    };
  }
  if ('Transfer' in rpcAction) {
    return {
      kind: 'transfer',
      args: rpcAction.Transfer,
    };
  }
  if ('Stake' in rpcAction) {
    return {
      kind: 'stake',
      args: {
        publicKey: rpcAction.Stake.public_key,
        stake: rpcAction.Stake.stake,
      },
    };
  }
  if ('AddKey' in rpcAction) {
    return {
      kind: 'addKey',
      args: {
        publicKey: rpcAction.AddKey.public_key,
        accessKey: {
          nonce: rpcAction.AddKey.access_key.nonce,
          permission:
            rpcAction.AddKey.access_key.permission === 'FullAccess'
              ? {
                  type: 'fullAccess',
                }
              : {
                  type: 'functionCall',
                  contractId:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .receiver_id,
                  methodNames:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .method_names,
                },
        },
      },
    };
  }
  if ('DeleteKey' in rpcAction) {
    return {
      kind: 'deleteKey',
      args: {
        publicKey: rpcAction.DeleteKey.public_key,
      },
    };
  }
  return {
    kind: 'deleteAccount',
    args: {
      beneficiaryId: rpcAction.DeleteAccount.beneficiary_id,
    },
  };
}
function mapRpcInvalidAccessKeyError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };

  if (error === 'DepositWithFunctionCall') {
    return {
      type: 'depositWithFunctionCall',
    };
  }
  if (error === 'RequiresFullAccess') {
    return {
      type: 'requiresFullAccess',
    };
  }
  if ('AccessKeyNotFound' in error) {
    const { account_id, public_key } = error.AccessKeyNotFound;
    return {
      type: 'accessKeyNotFound',
      accountId: account_id,
      publicKey: public_key,
    };
  }
  if ('ReceiverMismatch' in error) {
    const { ak_receiver, tx_receiver } = error.ReceiverMismatch;
    return {
      type: 'receiverMismatch',
      akReceiver: ak_receiver,
      transactionReceiver: tx_receiver,
    };
  }
  if ('MethodNameMismatch' in error) {
    const { method_name } = error.MethodNameMismatch;
    return {
      type: 'methodNameMismatch',
      methodName: method_name,
    };
  }
  if ('NotEnoughAllowance' in error) {
    const { account_id, allowance, cost, public_key } =
      error.NotEnoughAllowance;
    return {
      type: 'notEnoughAllowance',
      accountId: account_id,
      allowance: allowance,
      cost: cost,
      publicKey: public_key,
    };
  }

  return UNKNOWN_ERROR;
}

function mapRpcCompilationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CodeDoesNotExist' in error) {
    return {
      type: 'codeDoesNotExist',
      accountId: error.CodeDoesNotExist.account_id,
    };
  }
  if ('PrepareError' in error) {
    return {
      type: 'prepareError',
    };
  }
  if ('WasmerCompileError' in error) {
    return {
      type: 'wasmerCompileError',
      msg: error.WasmerCompileError.msg,
    };
  }
  if ('UnsupportedCompiler' in error) {
    return {
      type: 'unsupportedCompiler',
      msg: error.UnsupportedCompiler.msg,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcFunctionCallError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CompilationError' in error) {
    return {
      type: 'compilationError',
      error: mapRpcCompilationError(error.CompilationError),
    };
  }
  if ('LinkError' in error) {
    return {
      type: 'linkError',
      msg: error.LinkError.msg,
    };
  }
  if ('MethodResolveError' in error) {
    return {
      type: 'methodResolveError',
    };
  }
  if ('WasmTrap' in error) {
    return {
      type: 'wasmTrap',
    };
  }
  if ('WasmUnknownError' in error) {
    return {
      type: 'wasmUnknownError',
    };
  }
  if ('HostError' in error) {
    return {
      type: 'hostError',
    };
  }
  if ('_EVMError' in error) {
    return {
      type: 'evmError',
    };
  }
  if ('ExecutionError' in error) {
    return {
      type: 'executionError',
      error: error.ExecutionError,
    };
  }
  return UNKNOWN_ERROR;
}
function mapRpcNewReceiptValidationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidPredecessorId' in error) {
    return {
      type: 'invalidPredecessorId',
      accountId: error.InvalidPredecessorId.account_id,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      accountId: error.InvalidReceiverId.account_id,
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      accountId: error.InvalidSignerId.account_id,
    };
  }
  if ('InvalidDataReceiverId' in error) {
    return {
      type: 'invalidDataReceiverId',
      accountId: error.InvalidDataReceiverId.account_id,
    };
  }
  if ('ReturnedValueLengthExceeded' in error) {
    return {
      type: 'returnedValueLengthExceeded',
      length: error.ReturnedValueLengthExceeded.length,
      limit: error.ReturnedValueLengthExceeded.limit,
    };
  }
  if ('NumberInputDataDependenciesExceeded' in error) {
    return {
      type: 'numberInputDataDependenciesExceeded',
      numberOfInputDataDependencies:
        error.NumberInputDataDependenciesExceeded
          .number_of_input_data_dependencies,
      limit: error.NumberInputDataDependenciesExceeded.limit,
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptActionError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  const { kind } = error;
  if (kind === 'DelegateActionExpired') {
    return {
      type: 'delegateActionExpired',
    };
  }
  if (kind === 'DelegateActionInvalidSignature') {
    return {
      type: 'delegateActionInvalidSignature',
    };
  }
  if ('DelegateActionSenderDoesNotMatchTxReceiver' in kind) {
    return {
      type: 'delegateActionSenderDoesNotMatchTxReceiver',
      receiverId: kind.DelegateActionSenderDoesNotMatchTxReceiver.receiver_id,
      senderId: kind.DelegateActionSenderDoesNotMatchTxReceiver.sender_id,
    };
  }
  if ('DelegateActionAccessKeyError' in kind) {
    return {
      type: 'delegateActionAccessKeyError',
      error: mapRpcInvalidAccessKeyError(kind.DelegateActionAccessKeyError),
    };
  }
  if ('DelegateActionInvalidNonce' in kind) {
    return {
      type: 'delegateActionInvalidNonce',
      akNonce: kind.DelegateActionInvalidNonce.ak_nonce,
      delegateNonce: kind.DelegateActionInvalidNonce.delegate_nonce,
    };
  }
  if ('DelegateActionNonceTooLarge' in kind) {
    return {
      type: 'delegateActionNonceTooLarge',
      delegateNonce: kind.DelegateActionNonceTooLarge.delegate_nonce,
      upperBound: kind.DelegateActionNonceTooLarge.upper_bound,
    };
  }
  if ('AccountAlreadyExists' in kind) {
    return {
      type: 'accountAlreadyExists',
      accountId: kind.AccountAlreadyExists.account_id,
    };
  }
  if ('AccountDoesNotExist' in kind) {
    return {
      type: 'accountDoesNotExist',
      accountId: kind.AccountDoesNotExist.account_id,
    };
  }
  if ('CreateAccountOnlyByRegistrar' in kind) {
    return {
      type: 'createAccountOnlyByRegistrar',
      accountId: kind.CreateAccountOnlyByRegistrar.account_id,
      registrarAccountId:
        kind.CreateAccountOnlyByRegistrar.registrar_account_id,
      predecessorId: kind.CreateAccountOnlyByRegistrar.predecessor_id,
    };
  }
  if ('CreateAccountNotAllowed' in kind) {
    return {
      type: 'createAccountNotAllowed',
      accountId: kind.CreateAccountNotAllowed.account_id,
      predecessorId: kind.CreateAccountNotAllowed.predecessor_id,
    };
  }
  if ('ActorNoPermission' in kind) {
    return {
      type: 'actorNoPermission',
      accountId: kind.ActorNoPermission.account_id,
      actorId: kind.ActorNoPermission.actor_id,
    };
  }
  if ('DeleteKeyDoesNotExist' in kind) {
    return {
      type: 'deleteKeyDoesNotExist',
      accountId: kind.DeleteKeyDoesNotExist.account_id,
      publicKey: kind.DeleteKeyDoesNotExist.public_key,
    };
  }
  if ('AddKeyAlreadyExists' in kind) {
    return {
      type: 'addKeyAlreadyExists',
      accountId: kind.AddKeyAlreadyExists.account_id,
      publicKey: kind.AddKeyAlreadyExists.public_key,
    };
  }
  if ('DeleteAccountStaking' in kind) {
    return {
      type: 'deleteAccountStaking',
      accountId: kind.DeleteAccountStaking.account_id,
    };
  }
  if ('LackBalanceForState' in kind) {
    return {
      type: 'lackBalanceForState',
      accountId: kind.LackBalanceForState.account_id,
      amount: kind.LackBalanceForState.amount,
    };
  }
  if ('TriesToUnstake' in kind) {
    return {
      type: 'triesToUnstake',
      accountId: kind.TriesToUnstake.account_id,
    };
  }
  if ('TriesToStake' in kind) {
    return {
      type: 'triesToStake',
      accountId: kind.TriesToStake.account_id,
      stake: kind.TriesToStake.stake,
      locked: kind.TriesToStake.locked,
      balance: kind.TriesToStake.balance,
    };
  }
  if ('InsufficientStake' in kind) {
    return {
      type: 'insufficientStake',
      accountId: kind.InsufficientStake.account_id,
      stake: kind.InsufficientStake.stake,
      minimumStake: kind.InsufficientStake.minimum_stake,
    };
  }
  if ('FunctionCallError' in kind) {
    return {
      type: 'functionCallError',
      error: mapRpcFunctionCallError(kind.FunctionCallError),
    };
  }
  if ('NewReceiptValidationError' in kind) {
    return {
      type: 'newReceiptValidationError',
      error: mapRpcNewReceiptValidationError(kind.NewReceiptValidationError),
    };
  }
  if ('OnlyImplicitAccountCreationAllowed' in kind) {
    return {
      type: 'onlyImplicitAccountCreationAllowed',
      accountId: kind.OnlyImplicitAccountCreationAllowed.account_id,
    };
  }
  if ('DeleteAccountWithLargeState' in kind) {
    return {
      type: 'deleteAccountWithLargeState',
      accountId: kind.DeleteAccountWithLargeState.account_id,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptInvalidTxError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidAccessKeyError' in error) {
    return {
      type: 'invalidAccessKeyError',
      error: mapRpcInvalidAccessKeyError(error.InvalidAccessKeyError),
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      signerId: error.InvalidSignerId.signer_id,
    };
  }
  if ('SignerDoesNotExist' in error) {
    return {
      type: 'signerDoesNotExist',
      signerId: error.SignerDoesNotExist.signer_id,
    };
  }
  if ('InvalidNonce' in error) {
    return {
      type: 'invalidNonce',
      transactionNonce: error.InvalidNonce.tx_nonce,
      akNonce: error.InvalidNonce.ak_nonce,
    };
  }
  if ('NonceTooLarge' in error) {
    return {
      type: 'nonceTooLarge',
      transactionNonce: error.NonceTooLarge.tx_nonce,
      upperBound: error.NonceTooLarge.upper_bound,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      receiverId: error.InvalidReceiverId.receiver_id,
    };
  }
  if ('InvalidSignature' in error) {
    return {
      type: 'invalidSignature',
    };
  }
  if ('NotEnoughBalance' in error) {
    return {
      type: 'notEnoughBalance',
      signerId: error.NotEnoughBalance.signer_id,
      balance: error.NotEnoughBalance.balance,
      cost: error.NotEnoughBalance.cost,
    };
  }
  if ('LackBalanceForState' in error) {
    return {
      type: 'lackBalanceForState',
      signerId: error.LackBalanceForState.signer_id,
      amount: error.LackBalanceForState.amount,
    };
  }
  if ('CostOverflow' in error) {
    return {
      type: 'costOverflow',
    };
  }
  if ('InvalidChain' in error) {
    return {
      type: 'invalidChain',
    };
  }
  if ('Expired' in error) {
    return {
      type: 'expired',
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  if ('TransactionSizeExceeded' in error) {
    return {
      type: 'transactionSizeExceeded',
      size: error.TransactionSizeExceeded.size,
      limit: error.TransactionSizeExceeded.limit,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptError(error) {
  let UNKNOWN_ERROR = { type: 'unknown' };
  if ('ActionError' in error) {
    return {
      type: 'action',
      error: mapRpcReceiptActionError(error.ActionError),
    };
  }
  if ('InvalidTxError' in error) {
    return {
      type: 'transaction',
      error: mapRpcReceiptInvalidTxError(error.InvalidTxError),
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptStatus(status) {
  if ('SuccessValue' in status) {
    return { type: 'successValue', value: status.SuccessValue };
  }
  if ('SuccessReceiptId' in status) {
    return { type: 'successReceiptId', receiptId: status.SuccessReceiptId };
  }
  if ('Failure' in status) {
    return { type: 'failure', error: mapRpcReceiptError(status.Failure) };
  }
  return { type: 'unknown' };
}

function mapRpcActionToAction1(rpcAction) {
  if (typeof rpcAction === 'object' && 'Delegate' in rpcAction) {
    return {
      kind: 'delegateAction',
      args: {
        actions: rpcAction.Delegate.delegate_action.actions.map(
          (subaction, index) => ({
            ...mapNonDelegateRpcActionToAction(subaction),
            delegateIndex: index,
          }),
        ),
        receiverId: rpcAction.Delegate.delegate_action.receiver_id,
        senderId: rpcAction.Delegate.delegate_action.sender_id,
      },
    };
  }
  return mapNonDelegateRpcActionToAction(rpcAction);
}

function parseOutcomeOld(outcome) {
  return {
    blockHash: outcome.block_hash,
    tokensBurnt: outcome.outcome.tokens_burnt,
    gasBurnt: outcome.outcome.gas_burnt,
    status: mapRpcReceiptStatus(outcome.outcome.status),
    logs: outcome.outcome.logs,
    receiptIds: outcome.outcome.receipt_ids,
  };
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
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

function collectNestedReceiptWithOutcomeOld(
  idOrHash,
  parsedMap,
) {
  const parsedElement = parsedMap.get(idOrHash);
  if (!parsedElement) {
    return { id: idOrHash };
  }
  const { receiptIds, ...restOutcome } = parsedElement.outcome;
  return {
    ...parsedElement,
    outcome: {
      ...restOutcome,
      nestedReceipts: receiptIds.map((id) =>
        collectNestedReceiptWithOutcomeOld(id, parsedMap),
      ),
    },
  };
}

function parseReceipt(
  receipt,
  outcome,
  transaction,
) {
  if (!receipt) {
    return {
      id: outcome.id,
      predecessorId: transaction.signer_id,
      receiverId: transaction.receiver_id,
      actions: transaction.actions.map(mapRpcActionToAction1),
    };
  }
  return {
    id: receipt.receipt_id,
    predecessorId: receipt.predecessor_id,
    receiverId: receipt.receiver_id,
    actions:
      'Action' in receipt.receipt
        ? receipt.receipt.Action.actions.map(mapRpcActionToAction1)
        : [],
  };
}

function mapNonDelegateRpcActionToAction(
  rpcAction,
) {
  if (rpcAction === 'CreateAccount') {
    return {
      kind: 'createAccount',
      args: {},
    };
  }
  if ('DeployContract' in rpcAction) {
    return {
      kind: 'deployContract',
      args: rpcAction.DeployContract,
    };
  }
  if ('FunctionCall' in rpcAction) {
    return {
      kind: 'functionCall',
      args: {
        methodName: rpcAction.FunctionCall.method_name,
        args: rpcAction.FunctionCall.args,
        deposit: rpcAction.FunctionCall.deposit,
        gas: rpcAction.FunctionCall.gas,
      },
    };
  }
  if ('Transfer' in rpcAction) {
    return {
      kind: 'transfer',
      args: rpcAction.Transfer,
    };
  }
  if ('Stake' in rpcAction) {
    return {
      kind: 'stake',
      args: {
        publicKey: rpcAction.Stake.public_key,
        stake: rpcAction.Stake.stake,
      },
    };
  }
  if ('AddKey' in rpcAction) {
    return {
      kind: 'addKey',
      args: {
        publicKey: rpcAction.AddKey.public_key,
        accessKey: {
          nonce: rpcAction.AddKey.access_key.nonce,
          permission:
            rpcAction.AddKey.access_key.permission === 'FullAccess'
              ? {
                  type: 'fullAccess',
                }
              : {
                  type: 'functionCall',
                  contractId:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .receiver_id,
                  methodNames:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .method_names,
                },
        },
      },
    };
  }
  if ('DeleteKey' in rpcAction) {
    return {
      kind: 'deleteKey',
      args: {
        publicKey: rpcAction.DeleteKey.public_key,
      },
    };
  }
  return {
    kind: 'deleteAccount',
    args: {
      beneficiaryId: rpcAction.DeleteAccount.beneficiary_id,
    },
  };
}
function mapRpcInvalidAccessKeyError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };

  if (error === 'DepositWithFunctionCall') {
    return {
      type: 'depositWithFunctionCall',
    };
  }
  if (error === 'RequiresFullAccess') {
    return {
      type: 'requiresFullAccess',
    };
  }
  if ('AccessKeyNotFound' in error) {
    const { account_id, public_key } = error.AccessKeyNotFound;
    return {
      type: 'accessKeyNotFound',
      accountId: account_id,
      publicKey: public_key,
    };
  }
  if ('ReceiverMismatch' in error) {
    const { ak_receiver, tx_receiver } = error.ReceiverMismatch;
    return {
      type: 'receiverMismatch',
      akReceiver: ak_receiver,
      transactionReceiver: tx_receiver,
    };
  }
  if ('MethodNameMismatch' in error) {
    const { method_name } = error.MethodNameMismatch;
    return {
      type: 'methodNameMismatch',
      methodName: method_name,
    };
  }
  if ('NotEnoughAllowance' in error) {
    const { account_id, allowance, cost, public_key } =
      error.NotEnoughAllowance;
    return {
      type: 'notEnoughAllowance',
      accountId: account_id,
      allowance: allowance,
      cost: cost,
      publicKey: public_key,
    };
  }

  return UNKNOWN_ERROR;
}

function mapRpcCompilationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CodeDoesNotExist' in error) {
    return {
      type: 'codeDoesNotExist',
      accountId: error.CodeDoesNotExist.account_id,
    };
  }
  if ('PrepareError' in error) {
    return {
      type: 'prepareError',
    };
  }
  if ('WasmerCompileError' in error) {
    return {
      type: 'wasmerCompileError',
      msg: error.WasmerCompileError.msg,
    };
  }
  if ('UnsupportedCompiler' in error) {
    return {
      type: 'unsupportedCompiler',
      msg: error.UnsupportedCompiler.msg,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcFunctionCallError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CompilationError' in error) {
    return {
      type: 'compilationError',
      error: mapRpcCompilationError(error.CompilationError),
    };
  }
  if ('LinkError' in error) {
    return {
      type: 'linkError',
      msg: error.LinkError.msg,
    };
  }
  if ('MethodResolveError' in error) {
    return {
      type: 'methodResolveError',
    };
  }
  if ('WasmTrap' in error) {
    return {
      type: 'wasmTrap',
    };
  }
  if ('WasmUnknownError' in error) {
    return {
      type: 'wasmUnknownError',
    };
  }
  if ('HostError' in error) {
    return {
      type: 'hostError',
    };
  }
  if ('_EVMError' in error) {
    return {
      type: 'evmError',
    };
  }
  if ('ExecutionError' in error) {
    return {
      type: 'executionError',
      error: error.ExecutionError,
    };
  }
  return UNKNOWN_ERROR;
}
function mapRpcNewReceiptValidationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidPredecessorId' in error) {
    return {
      type: 'invalidPredecessorId',
      accountId: error.InvalidPredecessorId.account_id,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      accountId: error.InvalidReceiverId.account_id,
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      accountId: error.InvalidSignerId.account_id,
    };
  }
  if ('InvalidDataReceiverId' in error) {
    return {
      type: 'invalidDataReceiverId',
      accountId: error.InvalidDataReceiverId.account_id,
    };
  }
  if ('ReturnedValueLengthExceeded' in error) {
    return {
      type: 'returnedValueLengthExceeded',
      length: error.ReturnedValueLengthExceeded.length,
      limit: error.ReturnedValueLengthExceeded.limit,
    };
  }
  if ('NumberInputDataDependenciesExceeded' in error) {
    return {
      type: 'numberInputDataDependenciesExceeded',
      numberOfInputDataDependencies:
        error.NumberInputDataDependenciesExceeded
          .number_of_input_data_dependencies,
      limit: error.NumberInputDataDependenciesExceeded.limit,
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptActionError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  const { kind } = error;
  if (kind === 'DelegateActionExpired') {
    return {
      type: 'delegateActionExpired',
    };
  }
  if (kind === 'DelegateActionInvalidSignature') {
    return {
      type: 'delegateActionInvalidSignature',
    };
  }
  if ('DelegateActionSenderDoesNotMatchTxReceiver' in kind) {
    return {
      type: 'delegateActionSenderDoesNotMatchTxReceiver',
      receiverId: kind.DelegateActionSenderDoesNotMatchTxReceiver.receiver_id,
      senderId: kind.DelegateActionSenderDoesNotMatchTxReceiver.sender_id,
    };
  }
  if ('DelegateActionAccessKeyError' in kind) {
    return {
      type: 'delegateActionAccessKeyError',
      error: mapRpcInvalidAccessKeyError(kind.DelegateActionAccessKeyError),
    };
  }
  if ('DelegateActionInvalidNonce' in kind) {
    return {
      type: 'delegateActionInvalidNonce',
      akNonce: kind.DelegateActionInvalidNonce.ak_nonce,
      delegateNonce: kind.DelegateActionInvalidNonce.delegate_nonce,
    };
  }
  if ('DelegateActionNonceTooLarge' in kind) {
    return {
      type: 'delegateActionNonceTooLarge',
      delegateNonce: kind.DelegateActionNonceTooLarge.delegate_nonce,
      upperBound: kind.DelegateActionNonceTooLarge.upper_bound,
    };
  }
  if ('AccountAlreadyExists' in kind) {
    return {
      type: 'accountAlreadyExists',
      accountId: kind.AccountAlreadyExists.account_id,
    };
  }
  if ('AccountDoesNotExist' in kind) {
    return {
      type: 'accountDoesNotExist',
      accountId: kind.AccountDoesNotExist.account_id,
    };
  }
  if ('CreateAccountOnlyByRegistrar' in kind) {
    return {
      type: 'createAccountOnlyByRegistrar',
      accountId: kind.CreateAccountOnlyByRegistrar.account_id,
      registrarAccountId:
        kind.CreateAccountOnlyByRegistrar.registrar_account_id,
      predecessorId: kind.CreateAccountOnlyByRegistrar.predecessor_id,
    };
  }
  if ('CreateAccountNotAllowed' in kind) {
    return {
      type: 'createAccountNotAllowed',
      accountId: kind.CreateAccountNotAllowed.account_id,
      predecessorId: kind.CreateAccountNotAllowed.predecessor_id,
    };
  }
  if ('ActorNoPermission' in kind) {
    return {
      type: 'actorNoPermission',
      accountId: kind.ActorNoPermission.account_id,
      actorId: kind.ActorNoPermission.actor_id,
    };
  }
  if ('DeleteKeyDoesNotExist' in kind) {
    return {
      type: 'deleteKeyDoesNotExist',
      accountId: kind.DeleteKeyDoesNotExist.account_id,
      publicKey: kind.DeleteKeyDoesNotExist.public_key,
    };
  }
  if ('AddKeyAlreadyExists' in kind) {
    return {
      type: 'addKeyAlreadyExists',
      accountId: kind.AddKeyAlreadyExists.account_id,
      publicKey: kind.AddKeyAlreadyExists.public_key,
    };
  }
  if ('DeleteAccountStaking' in kind) {
    return {
      type: 'deleteAccountStaking',
      accountId: kind.DeleteAccountStaking.account_id,
    };
  }
  if ('LackBalanceForState' in kind) {
    return {
      type: 'lackBalanceForState',
      accountId: kind.LackBalanceForState.account_id,
      amount: kind.LackBalanceForState.amount,
    };
  }
  if ('TriesToUnstake' in kind) {
    return {
      type: 'triesToUnstake',
      accountId: kind.TriesToUnstake.account_id,
    };
  }
  if ('TriesToStake' in kind) {
    return {
      type: 'triesToStake',
      accountId: kind.TriesToStake.account_id,
      stake: kind.TriesToStake.stake,
      locked: kind.TriesToStake.locked,
      balance: kind.TriesToStake.balance,
    };
  }
  if ('InsufficientStake' in kind) {
    return {
      type: 'insufficientStake',
      accountId: kind.InsufficientStake.account_id,
      stake: kind.InsufficientStake.stake,
      minimumStake: kind.InsufficientStake.minimum_stake,
    };
  }
  if ('FunctionCallError' in kind) {
    return {
      type: 'functionCallError',
      error: mapRpcFunctionCallError(kind.FunctionCallError),
    };
  }
  if ('NewReceiptValidationError' in kind) {
    return {
      type: 'newReceiptValidationError',
      error: mapRpcNewReceiptValidationError(kind.NewReceiptValidationError),
    };
  }
  if ('OnlyImplicitAccountCreationAllowed' in kind) {
    return {
      type: 'onlyImplicitAccountCreationAllowed',
      accountId: kind.OnlyImplicitAccountCreationAllowed.account_id,
    };
  }
  if ('DeleteAccountWithLargeState' in kind) {
    return {
      type: 'deleteAccountWithLargeState',
      accountId: kind.DeleteAccountWithLargeState.account_id,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptInvalidTxError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidAccessKeyError' in error) {
    return {
      type: 'invalidAccessKeyError',
      error: mapRpcInvalidAccessKeyError(error.InvalidAccessKeyError),
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      signerId: error.InvalidSignerId.signer_id,
    };
  }
  if ('SignerDoesNotExist' in error) {
    return {
      type: 'signerDoesNotExist',
      signerId: error.SignerDoesNotExist.signer_id,
    };
  }
  if ('InvalidNonce' in error) {
    return {
      type: 'invalidNonce',
      transactionNonce: error.InvalidNonce.tx_nonce,
      akNonce: error.InvalidNonce.ak_nonce,
    };
  }
  if ('NonceTooLarge' in error) {
    return {
      type: 'nonceTooLarge',
      transactionNonce: error.NonceTooLarge.tx_nonce,
      upperBound: error.NonceTooLarge.upper_bound,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      receiverId: error.InvalidReceiverId.receiver_id,
    };
  }
  if ('InvalidSignature' in error) {
    return {
      type: 'invalidSignature',
    };
  }
  if ('NotEnoughBalance' in error) {
    return {
      type: 'notEnoughBalance',
      signerId: error.NotEnoughBalance.signer_id,
      balance: error.NotEnoughBalance.balance,
      cost: error.NotEnoughBalance.cost,
    };
  }
  if ('LackBalanceForState' in error) {
    return {
      type: 'lackBalanceForState',
      signerId: error.LackBalanceForState.signer_id,
      amount: error.LackBalanceForState.amount,
    };
  }
  if ('CostOverflow' in error) {
    return {
      type: 'costOverflow',
    };
  }
  if ('InvalidChain' in error) {
    return {
      type: 'invalidChain',
    };
  }
  if ('Expired' in error) {
    return {
      type: 'expired',
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  if ('TransactionSizeExceeded' in error) {
    return {
      type: 'transactionSizeExceeded',
      size: error.TransactionSizeExceeded.size,
      limit: error.TransactionSizeExceeded.limit,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptError(error) {
  let UNKNOWN_ERROR = { type: 'unknown' };
  if ('ActionError' in error) {
    return {
      type: 'action',
      error: mapRpcReceiptActionError(error.ActionError),
    };
  }
  if ('InvalidTxError' in error) {
    return {
      type: 'transaction',
      error: mapRpcReceiptInvalidTxError(error.InvalidTxError),
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptStatus(status) {
  if ('SuccessValue' in status) {
    return { type: 'successValue', value: status.SuccessValue };
  }
  if ('SuccessReceiptId' in status) {
    return { type: 'successReceiptId', receiptId: status.SuccessReceiptId };
  }
  if ('Failure' in status) {
    return { type: 'failure', error: mapRpcReceiptError(status.Failure) };
  }
  return { type: 'unknown' };
}

function mapRpcActionToAction1(rpcAction) {
  if (typeof rpcAction === 'object' && 'Delegate' in rpcAction) {
    return {
      kind: 'delegateAction',
      args: {
        actions: rpcAction.Delegate.delegate_action.actions.map(
          (subaction, index) => ({
            ...mapNonDelegateRpcActionToAction(subaction),
            delegateIndex: index,
          }),
        ),
        receiverId: rpcAction.Delegate.delegate_action.receiver_id,
        senderId: rpcAction.Delegate.delegate_action.sender_id,
      },
    };
  }
  return mapNonDelegateRpcActionToAction(rpcAction);
}

function parseOutcomeOld(outcome) {
  return {
    blockHash: outcome.block_hash,
    tokensBurnt: outcome.outcome.tokens_burnt,
    gasBurnt: outcome.outcome.gas_burnt,
    status: mapRpcReceiptStatus(outcome.outcome.status),
    logs: outcome.outcome.logs,
    receiptIds: outcome.outcome.receipt_ids,
  };
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function txnErrorMessage(txn) {
  const kind = txn?.status?.Failure?.ActionError?.kind;

  if (typeof kind === 'string') return kind;
  if (typeof kind === 'object') {
    return valueFromObj(kind);
  }

  return null;
}

function collectNestedReceiptWithOutcomeOld(
  idOrHash,
  parsedMap,
) {
  const parsedElement = parsedMap.get(idOrHash);
  if (!parsedElement) {
    return { id: idOrHash };
  }
  const { receiptIds, ...restOutcome } = parsedElement.outcome;
  return {
    ...parsedElement,
    outcome: {
      ...restOutcome,
      nestedReceipts: receiptIds.map((id) =>
        collectNestedReceiptWithOutcomeOld(id, parsedMap),
      ),
    },
  };
}

function parseReceipt(
  receipt,
  outcome,
  transaction,
) {
  if (!receipt) {
    return {
      id: outcome.id,
      predecessorId: transaction.signer_id,
      receiverId: transaction.receiver_id,
      actions: transaction.actions.map(mapRpcActionToAction1),
    };
  }
  return {
    id: receipt.receipt_id,
    predecessorId: receipt.predecessor_id,
    receiverId: receipt.receiver_id,
    actions:
      'Action' in receipt.receipt
        ? receipt.receipt.Action.actions.map(mapRpcActionToAction1)
        : [],
  };
}

function mapNonDelegateRpcActionToAction(
  rpcAction,
) {
  if (rpcAction === 'CreateAccount') {
    return {
      kind: 'createAccount',
      args: {},
    };
  }
  if ('DeployContract' in rpcAction) {
    return {
      kind: 'deployContract',
      args: rpcAction.DeployContract,
    };
  }
  if ('FunctionCall' in rpcAction) {
    return {
      kind: 'functionCall',
      args: {
        methodName: rpcAction.FunctionCall.method_name,
        args: rpcAction.FunctionCall.args,
        deposit: rpcAction.FunctionCall.deposit,
        gas: rpcAction.FunctionCall.gas,
      },
    };
  }
  if ('Transfer' in rpcAction) {
    return {
      kind: 'transfer',
      args: rpcAction.Transfer,
    };
  }
  if ('Stake' in rpcAction) {
    return {
      kind: 'stake',
      args: {
        publicKey: rpcAction.Stake.public_key,
        stake: rpcAction.Stake.stake,
      },
    };
  }
  if ('AddKey' in rpcAction) {
    return {
      kind: 'addKey',
      args: {
        publicKey: rpcAction.AddKey.public_key,
        accessKey: {
          nonce: rpcAction.AddKey.access_key.nonce,
          permission:
            rpcAction.AddKey.access_key.permission === 'FullAccess'
              ? {
                  type: 'fullAccess',
                }
              : {
                  type: 'functionCall',
                  contractId:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .receiver_id,
                  methodNames:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .method_names,
                },
        },
      },
    };
  }
  if ('DeleteKey' in rpcAction) {
    return {
      kind: 'deleteKey',
      args: {
        publicKey: rpcAction.DeleteKey.public_key,
      },
    };
  }
  return {
    kind: 'deleteAccount',
    args: {
      beneficiaryId: rpcAction.DeleteAccount.beneficiary_id,
    },
  };
}
function mapRpcInvalidAccessKeyError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };

  if (error === 'DepositWithFunctionCall') {
    return {
      type: 'depositWithFunctionCall',
    };
  }
  if (error === 'RequiresFullAccess') {
    return {
      type: 'requiresFullAccess',
    };
  }
  if ('AccessKeyNotFound' in error) {
    const { account_id, public_key } = error.AccessKeyNotFound;
    return {
      type: 'accessKeyNotFound',
      accountId: account_id,
      publicKey: public_key,
    };
  }
  if ('ReceiverMismatch' in error) {
    const { ak_receiver, tx_receiver } = error.ReceiverMismatch;
    return {
      type: 'receiverMismatch',
      akReceiver: ak_receiver,
      transactionReceiver: tx_receiver,
    };
  }
  if ('MethodNameMismatch' in error) {
    const { method_name } = error.MethodNameMismatch;
    return {
      type: 'methodNameMismatch',
      methodName: method_name,
    };
  }
  if ('NotEnoughAllowance' in error) {
    const { account_id, allowance, cost, public_key } =
      error.NotEnoughAllowance;
    return {
      type: 'notEnoughAllowance',
      accountId: account_id,
      allowance: allowance,
      cost: cost,
      publicKey: public_key,
    };
  }

  return UNKNOWN_ERROR;
}

function mapRpcCompilationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CodeDoesNotExist' in error) {
    return {
      type: 'codeDoesNotExist',
      accountId: error.CodeDoesNotExist.account_id,
    };
  }
  if ('PrepareError' in error) {
    return {
      type: 'prepareError',
    };
  }
  if ('WasmerCompileError' in error) {
    return {
      type: 'wasmerCompileError',
      msg: error.WasmerCompileError.msg,
    };
  }
  if ('UnsupportedCompiler' in error) {
    return {
      type: 'unsupportedCompiler',
      msg: error.UnsupportedCompiler.msg,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcFunctionCallError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CompilationError' in error) {
    return {
      type: 'compilationError',
      error: mapRpcCompilationError(error.CompilationError),
    };
  }
  if ('LinkError' in error) {
    return {
      type: 'linkError',
      msg: error.LinkError.msg,
    };
  }
  if ('MethodResolveError' in error) {
    return {
      type: 'methodResolveError',
    };
  }
  if ('WasmTrap' in error) {
    return {
      type: 'wasmTrap',
    };
  }
  if ('WasmUnknownError' in error) {
    return {
      type: 'wasmUnknownError',
    };
  }
  if ('HostError' in error) {
    return {
      type: 'hostError',
    };
  }
  if ('_EVMError' in error) {
    return {
      type: 'evmError',
    };
  }
  if ('ExecutionError' in error) {
    return {
      type: 'executionError',
      error: error.ExecutionError,
    };
  }
  return UNKNOWN_ERROR;
}
function mapRpcNewReceiptValidationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidPredecessorId' in error) {
    return {
      type: 'invalidPredecessorId',
      accountId: error.InvalidPredecessorId.account_id,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      accountId: error.InvalidReceiverId.account_id,
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      accountId: error.InvalidSignerId.account_id,
    };
  }
  if ('InvalidDataReceiverId' in error) {
    return {
      type: 'invalidDataReceiverId',
      accountId: error.InvalidDataReceiverId.account_id,
    };
  }
  if ('ReturnedValueLengthExceeded' in error) {
    return {
      type: 'returnedValueLengthExceeded',
      length: error.ReturnedValueLengthExceeded.length,
      limit: error.ReturnedValueLengthExceeded.limit,
    };
  }
  if ('NumberInputDataDependenciesExceeded' in error) {
    return {
      type: 'numberInputDataDependenciesExceeded',
      numberOfInputDataDependencies:
        error.NumberInputDataDependenciesExceeded
          .number_of_input_data_dependencies,
      limit: error.NumberInputDataDependenciesExceeded.limit,
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptActionError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  const { kind } = error;
  if (kind === 'DelegateActionExpired') {
    return {
      type: 'delegateActionExpired',
    };
  }
  if (kind === 'DelegateActionInvalidSignature') {
    return {
      type: 'delegateActionInvalidSignature',
    };
  }
  if ('DelegateActionSenderDoesNotMatchTxReceiver' in kind) {
    return {
      type: 'delegateActionSenderDoesNotMatchTxReceiver',
      receiverId: kind.DelegateActionSenderDoesNotMatchTxReceiver.receiver_id,
      senderId: kind.DelegateActionSenderDoesNotMatchTxReceiver.sender_id,
    };
  }
  if ('DelegateActionAccessKeyError' in kind) {
    return {
      type: 'delegateActionAccessKeyError',
      error: mapRpcInvalidAccessKeyError(kind.DelegateActionAccessKeyError),
    };
  }
  if ('DelegateActionInvalidNonce' in kind) {
    return {
      type: 'delegateActionInvalidNonce',
      akNonce: kind.DelegateActionInvalidNonce.ak_nonce,
      delegateNonce: kind.DelegateActionInvalidNonce.delegate_nonce,
    };
  }
  if ('DelegateActionNonceTooLarge' in kind) {
    return {
      type: 'delegateActionNonceTooLarge',
      delegateNonce: kind.DelegateActionNonceTooLarge.delegate_nonce,
      upperBound: kind.DelegateActionNonceTooLarge.upper_bound,
    };
  }
  if ('AccountAlreadyExists' in kind) {
    return {
      type: 'accountAlreadyExists',
      accountId: kind.AccountAlreadyExists.account_id,
    };
  }
  if ('AccountDoesNotExist' in kind) {
    return {
      type: 'accountDoesNotExist',
      accountId: kind.AccountDoesNotExist.account_id,
    };
  }
  if ('CreateAccountOnlyByRegistrar' in kind) {
    return {
      type: 'createAccountOnlyByRegistrar',
      accountId: kind.CreateAccountOnlyByRegistrar.account_id,
      registrarAccountId:
        kind.CreateAccountOnlyByRegistrar.registrar_account_id,
      predecessorId: kind.CreateAccountOnlyByRegistrar.predecessor_id,
    };
  }
  if ('CreateAccountNotAllowed' in kind) {
    return {
      type: 'createAccountNotAllowed',
      accountId: kind.CreateAccountNotAllowed.account_id,
      predecessorId: kind.CreateAccountNotAllowed.predecessor_id,
    };
  }
  if ('ActorNoPermission' in kind) {
    return {
      type: 'actorNoPermission',
      accountId: kind.ActorNoPermission.account_id,
      actorId: kind.ActorNoPermission.actor_id,
    };
  }
  if ('DeleteKeyDoesNotExist' in kind) {
    return {
      type: 'deleteKeyDoesNotExist',
      accountId: kind.DeleteKeyDoesNotExist.account_id,
      publicKey: kind.DeleteKeyDoesNotExist.public_key,
    };
  }
  if ('AddKeyAlreadyExists' in kind) {
    return {
      type: 'addKeyAlreadyExists',
      accountId: kind.AddKeyAlreadyExists.account_id,
      publicKey: kind.AddKeyAlreadyExists.public_key,
    };
  }
  if ('DeleteAccountStaking' in kind) {
    return {
      type: 'deleteAccountStaking',
      accountId: kind.DeleteAccountStaking.account_id,
    };
  }
  if ('LackBalanceForState' in kind) {
    return {
      type: 'lackBalanceForState',
      accountId: kind.LackBalanceForState.account_id,
      amount: kind.LackBalanceForState.amount,
    };
  }
  if ('TriesToUnstake' in kind) {
    return {
      type: 'triesToUnstake',
      accountId: kind.TriesToUnstake.account_id,
    };
  }
  if ('TriesToStake' in kind) {
    return {
      type: 'triesToStake',
      accountId: kind.TriesToStake.account_id,
      stake: kind.TriesToStake.stake,
      locked: kind.TriesToStake.locked,
      balance: kind.TriesToStake.balance,
    };
  }
  if ('InsufficientStake' in kind) {
    return {
      type: 'insufficientStake',
      accountId: kind.InsufficientStake.account_id,
      stake: kind.InsufficientStake.stake,
      minimumStake: kind.InsufficientStake.minimum_stake,
    };
  }
  if ('FunctionCallError' in kind) {
    return {
      type: 'functionCallError',
      error: mapRpcFunctionCallError(kind.FunctionCallError),
    };
  }
  if ('NewReceiptValidationError' in kind) {
    return {
      type: 'newReceiptValidationError',
      error: mapRpcNewReceiptValidationError(kind.NewReceiptValidationError),
    };
  }
  if ('OnlyImplicitAccountCreationAllowed' in kind) {
    return {
      type: 'onlyImplicitAccountCreationAllowed',
      accountId: kind.OnlyImplicitAccountCreationAllowed.account_id,
    };
  }
  if ('DeleteAccountWithLargeState' in kind) {
    return {
      type: 'deleteAccountWithLargeState',
      accountId: kind.DeleteAccountWithLargeState.account_id,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptInvalidTxError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidAccessKeyError' in error) {
    return {
      type: 'invalidAccessKeyError',
      error: mapRpcInvalidAccessKeyError(error.InvalidAccessKeyError),
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      signerId: error.InvalidSignerId.signer_id,
    };
  }
  if ('SignerDoesNotExist' in error) {
    return {
      type: 'signerDoesNotExist',
      signerId: error.SignerDoesNotExist.signer_id,
    };
  }
  if ('InvalidNonce' in error) {
    return {
      type: 'invalidNonce',
      transactionNonce: error.InvalidNonce.tx_nonce,
      akNonce: error.InvalidNonce.ak_nonce,
    };
  }
  if ('NonceTooLarge' in error) {
    return {
      type: 'nonceTooLarge',
      transactionNonce: error.NonceTooLarge.tx_nonce,
      upperBound: error.NonceTooLarge.upper_bound,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      receiverId: error.InvalidReceiverId.receiver_id,
    };
  }
  if ('InvalidSignature' in error) {
    return {
      type: 'invalidSignature',
    };
  }
  if ('NotEnoughBalance' in error) {
    return {
      type: 'notEnoughBalance',
      signerId: error.NotEnoughBalance.signer_id,
      balance: error.NotEnoughBalance.balance,
      cost: error.NotEnoughBalance.cost,
    };
  }
  if ('LackBalanceForState' in error) {
    return {
      type: 'lackBalanceForState',
      signerId: error.LackBalanceForState.signer_id,
      amount: error.LackBalanceForState.amount,
    };
  }
  if ('CostOverflow' in error) {
    return {
      type: 'costOverflow',
    };
  }
  if ('InvalidChain' in error) {
    return {
      type: 'invalidChain',
    };
  }
  if ('Expired' in error) {
    return {
      type: 'expired',
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  if ('TransactionSizeExceeded' in error) {
    return {
      type: 'transactionSizeExceeded',
      size: error.TransactionSizeExceeded.size,
      limit: error.TransactionSizeExceeded.limit,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptError(error) {
  let UNKNOWN_ERROR = { type: 'unknown' };
  if ('ActionError' in error) {
    return {
      type: 'action',
      error: mapRpcReceiptActionError(error.ActionError),
    };
  }
  if ('InvalidTxError' in error) {
    return {
      type: 'transaction',
      error: mapRpcReceiptInvalidTxError(error.InvalidTxError),
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptStatus(status) {
  if ('SuccessValue' in status) {
    return { type: 'successValue', value: status.SuccessValue };
  }
  if ('SuccessReceiptId' in status) {
    return { type: 'successReceiptId', receiptId: status.SuccessReceiptId };
  }
  if ('Failure' in status) {
    return { type: 'failure', error: mapRpcReceiptError(status.Failure) };
  }
  return { type: 'unknown' };
}

function mapRpcActionToAction1(rpcAction) {
  if (typeof rpcAction === 'object' && 'Delegate' in rpcAction) {
    return {
      kind: 'delegateAction',
      args: {
        actions: rpcAction.Delegate.delegate_action.actions.map(
          (subaction, index) => ({
            ...mapNonDelegateRpcActionToAction(subaction),
            delegateIndex: index,
          }),
        ),
        receiverId: rpcAction.Delegate.delegate_action.receiver_id,
        senderId: rpcAction.Delegate.delegate_action.sender_id,
      },
    };
  }
  return mapNonDelegateRpcActionToAction(rpcAction);
}

function parseOutcomeOld(outcome) {
  return {
    blockHash: outcome.block_hash,
    tokensBurnt: outcome.outcome.tokens_burnt,
    gasBurnt: outcome.outcome.gas_burnt,
    status: mapRpcReceiptStatus(outcome.outcome.status),
    logs: outcome.outcome.logs,
    receiptIds: outcome.outcome.receipt_ids,
  };
}
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

function collectNestedReceiptWithOutcomeOld(
  idOrHash,
  parsedMap,
) {
  const parsedElement = parsedMap.get(idOrHash);
  if (!parsedElement) {
    return { id: idOrHash };
  }
  const { receiptIds, ...restOutcome } = parsedElement.outcome;
  return {
    ...parsedElement,
    outcome: {
      ...restOutcome,
      nestedReceipts: receiptIds.map((id) =>
        collectNestedReceiptWithOutcomeOld(id, parsedMap),
      ),
    },
  };
}

function parseReceipt(
  receipt,
  outcome,
  transaction,
) {
  if (!receipt) {
    return {
      id: outcome.id,
      predecessorId: transaction.signer_id,
      receiverId: transaction.receiver_id,
      actions: transaction.actions.map(mapRpcActionToAction1),
    };
  }
  return {
    id: receipt.receipt_id,
    predecessorId: receipt.predecessor_id,
    receiverId: receipt.receiver_id,
    actions:
      'Action' in receipt.receipt
        ? receipt.receipt.Action.actions.map(mapRpcActionToAction1)
        : [],
  };
}

function mapNonDelegateRpcActionToAction(
  rpcAction,
) {
  if (rpcAction === 'CreateAccount') {
    return {
      kind: 'createAccount',
      args: {},
    };
  }
  if ('DeployContract' in rpcAction) {
    return {
      kind: 'deployContract',
      args: rpcAction.DeployContract,
    };
  }
  if ('FunctionCall' in rpcAction) {
    return {
      kind: 'functionCall',
      args: {
        methodName: rpcAction.FunctionCall.method_name,
        args: rpcAction.FunctionCall.args,
        deposit: rpcAction.FunctionCall.deposit,
        gas: rpcAction.FunctionCall.gas,
      },
    };
  }
  if ('Transfer' in rpcAction) {
    return {
      kind: 'transfer',
      args: rpcAction.Transfer,
    };
  }
  if ('Stake' in rpcAction) {
    return {
      kind: 'stake',
      args: {
        publicKey: rpcAction.Stake.public_key,
        stake: rpcAction.Stake.stake,
      },
    };
  }
  if ('AddKey' in rpcAction) {
    return {
      kind: 'addKey',
      args: {
        publicKey: rpcAction.AddKey.public_key,
        accessKey: {
          nonce: rpcAction.AddKey.access_key.nonce,
          permission:
            rpcAction.AddKey.access_key.permission === 'FullAccess'
              ? {
                  type: 'fullAccess',
                }
              : {
                  type: 'functionCall',
                  contractId:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .receiver_id,
                  methodNames:
                    rpcAction.AddKey.access_key.permission.FunctionCall
                      .method_names,
                },
        },
      },
    };
  }
  if ('DeleteKey' in rpcAction) {
    return {
      kind: 'deleteKey',
      args: {
        publicKey: rpcAction.DeleteKey.public_key,
      },
    };
  }
  return {
    kind: 'deleteAccount',
    args: {
      beneficiaryId: rpcAction.DeleteAccount.beneficiary_id,
    },
  };
}
function mapRpcInvalidAccessKeyError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };

  if (error === 'DepositWithFunctionCall') {
    return {
      type: 'depositWithFunctionCall',
    };
  }
  if (error === 'RequiresFullAccess') {
    return {
      type: 'requiresFullAccess',
    };
  }
  if ('AccessKeyNotFound' in error) {
    const { account_id, public_key } = error.AccessKeyNotFound;
    return {
      type: 'accessKeyNotFound',
      accountId: account_id,
      publicKey: public_key,
    };
  }
  if ('ReceiverMismatch' in error) {
    const { ak_receiver, tx_receiver } = error.ReceiverMismatch;
    return {
      type: 'receiverMismatch',
      akReceiver: ak_receiver,
      transactionReceiver: tx_receiver,
    };
  }
  if ('MethodNameMismatch' in error) {
    const { method_name } = error.MethodNameMismatch;
    return {
      type: 'methodNameMismatch',
      methodName: method_name,
    };
  }
  if ('NotEnoughAllowance' in error) {
    const { account_id, allowance, cost, public_key } =
      error.NotEnoughAllowance;
    return {
      type: 'notEnoughAllowance',
      accountId: account_id,
      allowance: allowance,
      cost: cost,
      publicKey: public_key,
    };
  }

  return UNKNOWN_ERROR;
}

function mapRpcCompilationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CodeDoesNotExist' in error) {
    return {
      type: 'codeDoesNotExist',
      accountId: error.CodeDoesNotExist.account_id,
    };
  }
  if ('PrepareError' in error) {
    return {
      type: 'prepareError',
    };
  }
  if ('WasmerCompileError' in error) {
    return {
      type: 'wasmerCompileError',
      msg: error.WasmerCompileError.msg,
    };
  }
  if ('UnsupportedCompiler' in error) {
    return {
      type: 'unsupportedCompiler',
      msg: error.UnsupportedCompiler.msg,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcFunctionCallError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('CompilationError' in error) {
    return {
      type: 'compilationError',
      error: mapRpcCompilationError(error.CompilationError),
    };
  }
  if ('LinkError' in error) {
    return {
      type: 'linkError',
      msg: error.LinkError.msg,
    };
  }
  if ('MethodResolveError' in error) {
    return {
      type: 'methodResolveError',
    };
  }
  if ('WasmTrap' in error) {
    return {
      type: 'wasmTrap',
    };
  }
  if ('WasmUnknownError' in error) {
    return {
      type: 'wasmUnknownError',
    };
  }
  if ('HostError' in error) {
    return {
      type: 'hostError',
    };
  }
  if ('_EVMError' in error) {
    return {
      type: 'evmError',
    };
  }
  if ('ExecutionError' in error) {
    return {
      type: 'executionError',
      error: error.ExecutionError,
    };
  }
  return UNKNOWN_ERROR;
}
function mapRpcNewReceiptValidationError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidPredecessorId' in error) {
    return {
      type: 'invalidPredecessorId',
      accountId: error.InvalidPredecessorId.account_id,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      accountId: error.InvalidReceiverId.account_id,
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      accountId: error.InvalidSignerId.account_id,
    };
  }
  if ('InvalidDataReceiverId' in error) {
    return {
      type: 'invalidDataReceiverId',
      accountId: error.InvalidDataReceiverId.account_id,
    };
  }
  if ('ReturnedValueLengthExceeded' in error) {
    return {
      type: 'returnedValueLengthExceeded',
      length: error.ReturnedValueLengthExceeded.length,
      limit: error.ReturnedValueLengthExceeded.limit,
    };
  }
  if ('NumberInputDataDependenciesExceeded' in error) {
    return {
      type: 'numberInputDataDependenciesExceeded',
      numberOfInputDataDependencies:
        error.NumberInputDataDependenciesExceeded
          .number_of_input_data_dependencies,
      limit: error.NumberInputDataDependenciesExceeded.limit,
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptActionError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  const { kind } = error;
  if (kind === 'DelegateActionExpired') {
    return {
      type: 'delegateActionExpired',
    };
  }
  if (kind === 'DelegateActionInvalidSignature') {
    return {
      type: 'delegateActionInvalidSignature',
    };
  }
  if ('DelegateActionSenderDoesNotMatchTxReceiver' in kind) {
    return {
      type: 'delegateActionSenderDoesNotMatchTxReceiver',
      receiverId: kind.DelegateActionSenderDoesNotMatchTxReceiver.receiver_id,
      senderId: kind.DelegateActionSenderDoesNotMatchTxReceiver.sender_id,
    };
  }
  if ('DelegateActionAccessKeyError' in kind) {
    return {
      type: 'delegateActionAccessKeyError',
      error: mapRpcInvalidAccessKeyError(kind.DelegateActionAccessKeyError),
    };
  }
  if ('DelegateActionInvalidNonce' in kind) {
    return {
      type: 'delegateActionInvalidNonce',
      akNonce: kind.DelegateActionInvalidNonce.ak_nonce,
      delegateNonce: kind.DelegateActionInvalidNonce.delegate_nonce,
    };
  }
  if ('DelegateActionNonceTooLarge' in kind) {
    return {
      type: 'delegateActionNonceTooLarge',
      delegateNonce: kind.DelegateActionNonceTooLarge.delegate_nonce,
      upperBound: kind.DelegateActionNonceTooLarge.upper_bound,
    };
  }
  if ('AccountAlreadyExists' in kind) {
    return {
      type: 'accountAlreadyExists',
      accountId: kind.AccountAlreadyExists.account_id,
    };
  }
  if ('AccountDoesNotExist' in kind) {
    return {
      type: 'accountDoesNotExist',
      accountId: kind.AccountDoesNotExist.account_id,
    };
  }
  if ('CreateAccountOnlyByRegistrar' in kind) {
    return {
      type: 'createAccountOnlyByRegistrar',
      accountId: kind.CreateAccountOnlyByRegistrar.account_id,
      registrarAccountId:
        kind.CreateAccountOnlyByRegistrar.registrar_account_id,
      predecessorId: kind.CreateAccountOnlyByRegistrar.predecessor_id,
    };
  }
  if ('CreateAccountNotAllowed' in kind) {
    return {
      type: 'createAccountNotAllowed',
      accountId: kind.CreateAccountNotAllowed.account_id,
      predecessorId: kind.CreateAccountNotAllowed.predecessor_id,
    };
  }
  if ('ActorNoPermission' in kind) {
    return {
      type: 'actorNoPermission',
      accountId: kind.ActorNoPermission.account_id,
      actorId: kind.ActorNoPermission.actor_id,
    };
  }
  if ('DeleteKeyDoesNotExist' in kind) {
    return {
      type: 'deleteKeyDoesNotExist',
      accountId: kind.DeleteKeyDoesNotExist.account_id,
      publicKey: kind.DeleteKeyDoesNotExist.public_key,
    };
  }
  if ('AddKeyAlreadyExists' in kind) {
    return {
      type: 'addKeyAlreadyExists',
      accountId: kind.AddKeyAlreadyExists.account_id,
      publicKey: kind.AddKeyAlreadyExists.public_key,
    };
  }
  if ('DeleteAccountStaking' in kind) {
    return {
      type: 'deleteAccountStaking',
      accountId: kind.DeleteAccountStaking.account_id,
    };
  }
  if ('LackBalanceForState' in kind) {
    return {
      type: 'lackBalanceForState',
      accountId: kind.LackBalanceForState.account_id,
      amount: kind.LackBalanceForState.amount,
    };
  }
  if ('TriesToUnstake' in kind) {
    return {
      type: 'triesToUnstake',
      accountId: kind.TriesToUnstake.account_id,
    };
  }
  if ('TriesToStake' in kind) {
    return {
      type: 'triesToStake',
      accountId: kind.TriesToStake.account_id,
      stake: kind.TriesToStake.stake,
      locked: kind.TriesToStake.locked,
      balance: kind.TriesToStake.balance,
    };
  }
  if ('InsufficientStake' in kind) {
    return {
      type: 'insufficientStake',
      accountId: kind.InsufficientStake.account_id,
      stake: kind.InsufficientStake.stake,
      minimumStake: kind.InsufficientStake.minimum_stake,
    };
  }
  if ('FunctionCallError' in kind) {
    return {
      type: 'functionCallError',
      error: mapRpcFunctionCallError(kind.FunctionCallError),
    };
  }
  if ('NewReceiptValidationError' in kind) {
    return {
      type: 'newReceiptValidationError',
      error: mapRpcNewReceiptValidationError(kind.NewReceiptValidationError),
    };
  }
  if ('OnlyImplicitAccountCreationAllowed' in kind) {
    return {
      type: 'onlyImplicitAccountCreationAllowed',
      accountId: kind.OnlyImplicitAccountCreationAllowed.account_id,
    };
  }
  if ('DeleteAccountWithLargeState' in kind) {
    return {
      type: 'deleteAccountWithLargeState',
      accountId: kind.DeleteAccountWithLargeState.account_id,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptInvalidTxError(error) {
  const UNKNOWN_ERROR = { type: 'unknown' };
  if ('InvalidAccessKeyError' in error) {
    return {
      type: 'invalidAccessKeyError',
      error: mapRpcInvalidAccessKeyError(error.InvalidAccessKeyError),
    };
  }
  if ('InvalidSignerId' in error) {
    return {
      type: 'invalidSignerId',
      signerId: error.InvalidSignerId.signer_id,
    };
  }
  if ('SignerDoesNotExist' in error) {
    return {
      type: 'signerDoesNotExist',
      signerId: error.SignerDoesNotExist.signer_id,
    };
  }
  if ('InvalidNonce' in error) {
    return {
      type: 'invalidNonce',
      transactionNonce: error.InvalidNonce.tx_nonce,
      akNonce: error.InvalidNonce.ak_nonce,
    };
  }
  if ('NonceTooLarge' in error) {
    return {
      type: 'nonceTooLarge',
      transactionNonce: error.NonceTooLarge.tx_nonce,
      upperBound: error.NonceTooLarge.upper_bound,
    };
  }
  if ('InvalidReceiverId' in error) {
    return {
      type: 'invalidReceiverId',
      receiverId: error.InvalidReceiverId.receiver_id,
    };
  }
  if ('InvalidSignature' in error) {
    return {
      type: 'invalidSignature',
    };
  }
  if ('NotEnoughBalance' in error) {
    return {
      type: 'notEnoughBalance',
      signerId: error.NotEnoughBalance.signer_id,
      balance: error.NotEnoughBalance.balance,
      cost: error.NotEnoughBalance.cost,
    };
  }
  if ('LackBalanceForState' in error) {
    return {
      type: 'lackBalanceForState',
      signerId: error.LackBalanceForState.signer_id,
      amount: error.LackBalanceForState.amount,
    };
  }
  if ('CostOverflow' in error) {
    return {
      type: 'costOverflow',
    };
  }
  if ('InvalidChain' in error) {
    return {
      type: 'invalidChain',
    };
  }
  if ('Expired' in error) {
    return {
      type: 'expired',
    };
  }
  if ('ActionsValidation' in error) {
    return {
      type: 'actionsValidation',
    };
  }
  if ('TransactionSizeExceeded' in error) {
    return {
      type: 'transactionSizeExceeded',
      size: error.TransactionSizeExceeded.size,
      limit: error.TransactionSizeExceeded.limit,
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptError(error) {
  let UNKNOWN_ERROR = { type: 'unknown' };
  if ('ActionError' in error) {
    return {
      type: 'action',
      error: mapRpcReceiptActionError(error.ActionError),
    };
  }
  if ('InvalidTxError' in error) {
    return {
      type: 'transaction',
      error: mapRpcReceiptInvalidTxError(error.InvalidTxError),
    };
  }
  return UNKNOWN_ERROR;
}

function mapRpcReceiptStatus(status) {
  if ('SuccessValue' in status) {
    return { type: 'successValue', value: status.SuccessValue };
  }
  if ('SuccessReceiptId' in status) {
    return { type: 'successReceiptId', receiptId: status.SuccessReceiptId };
  }
  if ('Failure' in status) {
    return { type: 'failure', error: mapRpcReceiptError(status.Failure) };
  }
  return { type: 'unknown' };
}

function mapRpcActionToAction1(rpcAction) {
  if (typeof rpcAction === 'object' && 'Delegate' in rpcAction) {
    return {
      kind: 'delegateAction',
      args: {
        actions: rpcAction.Delegate.delegate_action.actions.map(
          (subaction, index) => ({
            ...mapNonDelegateRpcActionToAction(subaction),
            delegateIndex: index,
          }),
        ),
        receiverId: rpcAction.Delegate.delegate_action.receiver_id,
        senderId: rpcAction.Delegate.delegate_action.sender_id,
      },
    };
  }
  return mapNonDelegateRpcActionToAction(rpcAction);
}

function parseOutcomeOld(outcome) {
  return {
    blockHash: outcome.block_hash,
    tokensBurnt: outcome.outcome.tokens_burnt,
    gasBurnt: outcome.outcome.gas_burnt,
    status: mapRpcReceiptStatus(outcome.outcome.status),
    logs: outcome.outcome.logs,
    receiptIds: outcome.outcome.receipt_ids,
  };
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function dollarFormat(number) {
  const bigNumber = new Big(number);

  // Format to two decimal places without thousands separator
  const formattedNumber = bigNumber.toFixed(2);

  // Add comma as a thousands separator
  const parts = formattedNumber.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const dollarFormattedNumber = `${parts.join('.')}`;

  return dollarFormattedNumber;
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
/* END_INCLUDE: "includes/near.jsx" */











function MainComponent(props) {
  const { loading, txn, network, t, rpcTxn, Link } = props;
  const [isContract, setIsContract] = useState(false);
  const [statsData, setStatsData] = useState({} );
  const [price, setPrice] = useState('');
  const [more, setMore] = useState(false);

  const { fts, nfts } = useMemo(() => {
    function tokensTransfers(receipts) {
      let fts = [];
      let nfts = [];

      receipts.forEach(
        (receipt) =>
          receipt?.fts?.forEach((ft) => {
            if (ft.ft_meta && ft.cause === 'TRANSFER') {
              if (ft.ft_meta && Number(ft.delta_amount) < 0) fts.push(ft);
            } else {
              if (ft.ft_meta) fts.push(ft);
            }
          }),
      );
      receipts.forEach(
        (receipt) =>
          receipt?.nfts?.forEach((nft) => {
            if (
              nft.nft_meta &&
              nft.nft_token_meta &&
              nft.cause === 'TRANSFER'
            ) {
              if (
                nft.nft_meta &&
                nft.nft_token_meta &&
                Number(nft.delta_amount) < 0
              )
                nfts.push(nft);
            } else {
              if (nft.nft_meta && nft.nft_token_meta) nfts.push(nft);
            }
          }),
      );

      return {
        fts,
        nfts,
      };
    }

    if (txn?.receipts?.length) {
      return tokensTransfers(txn.receipts);
    }

    return { fts: [], nfts: [] };
  }, [txn]);

  function absoluteValue(number) {
    return new Big(number).abs().toString();
  }

  const config = getConfig(network);

  useEffect(() => {
    function fetchStatsDatas() {
      if (txn) {
        asyncFetch(`${config.backendUrl}stats`)
          .then(
            (res




) => {
              const resp = res?.body?.stats?.[0];
              if (res.status === 200) {
                setStatsData(resp);
              } else {
                handleRateLimit(res, fetchStatsDatas);
              }
            },
          )
          .catch(() => {});
      }
    }

    fetchStatsDatas();
  }, [txn, config.backendUrl]);

  const toggleContent = () => {
    setMore((prevState) => !prevState);
  };
  const currentPrice = statsData?.near_price || 0;

  const date = useMemo(() => {
    if (txn?.block_timestamp) {
      const timestamp = new Date(nanoToMilli(txn?.block_timestamp));
      function fetchPriceAtDate(date) {
        asyncFetch(
          `https://api.coingecko.com/api/v3/coins/near/history?date=${date}`,
        ).then(
          (data




) => {
            const resp = data?.body?.market_data?.current_price?.usd;
            if (data.status === 200) {
              setPrice(resp);
            } else {
              handleRateLimit(data, () => fetchPriceAtDate(date));
            }
          },
        );
      }
      let dt;
      const currentDate = new Date();
      if (currentDate > timestamp) {
        const day = timestamp.getUTCDate();
        const month = timestamp.getUTCMonth() + 1;
        const year = timestamp.getUTCFullYear();
        dt = `${day < 10 ? '0' : ''}${day}-${
          month < 10 ? '0' : ''
        }${month}-${year}`;

        fetchPriceAtDate(dt);

        return dt;
      }
    }
    return;
  }, [txn?.block_timestamp]);

  const [logs, actions, errorMessage] = useMemo(() => {
    if (rpcTxn) {
      return [txnLogs(rpcTxn), txnActions(rpcTxn), txnErrorMessage(rpcTxn)];
    }
    return [[], [], undefined];
  }, [rpcTxn]);

  const Loader = (props) => {
    return (
      <div
        className={`bg-gray-200 h-5 rounded shadow-sm animate-pulse ${props.className} ${props.wrapperClassName}`}
      ></div>
    );
  };

  useEffect(() => {
    if (txn?.receiver_account_id) {
      asyncFetch(`${config.backendUrl}account/${txn.receiver_account_id}`).then(
        (data




) => {
          const resp = data?.body?.account?.[0];
          setIsContract(resp?.code_hash !== '11111111111111111111111111111111');
        },
      );
    }
  }, [txn, config.backendUrl]);

  return (
    <div className="text-sm text-nearblue-600 divide-solid divide-gray-200 divide-y">
      <div className="text-sm text-nearblue-600">
        {network === 'testnet' && (
          <div className="flex flex-wrap p-4 text-red-500">
            {t
              ? t('txns:testnetNotice')
              : '[ This is a Testnet transaction only ]'}
          </div>
        )}
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
                    ? t('txns:txn.hash.tooltip')
                    : 'Unique identifier (hash) of this transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.hash.text.0') : 'Txn Hash'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 font-semibold break-words">
              {txn?.transaction_hash ? txn?.transaction_hash : ''}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-start p-4">
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
                    ? t('txns:txn.status.tooltip')
                    : 'The status of the transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.status.text.0') : 'Status'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div>
              {txn?.outcomes?.status !== undefined && (
                <TxnStatus showLabel status={txn?.outcomes?.status} />
              )}
              {errorMessage && (
                <div className="text-xs bg-orange-50 my-2 rounded-md text-center px-2 py-1">
                  {errorMessage}
                </div>
              )}
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
                  {t
                    ? t('txns:txn.block.tooltip')
                    : 'The number of the block in which the transaction was recorded.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.block.text.0') : 'Block height'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-14" />
            </div>
          ) : txn ? (
            <div className="w-full md:w-3/4 font-semibold break-words">
              <Link
                href={`/blocks/${txn?.included_in_block_hash}`}
                className="hover:no-underline"
              >
                <a className="text-green-500 hover:no-underline">
                  {txn?.block?.block_height
                    ? localFormat(txn?.block?.block_height)
                    : txn?.block?.block_height ?? ''}
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
                    ? t('txns:txn.timestamp.tooltip')
                    : 'Timestamp of when this transaction was submitted.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.timestamp.text.0') : 'Timestamp'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-sm" />
            </div>
          ) : txn ? (
            <div className="w-full md:w-3/4 break-words">
              {getTimeAgoString(nanoToMilli(txn?.block_timestamp))} (
              {convertToUTC(nanoToMilli(txn?.block_timestamp), true)} +UTC)
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      {((actions?.length > 0 &&
        actions.some((item) =>
          [
            'CreateAccount',
            'DeleteAccount',
            'DeployContract',
            'Stake',
            'Transfer',
          ].includes(item?.action_kind),
        )) ||
        (logs.length > 0 &&
          logs.some((item) =>
            [
              'wrap.near',
              'wrap.testnet',
              'v2.ref-finance.near',
              'contract.main.burrow.near',
              'contract.1638481328.burrow.testnet',
            ].includes(item?.contract),
          ))) && (
        <div id="action-row" className="bg-white text-sm text-nearblue-600">
          <div className="flex items-start flex-wrap p-4">
            <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0 leading-7">
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
                    Highlighted events of the transaction
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
              Transaction Actions
            </div>
            {loading ? (
              <div className="w-full md:w-3/4">
                <Loader wrapperClassName="flex w-full max-w-xl" />
              </div>
            ) : (
              <div className="w-full md:w-3/4">
                <ScrollArea.Root className="w-full h-full rounded overflow-hidden bg-white">
                  <ScrollArea.Viewport className="w-full h-full rounded">
                    <div
                      id="action-column"
                      className="max-h-[194px] break-words space-y-2"
                    >
                      {logs?.map((event, i) => (
                        <EventLogs key={i} event={event} network={network} />
                      ))}
                      {actions?.map((action, i) => (
                        <Actions key={i} action={action} />
                      ))}
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                    orientation="vertical"
                  >
                    <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                    orientation="horizontal"
                  >
                    <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                  </ScrollArea.Scrollbar>
                  <ScrollArea.Corner className="bg-neargray-50" />
                </ScrollArea.Root>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="bg-white text-sm text-nearblue-600">
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
                    ? t('txns:txn.from.tooltip')
                    : 'Account that signed and sent the transaction'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.from.text.0') : 'From'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-all">
              <Link
                href={`/address/${txn?.signer_account_id}`}
                className="hover:no-underline"
              >
                <a className="text-green-500 hover:no-underline">
                  {txn?.signer_account_id}
                </a>
              </Link>
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
                  {t
                    ? t('txns:txn.to.tooltip')
                    : 'Account receiving the transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {isContract
              ? 'Interacted With (To)'
              : t
              ? t('txns:txn.to.text.0')
              : 'To'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-all">
              <Link
                href={`/address/${txn?.receiver_account_id}`}
                className="hover:no-underline"
              >
                <a className="text-green-500 hover:no-underline">
                  {txn?.receiver_account_id}
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
      {(fts?.length > 0 || nfts?.length > 0) && (
        <div className="flex items-start flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0 leading-7">
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
                  List of tokens transferred in the transaction
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Tokens Transferred
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="relative w-full md:w-3/4">
              <ScrollArea.Root className="w-full h-full rounded overflow-hidden bg-white">
                <ScrollArea.Viewport className="w-full h-full rounded">
                  <div className="max-h-[302px] break-words space-y-3">
                    {fts?.map((ft) => (
                      <div
                        className="flex items-center flex-wrap break-all leading-7"
                        key={ft?.key}
                      >
                        <FaRight className="inline-flex text-gray-400 text-xs" />
                        {ft?.cause === 'MINT' ? (
                          <>
                            <div className="font-semibold text-gray px-1">
                              From{' '}
                              {ft?.involved_account_id ? (
                                <Link
                                  href={`/address/${ft?.involved_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                    {shortenAddress(
                                      ft?.involved_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                            <div className="font-semibold text-gray px-1">
                              To{' '}
                              {ft?.affected_account_id ? (
                                <Link
                                  href={`/address/${ft?.affected_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1">
                                    {shortenAddress(
                                      ft?.affected_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="font-semibold text-gray px-1">
                              From{' '}
                              {ft?.affected_account_id ? (
                                <Link
                                  href={`/address/${ft?.affected_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                    {shortenAddress(
                                      ft?.affected_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                            <div className="font-semibold text-gray px-1">
                              To{' '}
                              {ft?.involved_account_id ? (
                                <Link
                                  href={`/address/${ft?.involved_account_id}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green-500 font-normal pl-1">
                                    {shortenAddress(
                                      ft?.involved_account_id ?? '',
                                    )}
                                  </a>
                                </Link>
                              ) : (
                                <span className="font-normal pl-1">system</span>
                              )}
                            </div>
                          </>
                        )}
                        <div className="font-semibold text-gray px-1">
                          For{' '}
                          <span className="pl-1 font-normal">
                            {ft?.delta_amount && ft?.ft_meta?.decimals
                              ? tokenAmount(
                                  absoluteValue(ft?.delta_amount),
                                  ft?.ft_meta?.decimals,
                                  true,
                                )
                              : ''}
                          </span>
                        </div>
                        <Link
                          href={`/token/${ft?.ft_meta?.contract}`}
                          className="hover:no-underline"
                        >
                          <a className="text-green flex items-center hover:no-underline">
                            <TokenImage
                              src={ft?.ft_meta?.icon}
                              alt={ft?.ft_meta?.name}
                              appUrl={config?.appUrl}
                              className="w-4 h-4 mx-1"
                            />
                            {shortenToken(ft?.ft_meta?.name ?? '')}
                            <span>
                              &nbsp;(
                              {shortenTokenSymbol(ft?.ft_meta?.symbol ?? '')})
                            </span>
                          </a>
                        </Link>
                      </div>
                    ))}
                    {nfts?.map((nft) => (
                      <div className="flex" key={nft?.key}>
                        <div className="flex justify-start items-start">
                          <FaRight className="inline-flex text-gray-400 text-xs mt-1" />
                          <div className="flex flex-wrap">
                            <div>
                              <div className="sm:flex">
                                {nft?.cause === 'MINT' ? (
                                  <>
                                    <div className="font-semibold text-gray px-1">
                                      From{' '}
                                      {nft?.involved_account_id ? (
                                        <Link
                                          href={`/address/${nft?.involved_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.involved_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                    <div className="font-semibold text-gray px-1">
                                      To{' '}
                                      {nft?.affected_account_id ? (
                                        <Link
                                          href={`/address/${nft?.affected_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.affected_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="font-semibold text-gray px-1">
                                      From{' '}
                                      {nft?.affected_account_id ? (
                                        <Link
                                          href={`/address/${nft?.affected_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.affected_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                    <div className="font-semibold text-gray px-1">
                                      To{' '}
                                      {nft?.involved_account_id ? (
                                        <Link
                                          href={`/address/${nft?.involved_account_id}`}
                                          className="hover:no-underline"
                                        >
                                          <a className="text-green-500 font-normal pl-1 hover:no-underline">
                                            {shortenAddress(
                                              nft?.involved_account_id ?? '',
                                            )}
                                          </a>
                                        </Link>
                                      ) : (
                                        <span className="font-normal pl-1">
                                          system
                                        </span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="sm:flex mt-1">
                                <div className="text-gray px-1">
                                  <span className="text-gray-400">For </span>
                                  <span className="pl-1 font-normal">
                                    NFT Token ID [
                                    <Link
                                      href={`/nft-token/${nft?.nft_meta?.contract}/${nft?.token_id}`}
                                      className="hover:no-underline"
                                    >
                                      <a className="text-green hover:no-underline">
                                        {shortenToken(nft?.token_id ?? '')}
                                      </a>
                                    </Link>
                                    ]
                                  </span>
                                </div>
                                <Link
                                  href={`/nft-token/${nft?.nft_meta?.contract}`}
                                  className="hover:no-underline"
                                >
                                  <a className="text-green flex items-center hover:no-underline">
                                    <TokenImage
                                      src={nft?.nft_meta?.icon}
                                      alt={nft?.nft_meta?.name}
                                      className="w-4 h-4 mx-1"
                                    />
                                    {shortenToken(nft?.nft_meta?.name ?? '')}
                                    <span>
                                      &nbsp;(
                                      {shortenTokenSymbol(
                                        nft?.nft_meta?.symbol ?? '',
                                      )}
                                      )
                                    </span>
                                  </a>
                                </Link>
                              </div>
                            </div>
                            <div className="border rounded ml-2 w-11 h-11 p-1">
                              <Link
                                href={`/nft-token/${nft?.nft_meta?.contract}/${nft?.token_id}`}
                                className="hover:no-underline"
                              >
                                <a>
                                  {
                                    <Widget
                                      src={`${config?.ownerId}/widget/bos-components.components.Shared.NFTImage`}
                                      props={{
                                        base: nft?.nft_meta?.base_uri,
                                        media: nft?.nft_token_meta?.media,
                                        reference:
                                          nft?.nft_meta?.reference ||
                                          nft?.nft_token_meta?.reference,
                                        alt: nft?.nft_token_meta?.title,
                                        className: 'max-h-full rounded',
                                        network: network,
                                      }}
                                    />
                                  }
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                  className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar
                  className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                  orientation="horizontal"
                >
                  <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="bg-neargray-50" />
              </ScrollArea.Root>
            </div>
          )}
        </div>
      )}
      <div className="bg-white text-sm text-nearblue-600">
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
                    ? t('txns:txn.deposit.tooltip')
                    : 'Sum of all NEAR tokens transferred from the Signing account to the Receiver account. This includes tokens sent in a Transfer action(s), and as deposits on Function Call action(s).'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.deposit.text.0') : 'Deposit Value'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xs" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span>
                      {txn.actions_agg?.deposit
                        ? yoctoToNear(txn.actions_agg?.deposit, true)
                        : txn.actions_agg?.deposit ?? ''}{' '}
                      Ⓝ
                      {currentPrice && network === 'mainnet'
                        ? ` ($${fiatValue(
                            yoctoToNear(txn.actions_agg?.deposit ?? 0, false),
                            currentPrice,
                          )})`
                        : ''}
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                    align="start"
                    side="bottom"
                  >
                    {t
                      ? t('txns:txn.deposit.tooltip')
                      : 'Sum of all NEAR tokens transferred from the Signing account to the Receiver account. This includes tokens sent in a Transfer action(s), and as deposits on Function Call action(s).'}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Question className="w-4 h-4 fill-current mr-1" />
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.fee.tooltip')
                    : 'Total fee paid in NEAR to execute this transaction.'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.fee.text.0') : 'Transaction fee'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xs" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words">
              {txn?.outcomes_agg?.transaction_fee
                ? yoctoToNear(txn?.outcomes_agg?.transaction_fee, true)
                : txn?.outcomes_agg?.transaction_fee ?? ''}{' '}
              Ⓝ
              {currentPrice && network === 'mainnet'
                ? ` ($${fiatValue(
                    yoctoToNear(txn.outcomes_agg?.transaction_fee ?? 0, false),
                    currentPrice,
                  )})`
                : ''}
            </div>
          )}
        </div>
      </div>
      {network === 'mainnet' && date && (
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Question className="w-4 h-4 fill-current mr-1" />
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  {t
                    ? t('txns:txn.price.tooltip')
                    : 'Closing price of Ⓝ on date of transaction'}
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            {t ? t('txns:txn.price.text.0') : 'Ⓝ Price'}
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-32" />
            </div>
          ) : (
            <div className="w-full md:w-3/4 break-words">
              {price ? `$${dollarFormat(price)} / Ⓝ` : 'N/A'}
            </div>
          )}
        </div>
      )}

      <Accordion.Root
        type="single"
        className="text-sm text-nearblue-600 divide-solid divide-gray-200 divide-y border-b"
        defaultValue={more ? 'item-1' : undefined}
        collapsible
      >
        <Accordion.Item value="item-1">
          <Accordion.Header data-orientation="vertical">
            <div className="flex flex-wrap p-4">
              <Accordion.Trigger asChild onClick={toggleContent}>
                {!more ? (
                  <span className="text-green-500 flex items-center cursor-pointer">
                    Click to see more <ArrowDown className="fill-current" />
                  </span>
                ) : (
                  <span className="text-green-500 flex items-center cursor-pointer">
                    Click to see less <ArrowUp className="fill-current" />
                  </span>
                )}
              </Accordion.Trigger>
            </div>
          </Accordion.Header>
          <Accordion.Content>
            <div>
              <div className="flex flex-wrap p-4">
                <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                        align="start"
                        side="bottom"
                      >
                        {t
                          ? t('txns:txn.gas.tooltip')
                          : 'Maximum amount of gas allocated for the transaction & the amount eventually used.'}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  {t ? t('txns:txn.gas.text.0') : 'Gas Limit & Usage by Txn'}
                </div>
                {loading ? (
                  <div className="w-full md:w-3/4">
                    <Loader wrapperClassName="flex w-full max-w-xs" />
                  </div>
                ) : (
                  <div className="w-full md:w-3/4 break-words">
                    {convertToMetricPrefix(
                      txn?.actions_agg?.gas_attached ?? 0,
                    ) + 'gas'}
                    <span className="text-gray-300 px-1">|</span>
                    {convertToMetricPrefix(txn?.outcomes_agg?.gas_used ?? 0)}gas
                    (
                    {gasPercentage(
                      txn?.outcomes_agg?.gas_used ?? 0,
                      txn?.actions_agg?.gas_attached ?? 0,
                    )}
                    )
                  </div>
                )}
              </div>
              <div className="flex flex-wrap p-4">
                <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <Question className="w-4 h-4 fill-current mr-1" />
                      </Tooltip.Trigger>
                      <Tooltip.Content
                        className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                        align="start"
                        side="bottom"
                      >
                        {t
                          ? t('txns:txn.burnt.tooltip')
                          : 'Total amount of Gas & Token burnt from this transaction.'}
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                  {t ? t('txns:txn.burnt.text.0') : 'Burnt Gas & Tokens by Txn'}
                </div>
                {loading ? (
                  <div className="w-full md:w-3/4">
                    <Loader wrapperClassName="flex w-full max-w-xs" />
                  </div>
                ) : (
                  <div className="w-full  text-xs items-center flex md:w-3/4 break-words">
                    <div className="bg-orange-50 rounded-md px-2 py-1">
                      <span className="text-xs mr-2">🔥</span>
                      {convertToMetricPrefix(
                        txn.receipt_conversion_gas_burnt ?? 0,
                      ) + 'gas'}
                      <span className="text-gray-300 px-1">|</span>{' '}
                      {txn.receipt_conversion_tokens_burnt
                        ? yoctoToNear(txn.receipt_conversion_tokens_burnt, true)
                        : txn.receipt_conversion_tokens_burnt ?? ''}{' '}
                      Ⓝ
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </div>
  );
}

return MainComponent(props, context);