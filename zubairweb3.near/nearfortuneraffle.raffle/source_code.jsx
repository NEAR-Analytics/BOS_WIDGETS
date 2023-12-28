const Image1 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588123/rafflestore/weekBanner_cwsvjc.png";
const Image2 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588098/rafflestore/post1_e3ffre.png";

const Wrapper = styled.div`
    color: #fff;
    text-align: center;
    padding: 2rem;
    --tw-bg-opacity: 1;
    background-color: black;
    border-radius: 0.75rem;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    width: 25%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    @media screen and (max-width: 768px){
        width: 90%;
}
}
`;
const ImageGroup = styled.div`
   display: flex;
   width: 100%;
}
`;

const StyledImage = styled.img`
   width: 50%;
}
`;

const ShareBtn = styled.button`
color: #fff;
    cursor: pointer;
    padding: 1rem 0.5rem;
    background-color: #003C8C; 
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    align-items: center;
    display: flex;
`;

const SharedIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588098/rafflestore/x_abhrox.svg";

const StyledIcon = styled.img`
    width: 1rem;
    max-width: 100%;
    height: auto;
`;

const Post = (
  <Wrapper>
    <h2>Entered</h2>
    <ImageGroup>
      <StyledImage src={Image1} alt="raffle pics" />
      <StyledImage src={Image2} alt="raffle pics" />
    </ImageGroup>
    <p>
      Thanks for entering the raffle! Winners will be emailed on Dec. 15 11:59pm
    </p>
    <ShareBtn>
      <span>Share on twitter</span>
    </ShareBtn>
  </Wrapper>
);

const backgroundImage =
  "https://res.cloudinary.com/zbsoft/image/upload/v1700160172/raffle/background.png";

const bannerImg =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588123/rafflestore/weekBanner_cwsvjc.png";

const sharDogIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588115/rafflestore/gift_ebqnkb.svg";

State.init({ fullname: "", email: "", formSubmitted: false });

const formData = {
  fullname: state.fullname,
  email: state.email,
};

const accountId = context.accountId;
const contractId = "mint.sharddog.near";

const returnedData = Social.get(`${accountId}/formData/*`);

console.log(returnedData + "Great");
console.log(formData);

if (!contractId) {
  return `Missing "contractId"`;
}

if (!accountId) {
  return `Please login`;
}

function sendData(formData) {
  console.log("send data function called");
  const apiUrl = "https://rafflestore.000webhostapp.com/api/register.php";
  asyncFetch(apiUrl, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => {
      console.log(res.data);
      console.log("API call success");
    })
    .catch((error) => {
      console.log(error);
    });
}

const nfts = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: accountId,
  from_index: "0",
  limit: 200,
});

const nftTitle = "Kano is bos jollof - 1";
const id = "mint.sharddog.near:2cdbb07ea61d7a4175791ca1170ee4c3";
State.init({ nftCheck: false });

for (let i = 0; i < nfts.length; i++) {
  if (nftTitle === nfts[i].metadata.title) {
    State.update({ nftCheck: true });
    break;
  }
}

if (!nfts) {
  return "";
}

console.log(state.nftCheck);
console.log(state.email);
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

// if (returnedData) {
//   return Post;
// }

return (
  <>
    {!state.nftCheck ? (
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
                    value={state.fullname || ""}
                    onChange={(e) => State.update({ fullname: e.target.value })}
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
                  <input
                    value={state.email || ""}
                    onChange={(e) => State.update({ email: e.target.value })}
                    type="email"
                    class="form-control"
                    id="email"
                  />
                </div>

                <button
                  data={formData}
                  type="submit"
                  class="btn btn-primary"
                  onClick={sendData(formData)}
                >
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
              Ops! You must have ShardDog - 1555 or Game Gallery NFT to enter
              the raffle
            </div>
          </div>
        </div>
      </div>
    )}

    <Container>
      <Widget src="nearfortuneraffle.near/widget/nearfortuneraffle.header" />
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
            If you have a <b>ShardDog - 1555</b> or <b>Game Gallery NFT</b> you
            can enter the raffle to win!
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
              Dec 13, 11:59 PM GMT+1
            </p>
          </CloseDate>
          <Entries>
            <h4 style={{ fontWeight: "700", margin: "0" }}>ENTRIES</h4>
            <p style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
              23 Entires
            </p>
          </Entries>
        </RaffleSummary>
      </RaffleContent>
      <Widget src="nearfortuneraffle.near/widget/nearfortuneraffle.footer" />
    </Container>
  </>
);
