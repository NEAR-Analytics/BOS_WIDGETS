/**
 * Component: FTTokenFilter
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Fungible Token Filter on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The token identifier passed as a string
 * @param {string} [tokenFilter] - The token filter identifier passed as a string
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
/* INCLUDE COMPONENT: "includes/icons/FaAddressBook.jsx" */
const FaAddressBook = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      color="#db9a04"
      height="10"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-228-32c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H118.4C106 384 96 375.4 96 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"
        fill="#db9a04"
      ></path>
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaAddressBook.jsx" */
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
function decodeArgs(args) {
  if (!args || typeof args === 'undefined') return {};

  const encodedString = Buffer.from(args).toString('base64');
  return JSON.parse(Buffer.from(encodedString, 'base64').toString());
}

function txnMethod(
  actions,
  t,
) {
  const count = actions?.length || 0;

  if (!count) return t ? t('txns:unknownType') : 'Unknown';
  if (count > 1) return t ? t('txns:batchTxns') : 'Batch Transaction';

  const action = actions[0];

  if (action.action === 'FUNCTION_CALL') {
    return action.method;
  }

  return action.action;
}

function gasPrice(yacto) {
  const near = Big(yoctoToNear(yacto, false)).mul(Big(10).pow(12)).toString();

  return `${localFormat(near)} Ⓝ / Tgas`;
}

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
    const kind = Object.keys(action)[0];

    return {
      action_kind: kind,
      args: action[kind],
    };
  }

  return null;
}

function valueFromObj(obj) {
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

function formatLine(line, offset, format) {
  let result = `${offset.toString(16).padStart(8, '0')}  `;

  const hexValues = line.match(/[0-9a-fA-F]{2}/g) || [];

  hexValues.forEach((byte, index) => {
    if (index > 0 && index % 4 === 0) {
      result += ' ';
    }
    result += byte.toUpperCase().padEnd(2, ' ') + ' ';
  });

  if (format === 'twos') {
    result = result.replace(/(.{4})/g, '$1 ');
  } else if (format === 'default') {
    result += ` ${String.fromCharCode(
      ...hexValues.map((b) => parseInt(b, 16)),
    )}`;
  }

  return result.trimEnd();
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
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
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
function encodeArgs(args) {
  if (!args || typeof args === 'undefined') return '';

  return Buffer.from(JSON.stringify(args)).toString('base64');
}

function decodeArgs(args) {
  if (!args || typeof args === 'undefined') return {};

  const encodedString = Buffer.from(args).toString('base64');
  return JSON.parse(Buffer.from(encodedString, 'base64').toString());
}

function txnMethod(
  actions,
  t,
) {
  const count = actions?.length || 0;

  if (!count) return t ? t('txns:unknownType') : 'Unknown';
  if (count > 1) return t ? t('txns:batchTxns') : 'Batch Transaction';

  const action = actions[0];

  if (action.action === 'FUNCTION_CALL') {
    return action.method;
  }

  return action.action;
}

function gasPrice(yacto) {
  const near = Big(yoctoToNear(yacto, false)).mul(Big(10).pow(12)).toString();

  return `${localFormat(near)} Ⓝ / Tgas`;
}

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
    const kind = Object.keys(action)[0];

    return {
      action_kind: kind,
      args: action[kind],
    };
  }

  return null;
}

function valueFromObj(obj) {
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

function formatLine(line, offset, format) {
  let result = `${offset.toString(16).padStart(8, '0')}  `;

  const hexValues = line.match(/[0-9a-fA-F]{2}/g) || [];

  hexValues.forEach((byte, index) => {
    if (index > 0 && index % 4 === 0) {
      result += ' ';
    }
    result += byte.toUpperCase().padEnd(2, ' ') + ' ';
  });

  if (format === 'twos') {
    result = result.replace(/(.{4})/g, '$1 ');
  } else if (format === 'default') {
    result += ` ${String.fromCharCode(
      ...hexValues.map((b) => parseInt(b, 16)),
    )}`;
  }

  return result.trimEnd();
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
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();

  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
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













function MainComponent({ network, id, tokenFilter }) {
  const [ft, setFT] = useState({} );
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState(
    {} ,
  );

  const config = getConfig(network);

  useEffect(() => {
    function fetchInventoryData() {
      setInventoryLoading(true);
      asyncFetch(`${config?.backendUrl}account/${tokenFilter}/inventory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const response = data?.body?.inventory;
            if (data.status === 200) {
              setInventoryData(response);
            }
            setInventoryLoading(false);
          },
        )
        .catch(() => {});
    }
    fetchInventoryData();
  }, [config.backendUrl, tokenFilter]);

  useEffect(() => {
    function ftBalanceOf(contracts, account_id) {
      return asyncFetch(`${config?.rpcUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'call_function',
            finality: 'final',
            account_id: contracts,
            method_name: 'ft_balance_of',
            args_base64: encodeArgs({ account_id }),
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res



) => {
            return res;
          },
        )
        .then(
          (data



) => {
            const resp = data?.body?.result;
            return decodeArgs(resp.result);
          },
        )
        .catch(() => {});
    }

    function loadBalances() {
      setInventoryLoading(true);
      const fts =
        inventoryData?.fts &&
        inventoryData?.fts.filter((f) => id == f.contract);

      if (!fts?.length) {
        if (fts?.length === 0) setInventoryLoading(false);
        return;
      }

      let total = Big(0);

      const tokens = [];

      const pricedTokens = [];

      Promise.all(
        fts.map((ft) => {
          return ftBalanceOf(ft.contract, tokenFilter).then((rslt) => {
            return { ...ft, amount: rslt };
          });
        }),
      ).then((results) => {
        results.forEach((rslt) => {
          const ftrslt = rslt;
          const amount = rslt?.amount;

          let sum = Big(0);

          let rpcAmount = Big(0);

          if (amount) {
            rpcAmount = ftrslt.ft_metas?.decimals
              ? Big(amount).div(Big(10).pow(ftrslt.ft_metas?.decimals))
              : 0;
          }

          if (ftrslt.ft_metas?.price) {
            sum = rpcAmount.mul(Big(ftrslt.ft_metas?.price));
            total = total.add(sum);

            return pricedTokens.push({
              ...ftrslt,
              amountUsd: sum.toString(),
              rpcAmount: rpcAmount.toString(),
            });
          }

          return tokens.push({
            ...ftrslt,
            amountUsd: sum.toString(),
            rpcAmount: rpcAmount.toString(),
          });
        });

        setFT({
          amount: total.toString(),
          tokens: [...pricedTokens, ...tokens],
        });

        setInventoryLoading(false);
      });
    }

    loadBalances();
  }, [inventoryData?.fts, id, tokenFilter, config?.rpcUrl]);

  const filterToken = ft?.tokens?.length
    ? ft?.tokens[0]
    : ({} );

  return (
    <>
      {tokenFilter && (
        <div className="py-2">
          <div className="bg-white soft-shadow rounded-xl  px-2 py-3">
            <div className="grid md:grid-cols-3 grid-cols-1 divide-y md:divide-y-0 md:divide-x">
              <div className="px-4 md:py-0 py-2">
                <div className="flex items-center">
                  <FaAddressBook />
                  <h5 className="text-xs my-1 font-bold ml-1 ">
                    FILTERED BY TOKEN HOLDER
                  </h5>
                </div>
                <h5 className="text-sm my-1 font-bold text-green-500 truncate md:max-w-[200px] lg:max-w-[310px] xl:max-w-full max-w-full inline-block">
                  <a
                    href={`/address/${tokenFilter}`}
                    className="hover:no-underline"
                  >
                    <a className="hover:no-underline">{tokenFilter}</a>
                  </a>
                </h5>
              </div>
              <div className="px-4 md:py-0 py-2">
                <p className="text-xs my-1 text-nearblue-600">BALANCE</p>

                {inventoryLoading ? (
                  <Skeleton className="w-40" />
                ) : (
                  <p className="text-sm my-1">
                    {Number(filterToken?.rpcAmount)
                      ? localFormat(filterToken?.rpcAmount)
                      : ''}
                  </p>
                )}
              </div>
              <div className="px-4 md:py-0 py-2">
                <p className="text-xs my-1 text-nearblue-600">VALUE</p>

                {inventoryLoading ? (
                  <Skeleton className="w-40" />
                ) : (
                  <p className="text-sm my-1 flex">
                    {ft?.amount ? '$' + dollarFormat(ft?.amount) : ''}
                    <span>
                      {filterToken?.ft_metas?.price && (
                        <div className="text-gray-400 ml-2">
                          @{filterToken?.ft_metas?.price}
                        </div>
                      )}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

return MainComponent(props, context);