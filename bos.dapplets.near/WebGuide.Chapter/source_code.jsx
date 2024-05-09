return (
  <>
    {props.type == "collaut" ? (
      <Widget src="bos.dapplets.near/widget/WebGuide.Callout"></Widget>
    ) : (
      <Widget src="bos.dapplets.near/widget/WebGuide.InfoBox"></Widget>
    )}
  </>
);
