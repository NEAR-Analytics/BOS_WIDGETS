const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const BuilderHat = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M2 18C2 18.2652 2.10536 18.5196 2.29289 18.7071C2.48043 18.8946 2.73478 19 3 19H21C21.2652 19 21.5196 18.8946 21.7071 18.7071C21.8946 18.5196 22 18.2652 22 18V16C22 15.7348 21.8946 15.4804 21.7071 15.2929C21.5196 15.1054 21.2652 15 21 15H3C2.73478 15 2.48043 15.1054 2.29289 15.2929C2.10536 15.4804 2 15.7348 2 16V18Z"
      stroke="#ECA227"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 10V5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4H13C13.2652 4 13.5196 4.10536 13.7071 4.29289C13.8946 4.48043 14 4.73478 14 5V10"
      stroke="#ECA227"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 15V12C4 10.4087 4.63214 8.88258 5.75736 7.75736C6.88258 6.63214 8.4087 6 10 6"
      stroke="#ECA227"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 6C15.5913 6 17.1174 6.63214 18.2426 7.75736C19.3679 8.88258 20 10.4087 20 12V15"
      stroke="#ECA227"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const HeadingSection = styled.div`
  padding: 80px 120px 0px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  .hero-button {
    position: relative;
    color: black;
    overflow: hidden;
    background: linear-gradient(
      87deg,
      #eca227 1.24%,
      #fc8119 55.76%,
      #9747ff 108.89%
    );
    &:hover {
      background: linear-gradient(
        -87deg,
        #eca227 1.24%,
        #fc8119 55.76%,
        #9747ff 108.89%
      );
    }
  }
  @media screen and (max-width: 768px) {
    padding: 72px 64px;
  }
  @media screen and (max-width: 500px) {
    padding: 72px 48px;
    .hero-btns {
      flex-direction: column;
    }
  }
`;
const Heading = styled.h1`
  display: flex;
  /* flex-direction: column; */
  color: white;
  font-family: Poppins, sans-serif;
  text-align: right;
  font-size: 72px;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -2.88px;
  margin: 0;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0 !important;
  span {
    background: linear-gradient(
      87deg,
      #eca227 -41.01%,
      rgba(242, 103, 4, 0.9) 49.3%,
      rgba(74, 33, 165, 0.41) 87.03%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }
  @media screen and (max-width: 920px) {
    font-size: 4rem;
  }
  @media screen and (max-width: 870px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 676px) {
    font-size: 2rem;
  }
`;
const Subheading = styled.h2`
  z-index: 2;
  color: #a0a0a0;
  font-family: Poppins;
  font-size: 33px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 46.2px */
  margin: 0;
  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;
const Hero = () => {
  return (
    <HeroContainer>
      <HeadingSection>
        <div className="row gap-3 flex-wrap">
          <Heading className="col-6">
            Let's Build <span>Commons</span>
          </Heading>
          {/* <Widget src="commons.near/widget/home.hero.vertical" /> */}
        </div>
        <div className="d-flex align-items-center gap-4 hero-btns">
          <Button
            className="hero-button"
            style={{
              opacity: "0.7",
            }}
          >
            Join Project
          </Button>
          <Button>Explore Contracts</Button>
        </div>
        <Subheading>
          Designed to support spaces between with value and meaning Access
          points to shared missions, and how to help craft them. Executive
          Grounding Systems. Traditional Resource Contracts. Dynamic Resource
          Foundations. Cooperative Goals Funding.
        </Subheading>
      </HeadingSection>
    </HeroContainer>
  );
};
return { Hero };
