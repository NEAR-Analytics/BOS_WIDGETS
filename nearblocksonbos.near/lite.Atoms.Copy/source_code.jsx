const Copy = ({ buttonClassName, className, text }) => {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button className={buttonClassName} onClick={onCopy}>
      {copied ? (
        <Widget
          key="check-icon"
          props={{ className }}
          src={`nearblocksonbos.near/widget/lite.Icons.Check`}
        />
      ) : (
        <Widget
          key="copy-icon"
          props={{ className }}
          src={`nearblocksonbos.near/widget/lite.Icons.Copy`}
        />
      )}
    </button>
  );
};
return Copy(props);
