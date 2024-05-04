/**
 * Component: FTList
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Top Tokens on Near Protocol.
 * @interface Props
 * @param {string}  [network] - The network data to show, either mainnet or testnet.
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {number} [currentPage] - The current page number being displayed. (Optional)
 *                                 Example: If provided, currentPage=3 will display the third page of blocks.
 * @param {function} [setPage] - A function used to set the current page. (Optional)
 *                               Example: setPage={handlePageChange} where handlePageChange is a function to update the page.
 * @param {string} ownerId - The identifier of the owner of the component.
 */








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

const initialSorting = {
  sort: 'onchain_market_cap',
  order: 'desc',
};
const initialPagination = {
  per_page: 50,
};
function MainComponent({ t, network, currentPage, setPage, ownerId }) {
  const {
    priceFormat,
    dollarFormat,
    dollarNonCentFormat,
    serialNumber,
    localFormat,
  } = VM.require(`${ownerId}/widget/includes.Utils.formats`);

  const { debounce, getConfig, handleRateLimit } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [tokens, setTokens] = useState({});

  const [sorting, setSorting] = useState(initialSorting);
  const errorMessage = t ? t('token:fts.top.empty') : 'No tokens found!';

  const config = getConfig && getConfig(network);

  const ArrowUp = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={24}
        height={24}
        className="h-3 w-3 fill-current mr-1"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z" />
      </svg>
    );
  };

  useEffect(() => {
    function fetchTotalTokens(qs) {
      const queryParams = qs ? '?' + qs : '';
      asyncFetch(`${config?.backendUrl}fts/count${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const resp = data?.body?.tokens?.[0];
            if (data.status === 200) {
              setTotalCount(resp?.count ?? 0);
            } else {
              handleRateLimit(data, () => fetchTotalTokens(qs));
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    function fetchTokens(qs, sqs, page) {
      setIsLoading(true);
      const queryParams = qs ? qs + '&' : '';
      asyncFetch(
        `${config?.backendUrl}fts?${queryParams}order=${sqs?.order}&sort=${sqs?.sort}&page=${page}&per_page=50`,
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
            if (data.status === 200) {
              setTokens((prevData) => ({ ...prevData, [page]: resp || [] }));
              setIsLoading(false);
            } else {
              handleRateLimit(
                data,
                () => fetchTokens(qs, sorting, page),
                () => setIsLoading(false),
              );
            }
          },
        )
        .catch(() => {});
    }
    if (config?.backendUrl) {
      fetchTotalTokens();
      fetchTokens('', sorting, currentPage);
      if (sorting) {
        fetchTotalTokens();
        fetchTokens('', sorting, currentPage);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const debouncedSearch = useMemo(() => {
    return (
      debounce &&
      debounce(500, (value) => {
        if (!value || value.trim() === '') {
          setSearchResults([]);
          return;
        }
        asyncFetch(`${config?.backendUrl}fts?search=${value}&per_page=5`, {
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
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl]);

  const onChange = (e) => {
    const value = e.target.value;
    debouncedSearch(value);
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
        'pl-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>{t ? t('token:fts.top.token') : 'TOKEN'}</span>,
      key: 'name',
      cell: (row) => (
        <>
          <div className="flex items-center">
            <TokenImage
              src={row?.icon}
              alt={row?.name}
              appUrl={config?.appUrl}
              className="w-5 h-5 mr-2"
            />
            <Link
              href={`/token/${row?.contract}`}
              className="hover:no-underline"
            >
              <a className=" text-green-500 dark:text-green-250 hover:no-underline flex items-center">
                <span className="inline-block truncate max-w-[200px] mr-1">
                  {row?.name}
                </span>
                <span className="text-nearblue-700 inline-block truncate max-w-[80px]">
                  {row?.symbol}
                </span>
              </a>
            </Link>
          </div>
        </>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 w-80  align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>{t ? t('token:fts.top.price') : 'PRICE'}</span>,
      key: 'price',
      cell: (row) => (
        <span>
          {row?.price === null ? (
            <span className="text-xs">N/A</span>
          ) : (
            `$${priceFormat(row?.price)}`
          )}
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: (
        <span className=" whitespace-nowrap">
          {t ? t('token:fts.top.change') : 'CHANGE'} (%)
        </span>
      ),
      key: 'change_24',
      cell: (row) => (
        <span>
          {row?.change_24 === null ? (
            <span className="text-xs">N/A</span>
          ) : Number(row?.change_24) > 0 ? (
            <div className="text-neargreen flex flex-row items-center">
              <ArrowUp />+{dollarFormat(row?.change_24)}%
            </div>
          ) : (
            <div className="text-red-500 flex flex-row items-center">
              <ArrowDown className="h-3 w-3 fill-current mr-1" />
              {row?.change_24 ? dollarFormat(row?.change_24) + '%' : ''}
            </div>
          )}
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>{t ? t('token:fts.top.volume') : 'VOLUME'} (24H)</span>,
      key: 'volume_24h',
      cell: (row) => (
        <span>
          {row?.volume_24h === null ? (
            <span className="text-xs">N/A</span>
          ) : (
            `$${dollarNonCentFormat(row?.volume_24h)}`
          )}
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: (
        <span className="flex">
          <span className="uppercase whitespace-nowrap">Circulating MC</span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span>
                  <Question className="w-4 h-4 fill-current ml-1" />
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className=" h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 "
                align="start"
                side="bottom"
              >
                {
                  'Calculated by multiplying the number of tokens in circulating supply across all chains with the current market price per token.'
                }
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      key: 'market_cap',
      cell: (row) => (
        <span>
          {row?.market_cap === null ||
          dollarNonCentFormat(row?.market_cap) === '0' ? (
            <span className="text-xs">N/A</span>
          ) : (
            `$${dollarNonCentFormat(row?.market_cap)}`
          )}
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 align-top',
      thClassName:
        'px-6 py-2 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 tracking-wider',
    },
    {
      header: (
        <span>
          {' '}
          <button
            type="button"
            onClick={() => onOrder('onchain_market_cap')}
            className="w-full px-6 py-2 text-left text-xs font-semibold  tracking-wider text-green-500 dark:text-green-250 focus:outline-none flex flex-row"
          >
            {sorting?.sort === 'onchain_market_cap' && (
              <div className="text-nearblue-600 dark:text-neargray-10 font-semibold">
                <SortIcon order={sorting?.order} />
              </div>
            )}
            <span className="uppercase whitespace-nowrap">On-Chain MC</span>
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <span>
                    <Question className="w-4 h-4 fill-current ml-1" />
                  </span>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className=" h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2 break-words"
                  align="start"
                  side="bottom"
                >
                  {
                    "Calculated by multiplying the token's Total Supply on Near with the current market price per token"
                  }
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
          </button>
        </span>
      ),
      key: 'onchain_market_cap',
      cell: (row) => (
        <span>
          {row?.onchain_market_cap === null ? (
            <span className="text-xs">N/A</span>
          ) : (
            `$${
              row?.onchain_market_cap
                ? dollarNonCentFormat(row?.onchain_market_cap)
                : row?.onchain_market_cap ?? ''
            }`
          )}
        </span>
      ),
      tdClassName:
        'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 align-top',
    },
    // {
    //   header: (
    //     <span>
    //       <button
    //         type="button"
    //         onClick={() => onOrder('holders')}
    //         className="w-full px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-green-500 focus:outline-none flex flex-row"
    //       >
    //         {sorting?.sort === 'holders' && (
    //           <div className="text-nearblue-600 font-semibold">
    //             <SortIcon order={sorting?.order} />
    //           </div>
    //         )}
    //         Holders
    //       </button>{' '}
    //     </span>
    //   ),
    //   key: 'holders',
    //   cell: (row: Token) => (
    //     <span>{row?.holders ? localFormat(row?.holders) : ''}</span>
    //   ),
    //   tdClassName:
    //     'px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 align-top',
    // },
  ];

  return (
    <div className=" bg-white  dark:bg-black-600 dark:border-black-200 border soft-shadow rounded-xl pb-1 ">
      <div className="flex flex-row items-center justify-between text-left text-sm text-nearblue-600 dark:text-neargray-10 px-3 py-2">
        {isLoading ? (
          <div className="max-w-lg w-full pl-3">
            <Skeleton className="h-4" />
          </div>
        ) : (
          <p className="pl-3">
            {Object.keys(tokens).length > 0 &&
              `${
                t
                  ? t('token:fts.top.listing', {
                      count: localFormat && localFormat(totalCount),
                    })
                  : `A total of ${
                      localFormat && localFormat(totalCount)
                    } Token Contracts found`
              }`}
          </p>
        )}
        <div className={`flex w-full h-10 sm:w-80 mr-2`}>
          <div className="flex-grow">
            <label htmlFor="token-search" id="token-search">
              <input
                name="search"
                autoComplete="off"
                placeholder="Search"
                className="search ml-2 pl-8 token-search bg-white dark:bg-black-600 dark:border-black-200 w-full h-full text-sm py-2 outline-none border rounded-xl"
                onChange={onChange}
              />
            </label>
            {searchResults?.length > 0 && (
              <div className="z-50 relative">
                <div className="text-xs rounded-b-md -mr-2 ml-2 -mt-1 bg-white dark:bg-black-600 py-2 shadow">
                  {searchResults.map((token) => (
                    <div
                      key={token?.contract}
                      className="mx-2 px-2 py-2 hover:bg-gray-100 cursor-pointer hover:border-gray-500 truncate"
                    >
                      <Link
                        href={`/token/${token?.contract}`}
                        className="hover:no-underline"
                      >
                        <a className="hover:no-underline flex items-center my-1 whitespace-nowrap ">
                          <div className="flex-shrink-0 h-5 w-5 mr-2">
                            <TokenImage
                              src={token?.icon}
                              alt={token?.name}
                              appUrl={config?.appUrl}
                              className="w-5 h-5"
                            />
                          </div>
                          <p className="font-semibold text-sm truncate">
                            {token?.name}
                            <span className="text-nearblue-700 ml-2">
                              {token?.symbol}
                            </span>
                          </p>
                        </a>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Widget
        src={`${ownerId}/widget/bos-components.components.Shared.Table`}
        props={{
          columns: columns,
          data: tokens[currentPage],
          isLoading: isLoading,
          isPagination: true,
          count: totalCount,
          page: currentPage,
          limit: 50,
          pageLimit: 200,
          setPage: setPage,
          Error: (
            <ErrorMessage
              icons={<FaInbox />}
              message={errorMessage || ''}
              mutedText="Please try again later"
            />
          ),
        }}
      />
    </div>
  );
}

return MainComponent(props, context);