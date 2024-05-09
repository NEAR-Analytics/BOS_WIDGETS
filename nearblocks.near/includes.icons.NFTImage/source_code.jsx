import TokenImage from '@/includes/icons/TokenImage';









export const NFTImage = ({
  base,
  media,
  alt,
  reference,
  ...rest
}) => {
  const [src, setSrc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function getMediaUrl(base, media, reference) {
      if (
        media.startsWith('https://') ||
        media.startsWith('http://') ||
        media.startsWith('data:image')
      )
        return media;

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
              return resp.data.media;
            })
            .catch(() => {});
        } catch (error) {
          //
        }
      }

      if (base) return `${base}/${media}`;

      return `https://cloudflare-ipfs.com/ipfs/${media}`;
    }

    if (media || base || reference) {
      getMediaUrl(base || '', media || '', reference || '').then(setSrc);
    }
  }, [base, media, reference]);

  const onLoad = () => setLoading(false);

  return (
    <span className="w-full h-full flex items-center justify-center relative">
      {loading && (
        <span className="absolute inset-0 bg-white">
          <span className="absolute inset-0 animate-pulse bg-gray-300 rounded" />
        </span>
      )}
      <TokenImage src={src} alt={alt} {...rest} onLoad={onLoad} />
    </span>
  );
};
