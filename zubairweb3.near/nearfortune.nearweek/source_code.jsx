//modal starts
const [isModalOpen, setIsModalOpen] = useState(false);

const openModal = () => {
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
};

const Modal = ({ isOpen, onClose }) => {
  const overlayStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2,
  };

  const modalStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: "20%",
    borderRadius: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "350px",

    height: "auto",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 3,
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} className="modal">
        <div onClick={(e) => e.stopPropagation()} className="modal-content">
          <p
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
              paddingTop: "5px",
            }}
          >
            {isLoading && "Please wait..."}
          </p>
          <p
            style={{
              color: "red",
              textAlign: "center",
              paddingTop: "5px",
              display: errorMessage ? "block" : "none",
            }}
          >
            {errorMessage && errorMessage}
          </p>

          <div class="modal-header">
            <h5 class="modal-title">Submit your Detail</h5>
            <span
              style={{ fontSize: "2rem", cursor: "pointer" }}
              className="close"
              onClick={onClose}
            >
              &times;
            </span>
          </div>
          <div class="modal-body">
            <div class="form">
              <div class="mb-3">
                <label for="name" class="form-label">
                  Name
                </label>
                <input
                  value={fullname || ""}
                  onChange={(e) => setFullname(e.target.value)}
                  type="text"
                  class="form-control"
                  id="name"
                  aria-describedby="nameHelp"
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email
                </label>
                <input
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  class="form-control"
                  id="email"
                />
              </div>

              <button
                data={formData}
                type="submit"
                class="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  sendData(formData);
                }}
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
  );
};

const NotificationModal = ({ isOpen, onClose }) => {
  const overlayStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 2,
  };

  const modalStyle = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: "20%",
    borderRadius: "1rem",
    left: "50%",
    transform: "translateX(-50%)",
    width: "350px",
    height: "auto",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 3,
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={modalStyle}
        className="modal"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 class="modal-title" id="name">
            NFT Check
          </h5>
          <span
            style={{ fontSize: "2rem", cursor: "pointer" }}
            className="close"
            onClick={onClose}
          >
            &times;
          </span>
        </div>
        <div>
          Ops! You must have one of the following nfts to enter the raffle{" "}
          <br />
          NEWSLETTER EDITION #146 - 33
        </div>
      </div>
    </div>
  );
};

const ButtonWithModal = ({ openModal }) => {
  return (
    <div>
      <button
        style={{ padding: "12px", width: "120px", marginBottom: "10px" }}
        onClick={openModal}
      >
        Enter
      </button>
    </div>
  );
};

//modal ends

const Image1 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588123/rafflestore/weekBanner_cwsvjc.png";
const Image2 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588098/rafflestore/post1_e3ffre.png";

const Wrapper = styled.div`
    text-align: center;
    padding: 2rem;
    --tw-bg-opacity: 1;
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
background-color: white;
color: black;
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
background-color: white;
color: black;
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
    align-items: center;
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

const Post = (
  <Wrapper>
    <h2>Entered</h2>
    <ImageGroup>
      <StyledImage src={Image1} alt="raffle pics" />
      <StyledImage src={Image2} alt="raffle pics" />
    </ImageGroup>
    <p>
      Thanks for entering the raffle! Winners will be emailed on Feb. 15 11:59pm
    </p>
    <ShareBtn>
      <span>Share on twitter</span>
    </ShareBtn>
  </Wrapper>
);

const backgroundImage =
  "https://res.cloudinary.com/zbsoft/image/upload/v1700160172/raffle/background.png";

const bannerImg =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1706123137/rafflestore/IMG-20240107-WA0036_bxl0f4.jpg";

const sharDogIcon =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588115/rafflestore/gift_ebqnkb.svg";

const accountId = context.accountId;
const contractId = "mint.sharddog.near";

const returnedData = Social.get(`${accountId}/formData/*`);

if (!contractId) {
  return `Missing "contractId"`;
}

if (!accountId) {
  return `Please login`;
}

const [email, setEmail] = useState("");
const [fullname, setFullname] = useState("");
const [message, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [summary, setSummary] = useState(false);

console.log(email);

console.log(fullname);
const sendData = () => {
  if (!email.trim() || !fullname.trim()) {
    setErrorMessage("Please enter both email and name");
    return;
  }
  setIsLoading(true);
  asyncFetch("https://rafflestore.000webhostapp.com/api/register.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `email=${encodeURIComponent(email)}&fullname=${encodeURIComponent(
      fullname
    )}&category=nearweek`,
  })
    .then((response) => {
      console.log(response.body.status);

      if (response.ok) {
        if (response.body.status === "success") {
          setSuccessMessage(
            "Thanks for participating, we would get back to you soon"
          );
          setErrorMessage("");
          setEmail("");
          setFullname("");
          console.log("Data submitted successfully");
        } else if (
          response.body.status === "error" &&
          response.body.message === "Email already exists."
        ) {
          setErrorMessage("Email already exists, try different one");
          setSuccessMessage("");
          console.log("Email already exists...");
          console.log(response.body.message + "test");
          console.log(errorMessage);
        } else {
          setErrorMessage("Failed to submit data, try again");
          console.log("Failed to submit data, try again");
        }
      } else {
        console.log(`HTTP error! Status: ${response.status}`);
      }
    })
    .finally(() => {
      setIsLoading(false);
      setSummary(true);
    });
};

const nfts = Near.view(contractId, "nft_tokens_for_owner", {
  account_id: accountId,
  from_index: "0",
  limit: 200,
});

const nftTitle = "NEARWEEK NEWSLETTER EDITION #146 - 33";

console.log(nfts[0].metadata.title);
console.log(nfts);

State.init({ nftCheck: false });

for (let i = 0; i < nfts.length; i++) {
  if (nfts[i].metadata.title === nftTitle) {
    State.update({ nftCheck: true });
    break;
  }
}

if (!nfts) {
  return "";
}

if (summary && !errorMessage) {
  return Post;
}

// if (returnedData) {
//   return Post;
// }

return (
  <>
    {state.nftCheck ? (
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    ) : (
      <NotificationModal isOpen={isModalOpen} onClose={closeModal} />
    )}

    <Container>
      <Banner>
        <StyledImg src={bannerImg} alt="banner" />
      </Banner>
      <RaffleContent>
        <TitleContainer>
          <Title>Nearweek Raffle</Title>
          <Description>
            <img src={sharDogIcon} alt="shardDog icon" />
            <Text>Available for 200 winners</Text>
          </Description>
        </TitleContainer>
        <InstructionWrapper>
          <InstructionContent>
            We would like to give you some free stuff, for your taking action
            onchain.
          </InstructionContent>
          <InstructionContent>
            <b>If you have one of the following:</b> <br />
            <b style={{ color: "purple" }}>
              NEARWEEK NEWSLETTER EDITION #146 - 33
            </b>
            <br /> <b>you can enter the raffle to win!</b>
          </InstructionContent>
        </InstructionWrapper>
        <PrizeWrapper>
          <PrizeTitle>Do you want to participate?</PrizeTitle>
          <PrizeContent>
            <PrizeIcon>
              <PrizeBtn>
                <img src={sharDogIcon} />
                <span>NEARWEEK NEWSLETTER EDITION #146 - 33</span>
              </PrizeBtn>
            </PrizeIcon>
            <PrizeDetail>
              <span>
                <b>Prize to win:</b>
              </span>
              <li>$200 $NEAR</li>
            </PrizeDetail>
          </PrizeContent>
        </PrizeWrapper>
        <EnterBtnWrapper>
          <ButtonWithModal openModal={openModal} />
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
          </span>
        </EnterBtnWrapper>

        <RaffleSummary>
          <CloseDate>
            <h4 style={{ fontWeight: "700", margin: "0" }}>CLOSES</h4>
            <p style={{ fontSize: "0.75rem", lineHeight: "1rem" }}>
              Feb 15, 11:59 PM GMT+1
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
