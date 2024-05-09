return (
  <OverlayTrigger
    placement="right"
    overlay={
      <DappletCallout
        arrow={<Widget src="bos.dapplets.near/widget/Onboarding.Arrow" />}
      >
        <Widget src="bos.dapplets.near/widget/Onboarding.Callout" />
      </DappletCallout>
    }
  >
    <div>
      <Widget src="bos.dapplets.near/widget/Onboarding.QuestionIcon" />
    </div>
  </OverlayTrigger>
);
