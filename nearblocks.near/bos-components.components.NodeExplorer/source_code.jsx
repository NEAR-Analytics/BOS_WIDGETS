/**
 * Component: NodeExplorer
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Node validator on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {number} [currentPage] - The current page number being displayed. (Optional)
 *                                 Example: If provided, currentPage=3 will display the third page of blocks.
 * @param {function} [setPage] - A function used to set the current page. (Optional)
 *                               Example: setPage={handlePageChange} where handlePageChange is a function to update the page.
 */






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
function formatNumber(value) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (value >= 10000 && suffixIndex < suffixes.length - 1) {
    value /= 1000;
    suffixIndex++;
  }

  const formattedValue = value.toFixed(1).replace(/\.0+$/, '');
  return `${formattedValue} ${suffixes[suffixIndex]}`;
}
function gasFee(gas, price) {
  const near = yoctoToNear(Big(gas).mul(Big(price)).toString(), true);

  return `${near} Ⓝ`;
}

function currency(number) {
  let absNumber = Math.abs(number);

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let suffixIndex = 0;

  while (absNumber >= 1000 && suffixIndex < suffixes.length - 1) {
    absNumber /= 1000;
    suffixIndex++;
  }

  let shortNumber = parseFloat(absNumber.toFixed(2));

  return (number < 0 ? '-' : '') + shortNumber + ' ' + suffixes[suffixIndex];
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
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatTimestampToString(timestamp) {
  const date = new Date(timestamp);

  // Format the date to 'YYYY-MM-DD HH:mm:ss' format
  const formattedDate = date.toISOString().replace('T', ' ').split('.')[0];

  return formattedDate;
}

function convertToMetricPrefix(number) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let count = 0;
  while (Math.abs(number) >= 1000 && count < prefixes.length - 1) {
    number /= 1000;
    count++;
  }

  // Check if the number is close to an integer value
  if (Math.abs(number) >= 10) {
    number = Math.round(number); // Round the number to the nearest whole number
    return number + ' ' + prefixes[count];
  }

  return (
    Number(Math.floor(number * 100) / 100).toFixed(2) + ' ' + prefixes[count]
  );
}
function formatNumber(value) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];
  let suffixIndex = 0;

  while (value >= 10000 && suffixIndex < suffixes.length - 1) {
    value /= 1000;
    suffixIndex++;
  }

  const formattedValue = value.toFixed(1).replace(/\.0+$/, '');
  return `${formattedValue} ${suffixes[suffixIndex]}`;
}
function gasFee(gas, price) {
  const near = yoctoToNear(Big(gas).mul(Big(price)).toString(), true);

  return `${near} Ⓝ`;
}

function currency(number) {
  let absNumber = Math.abs(number);

  const suffixes = ['', 'K', 'M', 'B', 'T', 'Q'];
  let suffixIndex = 0;

  while (absNumber >= 1000 && suffixIndex < suffixes.length - 1) {
    absNumber /= 1000;
    suffixIndex++;
  }

  let shortNumber = parseFloat(absNumber.toFixed(2));

  return (number < 0 ? '-' : '') + shortNumber + ' ' + suffixes[suffixIndex];
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
/* INCLUDE: "includes/libs.jsx" */
function convertAmountToReadableString(amount, type) {
  if (!amount) return null;

  let value;
  let suffix;

  const nearNomination = Math.pow(10, 24);

  const amountInNear = Number(amount) / nearNomination;

  if (type === 'totalSupply' || type === 'totalStakeAmount') {
    value = formatWithCommas((amountInNear / 1e6).toFixed(1));
    suffix = 'M';
  } else if (type === 'seatPriceAmount') {
    value = formatWithCommas(Math.round(amountInNear).toString());
  } else {
    value = amount.toString();
  }
  return `${value}${suffix}`;
}

function convertTimestampToTime(timestamp) {
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = Math.floor(timestamp % 60);

  return `${hours.toString().padStart(2, '0')}H ${minutes
    .toString()
    .padStart(2, '0')}M ${seconds.toString().padStart(2, '0')}S`;
}

function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}

function fiatValue(big, price) {
  const value = Big(big).mul(Big(price)).toString();
  const formattedNumber = Number(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
  return formattedNumber;
}

function nanoToMilli(nano) {
  return new Big(nano).div(new Big(10).pow(6)).round().toNumber();
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
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function convertTimestampToTime(timestamp) {
  const hours = Math.floor(timestamp / 3600);
  const minutes = Math.floor((timestamp % 3600) / 60);
  const seconds = Math.floor(timestamp % 60);

  return `${hours.toString().padStart(2, '0')}H ${minutes
    .toString()
    .padStart(2, '0')}M ${seconds.toString().padStart(2, '0')}S`;
}

function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}

function fiatValue(big, price) {
  const value = Big(big).mul(Big(price)).toString();
  const formattedNumber = Number(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
  return formattedNumber;
}

function nanoToMilli(nano) {
  return new Big(nano).div(new Big(10).pow(6)).round().toNumber();
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
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
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
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
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
  const value = Big(big).mul(Big(price)).toString();
  const formattedNumber = Number(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
  return formattedNumber;
}

function nanoToMilli(nano) {
  return new Big(nano).div(new Big(10).pow(6)).round().toNumber();
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
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */

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

/* INCLUDE COMPONENT: "includes/icons/Question.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





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
};/* END_INCLUDE COMPONENT: "includes/icons/Question.jsx" */
const initialValidatorFullData = {
  validatorEpochData: [],
  currentValidators: 0,
  totalStake: 0,
  seatPrice: 0,
  elapsedTime: 0,
  totalSeconds: 0,
  epochProgress: 0,
  validatorTelemetry: {},
  total: 0,
};

function MainComponent({ network, currentPage, setPage }) {
  const [validatorFullData, setValidatorFullData] = useState

(initialValidatorFullData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalSuppy, setTotalSupplay] = useState(0);
  const [expanded, setExpanded] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [latestBlock, setLatestBlock] = useState(0);
  const errorMessage = 'No validator data!';
  const config = getConfig(network);

  const TotalSupply = yoctoToNear(Number(totalSuppy || 0), false);
  useEffect(() => {
    function fetchValidatorData(page) {
      setIsLoading(true);
      asyncFetch(`${config?.backendUrl}validators?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          const data = res.body;
          if (res.status === 200) {
            setTimeRemaining(data?.totalSeconds ?? 0);
            const validators = {
              validatorEpochData: data?.validatorFullData ?? [],
              currentValidators: data?.currentValidators,
              totalStake: data?.totalStake ?? 0,
              seatPrice: data?.epochStatsCheck ?? [],
              elapsedTime: data?.elapsedTimeData ?? 0,
              totalSeconds: data?.totalSeconds ?? 0,
              epochProgress: data?.epochProgressData ?? 0,
              validatorTelemetry: data?.validatorTelemetry ?? [],
              total: data?.total,
            };
            setValidatorFullData((prevData) => ({
              ...prevData,
              [page]: validators || [],
            }));
          }
          setExpanded([]);
        })
        .catch(() => {})

        .finally(() => {
          setIsLoading(false);
        });
    }
    function fetchTotalSuppy() {
      asyncFetch(`${config?.backendUrl}stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          const data = res.body;
          if (res.status === 200) {
            setTotalSupplay(data.stats[0].total_supply || 0);
          }
        })
        .catch(() => {})
        .finally(() => {});
    }
    function fetchLatestBlock() {
      asyncFetch(`${config?.backendUrl}blocks/latests?limit=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          const data = res.body;
          if (res.status === 200) {
            setLatestBlock(data.blocks[0].block_height || 0);
          }
        })
        .catch(() => {})
        .finally(() => {});
    }
    fetchLatestBlock();
    fetchTotalSuppy();
    fetchValidatorData(currentPage);
  }, [config?.backendUrl, currentPage]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleRowClick = (rowIndex) => {
    const isRowExpanded = expanded.includes(rowIndex);

    if (isRowExpanded) {
      setExpanded((prevExpanded) =>
        prevExpanded.filter((index) => index !== rowIndex),
      );
    } else {
      setExpanded((prevExpanded) => [...prevExpanded, rowIndex]);
    }
  };

  const stakingStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'joining':
        return 'Joining';

      case 'leaving':
        return 'Kickout';
      case 'proposal':
        return 'Proposal';
      case 'idle':
        return 'idle';

      case 'newcomer':
        return 'Newcomer';
      case 'onHold':
        return 'On hold';
      default:
        return;
    }
  };
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'active':
        return {
          textColor: 'text-emerald-500',
          bgColor: 'bg-emerald-50 text-emerald-500',
        };
      case 'joining':
        return {
          textColor: 'text-yellow-500',
          bgColor: 'bg-yellow-50 text-yellow-500',
        };
      case 'leaving':
        return {
          textColor: 'text-red-500',
          bgColor: 'bg-red-50 text-red-500',
        };
      case 'proposal':
        return {
          textColor: 'text-teal-900',
          bgColor: 'bg-teal-300 text-teal-900',
        };
      case 'idle':
        return {
          textColor: 'text-gray-600',
          bgColor: 'bg-gray-300 text-gray-600',
        };
      case 'newcomer':
        return {
          textColor: 'text-orange-500',
          bgColor: 'bg-orange-500 text-white',
        };
      case 'onHold':
        return {
          textColor: 'text-blue-500',
          bgColor: 'bg-blue-500 text-white',
        };
      default:
        return {};
    }
  };
  const columns = [
    {
      header: <span></span>,
      key: '',
      cell: (row) => (
        <button onClick={() => handleRowClick(row.index || 0)}>
          <ArrowDown
            className={`${row.isExpanded ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
    },
    {
      header: <span>Status</span>,
      key: 'View',
      cell: (row) => (
        <div
          className={`inline-block ${
            getStatusColorClass(row?.stakingStatus ?? '').bgColor
          } rounded-xl p-1 text-center`}
        >
          <div>{stakingStatusLabel(row?.stakingStatus ?? '')}</div>
        </div>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
    },
    {
      header: <span>VALIDATOR</span>,
      key: 'accountId',
      cell: (row) => (
        <span>
          <a href={`/address/${row.accountId}`} className="hover:no-underline">
            <a className="text-green-500 hover:no-underline">
              {shortenAddress(row.accountId)}
            </a>
          </a>
          <div>{row.publicKey ? shortenAddress(row.publicKey) : ''}</div>
        </span>
      ),
      tdClassName: 'pl-6 py-4 whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
    },
    {
      header: <span>FEE</span>,
      key: 'poolInfo',
      cell: (row) => (
        <div>
          {row?.poolInfo?.fee !== undefined
            ? `${(
                (row?.poolInfo?.fee.numerator /
                  row?.poolInfo?.fee.denominator) *
                100
              ).toFixed(0)}%`
            : 'N/A'}
        </div>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
    },

    {
      header: <span>DELEGATORS</span>,
      key: 'deligators',
      cell: (row) => {
        return (
          <div>
            {row?.poolInfo?.delegatorsCount !== undefined &&
            row.poolInfo.delegatorsCount !== null
              ? formatWithCommas(row.poolInfo.delegatorsCount.toString())
              : 'N/A'}
          </div>
        );
      },
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
    },
    {
      header: <span>TOTAL STAKE</span>,
      key: 'stake',
      cell: (row) => (
        <span>
          {formatWithCommas(
            (row.currentEpoch?.stake ??
              row.nextEpoch?.stake ??
              row.afterNextEpoch?.stake ??
              `${row.contractStake}`).substring(0, 8),
          )}
          Ⓝ
        </span>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>STAKE %</span>,
      key: 'percentage',
      cell: (row) => {
        return <div>{row?.percent}%</div>;
      },
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>CUMULATIVE STAKE</span>,
      key: 'cumulative_stake',
      cell: (row) => {
        return (
          <div>
            <div className="relative w-50 h-7 soft-shadow rounded-xl overflow-hidden bg-gray-300">
              <div
                className="absolute top-0 left-0 right-0 bottom-0 h-full bg-green-500 text-center flex items-center justify-center"
                style={{
                  width: `${row?.cumulativeStake?.cumulativePercent || 0}%`,
                }}
              ></div>
              <span className="absolute  text-white inset-0 flex items-center justify-center">
                {row?.cumulativeStake?.cumulativePercent
                  ? `${row?.cumulativeStake?.cumulativePercent}%`
                  : 'N/A'}
              </span>
            </div>
          </div>
        );
      },
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>STAKE CHANGE (24H)</span>,
      key: '24_change',
      cell: (row) => {
        if (!row?.stakeChange?.value) {
          const visibleStake =
            row?.currentEpoch?.stake ??
            row?.nextEpoch?.stake ??
            row?.afterNextEpoch?.stake ??
            row?.contractStake;
          if (visibleStake) {
            return `${convertAmountToReadableString(
              Math.abs(Number(visibleStake)),
              'seatPriceAmount',
            )}  Ⓝ`;
          }
          return null;
        }
        return (
          <div
            className={`flex ${
              row?.stakeChange.symbol === '+'
                ? 'text-neargreen'
                : 'text-red-500'
            }`}
          >
            <div>{row?.stakeChange?.symbol}</div>
            <p>{row?.stakeChange?.value} Ⓝ</p>
          </div>
        );
      },
      tdClassName: 'px-6 py-4  whitespace-nowrap text-sm text-gray-500 ',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap',
    },
  ];

  const ExpandedRow = (row) => {
    const telemetry =
      validatorFullData[currentPage]?.validatorTelemetry[row.accountId];
    const progress = row?.currentEpoch?.progress;

    const productivityRatio = progress
      ? (progress.blocks.produced + progress.chunks.produced) /
        (progress.blocks.total + progress.chunks.total)
      : 0;
    return (
      <>
        <tr>
          <td colSpan={9} className="bg-gray-50">
            {telemetry && (
              <Widget
                src={`${config?.ownerId}/widget/bos-components.components.Shared.Table`}
                props={{
                  columns: [
                    {
                      header: (
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="flex">
                                <div>Uptime</div>
                                <div>
                                  <Question className="w-4 h-4 fill-current ml-1" />
                                </div>
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className=" h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                              align="start"
                              side="top"
                            >
                              {
                                'Uptime is estimated by the ratio of the number of produced blocks to the number of expected blocks. '
                              }
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      ),
                      key: 'uptime',
                      cell: () => {
                        return (
                          <div className="text-black">
                            {productivityRatio * 100 == 100
                              ? 100
                              : (productivityRatio * 100).toFixed(3)}
                            %
                          </div>
                        );
                      },
                      tdClassName:
                        'px-5 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    {
                      header: (
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="flex">
                                <div>Latest block</div>
                                <div>
                                  <Question className="w-4 h-4 fill-current ml-1" />
                                </div>
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className=" h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                              align="start"
                              side="top"
                            >
                              {
                                'The block height the validation node reported in the most recent telemetry heartbeat.'
                              }
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      ),
                      key: 'latest_block',
                      cell: () => {
                        return (
                          <div
                            className={
                              Math.abs(telemetry.lastHeight - latestBlock) >
                              1000
                                ? 'text-danger'
                                : Math.abs(telemetry.lastHeight - latestBlock) >
                                  50
                                ? 'text-warning'
                                : undefined
                            }
                          >
                            {telemetry?.lastHeight}
                          </div>
                        );
                      },
                      tdClassName:
                        'px-5 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    {
                      header: (
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="flex">
                                <div>Latest Telemetry Update</div>
                                <div>
                                  <Question className="w-4 h-4 fill-current ml-1" />
                                </div>
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className=" h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                              align="start"
                              side="top"
                            >
                              {
                                'Telemetry is a regular notification coming from the nodes which includes generic information like the latest known block height, and the version of NEAR Protocol agent (nearcore).'
                              }
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      ),
                      key: 'telemetry',
                      cell: () => {
                        return (
                          <div className="text-black">
                            {telemetry?.lastSeen &&
                              timeAgo(telemetry?.lastSeen)}
                          </div>
                        );
                      },
                      tdClassName:
                        'px-5 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    {
                      header: (
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="flex">
                                <div>Node Agent Name</div>
                                <div>
                                  <Question className="w-4 h-4 fill-current ml-1" />
                                </div>
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className=" h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                              align="start"
                              side="top"
                            >
                              {
                                'NEAR Protocol could have multiple implementations, so agent is the name of that implementation, where "near-rs" is.'
                              }
                              <a
                                href="https://github.com/near/nearcore"
                                target="_blank"
                                className="text-green-500 hover:no-underline"
                              >
                                the official implementation.
                              </a>
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      ),
                      key: 'agent_name',
                      cell: () => {
                        return (
                          <span className="text-black rounded bg-gray-300 px-1">
                            {telemetry?.agentName}{' '}
                          </span>
                        );
                      },
                      tdClassName:
                        'px-5 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    {
                      header: 'Node Agent Version / Build',
                      key: 'agent_version',
                      cell: () => {
                        return (
                          <span className="text-black rounded bg-gray-300 px-1">{`${telemetry?.agentVersion}/${telemetry?.agentBuild}`}</span>
                        );
                      },
                      tdClassName:
                        'px-5 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                  ],
                  data: [telemetry] || [],
                  isLoading: false,
                  isPagination: false,
                  isExpanded: true,
                }}
              />
            )}
            {row?.description ? (
              <Widget
                src={`${config?.ownerId}/widget/bos-components.components.Shared.Table`}
                props={{
                  columns: [
                    {
                      header: 'Web',
                      key: 'web',
                      cell: (row) => {
                        return (
                          <div>
                            <a
                              className="text-green-500 hover:no-underline"
                              href={
                                row?.description?.url?.startsWith('http')
                                  ? row?.description?.url
                                  : `http://${row?.description?.url}`
                              }
                              rel="noreferrer noopener"
                              target="_blank"
                            >
                              {' '}
                              {row?.description?.url}
                            </a>
                          </div>
                        );
                      },
                      tdClassName:
                        'px-5 pb-4 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    {
                      header: 'Email',
                      key: 'email',
                      cell: (row) => {
                        return (
                          <div>
                            <a
                              className="text-green-500 hover:no-underline"
                              href={`mailto:${row?.description?.email}`}
                            >
                              {row?.description?.email}{' '}
                            </a>
                          </div>
                        );
                      },
                      tdClassName:
                        'pl-6 pb-4 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-6 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    row?.description?.twitter && {
                      header: 'Twitter',
                      key: 'twitter',
                      cell: (row) => {
                        return (
                          <div>
                            <a
                              className="text-green-500 hover:no-underline"
                              href={`https://twitter.com/${row?.description?.twitter}`}
                              rel="noreferrer noopener"
                              target="_blank"
                            >
                              {row?.description?.twitter}
                            </a>
                          </div>
                        );
                      },
                      tdClassName:
                        'px-2 pb-4 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-2 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    row?.description?.discord && {
                      header: 'Discord',
                      key: 'discord',
                      cell: (row) => {
                        return (
                          <div>
                            <a
                              className="text-green-500 hover:no-underline"
                              href={row?.description?.discord}
                              rel="noreferrer noopener"
                              target="_blank"
                            >
                              {row?.description?.discord}
                            </a>
                          </div>
                        );
                      },
                      tdClassName:
                        'px-5 pb-4 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                    {
                      header: 'Description',
                      key: 'description',
                      cell: (row) => {
                        return (
                          <div className="text-gray-400 w-full">
                            <small>{row?.description?.description}</small>
                          </div>
                        );
                      },
                      tdClassName:
                        'px-5 pb-4 whitespace-nowrap text-sm text-gray-500 font-medium',
                      thClassName:
                        'px-5 pt-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
                    },
                  ],
                  data: [row] || [],
                  isLoading: false,
                  isPagination: false,
                  isExpanded: true,
                }}
              />
            ) : (
              <div className="flex justify-center text-sm text-gray-500 font-medium py-4 ">
                If you are node owner feel free to fill all &nbsp;
                <a
                  href="https://github.com/zavodil/near-pool-details#description"
                  className="text-green-500 hover:no-underline"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {' '}
                  data{' '}
                </a>
                &nbsp;to promote your own node!
              </div>
            )}
          </td>
        </tr>
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <div className="h-full bg-white soft-shadow rounded-xl overflow-hidden">
            <div>
              <h2 className=" flex justify-between border-b p-3 text-gray-600 text-sm font-semibold">
                <span>Staking Overview</span>
              </h2>
            </div>
            <div className="px-3 divide-y text-sm text-gray-600">
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                  Current Validators
                </div>
                <div className="w-full md:w-3/4 break-words">
                  {!validatorFullData[currentPage]?.currentValidators ? (
                    <Skeleton className="h-4 w-16 break-words" />
                  ) : (
                    validatorFullData[currentPage]?.currentValidators
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                  Total Staked
                </div>
                <div className="w-full md:w-3/4 break-words">
                  {!validatorFullData[currentPage]?.totalStake ? (
                    <Skeleton className="h-4 w-16 break-words" />
                  ) : (
                    convertAmountToReadableString(
                      validatorFullData[currentPage]?.totalStake,
                      'totalStakeAmount',
                    )
                  )}
                </div>
              </div>
              <div className="flex max-md:divide-y flex-col md:flex-row ">
                <div className="flex items-center justify-between md:w-1/2 py-4">
                  <div className="w-full mb-2 md:mb-0">Current Seat Price</div>
                  <div className="w-full break-words">
                    {!validatorFullData[currentPage]?.seatPrice ? (
                      <Skeleton className="h-4 w-16 break-words" />
                    ) : (
                      <>
                        {convertAmountToReadableString(
                          Number(validatorFullData[currentPage]?.seatPrice),
                          'seatPriceAmount',
                        )}
                        Ⓝ
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between md:w-1/2 py-4">
                  <div className="w-full mb-2 md:mb-0">Total Supply</div>
                  <div className="w-full break-words">
                    {isLoading ? (
                      <Skeleton className="h-4 w-16 break-words" />
                    ) : (
                      <>
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <span>{formatNumber(Number(TotalSupply))}</span>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                              align="center"
                              side="top"
                            >
                              {totalSuppy + ' yoctoⓃ'}
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>{' '}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="h-full bg-white soft-shadow rounded-xl overflow-hidden">
            <h2 className="border-b p-3 text-gray-600 text-sm font-semibold">
              Epoch Information
            </h2>
            <div className="px-3 divide-y text-sm text-gray-600">
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                  Epoch Elapsed Time
                </div>
                <div className="w-full text-green-500 md:w-3/4 break-words">
                  {!validatorFullData[currentPage]?.elapsedTime ? (
                    <Skeleton className="h-3 w-32" />
                  ) : (
                    convertTimestampToTime(
                      validatorFullData[currentPage]?.elapsedTime,
                    )
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">ETA</div>
                <div className="w-full md:w-3/4 text-green-500 break-words">
                  {!validatorFullData[currentPage]?.totalSeconds ? (
                    <Skeleton className="h-3 w-32" />
                  ) : (
                    convertTimestampToTime(timeRemaining)
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">Progress</div>
                <div className="w-full md:w-3/4 break-words">
                  {!validatorFullData[currentPage]?.epochProgress ? (
                    <Skeleton className="h-3 w-full" />
                  ) : (
                    <div className="flex space-x-4 gap-2 items-center ">
                      <div className="bg-blue-900-15  h-2 w-full rounded-full">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${validatorFullData[
                              currentPage
                            ]?.epochProgress.toFixed(1)}%`,
                          }}
                        ></div>
                      </div>
                      {`${validatorFullData[currentPage]?.epochProgress.toFixed(
                        0,
                      )}%`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5"></div>
      <div className="w-full mb-10">
        <div className="bg-white soft-shadow rounded-xl pb-1">
          <div className="flex flex-col pt-4">
            <div className="flex flex-col">
              {isLoading ? (
                <div className="leading-7 max-w-lg w-full pl-3 py-1.5 text-sm mb-4 text-gray-500">
                  <Skeleton className=" h-4 break-words" />
                </div>
              ) : (
                <div className="leading-7 pl-3 px-3 text-sm mb-4 text-gray-500">
                  {validatorFullData[currentPage]?.total || 0}
                  Validators found
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <Widget
                src={`${config?.ownerId}/widget/bos-components.components.Shared.Table`}
                props={{
                  columns: columns,
                  data: validatorFullData[currentPage]?.validatorEpochData,
                  count: validatorFullData[currentPage]?.total,
                  isLoading: isLoading,
                  renderRowSubComponent: ExpandedRow,
                  expanded,
                  isPagination: true,
                  page: currentPage,
                  limit: 25,
                  pageLimit: 999,
                  setPage: setPage,
                  Error: errorMessage,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

return MainComponent(props, context);