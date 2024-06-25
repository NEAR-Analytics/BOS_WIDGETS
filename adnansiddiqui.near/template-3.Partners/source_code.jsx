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
  imageSrc: [
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/spikeball-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/shapeshift-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/goody-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/codecademy-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/facepunch-color.svg",
  ],
};

const bp = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
};

const PartnersContainer = styled.div`
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
const PartnersWrapper = styled.div`
  max-width: 96rem;
  margin-inline: auto;
  padding: 5rem 1rem;
  padding-bottom: 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

const PartnersLogoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  place-items: center;
  padding-inline: 0;
  align-items: center;
  width: 100%;

  @media (min-width: ${bp.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
`;

const PartnersLogo = styled.img`
  filter: grayscale(100%);
  pointer-events: none;
  transform: translate3d(0);
  user-select: none;
  border-radius: 0px !important;

  &:not(.light *) {
    filter: brightness(0.35) grayscale(100%) invert(100%) saturate(0.15)
      sepia(0.01);
  }
`;

  const imageSrc = [
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/spikeball-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/shapeshift-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/goody-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/codecademy-color.svg",
    "https://cdn.jsdelivr.net/gh/adnansid99/theDeployer@master/Jutsu/companyLogos/facepunch-color.svg",
  ];

  return (
    <PartnersContainer id={id} style={style}>
      <PartnersWrapper>
        <PartnersLogoContainer>
          {(imageSrc || props?.imageSrc)?.map((logo, index) => (
            <PartnersLogo key={index} src={logo} alt="logos" />
          ))}
        </PartnersLogoContainer>
      </PartnersWrapper>
    </PartnersContainer>
  );

