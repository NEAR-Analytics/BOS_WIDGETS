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
  // @ts-ignore
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
  // @ts-ignore
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
/* END_INCLUDE: "includes/libs.jsx" */










function MainComponent() {
  const FRACTION_DIGITS = 2;
  const EXTRA_PRECISION_MULTIPLIER = 10000;
  const [validatorData, setValidatorData] = useState([]);
  const [validatorFullData, setValidatorFullData] = useState

([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentValidators, setCurrentValidators] = useState

([]);

  const [protocolConfig, setProtocolConfig] = useState(
    {} ,
  );

  const [seatPrice, setSeatPrice] = useState('');
  const [epochStartBlock, setEpochStartBlock] = useState(
    {} ,
  );
  const [latestBlockSub, setLatestBlockSub] = useState(
    {} ,
  );
  const config = getConfig(context.networkId);

  const validatorInfo = useCache(
    () =>
      asyncFetch(`${config?.backendUrl}validators`).then((res) => {
        const data = res.body;
        setCurrentValidators(data?.currentValidators);

        const mappedValidators = data?.combinedData;
        setValidatorFullData(mappedValidators);
        setProtocolConfig(data?.protocolConfig);
        setSeatPrice(data?.epochStatsCheck);
        setEpochStartBlock(data?.epochStartBlock);
        setLatestBlockSub(data?.latestBlock);
        setValidatorData(mappedValidators);
        return data;
      }),
    `${context.networkId}:validatorInfo`,
    { subscribe: true },
  );
  if (validatorInfo) {
    setIsLoading(false);
  }

  const sortByBNComparison = (aValue, bValue) => {
    const a = aValue ? new Big(aValue) : null;
    const b = bValue ? new Big(bValue) : null;

    if (a && b) {
      return a.cmp(b);
    }
    if (a) {
      return -1;
    }
    if (b) {
      return 1;
    }
    return 0;
  };

  const getTotalStake = (validators) =>
    validators.length > 0 &&
    validators
      .map((validator) => validator?.currentEpoch?.stake || 0)
      .filter((stake) => typeof stake === 'string' && stake !== '')
      .reduce((acc, stake) => new Big(acc).plus(stake).toString(), '0');

  const totalStake = useMemo(
    () => getTotalStake(validatorFullData),
    [validatorFullData],
  );

  const sortedValidators = useMemo(() => {
    




    const validatorsSortFns = [
      (a, b) =>
        sortByBNComparison(a.currentEpoch?.stake, b.currentEpoch?.stake),
      (a, b) => sortByBNComparison(a.nextEpoch?.stake, b.nextEpoch?.stake),
      (a, b) =>
        sortByBNComparison(a.afterNextEpoch?.stake, b.afterNextEpoch?.stake),
      (a, b) => sortByBNComparison(a.contractStake, b.contractStake),
    ];

    return validatorsSortFns.reduceRight(
      (acc, sortFn) => {
        return acc.sort(sortFn);
      },
      [...validatorFullData],
    );
  }, [validatorFullData]);

  const cumulativeAmounts = useMemo(() => {
    return sortedValidators.reduce(
      (acc, validator) => {
        const lastAmount = new Big(acc[acc.length - 1]);
        return [
          ...acc,
          validator.currentEpoch
            ? lastAmount.add(validator?.currentEpoch?.stake).toString()
            : lastAmount.toString(),
        ];
      },
      ['0'],
    );
  }, [sortedValidators]);

  const epochProgress = useMemo(() => {
    if (
      !latestBlockSub?.height ||
      !epochStartBlock?.height ||
      !protocolConfig?.epochLength
    ) {
      return 0;
    }

    return (
      ((latestBlockSub.height - epochStartBlock.height) /
        protocolConfig.epochLength) *
      100
    );
  }, [latestBlockSub, epochStartBlock, protocolConfig]);

  const timeRemaining = useMemo(() => {
    if (
      !latestBlockSub?.timestamp ||
      !epochStartBlock?.timestamp ||
      !epochProgress
    ) {
      return 0;
    }
    const epochTimestamp = nanoToMilli(epochStartBlock?.timestamp || 0);
    const latestBlockTimestamp = nanoToMilli(latestBlockSub?.timestamp || 0);

    return (
      ((latestBlockTimestamp - epochTimestamp) / epochProgress) *
      (100 - epochProgress)
    );
  }, [epochProgress, epochStartBlock, latestBlockSub]);

  const totalSeconds = useMemo(
    () => (timeRemaining ? Math.floor(timeRemaining / 1000) : 0),
    [timeRemaining],
  );

  const elapsedTime = useMemo(() => {
    if (!epochStartBlock?.timestamp) {
      return 0;
    }
    const epochTimestamp = nanoToMilli(epochStartBlock?.timestamp || 0);
    return (Date.now() - epochTimestamp) / 1000;
  }, [epochStartBlock]);

  const columns = [
    { header: 'VALIDATOR', key: 'accountId' },
    {
      header: 'FEE',
      key: 'poolInfo',
      cell: (row) => {
        return (
          <div>
            {row?.poolInfo?.fee !== undefined
              ? `${(
                  (row?.poolInfo?.fee.numerator /
                    row?.poolInfo?.fee.denominator) *
                  100
                ).toFixed(0)}%`
              : 'N/A'}
          </div>
        );
      },
    },

    {
      header: 'DELEGATORS',
      key: 'deligators',
      cell: (row) => {
        return (
          <div>
            {row?.poolInfo?.delegatorsCount !== undefined
              ? row?.poolInfo?.delegatorsCount
              : 'N/A'}
          </div>
        );
      },
    },
    {
      header: 'TOTAL STAKE',
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
    },
    {
      header: 'STAKE %',
      key: 'percentage',
      cell: (row) => {
        const currentStake = row.currentEpoch?.stake;
        const stake = currentStake ? new Big(currentStake) : new Big(0);
        const extra = new Big(EXTRA_PRECISION_MULTIPLIER);
        const ownPercent = stake.times(extra).div(totalStake).toNumber();
        const percent = ((ownPercent / extra) * 100).toFixed(FRACTION_DIGITS);
        return <div>{percent && percent}% </div>;
      },
    },
    {
      header: 'CUMULATIVE STAKE',
      key: 'cumulative_stake',
      cell: (row) => {
        if (!row.currentEpoch) {
          return 'N/A';
        }
        const index = Number(row.index) + 1 ?? 1;
        const extra = new Big(EXTRA_PRECISION_MULTIPLIER);

        const cumulativeStakePercent = Big(totalStake).lte(0)
          ? 0
          : new Big(cumulativeAmounts[index])
              .times(extra)
              .div(totalStake)
              .toNumber();

        const cumulativePercent =
          cumulativeStakePercent / EXTRA_PRECISION_MULTIPLIER;
        const percentage = (cumulativePercent * 100).toFixed(FRACTION_DIGITS);

        return <div>{percentage && percentage}%</div>;
      },
    },
    {
      header: 'STAKE CHANGE (24H)',
      key: '24_change',
      cell: (row) => {
        const nextVisibleStake =
          parseFloat(row.nextEpoch?.stake || '0') ??
          parseFloat(row.afterNextEpoch?.stake || '0');

        const currentStake = parseFloat(row.currentEpoch?.stake || '0');

        if (!isNaN(currentStake) && !isNaN(nextVisibleStake)) {
          const stakeDelta = nextVisibleStake - currentStake;

          if (stakeDelta !== 0) {
            return (
              <div className="flex">
                {stakeDelta >= 0 ? '+' : '-'}{' '}
                <p>
                  {convertAmountToReadableString(
                    Math.abs(stakeDelta),
                    'seatPriceAmount',
                  )}{' '}
                  Ⓝ
                </p>
              </div>
            );
          }
        }

        return null;
      },
    },
  ];

  return (
    <div>
      <div className="bg-hero-pattern h-72">
        <div className="container mx-auto px-3">
          <h1 className="mb-4 pt-8 sm:sm:text-2xl text-xl text-white">
            NEAR Protocol Validator Explorer
          </h1>
        </div>
      </div>
      <div className="container mx-auto px-3 -mt-48">
        <div>
          <div className="flex gap-4  mt-10">
            <div className="w-full">
              <div className="h-full bg-white soft-shadow rounded-lg overflow-hidden">
                <h2 className="border-b p-3 text-gray-600 text-sm font-semibold">
                  Staking overview
                </h2>
                <div className="px-3 divide-y text-sm text-gray-600">
                  <div className="flex  py-4">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                      Current Validators
                    </div>
                    <div className="w-full md:w-3/4 break-words">
                      {isLoading ? (
                        <Skelton className="w-16 break-words" />
                      ) : (
                        currentValidators?.length
                      )}
                    </div>
                  </div>
                  <div className="flex  py-4">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                      Total Staked
                    </div>
                    <div className="w-full md:w-3/4 break-words">
                      {isLoading ? (
                        <Skelton className="w-16 break-words" />
                      ) : (
                        convertAmountToReadableString(
                          totalStake,
                          'totalStakeAmount',
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex  py-4">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                      Current seat price
                    </div>
                    <div className="w-full md:w-3/4 break-words">
                      {isLoading ? (
                        <Skelton className="w-16 break-words" />
                      ) : (
                        <>
                          {convertAmountToReadableString(
                            Number(seatPrice),
                            'seatPriceAmount',
                          )}{' '}
                          Ⓝ{' '}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="h-full bg-white soft-shadow rounded-lg overflow-hidden">
                <h2 className="border-b p-3 text-gray-600 text-sm font-semibold">
                  Epoch information
                </h2>
                <div className="px-3 divide-y text-sm text-gray-600">
                  <div className="flex items-center justify-between py-4">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                      Epoch elapsed time:
                    </div>
                    <div className="w-full text-green-500 md:w-3/4 break-words">
                      {!elapsedTime ? (
                        <Skelton className="h-3 w-32" />
                      ) : (
                        convertTimestampToTime(elapsedTime)
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0 ">ETA:</div>
                    <div className="w-full md:w-3/4 text-green-500 break-words">
                      {!totalSeconds ? (
                        <Skelton className="h-3 w-32" />
                      ) : (
                        convertTimestampToTime(totalSeconds)
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                      Progress
                    </div>
                    <div className="w-full md:w-3/4 break-words">
                      {!epochProgress ? (
                        <Skelton className="h-3 w-full" />
                      ) : (
                        <div className="flex space-x-4 gap-2 items-center ">
                          <div className="bg-blue-50 h-2 w-full rounded-full">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${epochProgress.toFixed(1)}%` }}
                            ></div>
                          </div>
                          {epochProgress.toFixed(0)}%
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
            <div className="bg-white soft-shadow rounded-lg pb-1">
              <div className="flex flex-col pt-4">
                <div className="flex flex-col">
                  {isLoading ? (
                    <p className="leading-7 px-3 text-sm mb-4 text-gray-500">
                      <Skelton className="w-25 break-words" />
                    </p>
                  ) : (
                    <p className="leading-7 px-3 text-sm mb-4 text-gray-500">
                      {validatorFullData?.length}
                      Validators found
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <Widget
                    src={`${config?.ownerId}/widget/bos-components.components.Shared.Table`}
                    props={{
                      columns: columns,
                      data: validatorData || [],
                      isPagination: false,
                      count: validatorFullData.length,
                      isLoading: isLoading,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

return MainComponent(props, context);