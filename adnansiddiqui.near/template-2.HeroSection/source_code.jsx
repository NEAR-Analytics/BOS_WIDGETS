const style = props.style || {
  flexDirection: "row",
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  marginTop: 0,
  marginLeft: 0,
  marginBottom: 0,
  marginRight: 0,
  accent: "#0d9488",
};
const props = props.props || {
  backgroundImageUrl:
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  headerText: "Welcome to our Bike Showroom",
  subHeaderText: "Explore our widerange of bikes for every type of rider",
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

  background-color: white;
  &:not(.light *) {
    background-color: #080a11;
  }
`;
const HeroSectionContainer = styled.div`
  max-width: 96rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  gap: 5rem;

  @media (min-width: ${bp.sm}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
`;
const HeroSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: 2rem;
`;
const HeroSectionTitle = styled.h1`
  font-size: 2.5rem;
  margin-top: 1.5rem;
  color: black;
  font-weight: 800; 

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 4.5rem; 
  }
`;
const HeroSectionSubtitle = styled.h6`
  font-size: 1.125rem;
  color: #4b5563;

  &:not(.light *) {
    color: #d1d5db;
  }
  @media (min-width: ${bp.lg}) {
    font-size: 1.25rem;
  }
`;

return (
  <HeroSectionWrapper
    id={id}
    style={style}
  >
    <HeroSectionContainer>
      <HeroSectionContent>
        <HeroSectionTitle>{props?.headerText}a</HeroSectionTitle>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <HeroSectionSubtitle>{props?.subHeaderText}</HeroSectionSubtitle>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button
              style={{
                backgroundColor: style?.accent,
                color: "white",
                borderRadius: "1rem",
                padding: "0.5rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: "500",
                border: "1px solid transparent",
              }}
            >
              {props?.primaryButtonText}
            </button>
            <button
              style={{
                color: style?.accent,
                borderColor: style?.accent,
                border: "1px solid",
                backgroundColor: "transparent",
                borderRadius: "1rem",
                padding: "0.5rem 1.5rem",
                fontSize: "0.875rem",
              }}
            >
              {props?.secondaryButtonText}
            </button>
          </div>
        </div>
      </HeroSectionContent>
      <img
        src={props?.backgroundImageUrl}
        alt="hero"
        style={{
          width: "100%",
          borderRadius: "9999px",
          aspectRatio: "16/9",
          objectFit: "cover",
          objectPosition: "center",
        }}
        loading="lazy"
      />
    </HeroSectionContainer>
  </HeroSectionWrapper>
);
