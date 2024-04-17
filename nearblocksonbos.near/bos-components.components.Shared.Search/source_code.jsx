/**
 * @interface Props
 * @param {string}  [network] - The network data to show, either mainnet or testnet.
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {boolean} [isHeader] - If the component is part of a header, apply alternate styles.
 * @param {{ push: (path: string) => void }} router - An object with a `push` function for routing purposes.
 * @param {string} ownerId - The identifier of the owner of the component.
 */










/* INCLUDE COMPONENT: "includes/icons/SearchIcon.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */




const SearchIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={16}
      height={16}
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/SearchIcon.jsx" */
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
/* INCLUDE: "includes/search.jsx" */
function search(
  keyword,
  filter,
  returnPath,
  url,
) {
  try {
    const route = getRoute(filter);

    return asyncFetch(`${url}search/${route}?keyword=${keyword}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        const resp = data.body;
        if (!resp) {
          return returnPath
            ? null
            : { blocks: [], txns: [], accounts: [], receipts: [] };
        }

        if (resp.blocks?.length) {
          return returnPath
            ? { type: 'block', path: resp.blocks[0].block_hash }
            : { blocks: resp.blocks, txns: [], accounts: [], receipts: [] };
        }

        if (resp.txns?.length) {
          return returnPath
            ? { type: 'txn', path: resp.txns[0].transaction_hash }
            : { blocks: [], txns: resp.txns, accounts: [], receipts: [] };
        }

        if (resp.receipts?.length) {
          return returnPath
            ? {
                type: 'txn',
                path: resp.receipts[0].originated_from_transaction_hash,
              }
            : { blocks: [], txns: [], accounts: [], receipts: resp.receipts };
        }

        if (resp.accounts?.length) {
          return returnPath
            ? { type: 'address', path: resp.accounts[0].account_id }
            : { blocks: [], txns: [], accounts: resp.accounts, receipts: [] };
        }

        return returnPath
          ? null
          : { blocks: [], txns: [], accounts: [], receipts: [] };
      })
      .catch((err) => {
        console.error({ err });
        return null;
      });
  } catch (err) {
    console.error({ err });
    return Promise.resolve(null);
  }
}

function getRoute(filter) {
  switch (filter) {
    case 'txns':
      return 'txns';
    case 'blocks':
      return 'blocks';
    case 'accounts':
      return 'accounts';
    default:
      return '';
  }
}
/* END_INCLUDE: "includes/search.jsx" */

/* INCLUDE COMPONENT: "includes/icons/ErrorIcon.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const ErrorIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      width={16}
      height={16}
      {...props}
    >
      <path
        fill="#ef4444"
        d="M479.579-257Q505-257 519.5-270.579t14.5-39Q534-335 519.921-350t-39.5-15Q455-365 440.5-350.193T426-309.965q0 25.421 14.079 39.193Q454.158-257 479.579-257ZM437-432h91v-269h-91v269Zm42.945 373q-87.053 0-164.146-32.604-77.094-32.603-134.343-89.852-57.249-57.249-89.852-134.41Q59-393.028 59-480.362q0-87.228 32.662-163.934 32.663-76.706 90.203-134.253 57.54-57.547 134.252-90.499Q392.829-902 479.836-902q87.369 0 164.544 32.858 77.175 32.858 134.401 90.257 57.225 57.399 90.222 134.514Q902-567.257 902-479.724q0 87.468-32.952 163.882t-90.499 133.781q-57.547 57.367-134.421 90.214Q567.255-59 479.945-59Z"
      />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ErrorIcon.jsx" */
/* INCLUDE COMPONENT: "includes/Common/ToastMessage.jsx" */
const ToastMessage = (props) => {
  const [open, setOpen] = useState(true);
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className="flex gap-4 p-4 max-w-sm w-full items-center justify-between bg-white dark:bg-black-200 rounded-lg shadow drop-shadow-md z-50 outline-none"
        open={open}
        onOpenChange={setOpen}
      >
        {props.content}
        <Toast.Action className="" asChild altText="Goto schedule to undo">
          <button className="inline-flex h-fit w-fit items-center justify-center rounded-md font-medium text-red-500 focus:ring-red-500 focus:ring-offset-red-200 focus:ring-2 focus:outline-none focus:ring-offset-2 transition ease-in-out duration-150 text-xs lg:text-sm">
            x
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed top-0 right-0 gap-4 p-4 max-w-sm w-full rounded-lg z-50" />
    </Toast.Provider>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/ToastMessage.jsx" */

function MainComponent({
  isHeader,
  t,
  network,
  router,
  ownerId,
  networkUrl,
}) {
  const { localFormat, shortenHex } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { debounce, getConfig, shortenAddress } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState({} );
  const [filter, setFilter] = useState('all');
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const config = getConfig && getConfig(network);

  // Determine whether to show search results
  const showResults =
    (result?.blocks && result.blocks.length > 0) ||
    (result?.txns && result.txns.length > 0) ||
    (result?.accounts && result.accounts.length > 0) ||
    (result?.receipts && result.receipts.length > 0);
  const showSearchResults = () => {
    setIsResultsVisible(true);
  };

  const hideSearchResults = () => {
    setIsResultsVisible(false);
  };
  // Debounced keyword update
  const debouncedSetKeyword = useMemo(
    () => debounce && debounce(500, (value) => setKeyword(value)),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const SearchToast = () => {
    return (
      <div className="flex items-center">
        <div className="text-red-500 ">
          <ErrorIcon className=" mr-2 h-5 w-5" />
        </div>
        <Toast.Title className="text-nearblue-700">
          No results. Try on
        </Toast.Title>
        <Toast.Description asChild>
          <a
            href={networkUrl}
            className="text-green-500 dark:text-green-250 ml-2"
          >
            {network === 'mainnet' ? 'Testnet' : 'Mainnet'}
          </a>
        </Toast.Description>
      </div>
    );
  };
  useEffect(() => {
    const time = setTimeout(() => {
      if (showToast) {
        setShowToast(false);
      }
    }, 3000);
    return () => clearTimeout(time);
  }, [showToast]);
  const redirect = (route) => {
    switch (route?.type) {
      case 'block':
        return `/blocks/${route?.path}`;
      case 'txn':
        return `/txns/${route?.path}`;
      case 'receipt':
        return `/txns/${route?.path}`;
      case 'address':
        return `/address/${route?.path}`;
      default:
        return null;
    }
  };
  // Handle input change
  const handleChange = (event) => {
    const newNextValue = event.target.value.replace(/[\s,]/g, '') ;
    setQuery(newNextValue);
    debouncedSetKeyword && debouncedSetKeyword(newNextValue);
    showSearchResults();
  };

  const onSubmit = () => {
    if (filter && query && config.backendUrl) {
      search(query, filter, true, config.backendUrl).then((data) => {
        hideSearchResults();
        const redirectPath = redirect(data);
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          setShowToast(true);
        }
      });
    }
  };
  const onSelect = () => {
    hideSearchResults();
  };
  useEffect(() => {
    const fetchData = (keyword, filter) => {
      if (filter && keyword) {
        search(keyword, filter, false, config.backendUrl).then((data) => {
          setResult(data || {});
        });
      }
    };
    if (config.backendUrl) {
      fetchData(keyword, filter);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, filter, config.backendUrl]);
  // Handle filter change
  const onFilter = (event) =>
    setFilter(event.target.value);

  return (
    <>
      {showToast && <ToastMessage content={<SearchToast />} />}
      <div className="flex flex-grow">
        <div className={`flex w-full ${isHeader ? 'h-11' : 'h-12'}`}>
          <label className="relative hidden md:flex">
            <select
              className={`h-full block text-sm text-nearblue-600 ${
                isHeader
                  ? 'bg-blue-900/[0.05] dark:bg-black dark:text-neargray-10'
                  : 'bg-gray-100 dark:bg-black-500 dark:text-neargray-10'
              }  pl-4 pr-9  cursor-pointer focus:outline-none appearance-none rounded-none rounded-l-lg border  dark:border-black-200 dark:text-neargray-10	`}
              value={filter}
              onChange={onFilter}
            >
              <option value="all">
                {t ? t('common:search.filters.all') : 'All filters'}
              </option>
              <option value="txns">
                {t ? t('common:search.filters.txns') : 'Txns'}
              </option>
              <option value="blocks">
                {t ? t('common:search.filters.blocks') : 'Blocks'}
              </option>
              <option value="accounts">
                {t ? t('common:search.filters.addresses') : 'Addresses'}
              </option>
            </select>
            <ArrowDown className="absolute right-3 top-3.5 w-4 h-4 fill-current text-nearblue-600 dark:text-neargray-10 pointer-events-none" />
          </label>
          <div className="flex-grow">
            <input
              placeholder={
                t
                  ? t('common:search.placeholder')
                  : 'Search by Account ID / Txn Hash / Block'
              }
              className="search bg-white dark:bg-black-600 dark:text-neargray-10 w-full h-full text-sm px-4 py-3 outline-none dark:border-black-200 border-l border-t border-b md:border-l-0 rounded-l-lg rounded-r-none md:rounded-l-none"
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onSubmit();
                }
              }}
            />
            {isResultsVisible && showResults && (
              <div className="z-50 relative dark:bg-black-600">
                <div className="text-xs rounded-b-lg  bg-gray-50 py-2 shadow border dark:border-black-200 dark:bg-black-600">
                  {result?.accounts && result.accounts.length > 0 && (
                    <>
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 dark:text-neargray-10 dark:bg-black-200 rounded">
                        {t ? t('common:search.list.address') : 'Account'}
                      </h3>
                      {result.accounts.map((address) => (
                        <Link
                          href={`/address/${address.account_id}`}
                          className="hover:no-underline"
                          key={address.account_id}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 dark:hover:bg-black-200 dark:text-neargray-10 cursor-pointer rounded hover:border-gray-500 truncate"
                            onClick={onSelect}
                          >
                            {shortenAddress(address.account_id)}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                  {result?.txns && result.txns.length > 0 && (
                    <>
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 dark:text-neargray-10 dark:bg-black-200 rounded">
                        {t ? t('common:search.list.txns') : 'Txns'}
                      </h3>
                      {result.txns.map((txn) => (
                        <Link
                          className="hover:no-underline"
                          href={`/txns/${txn.transaction_hash}`}
                          key={txn.transaction_hash}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 dark:hover:bg-black-200 dark:text-neargray-10 rounded cursor-pointer hover:border-gray-500 truncate"
                            onClick={onSelect}
                          >
                            {shortenHex(txn.transaction_hash)}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                  {result?.receipts && result.receipts.length > 0 && (
                    <>
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 dark:text-neargray-10 dark:bg-black-200 rounded">
                        Receipts
                      </h3>
                      {result.receipts.map((receipt) => (
                        <Link
                          href={`/txns/${receipt.originated_from_transaction_hash}`}
                          className="hover:no-underline"
                          key={receipt.receipt_id}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 dark:hover:bg-black-200 dark:text-neargray-10 rounded cursor-pointer hover:border-gray-500 truncate"
                            onClick={onSelect}
                          >
                            {shortenHex(receipt.receipt_id)}
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                  {result?.blocks && result.blocks.length > 0 && (
                    <>
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 dark:text-neargray-10 dark:bg-black-200 rounded">
                        {t ? t('common:search.list.blocks') : 'Blocks'}
                      </h3>
                      {result.blocks.map((block) => (
                        <Link
                          href={`/blocks/${block.block_hash}`}
                          className="hover:no-underline"
                          key={block.block_hash}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 dark:hover:bg-black-200 dark:text-neargray-10 rounded cursor-pointer hover:border-gray-500 truncate"
                            onClick={onSelect}
                          >
                            #
                            {block.block_height
                              ? localFormat(block.block_height)
                              : ''}{' '}
                            (0x
                            {shortenHex(block.block_hash)})
                          </div>
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => onSubmit()}
            className={`${
              isHeader
                ? 'bg-blue-900/[0.05] dark:bg-black-600'
                : 'bg-gray-100 dark:bg-black-500'
            } rounded-r-lg px-5 outline-none focus:outline-none border dark:border-black-200`}
          >
            <SearchIcon className="text-gray-700 dark:text-gray-100 fill-current " />
          </button>
        </div>
      </div>
    </>
  );
}

return MainComponent(props, context);