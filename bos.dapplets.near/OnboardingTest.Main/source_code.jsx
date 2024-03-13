const lastShowTime = Storage.privateGet('lastShowTime')
const data = props.data || props.link?.id && Social.get('bos.dapplets.near/Onboarding/data/' + props.link?.id)
const [show, setShow] = useState(false)
const [start, setStart] = useState(false)

useEffect(() => {
  if (!start && !lastShowTime) return
  setStart(true)
  const elapsed = Date.now() - (lastShowTime ?? 0)
  // setShow(elapsed > 1000 * 60 * 60 * 3)
  setShow(elapsed > 1000 * 60 * 1 * 1) // TESTING
}, [start, lastShowTime])

setTimeout(() => setStart(true), 10000)

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

const handleClose = (doNotShowAgain) => {
  if (doNotShowAgain) {
    // Storage.privateSet('lastShowTime', 30000000000000)
    Storage.privateSet('lastShowTime', Date.now() + 1000 * 60) // TESTING
  } else {
    Storage.privateSet('lastShowTime', Date.now())
  }
  setShow(false)
}

const saveData = (data) => Social.set({ `Onboarding/data/${props.link?.id}`: data })

return (
  <OverlayTriggerWrapper>
    {show ? (
      <DappletOverlay>
        <Onboarding>
          <Widget
            props={{ handleClose, data, saveData }}
            src="bos.dapplets.near/widget/Onboarding.SandboxOnboarding"
          />
        </Onboarding>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
)