const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const { Footer } = VM.require("commons.near/widget/home.Footer") || {
  Footer: () => <></>,
};
const CommonsImg =
  "https://ipfs.near.social/ipfs/bafybeiewggvxkknsmcwmdla5mja2lchbx26y5wlqsh3qz6aetjkzn7m5qy";
const TopArch =
  "https://ipfs.near.social/ipfs/bafkreiftibkjr3teps4va7wd7chhlohhxa7fp3n35l5twu3o3olizvvelu";
const ScrollMask =
  "https://ipfs.near.social/ipfs/bafkreidi2yppuhqqv6b3acddqrddvldadibclg3cvcgbsqroj5lwmtgpvi";
const MiddleArc =
  "https://ipfs.near.social/ipfs/bafkreifs53iepsuuglzcffvzhgvcrcp2hlq4ustyhowlw55sssdp754hte";
const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: black;
  color: white;
  min-height: 100vh;
  overflow: clip;
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
`;
const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding-top: 72px;
  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 72px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 86.4px */
    letter-spacing: -2.88px;
    span {
      font-family: Poppins;
      font-size: 72px;
      font-style: normal;
      font-weight: 500;
      line-height: 120%; /* 86.4px */
      letter-spacing: -2.88px;
      background: linear-gradient(
        87deg,
        rgba(241, 244, 105, 0.41) -41.01%,
        #ffaf51 12.32%,
        rgba(242, 103, 4, 0.9) 34.42%,
        rgba(123, 165, 33, 0.41) 51.18%,
        rgba(107, 194, 222, 0.88) 68.71%,
        rgba(141, 105, 244, 0.41) 106.81%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
const ScrollMaskImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100%;
  top: 180px;
  right: 0;
  z-index: 2;
`;
const TopArcImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100%;
  opacity: 0.5;
  top: -80px;
`;
const MiddleArcImg = styled.img`
  pointer-events: none;
  position: absolute;
  width: 100%;
  top: 280px;
`;
const PageImg = styled.img`
  width: 40%;
`;
return (
  <MainContainer>
    <TopArcImg src={TopArch} />
    <Heading>
      <PageImg src={CommonsImg} />
      <h2>
        Common <span>States</span>
      </h2>
      <div className="d-flex align-items-center justify-content-center  gap-4 hero-btns">
        <Button className="hero-button">Register</Button>
        <Button>Explore Resources</Button>
      </div>
    </Heading>
    <Footer />
  </MainContainer>
);
