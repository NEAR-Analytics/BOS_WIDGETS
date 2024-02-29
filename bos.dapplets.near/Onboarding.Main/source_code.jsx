const lastShowTime = Storage.privateGet('lastShowTime')
console.log('lastShowTime', lastShowTime)
const [show, setShow] = useState(false)
const [start, setStart] = useState(false)

useEffect(() => {
  console.log('start', start)
  if (!start) return
  const elapsed = Date.now() - (lastShowTime ?? 0)
  console.log('elapsed', elapsed)
  setShow(elapsed > 1000 * 60 * 1 * 1)
}, [start])

setTimeout(() => setStart(true), 5000)

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

// const handleOpen = () => {
//   setShow(true)
// }

const handleClose = (doNotShowAgain) => {
  console.log('doNotShowAgain', doNotShowAgain)
  if (doNotShowAgain) {
    Storage.privateSet('lastShowTime', 30000000000000)
  } else {
    Storage.privateSet('lastShowTime', Date.now())
  }
  setShow(false)
}

return (
  <OverlayTriggerWrapper>
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