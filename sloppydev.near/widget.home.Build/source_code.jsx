const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};
const CardBG =
  "https://ipfs.near.social/ipfs/bafybeicd7gndxlgcy44sze5huw2hkww6brzpjjw4wqhececls2lmi4vp4q";
const bosImage =
  "https://ipfs.near.social/ipfs/bafkreidpkotlkxxh4kz2jnzxxjs4i4boqv3dunrdfwvf53rkg7dlqdki5y";
const WorkspaceDocsSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M10.6667 12L14.6667 8L10.6667 4M5.33334 4L1.33334 8L5.33334 12"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const GettingStartedSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_80_7834)">
        <path
          d="M14.2933 7.36669L8.16667 13.4934C7.4161 14.2439 6.39812 14.6656 5.33667 14.6656C4.27521 14.6656 3.25723 14.2439 2.50667 13.4934C1.7561 12.7428 1.33444 11.7248 1.33444 10.6634C1.33444 9.6019 1.7561 8.58392 2.50667 7.83336L8.22 2.12002C8.72038 1.61876 9.39938 1.33681 10.1076 1.33618C10.8159 1.33556 11.4954 1.61631 11.9967 2.11669C12.4979 2.61706 12.7799 3.29607 12.7805 4.00433C12.7811 4.71259 12.5004 5.3921 12 5.89336L6.27333 11.6067C6.02315 11.8569 5.68382 11.9974 5.33 11.9974C4.97618 11.9974 4.63685 11.8569 4.38667 11.6067C4.13648 11.3565 3.99593 11.0172 3.99593 10.6634C3.99593 10.3095 4.13648 9.97021 4.38667 9.72002L10.0467 4.06669"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_80_7834">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 72px;
  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 58px;
    font-weight: 500;
    line-height: 120%; /* 86.4px */
    letter-spacing: -2.88px;
    margin: 0;
    span {
      background: linear-gradient(87deg, #eca227 39.02%, #fc8119 108.97%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: Poppins;
      font-size: 58px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -2.88px;
      margin: 0;
    }
  }
  p {
    max-width: 421px;
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 18px;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    h2 {
      align-self: center;
      font-size: 48px;
      span {
        font-size: 48px;
      }
    }
  }
`;
const Container = styled.div`
  width: 100%;
  padding-bottom: 48px;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  align-items: center;
  gap: 1rem;
  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 58px;
    font-weight: 500;
    line-height: 120%; /* 86.4px */
    letter-spacing: -2.88px;
    margin: 0;
    span {
      background: linear-gradient(87deg, #eca227 39.02%, #fc8119 108.97%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: Poppins;
      font-size: 58px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -2.88px;
      margin: 0;
    }
  }
  p {
    max-width: 421px;
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 18px;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(
      2,
      minmax(0, 1fr)
    ); /* Stack in a single column */
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr; /* Stack in a single column */
    padding-top: 48px;
    align-items: center;
  }
`;
const BuildContainer = styled.div`
  grid-column: span 4 / span 4;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
  width: 100%;
  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 58px;
    font-weight: 500;
    line-height: 120%; /* 86.4px */
    letter-spacing: -2.88px;
    margin: 0;
    span {
      background: linear-gradient(87deg, #eca227 39.02%, #fc8119 108.97%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: Poppins;
      font-size: 58px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -2.88px;
      margin: 0;
    }
  }
  p {
    max-width: 421px;
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 18px;
    margin: 0;
  }
  @media screen and (max-width: 1024px) {
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
    grid-column: span 1 / span 1;
    h2 {
      font-size: 52px;
      span {
        font-size: 52px;
      }
    }
    p {
      font-size: 16px;
      max-width: none;
    }
  }
  @media screen and (max-width: 500px) {
    h2 {
      font-size: 32px;
      span {
        font-size: 32px;
      }
    }
  }
`;
const CardsBG = styled.img`
  position: absolute;
  opacity: 0.2;
  z-index: 0;
  width: 100%;
  transform: scale(1.5);
  top: -50%;
`;
const Cards = styled.div`
  position: relative;
  grid-column: span 8 / span 8;
  flex-shrink: 0;
  display: grid;
  padding: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.41) 0%,
      rgba(0, 0, 0, 0.41) 100%
    ),
    rgba(47, 108, 101, 0.44);
  gap: 34px;
  z-index: 2;
  border-radius: 61px;
  border: 5px solid #77776f;
  overflow: clip;
  @media screen and (max-width: 768px) {
    grid-column: span 1 / span 1;
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
`;
const BosContainer = styled.div`
  grid-column: span 2 / span 2;
  display: flex;
  justify-content: space-between;
  border-radius: 24px;
  border: 1px solid #849a73;
  background: rgba(30, 30, 30, 0.24);
  @media screen and (max-width: 500px) {
    overflow: hidden;
    display: inline-block;
    position: relative;
  }
`;
const Text = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;
  h4 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -1.28px;
    text-transform: lowercase;
    margin: 0;
  }
  p {
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    h4 {
      font-size: 24px;
    }
    p {
      font-size: 18px;
    }
  }
  @media screen and (max-width: 500px) {
    h4 {
    }
  }
`;
const BosVector = styled.img`
  max-width: 229.604px;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
  @media screen and (max-width: 500px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    opacity: 0.5;
  }
`;
const GettingStarted = styled.div`
  z-index: 2;
  padding: 32px;
  border-radius: 24px;
  border: 1px solid #f7dede;
  background: rgba(119, 139, 105, 0.35);
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  p {
    color: rgba(249, 246, 190, 1);
    font-family: Poppins;
    font-size: 20px;
    font-weight: 400;
    line-height: 120%; /* 24px */
    letter-spacing: -0.8px;
    margin: 0;
  }
  @media screen and (max-width: 500px) {
    padding: 20px;
    p {
      font-size: 16px;
    }
    Button {
      flex-shrink: 0;
    }
  }
`;
const LearnMore = styled.div`
  padding: 32px;
  z-index: 2;
  border-radius: 24px;
  border: 1px solid var(--4D4D4D, #4d4d4d);
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 16px;
  p {
    color: #f5f5f5;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin: 0;
  }
  @media screen and (max-width: 500px) {
    padding: 20px;
    p {
      font-size: 16px;
    }
  }
`;
const Build = () => {
  return (
    <MainContainer>
      <h2>
        Build in <span>one space</span>
      </h2>
      <Container>
        <BuildContainer>
          <p>
            We provide support systems for open-source contributors to help each
            other, learn together, and solve real problems.
            <br />
            <br />
            To support this, we invite you to create containers for shared
            goals,
            <br />
            <br />
            and to cultivate those with sahred tools, visions, resources, goals,
            missions, and initiatives
          </p>
        </BuildContainer>
        <Cards>
          <CardsBG src={CardBG} />
          <BosContainer>
            <Text>
              <h4>local commons</h4>
              <p>For local development of public goods.</p>
            </Text>
            {/* <BosVector src={bosImage} /> */}
          </BosContainer>
          {/* <DesktopContainer> */}
          <GettingStarted>
            <p>Getting Started</p>
            <Button
              style={{
                gap: "8px",
                borderRadius: "10px",
              }}
            >
              <GettingStartedSVG />
              Open Contracts
            </Button>
          </GettingStarted>
          <LearnMore>
            <p>Learn More</p>
            <Button
              style={{
                gap: "8px",
                borderRadius: "10px",
              }}
            >
              <WorkspaceDocsSVG />
              View Graphs
            </Button>
          </LearnMore>
          {/* </DesktopContainer> */}
          {/* <MobileContainer>
          <GettingStarted>
          <p>Getting Started</p>
          <Button
          style={{
            gap: "8px",
            borderRadius: "10px",
          }}
          >
          <GettingStartedSVG />
          Quickstart Guide
          </Button>
          </GettingStarted>
          <LearnMore>
          <p>Learn More</p>
          <Button
              style={{
                gap: "8px",
                borderRadius: "10px",
              }}
              >
              <WorkspaceDocsSVG />
              Workspace Docs
              </Button>
              </LearnMore>
            </MobileContainer> */}
        </Cards>
      </Container>
    </MainContainer>
  );
};
return { Build };
