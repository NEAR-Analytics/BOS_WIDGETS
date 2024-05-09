/**
 * Component: NFTList
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Top Non-Fungible Tokens on Near Protocol.
 * @interface Props
 * @param {string}  [network] - The network data to show, either mainnet or testnet.
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {number} [currentPage] - The current page number being displayed. (Optional)
 *                                 Example: If provided, currentPage=3 will display the third page of blocks.
 * @param {function} [setPage] - A function used to set the current page. (Optional)
 *                               Example: setPage={handlePageChange} where handlePageChange is a function to update the page.
 * @param {React.FC<{
 *   href: string;
 *   children: React.ReactNode;
 *   className?: string;
 * }>} Link - A React component for rendering links.
 */












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
/* END_INCLUDE: "includes/formats.jsx" */
/* INCLUDE: "includes/libs.jsx" */
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
/* END_INCLUDE: "includes/libs.jsx" */
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
/* INCLUDE COMPONENT: "includes/icons/SortIcon.jsx" */
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
};

const SortIcon = (props) => {
  return (
    <ArrowUp
      className={`h-3 w-3 fill-current transition-transform mr-1 duration-700 ${
        props.order !== 'asc' ? 'transform rotate-180' : 'transform rotate-0'
      }`}
    />
  );
};/* END_INCLUDE COMPONENT: "includes/icons/SortIcon.jsx" */

const initialSorting = {
  sort: 'txns_day',
  order: 'desc',
};

const initialPagination = {
  per_page: 50,
};

function MainComponent({ network, currentPage, setPage, t, Link }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [tokens, setTokens] = useState({});
  const [sorting, setSorting] = useState(initialSorting);
  const errorMessage = t ? t('token:fts.top.empty') : 'No tokens found!';
  const config = getConfig(network);

  useEffect(() => {
    function fetchTotalTokens(qs) {
      const queryParams = qs ? '?' + qs : '';
      asyncFetch(`${config?.backendUrl}nfts/count${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const resp = data?.body?.tokens?.[0];
            if (data.status === 200) {
              setTotalCount(resp?.count);
            } else {
              handleRateLimit(data, () => fetchTotalTokens(qs));
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }
    function fetchTokens(qs, sqs, page) {
      setIsLoading(true);
      const queryParams = qs ? qs + '&' : '';
      asyncFetch(
        `${config?.backendUrl}nfts?${queryParams}order=${sqs?.order}&sort=${sqs?.sort}&page=${currentPage}&per_page=${initialPagination.per_page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(
          (data




) => {
            const resp = data?.body?.tokens;
            if (data.status === 200) {
              setTokens((prevData) => ({ ...prevData, [page]: resp || [] }));
              setIsLoading(false);
            } else {
              handleRateLimit(
                data,
                () => fetchTokens(qs, sorting, page),
                () => setIsLoading(false),
              );
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    fetchTotalTokens();
    fetchTokens('', sorting, currentPage);
    if (sorting) {
      fetchTotalTokens();
      fetchTokens('', sorting, currentPage);
    }
  }, [config?.backendUrl, currentPage, sorting]);

  const onOrder = (sortKey) => {
    setSorting((state) => ({
      ...state,
      sort: sortKey,
      order:
        state.sort === sortKey
          ? state.order === 'asc'
            ? 'desc'
            : 'asc'
          : 'desc',
    }));
  };
  const columns = [
    {
      header: <span>#</span>,
      key: '',
      cell: (_row, index) => (
        <span>
          {serialNumber(index, currentPage, initialPagination.per_page)}
        </span>
      ),
      tdClassName:
        'pl-6 py-4 whitespace-nowrap text-sm text-nearblue-700 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider w-[1px]',
    },
    {
      header: <span>Token</span>,
      key: 'name',
      cell: (row) => (
        <>
          <div className="flex items-center">
            <TokenImage
              src={row?.icon}
              alt={row?.name}
              appUrl={config?.appUrl}
              className="w-5 h-5 mr-2"
            />
            <Link
              href={`/nft-token/${row?.contract}`}
              className="hover:no-underline"
            >
              <a className="flex text-green-500 hover:no-underline">
                <span className="inline-block truncate max-w-[200px] mr-1">
                  {row?.name}
                </span>
                <span className="text-nearblue-700 inline-block truncate max-w-[80px]">
                  {row?.symbol}
                </span>
              </a>
            </Link>
          </div>
        </>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm  text-nearblue-600 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider',
    },
    {
      header: <span>Tokens</span>,
      key: 'tokens',
      cell: (row) => (
        <span>
          {row?.tokens ? localFormat(row?.tokens) : row?.tokens ?? ''}
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider w-[160px]',
    },
    {
      header: <span>Holders</span>,
      key: 'holders',
      cell: (row) => (
        <span>{row?.holders ? localFormat(row?.holders) : ''}</span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider w-[160px]',
    },
    {
      header: (
        <span>
          <button
            type="button"
            onClick={() => onOrder('txns_day')}
            className="w-full px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex flex-row whitespace-nowrap"
          >
            {sorting.sort === 'txns_day' && (
              <div className="text-nearblue-600 font-semibold">
                <SortIcon order={sorting.order} />
              </div>
            )}
            Transfers (24H)
          </button>
        </span>
      ),
      key: 'change_24',
      cell: (row) => (
        <span>{row?.transfers_day ? localFormat(row?.transfers_day) : ''}</span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 align-top',
      thClassName: 'w-[160px]',
    },
  ];

  const debouncedSearch = useMemo(() => {
    return debounce(500, (value) => {
      if (!value || value?.trim() === '') {
        setSearchResults([]);
        return;
      }
      asyncFetch(`${config?.backendUrl}nfts?search=${value}&per_page=5`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((data) => {
          const resp = data?.body?.tokens;
          setSearchResults(resp);
        })
        .catch(() => {});
    });
  }, [config?.backendUrl]);

  const onChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
  };

  return (
    <>
      <div className=" bg-white border soft-shadow rounded-xl pb-1 ">
        <div className="flex flex-row items-center justify-between text-left text-sm text-nearblue-600 px-3 py-2">
          {isLoading ? (
            <Skeleton className="max-w-lg pl-3" />
          ) : (
            <p className="pl-3">
              A total of {localFormat(totalCount.toString())} NEP-171 Token
              Contracts found
            </p>
          )}
          <div className={`flex w-full h-10 sm:w-80 mr-2`}>
            <div className="flex-grow">
              <label htmlFor="token-search" id="token-search">
                <input
                  name="search"
                  autoComplete="off"
                  placeholder="Search"
                  className="search ml-2 pl-8 token-search bg-white w-full h-full text-sm py-2 outline-none border rounded-xl"
                  onChange={onChange}
                />
              </label>
              {searchResults?.length > 0 && (
                <div className="z-50 relative">
                  <div className="text-xs rounded-b-md -mr-2 ml-2 -mt-1 bg-white py-2 shadow">
                    {searchResults.map((token) => (
                      <div
                        key={token?.contract}
                        className="mx-2 px-2 py-2 hover:bg-gray-100 cursor-pointer hover:border-gray-500 truncate"
                      >
                        <Link href={`/token/${token?.contract}`}>
                          <a className="flex items-center my-1 whitespace-nowrap ">
                            <div className="flex-shrink-0 h-5 w-5 mr-2">
                              <TokenImage
                                src={token?.icon}
                                alt={token?.name}
                                appUrl={config?.appUrl}
                                className="w-5 h-5"
                              />
                            </div>
                            <p className="font-semibold text-sm truncate">
                              {token?.name}
                              <span className="text-nearblue-700 ml-2">
                                {token?.symbol}
                              </span>
                            </p>
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Widget
          src={`${config?.ownerId}/widget/bos-components.components.Shared.Table`}
          props={{
            columns: columns,
            data: tokens[currentPage],
            isLoading: isLoading,
            isPagination: true,
            count: totalCount,
            page: currentPage,
            limit: initialPagination.per_page,
            pageLimit: 200,
            setPage: setPage,
            Error: errorMessage,
          }}
        />
      </div>
    </>
  );
}

return MainComponent(props, context);