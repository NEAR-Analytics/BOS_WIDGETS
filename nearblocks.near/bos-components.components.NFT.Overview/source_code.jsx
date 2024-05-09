/**
 * Component: NFTOverview
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Non-Fungible Token Overview.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The token identifier passed as a string
 * @param {React.FC<{
 *   href: string;
 *   children: React.ReactNode;
 *   className?: string;
 * }>} Link - A React component for rendering links.
 */











/* INCLUDE COMPONENT: "includes/Common/Links.jsx" */
/* INCLUDE: "includes/libs.jsx" */
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

const Links = (props) => {
  const { meta } = props;
  const twitter = urlHostName(meta?.twitter);
  const facebook = urlHostName(meta?.facebook);
  const telegram = urlHostName(meta?.telegram);

  return (
    <div className="flex space-x-4">
      {meta?.twitter && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <a
                href={
                  !twitter
                    ? `https://twitter.com/${meta.twitter}`
                    : meta.twitter
                }
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex"
              >
                <img
                  width="16"
                  height="16"
                  className="w-4 h-4"
                  src="/images/twitter_icon.svg"
                  alt="Twitter"
                />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-white text-xs p-2"
              sideOffset={8}
              place="bottom"
            >
              Twitter
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
      {meta?.facebook && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <a
                href={
                  !facebook
                    ? `https://facebook.com/${meta.facebook}`
                    : meta.facebook
                }
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex"
              >
                <img
                  width="16"
                  height="16"
                  className="w-4 h-4"
                  src="/images/facebook_icon.svg"
                  alt="Facebook"
                />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-white text-xs p-2"
              sideOffset={8}
              place="bottom"
            >
              Facebook
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
      {meta?.telegram && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <a
                href={
                  !telegram ? `https://t.me/${meta.telegram}` : meta.telegram
                }
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex"
              >
                <img
                  width="16"
                  height="16"
                  className="w-4 h-4"
                  src="/images/telegram_icon.svg"
                  alt="Telegram"
                />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-white text-xs p-2"
              sideOffset={8}
              place="bottom"
            >
              Telegram
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
      {meta?.coingecko_id && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <a
                href={`https://www.coingecko.com/en/coins/${meta.coingecko_id}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex"
              >
                <img
                  width="16"
                  height="16"
                  className="w-4 h-4"
                  src="/images/coingecko_icon.svg"
                  alt="coingecko"
                />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content
              className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-white text-xs p-2"
              sideOffset={8}
              place="bottom"
            >
              CoinGecko
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Links.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Skeleton = (props) => {
  return (
    <div
      className={`bg-gray-200  rounded shadow-sm animate-pulse ${props.className}`}
    ></div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */
/* INCLUDE: "includes/formats.jsx" */
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
/* END_INCLUDE: "includes/formats.jsx" */
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
/* END_INCLUDE: "includes/libs.jsx" */


const tabs = ['Transfers', 'Holders', 'Inventory', 'Comments'];

function MainComponent({ network, id, Link }) {
  const [isLoading, setIsLoading] = useState(false);
  const [txnLoading, setTxnLoading] = useState(false);
  const [holderLoading, setHolderLoading] = useState(false);
  const [token, setToken] = useState({} );
  const [transfers, setTransfers] = useState('');
  const [holders, setHolders] = useState('');
  const [pageTab, setPageTab] = useState('Transfers');

  const config = getConfig(network);

  useEffect(() => {
    function fetchNFTData() {
      setIsLoading(true);
      asyncFetch(`${config.backendUrl}nfts/${id}`)
        .then(
          (data




) => {
            const resp = data?.body?.contracts?.[0];
            if (data.status === 200) {
              setToken(resp);
              setIsLoading(false);
            } else {
              handleRateLimit(data, fetchNFTData, () => setIsLoading(false));
            }
          },
        )
        .catch(() => {});
    }

    function fetchTxnsCount() {
      setTxnLoading(true);
      asyncFetch(`${config.backendUrl}nfts/${id}/txns/count`)
        .then(
          (data




) => {
            const resp = data?.body?.txns?.[0];
            if (data.status === 200) {
              setTransfers(resp.count);
              setTxnLoading(false);
            } else {
              handleRateLimit(data, fetchTxnsCount, () => setTxnLoading(false));
            }
          },
        )
        .catch(() => {});
    }

    function fetchHoldersCount() {
      setHolderLoading(true);
      asyncFetch(`${config.backendUrl}nfts/${id}/holders/count`)
        .then(
          (data




) => {
            const resp = data?.body?.holders?.[0];
            if (data.status === 200) {
              setHolders(resp.count);
              setHolderLoading(false);
            } else {
              handleRateLimit(data, fetchHoldersCount, () =>
                setHolderLoading(false),
              );
            }
          },
        )
        .catch(() => {});
    }

    fetchNFTData();
    fetchTxnsCount();
    fetchHoldersCount();
  }, [config.backendUrl, id]);

  const onTab = (index) => {
    setPageTab(tabs[index]);
  };

  return (
    <>
      <div className="flex items-center justify-between flex-wrap pt-4">
        {!token ? (
          <div className="w-80 max-w-xs px-3 py-5">
            <Skeleton className="h-7" />
          </div>
        ) : (
          <h1 className="break-all space-x-2 text-xl text-nearblue-600 leading-8 py-4 px-2">
            <span className="inline-flex align-middle h-7 w-7">
              <TokenImage
                src={token?.icon}
                alt={token?.name}
                className="w-7 h-7"
                appUrl={config?.appUrl}
              />
            </span>
            <span className="inline-flex align-middle ">Token: </span>
            <span className="inline-flex align-middle font-semibold">
              {token?.name}
            </span>
          </h1>
        )}
      </div>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="w-full">
            <div className="h-full bg-white soft-shadow rounded-xl">
              <h2 className="border-b p-3 text-nearblue-600 text-sm font-semibold">
                Overview
              </h2>

              <div className="px-3 divide-y text-sm text-nearblue-600">
                <div className="flex flex-wrap py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                    Total Supply:
                  </div>
                  {isLoading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    <div className="w-full md:w-3/4 break-words">
                      {token?.tokens ? localFormat(token?.tokens) : ''}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                    Transfers:
                  </div>
                  {txnLoading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    <div className="w-full md:w-3/4 break-words">
                      {transfers && token ? localFormat(transfers) : ''}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0 ">Holders:</div>
                  {holderLoading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    <div className="w-full md:w-3/4 break-words">
                      {holders ? localFormat(holders) : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="h-full bg-white soft-shadow rounded-xl overflow-hidden">
              <h2 className="border-b p-3 text-nearblue-600 text-sm font-semibold">
                Profile Summary
              </h2>
              <div className="px-3 divide-y text-sm text-nearblue-600">
                <div className="flex flex-wrap items-center justify-between py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0 ">Contract:</div>
                  {isLoading ? (
                    <div className="w-full md:w-3/4 break-words">
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : (
                    <div className="w-full text-green-500 md:w-3/4 break-words">
                      <Link
                        href={`/address/${token?.contract}`}
                        className="hover:no-underline"
                      >
                        <a className="text-green-500 hover:no-underline">
                          {token?.contract}
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-between py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                    Official Site:
                  </div>
                  <div className="w-full md:w-3/4 text-green-500 break-words">
                    {isLoading ? (
                      <Skeleton className="h-4 w-32" />
                    ) : (
                      <Link
                        href={`${token?.website}`}
                        className="hover:no-underline"
                      >
                        {token?.website}
                      </Link>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                    Social Profiles:
                  </div>
                  <div className="w-full md:w-3/4 break-words">
                    {/* corrections needed */}
                    {isLoading ? (
                      <Skeleton className="h-4 w-32" />
                    ) : (
                      <Links meta={token} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-6"></div>
        <div className="block lg:flex lg:space-x-2 mb-4">
          <div className="w-full">
            <div>
              {tabs &&
                tabs?.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => onTab(index)}
                    className={`text-nearblue-600 text-sm font-medium overflow-hidden inline-block cursor-pointer p-2 mb-3 mr-2 focus:outline-none ${
                      pageTab === tab
                        ? 'rounded-lg bg-green-600 text-white'
                        : 'hover:bg-neargray-800 bg-neargray-700 rounded-lg hover:text-nearblue-600'
                    }`}
                    value={tab}
                  >
                    <h2>{tab}</h2>
                  </button>
                ))}
            </div>
            <div className="bg-white soft-shadow rounded-xl pb-1">
              <div className={`${pageTab === 'Transfers' ? '' : 'hidden'} `}>
                {
                  <Widget
                    src={`${config?.ownerId}/widget/bos-components.components.NFT.Transfers`}
                    props={{
                      network: network,
                      id: id,
                      Link,
                    }}
                  />
                }
              </div>
              <div className={`${pageTab === 'Holders' ? '' : 'hidden'} `}>
                {
                  <Widget
                    src={`${config?.ownerId}/widget/bos-components.components.NFT.Holders`}
                    props={{
                      network: network,
                      id: id,
                      Link,
                    }}
                  />
                }
              </div>
              <div className={`${pageTab === 'Inventory' ? '' : 'hidden'} `}>
                {
                  <Widget
                    src={`${config?.ownerId}/widget/bos-components.components.NFT.Inventory`}
                    props={{
                      network: network,
                      id: id,
                      Link,
                    }}
                  />
                }
              </div>
              <div className={`${pageTab === 'Comments' ? '' : 'hidden'} `}>
                <div className="py-3">
                  {
                    <Widget
                      src={`${config.ownerId}/widget/bos-components.components.Comments.Feed`}
                      props={{
                        network: network,
                        path: `nearblocks.io/nft/${id}`,
                        limit: 10,
                      }}
                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

return MainComponent(props, context);