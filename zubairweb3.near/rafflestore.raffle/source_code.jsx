const backgroundImage =
  "https://res.cloudinary.com/zbsoft/image/upload/v1700160172/raffle/background.png";

const bannerImg =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588123/rafflestore/weekBanner_cwsvjc.png";

const sharDogIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588115/rafflestore/gift_ebqnkb.svg";

const Container = styled.div`

`;

const Banner = styled.div`
background-image: url(${backgroundImage});
padding-bottom: 2rem;
background-position: center;
background-size: cover;
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
margin-bottom: 2rem;
`;

const StyledImg = styled.img`
width: 50%;
height: auto;
display: block;
overflow-clip-margin: content-box;
overflow: clip;
`;

const RaffleContent = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
width: 50%;
margin: 0 auto;
@media screen and (max-width: 768px){
width: 90%;
}
`;

const TitleContainer = styled.div`
padding: 1rem 1.25rem;
border: 2px solid #e5e7eb;
border-radius: 10px;
width: 100%;
`;

const Title = styled.h4`
font-size: 24px;
`;

const Description = styled.div`
gap: 1rem;
align-items: flex-end;
display: flex;
`;

const Text = styled.div`
font-size: 21px;
`;

const InstructionWrapper = styled.div`
text-align: center;
margin: 4.3rem 0;
`;

const InstructionContent = styled.p`
font-size: 23px; 
margin: 1.2rem 0;
line-height: 1.5;
`;

const PrizeWrapper = styled.div`
    align-items: center;
    flex-direction: column;
    width: 100%;
    display: flex;
    margin: 0 auto;
`;

const PrizeTitle = styled.h3`
    font-weight: 700;
    font-size: 24px;
    color: #000;
`;

const PrizeContent = styled.div`
    padding: 2.5rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.75rem;
    flex-direction: column;
    width: 50%;
    display: flex;
    @media screen and (max-width: 768px){
    width: 90%;
`;

const PrizeIcon = styled.div`
    gap: 0.5rem;
    display: flex;
`;

const PrizeDetail = styled.ol`
    font-size: .875rem;
    line-height: 1.25rem;
    padding: 1.25rem;
    list-style: none;
`;

const PrizeBtn = styled.button`
    font-size: .875rem;
    line-height: 1.25rem;
    text-align: center;
    padding: 0.5rem 1rem;
    border-width: 1px;
    border-radius: 1rem;
    align-items: flex-end;
    flex-direction: column;
    display: flex;
    gap: 10px;
    cursor: pointer;
    border: none;
    background: none;

`;

const EnterBtnWrapper = styled.div`
    align-items: center;
    flex-direction: column;
    display: flex;
    margin-top: 1.5rem;
`;

const EnterBtn = styled.button`
    color: #fff;
    padding: 1rem 3rem;
    background-color :#003C8C;
    border-width: 1px;
    border-radius: 0.75rem;
    cursor: pointer;
        margin-bottom: 10px;
`;

const RaffleSummary = styled.div`
    padding-top: 1rem;
    border-top: 2px solid #e5e7eb;
    justify-content: space-between;
    width: 50%;
    display: flex;
    margin: 1.5rem 0 0.5rem;
        @media screen and (max-width: 768px){
    width: 90%;}
`;

const CloseDate = styled.div`
  width: 50%;
`;

const Entries = styled.div`
   width: 50%;
`;

return (
  <Container>
    <Widget src="zubairweb3.near/widget/rafflestore.header" />
    <Banner>
      <StyledImg src={bannerImg} alt="banner" />
    </Banner>
    <RaffleContent>
      <TitleContainer>
        <Title>SharDog Raffle</Title>
        <Description>
          <img src={sharDogIcon} alt="shardDog icon" />
          <Text>Available for 3 winners</Text>
        </Description>
      </TitleContainer>
      <InstructionWrapper>
        <InstructionContent>
          We would like to give you some free stuff, for your taking action
          onchain.
        </InstructionContent>
        <InstructionContent>
          If you have a ShardDog comic #32 and comic #27 you can enter the
          raffle to win!
        </InstructionContent>
      </InstructionWrapper>
      <PrizeWrapper>
        <PrizeTitle>You don’t have any?</PrizeTitle>
        <PrizeContent>
          <PrizeIcon>
            <PrizeBtn>
              <img src={sharDogIcon} />
              <span>Comic #32</span>
            </PrizeBtn>

            <PrizeBtn>
              <img src={sharDogIcon} />
              <span>Comic #27</span>
            </PrizeBtn>
          </PrizeIcon>
          <PrizeDetail>
            <span>
              <b>Prize to win:</b>
            </span>
            <li>1.10 $NEAR</li>
            <li>2.T-shirt</li>
            <li>3.Mystery Box</li>
          </PrizeDetail>
        </PrizeContent>
      </PrizeWrapper>
      <EnterBtnWrapper>
        <EnterBtn>Enter</EnterBtn>
        <span
          style={{
            fontWeight: "bold",
            fontSize: "0.75rem",
            lineHeight: "1rem",
          }}
        >
          By continuing, you accept Near Fortune’s <a href="#">terms</a> and{" "}
          <a href="#" class="underline">
            privacy
          </a>
          .
        </span>
      </EnterBtnWrapper>

      <RaffleSummary>
        <CloseDate>
          <h4 style={{ fontWeight: "700", margin: "0" }}>CLOSES</h4>
          <p style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
            Nov 1, 11:59 PM ET
          </p>
        </CloseDate>
        <Entries>
          <h4 style={{ fontWeight: "700", margin: "0" }}>ENTRIES</h4>
          <p style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>31 Entires</p>
        </Entries>
      </RaffleSummary>
    </RaffleContent>
    <Widget src="zubairweb3.near/widget/rafflestore.footer" />
  </Container>
);
