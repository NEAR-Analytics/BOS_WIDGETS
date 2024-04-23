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
      className={`bg-gray-200 dark:bg-black-200 rounded shadow-sm animate-pulse ${props.className}`}
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
    <div className="bg-white dark:bg-black-600 px-2 py-3 flex items-center justify-between border-t dark:border-black-200 md:px-4">
      <div className="flex-1 flex items-center justify-between">
        <div></div>

        <div>
          <div
            className="relative z-0 inline-flex rounded-md"
            aria-label="Pagination"
          >
            <button
              type="button"
              disabled={props.page <= 1 || pages === 1 || props.isLoading}
              onClick={onFirst}
              className={`relative inline-flex items-center px-2 ml-1 md:px-3 py-2  text-xs font-medium rounded-md ${
                props.page <= 1 || props.isLoading
                  ? 'text-gray-500 dark:text-neargray-10'
                  : 'text-green-400 dark:text-green-250 hover:bg-green-400 dark:hover:bg-green-250 hover:text-white dark:hover:text-black'
              } bg-gray-100 dark:bg-black-200 dark:text-green-250`}
            >
              First
            </button>
            <button
              type="button"
              disabled={props.page <= 1 || pages === 1 || props.isLoading}
              onClick={onPrev}
              className={`relative inline-flex items-center px-2 ml-1 md:px-3 py-2 font-medium ${
                props.page <= 1 || props.isLoading
                  ? 'text-gray-500 dark:text-neargray-10'
                  : 'text-green-400 dark:text-green-250 hover:text-white dark:hover:text-black hover:bg-green-400 dark:hover:bg-green-250'
              } rounded-md  bg-gray-100 dark:bg-black-200`}
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              disabled
              className="relative inline-flex items-center px-2 ml-1 md:px-3 py-2 text-xs font-medium text-gray-500  rounded-md  bg-gray-100 dark:bg-black-200 dark:text-neargray-10"
            >
              Page {props.page} of {pages}
            </button>
            <button
              type="button"
              disabled={props.page >= pages || pages === 1 || props.isLoading}
              onClick={onNext}
              className={`relative inline-flex items-center ml-1 px-2 md:px-3 py-2 rounded-md font-medium ${
                props.page >= pages || props.isLoading
                  ? 'text-gray-500 dark:text-neargray-10'
                  : 'text-green-400 dark:text-green-250 hover:text-white dark:hover:text-black hover:bg-green-400 dark:hover:bg-green-250'
              }  bg-gray-100 dark:text-green-250 dark:bg-black-200`}
            >
              <FaChevronRight />
            </button>
            <button
              type="button"
              disabled={props.page >= pages || pages === 1 || props.isLoading}
              onClick={onLast}
              className={`relative inline-flex items-center px-2 ml-1 md:px-3 py-2 text-xs font-medium rounded-md ${
                props.page >= pages || props.isLoading
                  ? 'text-gray-500 dark:text-neargray-10'
                  : 'text-green-400 dark:text-green-250 hover:text-white dark:hover:text-black hover:bg-green-400 dark:hover:bg-green-250'
              }  bg-gray-100 dark:text-green-250 dark:bg-black-200`}
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/Paginator.jsx" */
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
      <div className="bg-white dark:bg-black-600 soft-shadow rounded-xl relative overflow-x-auto ">
        <table className="min-w-full divide-y dark:divide-black-200 dark:border-black-200 border-t">
          <thead className="bg-gray-100 dark:bg-black-300">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  dark:text-neargray-10 uppercase tracking-wider"
              >
                Txn Hash
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600  dark:text-neargray-10 uppercase tracking-wider"
              >
                Public key
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider"
              >
                Access
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider"
              >
                Contract
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider"
              >
                Method
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider"
              >
                Allowance
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-xs font-semibold text-nearblue-600 dark:text-neargray-10 uppercase tracking-wider"
              >
                Action
              </th>
              <th scope="col" className="text-left">
                <div className="w-full inline-flex px-4 py-4">
                  <button
                    type="button"
                    onClick={toggleShowWhen}
                    className="text-left text-xs w-full font-semibold uppercase tracking-wider text-nearblue-600 dark:text-neargray-10 focus:outline-none"
                  >
                    {showWhen ? 'When' : 'Date Time (UTC)'}
                  </button>
                  <button type="button" onClick={onOrder} className="px-2">
                    <div className="text-nearblue-600  dark:text-neargray-10 font-semibold">
                      <SortIcon order={sorting} />
                    </div>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-black-600 dark:divide-black-200 divide-y divide-gray-200">
            {isLoading &&
              [...Array(25)].map((_, i) => (
                <tr key={i} className="hover:bg-blue-900/5 h-[57px]">
                  <td className="pl-6 pr-28 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="pl-6 pr-28 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-tiny ">
                    <Skeleton className="w-8 h-4" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                    <Skeleton className="w-full h-4" />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                    <Skeleton className="w-full h-4" />
                  </td>
                </tr>
              ))}
            {!isLoading && keys?.length === 0 && (
              <tr className="h-[57px]">
                <td
                  colSpan={100}
                  className="px-6 py-4 text-nearblue-700 dark:text-gray-400 text-xs"
                >
                  <ErrorMessage
                    icons={<FaInbox />}
                    message="No access keys"
                    mutedText="Please try again later"
                  />
                </td>
              </tr>
            )}
            {!isLoading &&
              keys &&
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
                    <tr className="hover:bg-blue-900/5 h-[57px]">
                      <td className="pl-4 pr-28 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                        <Skeleton className="w-full h-4" />
                      </td>
                      <td className="pl-6 pr-28 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                        <Skeleton className="w-full h-4" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-tiny">
                        <Skeleton className="w-8 h-4" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                        <Skeleton className="w-full h-4" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                        <Skeleton className="w-full h-4" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                        <Skeleton className="w-full h-4" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                        <Skeleton className="w-full h-4" />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-nearblue-600 dark:text-neargray-10">
                        <Skeleton className="w-full h-4" />
                      </td>
                    </tr>
                  }
                />
              ))}
          </tbody>
        </table>
      </div>
      {keys.length > 0 && (
        <Paginator
          count={count}
          isLoading={isLoading}
          page={currentPage}
          limit={25}
          pageLimit={200}
          setPage={setPage}
        />
      )}
    </>
  );
}

return MainComponent(props, context);