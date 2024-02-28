const lastShowTime = Storage.privateGet('lastShowTime')
const showOnStart = Date.now() - (lastShowTime ?? 0) > 1000 * 60 * 60 * 3
const [show, setShow] = useState(showOnStart)

const OverlayTriggerWrapper = styled.div`
  display: flex;
  z-index: 500;

  .OverlayTrigger {
    position: absolute;
    background: #db504a;
    border: 1px solid #db504a;
    width: 6px;
    height: 49px;
    right: -6px;
    top: 10px;
    border-radius: 0px 4px 4px 0px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    z-index: 79;
  }
`

const Onboarding = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  animation: falling-animation 0.3s linear forwards;

  @keyframes falling-animation {
    from {
      transform: translate(-50%, -200%);
    }

    to {
      transform: translate(-50%, -50%);
    }
  }
`;

const handleOpen = () => {
  setShow(true)
}

const handleClose = (dontShowAgain) => {
  if (dontShowAgain) {
    Storage.privateSet('lastShowTime', 30000000000000)
  } else {
    Storage.privateSet('lastShowTime', Date.now())
  }
  setShow(false)
}

return (
  <OverlayTriggerWrapper onClick={handleOpen}>
    {show ? (
      <DappletOverlay>
        <Onboarding>
          <Widget
            props={{ handleClose: handleClose }}
            src="bos.dapplets.near/widget/Onboarding.SandboxOnboarding"
          />
        </Onboarding>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
)