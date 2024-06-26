/**
 * Component: FTTokenFilter
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Fungible Token Filter on Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The token identifier passed as a string
 * @param {string} [tokenFilter] - The token filter identifier passed as a string
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
/* INCLUDE COMPONENT: "includes/icons/FaAddressBook.jsx" */
const FaAddressBook = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 448 512"
      color="#db9a04"
      height="10"
      width="10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M436 160c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-20v-64h20zm-228-32c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H118.4C106 384 96 375.4 96 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2z"
        fill="#db9a04"
      ></path>
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/FaAddressBook.jsx" */














function MainComponent({ network, id, tokenFilter, ownerId }) {
  const { dollarFormat, localFormat } = VM.require(
    `${ownerId}/widget/includes.Utils.format`,
  );

  const { getConfig, handleRateLimit } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const { decodeArgs, encodeArgs } = VM.require(
    `${ownerId}/widget/includes.Utils.near`,
  );

  const [ft, setFT] = useState({} );
  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState(
    {} ,
  );

  const config = getConfig && getConfig(network);

  useEffect(() => {
    function fetchInventoryData() {
      setInventoryLoading(true);
      asyncFetch(`${config?.backendUrl}account/${tokenFilter}/inventory`, {
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
              setInventoryData(response);
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
      fetchInventoryData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.backendUrl, tokenFilter]);

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
            args_base64: encodeArgs ? encodeArgs({ account_id }) : '',
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
            return decodeArgs ? decodeArgs(resp.result) : '';
          },
        )
        .catch(() => {});
    }

    function loadBalances() {
      setInventoryLoading(true);
      const fts =
        inventoryData?.fts &&
        inventoryData?.fts.filter((f) => id == f.contract);

      if (!fts?.length) {
        if (fts?.length === 0) setInventoryLoading(false);
        return;
      }

      let total = Big(0);

      const tokens = [];

      const pricedTokens = [];

      Promise.all(
        fts.map((ft) => {
          return ftBalanceOf(ft.contract, tokenFilter).then((rslt) => {
            return { ...ft, amount: rslt };
          });
        }),
      ).then((results) => {
        results.forEach((rslt) => {
          const ftrslt = rslt;
          const amount = rslt?.amount;

          let sum = Big(0);

          let rpcAmount = Big(0);

          if (amount) {
            rpcAmount = ftrslt.ft_meta?.decimals
              ? Big(amount).div(Big(10).pow(ftrslt.ft_meta?.decimals))
              : 0;
          }

          if (ftrslt.ft_meta?.price) {
            sum = rpcAmount.mul(Big(ftrslt.ft_meta?.price));
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

        setFT({
          amount: total.toString(),
          tokens: [...pricedTokens, ...tokens],
        });

        setInventoryLoading(false);
      });
    }

    loadBalances();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryData?.fts, id, tokenFilter, config?.rpcUrl]);

  const filterToken = ft?.tokens?.length
    ? ft?.tokens[0]
    : ({} );

  const ftAmount = ft?.amount ?? 0;

  return (
    <>
      {tokenFilter && (
        <div className="py-2 mb-4">
          <div className="bg-white dark:bg-black-600 soft-shadow rounded-xl  px-2 py-3">
            <div className="grid md:grid-cols-3 grid-cols-1 divide-y md:divide-y-0 dark:divide-black-200 md:divide-x">
              <div className="px-4 md:py-0 py-2">
                <div className="flex items-center">
                  <FaAddressBook />
                  <h5 className="text-xs my-1 font-bold ml-1 dark:text-neargray-10">
                    FILTERED BY TOKEN HOLDER
                  </h5>
                </div>
                <h5 className="text-sm my-1 font-bold text-green-500 dark:text-green-250 truncate md:max-w-[200px] lg:max-w-[310px] xl:max-w-full max-w-full inline-block">
                  <Link
                    href={`/address/${tokenFilter}`}
                    className="hover:no-underline"
                  >
                    <a className="hover:no-underline">{tokenFilter}</a>
                  </Link>
                </h5>
              </div>
              <div className="px-4 md:py-0 py-2">
                <p className="text-xs my-1 text-nearblue-600 dark:text-neargray-10">
                  BALANCE
                </p>

                {inventoryLoading ? (
                  <Skeleton className="w-40" />
                ) : (
                  <p className="text-sm my-1">
                    {Number(filterToken?.rpcAmount) && localFormat
                      ? localFormat(filterToken?.rpcAmount)
                      : ''}
                  </p>
                )}
              </div>
              <div className="px-4 md:py-0 py-2">
                <p className="text-xs my-1 text-nearblue-600 dark:text-neargray-10">
                  VALUE
                </p>

                {inventoryLoading ? (
                  <Skeleton className="w-40" />
                ) : (
                  <p className="text-sm my-1 flex">
                    {ftAmount && dollarFormat
                      ? '$' + dollarFormat(ftAmount)
                      : ''}
                    <span>
                      {filterToken?.ft_meta?.price && (
                        <div className="text-gray-400 ml-2">
                          @{filterToken?.ft_meta?.price}
                        </div>
                      )}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

return MainComponent(props, context);