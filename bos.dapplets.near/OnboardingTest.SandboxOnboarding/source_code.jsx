const { handleClose, saveData, setShow, link, data, showFrom, oldRawData } = props

const [doNotShowAgain, setDoNotShowAgain] = useState(false)
const [activeChapterNumber, setActiveChapterNumber] = useState(data && showFrom)
const [newData, setNewData] = useState(oldRawData ?? '')
const [isEditMode, setEditMode] = useState(false)
const [viewedPages, setViewed] = useState([])

useEffect(() => {
  if (!viewedPages.includes(data[activeChapterNumber].id))
    setViewed([...viewedPages, data[activeChapterNumber].id])
})

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 630px;
  height: 690px;
  background: #FFFFFE;
  border: 1px solid #02193A;
  border-radius: 20px;
  padding: 20px;
  gap: 20px;
  z-index: 1000;
  box-shadow: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #02193A;

  h1 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    padding: 0;
    margin: 0;
    font-size: 32px;
    font-weight: 600;
    line-height: 48px;
  }
`

const TopLine = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 24px;
  margin: 0;
  padding: 0;
`

const PagesIndicators = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 6px;
`

const PageIndicatorBtn = styled.button`
  position: relative;
  display: flex;
  border: none;
  border-radius: 9em;
  margin: 0;
  padding: 2px;
  background: none;
  cursor: pointer;
  transition-duration: .15s;

  &:not(:disabled, .active):hover {
    background: rgba(29,155,240,0.10);

    div {
      background: rgba(0, 0, 0, .2);
    }
  }

  &:not(:disabled, .active):active {
    background: rgba(29,155,240,0.20);

    div {
      background: rgba(0, 0, 0, .3);
    }
  }
`

const PageIndicator = styled.div`
  position: relative;
  width: 10px;
  height: 10px;
  border: none;
  border-radius: 9em;
  background: rgba(0, 0, 0, .1);
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition-duration: .15s;

  &.active {
    background: rgba(56, 75, 255, 1);
    cursor: default;
  }
`

const EditButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 24px;
  background: none;
  cursor: pointer;
  height: 24px;
  color: #222;
  transition-duration: .15s;
  
  :hover {
    color: #111;
    background: #eee;
  }
  
  :active {
    color: #000;
    background: #ddd;
  }
`

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;

  svg {
    path {
      stroke: #838891;
      transition-duration: .2s;
    }
  }
  
  :hover {
    svg {
      path {
        stroke: #555555;
      }
    }
  }
`

const closeIcon =  (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18"  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6.5L18 18.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const WarningMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 10px;
  gap: 6px;
  align-items: center;
  background: rgba(56, 75, 255, 0.05);
  border-radius: 5px;
  flex: none;
  flex-grow: 0;
  position: relative;

  p {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: #384BFF;
    flex: none;
    flex-grow: 0;
  }

  svg {
    padding: 0;
    margin: 0;
  }
`

const AlertIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#384BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.01 16L12.01 12" stroke="#384BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.01 8L12 8" stroke="#384BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  gap: 10px;
  flex: 1;
  overflow: hidden;
`

const ArrowButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 4px;
  width: 32px;
  height: 32px;
  background: #F5F6FE;
  border: none;
  border-radius: 40px;
  cursor: default;
  transform: ${(p) => (p.direction === 'left' ? 'rotate(0.5turn)' : '')};
  transition-duration: .15s;

  svg {
    path {
      stroke: rgba(153, 152, 154, 1);
    }
  }

  &:not(:disabled) {
    cursor: pointer;

    svg {
      path {
        stroke: rgba(56, 75, 255, 1);
      }
    }
  }

  &:not(:disabled):hover {
    background: rgba(56, 75, 255, 1);

    svg {
      path {
        stroke: white;
      }
    }
  }

  &:not(:disabled):active {
    background: rgba(26, 45, 225, 1);

    svg {
      path {
        stroke: white;
      }
    }
  }
`

const arrowRight = (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12.5H19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 5.5L19 12.5L12 19.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const Card = styled.div`
  position: relative;
  overflow: auto;
  display: flex;
  flex 1;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  gap: 10px;
  border: none;
  border-radius: 20px;
  background: rgba(248, 249, 255, 1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;


  h3 {
    padding: 8px 0 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #121212;
    flex: none;
    align-self: stretch;
    flex-grow: 0;
    text-indent: 16px;
  }

  img {
    position: relative;
    display: flex;
    box-sizing: border-box;
    width: 100%;
    height: auto !important;
    border-radius: 10px;
    flex: none;
    /* align-self: stretch; */
    flex-grow: 0;
    border: 1px solid rgb(207, 217, 222);
    /* object-fit: none; */
    /* object-position: top; */
  }

  p {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 149%;
    color: #777777;
    flex: none;
    align-self: stretch;
    flex-grow: 0;
  }

  a {
    padding: 0;
    margin: 0;
    /* align-self: flex-start; */
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 149%;
    text-decoration-line: underline !important;
    color: #384BFF;
    cursor: 'poiner';
  }
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  margin: 0;
  gap: 20px;
  width: 100%;
`

const Checkbox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  cursor: pointer;

  label {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 149%;
    text-align: center;
    color: #7A818B;

    input {
      padding: 0;
      margin: 0;
      margin-bottom: 1px;
      width: 16px;
      height: 16px;
      border-radius: 4px;
      border: 1px solid #384BFF
      cursor: pointer;
    }
  }
`

const SuccessButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  width: 180px;
  height: 42px;
  background: #02193A;
  border-radius: 50px;
  border: none;
  cursor: pointer;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 149%;
  text-align: center;
  color: #FFFFFF;
  transition-duration: 0.2s;

  :hover {
    background-color: rgb(32 45 63);
  }
`

return (!data || isEditMode) ? (
  <Container>
    <Header>
      <h1>Add data</h1>
      <CloseButton onClick={() => handleClose(false, viewedPages)}>
        {closeIcon}
      </CloseButton>
    </Header>
    <textarea
      autofocus
      style={{ width: '100%', height: '100%' }}
      onChange={(e) => setNewData(e.target.value)}
      value={newData}
    />
    <div style={{ display: 'flex', width: '80%', justifyContent: 'space-evenly' }}>
      {isEditMode ? (
        <SuccessButton onClick={() => setEditMode(false)}>
          Cancel
        </SuccessButton>
      ) : null}
      <SuccessButton onClick={() => {
        saveData(newData)
        setNewData('')
        setShow(false)
      }}>
        Save
      </SuccessButton>
    </div>
  </Container>
) : (
  <Container>
    <Header>
      <TopLine>
        {context.accountId === link.authorId ? (
          <EditButton onClick={() => setEditMode(true)}>
            Edit data
          </EditButton>
        ) : null}
        <PagesIndicators>
          {data?.map((chapter, i) => (
            <PageIndicatorBtn
              key={chapter.id}
              disabled={i === activeChapterNumber}
              onClick={() => setActiveChapterNumber(i)}
            >
              <PageIndicator
                className={i === activeChapterNumber ? 'active' : '' }
              />
            </PageIndicatorBtn>
          ))}
        </PagesIndicators>
        <CloseButton onClick={() => handleClose(false, viewedPages)}>
          {closeIcon}
        </CloseButton>
      </TopLine>
      <h1>{data[activeChapterNumber].title}</h1>
    </Header>
    <CardContainer>
      <ArrowButton
        direction='left'
        disabled={activeChapterNumber - 1 < 0}
        onClick={() => setActiveChapterNumber(activeChapterNumber - 1 < 0 ? activeChapterNumber : activeChapterNumber - 1)}
      >
        {arrowRight}
      </ArrowButton>
      <Card>
        {context.accountId === null ? (<WarningMessage>
          <AlertIcon/>
          <p>You must be Logged In to start using this</p>
        </WarningMessage>) : null}
        <Markdown text={data[activeChapterNumber].content} />
      </Card>
      <ArrowButton
        direction='right'
        disabled={activeChapterNumber + 1 > data.length - 1}
        onClick={() => setActiveChapterNumber(activeChapterNumber + 1 > data.length - 1 ? activeChapterNumber : activeChapterNumber + 1)}
      >
        {arrowRight}
      </ArrowButton>
    </CardContainer>
    <Footer>
      <Checkbox>
        <label>
          <input type="checkbox" checked={doNotShowAgain} onChange={(e) => setDoNotShowAgain(e.target.checked)} />
          Don't show it again
        </label>
      </Checkbox>
      <SuccessButton onClick={() => handleClose(doNotShowAgain, viewedPages)}>Got it</SuccessButton>
    </Footer>
  </Container>
)