/**
 * Component: Accounts
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Accounts component enable users to view information related to their accounts.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {Function} [t] - A function for internationalization (i18n) provided by the next-translate package.
 * @param {string} [id] - The account identifier passed as a string.
 * @param {Function} [requestSignInWithWallet] - Function to initiate sign-in with a wallet.
 * @param {boolean} [signedIn] - Boolean indicating whether the user is currently signed in or not.
 * @param {string} [accountId] - The account ID of the signed-in user, passed as a string.
 * @param {Function} [logOut] - Function to log out.
 * @param {string} ownerId - The identifier of the owner of the component.
 */












/* INCLUDE COMPONENT: "includes/icons/FaExternalLinkAlt.jsx" */
const FaExternalLinkAlt = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaExternalLinkAlt.jsx" */
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
/* INCLUDE COMPONENT: "includes/Common/TokenHoldings.jsx" */
/**
 * @interface Props
 * @param {string} [id] - Optional identifier for the account, passed as a string.
 * @param {boolean} [loading] - Flag indicating whether data is currently loading.
 * @param {boolean} [inventoryLoading] - Flag indicating whether inventory data is currently loading.
 * @param {InventoryInfo} [data] - Information related to the inventory.
 * @param {Object} [ft] - Object containing details about the tokens.
 * @param {string} [ft.amount] -  amount in USD of tokens.
 * @param {Object[]} [ft.tokens] - Array containing 'TokenListInfo' objects, providing information about individual token details.
 * @param {string} [appUrl] - The URL of the application.
 * @param {string} ownerId - The identifier of the owner of the component.
 */
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
      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
    </svg>
  );
};















const TokenHoldings = (props) => {
  const { dollarFormat, localFormat } = VM.require(
    `${props.ownerId}/widget/includes.Utils.formats`,
  );

  const { truncateString } = VM.require(
    `${props.ownerId}/widget/includes.Utils.libs`,
  );

  const Loading = (props) => {
    return (
      <div
        className={`bg-gray-200 dark:bg-black-200 rounded shadow-sm animate-pulse ${props.className}`}
      ></div>
    );
  };
  const nfts = props.data?.nfts || [];
  if (props.loading || props.inventoryLoading) {
    return <Loading className="flex w-full h-8" />;
  }

  if (!props.ft?.tokens?.length && !nfts?.length) {
    return (
      <select className="appearance-none w-full h-8 text-xs px-2 outline-none rounded bg-white dark:bg-black-600 border dark:border-black-200">
        <option>N/A</option>
      </select>
    );
  }

  const ftAmount = props.ft?.amount ?? 0;

  return (
    <Select.Root>
      <Select.Trigger className="w-full h-8 text-sm px-2 rounded border dark:border-black-200 outline-none flex items-center justify-between cursor-pointer">
        <span>
          {ftAmount ? '$' + dollarFormat(ftAmount) : ''}
          <span className="bg-green-500 text-xs text-white rounded ml-2 px-1 p-0.5">
            {(props.ft?.tokens?.length || 0) + (nfts?.length || 0)}
          </span>
        </span>
        <ArrowDown className="w-4 h-4 fill-current text-gray-500 pointer-events-none" />
      </Select.Trigger>
      <Select.Content
        position="popper"
        sideOffset={5}
        className="SelectContent"
      >
        <ScrollArea.Root className="overflow-hidden rounded-b-xl soft-shadow bg-white dark:bg-black">
          <ScrollArea.Viewport className="border dark:border-black-200 z-50 pb-2">
            <div className="max-h-60">
              {props.ft?.tokens?.length > 0 && (
                <>
                  <div className="bg-gray-50 dark:bg-black-200 font-semibold px-3 py-2">
                    Tokens{' '}
                    <span className="font-normal">
                      ({props.ft?.tokens?.length})
                    </span>
                  </div>
                  <div className="text-gray-600 dark:text-neargray-10 text-xs divide-y dark:divide-black-200 outline-none">
                    {props.ft?.tokens?.map((token, index) => (
                      <div key={token?.contract}>
                        <Link
                          href={`/token/${token?.contract}?a=${props.id}`}
                          className="hover:no-underline"
                        >
                          <a className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-black-200 truncate hover:no-underline">
                            <div key={index}>
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  <img
                                    src={
                                      token?.ft_meta?.icon ??
                                      '/images/tokenplaceholder.svg'
                                    }
                                    alt={token.ft_meta?.name}
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span>
                                  {token?.ft_meta?.name
                                    ? truncateString(
                                        token?.ft_meta?.name,
                                        15,
                                        '...',
                                      )
                                    : ''}
                                  ({token?.ft_meta?.symbol})
                                </span>
                              </div>
                              <div className="text-gray-400 flex items-center mt-1">
                                {token?.rpcAmount
                                  ? localFormat(token?.rpcAmount)
                                  : token?.rpcAmount ?? ''}
                              </div>
                            </div>
                            {token?.ft_meta?.price && (
                              <div className="text-right">
                                <div>
                                  {token?.amountUsd
                                    ? '$' + dollarFormat(token?.amountUsd)
                                    : '$' + (token.amountUsd ?? '')}
                                </div>
                                <div className="text-gray-400">
                                  {token?.ft_meta?.price
                                    ? '@' +
                                      Big(token?.ft_meta?.price).toString()
                                    : '@' + (token?.ft_meta?.price ?? '')}
                                </div>
                              </div>
                            )}
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {nfts?.length > 0 && (
                <>
                  <div className="bg-gray-50 dark:bg-black-200 font-semibold px-3 py-2">
                    NFT Tokens{' '}
                    <span className="font-normal">({nfts?.length})</span>
                  </div>
                  <div className="text-gray-600 dark:text-neargray-10 text-xs divide-y divide-black-200 outline-none">
                    {nfts.map((nft) => (
                      <div key={nft?.contract}>
                        <Link
                          href={`/nft-token/${nft?.contract}?a=${props.id}`}
                          className="hover:no-underline"
                        >
                          <a className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-black-200 truncate hover:no-underline">
                            <div>
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  <img
                                    src={
                                      nft?.nft_meta?.icon ??
                                      `/images/tokenplaceholder.svg`
                                    }
                                    alt={nft?.nft_meta?.name}
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span>
                                  {nft?.nft_meta?.name
                                    ? truncateString(
                                        nft?.nft_meta?.name,
                                        15,
                                        '...',
                                      )
                                    : nft?.nft_meta?.name ?? ''}
                                  ({nft?.nft_meta?.symbol})
                                </span>
                              </div>
                              <div className="text-gray-400 flex items-center mt-1">
                                {nft?.quantity
                                  ? localFormat(nft?.quantity)
                                  : nft?.quantity ?? ''}
                              </div>
                            </div>
                          </a>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-neargray-25 dark:bg-black-600 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 dark:hover:bg-black-200 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="vertical"
          >
            <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Scrollbar
            className="flex select-none touch-none p-0.5 bg-neargray-25 transition-colors duration-[160ms] ease-out hover:bg-neargray-25 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
            orientation="horizontal"
          >
            <ScrollArea.Thumb className="flex-1 bg-neargray-50 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className="bg-neargray-50" />
        </ScrollArea.Root>
      </Select.Content>
    </Select.Root>
  );
};/* END_INCLUDE COMPONENT: "includes/Common/TokenHoldings.jsx" */















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

const tabs = [
  'Transactions',
  'Token Txns',
  'NFT Token Txns',
  'Access Keys',
  'Contract',
  'Comments',
];

function MainComponent(props) {
  const {
    network,
    t,
    id,
    requestSignInWithWallet,
    signedIn,
    accountId,
    logOut,
    ownerId,
  } = props;

  const { dollarFormat, localFormat, weight, convertToUTC } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const {
    yoctoToNear,
    fiatValue,
    nanoToMilli,
    shortenAddress,
    getConfig,
    handleRateLimit,
  } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const { encodeArgs, decodeArgs } = VM.require(
    `${ownerId}/widget/includes.Utils.near`,
  );

  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [statsData, setStatsData] = useState({} );
  const [pageTab, setPageTab] = useState('Transactions');
  const [filters, setFilters] = useState({});
  const [accountData, setAccountData] = useState(
    {} ,
  );
  const [deploymentData, setDeploymentData] = useState(
    {} ,
  );
  const [tokenData, setTokenData] = useState({} );
  const [inventoryData, setInventoryData] = useState(
    {} ,
  );
  const [contract, setContract] = useState({} );
  const [ft, setFT] = useState({} );
  const [code, setCode] = useState({} );
  const [key, setKey] = useState({} );
  const [schema, setSchema] = useState({} );
  const [contractInfo, setContractInfo] = useState(
    {} ,
  );

  const config = getConfig && getConfig(network);

  const onTab = (index) => {
    setPageTab(tabs[index]);
    onFilterClear('');
  };

  useEffect(() => {
    function fetchStatsData() {
      asyncFetch(`${config?.backendUrl}stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const statsResp = data?.body?.stats?.[0];
            if (data.status === 200) {
              setStatsData({ near_price: statsResp.near_price });
            } else {
              handleRateLimit(data, fetchStatsData);
            }
          },
        )
        .catch(() => {})
        .finally(() => {});
    }

    function fetchAccountData() {
      setLoading(true);
      asyncFetch(`${config?.backendUrl}account/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const accountResp = data?.body?.account?.[0];
            if (data.status === 200) {
              setAccountData({
                account_id: accountResp.account_id,
                amount: accountResp.amount,
                code_hash: accountResp.code_hash,
                created: accountResp.created,
                deleted: accountResp.deleted,
                locked: accountResp.locked,
                storage_usage: accountResp.storage_usage,
              });
              setLoading(false);
            } else {
              handleRateLimit(data, fetchAccountData, () => setLoading(false));
            }
          },
        )
        .catch(() => {});
    }

    function fetchContractData() {
      asyncFetch(`${config?.backendUrl}account/${id}/contract/deployments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const depResp = data?.body?.deployments?.[0];
            if (data.status === 200) {
              setDeploymentData(depResp);
            } else {
              handleRateLimit(data, fetchContractData);
            }
          },
        )
        .catch(() => {});
    }

    function fetchTokenData() {
      asyncFetch(`${config?.backendUrl}fts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const tokenResp = data?.body?.contracts?.[0];
            if (data.status === 200) {
              setTokenData({
                name: tokenResp.name,
                icon: tokenResp.icon,
                symbol: tokenResp.symbol,
                price: tokenResp.price,
                website: tokenResp.website,
              });
            } else {
              handleRateLimit(data, fetchTokenData);
            }
          },
        )
        .catch(() => {});
    }

    function fetchInventoryData() {
      setInventoryLoading(true);
      asyncFetch(`${config?.backendUrl}account/${id}/inventory`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (data




) => {
            const response = data?.body?.inventory;
            if (data.status === 200) {
              setInventoryData({
                fts: response.fts,
                nfts: response.nfts,
              });
              setInventoryLoading(false);
            } else {
              handleRateLimit(data, fetchInventoryData, () =>
                setInventoryLoading(false),
              );
            }
          },
        )
        .catch(() => {});
    }
    if (config?.backendUrl) {
      fetchStatsData();
      fetchAccountData();
      fetchContractData();
      fetchTokenData();
      fetchInventoryData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, id]);

  useEffect(() => {
    function ftBalanceOf(contracts, account_id) {
      return asyncFetch(`${config?.rpcUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'call_function',
            finality: 'final',
            account_id: contracts,
            method_name: 'ft_balance_of',
            args_base64: encodeArgs({ account_id }),
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res



) => {
            return res;
          },
        )
        .then(
          (data



) => {
            const resp = data?.body?.result;
            return decodeArgs(resp.result);
          },
        )
        .catch(() => {});
    }
    function loadBalances() {
      const fts = inventoryData?.fts;
      if (!fts?.length) {
        if (fts?.length === 0) setIsLoading(false);
        return;
      }

      let total = Big(0);

      const tokens = [];

      const pricedTokens = [];

      Promise.all(
        fts.map((ft) => {
          return ftBalanceOf(ft?.contract, id).then((rslt) => {
            return { ...ft, amount: rslt };
          });
        }),
      ).then((results) => {
        results.forEach((rslt) => {
          const ftrslt = rslt;
          const amount = rslt?.amount ?? 0;

          let sum = Big(0);

          let rpcAmount = Big(0);

          if (amount) {
            rpcAmount = ftrslt?.ft_meta?.decimals
              ? Big(amount).div(Big(10).pow(ftrslt.ft_meta.decimals))
              : 0;
          }
          if (ftrslt?.ft_meta?.price) {
            sum = rpcAmount.mul(Big(ftrslt?.ft_meta?.price));
            total = total.add(sum);

            return pricedTokens.push({
              ...ftrslt,
              amountUsd: sum.toString(),
              rpcAmount: rpcAmount.toString(),
            });
          }

          return tokens.push({
            ...ftrslt,
            amountUsd: sum.toString(),
            rpcAmount: rpcAmount.toString(),
          });
        });

        tokens.sort((a, b) => {
          const first = Big(a.rpcAmount);

          const second = Big(b.rpcAmount);

          if (first.lt(second)) return 1;
          if (first.gt(second)) return -1;

          return 0;
        });

        pricedTokens.sort((a, b) => {
          const first = Big(a.amountUsd);

          const second = Big(b.amountUsd);

          if (first.lt(second)) return 1;
          if (first.gt(second)) return -1;

          return 0;
        });

        setFT({
          amount: total.toString(),
          tokens: [...pricedTokens, ...tokens],
        });

        setIsLoading(false);
      });
    }

    loadBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryData?.fts, id, config?.rpcUrl]);

  useEffect(() => {
    function contractCode(address) {
      asyncFetch(`${config?.rpcUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'view_code',
            finality: 'final',
            account_id: address,
            prefix_base64: '',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res



) => {
            const resp = res?.body?.result;
            setCode({
              block_hash: resp.block_hash,
              block_height: resp.block_height,
              code_base64: resp.code_base64,
              hash: resp.hash,
            });
          },
        )
        .catch(() => {});
    }

    function viewAccessKeys(address) {
      asyncFetch(`${config?.rpcUrl}`, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'dontcare',
          method: 'query',
          params: {
            request_type: 'view_access_key_list',
            finality: 'final',
            account_id: address,
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(
          (res



) => {
            const resp = res?.body?.result;
            setKey({
              block_hash: resp.block_hash,
              block_height: resp.block_height,
              keys: resp?.keys,
              hash: resp?.hash,
            });
          },
        )
        .catch(() => {});
    }

    function loadSchema() {
      if (!id) return;

      Promise.all([contractCode(id), viewAccessKeys(id)]);
    }
    loadSchema();
  }, [id, config?.rpcUrl]);

  useEffect(() => {
    if (code?.code_base64) {
      const locked = (key.keys || []).every(
        (key





) => key.access_key.permission !== 'FullAccess',
      );

      function fetchContractInfo() {
        asyncFetch(`${config?.backendUrl}account/${id}/contract/parse`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(
            (res




) => {
              const resp = res.body.contract;
              if (res.status === 200 && resp && resp.length > 0) {
                const [{ contract, schema }] = resp;
                setContractInfo(contract);
                setSchema(schema);
              }
            },
          )
          .catch(() => {});
      }

      fetchContractInfo();

      setContract({ ...code, locked });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, key, config?.backendUrl, id]);

  const handleFilter = (name, value) => {
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
  };

  const onFilterClear = (name) => {
    let updatedFilters = { ...filters };
    if (updatedFilters.hasOwnProperty(name)) {
      delete updatedFilters[name];
      setFilters(updatedFilters);
    } else {
      updatedFilters = {};
      setFilters(updatedFilters);
    }
  };

  const balance = accountData?.amount ?? '';
  const nearPrice = statsData?.near_price ?? '';
  return (
    <>
      <div className="flex items-center justify-between flex-wrap pt-4 ">
        {!id ? (
          <div className="w-80 max-w-xs px-3 py-5">
            <Skeleton className="h-7" />
          </div>
        ) : (
          <div className="flex md:flex-wrap">
            <h1 className="py-4 break-all space-x-2 text-xl text-gray-700 leading-8 px-2">
              Near Account: @
              {id && (
                <span className="font-semibold text-green-500 dark:text-green-250">
                  {id}
                </span>
              )}
              {
                <Widget
                  src={`${ownerId}/widget/bos-components.components.Shared.Buttons`}
                  props={{
                    id: id,
                    config: config,
                  }}
                />
              }
            </h1>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full">
          <div className="h-full bg-white soft-shadow rounded-xl dark:bg-black-600">
            <div className="flex justify-between border-b dark:border-black-200 p-3 text-nearblue-600 dark:text-neargray-10">
              <h2 className="leading-6 text-sm font-semibold">
                {t ? t('address:overview') : 'Overview'}
              </h2>
              {tokenData?.name && (
                <div className="flex items-center text-xs bg-gray-100 dark:bg-black-200 dark:text-neargray-10 rounded-md px-2 py-1">
                  <div className="truncate max-w-[110px]">
                    {tokenData?.name}
                  </div>
                  {tokenData?.website && (
                    <a
                      href={tokenData?.website}
                      className="ml-1"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="px-3 divide-y dark:divide-black-200 text-sm text-nearblue-600 dark:text-neargray-10">
              <div className="flex flex-wrap py-4">
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                  {t ? t('address:balance') : 'Balance'}:
                </div>
                {loading ? (
                  <Skeleton className="h-4 w-32" />
                ) : (
                  <div className="w-full md:w-3/4 break-words">
                    {balance
                      ? yoctoToNear(accountData?.amount, true) + ' Ⓝ'
                      : ''}
                  </div>
                )}
              </div>
              {network === 'mainnet' &&
                accountData?.amount &&
                statsData?.near_price && (
                  <div className="flex flex-wrap py-4 text-sm text-nearblue-600 dark:text-neargray-10">
                    <div className="w-full md:w-1/4 mb-2 md:mb-0">
                      {t ? t('address:value') : 'Value:'}
                    </div>
                    {loading ? (
                      <Skeleton className="h-4 w-32" />
                    ) : (
                      <div className="w-full md:w-3/4 break-words flex items-center">
                        <span className="px-1">
                          {accountData?.amount && statsData?.near_price
                            ? '$' +
                              fiatValue(
                                yoctoToNear(accountData?.amount, false),
                                statsData?.near_price,
                              ) +
                              ' '
                            : ''}
                        </span>
                        <span className="text-xs">
                          (@
                          {nearPrice
                            ? '$' + dollarFormat(statsData?.near_price)
                            : ''}
                          / Ⓝ)
                        </span>
                      </div>
                    )}
                  </div>
                )}
              <div className="flex flex-wrap py-4 text-sm text-nearblue-600 dark:text-neargray-10">
                <div className="w-full md:w-1/4 mb-2 md:mb-0">
                  {t ? t('address:tokens') : 'Tokens:'}
                </div>
                <div className="w-full md:w-3/4 break-words -my-1 z-10">
                  <TokenHoldings
                    data={inventoryData}
                    loading={isloading}
                    inventoryLoading={inventoryLoading}
                    ft={ft}
                    id={id}
                    appUrl={config?.appUrl}
                    ownerId={ownerId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="h-full bg-white dark:bg-black-600 soft-shadow rounded-xl overflow-hidden">
            <h2 className="leading-6 border-b dark:border-black-200 p-3 text-nearblue-600 dark:text-neargray-10 text-sm font-semibold">
              {t ? t('address:moreInfo') : 'Account information'}
            </h2>
            <div className="px-3 divide-y dark:divide-black-200 text-sm text-nearblue-600 dark:text-neargray-10">
              <div className="flex justify-between">
                <div className="flex xl:flex-nowrap flex-wrap items-center justify-between py-4 w-full">
                  <div className="w-full mb-2 md:mb-0">
                    Staked {t ? t('address:balance') : 'Balance'}:
                  </div>
                  {loading ? (
                    <div className="w-full break-words">
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ) : (
                    <div className="w-full break-words xl:mt-0 mt-2">
                      {accountData?.locked
                        ? yoctoToNear(accountData?.locked, true) + ' Ⓝ'
                        : accountData?.locked ?? ''}
                    </div>
                  )}
                </div>
                <div className="flex ml-4  xl:flex-nowrap flex-wrap items-center justify-between py-4 w-full">
                  <div className="w-full mb-2 md:mb-0">
                    {t ? t('address:storageUsed') : 'Storage Used'}:
                  </div>
                  {loading ? (
                    <div className="w-full break-words">
                      <Skeleton className="h-4 w-28" />
                    </div>
                  ) : (
                    <div className="w-full break-words xl:mt-0 mt-2">
                      {accountData?.storage_usage
                        ? weight(accountData?.storage_usage)
                        : accountData?.storage_usage ?? ''}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex xl:flex-nowrap flex-wrap items-center justify-between py-4 w-full">
                  {loading ? (
                    <div className="w-full mb-2 md:mb-0">
                      <Skeleton className="h-4 w-28" />
                    </div>
                  ) : (
                    <div className="w-full mb-2 md:mb-0">
                      {accountData?.deleted?.transaction_hash
                        ? 'Deleted At:'
                        : 'Created At:'}
                    </div>
                  )}
                  {loading ? (
                    <div className="w-full break-words">
                      <Skeleton className="h-4 w-40" />
                    </div>
                  ) : (
                    <div className="w-full break-words xl:mt-0 mt-2">
                      {accountData?.deleted?.transaction_hash
                        ? convertToUTC(
                            nanoToMilli(accountData.deleted.block_timestamp),
                            false,
                          )
                        : accountData?.created?.transaction_hash
                        ? convertToUTC(
                            nanoToMilli(accountData.created.block_timestamp),
                            false,
                          )
                        : accountData?.code_hash
                        ? 'Genesis'
                        : 'N/A'}
                    </div>
                  )}
                </div>
                {contract?.hash && !loading ? (
                  <div className="flex ml-4 xl:flex-nowrap flex-wrap items-center justify-between py-4 w-full">
                    <div className="w-full mb-2 md:mb-0">Contract Locked:</div>
                    <div className="w-full break-words xl:mt-0 mt-2">
                      {contract?.locked ? 'Yes' : 'No'}
                    </div>
                  </div>
                ) : (
                  <div className="flex ml-4 xl:flex-nowrap flex-wrap items-center justify-between py-4 w-full" />
                )}
              </div>
              {deploymentData?.receipt_predecessor_account_id && (
                <div className="flex flex-wrap items-center justify-between py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0">
                    Contract Creator:
                  </div>
                  <div className="w-full md:w-3/4 break-words">
                    <Link
                      href={`/address/${deploymentData.receipt_predecessor_account_id}`}
                      className="hover:no-underline"
                    >
                      <a className="text-green-500 hover:no-underline">
                        {shortenAddress(
                          deploymentData.receipt_predecessor_account_id ?? '',
                        )}
                      </a>
                    </Link>
                    {' at txn  '}
                    <Link
                      href={`/txns/${deploymentData.transaction_hash}`}
                      className="hover:no-underline"
                    >
                      <a className="text-green-500 hover:no-underline">
                        {shortenAddress(deploymentData.transaction_hash ?? '')}
                      </a>
                    </Link>
                  </div>
                </div>
              )}
              {tokenData?.name && (
                <div className="flex flex-wrap items-center justify-between py-4">
                  <div className="w-full md:w-1/4 mb-2 md:mb-0">
                    Token Tracker:
                  </div>
                  <div className="w-full md:w-3/4 break-words">
                    <div className="flex items-center">
                      <TokenImage
                        src={tokenData?.icon}
                        alt={tokenData?.name}
                        appUrl={config.appUrl}
                        className="w-4 h-4 mr-2"
                      />
                      <Link
                        href={`/token/${id}`}
                        className="hover:no-underline"
                      >
                        <a className="flex text-green-500 hover:no-underline">
                          <span className="inline-block truncate max-w-[110px] mr-1">
                            {tokenData.name}
                          </span>
                          (
                          <span className="inline-block truncate max-w-[80px]">
                            {tokenData.symbol}
                          </span>
                          )
                        </a>
                      </Link>
                      {tokenData.price && (
                        <div className="text-nearblue-600 dark:text-neargray-10 ml-1">
                          (@ ${localFormat(tokenData.price)})
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="py-6"></div>
      <div className="block lg:flex lg:space-x-2 mb-10">
        <div className="w-full ">
          <>
            <div>
              {tabs &&
                tabs.map((tab, index) => {
                  if (
                    tab === 'Contract' &&
                    !(contractInfo?.methodNames?.length > 0)
                  ) {
                    return null;
                  }
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        onTab(index);
                      }}
                      className={`  text-xs leading-4 font-medium overflow-hidden inline-block cursor-pointer p-2 mb-3 mr-2 focus:outline-none ${
                        pageTab === tab
                          ? 'rounded-lg bg-green-600 dark:bg-green-250 text-white dark:text-black'
                          : 'hover:bg-neargray-800 bg-neargray-700 dark:bg-black-200 rounded-lg hover:text-nearblue-600 text-nearblue-600 dark:text-neargray-10'
                      }`}
                      value={tab}
                    >
                      {tab === 'Transactions' ? (
                        <h2>{t ? t('address:txns') : tab}</h2>
                      ) : tab === 'Token Txns' ? (
                        <h2>{t ? t('address:tokenTxns') : tab}</h2>
                      ) : tab === 'Contract' ? (
                        <div className="flex h-full">
                          <h2>{tab}</h2>
                          <div className="absolute text-white dark:text-black bg-neargreen text-[8px] h-4 inline-flex items-center rounded-md ml-11 -mt-3 px-1 ">
                            NEW
                          </div>
                        </div>
                      ) : tab === 'Comments' ? (
                        <h2>{t ? t('address:comments') : tab}</h2>
                      ) : tab === 'NFT Token Txns' ? (
                        <h2>{t ? t('address:nftTokenTxns') : tab}</h2>
                      ) : tab === 'Access Keys' ? (
                        <h2>{t ? t('address:accessKeys') : tab}</h2>
                      ) : (
                        <h2>{tab}</h2>
                      )}
                    </button>
                  );
                })}
            </div>
            <div>
              <div className={`${pageTab === 'Transactions' ? '' : 'hidden'} `}>
                {
                  <Widget
                    src={`${ownerId}/widget/bos-components.components.Address.Transactions`}
                    props={{
                      network: network,
                      t: t,
                      id: id,
                      filters: filters,
                      handleFilter: handleFilter,
                      onFilterClear: onFilterClear,
                      ownerId,
                    }}
                  />
                }
              </div>
              <div className={`${pageTab === 'Token Txns' ? '' : 'hidden'} `}>
                {
                  <Widget
                    src={`${ownerId}/widget/bos-components.components.Address.TokenTransactions`}
                    props={{
                      network: network,
                      id: id,
                      t: t,
                      filters: filters,
                      handleFilter: handleFilter,
                      onFilterClear: onFilterClear,
                      ownerId,
                    }}
                  />
                }
              </div>
              <div
                className={`${pageTab === 'NFT Token Txns' ? '' : 'hidden'} `}
              >
                {
                  <Widget
                    src={`${ownerId}/widget/bos-components.components.Address.NFTTransactions`}
                    props={{
                      network: network,
                      id: id,
                      t: t,
                      filters: filters,
                      handleFilter: handleFilter,
                      onFilterClear: onFilterClear,
                      ownerId,
                    }}
                  />
                }
              </div>
              <div className={`${pageTab === 'Access Keys' ? '' : 'hidden'} `}>
                {
                  <Widget
                    src={`${ownerId}/widget/bos-components.components.Address.AccessKeys`}
                    props={{
                      network: network,
                      id: id,
                      t: t,
                      ownerId,
                    }}
                  />
                }
              </div>
              {contractInfo && contractInfo?.methodNames?.length > 0 && (
                <>
                  <div className={`${pageTab === 'Contract' ? '' : 'hidden'} `}>
                    {
                      <Widget
                        src={`${ownerId}/widget/bos-components.components.Contract.Overview`}
                        props={{
                          network: network,
                          t: t,
                          id: id,
                          contract: contract,
                          schema: schema,
                          contractInfo: contractInfo,
                          requestSignInWithWallet: requestSignInWithWallet,
                          connected: signedIn,
                          accountId: accountId,
                          logOut: logOut,
                          ownerId,
                        }}
                      />
                    }
                  </div>
                </>
              )}
              <div className={`${pageTab === 'Comments' ? '' : 'hidden'} `}>
                {
                  <div className="bg-white dark:bg-black-600 soft-shadow rounded-xl pb-1">
                    <div className="py-3">
                      <Widget
                        src={`${ownerId}/widget/bos-components.components.Comments.Feed`}
                        props={{
                          network: network,
                          path: `nearblocks.io/address/${id}`,
                          ownerId,
                          limit: 10,
                        }}
                      />
                    </div>
                  </div>
                }
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
}

return MainComponent(props, context);