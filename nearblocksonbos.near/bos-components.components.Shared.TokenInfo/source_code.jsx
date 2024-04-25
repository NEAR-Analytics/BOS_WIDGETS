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


function MainComponent(props) {
  const { network, contract, amount, decimals, ownerId } = props;

  const { shortenToken, shortenTokenSymbol, localFormat } = VM.require(
    `${ownerId}/widget/includes.Utils.formats`,
  );

  const { getConfig } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const { decodeArgs, tokenAmount } = VM.require(
    `${ownerId}/widget/includes.Utils.near`,
  );
  const [meta, setMeta] = useState({} );

  const config = getConfig && getConfig(network);

  const Loader = (props) => {
    return (
      <div
        className={`bg-gray-200 dark:bg-black-200 h-5 rounded shadow-sm animate-pulse ${props.className} ${props?.wrapperClassName}`}
      ></div>
    );
  };

  useEffect(() => {
    function fetchMetadata(contract) {
      if (contract) {
        asyncFetch(`${config?.rpcUrl}`, {
          method: 'POST',
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'dontcare',
            method: 'query',
            params: {
              request_type: 'call_function',
              finality: 'final',
              account_id: contract,
              method_name: 'ft_metadata',
              args_base64: '',
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(
            (data



) => {
              const resp = data?.body?.result;
              setMeta(decodeArgs(resp.result));
            },
          )
          .catch(() => {});
      }
    }

    fetchMetadata(contract);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract, config?.rpcUrl]);

  return !meta?.name ? (
    <Loader wrapperClassName="flex w-full max-w-xs" />
  ) : (
    <>
      <span className="font-normal px-1">
        {amount
          ? localFormat(tokenAmount(amount, decimals || meta?.decimals, true))
          : amount ?? ''}
      </span>
      <Link href={`/token/${contract}`} className="hover:no-underline">
        <a className="text-green flex items-center hover:no-underline dark:text-green-250">
          <span className="flex items-center">
            <TokenImage
              src={meta?.icon}
              alt={meta?.name}
              appUrl={config?.appUrl}
              className="w-4 h-4 mx-1"
            />
            {shortenToken(meta?.name)}
            <span>&nbsp;({shortenTokenSymbol(meta?.symbol)})</span>
          </span>
        </a>
      </Link>
    </>
  );
}

return MainComponent(props, context);