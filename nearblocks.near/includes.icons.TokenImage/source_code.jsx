/**
 * @interface Props
 * @param {string} [src] - The URL string pointing to the image source.
 * @param {string} [alt] - The alternate text description for the image.
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 * @param {string} [appUrl] - The URL of the application.
 */









const TokenImage = ({ appUrl, src, alt, className, onLoad }) => {
  const placeholder = `${appUrl}images/tokenplaceholder.svg`;
  const onError = (e) => {
    e.target.onError = null;
    e.target.src = placeholder;
  };

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default TokenImage;
