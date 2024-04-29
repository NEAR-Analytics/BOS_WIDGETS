const { Tailwind } = VM.require("beachsunandrockandroll.near/widget/preflight");

const Button = ({ className, children, ...props }) => {
  const [cnButton, setCnButton] = useState("");

  return (
    <Tailwind>
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
    </Tailwind>
  );
};

return { Button };
