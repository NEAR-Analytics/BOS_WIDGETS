/**
 * Component: NFTTransfersList
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Non-Fungible Token Transfers List on Near Protocol.
 * @interface Props
 * @param {string}  [network] - The network data to show, either mainnet or testnet.
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
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
/* INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */
/**
 * @interface Props
 * @param {string} [src] - The URL string pointing to the image source.
 * @param {string} [alt] - The alternate text description for the image.
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 * @param {string} [appUrl] - The URL of the application.
 */










const TokenImage = ({
  appUrl,
  src,
  alt,
  className,
  onLoad,
  onSetSrc,
}) => {
  const placeholder = appUrl
    ? `${appUrl}images/tokenplaceholder.svg`
    : '/images/tokenplaceholder.svg';

  const handleLoad = () => {
    if (onLoad) {
      onLoad();
    }
  };

  const handleError = () => {
    if (onSetSrc) {
      onSetSrc(placeholder);
    }
    if (onLoad) {
      onLoad();
    }
  };

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};/* END_INCLUDE COMPONENT: "includes/icons/TokenImage.jsx" */

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

function MainComponent({ network, t, currentPage, setPage, ownerId }) {
  const { formatTimestampToString, getTimeAgoString, localFormat } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig, handleRateLimit, nanoToMilli } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showAge, setShowAge] = useState(true);
  const errorMessage = t ? t('txns:noTxns') : 'No transactions found!';
  const [tokens, setTokens] = useState(
    {},
  );
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState({
    height: 0,
    sync: true,
  });
  const [timestamp, setTimeStamp] = useState('');
  const config = getConfig && getConfig(network);

  const onHandleMouseOver = (e, id) => {
    e.preventDefault();

    setAddress(id);
  };
  const handleMouseLeave = () => {
    setAddress('');
  };
  useEffect(() => {
    function fetchTotalTokens() {
      asyncFetch(`${config?.backendUrl}nfts/txns/count`, {
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
              handleRateLimit(data, fetchTotalTokens);
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    function fetchTokens(page) {
      setIsLoading(true);
      asyncFetch(`${config?.backendUrl}nfts/txns?page=${page}&per_page=25`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const resp = data?.body?.txns;
            if (data.status === 200) {
              setTokens((prevData) => ({ ...prevData, [page]: resp || [] }));
              setIsLoading(false);
            } else {
              handleRateLimit(
                data,
                () => fetchTokens(page),
                () => setIsLoading(false),
              );
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }
    function fetchStatus() {
      asyncFetch(`${config.backendUrl}sync/status`)
        .then(
          (data




) => {
            const resp = data?.body?.status?.indexers.events;
            if (data.status === 200) {
              setStatus(resp);
            } else {
              handleRateLimit(data, fetchStatus);
            }
          },
        )
        .catch(() => {});
    }
    if (config?.backendUrl) {
      fetchTotalTokens();
      fetchTokens(currentPage);
      fetchStatus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, currentPage]);
  useEffect(() => {
    function fetchTimeStamp(height) {
      asyncFetch(`${config?.rpcUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'block',
          params: {
            block_id: height,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res



) => {
            const resp = res?.body?.result.header;
            setTimeStamp(resp.timestamp_nanosec);
          },
        )
        .catch(() => {});
    }
    if (config?.rpcUrl && status.height) {
      fetchTimeStamp(status.height);
    }
  }, [status.height, config?.rpcUrl]);
  const toggleShowAge = () => setShowAge((s) => !s);

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
        'pl-5 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
    },
    {
      header: <span>{t ? t('hash') : 'HASH'}</span>,
      key: 'transaction_hash',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="truncate max-w-[120px] inline-block align-bottom text-green-500 dark:text-green-250 whitespace-nowrap">
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
      tdClassName: 'px-5 py-2 text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span> {t ? t('type') : 'TYPE'}</span>,
      key: 'cause',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="bg-blue-900/10 text-xs text-nearblue-600 dark:text-neargray-10 rounded-xl px-2 py-1 max-w-[120px] inline-flex truncate">
                  <span className="block truncate">{row?.cause}</span>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="center"
                side="bottom"
              >
                {row?.cause}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      tdClassName:
        'px-5 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>From</span>,
      key: 'affected_account_id',
      cell: (row) => {
        return Number(row.delta_amount) < 0 ? (
          <span>
            {row?.affected_account_id ? (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span
                      className={`truncate max-w-[120px] inline-block align-bottom text-green-500 dark:text-green-250 whitespace-nowrap ${
                        row?.affected_account_id === address
                          ? ' rounded-md bg-[#FFC10740] border-[#FFC10740] border border-dashed p-0.5 px-1 -m-[1px] cursor-pointer text-[#033F40]'
                          : 'text-green-500 dark:text-green-250 p-0.5 px-1'
                      }`}
                    >
                      <Link
                        href={`/address/${row?.affected_account_id}`}
                        className="hover:no-underline"
                      >
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline"
                          onMouseOver={(e) =>
                            onHandleMouseOver(e, row?.affected_account_id)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          {row?.affected_account_id}
                        </a>
                      </Link>
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                    align="start"
                    side="bottom"
                  >
                    {row?.affected_account_id}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              'system'
            )}
          </span>
        ) : (
          <span>
            {row?.involved_account_id ? (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span
                      className={`truncate max-w-[120px] inline-block align-bottom text-green-500 dark:text-green-250 whitespace-nowrap ${
                        row?.involved_account_id === address
                          ? ' rounded-md bg-[#FFC10740] border-[#FFC10740] border border-dashed p-0.5 px-1 -m-[1px] cursor-pointer text-[#033F40]'
                          : 'text-green-500 dark:text-green-250 p-0.5 px-1'
                      }`}
                    >
                      <Link
                        href={`/address/${row?.involved_account_id}`}
                        className="hover:no-underline"
                      >
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline"
                          onMouseOver={(e) =>
                            onHandleMouseOver(e, row?.involved_account_id)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          {row?.involved_account_id}
                        </a>
                      </Link>
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                    align="start"
                    side="bottom"
                  >
                    {row?.involved_account_id}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              'system'
            )}
          </span>
        );
      },
      tdClassName:
        'px-5 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 font-medium',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span></span>,
      key: '',
      cell: (row) => {
        return row.affected_account_id === row.involved_account_id ? (
          <span className="uppercase rounded w-10 py-2 h-6 inline-flex items-center justify-center bg-green-200 text-white text-sm font-semibold">
            {t('txnSelf')}
          </span>
        ) : (
          <div className="w-5 h-5 p-1 bg-green-100 rounded-full text-center flex justify-center items-center mx-auto text-white">
            <FaLongArrowAltRight />
          </div>
        );
      },
      tdClassName: 'text-center',
    },
    {
      header: <span>To</span>,
      key: 'involved_account_id',
      cell: (row) => {
        return Number(row.delta_amount) < 0 ? (
          <span>
            {row?.involved_account_id ? (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span
                      className={`truncate max-w-[120px] inline-block align-bottom text-green-500 dark:text-green-250 whitespace-nowrap ${
                        row?.involved_account_id === address
                          ? ' rounded-md bg-[#FFC10740] border-[#FFC10740] border border-dashed p-0.5 px-1 -m-[1px] cursor-pointer text-[#033F40]'
                          : 'text-green-500 dark:text-green-250 p-0.5 px-1'
                      }`}
                    >
                      <Link
                        href={`/address/${row?.involved_account_id}`}
                        className="hover:no-underline"
                      >
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline"
                          onMouseOver={(e) =>
                            onHandleMouseOver(e, row?.involved_account_id)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          {row?.involved_account_id}
                        </a>
                      </Link>
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                    align="start"
                    side="bottom"
                  >
                    {row?.involved_account_id}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              'system'
            )}
          </span>
        ) : (
          <span>
            {row?.affected_account_id ? (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <span
                      className={`truncate max-w-[120px] inline-block align-bottom text-green-500 dark:text-green-250 whitespace-nowrap ${
                        row?.affected_account_id === address
                          ? ' rounded-md bg-[#FFC10740] border-[#FFC10740] border border-dashed p-0.5 px-1 -m-[1px] cursor-pointer text-[#033F40]'
                          : 'text-green-500 dark:text-green-250 p-0.5 px-1'
                      }`}
                    >
                      <Link
                        href={`/address/${row?.affected_account_id}`}
                        className="hover:no-underline"
                      >
                        <a
                          className="text-green-500 dark:text-green-250 hover:no-underline"
                          onMouseOver={(e) =>
                            onHandleMouseOver(e, row?.affected_account_id)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          {row?.affected_account_id}
                        </a>
                      </Link>
                    </span>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                    align="start"
                    side="bottom"
                  >
                    {row?.affected_account_id}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              'system'
            )}
          </span>
        );
      },
      tdClassName:
        'px-5 py-2 text-sm text-nearblue-600 dark:text-neargray-10 font-medium',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>Token ID</span>,
      key: 'block_height',
      cell: (row) => (
        <div className="whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 max-w-[110px] inline-block truncate">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span>
                  <Link
                    href={`/nft-token/${row?.nft?.contract}/${row?.token_id}`}
                    className="hover:no-underline"
                  >
                    <a className="text-green-500 dark:text-green-250 font-medium hover:no-underline">
                      {row?.token_id}
                    </a>
                  </Link>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                align="start"
                side="bottom"
              >
                {row?.token_id}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      ),
      tdClassName: 'px-5 py-2',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>Token</span>,
      key: 'block_height',
      cell: (row) => {
        return (
          row?.nft && (
            <div className="flex flex-row items-center">
              <span className="inline-flex mr-1">
                <TokenImage
                  src={row?.nft?.icon}
                  alt={row?.nft?.name}
                  className="w-4 h-4"
                  appUrl={config.appUrl}
                />
              </span>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <div className="text-sm text-nearblue-600 dark:text-neargray-10 max-w-[110px] inline-block truncate">
                      <Link
                        href={`/nft-token/${row?.nft?.contract}`}
                        className="hover:no-underline"
                      >
                        <a className="text-green-500 dark:text-green-250 font-medium hover:no-underline">
                          {row?.nft?.name}
                        </a>
                      </Link>
                    </div>
                  </Tooltip.Trigger>
                  <Tooltip.Content
                    className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                    align="start"
                    side="bottom"
                  >
                    {row?.nft?.name}
                  </Tooltip.Content>
                </Tooltip.Root>
              </Tooltip.Provider>
              {row?.nft?.symbol && (
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <div className="text-sm text-nearblue-700 max-w-[80px] inline-block truncate">
                        &nbsp; {row?.nft?.symbol}
                      </div>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                      className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                      align="start"
                      side="bottom"
                    >
                      {row?.nft?.symbol}
                    </Tooltip.Content>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </div>
          )
        );
      },
      tdClassName:
        'px-5 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 font-medium',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: (
        <div className="w-full inline-flex px-5 py-4">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  onClick={toggleShowAge}
                  className="text-left text-xs w-full flex items-center font-semibold uppercase tracking-wider  text-green-500 dark:text-green-250 focus:outline-none whitespace-nowrap"
                >
                  {showAge ? 'AGE' : 'DATE TIME (UTC)'}
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
        'px-5 py-2 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName: 'inline-flex whitespace-nowrap',
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-black-600 dark:border-black-200 border soft-shadow rounded-xl pb-1">
        {isLoading ? (
          <div className="max-w-lg w-full pl-3 py-5">
            <Skeleton className="h-4" />
          </div>
        ) : (
          <>
            {!status.sync && (
              <div className="w-full text-center bg-nearblue rounded-t-xl px-5 py-4 text-green text-sm">
                Non-Fungible token transfers are out of sync. Last synced block
                was
                <span className="font-bold mx-0.5">
                  {localFormat && localFormat(status.height)}
                </span>
                {`(${timestamp && getTimeAgoString(nanoToMilli(timestamp))}).`}
                Non-Fungible token transfers data will be delayed.
              </div>
            )}
            <div className={`flex flex-col lg:flex-row pt-4`}>
              <div className="flex flex-col">
                <p className="leading-7 px-6 text-sm mb-4 text-nearblue-600 dark:text-neargray-10">
                  A total of {localFormat && localFormat(totalCount.toString())}{' '}
                  transactions found
                </p>
              </div>
            </div>
          </>
        )}
        <Widget
          src={`${ownerId}/widget/bos-components.components.Shared.Table`}
          props={{
            columns: columns,
            data: tokens[currentPage],
            isLoading: isLoading,
            isPagination: true,
            count: totalCount,
            page: currentPage,
            limit: 25,
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