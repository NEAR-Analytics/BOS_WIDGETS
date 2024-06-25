const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const {
  BuildDAO: BuildDAOSVG,
  BuildDAOBottom: BuildDAOSVGBottom,
  Hammer: HammerSVG,
} = VM.require("commons.near/widget/icons") || {
  BuildDAOSVG: () => <></>,
  BuildDAOSVGBottom: () => <></>,
  HammerSVG: () => <></>,
};
const Scroll =
  "https://ipfs.near.social/ipfs/bafybeifligbo4ocbjld747tqyssohwe5vhihmdolmct33ddqayod5yywr4";
const CommonFacade =
  "https://ipfs.near.social/ipfs/bafkreigrelt2ifuizaxozelrxlhd7hpq4qn6prwk5qn22bicdy6vp2k7da";
const CTABG =
  "https://ipfs.near.social/ipfs/bafkreigoa47u7cn7mibiq2vfb7jrrjkvl3ho736x6r4rpo6ajcqmnsc64q";
const noise =
  "https://onedrive.live.com/embed?resid=DB95EB47BE356546%215827&authkey=%21AMNyTJWjGaSnGqQ&width=5760&height=3072";
const YellowGlow =
  "https://ipfs.near.social/ipfs/bafkreiblid6kdrasnlatfldvzooa67vvgfhx6h6tebs4zstyjgvwwe3d6y";
const MainContainer = styled.div`
  z-index: 1;
  position: relative;
  border-radius: 24px;
  border: 4px solid rgba(250, 193, 52, 0.4);
  background: #9a5c22;
  margin: 72px 48px;
  z-index: 2;
  overflow: clip;
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 500px) {
    padding: 2rem 48px;
  }
`;
const Container = styled.div`
  z-index: 1;
  position: relative;
  border-radius: 24px;
  background: #9a5c22;
  overflow: clip;
`;
const Content = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  position: relative;
  z-index: 1;
  overflow: clip;
  padding: 24px 48px;
  p {
    opacity: 0.4;
  }
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
    gap: 5px;
  }
`;
const Ellipse_1 = styled.div`
  position: absolute;
  width: 1066.803px;
  height: 698.404px;
  flex-shrink: 0;
  border-radius: 1066.803px;
  background: #1b1717;
  filter: blur(216.57391357421875px);
  /* top: 65px;
  right: 282px; */
`;
const CommonFasadeImg = styled.img`
  position: absolute;
  width: 80%;
  top: 0;
`;
const ScrollImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30%;
  z-index: 0;
`;
const Ellipse_2 = styled.div`
  position: absolute;
  width: 823.756px;
  height: 538.496px;
  flex-shrink: 0;
  border-radius: 823.756px;
  background: #7539ca;
  filter: blur(232.74249267578125px);
  top: -157px;
  /* right: 408px; */
  opacity: 0.4;
`;
const SVGBuildDAO = styled.div`
  position: absolute;
  transform: scale(0.8);
  right: -20px;
  top: -20px;
`;
const BuildDAOBottom = styled.div`
  position: absolute;
  width: 452px;
  height: 248px;
  flex-shrink: 0;
  transform: scale(0.8);
  right: 70px;
  top: 180px;
`;
const Hammer = styled.div`
  position: absolute;
  top: 34px;
  right: 16px;
  transform: scale(0.8);
  flex-shrink: 0;
  @media screen and (max-width: 500px) {
    transform: scale(0.5);
    opacity: 0.5;
    top: -31px;
    right: -80px;
  }
`;
const BGImage = styled.img`
  position: absolute;
  width: 600px;
  height: 368px;
  flex-shrink: 0;
  top: 0px;
  right: 0px;
  @media screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
    transform: scaleX(1.5);
    opacity: 0.5;
  }
`;
const Heading = styled.div`
  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 72px;
    font-style: normal;
    font-weight: 500;
    line-height: 110%; /* 79.2px */
    letter-spacing: -2.88px;
    margin: 0;
    span {
      color: var(--ECA227, #eca227);
      font-family: Poppins;
      font-size: 72px;
      font-style: normal;
      font-weight: 500;
      line-height: 110%;
      letter-spacing: -2.88px;
    }
  }
  @media screen and (max-width: 768px) {
    /* max-width: 327px; */
    h2 {
      font-size: 48px;
      span {
        font-size: 48px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    /* max-width: 327px; */
    h2 {
      font-size: 24px;
      letter-spacing: -1px;
      span {
        font-size: 24px;
        letter-spacing: -1px;
      }
    }
  }
`;
const CTADiv = styled.div`
  position: relative;
  padding-bottom: 24px;
  @media screen and (max-width: 768px) {
    /* max-width: 327px; */
  }
  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column !important;
    padding-bottom: 0px;
  }
`;
const CtaText = styled.div`
  @media screen and (max-width: 768px) {
    flex-direction: column;
    p {
      text-align: center;
      max-width: none;
    }
  }
  p {
    max-width: 452px;
    color: var(--E8E8E8, #e8e8e8);
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    /* text-align: right; */
    padding-top: 1rem;
    margin: 0;
  }
  .button-container {
    button {
      border: 1px solid #eca227;
      &:disabled {
        opacity: 1;
      }
      &:hover:not(:disabled) {
        border: 1px solid #fff;
      }
    }
  }
  img {
    width: 150px;
    opacity: 0;
    transition: all 500ms ease;
  }
  .button-container:hover {
    img {
      width: 500px;
      opacity: 0.3;
    }
  }
  @media screen and (max-width: 768px) {
    /* width: 190px; */
    bottom: 31px;
    right: 5px;
    p {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 500px) {
    display: none;
    width: 190px;
    padding: 18px 0px;
    p {
      font-size: 12px;
    }
  }
`;
const NoiseBG = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.15;
  background: url(${noise}) lightgray 0% 0% / 12.67087310552597px
    12.67087310552597px repeat;
  mix-blend-mode: color-burn;
`;
const MobileText = styled.div`
  padding: 18px 0px;
  p {
    font-size: 12px;
  }
  @media screen and (min-width: 500px) {
    display: none;
  }
`;
const [email, setEmail] = useState("");
const [isValid, setIsValid] = useState(false);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const handleChange = (e) => {
  const newEmail = e.target.value;
  setEmail(newEmail);
  setIsValid(emailRegex.test(newEmail));
};
const handleSubmit = () => {
  Storage.set("emailSubmitted", email);
};
const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  Button {
    width: max-content;
    flex-shrink: 0;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;
return (
  <MainContainer>
    <NoiseBG src={noise} />
    <Container>
      <Ellipse_1 />
      <Ellipse_2 />
      <CommonFasadeImg src={CommonFacade} />
      <ScrollImg src={Scroll} />
      <Content>
        <Heading>
          <h2>
            Common Agreement <span>Access</span>
          </h2>
        </Heading>
        <CTADiv className="d-flex">
          <CtaText className="d-flex align-items-center gap-2 flex-grow-1">
            <div className="d-flex flex-column ">
              <p>
                Everyone is welcome to BuildCommons, whether contributing to the
                global commons, or receiving support to contribute locally, it
                all begins simply by signalling your interest:
              </p>
            </div>
            <InputContainer className="form-group ">
              <input
                className="form-control z-1"
                data-bs-theme="dark"
                placeholder="email@email.com"
                type="email"
                value={email}
                onChange={handleChange}
              />
              <div className="button-container position-relative">
                <Button
                  className="flex-shrink-0 position-relative z-3"
                  variant="primary"
                  disabled={!isValid}
                  style={{ width: "max-content" }}
                  onClick={handleSubmit}
                  onTouch={handleSubmit}
                >
                  Confirm
                </Button>
              </div>
              <Button
                style={{ flexShrink: "0" }}
                onClick={() => Storage.set("emailSubmitted", "")}
              >
                Clear Email
              </Button>
            </InputContainer>
          </CtaText>
        </CTADiv>
        <p>
          If your address matches with any of our list of relative ecosystem
          members, you are granted an honorary commons membership
        </p>
        <MobileText>
          <p>We hope you join us to build better futures for everyone!</p>
        </MobileText>
      </Content>
    </Container>
  </MainContainer>
);
