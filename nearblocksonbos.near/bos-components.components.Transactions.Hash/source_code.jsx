/**
 * Component: TransactionsHash
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Transaction Hash on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string} [hash] -  The Transaction identifier passed as a string.
 * @param {function} [onHandleTab] - Function to handle tab changes. (Optional)
 *                                    Example: onTab={onHandleTab} where onHandleTab is a function to change tab on the page.
 * @param {string} [pageTab] - The page tab being displayed. (Optional)
 *                                 Example: If provided, tab=overview in the url it will select the overview tab of transaction details.
 * @param {string} ownerId - The identifier of the owner of the component.
 */










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
/* INCLUDE COMPONENT: "includes/icons/FileSlash.jsx" */
const FileSlash = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      height="24"
      width="24"
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
    >
      <path d="M21.71,20.29l-18-18A1,1,0,0,0,2.29,3.71L4,5.41V19a3,3,0,0,0,3,3H17a3,3,0,0,0,2.39-1.2l.9.91a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM17,20H7a1,1,0,0,1-1-1V7.41L17.93,19.34A1,1,0,0,1,17,20ZM8.66,4H12V7a3,3,0,0,0,3,3h3v3.34a1,1,0,1,0,2,0V9s0,0,0-.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19l-.09,0L13.06,2H8.66a1,1,0,0,0,0,2ZM14,5.41,16.59,8H15a1,1,0,0,1-1-1Z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FileSlash.jsx" */


const hashes = ['overview', 'execution', 'comments'];

function MainComponent(props) {
  const { t, network, hash, onHandleTab, pageTab, ownerId } = props;

  const { getConfig, handleRateLimit } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [txn, setTxn] = useState(null);
  const [error, setError] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [rpcTxn, setRpcTxn] = useState(
    {} ,
  );

  const config = getConfig && getConfig(network);

  const onTab = (index) => {
    onHandleTab(hashes[index]);
  };

  useEffect(() => {
    function fetchTxn() {
      setIsLoading(true);
      asyncFetch(`${config.backendUrl}txns/${hash}`)
        .then(
          (data




) => {
            const resp = data?.body?.txns?.[0];
            if (data.status === 200) {
              setError(false);
              setTxn(resp);
              setIsLoading(false);
            } else {
              handleRateLimit(data, fetchTxn, () => setIsLoading(false));
            }
          },
        )
        .catch((error) => {
          if (error) setError(true);
          setIsLoading(false);
        });
    }
    if (config.backendUrl) {
      fetchTxn();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.backendUrl, hash]);

  useEffect(() => {
    function fetchTransactionStatus() {
      if (txn) {
        asyncFetch(config?.rpcUrl, {
          method: 'POST',
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 123,
            method: 'EXPERIMENTAL_tx_status',
            params: [txn.transaction_hash, txn.signer_account_id],
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(
            (res




) => {
              const resp = res?.body?.result;
              if (res.status === 200) {
                setRpcTxn(resp);
              } else {
                handleRateLimit(res, fetchTransactionStatus);
              }
            },
          )
          .catch(() => {});
      }
    }
    if (config?.rpcUrl) {
      fetchTransactionStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txn, config?.rpcUrl]);

  return (
    <>
      {error || (!isLoading && !txn) ? (
        <div className="bg-white dark:bg-black-600 soft-shadow rounded-xl pb-1">
          <div className="text-sm text-nearblue-600 dark:text-neargray-10 divide-solid dark:divide-black-200 divide-gray-200 divide-y">
            <ErrorMessage
              icons={<FileSlash />}
              message="Sorry, We are unable to locate this TxnHash"
              mutedText={hash}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            {hashes &&
              hashes.map((hash, index) => (
                <button
                  key={index}
                  onClick={() => onTab(index)}
                  className={`text-nearblue-600  text-xs leading-4 font-medium overflow-hidden inline-block cursor-pointer mb-3 mr-3 focus:outline-none ${
                    pageTab === hash
                      ? 'rounded-lg bg-green-600 dark:bg-green-250 text-white'
                      : 'hover:bg-neargray-800 bg-neargray-700 dark:text-neargray-10 dark:bg-black-200  rounded-lg hover:text-nearblue-600'
                  }`}
                  value={hash}
                >
                  {hash === 'overview' ? (
                    <h2 className="p-2">
                      {t ? t('txns:txn.tabs.overview') : 'Overview'}
                    </h2>
                  ) : hash === 'execution' ? (
                    pageTab !== 'execution' ? (
                      <div className="p-2">
                        <h2 className="flex">
                          {isToggle
                            ? 'Enhanced Plan'
                            : t
                            ? t('txns:txn.tabs.execution')
                            : 'Execution Plan'}
                          <ArrowDown className="h-4 w-4 fill-current ml-1" />
                        </h2>
                        <div className="absolute text-white bg-neargreen text-[8px] h-4 inline-flex items-center rounded-md ml-11 -mt-7 px-1 ">
                          NEW
                        </div>
                      </div>
                    ) : (
                      <Popover.Root key={isToggle}>
                        <Popover.Trigger asChild>
                          <button
                            className="flex p-2 text-xs  rounded focus:outline-none"
                            aria-label="Update dimensions"
                          >
                            {isToggle
                              ? 'Enhanced Plan'
                              : t
                              ? t('txns:txn.tabs.execution')
                              : 'Execution Plan'}
                            <ArrowDown className="h-4 w-4 fill-current ml-1" />
                            <div className="absolute text-white bg-neargreen text-[8px] h-4 inline-flex items-center rounded-md ml-24 -mt-3 px-1 ">
                              NEW
                            </div>{' '}
                          </button>
                        </Popover.Trigger>
                        <Popover.Content
                          className="bg-white dark:bg-black-600 dark:border-black-200 w-48 shadow-lg border rounded-lg slide-down mt-2 z-50"
                          sideOffset={5}
                        >
                          <ul className="divide-y dark:divide-black-200">
                            <li
                              onClick={() => setIsToggle(false)}
                              className={`py-2 text-nearblue-600 dark:text-neargray-10 rounded-t-lg ${
                                !isToggle ? 'bg-gray-300 dark:bg-black-200' : ''
                              }`}
                            >
                              {t('txns:txn.tabs.execution') || 'Execution Plan'}
                            </li>
                            <li
                              onClick={() => setIsToggle(true)}
                              className={`py-2 text-nearblue-600 dark:text-neargray-10 rounded-b-lg ${
                                isToggle ? 'bg-gray-300 dark:bg-black-200' : ''
                              }`}
                            >
                              Enhanced Plan
                            </li>
                          </ul>
                        </Popover.Content>
                      </Popover.Root>
                    )
                  ) : (
                    <h2 className="p-2">
                      {t ? t('txns:txn.tabs.comments') : 'Comments'}
                    </h2>
                  )}
                </button>
              ))}
          </div>
          <div className="bg-white dark:bg-black-600 soft-shadow rounded-xl pb-1">
            <div className={`${pageTab === 'overview' ? '' : 'hidden'} `}>
              {
                <Widget
                  src={`${ownerId}/widget/bos-components.components.Transactions.Detail`}
                  props={{
                    txn: txn,
                    rpcTxn: rpcTxn,
                    loading: isLoading,
                    network: network,
                    t: t,
                    ownerId,
                  }}
                />
              }
            </div>
            <div className={`${pageTab === 'execution' ? '' : 'hidden'} `}>
              <div className={`${isToggle ? '' : 'hidden'} `}>
                {
                  <Widget
                    src={`${ownerId}/widget/bos-components.components.Transactions.Execution`}
                    props={{
                      network: network,
                      t: t,
                      txn: txn,
                      rpcTxn: rpcTxn,
                      loading: isLoading,
                      ownerId,
                    }}
                  />
                }
              </div>
              <div className={`${isToggle ? 'hidden' : ''} `}>
                <Widget
                  src={`${ownerId}/widget/bos-components.components.Transactions.Receipt`}
                  props={{
                    network: network,
                    t: t,
                    txn: txn,
                    rpcTxn: rpcTxn,
                    loading: isLoading,
                    ownerId,
                  }}
                />
              </div>
            </div>
            <div className={`${pageTab === 'comments' ? '' : 'hidden'} `}>
              <div className="py-3">
                {
                  <Widget
                    src={`${ownerId}/widget/bos-components.components.Comments.Feed`}
                    props={{
                      network: network,
                      path: `nearblocks.io/txns/${hash}`,
                      limit: 10,
                      ownerId,
                    }}
                  />
                }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

return MainComponent(props, context);