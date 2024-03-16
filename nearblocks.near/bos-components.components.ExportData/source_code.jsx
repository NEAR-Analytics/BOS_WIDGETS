/**
 * Component: AddressTransactions
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Transactions of address on Near Protocol.
 * @interface Props
 * @param {string}  [network] - The network data to show, either mainnet or testnet.
 * @param {string} [id] - The account identifier passed as a string.
 * @param {function} [onHandleDowload] - function to handle the download.
 * @param {string} [exportType] - Type of data to be exported, available options are (transactions, ft and nft token transaction)
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








const today = new Date();
const startOfCurrentMonth = new Date(
  Date.UTC(today.getFullYear(), today.getMonth(), 1),
);
const endOfCurrentMonth = new Date(
  Date.UTC(today.getFullYear(), today.getMonth() + 1, 0),
);

const formattedStart = startOfCurrentMonth.toISOString().split('T')[0];
const formattedEnd = endOfCurrentMonth.toISOString().split('T')[0];

const initial = {
  start: formattedStart,
  end: formattedEnd,
};

function MainComponent({ network, id, onHandleDowload, exportType }) {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(initial.start);
  const [endDate, setEndDate] = useState(initial.end);
  const [exportData, setExportData] = useState('');
  const [exportInfo, setExportInfo] = useState



({} );

  const config = getConfig(network);

  useEffect(() => {
    let url = '';
    let text = '';
    let file = '';
    switch (exportType) {
      case 'Transactions':
        url = `account/${id}/txns/export?start=${startDate}&end=${endDate}`;
        text = 'Transactions';
        file = `${id}_transactions_${startDate}_${endDate}.csv`;
        break;
      case 'Token Transactions':
        url = `account/${id}/ft-txns/export?start=${startDate}&end=${endDate}`;
        text = 'Token Transactions';
        file = `${id}_ft_transactions_${startDate}_${endDate}.csv`;
        break;
      case 'NFT Token Transactions':
        url = `account/${id}/nft-txns/export?start=${startDate}&end=${endDate}`;
        text = 'NFT Token Transactions';
        file = `${id}_nft_transactions_${startDate}_${endDate}.csv`;
        break;
      default:
    }

    setExportInfo({ apiUrl: url, tittle: text, file: file });
  }, [exportType, id, startDate, endDate]);

  useEffect(() => {
    function fetchData() {
      try {
        setLoading(true);

        asyncFetch(`${config?.backendUrl + exportInfo.apiUrl}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((resp) => {
            if (resp.status === 200) {
              const blob = new Blob([resp.body], { type: 'text/csv' });
              const href = URL.createObjectURL(blob);
              setExportData(href);
              setLoading(false);
            } else {
              handleRateLimit(resp, fetchData, () => setLoading(false));
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {});
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [config?.backendUrl, exportInfo.apiUrl]);

  const onDownload = () => {
    if (exportData) {
      onHandleDowload(exportData, exportInfo.file);
    }
  };

  const handleStartDateChange = (
    event,
  ) => {
    const selectedStartDate = event.target.value;

    setStartDate(selectedStartDate);
  };

  const handleEndDateChange = (
    event,
  ) => {
    const selectedEndDate = event.target.value;

    setEndDate(selectedEndDate);
  };

  return (
    <>
      <div className="bg-neargray-25 py-16 flex flex-col items-center">
        <h2 className="text-black text-2xl font-medium">
          Download Data ({exportInfo.tittle})
        </h2>
        <div className="text-sm text-neargray-600 py-2 max-w-lg md:mx-12 mx-4">
          <p className="text-center">
            The information you requested can be downloaded from this page.
          </p>
          <div className="bg-white border rounded-md shadow-md w-full px-4 py-4 my-10">
            <p className="text-nearblue-600 my-3 mx-2">
              Export the earliest 5000 records starting from
            </p>

            <div className="lg:flex justify-between items-center text-center">
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="flex items-center border-gray-300 rounded-md text-center px-2 py-2 w-11/12 mx-2">
                      <input
                        type="date"
                        name="startdate"
                        id="startdate"
                        className="border flex items-center  border-gray-300 rounded-md px-2 py-2 w-11/12 mx-2 focus:outline-none text-center"
                        defaultValue={initial?.start}
                        onChange={handleStartDateChange}
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="-mt-20 h-auto max-w-xs bg-black bg-opacity-90 z-10 text-white text-xs p-2"
                    align="start"
                    side="bottom"
                  >
                    Select Start Date
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
              <p className="text-center">To</p>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="flex items-center  border-gray-300 rounded-md text-center px-2 py-2 w-11/12 mx-2">
                      <input
                        type="date"
                        name="enddate"
                        id="enddate"
                        className="border flex items-center  border-gray-300 rounded-md px-2 py-2 w-11/12 mx-2 focus:outline-none text-center"
                        defaultValue={initial?.end}
                        onChange={handleEndDateChange}
                      />
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="-mt-20 h-auto max-w-xs bg-black bg-opacity-90 z-10 text-white text-xs p-2"
                    align="start"
                    side="bottom"
                  >
                    Select End Date
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>
            <div className="w-full flex justify-center my-4"></div>
            <div className="w-full flex justify-center my-4">
              <div
                onClick={onDownload}
                className={`items-center cursor-pointer ${
                  loading && 'animate-pulse cursor-not-allowed'
                }  text-center bg-green-500 hover:shadow-lg  text-white text-xs py-2 rounded w-20 focus:outline-none`}
              >
                Generate
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

return MainComponent(props, context);