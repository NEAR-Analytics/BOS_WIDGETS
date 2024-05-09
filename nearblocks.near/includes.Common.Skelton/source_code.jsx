/**
 * @interface Props
 * @param {string} [className] - The CSS class name(s) for styling purposes.
 */





const Skelton = (props) => {
  return (
    <div
      className={`bg-gray-200 h-5 rounded shadow-sm animate-pulse ${props.className}`}
    ></div>
  );
};

export default Skelton;
