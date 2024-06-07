const style = props.style || {
  accent: "#b9ff81",
};
const props = props.props || {
  headerText: "Pattented technology",
  subHeaderText:
    "Our patented enzyme immobilisation technology enables best of both worlds  biomanufacturing. We create bespoke, stable biocatalysts that can be used in multi-step enzymatic reactions, applying lessons from nature to modern manufacturing.",
  primaryButtonText: "Get started",
};

const bp = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const PrimaryCTAWrapper = styled.div`
    padding: ${({ style }) =>
      `${style?.paddingTop}px ${style?.paddingRight}px ${style?.paddingBottom}px ${style?.paddingLeft}px`};
    margin: ${({ style }) =>
      `${style?.marginTop}px ${style?.marginRight}px ${style?.marginBottom}px ${style?.marginLeft}px`};

    background-image: url("https://ipfs.near.social/ipfs/bafkreicgf3ripaiuwas5basym4m5wkcvtvg2lhoawcbbji6e3smkkcuwkq");
    background-position: right 20% top 0px;
    background-repeat: no-repeat;
    height: 100dvh;
    max-height: 100%;
    padding-block: 6rem;
    background-color: #28282c;
  `;
const PrimaryCTAContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 1rem;
    gap: 3.5rem;

    @media (min-width: ${bp.md}) {
      padding-left: 3rem;
      padding-right: 3rem;
    }
  `;
const PrimaryCTAHeader = styled.h2`
    font-size: 3.75rem;
    line-height: 1;
    max-width: 48rem;
    color: white;
    word-break: break-word;

    @media (min-width: ${bp.md}) {
      font-size: 8rem;
    }
  `;
const PrimaryCTASubHeader = styled.h6`
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 28rem;

    @media (min-width: ${bp.md}) {
      font-size: 1rem;
      line-height: 1.5rem;
    }

    @media (min-width: ${bp.lg}) {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
  `;

return (
  <PrimaryCTAWrapper id={id} style={style} props={props}>
    <PrimaryCTAContent>
      <PrimaryCTAHeader>{props?.headerText}</PrimaryCTAHeader>
      <PrimaryCTASubHeader>{props?.subHeaderText}</PrimaryCTASubHeader>
      <button
        style={{
          backgroundColor: style?.accent || "#b9ff81",
          borderRadius: "9999px",
          color: "inherit",
          padding: "0.75rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          fontWeight: "600",
          width: "fit-content",
          height: "fit-content",
          border: "none",
        }}
      >
        {props?.primaryButtonText}
        <div
          style={{
            color: style?.accent,
            height: "1.5rem",
            width: "1.5rem",
            borderRadius: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgb(31 41 55)",
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
      </button>
    </PrimaryCTAContent>
  </PrimaryCTAWrapper>
);
