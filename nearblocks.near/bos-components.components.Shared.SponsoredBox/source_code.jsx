/* INCLUDE COMPONENT: "includes/Banners/Trade.jsx" */
/**
 * @interface Props
 * @param {string} [appUrl] - The URL of the application.
 */





const sponsoredTrade = [
  {
    title: 'Ref Finance - #1 AMM on NEAR',
    description:
      'Ref Finance is a community-led, multi-purpose DeFi platform built on the NEAR Protocol.',
    url: 'https://ref.finance',
  },
];

const Trade = (props) => {
  return (
    <div>
      {sponsoredTrade.map((sponsore, i) => (
        <div
          key={i}
          className={`py-3 ${
            sponsoredTrade.length > 1 &&
            sponsoredTrade.length - 1 !== i &&
            'border-b'
          }`}
        >
          <a
            href={sponsore.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <span className="flex items-center text-green-500 text-sm mb-2">
              <img
                src={`${props.appUrl}sponsored/ref-finance-icon.svg`}
                alt="1inch - #1 DeFi aggregator"
                width={20}
                height={20}
                className="w-5 h-5 mr-3"
              />
              <h3 className="ml-2"> {sponsore.title}</h3>
            </span>
          </a>
          <p className="text-xs text-gray-500">{sponsore.description}</p>
        </div>
      ))}
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Banners/Trade.jsx" */
/* INCLUDE COMPONENT: "includes/Banners/Earn.jsx" */
/**
 * @interface Props
 * @param {string} [appUrl] - The URL of the application.
 */





const Earn = (props) => {
  return (
    <a
      href="https://near.staderlabs.com/lt/near?tab=Stake"
      target="_blank"
      rel="noopener noreferrer nofollow"
    >
      <span className="flex items-center text-green-500 text-sm mb-2">
        <img
          alt="Stader Labs"
          width={15}
          height={20}
          className="w-4 h-4 mr-3"
          src={`${props.appUrl}_next/image?url=%2Fsponsored%2Fstader.png&w=16&q=75`}
        />
        <h3 className="ml-2">Stader Labs</h3>
      </span>
      <p className="text-xs text-gray-500">
        High DeFi Yields ~21% on NearX with Stader | Multi-Layer Security | Zero
        Rewards Loss | $1 Mn Bug Bounty
      </p>
    </a>
  );
};/* END_INCLUDE COMPONENT: "includes/Banners/Earn.jsx" */
/* INCLUDE COMPONENT: "includes/Banners/Store.jsx" */
/**
 * @interface Props
 * @param {string} [appUrl] - The URL of the application.
 */





const sponsoredStore = [
  {
    title: '1inch Wallet  - Your self-custodial vault',
    description:
      'Audited by top security firms. Hardware wallet connection. MEV protected. Easy to use, secure and self-custodial. Try the 1inch Wallet now!',
    url: 'https://1inch.network/Nearblocks_StoreButton',
    image: '/sponsored/1inch.svg',
  },
];

const Store = (props) => {
  return (
    <div>
      {sponsoredStore.map((sponsore, i) => (
        <div
          key={i}
          className={`py-3 ${
            sponsoredStore.length > 1 &&
            sponsoredStore.length - 1 !== i &&
            'border-b'
          }`}
        >
          <a
            href={sponsore.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <span className="flex items-center text-green-500 text-sm mb-2">
              <img
                alt="1inch - #1 DeFi aggregator"
                width={20}
                height={20}
                className="w-5 h-5 mr-3"
                src={`${props.appUrl}sponsored/1inch.svg`}
              />
              <h3 className="ml-2"> {sponsore.title}</h3>
            </span>
          </a>
          <p className="text-xs text-gray-500">{sponsore.description}</p>
        </div>
      ))}
    </div>
  );
};/* END_INCLUDE COMPONENT: "includes/Banners/Store.jsx" */
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
      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
    </svg>
  );
};/* END_INCLUDE COMPONENT: "includes/icons/ArrowDown.jsx" */
/* INCLUDE: "includes/libs.jsx" */
function getConfig(network) {
  switch (network) {
    case 'mainnet':
      return {
        ownerId: 'nearblocks.near',
        nodeUrl: 'https://rpc.mainnet.near.org',
        backendUrl: 'https://api3.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://nearblocks.io/',
      };
    case 'testnet':
      return {
        ownerId: 'nearblocks.testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        backendUrl: 'https://api3-testnet.nearblocks.io/v1/',
        rpcUrl: 'https://archival-rpc.testnet.near.org',
        appUrl: 'https://testnet.nearblocks.io/',
      };
    default:
      return {};
  }
}
function debounce(
  delay,
  func,
) {
  let timer;
  let active = true;
  console.log('hgjhgh');
  const debounced = (arg) => {
    if (active) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        active && func(arg);
        timer = undefined;
      }, delay);
    } else {
      func(arg);
    }
  };

  debounced.isPending = () => {
    return timer !== undefined;
  };

  debounced.cancel = () => {
    active = false;
  };

  debounced.flush = (arg) => func(arg);

  return debounced;
}
/* END_INCLUDE: "includes/libs.jsx" */

function MainComponent() {
  const config = getConfig(context.networkId);

  return (
    <div className="flex items-center flex-shrink-0 max-w-full px-2 space-x-2 pt-4">
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="flex bg-green-500  border border-green-900/10 hover:bg-green-400 text-white text-xs px-3 py-2 mb-4 rounded focus:outline-none"
            aria-label="Update dimensions"
          >
            Buy <ArrowDown className="h-4 w-4 fill-current ml-1" />
          </button>
        </Popover.Trigger>
        <Popover.Content
          className="bg-white w-60 shadow-lg border rounded-lg p-3 mt-2 slide-down"
          sideOffset={5}
        >
          <span
            className="text-xs text-gray-400 absolute right-2 top-2"
            style={{ fontSize: '10px' }}
          >
            Sponsored
          </span>
          <ul className="space-y-4 divide-y">
            <li className="pt-3">{/* <Buy /> */}</li>
          </ul>
        </Popover.Content>
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="flex bg-green-500  border border-green-900/10 hover:bg-green-400 text-white text-xs px-3 py-2 mb-4 rounded focus:outline-none"
            aria-label="Update dimensions"
          >
            Trade <ArrowDown className="h-4 w-4 fill-current ml-1" />
          </button>
        </Popover.Trigger>
        <Popover.Content
          className="bg-white w-60 shadow-lg border rounded-lg p-3 mt-2 slide-down"
          sideOffset={5}
        >
          <span
            className="text-xs text-gray-400 absolute right-2 top-2"
            style={{ fontSize: '10px' }}
          >
            Sponsored
          </span>
          <ul className="space-y-4 divide-y">
            <li className="pt-3">
              <Trade appUrl={config?.appUrl} />
            </li>
          </ul>
        </Popover.Content>
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="flex bg-green-500  border border-green-900/10 hover:bg-green-400 text-white text-xs px-3 py-2 mb-4 rounded focus:outline-none"
            aria-label="Update dimensions"
          >
            Earn <ArrowDown className="h-4 w-4 fill-current ml-1" />
          </button>
        </Popover.Trigger>
        <Popover.Content
          className="bg-white w-60 shadow-lg border rounded-lg p-3 mt-2 slide-down"
          sideOffset={5}
        >
          <span
            className="text-xs text-gray-400 absolute right-2 top-2"
            style={{ fontSize: '10px' }}
          >
            Sponsored
          </span>
          <ul className="space-y-4 divide-y">
            <li className="pt-3">
              <Earn appUrl={config?.appUrl} />
            </li>
          </ul>
        </Popover.Content>
      </Popover.Root>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="flex bg-green-500  border border-green-900/10 hover:bg-green-400 text-white text-xs px-3 py-2 mb-4 rounded focus:outline-none"
            aria-label="Update dimensions"
          >
            Store <ArrowDown className="h-4 w-4 fill-current ml-1" />
          </button>
        </Popover.Trigger>
        <Popover.Content
          className="bg-white w-60 shadow-lg border rounded-lg p-3 mt-2 slide-down"
          sideOffset={5}
        >
          <span
            className="text-xs text-gray-400 absolute right-2 top-2"
            style={{ fontSize: '10px' }}
          >
            Sponsored
          </span>
          <ul className="space-y-4 divide-y">
            <li className="pt-3">
              <Store appUrl={config?.appUrl} />
            </li>
          </ul>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
}

return MainComponent(props, context);