const style = props.style || {};
const props = props.props || {
  imageSrc: "https://images.unsplash.com/photo-1564057740580-02521995d221?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  headerText: "changing chemistry for good",
  subHeaderTextarea:
    "We are a team of passionate cyclists dedicated to providing high-quality bikes and accessories to our customers.",
  primaryButtonText: "Contact Us",
  secondaryButtonText: "View Collection",
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};
const HeroSectionWrapper = styled.div`
  padding: ${({ style }) =>
    `${style?.paddingTop}px ${style?.paddingRight}px ${style?.paddingBottom}px ${style?.paddingLeft}px`};
  margin: ${({ style }) =>
    `${style?.marginTop}px ${style?.marginRight}px ${style?.marginBottom}px ${style?.marginLeft}px`};
  background-image: ${({ props }) => `url(${props?.imageSrc})`};
  background-size: cover;
  background-position: center;
`;

const SectionContent = styled.div`
  position: relative;
  padding: 1rem;
  min-height: 100dvh;
  max-height: 100%;
  padding-block: 6rem;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  background-color: rgba(0, 0, 0, 0.25);

  @media (min-width: ${bp.md}) {
    padding-inline: 3rem;
  }
  @media (min-width: ${bp.lg}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  gap: 4rem;
  grid-column: span 1 / span 1;

  @media (min-width: ${bp.lg}) {
    text-align: left;
  }
  @media (min-width: ${bp.lg}) {
    align-items: flex-start;
  }
`;

const HeaderText = styled.h1`
  font-size: 3rem;
  line-height: 1;
  color: rgb(255 255 255);
  filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
    drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));

  @media (min-width: ${bp.sm}) {
    font-size: 4.5rem;
  }
  @media (min-width: ${bp.md}) {
    font-size: 8rem;
  }
`;

const SubHeaderText = styled.h6`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(229 231 235);
  filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
    drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  max-width: 36rem;

  @media (min-width: ${bp.md}) {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  @media (min-width: ${bp.lg}) {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
`;

const ScrollDownButton = styled.button`
  background-color: ${({ style }) => style?.accent || "#b9ff81"};
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 0.875rem;
  font-weight: 600;
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  position: absolute;
  bottom: 2.5rem;
  border: none;
`;

  return (
    <HeroSectionWrapper id={id} style={style} props={props}>
      <SectionContent>
        <ContentColumn>
          <HeaderText>{props?.headerText}</HeaderText>
          <SubHeaderText>{props?.subHeaderTextarea}</SubHeaderText>
          <ScrollDownButton style={style}>
            <svg
              style={{
                width: "0.7rem",
                fill: "black",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </ScrollDownButton>
        </ContentColumn>
      </SectionContent>
    </HeroSectionWrapper>
  );

