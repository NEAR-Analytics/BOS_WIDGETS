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
 * @param {string} ownerId - The identifier of the owner of the component.
 */








/* INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Skeleton = (props) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-black-200 rounded shadow-sm animate-pulse ${props.className}`}
    ></div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Skeleton.jsx" */

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
      <path
        fill="currentColor"
        d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
      />
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
/* INCLUDE COMPONENT: "includes/Common/ErrorMessage.jsx" */
const ErrorMessage = ({ icons, message, mutedText }) => {
  return (
    <div className="text-center py-24">
      <div className="mb-4 flex justify-center">
        <span className="inline-block border border-yellow-600 border-opacity-25 bg-opacity-10 bg-yellow-300 text-yellow-500 rounded-full p-4">
          {icons}
        </span>
      </div>

      <h3 className="font-bold text-lg text-black dark:text-neargray-10">
        {message}
      </h3>

      <p className="mb-0 py-1 font-bold break-words px-2">{mutedText}</p>
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/ErrorMessage.jsx" */
/* INCLUDE COMPONENT: "includes/icons/FaInbox.jsx" */
const FaInbox = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 576 512"
      height="24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M567.938 243.908L462.25 85.374A48.003 48.003 0 0 0 422.311 64H153.689a48 48 0 0 0-39.938 21.374L8.062 243.908A47.994 47.994 0 0 0 0 270.533V400c0 26.51 21.49 48 48 48h480c26.51 0 48-21.49 48-48V270.533a47.994 47.994 0 0 0-8.062-26.625zM162.252 128h251.497l85.333 128H376l-32 64H232l-32-64H76.918l85.334-128z"></path>
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaInbox.jsx" */

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

function MainComponent({
  network,
  currentPage,
  setPage,
  ownerId,
  theme,
}) {
  const {
    convertAmountToReadableString,
    convertTimestampToTime,
    getConfig,
    handleRateLimit,
    shortenAddress,
    timeAgo,
    yoctoToNear,
  } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const { formatNumber, formatWithCommas } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const [validatorFullData, setValidatorFullData] = useState

(initialValidatorFullData);
  const [isLoading, setIsLoading] = useState(false);
  const [totalSuppy, setTotalSupply] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [expanded, setExpanded] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [latestBlock, setLatestBlock] = useState(0);
  const errorMessage = 'No validator data!';

  const config = getConfig && getConfig(network);

  const TotalSupply =
    totalSuppy && yoctoToNear ? yoctoToNear(totalSuppy, false) : '';

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
            setElapsedTime(data?.elapsedTimeData ?? 0);
            const validators = {
              validatorEpochData: data?.validatorFullData ?? [],
              currentValidators: data?.currentValidators,
              totalStake: data?.totalStake ?? 0,
              seatPrice: data?.epochStatsCheck,
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
            setIsLoading(false);
          } else {
            handleRateLimit(
              data,
              () => fetchValidatorData(page),
              () => setIsLoading(false),
            );
          }
          setExpanded([]);
        })
        .catch(() => {});
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
            setTotalSupply(data.stats[0].total_supply || 0);
          } else {
            handleRateLimit(data, fetchTotalSuppy);
          }
        })
        .catch(() => {})
        .finally(() => {});
    }
    function fetchLatestBlock() {
      asyncFetch(`${config?.backendUrl}blocks/latest?limit=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          const data = res.body;
          if (res.status === 200) {
            setLatestBlock(data.blocks[0].block_height || 0);
          } else {
            handleRateLimit(data, fetchLatestBlock);
          }
        })
        .catch(() => {})
        .finally(() => {});
    }
    if (config?.backendUrl) {
      fetchLatestBlock();
      fetchTotalSuppy();
      fetchValidatorData(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, currentPage]);

  validatorFullData[currentPage]?.total
    ? setTotalCount(validatorFullData[currentPage]?.total)
    : '';

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime((prevTimeRemaining) => prevTimeRemaining + 1);
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
          bgColor:
            'bg-emerald-50 dark:dark:bg-emerald-500/[0.25] text-emerald-500 ',
        };
      case 'joining':
        return {
          textColor: 'text-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-500/[0.25]  text-yellow-500',
        };
      case 'leaving':
        return {
          textColor: 'text-red-500',
          bgColor: 'bg-red-50 text-red-500 dark:bg-red-500/[0.25]',
        };
      case 'proposal':
        return {
          textColor: 'text-teal-900',
          bgColor:
            'bg-teal-300 dark:bg-teal-500/[0.25] dark:text-teal-500 text-teal-900',
        };
      case 'idle':
        return {
          textColor: 'text-gray-600',
          bgColor:
            'bg-gray-300 text-gray-600 dark:bg-gray-500/[0.25] dark:text-gray-400',
        };
      case 'newcomer':
        return {
          textColor: 'text-orange-500',
          bgColor:
            'bg-orange-500 text-white dark:bg-orange-500/[0.25] dark:text-orange-300',
        };
      case 'onHold':
        return {
          textColor: 'text-blue-500',
          bgColor:
            'bg-blue-500 dark:bg-blue-500/[0.25] dark:text-blue-400 text-white',
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
            className={`${
              row.isExpanded ? 'rotate-180' : 'rotate-0'
            } dark:text-neargray-10`}
          />
        </button>
      ),
      tdClassName:
        'pl-4 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'pl-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider ',
    },
    {
      header: <span>Location</span>,
      key: '',
      cell: (row) =>
        row?.description?.country_code ? (
          <OverlayTrigger
            placement="top"
            delay={{ show: 500, hide: 0 }}
            overlay={
              row?.description?.country ? (
                <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words">
                  {row?.description?.country}
                </Tooltip>
              ) : (
                <></>
              )
            }
          >
            <img
              src={`https://flagcdn.com/48x36/${row?.description?.country_code?.toLowerCase()}.png`}
              alt={row?.description?.country}
              width={20}
              height={20}
            />
          </OverlayTrigger>
        ) : (
          <div className="w-4 h-4 bg-gray-300 text-black flex items-center justify-center text-xs dark:bg-black-200 dark:text-white">
            ?
          </div>
        ),
      tdClassName:
        'pl-2 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'pl-2 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
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
      tdClassName:
        'px-4 py-2 whitespace-nowrap text-xs text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>VALIDATOR</span>,
      key: 'accountId',
      cell: (row) => (
        <>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <Link
                  href={`/address/${row.accountId}`}
                  className="hover:no-underline"
                >
                  <a className="text-green-500 dark:text-green-250 hover:no-underline">
                    {shortenAddress(row.accountId)}
                  </a>
                </Link>
              </Tooltip.Trigger>
              <Tooltip.Content
                className=" h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="start"
                side="top"
              >
                {row.accountId}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          <OverlayTrigger
            placement="bottom-start"
            delay={{ show: 500, hide: 0 }}
            overlay={
              <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words">
                {row.publicKey}
              </Tooltip>
            }
          >
            <div>{row.publicKey ? shortenAddress(row.publicKey) : ''}</div>
          </OverlayTrigger>
        </>
      ),
      tdClassName: 'px-4 py-2 text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
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
      tdClassName:
        'px-4 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
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
      tdClassName:
        'px-4 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>TOTAL STAKE</span>,
      key: 'stake',
      cell: (row) => (
        <span>
          {(row.currentEpoch?.stake ??
            row.nextEpoch?.stake ??
            row.afterNextEpoch?.stake ??
            `${row.contractStake}`) &&
            formatWithCommas(
              Number(
                yoctoToNear &&
                  yoctoToNear(
                    row.currentEpoch?.stake ??
                      row.nextEpoch?.stake ??
                      row.afterNextEpoch?.stake ??
                      `${row.contractStake}`,
                    false,
                  ),
              ).toFixed(0),
            ) + '  Ⓝ'}
        </span>
      ),
      tdClassName:
        'px-4 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>STAKE %</span>,
      key: 'percentage',
      cell: (row) => {
        return <div>{row?.percent}%</div>;
      },
      tdClassName:
        'px-4 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>CUMULATIVE STAKE</span>,
      key: 'cumulative_stake',
      cell: (row) => {
        return (
          <div>
            <div className="relative w-50 h-7 soft-shadow rounded-xl overflow-hidden bg-gray-300 dark:bg-black-200">
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
      tdClassName:
        'px-4 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider whitespace-nowrap',
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
              visibleStake,
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
      tdClassName:
        'px-4 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider whitespace-nowrap',
    },
  ];
  const validatorEpochData =
    validatorFullData[currentPage]?.validatorEpochData.length > 0
      ? validatorFullData[currentPage]?.validatorEpochData
      : undefined;

  const ExpandedRow = (row) => {
    const telemetry =
      validatorFullData[currentPage]?.validatorTelemetry[row.accountId];
    const progress = row?.currentEpoch?.progress;

    const productivityRatio = progress
      ? (progress.blocks.produced + progress.chunks.produced) /
        (progress.blocks.total + progress.chunks.total)
      : 0;
    const socialMedia =
      row?.description?.twitter ||
      row?.description?.discord ||
      row?.description?.github ||
      row?.description?.telegram;

    return (
      <>
        <tr className="border-none">
          {telemetry && (
            <>
              <td
                colSpan={2}
                className="bg-gray-50 dark:bg-black-600 pl-8 py-2"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider py-2">
                  <OverlayTrigger
                    placement="top-start"
                    delay={{ show: 500, hide: 0 }}
                    overlay={
                      <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words">
                        {
                          'Uptime is estimated by the ratio of the number of produced blocks to the number of expected blocks. '
                        }
                      </Tooltip>
                    }
                  >
                    <div className="flex uppercase">
                      <div>Uptime</div>
                      <div>
                        <Question className="w-4 h-4 fill-current ml-1" />
                      </div>
                    </div>
                  </OverlayTrigger>
                </div>
                <div className="flex flex-wrap text-xs text-left font-bold text-nearblue-600 dark:text-neargray-10 tracking-wider">
                  {!isNaN(productivityRatio)
                    ? `${
                        productivityRatio * 100 == 100
                          ? 100
                          : (productivityRatio * 100).toFixed(3)
                      }%`
                    : '-'}
                </div>
              </td>
              <td
                colSpan={2}
                className="bg-gray-50 dark:bg-black-600 px-4 py-2"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider py-2">
                  <OverlayTrigger
                    placement="top-start"
                    delay={{ show: 500, hide: 0 }}
                    overlay={
                      <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words">
                        {
                          'The block height the validation node reported in the most recent telemetry heartbeat.'
                        }
                      </Tooltip>
                    }
                  >
                    <div className="flex uppercase whitespace-nowrap">
                      <div>Latest block</div>
                      <div>
                        <Question className="w-4 h-4 fill-current ml-1" />
                      </div>
                    </div>
                  </OverlayTrigger>
                </div>
                <div
                  className={`flex flex-wrap text-xs text-left font-bold  tracking-wider  ${
                    Math.abs(telemetry.lastHeight - latestBlock) > 1000
                      ? 'text-red-500 dark:text-red-500'
                      : Math.abs(telemetry.lastHeight - latestBlock) > 50
                      ? 'text-yellow-500 dark:text-yellow-500'
                      : 'text-black dark:text-white '
                  }`}
                >
                  {telemetry?.lastHeight ? telemetry?.lastHeight : '-'}
                </div>
              </td>
              <td
                colSpan={2}
                className="bg-gray-50 dark:bg-black-600 px-4 py-2"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider py-2">
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div className="flex uppercase whitespace-nowrap">
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
                </div>
                <div
                  className={`flex flex-wrap text-xs text-left font-bold text-black dark:text-white tracking-wider`}
                >
                  {telemetry?.lastSeen ? timeAgo(telemetry?.lastSeen) : '-'}
                </div>
              </td>
              <td
                colSpan={2}
                className="bg-gray-50 dark:bg-black-600 px-4 py-2"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider py-2">
                  <Tooltip.Provider>
                    <Tooltip.Root>
                      <Tooltip.Trigger asChild>
                        <div className="flex uppercase whitespace-nowrap">
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
                          className="text-green-250 hover:no-underline"
                        >
                          the official implementation.
                        </a>
                      </Tooltip.Content>
                    </Tooltip.Root>
                  </Tooltip.Provider>
                </div>
                <div
                  className={`flex flex-wrap text-xs text-left  text-nearblue-600 dark:text-neargray-10 tracking-wider`}
                >
                  {telemetry?.agentName ? (
                    <span className="rounded bg-gray-300 dark:bg-black-200 px-1">
                      {telemetry?.agentName}
                    </span>
                  ) : (
                    '-'
                  )}
                </div>
              </td>
              <td
                colSpan={2}
                className="bg-gray-50 dark:bg-black-600 px-4 py-2"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider uppercase whitespace-nowrap py-2">
                  Node Agent Version / Build
                </div>
                <div
                  className={`flex flex-wrap text-xs text-left  text-nearblue-600 dark:text-neargray-10 tracking-wider`}
                >
                  {telemetry?.agentVersion || telemetry?.agentBuild ? (
                    <span className="rounded bg-gray-300 dark:bg-black-200 px-1">
                      {telemetry?.agentVersion}/${telemetry?.agentBuild}
                    </span>
                  ) : (
                    '-'
                  )}
                </div>
              </td>
            </>
          )}
        </tr>
        <tr className="border-none">
          {row?.description && (
            <>
              <td
                colSpan={2}
                className="bg-gray-50 dark:bg-black-600 pl-8 pt-2 pb-4 align-top max-w-[180px]"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider py-2">
                  <div className="flex uppercase">Name</div>
                </div>
                <div className="text-xs text-left font-bold text-nearblue-600 dark:text-neargray-10 tracking-wider">
                  <div className="flex items-center">
                    {row?.description?.name ? (
                      <>
                        {row?.description?.logo &&
                          row?.description?.logo?.startsWith('http') && (
                            <span className="mr-1 flex justify-center">
                              <img
                                src={row?.description?.logo}
                                alt={row?.description?.name}
                                width={20}
                                height={20}
                              />
                            </span>
                          )}
                        {row?.description?.name}
                      </>
                    ) : (
                      '-'
                    )}
                  </div>
                </div>
              </td>
              <td
                colSpan={2}
                className="bg-gray-50 dark:bg-black-600 px-4 pt-2 pb-4 align-top"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider py-2">
                  <div className="flex uppercase whitespace-nowrap">
                    Social Media
                  </div>
                </div>
                <div className="flex flex-wrap text-xs text-left font-bold text-nearblue-600 dark:text-neargray-10 tracking-wider">
                  {socialMedia ? (
                    <>
                      {row?.description?.url && (
                        <a
                          className="text-green-500 dark:text-green-250 underline mr-2"
                          href={
                            row?.description?.url &&
                            row?.description?.url?.startsWith('http')
                              ? row?.description?.url
                              : `http://${row?.description?.url}`
                          }
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <img
                            width="16"
                            height="16"
                            className="w-5 h-5"
                            src={
                              theme === 'dark'
                                ? '/images/web_icon_black.svg'
                                : '/images/web_icon.svg'
                            }
                            alt="Web"
                          />
                        </a>
                      )}
                      {row?.description?.email && (
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline mr-2"
                          href={`mailto:${row?.description?.email}`}
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <img
                            width="16"
                            height="16"
                            className="w-5 h-5"
                            src={
                              theme === 'dark'
                                ? '/images/email_icon_black.svg'
                                : '/images/email_icon.svg'
                            }
                            alt="Email"
                          />
                        </a>
                      )}
                      {row?.description?.twitter && (
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline mr-2"
                          href={
                            row?.description?.twitter &&
                            row?.description?.twitter?.includes('http')
                              ? row?.description?.twitter
                              : `https://twitter.com/${row?.description?.twitter}`
                          }
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <img
                            width="16"
                            height="16"
                            className="w-5 h-5"
                            src={
                              theme === 'dark'
                                ? '/images/twitter_icon_black.svg'
                                : '/images/twitter_icon.svg'
                            }
                            alt="Twitter"
                          />
                        </a>
                      )}
                      {row?.description?.discord && (
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline mr-2"
                          href={
                            row?.description?.discord &&
                            row?.description?.discord?.includes('http')
                              ? row?.description?.discord
                              : `https://discord.com/invite/${row?.description?.discord}`
                          }
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <img
                            width="16"
                            height="16"
                            className="w-5 h-5"
                            src={
                              theme === 'dark'
                                ? '/images/discord_icon_black.svg'
                                : '/images/discord_icon.svg'
                            }
                            alt="Discord"
                          />
                        </a>
                      )}
                      {row?.description?.github && (
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline mr-2"
                          href={
                            row?.description?.github &&
                            row?.description?.github?.includes('http')
                              ? row?.description?.github
                              : `https://github.com/${row?.description?.github}`
                          }
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <img
                            width="16"
                            height="16"
                            className="w-5 h-5"
                            src={
                              theme === 'dark'
                                ? '/images/github_icon_black.svg'
                                : '/images/github_icon.svg'
                            }
                            alt="Github"
                          />
                        </a>
                      )}
                      {row?.description?.telegram && (
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline mr-2"
                          href={
                            row?.description?.telegram &&
                            (row?.description?.telegram?.startsWith('http') ||
                              row?.description?.telegram?.startsWith('https'))
                              ? row?.description?.telegram
                              : `https://t.me/${row?.description?.telegram}`
                          }
                          rel="noreferrer noopener"
                          target="_blank"
                        >
                          <img
                            width="16"
                            height="16"
                            className="w-5 h-5"
                            src={
                              theme === 'dark'
                                ? '/images/telegram_black.svg'
                                : '/images/telegram.svg'
                            }
                            alt="Telegram"
                          />
                        </a>
                      )}
                    </>
                  ) : (
                    '-'
                  )}
                </div>
              </td>
              <td
                colSpan={6}
                className="bg-gray-50 dark:bg-black-600 px-4 pt-2 pb-4 align-top"
              >
                <div className="flex flex-wrap text-xs text-left font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider py-2">
                  <div className="flex uppercase">Description</div>
                </div>
                <div className="flex flex-wrap text-xs text-left font-bold text-nearblue-600 dark:text-neargray-10 tracking-wider">
                  <div className="w-full">
                    <>
                      {row?.description?.description
                        ? row?.description?.description
                        : '-'}
                    </>
                  </div>
                </div>
              </td>
            </>
          )}
          {!row?.description && (
            <td colSpan={10} className="bg-gray-50 dark:bg-black-600 px-8">
              <div className="flex justify-center text-sm text-nearblue-600 dark:text-neargray-10 font-medium py-4 ">
                If you are node owner feel free to fill all&nbsp;
                <a
                  href="https://github.com/zavodil/near-pool-details#description"
                  className="text-green-500 dark:text-green-250 underline"
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  data
                </a>
                &nbsp;to promote your own node!
              </div>
            </td>
          )}
        </tr>
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <div className="h-full bg-white  dark:bg-black-600 soft-shadow rounded-xl overflow-hidden">
            <div>
              <h2 className=" flex justify-between border-b dark:border-black-200 p-3 text-gray-600 dark:text-neargray-10 text-sm font-semibold">
                <span>Staking Overview</span>
              </h2>
            </div>
            <div className="px-3 divide-y dark:divide-black-200 text-sm text-gray-600 dark:text-neargray-10">
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                  Current Validators
                </div>
                <div className="w-full md:w-3/4 break-words">
                  {isLoading ? (
                    <Skeleton className="h-4 w-16 break-words" />
                  ) : validatorFullData[currentPage]?.currentValidators ? (
                    validatorFullData[currentPage]?.currentValidators
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                  Total Staked
                </div>
                <div className="w-full md:w-3/4 break-words">
                  {isLoading ? (
                    <Skeleton className="h-4 w-16 break-words" />
                  ) : validatorFullData[currentPage]?.totalStake &&
                    convertAmountToReadableString ? (
                    convertAmountToReadableString(
                      validatorFullData[currentPage]?.totalStake,
                      'totalStakeAmount',
                    )
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="flex max-lg:divide-y max-lg:dark:divide-black-200 flex-col lg:flex-row ">
                <div className="flex items-center justify-between lg:w-1/2 py-4">
                  <div className="w-full mb-2 lg:mb-0">Current Seat Price</div>
                  <div className="w-full break-words">
                    {isLoading ? (
                      <Skeleton className="h-4 w-16 break-words" />
                    ) : (
                      <>
                        {validatorFullData[currentPage]?.seatPrice &&
                        convertAmountToReadableString
                          ? convertAmountToReadableString(
                              validatorFullData[currentPage]?.seatPrice,
                              'seatPriceAmount',
                            ) + ' Ⓝ'
                          : ''}
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between lg:w-1/2 py-4">
                  <div className="w-full mb-2 lg:mb-0">Total Supply</div>
                  <div className="w-full break-words">
                    {isLoading ? (
                      <Skeleton className="h-4 w-16 break-words" />
                    ) : (
                      <>
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 500, hide: 0 }}
                          overlay={
                            <Tooltip className="fixed h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words">
                              {totalSuppy + ' yoctoⓃ'}
                            </Tooltip>
                          }
                        >
                          <span>
                            {TotalSupply && formatNumber
                              ? formatNumber(TotalSupply)
                              : ''}
                          </span>
                        </OverlayTrigger>{' '}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="h-full bg-white dark:bg-black-600 soft-shadow rounded-xl overflow-hidden">
            <h2 className="border-b dark:border-black-200 p-3 text-gray-600 dark:text-neargray-10 text-sm font-semibold">
              Epoch Information
            </h2>
            <div className="px-3 divide-y dark:divide-black-200 text-sm text-gray-600 dark:text-neargray-10">
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                  Epoch Elapsed Time
                </div>
                <div className="w-full text-green-500 dark:text-green-250 md:w-3/4 break-words">
                  {isLoading ? (
                    <Skeleton className="h-3 w-32" />
                  ) : validatorFullData[currentPage]?.elapsedTime &&
                    elapsedTime &&
                    convertTimestampToTime ? (
                    convertTimestampToTime(elapsedTime.toString())
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">
                  Next Epoch ETA
                </div>
                <div className="w-full md:w-3/4 text-green-500 dark:text-green-250 break-words">
                  {isLoading ? (
                    <Skeleton className="h-3 w-32" />
                  ) : validatorFullData[currentPage]?.totalSeconds &&
                    timeRemaining &&
                    convertTimestampToTime ? (
                    convertTimestampToTime(timeRemaining.toString())
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0 ">Progress</div>
                <div className="w-full md:w-3/4 break-words">
                  {isLoading ? (
                    <Skeleton className="h-3 w-full" />
                  ) : (
                    <>
                      {validatorFullData[currentPage]?.epochProgress ? (
                        <div className="flex space-x-4 gap-2 items-center ">
                          <div className="bg-blue-900-15  h-2 w-full rounded-full">
                            <div
                              className="bg-green-500 dark:bg-green-250 h-2 rounded-full"
                              style={{
                                width: `${
                                  validatorFullData[currentPage]
                                    ?.epochProgress &&
                                  Big(
                                    validatorFullData[currentPage]
                                      ?.epochProgress,
                                  ).toFixed(1)
                                }%`,
                              }}
                            ></div>
                          </div>
                          {`${
                            validatorFullData[currentPage]?.epochProgress &&
                            Big(
                              validatorFullData[currentPage]?.epochProgress,
                            ).toFixed(0)
                          }%`}
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5"></div>
      <div className="w-full mb-10">
        <div className="bg-white dark:bg-black-600 soft-shadow rounded-xl pb-1">
          <div className="flex flex-col pt-4">
            <div className="flex flex-col">
              {isLoading ? (
                <div className="leading-7 max-w-lg w-full pl-3 py-1.5 text-sm mb-4 text-nearblue-600 dark:text-neargray-10">
                  <Skeleton className=" h-4 break-words" />
                </div>
              ) : (
                <div className="leading-7 pl-3 px-3 text-sm mb-4 text-nearblue-600 dark:text-neargray-10">
                  {validatorEpochData &&
                    validatorEpochData.length > 0 &&
                    `${validatorFullData[currentPage]?.total || 0}${' '}
                  Validators found`}
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <Widget
                src={`${ownerId}/widget/bos-components.components.Shared.Table`}
                props={{
                  columns: columns,
                  data: validatorEpochData,
                  count: totalCount,
                  isLoading: isLoading,
                  renderRowSubComponent: ExpandedRow,
                  expanded,
                  isPagination: true,
                  page: currentPage,
                  limit: 25,
                  pageLimit: 999,
                  setPage: setPage,
                  Error: (
                    <ErrorMessage
                      icons={<FaInbox />}
                      message={errorMessage}
                      mutedText="Please try again later"
                    />
                  ),
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