

function MainComponent() {
  const networkAccountId =
    context.networkId === 'mainnet'
      ? 'nearblocksonbos.near'
      : 'nearblocks.testnet';

  const { localFormat, formatWithCommas } = VM.require(
    `${networkAccountId}/widget/includes.Utils.formats`,
  );

  function getConfig(network) {
    switch (network) {
      case 'mainnet':
        return {
          nodeUrl: 'https://rpc.mainnet.near.org',
          backendUrl: 'https://api3.nearblocks.io/v1/',
          rpcUrl: 'https://beta.rpc.mainnet.near.org',
          appUrl: 'https://nearblocks.io/',
        };
      case 'testnet':
        return {
          nodeUrl: 'https://rpc.testnet.near.org',
          backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
          rpcUrl: 'https://beta.rpc.testnet.near.org/',
          appUrl: 'https://testnet.nearblocks.io/',
        };
      default:
        return {};
    }
  }

  function convertAmountToReadableString(amount, type) {
    if (!amount) return null;

    let value;
    let suffix;

    const nearNomination = new Big(10).pow(24);

    const amountInNear = new Big(amount).div(nearNomination);

    if (type === 'totalSupply' || type === 'totalStakeAmount') {
      value = formatWithCommas(amountInNear.div(1e6).toFixed(1));
      suffix = 'M';
    } else if (type === 'seatPriceAmount') {
      value = formatWithCommas(amountInNear.round().toString());
    } else {
      value = amount.toString();
    }
    return `${value}${suffix}`;
  }

  function convertTimestampToTime(timestamp) {
    const timestampBig = new Big(timestamp);

    const hours = timestampBig.div(3600).round(0, 0).toString();
    const minutes = timestampBig.mod(3600).div(60).round(0, 0).toString();
    const seconds = timestampBig.mod(60).round(0, 0).toString();

    return `${hours.padStart(2, '0')}H ${minutes.padStart(
      2,
      '0',
    )}M ${seconds.padStart(2, '0')}S`;
  }

  let attempt = 1;
  function handleRateLimit(
    data,
    reFetch,
    Loading,
  ) {
    if (data.status === 429 || data.status === undefined) {
      const retryCount = 4;
      if (attempt <= retryCount) {
        const delay = Math.pow(2, attempt) * 1000;
        setTimeout(() => {
          reFetch();
          attempt += 1;
        }, delay);
      } else {
        if (Loading) {
          Loading();
        }
      }
    } else {
      if (Loading) {
        Loading();
      }
    }
  }

  function yoctoToNear(yocto, format) {
    const YOCTO_PER_NEAR = Big(10).pow(24).toString();

    const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

    return format ? localFormat(near) : near;
  }

  function formatTimestampToString(timestamp) {
    const date = new Date(timestamp);

    // Format the date to 'YYYY-MM-DD HH:mm:ss' format
    const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];

    return formattedDate;
  }

  function nanoToMilli(nano) {
    return Big(nano).div(Big(10).pow(6)).round().toNumber();
  }

  function shortenAddress(address) {
    const string = String(address);

    if (string.length <= 20) return string;

    return `${string.substr(0, 10)}...${string.substr(-7)}`;
  }

  function truncateString(str, maxLength, suffix) {
    if (str.length <= maxLength) {
      return str;
    }
    return str.substring(0, maxLength) + suffix;
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

  function urlHostName(url) {
    try {
      const domain = new URL(url);
      return domain?.hostname ?? null;
    } catch (e) {
      return null;
    }
  }

  function holderPercentage(supply, quantity) {
    return Math.min(
      Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2),
      100,
    );
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
  return {
    getConfig,
    handleRateLimit,
    yoctoToNear,
    formatTimestampToString,
    nanoToMilli,
    shortenAddress,
    truncateString,
    isAction,
    timeAgo,
    isJson,
    uniqueId,
    fiatValue,
    debounce,
    urlHostName,
    holderPercentage,
    convertAmountToReadableString,
    convertTimestampToTime,
    mapFeilds,
  };
}

return MainComponent(props, context);