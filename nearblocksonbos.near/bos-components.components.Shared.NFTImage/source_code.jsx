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
  ownerId,
}) {
  const { getConfig } = VM.require(`${ownerId}/widget/includes.Utils.libs`);

  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(true);

  const config = getConfig && getConfig(network);

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
          <span className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-black-200 rounded" />
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