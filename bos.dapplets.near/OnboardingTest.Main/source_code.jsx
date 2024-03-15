const lastShowTime = Storage.privateGet('lastShowTime')
const [show, setShow] = useState(false)
const [start, setStart] = useState(false)

const data = Near.view('app.webguide.near', 'get_guide', { guide_id: props?.link?.id })

console.log('data', data)
console.log('props', props)

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

const saveData = (inputData) => {
  if (context?.accountId) {
    Near.call(
      'app.webguide.near',
      'set_guide',
      {
        guide_id: props.link.id,
        data: inputData,
      }
    )
  }
}

return data === null ? null : (
  <OverlayTriggerWrapper>
    {show ? (
      <DappletOverlay>
        <Onboarding>
          <Widget
            props={{ handleClose, data, saveData, setShow, link: props.link }}
            src="bos.dapplets.near/widget/OnboardingTest.SandboxOnboarding"
          />
        </Onboarding>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
)
