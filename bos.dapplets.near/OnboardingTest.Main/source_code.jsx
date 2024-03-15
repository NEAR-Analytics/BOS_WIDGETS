const [show, setShow] = useState(false)
const [start, setStart] = useState(false)

const data = Near.view('app.webguide.near', 'get_guide', { guide_id: props?.link?.id })
const lastShowTime = Storage.privateGet(props.link.id + '/lastShowTime')

console.log('data', data)
console.log('props?.link?.id', props?.link?.id)
console.log('props', props)
console.log('lastShowTime',lastShowTime)

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
  // const time = doNotShowAgain ? 30000000000000 : Date.now()
  const time = doNotShowAgain ? Date.now() + 1000 * 60 : Date.now() // TESTING
  Storage.privateSet(props.link.id + '/lastShowTime', time)
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

return (
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
