/**
 * Component: Accounts
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Accounts component enable users to view information related to their accounts.
 * @interface Props
 * @param {string} [id] - The account identifier passed as a string.
 * @param {boolean} [fetchStyles] - Use Nearblock styles.
 */






/* INCLUDE COMPONENT: "includes/Common/Skelton.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Skelton = (props) => {
  return (
    <div
      className={`bg-gray-200 h-5 rounded shadow-sm animate-pulse ${props.className}`}
    ></div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Skelton.jsx" */
/* INCLUDE COMPONENT: "includes/icons/FaExternalLinkAlt.jsx" */
const FaExternalLinkAlt = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaExternalLinkAlt.jsx" */
/* INCLUDE: "includes/libs.jsx" */
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();
  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}

function fiatValue(big, price) {
  // @ts-ignore
  const value = Big(big).mul(Big(price)).toString();
  const formattedNumber = Number(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
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
  return str.substring(0, maxLength - suffix.length) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api-testnet-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
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
function fiatValue(big, price) {
  // @ts-ignore
  const value = Big(big).mul(Big(price)).toString();
  const formattedNumber = Number(value).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
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
  return str.substring(0, maxLength - suffix.length) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api-testnet-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
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
  return str.substring(0, maxLength - suffix.length) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api-testnet-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
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
  return str.substring(0, maxLength - suffix.length) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api-testnet-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
}
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api-testnet-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
}
/* END_INCLUDE: "includes/libs.jsx" */
/* INCLUDE: "includes/formats.jsx" */
function dollarFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
}

function weight(number) {
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  return number.toFixed(2) + ' ' + suffixes[suffixIndex];
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
  const formattedDate =
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
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return 'a few seconds ago';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    }

    return formattedDate;
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

  if (intervals.year > 1) {
    return Math.floor(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.floor(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.floor(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.floor(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.floor(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.floor(intervals.minute) + ' minutes ago';
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

function convertToMetricPrefix(number) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let count = 0;
  while (Math.abs(number) >= 1000 && count < prefixes.length - 1) {
    number /= 1000;
    count++;
  }

  return number.toFixed(2) + prefixes[count];
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
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();
  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}

function dollarFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
}

function weight(number) {
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  return number.toFixed(2) + ' ' + suffixes[suffixIndex];
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
  const formattedDate =
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
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return 'a few seconds ago';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    }

    return formattedDate;
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

  if (intervals.year > 1) {
    return Math.floor(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.floor(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.floor(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.floor(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.floor(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.floor(intervals.minute) + ' minutes ago';
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

function convertToMetricPrefix(number) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let count = 0;
  while (Math.abs(number) >= 1000 && count < prefixes.length - 1) {
    number /= 1000;
    count++;
  }

  return number.toFixed(2) + prefixes[count];
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
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();
  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function weight(number) {
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  return number.toFixed(2) + ' ' + suffixes[suffixIndex];
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
  const formattedDate =
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
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return 'a few seconds ago';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    }

    return formattedDate;
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

  if (intervals.year > 1) {
    return Math.floor(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.floor(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.floor(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.floor(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.floor(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.floor(intervals.minute) + ' minutes ago';
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

function convertToMetricPrefix(number) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let count = 0;
  while (Math.abs(number) >= 1000 && count < prefixes.length - 1) {
    number /= 1000;
    count++;
  }

  return number.toFixed(2) + prefixes[count];
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
  const formattedDate =
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
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return 'a few seconds ago';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    }

    return formattedDate;
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

  if (intervals.year > 1) {
    return Math.floor(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.floor(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.floor(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.floor(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.floor(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.floor(intervals.minute) + ' minutes ago';
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

function convertToMetricPrefix(number) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let count = 0;
  while (Math.abs(number) >= 1000 && count < prefixes.length - 1) {
    number /= 1000;
    count++;
  }

  return number.toFixed(2) + prefixes[count];
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








const TokenImage = (props) => {
  const placeholder = `${props.appUrl}images/tokenplaceholder.svg`;

  return (
    <img
      src={props.src || placeholder}
      alt={props.alt}
      className={props.className}
    />
  );
};/* END_INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */
/* INCLUDE COMPONENT: "includes/Common/TokenHoldings.jsx" */
/**
 * @interface Props
 * @param {string} [id] - Optional identifier for the account, passed as a string.
 * @param {boolean} [loading] - Flag indicating whether data is currently loading.
 * @param {InventoryInfo} [data] - Information related to the inventory.
 * @param {Object} [ft] - Object containing details about the tokens.
 * @param {number} [ft.amount] -  amount in USD of tokens.
 * @param {Object[]} [ft.tokens] - Array containing 'TokenListInfo' objects, providing information about individual token details.
 * @param {string} [appUrl] - The URL of the application.
 */

/* INCLUDE: "includes/libs.jsx" */
function truncateString(str, maxLength, suffix) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.substring(0, maxLength - suffix.length) + suffix;
}

function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api-testnet-beta.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
}
/* END_INCLUDE: "includes/libs.jsx" */
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
};
/* INCLUDE: "includes/formats.jsx" */
function dollarFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
}

function weight(number) {
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  return number.toFixed(2) + ' ' + suffixes[suffixIndex];
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
  const formattedDate =
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
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return 'a few seconds ago';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    }

    return formattedDate;
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

  if (intervals.year > 1) {
    return Math.floor(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.floor(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.floor(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.floor(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.floor(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.floor(intervals.minute) + ' minutes ago';
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

function convertToMetricPrefix(number) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let count = 0;
  while (Math.abs(number) >= 1000 && count < prefixes.length - 1) {
    number /= 1000;
    count++;
  }

  return number.toFixed(2) + prefixes[count];
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
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();
  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}

function dollarFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formattedNumber;
}

function weight(number) {
  const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let suffixIndex = 0;

  while (number >= 1000 && suffixIndex < suffixes.length - 1) {
    number /= 1000;
    suffixIndex++;
  }

  return number.toFixed(2) + ' ' + suffixes[suffixIndex];
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
  const formattedDate =
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
    const currentDate = new Date();
    const differenceInSeconds = Math.floor(
      (currentDate.getTime() - date.getTime()) / 1000,
    );

    if (differenceInSeconds < 60) {
      return 'a few seconds ago';
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return minutes + ' minute' + (minutes !== 1 ? 's' : '') + ' ago';
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return hours + ' hour' + (hours !== 1 ? 's' : '') + ' ago';
    }

    return formattedDate;
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

  if (intervals.year > 1) {
    return Math.floor(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.floor(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.floor(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.floor(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.floor(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.floor(intervals.minute) + ' minutes ago';
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

function convertToMetricPrefix(number) {
  const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y']; // Metric prefixes

  let count = 0;
  while (Math.abs(number) >= 1000 && count < prefixes.length - 1) {
    number /= 1000;
    count++;
  }

  return number.toFixed(2) + prefixes[count];
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
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();
  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
/* END_INCLUDE: "includes/formats.jsx" */













const TokenHoldings = (props) => {
  const Loading = (props) => {
    return (
      <div
        className={`bg-gray-200 h-5 rounded shadow-sm animate-pulse ${props.className}`}
      ></div>
    );
  };

  const nfts = props.data?.nfts || [];

  if (props.loading) {
    return <Loading className="h-full" wrapperClassName="flex w-full h-7" />;
  }

  if (!props.ft?.tokens?.length && !nfts?.length) {
    return (
      <select className="appearance-none w-full h-8 text-xs px-2 outline-none rounded bg-white border">
        <option>N/A</option>
      </select>
    );
  }
  return (
    <Select.Root>
      <Select.Trigger className="w-80 h-8 text-sm px-2 rounded border outline-none flex items-center justify-between cursor-pointer">
        <span>
          ${dollarFormat(props.ft?.amount || 0)}{' '}
          <span className="bg-green-500 text-xs text-white rounded ml-2 px-1 p-1">
            {(props.ft?.tokens?.length || 0) + (nfts?.length || 0)}
          </span>
        </span>
        <ArrowDown className="w-4 h-4 fill-current text-gray-500 pointer-events-none" />
      </Select.Trigger>
      <Select.Content>
        <ScrollArea.Root className="w-80 h-72 rounded overflow-hidden shadow-[0_2px_10px] drop-shadow-md bg-white">
          <ScrollArea.Viewport className="w-full h-full rounded  bg-white w-full rounded-b-lg shadow border z-50 pb-2">
            <div className="max-h-60">
              {props.ft?.tokens?.length > 0 && (
                <>
                  <div className="bg-gray-50 font-semibold px-3 py-2">
                    Tokens{' '}
                    <span className="font-normal">
                      ({props.ft?.tokens?.length})
                    </span>
                  </div>
                  <div className="text-gray-600 text-xs divide-y outline-none">
                    {props.ft?.tokens?.map((token, index) => (
                      <a
                        href={`/token/${token.contract}?a=${props.id}`}
                        className="no-underline hover:no-underline"
                        key={token.contract}
                      >
                        <a className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 truncate no-underline">
                          <div key={index}>
                            <div className="flex items-center">
                              <div className="flex mr-1">
                                <img
                                  src={
                                    token.ft_meta?.icon ||
                                    `${props.appUrl}images/tokenplaceholder.svg`
                                  }
                                  alt={token.ft_meta?.name}
                                  className="w-4 h-4"
                                />
                              </div>
                              <span>
                                {truncateString(token.ft_meta?.name, 15, '...')}{' '}
                                ({token.ft_meta?.symbol})
                              </span>
                            </div>
                            <div className="text-gray-400 flex items-center mt-1">
                              {localFormat(token?.rpcAmount)}
                            </div>
                          </div>
                          {token.ft_meta?.price && (
                            <div className="text-right">
                              <div>${dollarFormat(token.amountUsd)}</div>
                              <div className="text-gray-400">
                                @{Big(token.ft_meta?.price).toString()}
                              </div>
                            </div>
                          )}
                        </a>
                      </a>
                    ))}
                  </div>
                </>
              )}
              {nfts?.length > 0 && (
                <>
                  <div className="bg-gray-50 font-semibold px-3 py-2">
                    NFT Tokens{' '}
                    <span className="font-normal">({nfts?.length})</span>
                  </div>
                  <div className="text-gray-600 text-xs divide-y outline-none">
                    {nfts.map((nft) => (
                      <a
                        href={`/nft-token/${nft.contract}?a=${props.id}`}
                        className="hover:no-underline"
                        key={nft.contract}
                      >
                        <a className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 truncate hover:no-underline">
                          <div>
                            <div className="flex items-center">
                              <div className="flex mr-1">
                                <img
                                  src={
                                    nft.nft_meta?.icon ||
                                    `${props.appUrl}images/tokenplaceholder.svg`
                                  }
                                  alt={nft.nft_meta?.name}
                                  className="w-4 h-4"
                                />
                              </div>
                              <span>
                                {truncateString(nft.nft_meta?.name, 15, '...')}(
                                {nft.nft_meta?.symbol})
                              </span>
                            </div>
                            <div className="text-gray-400 flex items-center mt-1">
                              {localFormat(nft.quantity)}
                            </div>
                          </div>
                        </a>
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-gray-400 transition-colors duration-[160ms] ease-out hover:bg-blend-darken data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-gray-400 transition-colors duration-[160ms] ease-out hover:bg-blend-darken data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="flex-1 bg-gray-400 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-black-500" />
        </ScrollArea.Root>
      </Select.Content>
    </Select.Root>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/TokenHoldings.jsx" */
/* INCLUDE: "includes/near.jsx" */
function encodeArgs(args) {
  if (!args || typeof args === 'undefined') return '';

  return Buffer.from(JSON.stringify(args)).toString('base64');
}
function decodeArgs(args) {
  if (!args || typeof args === 'undefined') return {};

  const encodedString = Buffer.from(args).toString('base64');
  return JSON.parse(Buffer.from(encodedString, 'base64').toString());
}

function txnMethod(actions) {
  const count = actions?.length || 0;

  if (!count) return 'Unknown';
  if (count > 1) return 'Batch Transaction';

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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();
  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function decodeArgs(args) {
  if (!args || typeof args === 'undefined') return {};

  const encodedString = Buffer.from(args).toString('base64');
  return JSON.parse(Buffer.from(encodedString, 'base64').toString());
}

function txnMethod(actions) {
  const count = actions?.length || 0;

  if (!count) return 'Unknown';
  if (count > 1) return 'Batch Transaction';

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
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
function yoctoToNear(yocto, format) {
  const YOCTO_PER_NEAR = Big(10).pow(24).toString();
  const near = Big(yocto).div(YOCTO_PER_NEAR).toString();

  return format ? localFormat(near) : near;
}
function localFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 5,
  });
  return formattedNumber;
}
/* END_INCLUDE: "includes/near.jsx" */














function MainComponent(props) {
  const [loading, setLoading] = useState(false);
  const [statsData, setStatsData] = useState({} );
  const [accountData, setAccountData] = useState(
    {} ,
  );
  const [deploymentData, setDeploymentData] = useState(
    {} ,
  );
  const [tokenData, setTokenData] = useState({} );
  const [inventoryData, setInventoryData] = useState(
    {} ,
  );
  const [contract, setContract] = useState({} );
  const [ft, setFT] = useState({} );
  const [code, setCode] = useState({} );
  const [key, setKey] = useState({} );
  const [css, setCss] = useState({});

  /**
   * Fetches styles asynchronously from a nearblocks gateway.
   */
  function fetchStyles() {
    asyncFetch('https://beta.nearblocks.io/common.css').then(
      (res) => {
        if (res?.body) {
          setCss(res.body);
        }
      },
    );
  }

  const config = getConfig(context.networkId);

  useEffect(() => {
    function fetchStatsData() {
      asyncFetch(`${config?.backendUrl}stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data



) => {
            const statsResp = data?.body?.stats?.[0];
            setStatsData({ near_price: statsResp.near_price });
          },
        )
        .catch(() => {});
    }

    function fetchAccountData() {
      asyncFetch(`${config?.backendUrl}account/${props.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data



) => {
            const accountResp = data?.body?.account?.[0];
            setAccountData({
              account_id: accountResp.account_id,
              amount: accountResp.amount,
              code_hash: accountResp.code_hash,
              created: accountResp.created,
              deleted: accountResp.deleted,
              locked: accountResp.locked,
              storage_usage: accountResp.storage_usage,
            });
          },
        )
        .catch(() => {});
    }

    function fetchContractData() {
      asyncFetch(
        `${config?.backendUrl}account/${props.id}/contract/deployments`,
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
            const depResp = data?.body?.deployments?.[0];
            setDeploymentData({
              block_timestamp: depResp.block_timestamp,
              receipt_predecessor_account_id:
                depResp.receipt_predecessor_account_id,
              transaction_hash: depResp.transaction_hash,
            });
          },
        )
        .catch(() => {});
    }

    function fetchTokenData() {
      asyncFetch(`${config?.backendUrl}fts/${props.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data



) => {
            const tokenResp = data?.body?.contracts?.[0];
            setTokenData({
              name: tokenResp.name,
              icon: tokenResp.icon,
              symbol: tokenResp.symbol,
              price: tokenResp.price,
              website: tokenResp.website,
            });
          },
        )
        .catch(() => {});
    }

    function fetchInventoryData() {
      asyncFetch(`${config?.backendUrl}account/${props.id}/inventory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data



) => {
            const response = data?.body?.inventory;
            setInventoryData({
              fts: response.fts,
              nfts: response.nfts,
            });
          },
        )
        .catch(() => {});
    }

    fetchStatsData();
    fetchAccountData();
    fetchContractData();
    fetchTokenData();
    fetchInventoryData();
  }, [config?.backendUrl, props.id]);

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
      const fts = inventoryData.fts;
      if (!fts?.length) {
        if (fts?.length === 0) setLoading(false);
        return;
      }

      let total = Big(0);

      const tokens = [];

      const pricedTokens = [];

      Promise.all(
        fts.map((ft) => {
          return ftBalanceOf(ft.contract, props.id).then((rslt) => {
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
            rpcAmount = Big(amount).div(Big(10).pow(ftrslt.ft_meta?.decimals));
          }

          if (ftrslt.ft_meta?.price) {
            sum = rpcAmount.mul(Big(ftrslt.ft_meta?.price));
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

        tokens.sort((a, b) => {
          const first = Big(a.rpcAmount);

          const second = Big(b.rpcAmount);

          if (first.lt(second)) return 1;
          if (first.gt(second)) return -1;

          return 0;
        });

        pricedTokens.sort((a, b) => {
          const first = Big(a.amountUsd);

          const second = Big(b.amountUsd);

          if (first.lt(second)) return 1;
          if (first.gt(second)) return -1;

          return 0;
        });
        setFT({
          amount: total.toString(),
          tokens: [...pricedTokens, ...tokens],
        });

        setLoading(false);
      });
    }

    loadBalances();
  }, [inventoryData?.fts, props.id, config?.rpcUrl]);

  useEffect(() => {
    if (props?.fetchStyles) fetchStyles();
  }, [props?.fetchStyles]);

  const Theme = styled.div`
    ${css}
  `;

  useEffect(() => {
    function contractCode(address) {
      asyncFetch(`${config?.rpcUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'view_code',
            finality: 'final',
            account_id: address,
            prefix_base64: '',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res



) => {
            const resp = res?.body?.result;
            setCode({
              block_hash: resp.block_hash,
              block_height: resp.block_height,
              code_base64: resp.code_base64,
              hash: resp.hash,
            });
          },
        )
        .catch(() => {});
    }

    function viewAccessKeys(address) {
      asyncFetch(`${config?.rpcUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'view_access_key_list',
            finality: 'final',
            account_id: address,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res



) => {
            const resp = res?.body?.result;
            setKey({
              block_hash: resp.block_hash,
              block_height: resp.block_height,
              keys: resp.keys,
              hash: resp.hash,
            });
          },
        )
        .catch(() => {});
    }

    function loadSchema() {
      if (!props.id) return;

      Promise.all([contractCode(props.id), viewAccessKeys(props.id)]);
    }
    loadSchema();
  }, [props.id, config?.rpcUrl]);

  if (code?.code_base64) {
    const locked = (key.keys || []).every(
      (key





) => key.access_key.permission !== 'FullAccess',
    );

    setContract({ ...code, locked });
  }
  return (
    <Theme>
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between flex-wrap pt-4">
          {!props.id ? (
            <Skelton />
          ) : (
            <h1 className="flex items-center justify-between break-all space-x-2 text-xl text-gray-700 leading-8 px-2">
              Near Account: @&nbsp;{' '}
              {props?.id && (
                <span className="font-semibold text-green-500 ">
                  {' '}
                  {'  ' + props.id}
                </span>
              )}
              {
                <Widget
                  src={`${config.ownerId}/widget/bos-components.components.Shared.Buttons`}
                  props={{
                    id: props.id,
                    config: config,
                  }}
                />
              }
            </h1>
          )}
          {
            <Widget
              src={`${config.ownerId}/widget/bos-components.components.Shared.SponsoredBox`}
            />
          }
        </div>
        <div className="text-gray-500 px-2 pt-1 border-t">
          {
            <Widget
              src={`${config.ownerId}/widget/bos-components.components.Shared.SponsoredText`}
              props={{
                textColor: false,
              }}
            />
          }
        </div>

        <div className="flex gap-2 mb-2 md:mb-2 mt-10">
          <div className="w-full">
            <div className="h-full bg-white soft-shadow rounded-lg">
              <div className="flex justify-between border-b p-3 text-gray-600">
                <h2 className="leading-6 text-sm font-semibold">Overview</h2>
                {tokenData?.name && (
                  <div className="flex items-center text-xs bg-gray-100 rounded-md px-2 py-1">
                    <div className="truncate max-w-[110px]">
                      {tokenData.name}
                    </div>
                    {tokenData.website && (
                      <a
                        href={tokenData.website}
                        className="ml-1"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="px-3 divide-y text-sm text-gray-600">
                <div className="flex py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0">Balance:</div>
                  {loading ? (
                    <Skelton />
                  ) : (
                    <div className="w-full md:w-3/4">
                      {yoctoToNear(accountData?.amount || 0, true)} Ⓝ
                    </div>
                  )}
                </div>
                {context.networkId === 'mainnet' && statsData?.near_price && (
                  <div className="flex py-4 text-sm text-gray-600">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0">Value</div>
                    {loading ? (
                      <Skelton />
                    ) : (
                      <div className="w-full md:w-3/4 break-words">
                        $
                        {fiatValue(
                          yoctoToNear(accountData.amount || 0, false),
                          statsData.near_price,
                        )}{' '}
                        <span className="text-xs">
                          (@ ${dollarFormat(statsData.near_price)} / Ⓝ)
                        </span>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex py-4 text-sm text-gray-600">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0">Tokens:</div>
                  <div className="w-full md:w-3/4 break-words -my-1">
                    <TokenHoldings
                      data={inventoryData}
                      loading={loading}
                      ft={ft}
                      id={props.id}
                      appUrl={config.appUrl}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="h-full bg-white soft-shadow rounded-lg overflow-hidden">
              <h2 className="leading-6 border-b p-3 text-gray-600 text-sm font-semibold">
                Account information
              </h2>

              <div className="px-3 divide-y text-sm text-gray-600">
                <div className="flex justify-between">
                  <div className="flex xl:flex-nowrap items-center justify-between py-4 w-full">
                    <div className="w-full mb-2 md:mb-0">Staked Balance:</div>
                    {loading ? (
                      <div className="w-full mb-2 break-words">
                        <Skelton className="" />
                      </div>
                    ) : (
                      <div className="w-full mb-2 break-words">
                        {yoctoToNear(Number(accountData?.locked || 0), true)} Ⓝ
                      </div>
                    )}
                  </div>
                  <div className="flex ml-4 xl:flex-nowrap items-center justify-between py-4 w-full">
                    <div className="w-full mb-2 md:mb-0">Storage Used:</div>
                    {loading ? (
                      <div className="w-full mb-2 break-words">
                        <Skelton className="" />
                      </div>
                    ) : (
                      <div className="w-full break-words xl:mt-0 mb-2">
                        {weight(Number(accountData?.storage_usage) || 0)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex xl:flex-nowrap items-center justify-between py-4 w-full">
                    {loading ? (
                      <div className="w-full mb-2 md:mb-0">
                        <Skelton className="" />
                      </div>
                    ) : (
                      <div className="w-full mb-2 md:mb-0">
                        {accountData?.deleted?.transaction_hash
                          ? 'Deleted At:'
                          : 'Created At:'}
                      </div>
                    )}
                    {loading ? (
                      <div className="w-full mb-2 break-words">
                        <Skelton className="" />
                      </div>
                    ) : (
                      <div className="w-full mb-2 break-words">
                        {accountData?.deleted?.transaction_hash
                          ? convertToUTC(
                              nanoToMilli(accountData.deleted.block_timestamp),
                              false,
                            )
                          : accountData?.created?.transaction_hash
                          ? convertToUTC(
                              nanoToMilli(accountData.created.block_timestamp),
                              false,
                            )
                          : accountData?.code_hash
                          ? 'Genesis'
                          : 'N/A'}
                      </div>
                    )}
                  </div>
                  {contract?.hash ? (
                    <div className="flex ml-4 xl:flex-nowrap items-center justify-between py-4 w-full">
                      <div className="w-full mb-2">Contract Locked:</div>
                      <div className="w-full mb-2 break-words">
                        {contract?.locked ? 'Yes' : 'No'}
                      </div>
                    </div>
                  ) : (
                    <div className="flex ml-4 xl:flex-nowrap items-center justify-between py-4 w-full" />
                  )}
                </div>
                {deploymentData?.receipt_predecessor_account_id && (
                  <div className="flex items-center py-4">
                    <div className="md:w-1/4 mb-2 md:mb-0 ">
                      Contract Creator:
                    </div>
                    <div className="ml-10 mb-2 md:w-3/4">
                      <a
                        href={`/address/${deploymentData.receipt_predecessor_account_id}`}
                      >
                        <a className="text-green-500">
                          {shortenAddress(
                            deploymentData.receipt_predecessor_account_id,
                          )}
                        </a>
                      </a>
                      {' at txn  '}
                      <a href={`/txns/${deploymentData.transaction_hash}`}>
                        <a className="text-green-500">
                          {shortenAddress(deploymentData.transaction_hash)}
                        </a>
                      </a>
                    </div>
                  </div>
                )}
                {tokenData?.name && (
                  <div className="flex flex-wrap items-center justify-between py-4">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                      Token Tracker:
                    </div>
                    <div className="w-full md:w-3/4 mb-2 break-words">
                      <div className="flex items-center">
                        <TokenImage
                          src={tokenData?.icon}
                          alt={tokenData?.name}
                          appUrl={config.appUrl}
                          className="w-4 h-4 mr-2"
                        />
                        <a href={`/token/${props.id}`}>
                          <a className="flex text-green-500">
                            <span className="inline-block truncate max-w-[110px] mr-1">
                              {tokenData.name}
                            </span>
                            (
                            <span className="inline-block truncate max-w-[80px]">
                              {tokenData.symbol}
                            </span>
                            )
                          </a>
                        </a>
                        {tokenData.price && (
                          <div className="text-gray-500 ml-1">
                            (@ ${localFormat(tokenData.price)})
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Theme>
  );
}

return MainComponent(props, context);