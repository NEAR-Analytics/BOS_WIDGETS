const [doNotShowAgain, setDoNotShowAgain] = useState(false)
const { handleClose } = props

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  box-sizing: border-box;
  width: 760px;
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
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
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

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
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

const CloseIcon = () => (
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
  width: 100%;
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

const Description = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  
  p {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    color: #7A818B;
  }
`

const CardsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background: white;
  border-radius: 20px;
  align-items: flex-start;
  padding: 0 0 10px;
  gap: 20px;
  width: 100%;
  flex: none;
  flex-grow: 0;
`

// const CardsHeader = styled.div`
//   display: flex;
//   position: relative;
//   width: 100%;
//   justify-content: space-between;
//   align-items: center;
//   font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
//   color: #02193A;

//   h2 {
//     padding: 0;
//     margin: 0;
//     font-size: 24px;
//     font-weight: 600;
//     line-height: 36px;
//   }
// `

const Cards = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  gap: 20px;
`

const Card = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;
  border: 1px solid #02193A;
  border-radius: 20px;
  flex 1;

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

  div {
    box-sizing: border-box;
    height: 260px;
    border-radius: 10px;
    flex: none;
    align-self: stretch;
    flex-grow: 0;
    border: 1px solid rgb(207, 217, 222);

    &.first {
      background: -460px top  no-repeat url("https://raw.githubusercontent.com/dapplets/bos-components/main/assets/onboarding-001.png");
    }

    &.second {
      background: -160px -134px no-repeat url("https://raw.githubusercontent.com/dapplets/bos-components/main/assets/onboarding-002.png");
    }
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
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 20px;
  width: 100%;
  flex: none;
  align-self: stretch;
  flex-grow: 0;

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

const Form = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 20px;
  padding: 0;
  margin: 0;
  flex: none;
  align-self: stretch;
  flex-grow: 0;
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

return (
  <Container>
    <Header>
      <h1>You{'\u2019'}re entering Mutable Web</h1>
      <CloseButton onClick={() => handleClose(false)}>
        <CloseIcon/>
      </CloseButton>
    </Header>
    {context.accountId === null ? (<WarningMessage>
      <AlertIcon/>
      <p>You must be Logged In to start using this</p>
    </WarningMessage>) : null}
    <Description>
      <p>Mutable Web is a new web3 paradigm that allows anyone to add custom functionality to existing websites and share them within your community— no matter who owns the website.</p>
      <p>Become the co-owner of any website you are using!</p>
    </Description>
    <CardsContainer>
      <Cards>
        <Card>
          <h3>Mutation switch</h3>
          <div className='first' title='Mutation changer picture'/>
          <p>Here, you can switch between website mutations created by different communities.</p>
        </Card>
        <Card>
          <h3>Widgets control element</h3>
          <div className='second' title='Multifunctional control picture'/>
          <p>EXAMPLE: every post becomes a tray where you can add new application widgets. They become visible to anyone inside your community. This is how the Mutable Web works.</p>
        </Card>
      </Cards>
    </CardsContainer>
    <Footer>
      <a
        href='https://social.dapplets.org/mob.near/widget/ProfilePage?accountId=dappletsproject.near'
      >
        See more examples on our playground
      </a>
      <Form>
        <SuccessButton onClick={() => handleClose(doNotShowAgain)}>Got it</SuccessButton>
        <Checkbox>
          <label>
            <input type="checkbox" checked={doNotShowAgain} onChange={(e) => setDoNotShowAgain(e.target.checked)} />
            Don't show it again
          </label>
        </Checkbox>
      </Form>
    </Footer>
  </Container>
)