const style = props.style || {
  flexDirection: "column",
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
  headerText: "Trusted by the worlds best companies",
  imageSrc: [
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/107.webp",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/40626.webp",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/4332857.webp",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/5.webp",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/ODUJEH0.webp",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/bird_2.webp",
  ],
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const PartnersWrapper = styled.div`
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

const PartnersHeader = styled.h2`
  font-size: 1.875rem;
  max-width: 48rem;
  color: black;
  font-weight: bold;
  text-align: center;

  &:not(.light *) {
    color: white;
  }

  @media (min-width: ${bp.md}) {
    font-size: 2.25rem;
  }
`;

const PartnersLogoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  place-items: center;
  align-items: center;
  width: 100%;
  padding-inline: 1rem;

  @media (min-width: ${bp.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`;

return (
  <PartnersWrapper id={id} style={style}>
    <div
      style={{
        flexDirection: style?.flexDirection || "column",
        padding: "5rem 1rem",
        paddingBottom: "7rem",
        marginInline: "auto",
        maxWidth: "96rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5rem",
      }}
    >
      <PartnersHeader>{props?.headerText}</PartnersHeader>
      <PartnersLogoContainer>
        {props?.imageSrc?.map(
          (logo, index) =>
            index < 5 && (
              <img
                key={index}
                src={logo}
                alt="logos"
                style={{
                  width: '100%',
                  aspectRatio: "1 / 1",
                  borderRadius: "0.5rem",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            )
        )}
      </PartnersLogoContainer>
    </div>
  </PartnersWrapper>
);
