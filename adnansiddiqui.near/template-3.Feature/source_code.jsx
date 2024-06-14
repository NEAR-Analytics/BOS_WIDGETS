const style = props.style || {
  paddingTop: 0,
  paddingLeft: 0,
  paddingBottom: 0,
  paddingRight: 0,
  marginTop: 0,
  marginLeft: 0,
  marginBottom: 0,
  marginRight: 0,
  accent: "#94cc67",
};
const props = props.props || {
  isReverse: false,
  subHeaderText: "Ride in Style and Comfort",
  headerText: "Premium Bikes",
  description:
    "Explore our collection of premium bites that offer both style and cockpit for an exceptional writing experience.",
  imageSrc:
    "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const FeatureWrapper = styled.div`
  padding: ${({ style }) =>
    `${style?.paddingTop || 0}px ${style?.paddingRight || 0}px ${
      style?.paddingBottom || 0
    }px ${style?.paddingLeft || 0}px`};
  margin: ${({ style }) =>
    `${style?.marginTop || 0}px ${style?.marginRight || 0}px ${
      style?.marginBottom || 0
    }px ${style?.marginLeft || 0}px`};

  background-color: white;
  &:not(.light *) {
    background-color: #080a11;
  }
`;
const FeatureContainer = styled.div`
  max-width: 96rem;
  margin-inline: auto;
  gap: 2.5rem;
  padding: 5rem 1rem;
  display: flex;
  align-items: center;

  flex-direction: ${({ style }) => style?.flexDirection || "row"};

  @media (max-width: ${bp.lg}) {
    flex-direction: column !important;
  }
`;

const FeatureBorderWhite1 = styled.img`
  &:not(.light *) {
    display: block;
  }
  display: none;
  position: absolute;
  top: 0;
  ${({ style }) =>
    style?.flexDirection === "row-reverse" ||
    style?.flexDirection === "column-reverse"
      ? `
    transform: scaleX(-1);
    right: 0;
    `
      : "left: 0"};
`;
const FeatureBorderBlack1 = styled.img`
  &:not(.light *) {
    display: none;
  }
  display: block;
  position: absolute;
  top: 0;
  ${({ style }) =>
    style?.flexDirection === "row-reverse" ||
    style?.flexDirection === "column-reverse"
      ? `
        transform: scaleX(-1);
        right: 0;
        `
      : "left: 0"};
`;
const FeatureBorderWhite2 = styled.img`
  display: none;
  position: absolute;
  top: 0.75rem;

  &:not(.light *) {
    display: block;
  }

  ${({ style }) =>
    style?.flexDirection === "row-reverse" ||
    style?.flexDirection === "column-reverse"
      ? `
    transform: scaleX(-1);
    right: 0.75rem;
    `
      : "left: 0.75rem"};
`;
const FeatureBorderBlack2 = styled.img`
  position: absolute;
  top: 0.75rem;
  display: block;

  &:not(.light *) {
    display: none;
  }

  ${({ style }) =>
    style?.flexDirection === "row-reverse" ||
    style?.flexDirection === "column-reverse"
      ? `
    transform: scaleX(-1);
    right: 0.75rem;
    `
      : "left: 0.75rem"};
`;

const FeatureContent = styled.div`
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${bp.lg}) {
    width: 50%;
    padding: 3.5rem;
  }
`;
const FeatureSubHeader = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(55 65 81);
  font-weight: 500;

  &:not(.light *) {
    color: rgb(209 213 219);
  }

  @media (min-width: ${bp.lg}) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;
const FeatureHeader = styled.h2`
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  color: black;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.md}) {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
`;
const FeatureDescription = styled.p`
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgb(75 85 99);

  &:not(.light *) {
    color: rgb(229 231 235);
  }

  @media (min-width: ${bp.lg}) {
    font-size: 1rem;
    line-height: 1.5rem;
  }
`;

return (
  <FeatureWrapper id={id} style={style}>
    <FeatureContainer style={style} props={props}>
      <div
        style={{
          flex: "1 1 0%",
          position: "relative",
          display: "flex",
          justifyContent:
            style?.flexDirection === "row-reverse" ||
            style?.flexDirection === "column-reverse"
              ? "flex-end"
              : "flex-start",
        }}
      >
        <FeatureBorderBlack1
          style={style}
          src="https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/template-3/feature-border-black.svg"
          alt=""
        />
        <FeatureBorderWhite1
          style={style}
          src="https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/template-3/feature-border-white.svg"
          alt=""
        />
        <FeatureBorderBlack2
          style={style}
          src="https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/template-3/feature-border2-black.svg"
          alt=""
        />
        <FeatureBorderWhite2
          style={style}
          src="https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/template-3/feature-border2-white.svg"
          alt=""
        />
        <div
          style={{
            zIndex: 9999,
            marginTop: "1.5rem",
            marginRight:
              style?.flexDirection === "row-reverse" ||
              style?.flexDirection === "column-reverse"
                ? "1.5rem"
                : "unset",
            marginLeft:
              style?.flexDirection === "row-reverse" ||
              style?.flexDirection === "column-reverse"
                ? "unset"
                : "1.5rem",
          }}
        >
          <img
            src={props?.imageSrc}
            alt="features"
            style={{
              borderRadius: "0.5rem",
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
              height: "100%",
              maxWidth: "36rem",
              maxHeight: "36rem",
              aspectRatio: "1/1",
            }}
            loading="lazy"
          />
        </div>
      </div>
      <FeatureContent>
        <FeatureSubHeader>{`// ${props?.subHeaderText}`}</FeatureSubHeader>
        <FeatureHeader>{props?.headerText}</FeatureHeader>
        <FeatureDescription>{props?.description}</FeatureDescription>
      </FeatureContent>
    </FeatureContainer>
  </FeatureWrapper>
);
