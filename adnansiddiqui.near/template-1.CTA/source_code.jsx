const style = props.style || {
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
  headerText: "Find Your Perfect Ride",
  subHeaderTextarea:
    "Explore our wide range of bikes and find the one that suits your style and needs.",
  primaryButtonText: "Browse Bikes",
  secondaryButtonText: "Contact Us",
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const CTAWrapper = styled.div`
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

const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem;
  max-width: 48rem;
  border-radius: 1.5rem;

  margin-inline: auto;
`;

const CTAHeader = styled.h2`
  font-size: 1.875rem;
  color: black;
  font-weight: 600;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.md}) {
    font-size: 2.4rem;
  }
`;
const CTASubHeader = styled.p`
  font-size: 0.875rem;
  color: #4b5563;

  &:not(.light *) {
    color: #d1d5db;
  }

  @media (min-width: ${bp.md}) {
    font-size: 1rem;
  }
`;
const CTABtnContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (min-width: ${bp.md}) {
    width: 50%;
  }
`;

return (
  <CTAWrapper id={id} style={style}>
    <div
      style={{
        maxWidth: "96rem",
        marginInline: "auto",
        padding: "5rem 1rem",
      }}
    >
      <CTAContainer>
        <CTAHeader>{props?.headerText}</CTAHeader>
        <CTASubHeader>{props?.subHeaderTextarea}</CTASubHeader>
        <CTABtnContainer>
          <button
            style={{
              backgroundColor: style?.accent,
              borderColor: style?.accent,
              border: "1px solid transparent",
              color: "white",
              borderRadius: "9999px",
              paddingBlock: "0.5rem",
              paddingInline: "2rem",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            {props?.primaryButtonText}
          </button>
          <button
            style={{
              borderColor: style?.accent,
              border: "1px solid",
              color: style?.accent,
              borderRadius: "9999px",
              paddingBlock: "0.5rem",
              paddingInline: "2rem",
              fontSize: "0.875rem",
              fontWeight: "500",
                   backgroundColor: "transparent",
            }}
          >
            {props?.secondaryButtonText}
          </button>
        </CTABtnContainer>
      </CTAContainer>
    </div>
  </CTAWrapper>
);
