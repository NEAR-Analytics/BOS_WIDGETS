const [show, setShow] = useState(false)
const [start, setStart] = useState(false)
const [showFrom, setShowFrom] = useState(0)

const response = Near.view('app.webguide.near', 'get_guide', { guide_id: props?.link?.id })
const data = response && JSON.parse(response)
const lastShowTimes= data && data?.reduce((acc, chapter) => {
  acc[chapter.id] = Storage.privateGet(chapter.id + '/lastShowTime')
  return acc
}, {})

console.log('data', data)
console.log('props?.link?.id', props?.link?.id)
console.log('props', props)
console.log('lastShowTimes',lastShowTimes)

useEffect(() => {
  if (
    !start && (
      lastShowTimes === null || (
        lastShowTimes && Object.values(lastShowTimes).every(a => a === null)
      )
    )
  ) return;
  // here if (start || (lastShowTimes && Object.values(lastShowTimes).some(a => a !== null))) -- ToDo: replace?

  setStart(true);
  if (lastShowTimes) {
    for (const key in lastShowTimes) {
      const elapsed = Date.now() - (lastShowTimes[key]?.time ?? 0)
      // if (elapsed > 1000 * 60 * 60 * 3) {
      // TESTING
      lastShowTimes[key].show = elapsed > 1000 * 60 * 1 * 1
    }
  }
  console.log('lastShowTimes with .show', lastShowTimes)

  if (!lastShowTimes && context.accountId === props?.link?.authorId) {
    setShow(true)
  } else if (lastShowTimes && Object.values(lastShowTimes).some(a => a?.show)) {
    data.sort(
      (a, b) =>
        lastShowTimes[a.id] === null && lastShowTimes[b.id] === null
          ? 0
          : lastShowTimes[a.id] === null
            ? 1
            : lastShowTimes[b.id] === null
              ? -1
              : lastShowTimes[a.id].show - lastShowTimes[b.id].show
    )
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

const handleClose = (doNotShowAgain, viewedPages) => {
  if (data) {
    // const time = doNotShowAgain ? 30000000000000 : Date.now()
    const time = doNotShowAgain ? Date.now() + 1000 * 60 : Date.now() // TESTING
    const mutation = data.find((ch) => ch.id.includes('mutation'))?.id
    data.forEach((chapter) => {
      Storage.privateSet(
        chapter.id + '/lastShowTime',
        {
          time,
          mutation,
          isViewed: viewedPages.includes(chapter.id),
        }
      )
    })
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
