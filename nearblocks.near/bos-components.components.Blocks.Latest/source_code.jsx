/**
 * Component: BlocksLatest
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Latest Blocks on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {React.FC<{
 *   href: string;
 *   children: React.ReactNode;
 *   className?: string;
 * }>} Link - A React component for rendering links.
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
/* END_INCLUDE: "includes/formats.jsx" */
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
/* END_INCLUDE: "includes/libs.jsx" */


function MainComponent({ network, t, Link }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const config = getConfig(network);

  useEffect(() => {
    let delay = 5000;

    function fetchLatestBlocks() {
      asyncFetch(`${config?.backendUrl}blocks/latest`)
        .then((data) => {
          const resp = data?.body?.blocks;
          if (data.status === 200) {
            setBlocks(resp);
            setError(false);
            if (isLoading) setIsLoading(false);
          } else {
            handleRateLimit(data, fetchLatestBlocks, () => {
              if (isLoading) setIsLoading(false);
            });
          }
        })
        .catch(() => {
          setError(true);
        });
    }

    fetchLatestBlocks();

    const interval = setInterval(fetchLatestBlocks, delay);

    return () => clearInterval(interval);
  }, [config.backendUrl, isLoading]);

  return (
    <>
      <div className="relative">
        <ScrollArea.Root>
          <ScrollArea.Viewport>
            {!blocks && error && (
              <div className="flex items-center h-16 mx-3 py-2 text-nearblue-700 text-xs">
                {t ? t('home:error') : 'Error!'}
              </div>
            )}
            {!error && !isLoading && blocks?.length === 0 && (
              <div className="flex items-center h-16 mx-3 py-2 text-nearblue-700 text-xs">
                {t ? t('home:noBlocks') : 'No blocks found'}
              </div>
            )}
            {isLoading && blocks?.length === 0 && (
              <div className="px-3 divide-y h-80">
                {[...Array(5)].map((_, i) => (
                  <div
                    className="grid grid-cols-2 md:grid-cols-3 gap-3 py-3"
                    key={i}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-xl h-10 w-10 bg-blue-900/10 flex items-center justify-center text-sm">
                        BK
                      </div>
                      <div className="px-2">
                        <div className="text-green-500 text-sm">
                          <div className="h-5 w-14">
                            <Skeleton className="h-4" />
                          </div>
                        </div>
                        <div className="text-nearblue-700 text-xs">
                          <div className="h-4 w-24">
                            <Skeleton className="h-3" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1 px-2 order-2 md:order-1 text-sm">
                      <div className="h-5 w-36">
                        <Skeleton className="h-4" />
                      </div>
                      <div className="text-nearblue-700 text-sm">
                        <div className="h-5 w-14">
                          <Skeleton className="h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="text-right order-1 md:order-2">
                      <div className="ml-auto w-32">
                        <Skeleton className="h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {blocks?.length > 0 && (
              <div className="px-3 divide-y h-80">
                {blocks?.map((block) => {
                  return (
                    <div
                      className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:gap-3 py-3"
                      key={block?.block_hash}
                    >
                      <div className=" flex items-center">
                        <div className="flex-shrink-0 rounded-xl h-10 w-10 bg-blue-900/10 flex items-center justify-center text-sm">
                          BK
                        </div>
                        <div className="overflow-hidden pl-2">
                          <div className="text-green-500 text-sm font-medium ">
                            <Link
                              href={`/blocks/${block?.block_hash}`}
                              className="hover:no-underline"
                            >
                              <a className="text-green-500 hover:no-underline">
                                {block?.block_height
                                  ? localFormat(block?.block_height)
                                  : block?.block_height ?? ''}
                              </a>
                            </Link>
                          </div>
                          <div className="text-nearblue-700 text-xs truncate">
                            {block?.block_timestamp
                              ? getTimeAgoString(
                                  nanoToMilli(block?.block_timestamp),
                                )
                              : ''}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 md:col-span-1 px-2 order-2 md:order-1 text-sm whitespace-nowrap truncate">
                        {t ? t('home:blockMiner') : 'Author'}{' '}
                        <Link
                          href={`/address/${block?.author_account_id}`}
                          className="hover:no-underline"
                        >
                          <a className="text-green-500 font-medium hover:no-underline">
                            {block?.author_account_id}
                          </a>
                        </Link>
                        <div className="text-nearblue-700 text-sm ">
                          {block?.transactions_agg?.count
                            ? localFormat(block?.transactions_agg?.count)
                            : block?.transactions_agg?.count ?? ''}{' '}
                          txns{' '}
                        </div>
                      </div>
                      <div className="text-right order-1 md:order-2 overflow-hidden">
                        <Tooltip.Provider>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <span className="u-label--badge-in text-nearblue-700 truncate">
                                {block?.chunks_agg?.gas_used
                                  ? convertToMetricPrefix(
                                      block?.chunks_agg?.gas_used,
                                    ) + 'gas'
                                  : block?.chunks_agg?.gas_used ?? '' + 'gas'}
                              </span>
                            </Tooltip.Trigger>
                            <Tooltip.Content
                              className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-white text-xs p-2"
                              sideOffset={5}
                            >
                              Gas used
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
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
      {isLoading && blocks?.length === 0 && (
        <div className="border-t px-2 py-3 text-nearblue-600">
          <Skeleton className="h-10" />
        </div>
      )}
      {blocks && blocks?.length > 0 && (
        <div className="border-t px-2 py-3 text-nearblue-600">
          <Link href="/blocks">
            <a className="block text-center border border-green-900/10 bg-green-500 hover:bg-green-400 font-thin text-white text-xs py-3 rounded w-full focus:outline-none hover:no-underline">
              View all blocks
            </a>
          </Link>
        </div>
      )}
    </>
  );
}

return MainComponent(props, context);