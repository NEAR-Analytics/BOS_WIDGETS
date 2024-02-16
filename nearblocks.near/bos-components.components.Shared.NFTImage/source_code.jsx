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
  const placeholder = `${appUrl}images/tokenplaceholder.svg`;

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

function timeAgo(unixTimestamp) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const secondsAgo = currentTimestamp - unixTimestamp;

  if (secondsAgo < 5) {
    return 'Just now';
  } else if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  }
}

function shortenAddress(address) {
  const string = String(address);

  if (string.length <= 20) return string;

  return `${string.substr(0, 10)}...${string.substr(-7)}`;
}

function urlHostName(url) {
  try {
    const domain = new URL(url);
    return domain?.hostname ?? null;
  } catch (e) {
    return null;
  }
}

function holderPercentage(supply, quantity) {
  return Math.min(Big(quantity).div(Big(supply)).mul(Big(100)).toFixed(2), 100);
}

function isAction(type) {
  const actions = [
    'DEPLOY_CONTRACT',
    'TRANSFER',
    'STAKE',
    'ADD_KEY',
    'DELETE_KEY',
    'DELETE_ACCOUNT',
  ];

  return actions.includes(type.toUpperCase());
}
function localFormat(number) {
  const bigNumber = Big(number);
  const formattedNumber = bigNumber
    .toFixed(5)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // Add commas before the decimal point
  return formattedNumber.replace(/\.?0*$/, ''); // Remove trailing zeros and the dot
}
function formatWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
/* END_INCLUDE: "includes/libs.jsx" */


const getMediaUrl = async (base, media, reference) => {
  if (
    media.startsWith('https://') ||
    media.startsWith('http://') ||
    media.startsWith('data:image')
  )
    return Promise.resolve(media);

  if (
    reference &&
    (base.startsWith('https://arweave.net') ||
      reference.startsWith('https://arweave.net'))
  ) {
    try {
      return asyncFetch(
        base ? `${base.replace(/\/+$/, '')}/${reference}` : `${reference}`,
      )
        .then((resp) => {
          return resp.body.media;
        })
        .catch(() => {});
    } catch (error) {
      //
    }
  }

  if (base) return Promise.resolve(`${base}/${media}`);

  return Promise.resolve(`https://cloudflare-ipfs.com/ipfs/${media}`);
};

function MainComponent({
  base,
  media,
  alt,
  reference,
  className,
  network,
}) {
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(true);
  const config = getConfig(network);

  useEffect(() => {
    if (media || base || reference) {
      setLoading(true);
      getMediaUrl(base || '', media || '', reference)
        .then(setSrc)
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false));
    }
  }, [base, media, reference]);

  const onLoad = () => setLoading(false);

  const onSetSrc = (newSrc) => {
    if (newSrc !== src) {
      setSrc(newSrc);
    }
  };

  return (
    <span className="w-full h-full flex items-center justify-center relative">
      {loading && (
        <span className="absolute inset-0 bg-white">
          <span className="absolute inset-0 animate-pulse bg-gray-300 rounded" />
        </span>
      )}
      <TokenImage
        src={src}
        alt={alt}
        className={className}
        appUrl={config.appUrl}
        onLoad={onLoad}
        onSetSrc={onSetSrc}
      />
    </span>
  );
}

return MainComponent(props, context);