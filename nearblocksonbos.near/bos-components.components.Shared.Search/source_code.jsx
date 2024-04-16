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


function MainComponent({
  isHeader,
  t,
  network,
  router,
  ownerId,
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

  const redirect = (route) => {
    switch (route?.type) {
      case 'block':
        return router.push(`/blocks/${route?.path}`);
      case 'txn':
        return router.push(`/txns/${route?.path}`);
      case 'receipt':
        return router.push(`/txns/${route?.path}`);
      case 'address':
        return router.push(`/address/${route?.path}`);
      default:
        return;
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
        redirect(data);
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
              <div className="z-50 relative dark:bg-black">
                <div className="text-xs rounded-b-lg  bg-gray-50 py-2 shadow border dark:bg-black">
                  {result?.accounts && result.accounts.length > 0 && (
                    <>
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 rounded">
                        {t ? t('common:search.list.address') : 'Account'}
                      </h3>
                      {result.accounts.map((address) => (
                        <Link
                          href={`/address/${address.account_id}`}
                          className="hover:no-underline"
                          key={address.account_id}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 cursor-pointer hover:border-gray-500 truncate"
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
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 rounded">
                        {t ? t('common:search.list.txns') : 'Txns'}
                      </h3>
                      {result.txns.map((txn) => (
                        <Link
                          className="hover:no-underline"
                          href={`/txns/${txn.transaction_hash}`}
                          key={txn.transaction_hash}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 cursor-pointer hover:border-gray-500 truncate"
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
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 rounded">
                        Receipts
                      </h3>
                      {result.receipts.map((receipt) => (
                        <Link
                          href={`/txns/${receipt.originated_from_transaction_hash}`}
                          className="hover:no-underline"
                          key={receipt.receipt_id}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 cursor-pointer hover:border-gray-500 truncate"
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
                      <h3 className=" mx-2 my-2 px-2 py-2 text-sm bg-gray-100 rounded">
                        {t ? t('common:search.list.blocks') : 'Blocks'}
                      </h3>
                      {result.blocks.map((block) => (
                        <Link
                          href={`/blocks/${block.block_hash}`}
                          className="hover:no-underline"
                          key={block.block_hash}
                        >
                          <div
                            className="mx-2 px-2 py-2 hover:bg-gray-100 cursor-pointer hover:border-gray-500 truncate"
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