const style = props.style || {};
const props = props.props || {
  headerText:
    "The global, $5 trillion chemical industry faces a reckoning. Chemical production is expected to quadruple by 2050 to meet ever-increasing demand. But the industry must cut greenhouse gas emissions by more than half to meet sustainability goals.",
  moreInfo: [
    {
      title: "Revolutionizing Chemistry",
      description:
        "At EnginZyme, we're transforming the chemical industry by harnessing the power of enzymes. Our technology enables cleaner, more efficient production processes, significantly reducing the sector's carbon footprint.",
    },
    {
      title: "Sustainable Solutions",
      description:
        "Our enzyme-based catalysts are designed to be both eco-friendly and economically viable. By mimicking nature's methods, we provide an alternative to harsh chemical processes that are sustainable and scalable.",
    },
    {
      title: "Precision Manufacturing",
      description:
        "Leveraging biotechnology, EnginZyme delivers unprecedented precision in chemical manufacturing. Our tailored enzyme solutions optimize reactions for maximum yield and purity, ensuring high-quality output with minimal waste.",
    },
  ],
  buttonText: "Get started",
};
const bp = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const AboutWrapper = styled.div`
    padding: ${({ style }) =>
      `${style?.paddingTop}px ${style?.paddingRight}px ${style?.paddingBottom}px ${style?.paddingLeft}px`};
    margin: ${({ style }) =>
      `${style?.marginTop}px ${style?.marginRight}px ${style?.marginBottom}px ${style?.marginLeft}px`};
    background-color: white;

    &:is(.dark *) {
      background-color: #1f2937;
    }
  `;

const AboutContent = styled.div`
    display: flex;
    flex-direction: column;
    padding: 6rem 1rem;
    gap: 1.5rem;
    width: 100%;

    @media (min-width: ${bp.md}) {
      padding-inline: 3rem;
    }
  `;

const AboutLeft = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: ${bp.lg}) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

const AboutHeader = styled.h2`
    font-size: 1.25rem;
    line-height: 1.375;
    color: black;
    grid-column: span 1;

    &:is(.dark *) {
      color: white;
    }

    @media (min-width: ${bp.md}) {
      font-size: 2.5rem;
      line-height: 2.5rem;
    }
  `;

const AboutRight = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: ${bp.lg}) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

const AboutRightContainer = styled.div`
    grid-column-start: 2;
  `;

const MoreInfoWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1.5rem;
    padding-block: 3.5rem;
    border-top: 1px solid;

    @media (min-width: ${bp.md}) {
      grid-template-columns: repeat(6, 1fr);
    }
  `;

const MoreInfoHeader = styled.h3`
    grid-column: span 2;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500; /* font-medium */
    color: black;

    &:is(.dark *) {
      color: white;
    }

    @media (min-width: ${bp.md}) {
      font-size: 1.5rem;
      line-height: 2rem;
      width: min-content;
    }
  `;

const MoreInfoDescription = styled.p`
    grid-column: span 4;
    font-size: 0.875rem;
    line-height: 1.25rem /* 20px */;
    color: rgba(0, 0, 0, 0.8);

    &:is(.dark *) {
      color: rgba(255, 255, 255, 0.8);
    }

    @media (min-width: ${bp.md}) {
      font-size: 1.125rem; /* text-lg */
      line-height: 1.75rem /* 28px */;
    }
  `;

const Button = styled.button`
    border: 2px solid;
    border-radius: 4rem;
    color: black;
    padding: 0.75rem 1.5rem;
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    font-weight: 600;

    &:is(.dark *) {
      color: white;
    }
  `;

return (
  <AboutWrapper id={id}>
    <AboutContent>
      <AboutLeft>
        <AboutHeader>{props?.headerText}</AboutHeader>
      </AboutLeft>
      <AboutRight>
        <AboutRightContainer>
          {props?.moreInfo?.map((item, index) => (
            <MoreInfoWrapper key={index}>
              <MoreInfoHeader>{item?.title}</MoreInfoHeader>
              <MoreInfoDescription>{item?.description}</MoreInfoDescription>
            </MoreInfoWrapper>
          ))}
          <Button>
            {props?.buttonText}
            <div
              style={{
                color: style?.accent || "#b9ff81",
                height: 24,
                width: 24,
                backgroundColor: "rgb(31 41 55)",
                borderRadius: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                style={{
                  width: "0.7rem",
                  transform: "rotate(-0.25turn)",
                  fill: style.accent || "#b9ff81",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
              </svg>
            </div>
          </Button>
        </AboutRightContainer>
      </AboutRight>
    </AboutContent>
  </AboutWrapper>
);
