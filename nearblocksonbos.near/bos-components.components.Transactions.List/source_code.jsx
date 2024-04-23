/**
 * Component: TransactionsList
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Table of Transactions on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {number} [currentPage] - The current page number being displayed. (Optional)
 *                                 Example: If provided, currentPage=3 will display the third page of blocks.
 * @param {function} [setPage] - A function used to set the current page. (Optional)
 *                               Example: setPage={handlePageChange} where handlePageChange is a function to update the page.
 * @param {Object.<string, string>} [filters] - Key-value pairs for filtering transactions. (Optional)
 *                                              Example: If provided, method=batch will filter the blocks with method=batch.
 * @param {function} [handleFilter] - Function to handle filter changes. (Optional)
 *                                    Example: handleFilter={handlePageFilter} where handlePageFilter is a function to filter the page.
 * @param {function} [onFilterClear] - Function to clear a specific or all filters. (Optional)
 *                                   Example: onFilterClear={handleClearFilter} where handleClearFilter is a function to clear the applied filters.
 * @param {string} ownerId - The identifier of the owner of the component.
 */












/* INCLUDE COMPONENT: "includes/icons/FaLongArrowAltRight.jsx" */
const FaLongArrowAltRight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
      <path
        d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216"
        fill="#ffffff"
      />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaLongArrowAltRight.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Status.jsx" */
const FaCheckCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path
        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
        fill="#50C878"
      />
    </svg>
  );
};
const FaTimesCircle = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
        fill="#ff0000"
      />
    </svg>
  );
};
const FaHourglassStart = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
      <path
        d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V75c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437v11c-17.7 0-32 14.3-32 32s14.3 32 32 32H64 320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V437c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320 64 32zM288 437v11H96V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9z"
        fill="#FFEB3B"
      />
    </svg>
  );
};

const getOptions = (status) => {
  switch (status) {
    case null:
      return {
        bg: 'bg-yellow-50 dark:bg-black',
        text: 'text-yellow-500',
        icon: FaHourglassStart,
        label: 'Pending',
      };
    case false:
      return {
        bg: 'bg-red-50 dark:bg-black',
        text: 'text-red-500',
        icon: FaTimesCircle,
        label: 'Failure',
      };

    default:
      return {
        bg: 'bg-emerald-50 dark:bg-black',
        text: 'text-emerald-500',
        icon: FaCheckCircle,
        label: 'Success',
      };
  }
};

const TxnStatus = (props) => {
  const option = getOptions(props.status);
  const Icon = option.icon;

  return (
    <div className="w-full md:w-3/4 break-words">
      <span
        className={`inline-flex items-center text-xs rounded py-1 ${
          option.bg
        } ${option.text} ${props.showLabel ? ' px-2' : ' px-1'}`}
      >
        <Icon />
        {props.showLabel && <span className="ml-2">{option.label}</span>}
      </span>
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Status.jsx" */
/* INCLUDE COMPONENT: "includes/Common/Filter.jsx" */
const Filter = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M14 14v6l-4 2v-8L4 5V3h16v2l-6 9zM6.404 5L12 13.394 17.596 5H6.404z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Filter.jsx" */

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
/* INCLUDE COMPONENT: "includes/icons/CloseCircle.jsx" */
const CloseCircle = (props) => {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick('All');
    }
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      className={props.className}
      onClick={handleClick}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/CloseCircle.jsx" */
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
/* INCLUDE COMPONENT: "includes/icons/Clock.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Clock = (props) => (
  <svg
    viewBox="64 64 896 896"
    focusable="false"
    data-icon="clock-circle"
    width="1em"
    height="1em"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"></path>
    <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z"></path>
  </svg>
);/* END_INCLUDE COMPONENT: "includes/icons/Clock.jsx" */
/* INCLUDE COMPONENT: "includes/Common/ErrorMessage.jsx" */
const ErrorMessage = ({ icons, message, mutedText }) => {
  return (
    <div className="text-center py-24">
      <div className="mb-4 flex justify-center">
        <span className="inline-block border border-yellow-600 border-opacity-25 bg-opacity-10 bg-yellow-300 text-yellow-500 rounded-full p-4">
          {icons}
        </span>
      </div>

      <h3 className="h-5 font-bold text-lg text-black dark:text-neargray-10">
        {message}
      </h3>

      <p className="mb-0 py-4 font-bold break-words px-2">{mutedText}</p>
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

function MainComponent(props) {
  const {
    network,
    currentPage,
    filters,
    setPage,
    handleFilter,
    onFilterClear,
    t,
    ownerId,
  } = props;

  const { txnMethod } = VM.require(`${ownerId}/widget/includes.Utils.near`);

  const {
    localFormat,
    getTimeAgoString,
    formatTimestampToString,
    capitalizeFirstLetter,
  } = VM.require(`${ownerId}/widget/includes.Utils.formats`);

  const {
    getConfig,
    handleRateLimit,
    nanoToMilli,
    truncateString,
    yoctoToNear,
  } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [txns, setTxns] = useState({});
  const [showAge, setShowAge] = useState(true);
  const [sorting, setSorting] = useState('desc');
  const [address, setAddress] = useState('');
  const [filterValue, setFilterValue] = useState({});
  const errorMessage = t ? t('txns:noTxns') : ' No transactions found!';

  const config = getConfig ? getConfig(network) : '';

  const toggleShowAge = () => setShowAge((s) => !s);

  useEffect(() => {
    function fetchTotalTxns(qs) {
      const queryParams = qs ? '?' + qs : '';
      asyncFetch(`${config?.backendUrl}txns/count${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const resp = data?.body?.txns?.[0];
            if (data.status === 200) {
              setTotalCount(resp?.count ?? 0);
            } else {
              handleRateLimit(data, () => fetchTotalTxns(qs));
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    function fetchTxnsData(qs, sqs, page) {
      setIsLoading(true);
      const queryParams = qs ? qs + '&' : '';
      asyncFetch(
        `${config?.backendUrl}txns?${queryParams}order=${sqs}&page=${page}&per_page=25`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((data) => {
          const resp = data?.body?.txns;
          if (data.status === 200) {
            if (Array.isArray(resp) && resp.length > 0) {
              setTxns((prevData) => ({ ...prevData, [page]: resp || [] }));
              setIsLoading(false);
            }
          } else {
            handleRateLimit(
              data,
              () => fetchTxnsData(qs, sorting, page),
              () => setIsLoading(false),
            );
          }
        })
        .catch(() => {})
        .finally(() => {});
    }
    let urlString = '';
    if (filters && Object.keys(filters).length > 0) {
      urlString = Object.keys(filters)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(filters[key])}`,
        )
        .join('&');
    }
    if (config?.backendUrl) {
      if (urlString && sorting) {
        fetchTotalTxns(urlString);
        fetchTxnsData(urlString, sorting, currentPage);
      } else if (sorting && (!filters || Object.keys(filters).length === 0)) {
        fetchTotalTxns();
        fetchTxnsData('', sorting, currentPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, currentPage, filters, sorting]);

  const onInputChange = (
    event,
    name,
  ) => {
    setFilterValue((prevFilters) => ({
      ...prevFilters,
      [name]: event.target.value,
    }));
  };

  const onFilter = (
    e,
    name,
  ) => {
    e.preventDefault();

    if (filterValue[name] !== undefined && filterValue[name] !== null) {
      handleFilter(name, filterValue[name]);
    }
  };

  const onClear = (name) => {
    if (onFilterClear && filters) {
      onFilterClear(name);
      setFilterValue((prevFilters) => ({
        ...prevFilters,
        [name]: '',
      }));
    }
  };

  const onOrder = () => {
    setSorting((state) => (state === 'asc' ? 'desc' : 'asc'));
  };

  const onHandleMouseOver = (e, id) => {
    e.preventDefault();

    setAddress(id);
  };
  const handleMouseLeave = () => {
    setAddress('');
  };

  const columns = [
    {
      header: <span></span>,
      key: '',
      cell: (row) => (
        <>
          <TxnStatus status={row?.outcomes?.status} showLabel={false} />
        </>
      ),
      tdClassName:
        'pl-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
    },
    {
      header: <span>{t ? t('txns:hash') : 'TXN HASH'}</span>,
      key: 'transaction_hash',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="truncate max-w-[120px] inline-block align-bottom whitespace-nowrap text-green-500 dark:text-green-250">
                  <Link
                    href={`/txns/${row?.transaction_hash}`}
                    className="hover:no-underline"
                  >
                    <a className="text-green-500 dark:text-green-250 font-medium hover:no-underline">
                      {row?.transaction_hash}
                    </a>
                  </Link>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white p-2 break-words"
                align="start"
                side="bottom"
              >
                {row?.transaction_hash}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      tdClassName: 'px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-4 text-left whitespace-nowrap  text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: (
        <Popover.Root>
          <Popover.Trigger
            asChild
            className="flex items-center px-4 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider focus:outline-none"
          >
            <button className="IconButton" aria-label="Update dimensions">
              {t ? t('txns:type') : 'METHOD'}
              <Filter className="h-4 w-4 fill-current ml-2" />
            </button>
          </Popover.Trigger>
          <Popover.Content
            className="bg-white dark:bg-black-600 dark:border-black-200 shadow-lg border rounded-b-lg p-2 z-50"
            sideOffset={5}
          >
            <div className="flex flex-col">
              <input
                name="method"
                value={filterValue['method']}
                onChange={(e) => onInputChange(e, 'method')}
                placeholder="Search by method"
                className="border dark:border-black-200  rounded h-8 mb-2 px-2 text-nearblue-600 dark:text-neargray-10 text-xs"
              />
              <div className="flex">
                <button
                  type="submit"
                  onClick={(e) => onFilter(e, 'method')}
                  className="flex items-center justify-center flex-1 rounded bg-green-500 dark:bg-green-250 h-7 text-white dark:text-black text-xs mr-2"
                >
                  <Filter className="h-3 w-3 fill-current mr-2" />{' '}
                  {t ? t('txns:filter.filter') : 'Filter'}
                </button>
                <button
                  name="type"
                  type="button"
                  onClick={() => onClear('method')}
                  className="flex-1 rounded bg-gray-300 dark:bg-black-200 dark:text-neargray-10 text-xs h-7"
                >
                  {t ? t('txns:filter.clear') : 'Clear'}
                </button>
              </div>
            </div>
          </Popover.Content>
        </Popover.Root>
      ),
      key: 'actions',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="bg-blue-900/10 text-xs text-nearblue-600 dark:text-neargray-10 rounded-xl px-2 py-1 max-w-[120px] inline-flex truncate">
                  <span className="block truncate">
                    {txnMethod(row?.actions, t)}
                  </span>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="center"
                side="bottom"
              >
                {txnMethod(row?.actions, t)}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      tdClassName:
        'px-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
    },
    {
      header: <span>{t ? t('txns:depositValue') : 'DEPOSIT VALUE'}</span>,
      key: 'deposit',
      cell: (row) => (
        <span>
          {row?.actions_agg?.deposit
            ? yoctoToNear(row?.actions_agg?.deposit, true)
            : row?.actions_agg?.deposit ?? ''}{' '}
          Ⓝ
        </span>
      ),
      tdClassName:
        'px-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>{t ? t('txns:txnFee') : 'TXN FEE'}</span>,
      key: 'transaction_fee',
      cell: (row) => (
        <span>
          {row?.outcomes_agg?.transaction_fee
            ? yoctoToNear(row?.outcomes_agg?.transaction_fee, true)
            : row?.outcomes_agg?.transaction_fee ?? ''}{' '}
          Ⓝ
        </span>
      ),
      tdClassName:
        'px-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-4 py-4 text-left whitespace-nowrap text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: (
        <Popover.Root>
          <Popover.Trigger
            asChild
            className="flex items-center px-4 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider focus:outline-none"
          >
            <button className="IconButton" aria-label="Update dimensions">
              {t ? t('txns:from') : 'FROM'}
              <Filter className="h-4 w-4 fill-current ml-2" />
            </button>
          </Popover.Trigger>
          <Popover.Content
            className="bg-white dark:bg-black-600 dark:border-black-200 shadow-lg border rounded-b-lg p-2 z-50"
            sideOffset={5}
          >
            <input
              name="from"
              value={filterValue['from']}
              onChange={(e) => onInputChange(e, 'from')}
              placeholder={
                t ? t('txns:filter.placeholder') : 'Search by address e.g. Ⓝ..'
              }
              className="border dark:border-black-200 rounded h-8 mb-2 px-2 text-nearblue-600  dark:text-neargray-10 text-xs"
            />
            <div className="flex">
              <button
                type="submit"
                onClick={(e) => onFilter(e, 'from')}
                className="flex items-center justify-center flex-1 rounded bg-green-500 dark:bg-green-250 dark:text-black h-7 text-white text-xs mr-2"
              >
                <Filter className="h-3 w-3 fill-current mr-2" />{' '}
                {t ? t('txns:filter.filter') : 'Filter'}
              </button>
              <button
                name="from"
                type="button"
                onClick={() => onClear('from')}
                className="flex-1 rounded bg-gray-300 dark:bg-black-200 dark:text-neargray-10 text-xs h-7"
              >
                {t ? t('txns:filter.clear') : 'Clear'}
              </button>
            </div>
          </Popover.Content>
        </Popover.Root>
      ),
      key: 'signer_account_id',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span
                  className={`truncate max-w-[120px] inline-block align-bottom border rounded-md p-0.5 px-1 text-green-500 dark:text-green-250 whitespace-nowrap ${
                    row?.signer_account_id === address
                      ? ' bg-[#FFC10740] border-[#FFC10740] dark:bg-black-200 dark:border-neargray-50 border-dashed cursor-pointer text-[#033F40]'
                      : 'text-green-500 dark:text-green-250 border-transparent'
                  }`}
                >
                  <Link
                    href={`/address/${row?.signer_account_id}`}
                    className="hover:no-underline"
                  >
                    <a
                      className={` hover:no-underline `}
                      onMouseOver={(e) =>
                        onHandleMouseOver(e, row?.signer_account_id)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {row?.signer_account_id}
                    </a>
                  </Link>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black  bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="start"
                side="bottom"
              >
                {row?.signer_account_id}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      tdClassName:
        'px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium',
    },
    {
      header: <span></span>,
      key: '',
      cell: () => (
        <div className="w-5 h-5 p-1 bg-green-100 rounded-full text-center flex justify-center items-center mx-auto text-white">
          <FaLongArrowAltRight />
        </div>
      ),
    },
    {
      header: (
        <Popover.Root>
          <Popover.Trigger
            asChild
            className="flex items-center px-4 py-4 text-left text-xs font-semibold text-nearblue-600  dark:text-neargray-10 uppercase tracking-wider focus:outline-none"
          >
            <button className="IconButton" aria-label="Update dimensions">
              {t ? t('txns:to') : 'To'}
              <Filter className="h-4 w-4 fill-current ml-2" />
            </button>
          </Popover.Trigger>
          <Popover.Content
            className="bg-white dark:bg-black-600 dark:border-black-200 shadow-lg border rounded-b-lg p-2 z-50"
            sideOffset={5}
          >
            <input
              name="to"
              value={filterValue['to']}
              onChange={(e) => onInputChange(e, 'to')}
              placeholder={
                t ? t('txns:filter.placeholder') : 'Search by address e.g. Ⓝ..'
              }
              className="border dark:border-black-200  rounded h-8 mb-2 px-2 text-nearblue-600 dark:text-neargray-10 text-xs"
            />
            <div className="flex">
              <button
                type="submit"
                onClick={(e) => onFilter(e, 'to')}
                className="flex items-center justify-center flex-1 rounded bg-green-500 dark:bg-green-250 h-7 dark:text-black text-white text-xs mr-2"
              >
                <Filter className="h-3 w-3 fill-current mr-2" />{' '}
                {t ? t('txns:filter.filter') : 'Filter'}
              </button>
              <button
                name="to"
                type="button"
                onClick={() => onClear('to')}
                className="flex-1 rounded bg-gray-300 dark:bg-black-200 dark:text-neargray-10 text-xs h-7"
              >
                {t ? t('txns:filter.clear') : 'Clear'}
              </button>
            </div>
          </Popover.Content>
        </Popover.Root>
      ),
      key: 'receiver_account_id',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span>
                  <Link
                    href={`/address/${row?.receiver_account_id}`}
                    className="hover:no-underline whitespace-nowrap"
                  >
                    <a
                      className={`text-green-500 border rounded-md dark:text-green-250 p-1 hover:no-underline ${
                        row?.receiver_account_id === address
                          ? ' bg-[#FFC10740] border-[#FFC10740] dark:bg-black-200 dark:border-neargray-50 border-dashed cursor-pointer text-[#033F40]'
                          : 'text-green-500 dark:text-green-250 border-transparent'
                      }`}
                      onMouseOver={(e) =>
                        onHandleMouseOver(e, row?.receiver_account_id)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {truncateString(row?.receiver_account_id, 17, '...')}
                    </a>
                  </Link>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="start"
                side="bottom"
              >
                {row?.receiver_account_id}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      tdClassName:
        'px-4 py-4 text-sm text-nearblue-600 dark:text-neargray-10 font-medium',
    },
    {
      header: <span>{t ? t('txns:blockHeight') : ' BLOCK HEIGHT'}</span>,
      key: 'block_height',
      cell: (row) => (
        <span>
          <Link
            href={`/blocks/${row?.included_in_block_hash}`}
            className="hover:no-underline"
          >
            <a className="text-green-500  dark:text-green-250 hover:no-underline">
              {row?.block?.block_height
                ? localFormat(row?.block?.block_height)
                : row?.block?.block_height ?? ''}
            </a>
          </Link>
        </span>
      ),
      tdClassName:
        'px-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 font-medium',
      thClassName:
        'px-4 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: (
        <div className="w-full inline-flex px-4 py-4">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  onClick={toggleShowAge}
                  className="text-left text-xs w-full flex items-center font-semibold uppercase tracking-wider  text-green-500  dark:text-green-250 focus:outline-none whitespace-nowrap"
                >
                  {showAge
                    ? t
                      ? t('txns:age')
                      : 'AGE'
                    : t
                    ? t('txns:ageDT')
                    : 'DATE TIME (UTC)'}
                  {showAge && (
                    <Clock className="text-green-500 dark:text-green-250 ml-2" />
                  )}
                </button>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="center"
                side="top"
              >
                {showAge
                  ? 'Click to show Datetime Format'
                  : 'Click to show Age Format'}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
          <button type="button" onClick={onOrder} className="px-2">
            <div className="text-nearblue-600 dark:text-neargray-10 font-semibold">
              <SortIcon order={sorting} />
            </div>
          </button>
        </div>
      ),
      key: 'block_timestamp',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span>
                  {!showAge
                    ? row?.block_timestamp
                      ? formatTimestampToString(
                          nanoToMilli(row?.block_timestamp),
                        )
                      : ''
                    : row?.block_timestamp
                    ? getTimeAgoString(nanoToMilli(row?.block_timestamp))
                    : ''}
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="start"
                side="bottom"
              >
                {showAge
                  ? row?.block_timestamp
                    ? formatTimestampToString(nanoToMilli(row?.block_timestamp))
                    : ''
                  : row?.block_timestamp
                  ? getTimeAgoString(nanoToMilli(row?.block_timestamp))
                  : ''}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      tdClassName:
        'px-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName: 'inline-flex whitespace-nowrap',
    },
  ];

  return (
    <div className=" bg-white dark:bg-black-600 dark:border-black-200 border soft-shadow rounded-xl overflow-hidden">
      {isLoading ? (
        <div className="pl-6 max-w-lg w-full py-5 ">
          <Skeleton className="h-4" />
        </div>
      ) : (
        <div className={`flex flex-col lg:flex-row pt-4`}>
          <div className="flex flex-col">
            <p className="leading-7 pl-6 text-sm mb-4 text-nearblue-600 dark:text-neargray-10">
              {Object.keys(txns).length > 0 &&
                `${
                  t
                    ? t('txns:listing', {
                        count: localFormat
                          ? localFormat(totalCount.toString())
                          : '',
                      })
                    : `More than > ${totalCount} transactions found`
                }`}
            </p>
          </div>
          {filters && Object.keys(filters).length > 0 && (
            <div className="flex items-center px-6 text-sm mb-4 text-nearblue-600 dark:text-neargray-10 lg:ml-auto">
              {t ? `${t('txns:filter.by')}:` : 'Filtered By:'}&nbsp;
              <span className="flex flex-wrap items-center justify-center bg-gray-100 dark:bg-black-200 rounded-full px-3 py-1 space-x-2">
                {Object.keys(filters).map((key) => (
                  <span
                    className="flex items-center max-sm:mb-1 truncate max-w-[120px]"
                    key={key}
                  >
                    {capitalizeFirstLetter(key)}:{' '}
                    <span className="font-semibold truncate">
                      {filters[key]}
                    </span>
                  </span>
                ))}
                <CloseCircle
                  className="w-4 h-4 fill-current cursor-pointer"
                  onClick={onClear}
                />
              </span>
            </div>
          )}
        </div>
      )}
      {
        <Widget
          src={`${ownerId}/widget/bos-components.components.Shared.Table`}
          props={{
            columns: columns,
            data: txns[currentPage],
            isLoading: isLoading,
            isPagination: true,
            count: totalCount,
            page: currentPage,
            limit: 25,
            pageLimit: 200,
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
      }
    </div>
  );
}

return MainComponent(props, context);