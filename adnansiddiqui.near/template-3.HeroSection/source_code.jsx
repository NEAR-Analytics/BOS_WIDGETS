const style = props.style || {
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  marginTop: 0,
  marginLeft: 0,
  marginBottom: 0,
  marginRight: 0,
  accent: "#b9ff81",
};
const props = props.props || {
  backgroundImageUrl: [
    "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2dyYW1taW5nfGVufDB8fDB8fHww",
  ],
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

const HeroWrapper = styled.div`
  padding: ${({ style }) =>
    `${style?.paddingTop}px ${style?.paddingRight}px ${style?.paddingBottom}px ${style?.paddingLeft}px`};
  margin: ${({ style }) =>
    `${style?.marginTop}px ${style?.marginRight}px ${style?.marginBottom}px ${style?.marginLeft}px`};

  background-color: white;
  overflow: hidden;

  &:not(.light *) {
    background-color: #080a11;
  }
`;
const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5rem 1rem;
  gap: 5rem;
  max-width: 96rem;
  margin-inline: auto;

  @media (min-width: ${bp.sm}) {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  @media (min-width: ${bp.lg}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  gap: 2rem;
  max-width: 36rem;

  @media (min-width: ${bp.lg}) {
    text-align: left;
    align-items: flex-start;
  }
`;
const HeroTitle = styled.h1`
  font-size: 2.5rem;
  line-height: 2.5rem;
  margin-top: 1.5rem;
  color: black;
  font-weight: bold;
  font-weight: 700;
  line-height: 1.25 !important;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 3.75rem;
    line-height: 1rem;
  }
`;
const HeroSubtitle = styled.h6`
  font-size: 1.125rem;
  line-height: 1.75rem;
  color: #4b5563;

  &:not(.light *) {
    color: #d1d5db;
  }

  @media (min-width: ${bp.lg}) {
    font-size: 1.25rem;
  }
`;
const HeroButton1 = styled.button`
  background-color: ${({ style }) => style?.accent || "#b9ff81"};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  line-height: 1.5rem;
  font-weight: 600;
  color: black;
  border-radius: 4px;
  border:none;

  font-size: 0.8rem;
  @media (min-width: ${bp.lg}) {
    font-size: 1rem;
  }
`;
const HeroButton2 = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  outline: none;
  border: none;
  font-weight: 600;
  line-height: 1.5rem;
  color: black;
  fill: black;

  &:not(.light *) {
    color: white;
    fill: white;
  }

  font-size: 0.8rem;
  @media (min-width: ${bp.lg}) {
    font-size: 1rem;
  }
`;
const HeroImageContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  aspect-ratio: 1/1;
  max-width: 28rem;
  margin-right: 2rem;
  display: none;

  @media (min-width: ${bp.lg}) {
    display: block;
  }
`;

const HeroImage1 = styled.img`
  position: absolute;
  top: 3.5rem;
  right: -2rem;
  border-left-width: 0.5rem;
  border-top-width: 0.5rem;
  border-color: white;
  &:not(.light *) {
    border-color: #080a11;
  }
  width: 100%;
  max-width: 18rem;
  aspect-ratio: 9/11;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  border-radius: 0.375rem;
`;

return (
  <HeroWrapper id={id} style={style}>
    <HeroContainer>
      <HeroContent>
        <HeroTitle>{props?.headerText}</HeroTitle>

        <HeroSubtitle>{props?.subHeaderText}</HeroSubtitle>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <HeroButton1>
            {props?.secondaryButtonText}
            <svg
              style={{
                width: "0.7rem",
                transform: "rotate(-0.25turn)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </HeroButton1>
          <HeroButton2>
            {props?.primaryButtonText}
            <svg
              style={{
                width: "0.7rem",
                transform: "rotate(-0.25turn)",
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
            </svg>
          </HeroButton2>
        </div>
      </HeroContent>
      <HeroImageContainer>
        {Array.isArray(props?.backgroundImageUrl) ? (
          <>
            <HeroImage1
              src={props?.backgroundImageUrl[0] || ""}
              alt="hero"
              loading="lazy"
            />
            <img
              src={props?.backgroundImageUrl[1] || ""}
              alt="hero"
              style={{
                width: "100%",
                maxWidth: "18rem",
                maxHeight: "16rem",
                border: "1px solid rgb(255 255 255 / 0.1)",
                aspectRatio: "1/1",
                objectFit: "cover",
                objectPosition: "center",

                borderRadius: "0.375rem",
              }}
              loading="lazy"
            />
            <img
              src={props?.backgroundImageUrl[2] || ""}
              alt="hero"
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "-6rem",
                border: "1px solid rgb(255 255 255 / 0.1)",
                width: "100%",
                maxWidth: "18rem",
                aspectRatio: "16/9",
                objectFit: "cover",
                objectPosition: "center",

                borderRadius: "0.375rem",
              }}
              loading="lazy"
            />
          </>
        ) : (
          <img
            src={props?.backgroundImageUrl || ""}
            alt="hero"
            style={{
              width: "100%",
              minWidth: "7rem",
              height: "100%",
              border: "1px solid rgb(255 255 255 / 0.1)",
              aspectRatio: "1/1",
              objectFit: "cover",
              objectPosition: "center",

              borderRadius: "0.375rem",
            }}
            loading="lazy"
          />
        )}
      </HeroImageContainer>
    </HeroContainer>
  </HeroWrapper>
);
