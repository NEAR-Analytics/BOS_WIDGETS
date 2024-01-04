/**
 * Component: BlocksList
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Table of blocks on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {number} [currentPage] - The current page number being displayed. (Optional)
 *                                 Example: If provided, currentPage=3 will display the third page of blocks.
 * @param {function} [setPage] - A function used to set the current page. (Optional)
 *                               Example: setPage={handlePageChange} where handlePageChange is a function to update the page.
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
/* INCLUDE: "includes/formats.jsx" */
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

  if (intervals.year == 1) {
    return Math.ceil(intervals.year) + ' year ago';
  } else if (intervals.year > 1) {
    return Math.ceil(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.ceil(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.ceil(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.ceil(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.ceil(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.ceil(intervals.minute) + ' minutes ago';
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

  // Check if the number is close to an integer value
  if (Math.abs(number) >= 10) {
    number = Math.round(number); // Round the number to the nearest whole number
    return number + ' ' + prefixes[count];
  }

  return (
    Number(Math.floor(number * 100) / 100).toFixed(2) + ' ' + prefixes[count]
  );
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
function dollarNonCentFormat(number) {
  const formattedNumber = Number(number).toLocaleString('en', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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

  if (intervals.year == 1) {
    return Math.ceil(intervals.year) + ' year ago';
  } else if (intervals.year > 1) {
    return Math.ceil(intervals.year) + ' years ago';
  } else if (intervals.month > 1) {
    return Math.ceil(intervals.month) + ' months ago';
  } else if (intervals.week > 1) {
    return Math.ceil(intervals.week) + ' weeks ago';
  } else if (intervals.day > 1) {
    return Math.ceil(intervals.day) + ' days ago';
  } else if (intervals.hour > 1) {
    return Math.ceil(intervals.hour) + ' hours ago';
  } else if (intervals.minute > 1) {
    return Math.ceil(intervals.minute) + ' minutes ago';
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

  // Check if the number is close to an integer value
  if (Math.abs(number) >= 10) {
    number = Math.round(number); // Round the number to the nearest whole number
    return number + ' ' + prefixes[count];
  }

  return (
    Number(Math.floor(number * 100) / 100).toFixed(2) + ' ' + prefixes[count]
  );
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
  console.log('hgjhgh');
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

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
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
  console.log('hgjhgh');
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

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}
function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}
/* END_INCLUDE: "includes/libs.jsx" */







function MainComponent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(1);
  const [blocks, setBlocks] = useState([]);
  const [showAge, setShowAge] = useState(true);

  const config = getConfig(context.networkId);

  useEffect(() => {
    function fetchTotalBlocks() {
      setIsLoading(true);
      asyncFetch(`${config?.backendUrl}blocks/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data



) => {
            const resp = data?.body?.blocks?.[0];
            setTotalCount(resp?.count);
          },
        )
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }

    function fetchBlocks() {
      setIsLoading(true);
      asyncFetch(
        `${config?.backendUrl}blocks?page=${props.currentPage}&per_page=25`,
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
            const resp = data?.body?.blocks;
            setBlocks(resp);
          },
        )
        .catch(() => {});
      setIsLoading(false);
    }

    fetchTotalBlocks();
    fetchBlocks();
  }, [config?.backendUrl, props.currentPage]);

  const start = blocks?.[0];
  const end = blocks?.[blocks?.length - 1];

  const toggleShowAge = () => setShowAge((s) => !s);

  const columns = [
    {
      header: (
        <span className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider">
          BLOCK
        </span>
      ),
      key: 'block_hash',
      cell: (row) => (
        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
          <a href={`/blocks/${row.block_hash}`} className="hover:no-underline">
            <a className="text-green-500 hover:no-underline">
              {localFormat(row.block_height)}
            </a>
          </a>
        </span>
      ),
    },
    {
      header: (
        <div className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap">
          <button
            type="button"
            onClick={toggleShowAge}
            className="px-6 py-4 text-left text-xs w-full font-semibold uppercase tracking-wider text-nearblue-500 focus:outline-none whitespace-nowrap"
          >
            {showAge ? 'AGE' : 'DATE TIME (UTC)'}
          </button>
        </div>
      ),
      key: 'block_timestamp',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {!showAge
                    ? formatTimestampToString(
                        nanoToMilli(row.block_timestamp || 0),
                      )
                    : getTimeAgoString(nanoToMilli(row.block_timestamp || 0))}
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                sideOffset={8}
                place="bottom"
              >
                {showAge
                  ? formatTimestampToString(
                      nanoToMilli(row.block_timestamp || 0),
                    )
                  : getTimeAgoString(nanoToMilli(row.block_timestamp || 0))}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
    },
    {
      header: (
        <span className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider">
          TXN
        </span>
      ),
      key: 'count',
      cell: (row) => (
        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {localFormat(row.transactions_agg.count)}
        </span>
      ),
    },
    {
      header: (
        <span className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider">
          RECEIPT
        </span>
      ),
      key: 'count',
      cell: (row) => (
        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {localFormat(row.receipts_agg.count)}
        </span>
      ),
    },
    {
      header: (
        <span className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider">
          AUTHOR
        </span>
      ),
      key: 'author_account_id',
      cell: (row) => (
        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-medium">
          <a
            href={`/address/${row.author_account_id}`}
            className="hover:no-underline"
          >
            <a className="text-green-500 hover:no-underline">
              {shortenAddress(row.author_account_id)}
            </a>
          </a>
        </span>
      ),
    },
    {
      header: (
        <span className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap">
          GAS USED
        </span>
      ),
      key: 'gas_used',
      cell: (row) => (
        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {row.chunks_agg.gas_used
            ? convertToMetricPrefix(row.chunks_agg.gas_used) + 'gas'
            : '0gas'}
        </span>
      ),
    },
    {
      header: (
        <span className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap">
          GAS LIMIT
        </span>
      ),
      key: 'gas_limit',
      cell: (row) => (
        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {row.chunks_agg.gas_limit
            ? convertToMetricPrefix(row.chunks_agg.gas_limit) + 'gas'
            : '0gas'}
        </span>
      ),
    },
    {
      header: (
        <span className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap">
          GAS FEE
        </span>
      ),
      key: 'gas_price',
      cell: (row) => (
        <span className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {row.chunks_agg.gas_used && row.gas_price
            ? gasFee(row.chunks_agg.gas_used, row.gas_price)
            : '0 Ⓝ'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="bg-hero-pattern h-72">
        <div className="container mx-auto px-3">
          <h1 className="mb-4 pt-8 sm:sm:text-2xl text-xl text-white">
            Latest Near Protocol Blocks
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-3 -mt-48">
        <div className="block lg:flex lg:space-x-2">
          <div className="w-full ">
            <div className="bg-white border soft-shadow rounded-lg overflow-hidden">
              {isLoading ? (
                <Skelton className="leading-7" />
              ) : (
                <p className="leading-7 pl-6 text-sm py-4 text-gray-500">
                  Block #{localFormat(start?.block_height)} to
                  {'#' + localFormat(end?.block_height)} (Total of{' '}
                  {localFormat(totalCount)} blocks)
                </p>
              )}
              {
                <Widget
                  src={`${config.ownerId}/widget/bos-components.components.Shared.Table`}
                  props={{
                    columns: columns,
                    data: blocks,
                    isLoading: isLoading,
                    isPagination: true,
                    count: totalCount,
                    page: props.currentPage,
                    limit: 25,
                    pageLimit: 200,
                    setPage: props.setPage,
                  }}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

return MainComponent(props, context);