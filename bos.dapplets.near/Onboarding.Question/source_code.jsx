return (
  <OverlayTrigger
    placement="right"
    overlay={
      <DappletCallout
        arrow={<Widget  loading={<></>} src="bos.dapplets.near/widget/Onboarding.Arrow" />}
      >
        <Widget  loading={<></>} src="bos.dapplets.near/widget/Onboarding.Callout" />
      </DappletCallout>
    }
  >
    <div>
      <Widget  loading={<></>} src="bos.dapplets.near/widget/Onboarding.QuestionIcon" />
    </div>
  </OverlayTrigger>
);
