// const TIME_UNTIL_RESHOW = 1000 * 60 // TESTING
const TIME_UNTIL_RESHOW = 1000 * 60 * 60 * 3 // PROD

const [show, setShow] = useState(false)
const [start, setStart] = useState(false)
const [showFrom, setShowFrom] = useState(0)

const response = Near.view('app.webguide.near', 'get_guide', { guide_id: props?.link?.id })
const data = response && JSON.parse(response)
const lastShow = data && data?.reduce((acc, chapter) => {
  acc[chapter.id] = Storage.privateGet(chapter.id + '/lastShow')
  return acc
}, {})

useEffect(() => {
  if (
    !start && (
      lastShow === null || (
        lastShow && Object.values(lastShow).every(a => a === null)
      )
    )
  ) return;
  // here if (start || (lastShow && Object.values(lastShow).some(a => a !== null))) -- ToDo: replace?

  if (!start) {
    setStart(true)
    return
  }
  
  // *** DISPLAY LOGIC ***

  if (lastShow) {
    const currentMutation = data.find((ch) => ch?.id.includes('mutation'))?.id
    const currentTime = Date.now()

    for (const key of Object.keys(lastShow)) {
      if (!lastShow[key]) continue

      // TESTING
      // if (lastShow[key].doNotShowAgain && currentTime - lastShow[key].time > TIME_UNTIL_RESHOW * 3) {
      //   lastShow[key].doNotShowAgain = false
      //   lastShow[key].isViewed = false
      // }
      //

      // DO NOT refactor the following code block to stay the logic clear!!!
      if (currentMutation === lastShow[key].mutation) {
        if (!lastShow[key].doNotShowAgain) {
          lastShow[key].show = currentTime - lastShow[key].time > TIME_UNTIL_RESHOW
        } else {
          if (lastShow[key].isViewed) {
            lastShow[key].show = false
          } else {
            lastShow[key].show = currentTime - lastShow[key].time > TIME_UNTIL_RESHOW
          }
        }
      } else {
        if (!lastShow[key].doNotShowAgain) {
          if (lastShow[key].isViewed) {
            lastShow[key].show = currentTime - lastShow[key].time > TIME_UNTIL_RESHOW
          } else {
            lastShow[key].show = true
          }
        } else {
          if (lastShow[key].isViewed) {
            lastShow[key].show = false
          } else {
            lastShow[key].show = true
          }
        }
      }
    }
  }

  // *** SORT LOGIC ***

  if (!lastShow && context.accountId === props?.link?.authorId) {
    // show form to the author
    setShow(true)
  } else if (lastShow && Object.values(lastShow).some((a) => a === undefined || a?.show)) {
    // with sort - some chapters have been displayed or new
    data.sort(
      (a, b) =>
        !lastShow[a.id] && !lastShow[b.id]
          ? 0
          : !lastShow[a.id]
            ? lastShow[b.id].show ? 0 : 1
            : !lastShow[b.id]
              ? lastShow[a.id].show ? 0 : -1
              : lastShow[a.id].show - lastShow[b.id].show
    )
    const index = Object.values(lastShow).filter((a) => a && !a.show)?.length
    setShowFrom(index)
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

const handleClose = (isDoNotShowAgainChecked, viewedPages) => {
  if (data) {
    const time = Date.now()
    const mutation = data.find((ch) => ch?.id.includes('mutation'))?.id
    data.forEach((chapter) => {
      const isViewed = !!(viewedPages.includes(chapter.id) || lastShow[chapter.id].isViewed)
      const doNotShowAgain = !!((isDoNotShowAgainChecked && viewedPages.includes(chapter.id)) || lastShow[chapter.id].doNotShowAgain)
      Storage.privateSet(
        chapter.id + '/lastShow',
        {
          time,
          doNotShowAgain,
          mutation,
          isViewed,
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
            props={{
              handleClose,
              data,
              saveData,
              setShow,
              link: props.link,
              showFrom,
              oldRawData: response
            }}
            src="bos.dapplets.near/widget/Onboarding.SandboxOnboarding"
          />
        </Onboarding>
      </DappletOverlay>
    ) : null}
  </OverlayTriggerWrapper>
)
