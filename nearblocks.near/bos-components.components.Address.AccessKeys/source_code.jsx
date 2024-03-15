/**
 * Component: AddressAccessKeys
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Table of Accesskey List.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string} [id] - The account identifier passed as a string.
 * @param {React.FC<{
 *   href: string;
 *   children: React.ReactNode;
 *   className?: string;
 * }>} Link - A React component for rendering links.
 */













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
/* INCLUDE COMPONENT: "includes/Common/Paginator.jsx" */
const FaChevronLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chevron-left"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
};
const FaChevronRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-chevron-right"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};








const Paginator = (props) => {
  let pages;
  if (props.count) {
    pages = Math.ceil(props.count / props.limit);
  } else {
    pages = 1;
  }
  pages = pages > props.pageLimit ? props.pageLimit : pages;
  const onPrev = () => {
    if (props.page <= 1) return null;

    const newPage = (props.page || 1) - 1;
    props.setPage(newPage);
    return;
  };
  const onNext = () => {
    if (props.page >= pages) return null;

    const newPage = (props.page || 1) + 1;
    props.setPage(newPage);
    return;
  };
  const onFirst = () => props.setPage(1);
  const onLast = () => props.setPage(pages);

  return (
    <div className="bg-white px-2 py-3 flex items-center justify-between border-t md:px-4">
      <div className="flex-1 flex items-center justify-between">
        <div></div>

        <div>
          <div
            className="relative z-0 inline-flex rounded-md"
            aria-label="Pagination"
          >
            <button
              type="button"
              disabled={props.page <= 1 || pages === 1}
              onClick={onFirst}
              className={`relative inline-flex items-center px-2 ml-1 md:px-3 py-2  text-xs font-medium rounded-md ${
                props.page <= 1
                  ? 'text-gray-500'
                  : 'text-green-400 hover:bg-green-400 hover:text-white'
              } bg-gray-100`}
            >
              First
            </button>
            <button
              type="button"
              disabled={props.page <= 1 || pages === 1}
              onClick={onPrev}
              className={`relative inline-flex items-center px-2 ml-1 md:px-3 py-2 font-medium ${
                props.page <= 1
                  ? 'text-gray-500'
                  : 'text-green-400 hover:text-white hover:bg-green-400'
              } rounded-md  bg-gray-100`}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              disabled
              className="relative inline-flex items-center px-2 ml-1 md:px-3 py-2 text-xs font-medium text-gray-500 rounded-md  bg-gray-100"
            >
              Page {props.page} of {pages}
            </button>
            <button
              type="button"
              disabled={props.page >= pages || pages === 1}
              onClick={onNext}
              className={`relative inline-flex items-center ml-1 px-2 md:px-3 py-2 rounded-md font-medium ${
                props.page >= pages
                  ? 'text-gray-500'
                  : 'text-green-400 hover:text-white hover:bg-green-400'
              }  bg-gray-100`}
            >
              <FaChevronRight />
            </button>
            <button
              type="button"
              disabled={props.page >= pages || pages === 1}
              onClick={onLast}
              className={`relative inline-flex items-center px-2 ml-1 md:px-3 py-2 text-xs font-medium rounded-md ${
                props.page >= pages
                  ? 'text-gray-500'
                  : 'text-green-400 hover:text-white hover:bg-green-400'
              }  bg-gray-100 `}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Paginator.jsx" */

function MainComponent({ network, t, id, Link }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showWhen, setShowWhen] = useState(true);
  const [sorting, setSorting] = useState('desc');
  const [count, setCount] = useState(0);
  const [keys, Setkeys] = useState([]);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const config = getConfig(network);

  const setPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  const toggleShowWhen = () => setShowWhen((s) => !s);

  const onOrder = () => {
    setSorting((state) => (state === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    setIsLoading(true);
    function fetchAccountData() {
      asyncFetch(
        `${config?.backendUrl}account/${id}/keys?order=${sorting}&page=${currentPage}&per_page=25`,
      )
        .then(
          (data




) => {
            const resp = data?.body?.keys;
            if (data.status === 200) {
              Setkeys(resp);
              setIsLoading(false);
            } else {
              handleRateLimit(
                data,
                () => fetchAccountData(),
                () => setIsLoading(false),
              );
            }
          },
        )
        .catch(() => {});
    }

    function fetchCountData() {
      asyncFetch(`${config?.backendUrl}account/${id}/keys/count`)
        .then(
          (data




) => {
            const resp = data?.body?.keys?.[0]?.count || 0;
            if (data.status === 200) {
              setCount(resp);
            } else {
              handleRateLimit(data, fetchCountData);
            }
          },
        )
        .catch(() => {});
    }
    fetchAccountData();
    fetchCountData();
  }, [config?.backendUrl, id, currentPage, sorting]);

  return (
    <>
      <div className="overflow-x-auto ">
        <table className="min-w-full divide-y border-t">
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  uppercase tracking-wider"
              >
                Txn Hash
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  uppercase tracking-wider"
              >
                Public key
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  uppercase tracking-wider"
              >
                Access
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  uppercase tracking-wider"
              >
                Contract
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  uppercase tracking-wider"
              >
                Method
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  uppercase tracking-wider"
              >
                Allowance
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  uppercase tracking-wider"
              >
                Action
              </th>
              <th scope="col" className="text-left">
                <div className="w-full inline-flex px-5 py-4">
                  <button
                    type="button"
                    onClick={toggleShowWhen}
                    className="text-left text-xs w-full font-semibold uppercase tracking-wider text-nearblue-600 focus:outline-none"
                  >
                    {showWhen ? 'When' : 'Date Time (UTC)'}
                  </button>
                  <button type="button" onClick={onOrder} className="px-2">
                    <div className="text-nearblue-600  font-semibold">
                      <SortIcon order={sorting} />
                    </div>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading &&
              [...Array(25)].map((_, i) => (
                <tr key={i} className="hover:bg-blue-900/5 h-[57px]">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 ">
                    <Skeleton />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 ">
                    <Skeleton />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 ">
                    <Skeleton />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-tiny ">
                    <Skeleton />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 ">
                    <Skeleton />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 ">
                    <Skeleton />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 ">
                    <Skeleton />
                  </td>
                </tr>
              ))}
            {!isLoading && keys.length === 0 && (
              <tr className="h-[57px]">
                <td
                  colSpan={100}
                  className="px-6 py-4 text-nearblue-700 text-xs"
                >
                  No access keys
                </td>
              </tr>
            )}
            {keys &&
              keys.map((key) => (
                <Widget
                  key={key.account_id + key.public_key}
                  src={`${config.ownerId}/widget/bos-components.components.Address.AccessKeyRow`}
                  props={{
                    network: network,
                    t: t,
                    accessKey: key,
                    showWhen: showWhen,
                    Link,
                  }}
                />
              ))}
          </tbody>
        </table>
      </div>
      <Paginator
        count={count}
        page={currentPage}
        limit={25}
        pageLimit={200}
        setPage={setPage}
      />
    </>
  );
}

return MainComponent(props, context);