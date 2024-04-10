/**
 * Component: NFTInventory
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Non-Fungible Token Inventory List.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The token identifier passed as a string
 * @param {Token} [token] - The Token type passed as object
 * @param {string} ownerId - The identifier of the owner of the component.
 */

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









function MainComponent({ network, id, token, ownerId }) {
  const { localFormat } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig, handleRateLimit } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [isLoading, setIsLoading] = useState(false);
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [tokens, setTokens] = useState([]);

  const config = getConfig && getConfig(network);

  const [tokenData, setTokenData] = useState({} );

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
              setTokenData(resp);
              setIsLoading(false);
            } else {
              handleRateLimit(data, fetchNFTData, () => setIsLoading(false));
            }
          },
        )
        .catch(() => {});
    }

    function fetchTotalToken() {
      asyncFetch(`${config?.backendUrl}nfts/${id}/tokens/count`, {
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
              setTotalCount(resp?.count);
            } else {
              handleRateLimit(data, fetchTotalToken);
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    function fetchTokenData() {
      setIsLoading(true);

      asyncFetch(
        `${config?.backendUrl}nfts/${id}/tokens?page=${currentPage}&per_page=24`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then((data) => {
          const resp = data?.body?.tokens;
          if (data.status === 200 && Array.isArray(resp) && resp.length > 0) {
            setTokens(resp);
            setIsLoading(false);
          } else {
            handleRateLimit(data, fetchTokenData, () => setIsLoading(false));
          }
        })
        .catch(() => {});
    }
    if (!token && token === undefined) {
      fetchNFTData();
    }
    if (config?.backendUrl) {
      fetchTotalToken();
      fetchTokenData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, currentPage, id, token]);

  useEffect(() => {
    if (token) {
      setTokenData(token);
    }
  }, [token]);

  return (
    <>
      {isLoading ? (
        <div className="pl-6 max-w-lg w-full py-5 ">
          <Skeleton className="h-4" />
        </div>
      ) : (
        <div className={`flex flex-col lg:flex-row pt-4 border-b`}>
          <div className="flex flex-col">
            <p className="leading-7 px-6 text-sm mb-4 text-nearblue-600">
              A total of {localFormat && localFormat(totalCount.toString())}{' '}
              tokens found
            </p>
          </div>
        </div>
      )}
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 m-6">
        {isLoading &&
          [...Array(24)].map((_, i) => (
            <div
              className="max-w-full border rounded p-3 mx-auto md:mx-0"
              key={i}
            >
              <a
                href="#"
                className="flex items-center justify-center m-auto overflow-hidden"
              >
                <div className="w-40 h-40 ">
                  <Skeleton className="h-40" />
                </div>
              </a>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden text-xs mb-1 text-nearblue-600 mt-4">
                <Skeleton className="h-4" />
              </div>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden text-xs mb-1 text-nearblue-600">
                <Skeleton className="h-4" />
              </div>
            </div>
          ))}
        {!isLoading &&
          tokens &&
          tokens?.map((nft) => (
            <div
              className="max-w-full border rounded p-3 mx-auto md:mx-0"
              key={nft?.contract + nft?.token}
            >
              <Link
                href={`/nft-token/${nft?.contract}/${nft?.token}`}
                className="hover:no-underline"
              >
                <a className="w-40 h-40 flex items-center justify-center m-auto overflow-hidden hover:no-underline">
                  {
                    <Widget
                      src={`${ownerId}/widget/bos-components.components.Shared.NFTImage`}
                      props={{
                        base: tokenData.base_uri,
                        reference: nft.reference,
                        media: nft.media,
                        className: 'rounded max-h-full',
                        network: network,
                        ownerId,
                      }}
                    />
                  }
                </a>
              </Link>
              <div className="whitespace-nowrap text-ellipsis overflow-hidden text-xs mb-1 text-nearblue-600 mt-4">
                Token ID:{' '}
                <Link
                  href={`/nft-token/${nft?.contract}/${nft?.token}`}
                  className="hover:no-underline"
                >
                  <a className="text-green hover:no-underline">{nft?.token}</a>
                </Link>
              </div>
              {nft?.asset && (
                <div className="whitespace-nowrap text-ellipsis overflow-hidden text-xs mb-1 text-nearblue-600">
                  Owner:{' '}
                  <Link
                    href={`/address/${nft?.asset?.owner}`}
                    className="hover:no-underline"
                  >
                    <a className="text-green hover:no-underline">
                      {nft?.asset?.owner}
                    </a>
                  </Link>
                </div>
              )}
            </div>
          ))}
      </div>
      <Paginator
        count={totalCount}
        page={currentPage}
        setPage={setPage}
        limit={24}
        pageLimit={200}
      />
    </>
  );
}

return MainComponent(props, context);