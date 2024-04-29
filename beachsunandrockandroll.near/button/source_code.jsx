
const Button = ({ className, children, cnButton, setCnButton,  ...props }) => {

  return (
    <>
      {["", "loaded"].includes(cnButton) ? (
        <Widget
          src="beachsunandrockandroll.near/widget/buttonIframe"
          props={{
            output: setCnButton,
            className,
          }}
        />
      ) : (
        <button className={cnButton} ref="forwardedRef" {...props}>
          {children}
        </button>
      )}
    </>
  );
};

return { Button };
