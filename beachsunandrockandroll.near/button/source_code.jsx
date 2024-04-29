const Button = ({
  className,
  children,
  variant,
  size,
  cnButton,
  setCnButton,
  ...props
}) => {
  if (["", "loaded"].includes(cnButton))
    return (
      <Widget
        src="beachsunandrockandroll.near/widget/buttonIframe"
        props={{
          output: setCnButton,
          variant: "outline",
        }}
      />
    );

  return (
    <button className={cnButton} ref="forwardedRef" {...props}>
      {children}
    </button>
  );
};

return { Button };
