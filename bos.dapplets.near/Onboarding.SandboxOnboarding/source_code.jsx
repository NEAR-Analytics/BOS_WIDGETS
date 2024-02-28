const [doNotShowAgain, setDoNotShowAgain] = useState(false)

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 510px;
  background: #F8F9FF;
  border-radius: 20px;
  padding: 20px;
  gap: 20px;
  z-index: 1000;
  box-shadow: 0px 3px 6px 0px #4741FC0D, 0px 11px 11px 0px #4741FC0A, 0px 25px 15px 0px #4741FC08, 0px 44px 17px 0px #4741FC03, 0px 68px 19px 0px #4741FC00;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  align-items: center;
  justify-content: center;

  > a {
    padding: 0;
    margin: 0;
    align-self: flex-start;
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
`

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18" stroke="#838891" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6.5L18 18.5" stroke="#838891" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  background: white;
  border-radius: 20px;

  align-items: flex-start;
  padding: 20px;
  gap: 20px;

  width: 100%;

  flex: none;
  flex-grow: 0;
`

const CardsHeader = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: #02193A;

  h2 {
    padding: 0;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
  }
`

const Cards = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  gap: 20px;
`

const Card = styled.div`
  box-sizing: border-box;
  position: relative;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  gap: 10px;

  border: 1px solid #E2E2E5;
  border-radius: 20px;

  flex 1;

  h3 {
    padding: 0;
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
  }

  div {
    height: 100px;
    border-radius: 10px;
    flex: none;
    align-self: stretch;
    flex-grow: 0;

    &.first {
      background: -50px top / 300px no-repeat url("https://s3-alpha-sig.figma.com/img/b972/33a0/40d4c1f6736dddfd286eb37d29d509df?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bzrcJAFCxa7BnLffNfUXiaKfzCawdJZJ~fRh-8UwhGD7N6UckXqDEmILNUhIixZuTcI45B~09Sy42c-qX2PNbuAqw~aEqkQ4jBhPuvz0oBFDDvexWIelHxEFLcSgnCvZV1ajAjBrrgScqq0~536oNlVhqU8Sat0iEv1tmWYY3cW~KTFGZlKW5u~jwrJHNlbTZxeko6uPJmJUYs6RTvHcZLmSBJw76cbl5wQXxw43K86uuEV96IjsHQrhdftr6AL8AAEnvCn9hKJ6SFDjFS3fK7CbuWa555l7j6lRu-ttwKlavj~frCQMyZsROYDBM~L~XH3uzIQ6iH6z2OEEnh3sig__");
    }

    &.second {
      background: -30px top / 380px no-repeat url("https://s3-alpha-sig.figma.com/img/76c1/5e8d/6955a66d70d2b65b9c74bbb35327ae3b?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h8Ai1yAegsGrBlPG8tNtx6cVq6ggZmOOy2G-JKwPpsbgSpMZHGsdG6WOl~NmkacCodO7uAJKNK9Jdjk4~KNHbwzcj763H9Hd-jJd5Wd8kOa1rx3gtvMD1dU3AOBIRQNhbkKEXZ6oo0k3l9Bein61HmSm2N96O~wMbQQi5-vVYAxwIGfdgy6uXUGhcz0c9kqyllnsonblD8AKGNqePiBX~12DupdtajrJhmNOLc6bycjzIBkz9a8uMeaJ3o6bhrm0CBrJ7~0tzcT47HWSXZnjpu8EZCypIDn62wT1CzbFmV7H~4PtFRABob-HkLYqq~g5ANLyurTsUNZ1J8iUcYXetg__");
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
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  padding: 0px;
  gap: 20px;
  width: 100%;
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
  background: #384BFF;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 149%;
  text-align: center;
  color: #FFFFFF;
`

const showOrNotAgain = (e) => {
  e.preventDefault()
  e.stopPropagation()
  setDoNotShowAgain(!doNotShowAgain)
}

return (
  <Container>
    <Header>
      <h1>You{'\u2019'}re entering Mutable Web</h1>
      <CloseButton onClick={props.handleClose}>
        <CloseIcon/>
      </CloseButton>
    </Header>
    <WarningMessage>
      <AlertIcon/>
      <p>You must be Logged In to start using this</p>
    </WarningMessage>
    <Description>
      <p>Dapplets presents you with the Mutatable Web. It's a new web concept based on Mutations — these are community member-supported sets of applications that extend the functionality of familiar sites by making them web3-friendly.</p>
    </Description>
    <CardsContainer>
      <Cards>
        <Card>
          <h3>Mutation changer</h3>
          <div className='first' title='Mutation changer picture'/>
          <p>You can see the mutations (application sets) selector at the top of the page</p>
        </Card>
        <Card>
          <h3>Multifunctional control</h3>
          <div className='second' title='Multifunctional control picture'/>
          <p>Each post has an "ear" with controls (adding and removing) widgets from the current mutation's applications</p>
        </Card>
      </Cards>
    </CardsContainer>
    <a
      href='https://social.dapplets.org/mob.near/widget/ProfilePage?accountId=dappletsproject.near'
    >
      You can see how our applications work here
    </a>
    <Footer>
      <SuccessButton onClick={props.handleClose}>Got it</SuccessButton>
      {/* <Checkbox>
        <label>
          <input type="checkbox" name="doNotShowAgain" defaultChecked={doNotShowAgain} checked={doNotShowAgain} onClick={showOrNotAgain} />
          Don't show it again
        </label>
      </Checkbox> */}
    </Footer>
  </Container>
)