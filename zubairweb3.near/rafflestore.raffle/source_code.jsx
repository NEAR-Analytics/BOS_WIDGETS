const backgroundImage =
  "https://res.cloudinary.com/zbsoft/image/upload/v1700160172/raffle/background.png";

const bannerImg =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588123/rafflestore/weekBanner_cwsvjc.png";

const sharDogIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588115/rafflestore/gift_ebqnkb.svg";

const accountId = context.accountId;
const contractId = "mint.sharddog.near";

if (!contractId) {
  return `Missing "contractId"`;
}

if (!accountId) {
  return `Missing "accountId"`;
}

const nfts = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: accountId,
  from_index: "0",
  limit: 200,
});

const newTitle = "ShardDog - 1555";

if (newTitle === nfts[0].metadata.title) {
  console.log("Passed nft check");
}

console.log(nfts[0].metadata.title);

if (!nfts) {
  return "";
}

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
    align-items: center;
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
  <>
    {newTitle === nfts[0].metadata.title ? (
      <div
        class="modal fade"
        id="raffleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                @
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="form">
                <div class="mb-3">
                  <label for="name" class="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="emainamel"
                    aria-describedby="nameHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">
                    Email
                  </label>
                  <input type="email" class="form-control" id="email" />
                </div>

                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
                <div id="terms" class="form-text">
                  By continuing, you accept Near Fortune’s terms of service and
                  privacy policy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div
        class="modal fade"
        id="raffleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Sharddog NFT Check
              </h5>
              <button
                style={{ marginLeft: "20px" }}
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              Ops! You must have ShardDog - 1555 to enter the raffle
            </div>
          </div>
        </div>
      </div>
    )}

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
            If you have a <b>ShardDog - 1555</b> you can enter the raffle to
            win!
          </InstructionContent>
        </InstructionWrapper>
        <PrizeWrapper>
          <PrizeTitle>You don’t have any?</PrizeTitle>
          <PrizeContent>
            <PrizeIcon>
              <PrizeBtn>
                <img src={sharDogIcon} />
                <span>ShardDog - 1555 </span>
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
          <EnterBtn
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#raffleModal"
          >
            Enter
          </EnterBtn>
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
            <p style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
              31 Entires
            </p>
          </Entries>
        </RaffleSummary>
      </RaffleContent>
      <Widget src="zubairweb3.near/widget/rafflestore.footer" />
    </Container>
  </>
);
