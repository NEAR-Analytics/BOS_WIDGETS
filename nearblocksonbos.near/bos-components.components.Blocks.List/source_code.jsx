/**
 * Component: BlocksList
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Table of blocks on Near Protocol.
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
      className={`bg-gray-200  rounded shadow-sm animate-pulse ${props.className}`}
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













function MainComponent({ currentPage, setPage, t, network, ownerId }) {
  const {
    convertToMetricPrefix,
    formatTimestampToString,
    gasFee,
    getTimeAgoString,
    localFormat,
  } = VM.require(`${ownerId}/widget/includes.Utils.formats`);

  const { getConfig, handleRateLimit, nanoToMilli, shortenAddress } =
    VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [showAge, setShowAge] = useState(true);
  const [blocks, setBlocks] = useState({});
  const errorMessage = t ? t('blocks:noBlocks') : 'No blocks!';
  const [address, setAddress] = useState('');

  const config = getConfig && getConfig(network);

  useEffect(() => {
    function fetchTotalBlocks() {
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
            if (data.status === 200) {
              setTotalCount(resp?.count ?? 0);
            } else {
              handleRateLimit(data, fetchTotalBlocks);
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    function fetchBlocks(page) {
      setIsLoading(true);
      asyncFetch(`${config?.backendUrl}blocks?page=${page}&per_page=25`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const resp = data?.body?.blocks;
            if (data.status === 200) {
              setBlocks((prevData) => ({ ...prevData, [page]: resp || [] }));
              setIsLoading(false);
            } else {
              handleRateLimit(
                data,
                () => fetchBlocks(page),
                () => setIsLoading(false),
              );
            }
          },
        )
        .catch(() => {});
    }
    if (config?.backendUrl) {
      fetchTotalBlocks();
      fetchBlocks(currentPage);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, currentPage]);

  const onHandleMouseOver = (e, id) => {
    e.preventDefault();

    setAddress(id);
  };
  const handleMouseLeave = () => {
    setAddress('');
  };

  const start = blocks[currentPage]?.[0];
  const end = blocks[currentPage]?.[blocks[currentPage]?.length - 1];
  const toggleShowAge = () => setShowAge((s) => !s);

  const columns = [
    {
      header: <span>{t ? t('blocks:blocks') : 'BLOCK'}</span>,
      key: 'block_hash',
      cell: (row) => (
        <span>
          <Link
            href={`/blocks/${row?.block_hash}`}
            className="hover:no-underline"
          >
            <a className="text-green-500 hover:no-underline">
              {row?.block_height
                ? localFormat(row?.block_height)
                : row?.block_height ?? ''}
            </a>
          </Link>
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 font-medium',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: (
        <div>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  onClick={toggleShowAge}
                  className="w-full flex items-center px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex-row"
                >
                  {showAge ? (
                    <>
                      {t ? t('blocks:age') : 'AGE'}
                      <Clock className="text-green-500 ml-2" />
                    </>
                  ) : (
                    'DATE TIME (UTC)'
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
                align="center"
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
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600',
    },
    {
      header: <span>{t ? t('blocks:txn') : 'TXN'}</span>,
      key: 'count',
      cell: (row) => (
        <span>
          {row?.transactions_agg?.count
            ? localFormat(row?.transactions_agg?.count)
            : row?.transactions_agg?.count ?? ''}
        </span>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>{t ? t('blocks:block.receipt') : 'RECEIPT'}</span>,
      key: 'count',
      cell: (row) => (
        <span>
          {row?.receipts_agg?.count
            ? localFormat(row?.receipts_agg?.count)
            : row?.receipts_agg?.count ?? ''}
        </span>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>{t ? t('blocks:miner') : 'AUTHOR'}</span>,
      key: 'author_account_id',
      cell: (row) => (
        <span>
          <Link
            href={`/address/${row?.author_account_id}`}
            className={`hover:no-underline`}
          >
            <a
              className={`text-green-500 hover:no-underline ${
                row?.author_account_id === address
                  ? ' rounded-md bg-[#FFC10740] border-[#FFC10740] border border-dashed p-1 -m-[1px] cursor-pointer text-[#033F40]'
                  : 'text-green-500 p-1'
              }`}
              onMouseOver={(e) => onHandleMouseOver(e, row?.author_account_id)}
              onMouseLeave={handleMouseLeave}
            >
              {shortenAddress(row?.author_account_id ?? '')}
            </a>
          </Link>
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 font-medium',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>{t ? t('blocks:block.gasUsed') : 'GAS USED'}</span>,
      key: 'gas_used',
      cell: (row) => (
        <span>
          {row?.chunks_agg?.gas_used !== null
            ? convertToMetricPrefix(row?.chunks_agg?.gas_used) + 'gas'
            : ''}
        </span>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>{t ? t('blocks:block.gasLimit') : 'GAS LIMIT'}</span>,
      key: 'gas_limit',
      cell: (row) => (
        <span>{convertToMetricPrefix(row?.chunks_agg?.gas_limit ?? 0)}gas</span>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap',
    },
    {
      header: <span>{t ? t('blocks:block.gasFee') : 'GAS FEE'}</span>,
      key: 'gas_price',
      cell: (row) => (
        <span>
          {row?.chunks_agg?.gas_used
            ? gasFee(row?.chunks_agg?.gas_used, row?.gas_price)
            : row?.chunks_agg?.gas_used ?? ''}
          Ⓝ
        </span>
      ),
      tdClassName: 'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 uppercase tracking-wider whitespace-nowrap',
    },
  ];

  return (
    <div className="bg-white border soft-shadow rounded-xl pb-1 ">
      {isLoading ? (
        <div className="pl-6 max-w-lg w-full py-5 ">
          <Skeleton className="h-4" />
        </div>
      ) : (
        <p className="leading-7 pl-6 text-sm py-4 text-nearblue-600">
          {t
            ? t('blocks:listing', {
                from: start?.block_height
                  ? localFormat && localFormat(start?.block_height)
                  : start?.block_height ?? '',
                to: end?.block_height
                  ? localFormat && localFormat(end?.block_height)
                  : end?.block_height ?? '',
                count: localFormat && localFormat(totalCount.toString()),
              })
            : `Block #${
                start?.block_height
                  ? localFormat && localFormat(start?.block_height)
                  : start?.block_height ?? ''
              } to ${
                '#' + end?.block_height
                  ? localFormat && localFormat(end?.block_height)
                  : end?.block_height ?? ''
              } (Total of ${
                localFormat && localFormat(totalCount.toString())
              } blocks)`}{' '}
        </p>
      )}
      {
        <Widget
          src={`${ownerId}/widget/bos-components.components.Shared.Table`}
          props={{
            columns: columns,
            data: blocks[currentPage],
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
      }
    </div>
  );
}

return MainComponent(props, context);