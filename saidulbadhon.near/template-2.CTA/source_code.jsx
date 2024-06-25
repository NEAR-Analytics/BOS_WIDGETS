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
  subHeaderText:
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
  background-color: ${({ accent }) => accent + 12};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem; // gap-6
  max-width: 83.3333%; // max-w-10/12
  border-radius: 1.5rem; // rounded-3xl
  border: 1px solid transparent;
  padding: 2.5rem; // p-10
  margin-inline: auto;

  &:not(.light *) {
    border-color: #1e293b; // dark:border-slate-800
  }

  @media (min-width: ${bp.md}) {
    padding: 5rem; // md:p-20
  }
`;

const CTAHeader = styled.h2`
  font-size: 1.875rem; // text-3xl
  color: black;
  font-weight: 600; // font-semibold

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.md}) {
    font-size: 3rem; // md:text-5xl
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
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;

  @media (min-width: ${bp.sm}) {
    width: 83.3333%;
  }

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
      <CTAContainer accent={style?.accent}>
        <CTAHeader>{props?.headerText}</CTAHeader>
        <CTASubHeader>{props?.subHeaderText}</CTASubHeader>
        <CTABtnContainer>
          <button
            style={{
              backgroundColor: style?.accent,
              borderColor: style?.accent,
              border: "1px solid transparent",
              color: "white",
              borderRadius: "0.75rem",
              paddingBlock: "0.75rem",
              paddingInline: "2.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              width: "100%",
            }}
          >
            {props?.primaryButtonText}
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              borderColor: style?.accent,
              border: "1px solid",
              color: style?.accent,
              borderRadius: "0.75rem",
              paddingBlock: "0.75rem",
              paddingInline: "2.5rem",
              fontSize: "0.875rem",
              fontWeight: "500",
              width: "100%",
            }}
          >
            {props?.secondaryButtonText}
          </button>
        </CTABtnContainer>
      </CTAContainer>
    </div>
  </CTAWrapper>
);
