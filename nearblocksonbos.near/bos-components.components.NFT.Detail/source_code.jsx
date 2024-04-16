/**
 * Component: NFTDetail
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Non-Fungible Token Details.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string} [id] - The token identifier passed as a string
 * @param {string} [tid] - The nf token identifier passed as a string
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
/* INCLUDE COMPONENT: "includes/icons/ArrowUp.jsx" */
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
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowUp.jsx" */
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










function MainComponent({ network, t, id, tid, ownerId }) {
  const { getConfig, handleRateLimit, shortenAddress } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [indices, setIndices] = useState([1, 2]);
  const [token, setToken] = useState({} );
  const [loading, setLoading] = useState(false);

  const config = getConfig && getConfig(network);

  useEffect(() => {
    function fetchToken() {
      setLoading(true);
      asyncFetch(`${config?.backendUrl}nfts/${id}/tokens/${tid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res




) => {
            const resp = res?.body?.tokens?.[0];
            if (res.status === 200) {
              setToken(resp);
              setLoading(false);
            } else {
              handleRateLimit(res, fetchToken, () => setLoading(false));
            }
          },
        )
        .catch(() => {});
    }
    if (config?.backendUrl) {
      fetchToken();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, id, tid]);

  const toggleItem = (index) => {
    if (indices.includes(index)) {
      setIndices(indices.filter((currentIndex) => currentIndex !== index));
    } else {
      setIndices([...indices, index].sort());
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-12 pt-4 mb-2">
        <div className="md:col-span-5 lg:col-span-4 pt-4">
          <div className="bg-white dark:bg-black-600 dark:border-black-200 border rounded-xl soft-shadow p-3 aspect-square">
            {
              <Widget
                src={`${ownerId}/widget/bos-components.components.Shared.NFTImage`}
                props={{
                  base: token?.nft?.base_uri,
                  media: token?.media,
                  reference: token?.reference,
                  className: 'rounded max-h-full',
                  network: network,
                  ownerId,
                }}
              />
            }
          </div>
        </div>
        <div className="md:col-span-7 lg:col-span-8 md:px-4 lg:pl-8 pt-4">
          <h1 className="break-all space-x-2 text-xl text-gray-700 dark:text-neargray-10 leading-8 font-semibold">
            {loading ? (
              <div className="w-80 max-w-xs">
                <Skeleton className="h-6" />
              </div>
            ) : (
              token?.title || token?.token
            )}
          </h1>
          <Link href={`/nft-token/${id}`} className="hover:no-underline">
            <a className="break-all text-green dark:text-green-250 leading-6 text-sm hover:no-underline">
              {loading ? (
                <div className="w-60 max-w-xs py-2">
                  <Skeleton className="h-4" />
                </div>
              ) : (
                <>
                  <span className="inline-flex align-middle h-5 w-5 mr-2">
                    <TokenImage
                      src={token?.nft?.icon}
                      alt={token?.nft?.name}
                      className="w-5 h-5"
                      appUrl={config?.appUrl}
                    />
                  </span>
                  <span>{token?.nft?.name}</span>
                </>
              )}
            </a>
          </Link>
          <Accordion.Root
            type="multiple"
            className="bg-white dark:bg-black-600 dark:border-black-200 border rounded-xl  soft-shadow mt-4"
            defaultValue={indices}
            collapsible
          >
            <Accordion.Item value={1}>
              <Accordion.Header>
                <Accordion.Trigger
                  onClick={() => toggleItem(1)}
                  className="w-full flex justify-between items-center text-sm font-semibold text-gray-600 dark:text-neargray-10 border-b dark:border-black-200 focus:outline-none p-3"
                >
                  <h2>Details</h2>
                  {indices?.includes(1) ? (
                    <ArrowUp className="fill-current" />
                  ) : (
                    <ArrowDown className="fill-current" />
                  )}
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="text-sm text-nearblue-600 dark:text-neargray-10">
                <div className="divide-solid divide-gray-200 dark:divide-black-200 divide-y">
                  {token?.asset && (
                    <div className="flex p-4">
                      <div className="flex items-center w-full xl:w-1/4 mb-2 xl:mb-0">
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
                              Current owner of this NFT
                            </Tooltip.Content>
                          </Tooltip.Root>
                        </Tooltip.Provider>
                        Owner:
                      </div>
                      <div className="w-full xl:w-3/4 word-break">
                        <Link
                          href={`/address/${token?.asset?.owner}`}
                          className="hover:no-underline"
                        >
                          <a className="text-green dark:text-green-250 hover:no-underline">
                            {shortenAddress &&
                              shortenAddress(token?.asset?.owner ?? '')}
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="flex p-4">
                    <div className="flex items-center w-full xl:w-1/4 mb-2 xl:mb-0">
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
                            Address of this NFT contract
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      Contract Address:
                    </div>
                    <div className="w-full xl:w-3/4 word-break">
                      <Link
                        href={`/address/${id}`}
                        className="hover:no-underline"
                      >
                        <a className="text-green  dark:text-green-250 hover:no-underline">
                          {shortenAddress && shortenAddress(id ?? '')}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex items-center w-full xl:w-1/4 mb-2 xl:mb-0">
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
                            {"This NFT's unique token ID"}
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      Token ID:
                    </div>
                    <div className="w-full xl:w-3/4 word-break">{tid}</div>
                  </div>
                  <div className="flex p-4">
                    <div className="flex items-center w-full xl:w-1/4 mb-2 xl:mb-0">
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
                            The standard followed by this NFT
                          </Tooltip.Content>
                        </Tooltip.Root>
                      </Tooltip.Provider>
                      Token Standard:
                    </div>
                    <div className="w-full xl:w-3/4 word-break">NEP-171</div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
            {token?.description && (
              <Accordion.Item value={2}>
                <Accordion.Trigger
                  onClick={() => toggleItem(2)}
                  className="w-full flex justify-between items-center text-sm font-semibold text-gray-600 dark:text-neargray-10 border-b dark:border-black-200 focus:outline-none p-3"
                >
                  <h2>Description</h2>
                  {indices.includes(2) ? (
                    <ArrowUp className="fill-current" />
                  ) : (
                    <ArrowDown className="fill-current" />
                  )}
                </Accordion.Trigger>
                <Accordion.Content className="text-sm text-nearblue-600 dark:text-neargray-10 border-b dark:border-black-200 p-3">
                  {token.description}
                </Accordion.Content>
              </Accordion.Item>
            )}
          </Accordion.Root>
        </div>
      </div>
      <div className="py-6"></div>
      <div className="block lg:flex lg:space-x-2 mb-10">
        <div className="w-full ">
          <div className="bg-white dark:bg-black-600 soft-shadow rounded-xl pb-1">
            {
              <Widget
                src={`${ownerId}/widget/bos-components.components.NFT.TokenTransfers`}
                props={{
                  network: network,
                  t: t,
                  id: id,
                  tid: tid,
                  ownerId,
                }}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
}

return MainComponent(props, context);