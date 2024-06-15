const style = props.style || {
  flexDirection: 'row',
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
  subHeaderText: "Ride in Style and Comfort",
  headerText: "Premium Bikes",
  description:
    "Explore our collection of premium bites that offer both style and cockpit for an exceptional writing experience.",
  imageSrc:
    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2022&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  display: flex;

  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  min-height: 20rem;
  height: 100%;
  overflow: hidden;
  border-radius: 1.5rem;
  aspect-ratio: auto;
  width: 100%;

  @media (min-width: ${bp.md}) {
    width: 100%;
  }

  @media (min-width: ${bp.xl}) {
    min-height: 24rem;
    aspect-ratio: 16 / 5;
  }

  flex-direction: ${({ style }) => style?.flexDirection || "row"};
  background-color: ${({ style }) => style?.accent + 12};

  @media (max-width: ${bp.lg}) {
    flex-direction: column-reverse !important;
  }
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2.5rem;
  gap: 1rem;

  @media (min-width: ${bp.md}) {
    gap: 2rem;
  }

  @media (min-width: ${bp.lg}) {
    width: 50%;
    padding: 2.5rem;
  }

  @media (min-width: ${bp.xl}) {
    padding: 3.5rem;
  }
`;

const FeatureSubHeader = styled.p`
  margin-bottom: -1rem; // -mb-4
  font-size: 0.875rem; // text-sm
  color: #4b5563; // text-gray-700

  &:not(.light *) {
    color: #d1d5db; // dark:text-gray-300
  }

  @media (min-width: ${bp.xl}) {
    font-size: 1rem; // xl:text-base
  }
`;
const FeatureHeader = styled.h2`
  font-size: 1.5rem; // text-2xl
  font-weight: bold;
  color: black;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.xl}) {
    font-size: 2.5rem; // xl:text-4xl
  }
`;
const FeatureDescription = styled.p`
  font-size: 0.875rem; // text-sm
  color: #4b5563; // text-gray-700

  &:not(.light *) {
    color: #d1d5db; // dark:text-gray-300
  }

  @media (min-width: ${bp.xl}) {
    font-size: 1rem; // xl:text-base
  }
`;

const FeatureImage = styled.img`
  width: 100%;
  aspect-ratio: 16 / 9; // aspect-video
  object-fit: cover;
  object-position: center;

  @media (min-width: ${bp.lg}) {
    aspect-ratio: 1 / 1; // lg:aspect-square
    width: 50%; // lg:w-1/2
  }
`;

return (
  <FeatureWrapper id={id} style={style}>
    <div
      style={{
        maxWidth: "96rem",
        marginInline: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1rem",
      }}
    >
      <FeatureContainer style={style}>
        <FeatureContent>
          <FeatureSubHeader>{props?.subHeaderText}</FeatureSubHeader>
          <FeatureHeader>{props?.headerText}</FeatureHeader>
          <FeatureDescription>{props?.description}</FeatureDescription>
        </FeatureContent>
        <FeatureImage src={props?.imageSrc} alt="features" loading="lazy" />
      </FeatureContainer>
    </div>
  </FeatureWrapper>
);
