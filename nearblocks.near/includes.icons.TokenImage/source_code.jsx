/**
 * @interface Props
 * @param {string} [src] - The URL string pointing to the image source.
 * @param {string} [alt] - The alternate text description for the image.
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 * @param {string} [appUrl] - The URL of the application.
 */








const TokenImage = (props) => {
  const placeholder = `${props.appUrl}images/tokenplaceholder.svg`;

  return (
    <img
      src={props.src || placeholder}
      alt={props.alt}
      className={props.className}
    />
  );
};

export default TokenImage;
