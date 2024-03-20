const [show, setShow] = useState(false)
const [start, setStart] = useState(false)
const [showFrom, setShowFrom] = useState(0)

const response = Near.view('app.webguide.near', 'get_guide', { guide_id: props?.link?.id })
const data = response && JSON.parse(response)
const lastShow= data && data?.reduce((acc, chapter) => {
  acc[chapter.id] = Storage.privateGet(chapter.id + '/lastShow')
  return acc
}, {})

console.log('data', data)
console.log('props?.link?.id', props?.link?.id)
console.log('props', props)
console.log('lastShow',lastShow)

useEffect(() => {
  if (
    !start && (
      lastShow === null || (
        lastShow && Object.values(lastShow).every(a => a === null)
      )
    )
  ) return;
  // here if (start || (lastShow && Object.values(lastShow).some(a => a !== null))) -- ToDo: replace?

  setStart(true);
  if (lastShow) {
    for (const key of Object.keys(lastShow)) {
      const elapsed = Date.now() - (lastShow[key]?.time ?? 0)
      // if (elapsed > 1000 * 60 * 60 * 3) {
      // TESTING
      if (lastShow[key]) lastShow[key].show = elapsed > 1000 * 60 * 1 * 1
    }
  }
  console.log('lastShow with .show', lastShow)

  if (!lastShow && context.accountId === props?.link?.authorId) {
    setShow(true)
  } else if (lastShow && Object.values(lastShow).some(a => a?.show)) {
    data.sort(
      (a, b) =>
        !lastShow[a.id] && !lastShow[b.id]
          ? 0
          : !lastShow[a.id]
            ? 1
            : !lastShow[b.id]
              ? -1
              : lastShow[a.id].show - lastShow[b.id].show
    )
    console.log('data after sort', data)
    setShowFrom(Object.values(lastShowByIds).filter(a => !a).length)
    setShow(true)
  }
}, [start, lastShow])

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
        chapter.id + '/lastShow',
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
    {show ? DappletOverlay ? (
      <DappletOverlay>
        <Onboarding>
          <Widget
            props={{ handleClose, data, saveData, setShow, link: props.link, showFrom }}
            src="bos.dapplets.near/widget/OnboardingTest.SandboxOnboarding"
          />
        </Onboarding>
      </DappletOverlay>
    ) : (
        <Onboarding>
          <Widget
            props={{ handleClose, data, saveData, setShow, link: props.link, showFrom }}
            src="bos.dapplets.near/widget/OnboardingTest.SandboxOnboarding"
          />
        </Onboarding>
    ) : null}
  </OverlayTriggerWrapper>
)
