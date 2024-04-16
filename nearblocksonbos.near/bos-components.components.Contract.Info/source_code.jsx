/**
 * Component: ContractInfo
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Details of specific Contract on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The account identifier passed as a string.
 * @param {ContractInfo} [contract] - Object containing information about the associated contract.
 * @param {string} ownerId - The identifier of the owner of the component.
 */








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


function MainComponent(props) {
  const { network, id, contract, ownerId } = props;

  const { convertToUTC } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig, handleRateLimit, nanoToMilli } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [deploymentData, setDeploymentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const config = getConfig && getConfig(network);

  useEffect(() => {
    function fetchContractData() {
      setLoading(true);
      asyncFetch(`${config?.backendUrl}account/${id}/contract/deployments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            if (data?.status === 200) {
              const depResp = data?.body?.deployments;
              setDeploymentData(depResp);
              setLoading(false);
            } else {
              handleRateLimit(data, fetchContractData, () => setLoading(false));
            }
          },
        )
        .catch(() => {});
    }
    if (config?.backendUrl) {
      fetchContractData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, id]);

  const [createAction, updateAction] = deploymentData || [];

  const action = updateAction || createAction;

  const Loader = (props) => {
    return (
      <div
        className={`bg-gray-200 dark:bg-black-200 h-5 rounded shadow-sm animate-pulse ${props.className} ${props.wrapperClassName}`}
      ></div>
    );
  };

  return (
    <div className="w-full border-t dark:border-black-200">
      <div className="h-full bg-white dark:bg-black-600 text-sm text-gray-500 dark:text-neargray-10">
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  Latest time the contract deployed.
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Last Updated
          </div>
          {loading ? (
            <div className="w-full md:w-3/4">
              <Loader wrapperClassName="flex w-full max-w-xl" />
            </div>
          ) : (
            <div className="w-full md:w-3/4  break-words">
              {action?.block_timestamp &&
                convertToUTC(nanoToMilli(action?.block_timestamp), true)}
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0 ">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  The transaction unique identifier (hash) that the contract is
                  latest deployed.
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Transaction Hash
          </div>
          {loading ? (
            <Loader wrapperClassName="w-32" />
          ) : (
            <div className="w-full md:w-3/4 break-words">
              {action?.transaction_hash && (
                <Link
                  href={`/txns/${action.transaction_hash}`}
                  className="hover:no-underline"
                >
                  <a className="text-green-500 dark:text-green-250 hover:no-underline">
                    {action.transaction_hash}
                  </a>
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0 ">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  Locked contract means that there are no access keys allowing
                  the contract code to be re-deployed
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Contract Locked
          </div>
          {loading ? (
            <Loader wrapperClassName="w-32" />
          ) : (
            <div className="w-full md:w-3/4 break-words">
              {contract?.locked ? 'Yes' : 'No'}
            </div>
          )}
        </div>
        <div className="flex flex-wrap p-4">
          <div className="flex items-center w-full md:w-1/4 mb-2 md:mb-0 ">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div>
                    <Question className="w-4 h-4 fill-current mr-1" />
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content
                  className="h-auto max-w-xs bg-black bg-opacity-90 z-10 text-xs text-white px-3 py-2"
                  align="start"
                  side="bottom"
                >
                  Checksum (SHA-256 in base58 encoding) of the contract binary.
                </Tooltip.Content>
              </Tooltip.Root>
            </Tooltip.Provider>
            Code Hash
          </div>
          {loading ? (
            <Loader wrapperClassName="w-32" />
          ) : (
            <div className="w-full md:w-3/4 break-words">{contract?.hash}</div>
          )}
        </div>
      </div>
    </div>
  );
}

return MainComponent(props, context);