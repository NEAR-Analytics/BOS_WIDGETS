const [show, setShow] = useState(false)
const [start, setStart] = useState(false)
const [showFrom, setShowFrom] = useState(0)

const response = Near.view('app.webguide.near', 'get_guide', { guide_id: props?.link?.id })
const data = response && JSON.parse(response)
const lastShowTimes = data && data?.map((chapter) => Storage.privateGet(chapter.id + '/lastShowTime'))

console.log('data', data)
console.log('props?.link?.id', props?.link?.id)
console.log('props', props)
console.log('lastShowTimes',lastShowTimes)

useEffect(() => {
  if (!start && (lastShowTimes === null || lastShowTimes?.[0] === null)) return;
  setStart(true);
  const lastShowByIds = {}
  if (lastShowTimes) {
    for (let i = 0; i < lastShowTimes.length; ++i) {
      const elapsed = Date.now() - (lastShowTimes[i] ?? 0)
      // if (elapsed > 1000 * 60 * 60 * 3) {
      // TESTING
      lastShowByIds[data[i].id] = elapsed > 1000 * 60 * 1 * 1 ? 1 : 0
    }
  }
  console.log('lastShowByIds', lastShowByIds)

  if (!lastShowTimes && context.accountId === props?.link?.authorId) {
    setShow(true)
  } else if (Object.values(lastShowByIds).includes(1)) {
    data.sort((chapA, chapB) => lastShowByIds[chapA.id] - lastShowByIds[chapB.id])
    console.log('data after sort', data)
    setShowFrom(Object.values(lastShowByIds).filter(a => !a).length)
    setShow(true)
  }
}, [start, lastShowTimes])

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
  data && data.forEach((chapter) => Storage.privateSet(chapter.id + '/lastShowTime', time))
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

if (show) {
  // const time = doNotShowAgain ? 30000000000000 : Date.now()
  const time = doNotShowAgain ? Date.now() + 1000 * 60 : Date.now() // TESTING
  console.log('time on start', time)
  data && data.forEach((chapter) => {
    Storage.privateSet(chapter.id + '/lastShowTime', time)
  })
}

return (
  <OverlayTriggerWrapper>
    {show ? (
      <DappletOverlay>
        <Onboarding>
          <Widget
            props={{ handleClose, data, saveData, setShow, link: props.link, showFrom }}
            src="bos.dapplets.near/widget/Onboarding.SandboxOnboarding"
          />
        </Onboarding>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
)
