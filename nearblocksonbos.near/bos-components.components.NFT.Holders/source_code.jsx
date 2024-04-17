/**
 * Component: NFTHolders
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Non-Fungible Token Holders List.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The token identifier passed as a string
 * @param {Token} [token] - The Token type passed as object
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


function MainComponent({ network, id, token, ownerId }) {
  const { localFormat, serialNumber, getTimeAgoString } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig, handleRateLimit, holderPercentage, nanoToMilli } =
    VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const [isLoading, setIsLoading] = useState(false);
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [holder, setHolder] = useState(
    {},
  );
  const [status, setStatus] = useState({
    height: 0,
    sync: true,
    timestamp: '',
  });

  const [tokens, setTokens] = useState({} );

  const config = getConfig && getConfig(network);

  const errorMessage = 'No token holders found!';

  const setPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    function fetchNFTData() {
      setIsLoading(true);
      asyncFetch(`${config.backendUrl}nfts/${id}`)
        .then(
          (data




) => {
            const resp = data?.body?.contracts?.[0];
            if (data.status === 200) {
              setTokens(resp);
              setIsLoading(false);
            } else {
              handleRateLimit(data, fetchNFTData, () => setIsLoading(false));
            }
          },
        )
        .catch(() => {});
    }
    function fetchStatus() {
      asyncFetch(`${config.backendUrl}sync/status`)
        .then(
          (data




) => {
            const resp = data?.body?.status?.aggregates.nft_holders;
            if (data.status === 200) {
              setStatus(resp);
            } else {
              handleRateLimit(data, fetchStatus);
            }
          },
        )
        .catch(() => {});
    }
    function fetchTotalHolders() {
      asyncFetch(`${config?.backendUrl}nfts/${id}/holders/count`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const resp = data?.body?.holders?.[0];
            if (data.status === 200) {
              setTotalCount(0);
              setTotalCount(resp?.count);
            } else {
              handleRateLimit(data, fetchTotalHolders);
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    function fetchHoldersData(page) {
      setIsLoading(true);

      asyncFetch(
        `${config?.backendUrl}nfts/${id}/holders?page=${page}&per_page=25`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(
          (data) => {
            const resp = data?.body?.holders;
            if (data.status === 200 && Array.isArray(resp) && resp.length > 0) {
              setHolder((prevData) => ({ ...prevData, [page]: resp || [] }));
              setIsLoading(false);
            } else {
              handleRateLimit(
                data,
                () => fetchHoldersData(page),
                () => setIsLoading(false),
              );
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }
    if (!token && token === undefined) {
      fetchNFTData();
    }
    if (config?.backendUrl) {
      fetchTotalHolders();
      fetchHoldersData(currentPage);
      fetchStatus();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, currentPage, id, token]);

  useEffect(() => {
    if (token) {
      setTokens(token);
    }
  }, [token]);

  const columns = [
    {
      header: <span>Rank</span>,
      key: '',
      cell: (_row, index) => (
        <span>{serialNumber(index, currentPage, 25)}</span>
      ),
      tdClassName:
        'pl-5 pr-2 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 w-[50px]',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider w-[50px]',
    },
    {
      header: <span> Address</span>,
      key: 'account',
      cell: (row) => (
        <span>
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="truncate max-w-[200px] inline-block align-bottom text-green-500 dark:text-green-250 whitespace-nowrap">
                  <Link
                    href={`/address/${row?.account}`}
                    className="hover:no-undeline"
                  >
                    <a className="text-green-500 dark:text-green-250 font-medium hover:no-undeline">
                      {row?.account}
                    </a>
                  </Link>
                </span>
              </Tooltip.Trigger>
              <Tooltip.Content
                className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white p-2 break-words"
                align="start"
                side="bottom"
              >
                {row?.account}
              </Tooltip.Content>
            </Tooltip.Root>
          </Tooltip.Provider>
        </span>
      ),
      tdClassName:
        'px-5 py-4 text-sm text-nearblue-600 dark:text-neargray-10 dark:text-neargray-10',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 dark:text-neargray-10 uppercase tracking-wider',
    },
    {
      header: <span>Quantity</span>,
      key: 'quantity',
      cell: (row) => <span>{row?.quantity}</span>,
      tdClassName:
        'px-5 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider w-[200px]',
    },
    {
      header: <span> Percentage</span>,
      key: 'tokens',
      cell: (row) => {
        const percentage =
          Number(tokens?.tokens) > 0
            ? holderPercentage(tokens?.tokens, row?.quantity)
            : null;
        return (
          <span>
            {percentage === null ? 'N/A' : `${percentage}%`}
            {percentage !== null && percentage <= 100 && percentage >= 0 && (
              <div className="h-0.5 mt-1 w-full bg-gray-100">
                <div
                  style={{ width: `${percentage}%` }}
                  className="h-0.5 bg-green-500 dark:bg-green-250"
                />
              </div>
            )}
          </span>
        );
      },
      tdClassName:
        'px-5 py-3 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10 font-medium',
      thClassName:
        'px-5 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider w-[300px] ',
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="pl-6 max-w-lg w-full py-5 ">
          <Skeleton className="h-4" />
        </div>
      ) : (
        <>
          {!status.sync && (
            <div className="w-full text-center bg-nearblue rounded-t-xl px-5 py-4 text-green text-sm">
              Holders count is out of sync. Last synced block is
              <span className="font-bold mx-0.5">
                {localFormat && localFormat(status.height)}
              </span>
              {status?.timestamp &&
                `(${getTimeAgoString(nanoToMilli(status.timestamp))}).`}{' '}
              Holders data will be delayed.
            </div>
          )}
          <div className={`flex flex-col lg:flex-row pt-4`}>
            <div className="flex flex-col">
              <p className="leading-7 px-6 text-sm mb-4 text-nearblue-600 dark:text-neargray-10">
                A total of {localFormat && localFormat(totalCount.toString())}{' '}
                token holders found
              </p>
            </div>
          </div>
        </>
      )}
      <Widget
        src={`${ownerId}/widget/bos-components.components.Shared.Table`}
        props={{
          columns: columns,
          data: holder[currentPage],
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
    </>
  );
}

return MainComponent(props, context);