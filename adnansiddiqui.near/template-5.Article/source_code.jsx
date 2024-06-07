const style = props.style || {};
const props = props.props || {
  backgroundImageUrl:
    "https://source.unsplash.com/random/1920x1080/?lab%20article",
  headerText: "We need the chemistry industry but it needs to change",
  subHeaderText:
    "Even as the world transitions to renewable energy, we still need the chemistry industry to produce the materials that make modern life possible. But the industry must change to meet sustainability goals.",
  metadata: {
    title: "ARTICLES",
    date: "2024-02-05",
  },
};

const bp = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

const ArticleWrapper = styled.div`
    padding: ${({ style }) =>
      `${style?.paddingTop || 0}px ${style?.paddingRight || 0}px ${
        style?.paddingBottom || 0
      }px ${style?.paddingLeft || 0}px`};
    margin: ${({ style }) =>
      `${style?.marginTop || 0}px ${style?.marginRight || 0}px ${
        style?.marginBottom || 0
      }px ${style?.marginLeft || 0}px`};

    background-image: ${({ bgImg }) => `url(${bgImg})`};
    background-size: cover;
    background-position: center;
  `;

const ArticleContent = styled.div`
    padding: 1rem;
    height: 100dvh;
    display: grid;
    grid-template-columns: repeat(1, 1fr);

    @media (min-width: ${bp.md}) {
      padding-left: 3rem;
      padding-right: 3rem;
    }

    @media (min-width: ${bp.xl}) {
      grid-template-columns: repeat(2, 1fr);
    }
  `;

const ArticleColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block: 4rem;

    @media (min-width: ${bp.md}) {
      padding: 4rem;
    }

    @media (min-width: ${bp.lg}) {
      grid-column-start: 2;
      padding: 4rem;
    }

    @media (min-width: ${bp.xl}) {
      padding: 8rem;
    }
  `;
const ArticleHeaderText = styled.h4`
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;

    @media (min-width: ${bp.md}) {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  `;
const ArticleSubHeaderText = styled.p`
    line-height: 1.25rem;
    font-size: 0.875rem;

    @media (min-width: ${bp.md}) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  `;

const ArticleMetadataTitle = styled.h6`
    line-height: 1.25rem;
    font-size: 0.875rem;
    font-weight: 500;

    @media (min-width: ${bp.md}) {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  `;
const ArticleMetadataDate = styled.p`
    color: rgba(0, 0, 0, 0.7);
    font-size: 0.75rem;
    line-height: 1.2rem;

    @media (min-width: ${bp.md}) {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
  `;

return (
  <ArticleWrapper id={id} bgImg={props?.backgroundImageUrl}>
    <ArticleContent>
      <ArticleColumn>
        <div
          style={{
            backgroundColor: style?.accent || "#b9ff81",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem",
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: "0.375rem",
            boxShadow: "0 0.5rem 1rem 0 rgb(0 0 0 / 15%)",
          }}
        >
          <ArticleHeaderText>{props?.headerText}</ArticleHeaderText>
          <ArticleSubHeaderText>{props?.subHeaderText}</ArticleSubHeaderText>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <ArticleMetadataTitle>ARTICLES</ArticleMetadataTitle>
              <ArticleMetadataDate>2024-02-05</ArticleMetadataDate>
            </div>
            <div
              style={{
                color: style?.accent || "#b9ff81",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "2.5rem",
                width: "2.5rem",
                backgroundColor: "#333",
                borderRadius: "100%",
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
          </div>
        </div>
      </ArticleColumn>
    </ArticleContent>
  </ArticleWrapper>
);
