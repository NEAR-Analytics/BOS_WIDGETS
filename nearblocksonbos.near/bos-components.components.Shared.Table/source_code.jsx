/* INCLUDE COMPONENT: "includes/Common/CursorPaginator.jsx" */
const CursorPaginator = (props) => {
  const [disabled, setDisabled] = useState(true);
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { formatWithCommas } = VM.require(
    `${props.ownerId}/widget/includes.Utils.formats`,
  );

  function constructURL(params) {
    let url = props.apiUrl;
    if (params) {
      return `${url}cursor=${params}&`;
    }
    return url;
  }

  const handleNextPage = () => {
    props.setUrl(constructURL(props.cursor));
    setCurrentPage((prev) => prev + 1);
    setDisabled(false);
  };
  const onFirst = () => {
    props.setUrl(props.apiUrl);
    setDisabled(true);
    setCurrentPage(initialPage);
  };

  return (
    <>
      <div className="bg-white dark:bg-black-600 px-2 py-3 flex items-center justify-between border-t dark:border-black-200 md:px-4 rounded-b-xl">
        <div className="flex-1 flex items-center justify-between">
          <div></div>
          <div
            className="relative z-0 inline-flex rounded-md"
            aria-label="Pagination"
          >
            <button
              type="button"
              disabled={disabled || props.isLoading}
              onClick={onFirst}
              className={`relative inline-flex items-center px-2 ml-1 md:px-3 py-2  text-xs font-medium rounded-md ${
                disabled || props.isLoading
                  ? 'text-gray-500 dark:text-neargray-10'
                  : 'text-green-400 dark:text-green-250 hover:bg-green-400 dark:hover:bg-green-250 hover:text-white dark:hover:text-black'
              } bg-gray-100 dark:bg-black-200 dark:text-green-250`}
            >
              First
            </button>
            <button
              type="button"
              disabled
              className="relative inline-flex items-center px-2 ml-1 md:px-3 py-2 text-xs font-medium text-gray-500  rounded-md  bg-gray-100 dark:bg-black-200 dark:text-neargray-10"
            >
              {`Page ${formatWithCommas(currentPage)}`}
            </button>
            <button
              type="button"
              disabled={props.isLoading || !props.cursor}
              onClick={handleNextPage}
              className={`relative inline-flex items-center ml-1 px-2 md:px-3 py-2 rounded-md font-medium text-xs ${
                props.isLoading || !props.cursor
                  ? 'text-gray-500 dark:text-neargray-10'
                  : 'text-green-400 dark:text-green-250 hover:text-white dark:hover:text-black hover:bg-green-400 dark:hover:bg-green-250'
              }  bg-gray-100 dark:text-green-250 dark:bg-black-200`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/CursorPaginator.jsx" */
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
    <div className="bg-white dark:bg-black-600 px-2 py-3 flex items-center justify-between border-t dark:border-black-200 md:px-4 rounded-b-xl">
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
/**
 * @param {boolean} isLoading - Represents the loading state of the data.
 * @param {Array} columns - An array of objects defining the columns for the table.
 * @param {Array} data - An array of rows containing data for the table.
 * @param {boolean} isPagination - Indicates if pagination is enabled for the table.
 * @param {number} count - The total count of items in the dataset.
 * @param {number} page - The current page number being displayed.
 * @param {number} limit - The number of items per page.
 * @param {string} Error - Error message if there is no data.
 * @param {number} pageLimit - The maximum number of pages to display in pagination.
 * @param {function} setPage - A function used to set the current page of the table.
 * @param {function} renderRowSubComponent - A function is used to render a sub-component for each row in the table.
 * @param {Array} expanded - An array of numbers representing the indices of rows that are expanded.
 * @param {boolean} isExpanded -  Flag for compact table display.
 * @param {boolean} cursorPagination - Indicates if cursor pagination is enabled for the table
 * @param {string} cursor - Cursor to be set when pagination is applied.
 * @param {string} apiUrl - URL used for attaching cursor during pagination.
 * @param {function} setUrl - A function used to set the URL on the current table.
 * @param {string} ownerId - The identifier of the owner of the component.
 */





























function MainComponent(props) {
  if (props.isLoading) {
    return (
      <>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y dark:divide-black-200 dark:border-black-200 border-t">
            <thead className="bg-gray-100 dark:bg-black-300 h-[51px]">
              <tr>
                {props.columns.map((column, index) => (
                  <th key={index} scope="col" className={column.thClassName}>
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black-600 dark:divide-black-200 divide-y divide-gray-200">
              {[...Array(props.limit)].map((_, index) => (
                <tr key={index} className=" hover:bg-blue-900/5 h-[57px]">
                  {props.columns.map((column, colIndex) => (
                    <td key={colIndex} className={column.tdClassName}>
                      <Skeleton className="h-4" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {props.isPagination ? (
          <Paginator
            count={props.count}
            page={props.page}
            isLoading={props.isLoading}
            limit={props.limit}
            pageLimit={props.pageLimit}
            setPage={props.setPage}
          />
        ) : null}
        {props.cursorPagination ? (
          <CursorPaginator
            apiUrl={props.apiUrl}
            count={props.count}
            limit={props.limit}
            setUrl={props.setUrl}
            cursor={props.cursor}
            isLoading={props.isLoading}
            ownerId={props.ownerId}
          />
        ) : null}
      </>
    );
  }
  return (
    <>
      {props.isExpanded ? (
        <div className={`bg-gray-50 dark:bg-black-600 overflow-x-auto`}>
          <table
            className={
              'min-w-full divide-y dark:divide-black-200 dark:border-black border-separate '
            }
          >
            <thead>
              <tr>
                {props?.columns.map((column, index) => (
                  <th key={index} scope="col" className={column.thClassName}>
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!props.isLoading && props.data === undefined && (
                <tr className="h-[57px]">
                  <td colSpan={100} className="px-6 py-4 text-gray-400 text-xs">
                    {props.Error}
                  </td>
                </tr>
              )}
              {props.data &&
                props.data.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    {row?.showWarning && (
                      <tr
                        key={`expandWarning-${rowIndex}`}
                        className="h-[25px] hover:bg-blue-900/5"
                      >
                        <td
                          colSpan={props.columns.length}
                          className="px-5 py-2 whitespace-nowrap text-center text-sm text-yellow-500 font-medium"
                        >
                          {row?.warning}
                        </td>
                      </tr>
                    )}
                    <tr key={`expandRow-${rowIndex}`} className="h-[57px]">
                      {props.columns.map((column, colIndex) => (
                        <td
                          key={`expandCol-${colIndex}`}
                          className={column.tdClassName}
                        >
                          {column.cell
                            ? column.cell(row, rowIndex)
                            : row[column.key]}
                        </td>
                      ))}
                    </tr>
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto ">
          <table className="min-w-full divide-y dark:divide-black-200 dark:border-black-200 border-t">
            <thead className="bg-gray-100 dark:bg-black-300 h-[51px]">
              <tr>
                {props?.columns.map((column, index) => (
                  <th key={index} scope="col" className={column.thClassName}>
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-black-600 divide-y dark:divide-black-200 divide-gray-200">
              {!props.isLoading && props.data === undefined && (
                <tr className="h-[57px]">
                  <td colSpan={100} className="px-6 py-4 text-gray-400 text-xs">
                    {props.Error}
                  </td>
                </tr>
              )}
              {props.data &&
                props.data.map((row, rowIndex) => (
                  <Fragment key={rowIndex}>
                    {row?.showWarning && (
                      <tr
                        key={`warning-${rowIndex}`}
                        className="h-[25px] hover:bg-blue-900/5"
                      >
                        <td
                          colSpan={props.columns.length}
                          className="px-5 py-4  whitespace-nowrap text-sm text-center text-yellow-500 font-medium"
                        >
                          {row?.warning}
                        </td>
                      </tr>
                    )}
                    <tr
                      key={`row-${rowIndex}`}
                      className="hover:bg-blue-900/5 h-[57px]"
                    >
                      {props.columns.map((column, colIndex) => (
                        <td
                          key={`col-${colIndex}`}
                          className={column.tdClassName}
                        >
                          {column.cell
                            ? column.cell(row, rowIndex)
                            : row[column.key]}
                        </td>
                      ))}
                    </tr>
                    {row.isExpanded ||
                    (props.expanded.length > 0 &&
                      props.expanded.includes(row.index))
                      ? props.renderRowSubComponent(row)
                      : null}
                  </Fragment>
                ))}
            </tbody>
          </table>
        </div>
      )}
      {props.isPagination && props.data ? (
        <Paginator
          count={props.count}
          isLoading={props.isLoading}
          page={props.page}
          limit={props.limit}
          pageLimit={props.pageLimit}
          setPage={props.setPage}
        />
      ) : null}
      {props.cursorPagination && props.data ? (
        <CursorPaginator
          apiUrl={props.apiUrl}
          count={props.count}
          limit={props.limit}
          setUrl={props.setUrl}
          cursor={props.cursor}
          isLoading={props.isLoading}
          ownerId={props.ownerId}
        />
      ) : null}
    </>
  );
}

return MainComponent(props, context);