/**
 * Component: NFTList
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Top Non-Fungible Tokens on Near Protocol.
 * @interface Props
 * @param {Function} t - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string}  [network] - The network data to show, either mainnet or testnet.
 * @param {number} [currentPage] - The current page number being displayed. (Optional)
 *                                 Example: If provided, currentPage=3 will display the third page of blocks.
 * @param {function} [setPage] - A function used to set the current page. (Optional)
 *                               Example: setPage={handlePageChange} where handlePageChange is a function to update the page.
 */







/* INCLUDE: "includes/formats.jsx" */
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
/* END_INCLUDE: "includes/libs.jsx" */
/* INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */
/**
 * @interface Props
 * @param {string} [src] - The URL string pointing to the image source.
 * @param {string} [alt] - The alternate text description for the image.
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 * @param {string} [appUrl] - The URL of the application.
 */









const TokenImage = ({ appUrl, src, alt, className, onLoad }) => {
  const placeholder = `${appUrl}images/tokenplaceholder.svg`;
  const onError = (e) => {
    e.target.onError = null;
    e.target.src = placeholder;
  };

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={onError}
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

function MainComponent({ network, currentPage, setPage, t }) {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [tokens, setTokens] = useState([]);

  const [sorting, setSorting] = useState(initialSorting);
  const errorMessage = t ? t('token:fts.top.empty') : 'No tokens found!';
  const config = getConfig(network);

  useEffect(() => {
    function fetchTotalTokens(qs) {
      setIsLoading(true);
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
            setTotalCount(resp?.count);
          },
        )
        .catch(() => {})
        .finally(() => {
          setIsLoading(false);
        });
    }

    function fetchTokens(qs, sqs) {
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
            setTokens(resp);
          },
        )
        .catch(() => {});
    }

    fetchTotalTokens();
    fetchTokens('', sorting);
    if (sorting) {
      fetchTotalTokens();
      fetchTokens('', sorting);
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
        'pl-6 py-4 whitespace-nowrap text-sm text-gray-400 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
    },
    {
      header: (
        <span>
          <button
            type="button"
            onClick={() => onOrder('name')}
            className="w-full px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex flex-row"
          >
            {sorting.sort === 'name' && (
              <div className="text-gray-500">
                <SortIcon order={sorting.order} />
              </div>
            )}
            Token
          </button>
        </span>
      ),
      key: 'name',
      cell: (row) => (
        <span>
          <div className="flex items-center">
            <TokenImage
              src={row?.icon}
              alt={row?.name}
              appUrl={config.appUrl}
              className="w-5 h-5 mr-2"
            />
            <a
              href={`/nft-token/${row.contract}`}
              className="hover:no-underline"
            >
              <a className=" text-green-500 hover:no-underline">
                <span className="inline-block truncate max-w-[200px] mr-1">
                  {row.name}
                </span>
                <span className="text-gray-400 inline-block truncate max-w-[80px]">
                  {row.symbol}
                </span>
              </a>
            </a>
          </div>
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top',
      thClassName:
        'text-left text-xs font-semibold text-gray-500 uppercase tracking-wider',
    },
    {
      header: (
        <span>
          {' '}
          <button
            type="button"
            onClick={() => onOrder('tokens')}
            className="w-full px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex flex-row"
          >
            {sorting.sort === 'tokens' && (
              <div className="text-gray-500">
                <SortIcon order={sorting.order} />
              </div>
            )}
            Tokens
          </button>
        </span>
      ),
      key: 'tokens',
      cell: (row) => <span>{localFormat(row.tokens)}</span>,
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top',
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
              <div className="text-gray-500 font-semibold">
                <SortIcon order={sorting.order} />
              </div>
            )}
            Transfers (24H)
          </button>
        </span>
      ),
      key: 'change_24',
      cell: (row) => <span>{localFormat(row.transfers_day)}</span>,
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top',
    },
    {
      header: (
        <span>
          <button
            type="button"
            onClick={() => onOrder('txns_3days')}
            className="w-full px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex flex-row whitespace-nowrap"
          >
            {sorting.sort === 'txns_3days' && (
              <div className="text-gray-500">
                <SortIcon order={sorting.order} />
              </div>
            )}
            Transfers (3D)
          </button>
        </span>
      ),
      key: 'transfers_3days',
      cell: (row) => <span>{localFormat(row.transfers_3days)}</span>,
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top',
    },
    {
      header: (
        <span>
          <button
            type="button"
            onClick={() => onOrder('txns')}
            className="w-full px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex flex-row whitespace-nowrap"
          >
            {sorting.sort === 'txns' && (
              <div className="text-gray-500">
                <SortIcon order={sorting.order} />
              </div>
            )}
            All Transfers
          </button>
        </span>
      ),
      key: 'transfers',
      cell: (row) => <span>{localFormat(row.transfers)}</span>,
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top',
    },
    {
      header: (
        <span>
          {' '}
          <button
            type="button"
            onClick={() => onOrder('holders')}
            className="w-full px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex flex-row whitespace-nowrap"
          >
            {sorting.sort === 'holders' && (
              <div className="text-gray-500">
                <SortIcon order={sorting.order} />
              </div>
            )}
            Holders
          </button>
        </span>
      ),
      key: 'holders',
      cell: (row) => <span>{localFormat(row.holders)}</span>,
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top',
    },
  ];

  const debouncedSearch = useMemo(() => {
    return debounce(500, (value) => {
      if (!value || value.trim() === '') {
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
      <div className=" bg-white border soft-shadow rounded-lg pb-1 ">
        <div className="flex flex-row items-center justify-between text-left text-sm text-gray-500 px-3 py-2">
          {isLoading ? (
            <Skeleton className="max-w-lg pl-3" />
          ) : (
            <p className="pl-3">
              A total of {localFormat(totalCount | 0)} NEP-171 Token Contracts
              found
            </p>
          )}
          <div className={`flex w-full h-10 sm:w-80 mr-2`}>
            <div className="flex-grow">
              <label htmlFor="token-search" className="relative">
                <input
                  name="search"
                  autoComplete="off"
                  placeholder="Search"
                  className="search ml-2 pl-8 token-search bg-white w-full h-full text-sm py-2 outline-none border rounded-lg"
                  onChange={onChange}
                />
                <span className="bg-token-search absolute left-[18px] top-0 bottom-0 w-[14px] bg-no-repeat bg-center bg-contain "></span>
              </label>
              {searchResults?.length > 0 && (
                <div className="z-50 relative">
                  <div className="text-xs rounded-b-md -mr-2 ml-2 -mt-1 bg-white py-2 shadow">
                    {searchResults.map((token) => (
                      <div
                        key={token.contract}
                        className="mx-2 px-2 py-2 hover:bg-gray-100 cursor-pointer hover:border-gray-500 truncate"
                      >
                        <a href={`/token/${token.contract}`}>
                          <a className="flex items-center my-1 whitespace-nowrap ">
                            <div className="flex-shrink-0 h-5 w-5 mr-2">
                              <TokenImage
                                src={token?.icon}
                                alt={token?.name}
                                appUrl={config.appUrl}
                                className="w-5 h-5"
                              />
                            </div>
                            <p className="font-semibold text-sm truncate">
                              {token.name}
                              <span className="text-gray-400 ml-2">
                                {token.symbol}
                              </span>
                            </p>
                          </a>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Widget
          src={`${config.ownerId}/widget/bos-components.components.Shared.Table`}
          props={{
            columns: columns,
            data: tokens,
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