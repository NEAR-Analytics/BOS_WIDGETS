const Callout = styled.div`
  display: flex;
  width: 320px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #02193a;
  background: #fffffe;
  position: relative;
  left: 19px;
  font-family: sans-serif;
`;

const CalloutTitle = styled.div`
  color: #02193a;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 149%; /* 26.82px */
`;

const CalloutDescription = styled.div`
  color: #7a818b;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 149%; /* 17.88px */
`;

const ActionsGroup = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
`;

const ActionButton = styled.div`
    display: flex;
    height: 42px;
    padding: 0px 20px;
    justify-content: center;
    align-items: center;
    flex: 1 0 0;
    border-radius: 90px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    border: ${(props) => (props.$primary ? "initial" : "1px solid #E2E2E5")};
    background: ${(props) => (props.$primary ? "#02193A" : "initial")};
    color: ${(props) => (props.$primary ? "#fff" : "initial")};

    &:hover {
        background: ${(props) => (props.$primary ? "#1c3559" : "#eee")};
    }

    &:active {
        background: ${(props) => (props.$primary ? "#020c19" : "#ddd")};
    }
`;

const { link } = props;

const steps = [
  "289858ca4ee414d0961ec7f7646cf8a9",
  "788496b50edf33bf7b44d5e5c89c3622",
  "5e39302b56084cb7644e2b89ca6d36b8",
];

const currentStepIndex = steps.indexOf(link.id);
const isLastStep = currentStepIndex === steps.length - 1;
const isFirstStep = currentStepIndex === 0;

let storageStepIndex = Storage.get("step");

// is loading
if (storageStepIndex === null) {
  return <></>;
}

if (storageStepIndex === undefined || storageStepIndex < 0) {
  storageStepIndex = 0;
} else if (storageStepIndex >= steps.length) {
  storageStepIndex = steps.length - 1;
}

const handleBackClick = () => {
  Storage.set("step", currentStepIndex - 1);
};

const handleNextClick = () => {
  Storage.set("step", currentStepIndex + 1);
};

const isVisibleStep = storageStepIndex === currentStepIndex;

const callout = (
  <DappletCallout
    arrow={<Widget src="bos.dapplets.near/widget/Onboarding.Arrow" />}
  >
    <Callout>
      <CalloutTitle>It's a sandbox story first</CalloutTitle>
      <CalloutDescription>
        We are now in a sandbox mutation. Through it, we can suspendisse mattis
        interdum auctor volutpat nisl quis. Scelerisque morbi eget volutpat
        aliquet vitae curabitur non. LinkId: {link.id}
      </CalloutDescription>
      <ActionsGroup>
        <ActionButton onClick={handleBackClick} disabled={isFirstStep}>
          Back
        </ActionButton>
        <ActionButton
          $primary={true}
          onClick={handleNextClick}
          disabled={isLastStep}
        >
          Next
        </ActionButton>
      </ActionsGroup>
    </Callout>
  </DappletCallout>
);

return (
  <OverlayTrigger
    show={isVisibleStep}
    delay={{ show: 250, hide: 300 }}
    placement="right"
    overlay={callout}
  >
    <div>Target</div>
  </OverlayTrigger>
);
