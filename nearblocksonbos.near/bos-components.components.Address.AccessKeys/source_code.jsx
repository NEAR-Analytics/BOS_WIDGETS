/**
 * Component: AddressAccessKeys
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Table of Accesskey List.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string} [id] - The account identifier passed as a string.
 * @param {string} ownerId - The identifier of the owner of the component.
 */









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
  if (props.count > 0) {
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

function MainComponent({ network, t, id, ownerId }) {
  const { getConfig, handleRateLimit } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showWhen, setShowWhen] = useState(true);
  const [sorting, setSorting] = useState('desc');
  const [count, setCount] = useState(0);
  const [keys, Setkeys] = useState([]);

  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const config = getConfig && getConfig(network);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, id, currentPage, sorting]);

  return (
    <>
      <div className="bg-white soft-shadow rounded-xl overflow-x-auto ">
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
                  src={`${ownerId}/widget/bos-components.components.Address.AccessKeyRow`}
                  props={{
                    network: network,
                    t: t,
                    accessKey: key,
                    showWhen: showWhen,
                    ownerId,
                  }}
                  loading={
                    <div className=" whitespace-nowrap text-sm text-nearblue-600 ">
                      <Skeleton />
                    </div>
                  }
                />
              ))}
          </tbody>
        </table>
        <Paginator
          count={count}
          page={currentPage}
          limit={25}
          pageLimit={200}
          setPage={setPage}
        />
      </div>
    </>
  );
}

return MainComponent(props, context);