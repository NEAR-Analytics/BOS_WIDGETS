/**
 * Component: FTInfo
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: Information About Fungible Token On Near Protocol.
 * @interface Props
 * @param {string} [network] - The network data to show, either mainnet or testnet
 * @param {string} [id] - The token identifier passed as a string
 * @param {Token} [token] - The Token type passed as object
 * @param {string} ownerId - The identifier of the owner of the component.
 */







/* INCLUDE COMPONENT: "includes/icons/CoinMarketcap.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const CoinMarketcap = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.5873 8.96058C13.4693 9.04115 13.3315 9.0887 13.1885 9.09821C13.0455 9.10773 12.9025 9.07885 12.7746 9.01464C12.4745 8.84666 12.3127 8.45279 12.3127 7.91605V6.27105C12.3127 5.48138 11.997 4.91953 11.4688 4.767C10.5762 4.50829 9.9097 5.59143 9.65244 5.99882L8.07381 8.53002V5.44083C8.05627 4.72839 7.82239 4.3017 7.37999 4.17427C7.08765 4.08931 6.64914 4.12407 6.22232 4.76894L2.6928 10.3816C2.22319 9.49151 1.97969 8.50142 1.98339 7.49708C1.98339 4.11441 4.7119 1.3631 8.07381 1.3631C11.4357 1.3631 14.174 4.11441 14.174 7.49708V7.51445C14.174 7.51445 14.174 7.52604 14.174 7.53183C14.2071 8.18635 13.9927 8.70765 13.5893 8.96058H13.5873ZM15.5363 7.49901V7.46618C15.509 3.34405 12.1724 0 8.07381 0C3.9752 0 0.619141 3.36335 0.619141 7.49708C0.619141 11.6308 3.96351 14.9961 8.07381 14.9961C9.95897 14.996 11.7724 14.2802 13.141 12.9958C13.2739 12.8718 13.3521 12.701 13.3586 12.5203C13.3652 12.3396 13.2996 12.1636 13.1761 12.0305C13.117 11.9657 13.0456 11.9132 12.9659 11.8758C12.8862 11.8385 12.7999 11.8172 12.7118 11.8131C12.6238 11.809 12.5358 11.8221 12.453 11.8518C12.3701 11.8815 12.2939 11.9271 12.2289 11.9861C11.6397 12.5398 10.9436 12.9698 10.1824 13.2504C9.42121 13.531 8.61064 13.6562 7.79936 13.6187C6.98808 13.5812 6.19282 13.3817 5.46131 13.0321C4.72981 12.6825 4.07716 12.1901 3.54254 11.5845L6.7193 6.52591V8.86018C6.7193 9.98194 7.15781 10.3449 7.52616 10.4511C7.8945 10.5573 8.45775 10.4839 9.04827 9.53401L10.8023 6.72092C10.8569 6.63017 10.9095 6.55294 10.9563 6.48537V7.91605C10.9563 8.96444 11.3811 9.80238 12.1256 10.2156C12.4642 10.3966 12.8456 10.4841 13.23 10.4688C13.6144 10.4535 13.9876 10.336 14.3104 10.1287C15.1289 9.60158 15.5752 8.6478 15.5285 7.49901H15.5363Z"
      fill="#57697A"
    />
  </svg>
);/* END_INCLUDE COMPONENT: "includes/icons/CoinMarketcap.jsx" */
/* INCLUDE COMPONENT: "includes/icons/CoinGecko.jsx" */
/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const CoinGecko = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 295 295"
    {...props}
  >
    <g id="coingecko" transform="translate(9.499 10.501)">
      <path
        id="Path_34"
        data-name="Path 34"
        d="M310,183A138,138,0,1,1,171.4,45.61,138,138,0,0,1,310,183Z"
        transform="translate(-34 -46.61)"
        fill="none"
        stroke="#77838f"
        stroke-width="19"
      />
      <path
        id="Path_36"
        data-name="Path 36"
        d="M174.35,64.27a70.18,70.18,0,0,1,24.53,0,74.66,74.66,0,0,1,23.43,7.85c7.28,4,13.57,9.43,19.83,14.52s12.49,10.3,18.42,16a93.381,93.381,0,0,1,15.71,19,108.069,108.069,0,0,1,11,22.17c5.33,15.66,7.18,32.53,4.52,48.62H291c-2.67-15.95-6.29-31.15-12-45.61a178.006,178.006,0,0,0-9.44-21.25,208.8,208.8,0,0,0-12.42-19.93,72.3,72.3,0,0,0-16.64-16.8c-6.48-4.62-13.93-7.61-21.14-10.45S205,72.61,197.48,70.45s-15.16-3.78-23.14-5.35Z"
        transform="translate(-34 -45.61)"
        fill="none"
      />
      <path
        id="Path_37"
        data-name="Path 37"
        d="M236.74,138c-9.26-2.68-18.86-6.48-28.58-10.32-.56-2.44-2.72-5.48-7.09-9.19-6.35-5.51-18.28-5.37-28.59-2.93-11.38-2.68-22.62-3.63-33.41-1-88.25,24.31-38.21,83.62-70.61,143.24,4.61,9.78,54.3,66.84,126.2,51.53,0,0-24.59-59.09,30.9-87.45C270.57,198.79,303.09,156.07,236.74,138Z"
        transform="translate(-34 -45.61)"
        fill="#77838f"
      />
      <path
        id="Path_38"
        data-name="Path 38"
        d="M247.64,176.81a5.35,5.35,0,1,1-5.38-5.32,5.35,5.35,0,0,1,5.38,5.32Z"
        transform="translate(-34 -45.61)"
        fill="#9faab5"
      />
      <path
        id="Path_39"
        data-name="Path 39"
        d="M172.48,115.52c6.43.46,29.68,8,35.68,12.12-5-14.5-21.83-16.43-35.68-12.12Z"
        transform="translate(-34 -45.61)"
        fill="#77838f"
      />
      <path
        id="Path_40"
        data-name="Path 40"
        d="M178.6,152.19a24.68,24.68,0,1,1-24.677-24.67A24.68,24.68,0,0,1,178.6,152.19Z"
        transform="translate(-34 -45.61)"
        fill="#9faab5"
      />
      <path
        id="Path_41"
        data-name="Path 41"
        d="M171.28,152.41a17.36,17.36,0,1,1-17.36-17.36A17.36,17.36,0,0,1,171.28,152.41Z"
        transform="translate(-34 -45.61)"
        fill="#77838f"
      />
      <path
        id="Path_42"
        data-name="Path 42"
        d="M267.63,187.69c-20,14.09-42.74,24.78-75,24.78-15.1,0-18.16-16-28.14-8.18-5.15,4.06-23.31,13.14-37.72,12.45S89,207.6,82.49,176.84c-2.58,30.76-3.9,53.42-15.45,79.39,23,36.83,77.84,65.24,127.62,53-5.35-37.35,27.29-73.93,45.68-92.65,7-7.09,20.3-18.66,27.29-28.91Z"
        transform="translate(-34 -45.61)"
        fill="#77838f"
      />
      <path
        id="Path_43"
        data-name="Path 43"
        d="M266.85,188.61c-6.21,5.66-13.6,9.85-21.12,13.55a134.24,134.24,0,0,1-23.7,8.63c-8.16,2.11-16.67,3.7-25.29,2.92S179.31,210,173.6,203.54l.27-.31c7,4.54,15.08,6.14,23.12,6.37a108.569,108.569,0,0,0,24.3-2,132.339,132.339,0,0,0,23.61-7.3c7.63-3.15,15.18-6.8,21.68-12Z"
        transform="translate(-34 -45.61)"
        fill="#9faab5"
      />
    </g>
  </svg>
);/* END_INCLUDE COMPONENT: "includes/icons/CoinGecko.jsx" */


function MainComponent({ token, id, network, ownerId }) {
  const { localFormat, dollarNonCentFormat } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig, handleRateLimit } = VM.require(
    `${ownerId}/widget/includes.Utils.libs`,
  );

  const [tokens, setTokens] = useState({} );

  const config = getConfig && getConfig(network);

  useEffect(() => {
    function fetchFTData() {
      asyncFetch(`${config.backendUrl}fts/${id}`)
        .then(
          (data




) => {
            const resp = data?.body?.contracts?.[0];
            if (data.status === 200) {
              setTokens(resp);
            } else {
              handleRateLimit(data, fetchFTData);
            }
          },
        )
        .catch(() => {});
    }

    if (!token && token === undefined) {
      fetchFTData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config?.backendUrl, id, token]);

  useEffect(() => {
    if (token) {
      setTokens(token);
    }
  }, [token]);

  return (
    <div className="px-3 pt-2 pb-5 text-sm text-gray">
      {tokens?.description && (
        <>
          <h3 className="text-nearblue-600  dark:text-neargray-10 text-sm font-semibold py-2 underline">
            Overview
          </h3>
          <p className="text-sm py-2 text-nearblue-600 dark:text-neargray-10">
            {tokens?.description}
          </p>
        </>
      )}
      <h3 className="text-nearblue-600  dark:text-neargray-10 text-sm font-semibold py-2 underline">
        Market
      </h3>
      <div className="flex flex-wrap lg:w-1/2 py-2 text-nearblue-600 dark:text-neargray-10">
        <div className="w-full md:w-1/4 mb-2 md:mb-0">Volume (24H):</div>
        <div className="w-full md:w-3/4 break-words">
          {tokens?.volume_24h !== null && tokens?.volume_24h !== undefined ? (
            `$${dollarNonCentFormat(tokens?.volume_24h)}`
          ) : (
            <span className="text-xs">N/A</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap lg:w-1/2 py-2 text-nearblue-600 dark:text-neargray-10">
        <div className="w-full md:w-1/4 mb-2 md:mb-0">Circulating MC:</div>
        <div className="w-full md:w-3/4 break-words">
          {tokens?.market_cap !== null && tokens?.market_cap !== undefined ? (
            `$${dollarNonCentFormat(tokens?.market_cap)}`
          ) : (
            <span className="text-xs">N/A</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap lg:w-1/2 py-2 text-nearblue-600 dark:text-neargray-10">
        <div className="w-full md:w-1/4 mb-2 md:mb-0">On-chain MC:</div>
        <div className="w-full md:w-3/4 break-words">
          {tokens?.onchain_market_cap !== null &&
          tokens?.onchain_market_cap !== undefined ? (
            `$${dollarNonCentFormat(tokens?.onchain_market_cap)}`
          ) : (
            <span className="text-xs">N/A</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap lg:w-1/2 py-2 text-nearblue-600 dark:text-neargray-10">
        <div className="w-full md:w-1/4 mb-2 md:mb-0">Circulating Supply:</div>
        <div className="w-full md:w-3/4 break-words">
          {tokens?.circulating_supply !== null &&
          tokens?.circulating_supply !== undefined ? (
            `${localFormat(tokens?.circulating_supply)}`
          ) : (
            <span className="text-xs">N/A</span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap lg:w-1/2 pt-6 text-gray-400 dark:text-neargray-10 text-xs">
        <div className="w-full md:w-1/4 mb-2 md:mb-0">Market Data Source:</div>
        <div className="w-full md:w-3/4 break-words flex">
          {tokens?.coingecko_id && (
            <a
              className="text-green-500 dark:text-green-250 mr-4 flex"
              href="https://www.coingecko.com?utm_campaign=partnership&utm_source=nearblocks&utm_medium=referral"
              target="_blank"
              rel="noreferrer nofollow noopener"
            >
              <CoinGecko className="h-4 w-4 fill-current mr-1" />
              CoinGecko
            </a>
          )}
          {tokens?.coinmarketcap_id && (
            <a
              className="text-green-500 dark:text-green-250 mr-4 flex"
              href="https://coinmarketcap.com/"
              target="_blank"
              rel="noreferrer nofollow noopener"
            >
              <CoinMarketcap className="h-4 w-4 fill-current mr-1" />
              Coinmarketcap
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

return MainComponent(props, context);