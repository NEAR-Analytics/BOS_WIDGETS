const aloha = "hi";
const { hideDisclaimer } = props;

return (
  <>
    <Widget src="ciocan.near/widget/bos-showcase-content" />
    {!hideDisclaimer && (
      <Widget src="ciocan.near/widget/bos-showcase-disclaimer" />
    )}
  </>
);
