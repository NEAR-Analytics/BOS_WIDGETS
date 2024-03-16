/**
 * Component: CommentsComment
 * Author: Nearblocks Pte Ltd
 * License: Business Source License 1.1
 * Description: The component displays a single post/comment.
 * @interface Props
 * @param {string} accountId - The identifier of the account associated with the post.
 * @param {string} blockHeight - The block height at which the post was made.
 * @param {Object} post - The content of the post including image and text.
 * @param {string} post.text - The text content of the post.
 * @param {Object} post.image - The image object associated with the post.
 * @param {string} post.image.ipfs_cid - The IPFS CID of the image.
 * @param {string} post.image.url - The URL of the image.
 */

/* INCLUDE: "includes/libs.jsx" */
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
  } else if (secondsAgo < 2592000) {
    const daysAgo = Math.floor(secondsAgo / 86400);
    return `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`;
  } else if (secondsAgo < 31536000) {
    const monthsAgo = Math.floor(secondsAgo / 2592000);
    return `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
  } else {
    const yearsAgo = Math.floor(secondsAgo / 31536000);
    return `${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago`;
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

function isJson(string) {
  const str = string.replace(/\\/g, '');

  try {
    JSON.parse(str);
    return false;
  } catch (e) {
    return false;
  }
}

function uniqueId() {
  return Math.floor(Math.random() * 1000);
}
function handleRateLimit(
  data,
  reFetch,
  Loading,
) {
  if (data.status === 429 || data.status === undefined) {
    const retryCount = 4;
    const delay = Math.pow(2, retryCount) * 1000;
    setTimeout(() => {
      reFetch();
    }, delay);
  } else {
    if (Loading) {
      Loading();
    }
  }
}

function mapFeilds(fields) {
  const args = {};

  fields.forEach((fld) => {
    let value = fld.value;

    if (fld.type === 'number') {
      value = Number(value);
    } else if (fld.type === 'boolean') {
      value =
        value.trim().length > 0 &&
        !['false', '0'].includes(value.toLowerCase());
    } else if (fld.type === 'json') {
      value = JSON.parse(value);
    } else if (fld.type === 'null') {
      value = null;
    }

    (args )[fld.name] = value + '';
  });

  return args;
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











function MainComponent({ accountId, blockHeight, post }) {
  const BlockHeight = blockHeight === 'now' ? 'now' : parseInt(blockHeight);

  const profile = Social.getr(`${accountId}/profile`);
  const name = profile.name || 'No-name profile';
  const title = `@${accountId}`;
  const [time, setTime] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fallbackUrl, _setFallbackUrl] = useState(
    'https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm',
  );

  useEffect(() => {
    async function fetchTime() {
      setTime('Loading');
      try {
        asyncFetch(
          `https://api.near.social/time?blockHeight=${BlockHeight}`,
        ).then((res) => {
          if (!res) {
            return 'Loading';
          }

          if (!res.ok || res.body === 'null') {
            return 'unknown';
          }
          const timeMs = parseFloat(res.body);
          return setTime(timeAgo(timeMs / 1000));
        });
      } catch (error) {
        console.error('Error fetching time:', error);
        setTime('Loading');
      }
    }
    fetchTime();
  }, [BlockHeight]);
  useEffect(() => {
    if (JSON.stringify(post.image) !== JSON.stringify(imageUrl)) {
      setImageUrl(post.image);
    }
  }, [post.image, imageUrl]);

  function toUrl(image) {
    return (
      (image.ipfs_cid
        ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
        : image.url) || fallbackUrl
    );
  }

  const renderPath = (properties) => {
    return (
      <Widget
        key={properties}
        src={properties.path}
        props={properties.params}
      />
    );
  };
  return (
    <>
      <div className="py-4 border-b px-8">
        <div className="flex justify-start text-center">
          <img
            className="rounded-full w-12 h-12"
            src={`https://i.near.social/magic/${'large'}/https://near.social/magic/img/account/${accountId}`}
            alt=""
          />
          <div className="flex justify-start ml-2 bottom-0 top-0">
            <p className="font-semibold">{name} </p>
            <p className="text-gray-600 font-thin ml-0.5"> {title}</p>
          </div>
          <p className="text-gray-600 flex align-middle">
            {blockHeight === 'now' ? (
              'now'
            ) : (
              <p className="text-muted">. {time}</p>
            )}
          </p>
        </div>
        <div className="mb-2">
          <div className="container">
            <div className="ml-12 top-0">
              <Markdown text={post.text} onPath={renderPath} />
            </div>
            {post.image && (
              <div className="w-full flex justify-center text-center">
                <img
                  className="rounded-lg md:max-w-lg"
                  src={toUrl(imageUrl)}
                  loading="lazy"
                  alt="attached image"
                  onError={() => {
                    if (imageUrl !== fallbackUrl) {
                      State.update({
                        imageUrl: fallbackUrl,
                      });
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

return MainComponent(props, context);