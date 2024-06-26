const Wrapper = styled.div`
  --section-gap: 2rem;
  --text-hero: 500 56px/1 "FK Grotesk", "Mona Sans", sans-serif;
  gap: var(--section-gap);
  display: flex;
  flex-direction: column;
  max-width: 960px;
`;

const H1 = styled.h1`
  font: var(--text-hero);
  color: var(--black);
  margin: 0;
  padding-top: 24px;

  @media (max-width: 900px) {
    padding-top: 0;
    font-size: 36px;
  }
`;

const Text = styled.p`
  font: var(--${(p) => p.$size ?? "text-base"});
  font-weight: ${(p) => p.$fontWeight} !important;
  color: var(--${(p) => p.$color ?? "sand12"});
  margin: 0;
  letter-spacing: ${(p) => p.$letterSpacing};

  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${(p) => p.$overflowLines ?? "2"};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-word;

  @media (max-width: 900px) {
    font: var(--${(p) => p.$mobileSize ?? p.$size ?? "text-base"});
  }

  ${(p) =>
    p.$loading &&
    `
      border-radius: 2px;
      background: linear-gradient(to right, var(--sand10) 33%, var(--sand9) 66%, var(--sand10) 99%);
      animation: waveAnimation 5s linear infinite;
      min-width: 25%;
      min-height: 10px;
    `}

  @keyframes waveAnimation {
    0% {
      background-position: 0px 0;
    }
    100% {
      background-position: 100em 0;
    }
  }
`;

const Flex = styled.div`
  display: flex;
  gap: ${(p) => p.$gap};
  align-items: ${(p) => p.$alignItems};
  justify-content: ${(p) => p.$justifyContent};
  flex-direction: ${(p) => p.$direction ?? "row"};
  flex-wrap: ${(p) => p.$wrap ?? "nowrap"};

  ${(p) =>
    p.$mobileStack &&
    `
    @media (max-width: 900px) {
      flex-direction: column;
    }
  `}

  @media (max-width: 900px) {
    gap: ${(p) => p.$mobileGap ?? p.$gap};
    align-items: ${(p) => p.$mobileAlignItems ?? p.$alignItems};
  }
`;

const Grid = styled.div`
  display: grid;
  gap: ${(p) => p.$gap};
  grid-template-columns: ${(p) => p.$columns};
  align-items: ${(p) => p.$alignItems};
  row-gap: ${(p) => p.$rowGap};

  @media (max-width: 900px) {
    grid-template-columns: ${(p) => p.$mobileColumns ?? "1fr"};
    gap: ${(p) => p.$mobileGap ?? p.$gap};
    row-gap: ${(p) => p.$mobileRowGap ?? p.$rowGap};
  }
`;

const Section = styled.div`
  position: relative;
`;

const Container = styled.div`
  display: flex;
  max-width: 1224px;
  margin: 0 auto;
  gap: ${(p) => p.$gap ?? "var(--section-gap)"};
  flex-direction: column;
  align-items: ${(p) => (p.$center ? "center" : undefined)};
  justify-content: ${(p) => (p.$center ? "center" : undefined)};
  text-align: ${(p) => (p.$center ? "center" : undefined)};
`;

const Pattern = styled.div`
  display: flex;
  width: 100%;
  background: ${(p) => p.$background};
  border-radius: ${(p) => p.$borderRadius ?? "24px"};
  box-shadow: ${(p) => p.$shadow};
  border: ${(p) => p.$border};
`;

const PatternContent = styled.div`
  padding: ${(p) => p.$padding};
  width: 100%;

  @media (max-width: 900px) {
    padding: ${(p) => p.$mobilePadding ?? p.$padding};
  }
`;

const ButtonLinkWrapper = styled("Link")`
  all: unset;

  display: flex;
  gap: ${(p) => p.$gap};
  align-items: ${(p) => p.$alignItems};
  padding: ${(p) => p.$padding};
  border: 1px solid transparent;
  border-radius: 6px;
  transition: all 200ms;
  pointer-events: ${(p) => p.$pointerEvents};

  @media (max-width: 900px) {
    padding: 0;
  }

  .trending-round-icon {
    filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.06)) drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.06));
  }

  &:hover {
    cursor: pointer;
    text-decoration: ${(p) => (!p.$noHover ? "none" : "underline")};

    @media (min-width: 901px) {
      background: ${(p) => !p.$noHover && "var(--violet3)"};
      border-color: ${(p) => !p.$noHover && "var(--violet6)"};
    }

    & p {
      color: ${(p) => !p.$noHover && "var(--violet12)"};
    }

    .trending-round-icon {
      filter: drop-shadow(0px 4px 8px var(--violet6)) drop-shadow(0px 0px 0px var(--violet6));
    }
  }

  &:focus-within {
    background: ${(p) => !p.$noHover && "var(--violet3)"};
    border-color: ${(p) => !p.$noHover && "var(--violet6)"};
    box-shadow: ${(p) => !p.$noHover && "0 0 0 4px var(--violet4)"};
    text-decoration: ${(p) => (!p.$noHover ? "none" : "underline")};

    & p {
      color: ${(p) => !p.$noHover && "var(--violet12)"};
    }

    .trending-round-icon {
      animation: pulse 1s infinite;
    }
  }

  @keyframes pulse {
    0% {
      filter: drop-shadow(0px 0px 0px var(--violet6));
    }
    50% {
      filter: drop-shadow(0px 0px 8px var(--violet6));
    }
    100% {
      filter: drop-shadow(0px 0px 0px var(--violet6));
    }
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: ${(p) => p.$size};
  height: ${(p) => p.$size};
  background: ${(p) => p.$background};
  border-radius: ${(p) => p.$borderRadius};
  border: ${(p) => p.$border};
  padding: ${(p) => p.$padding};
  filter: ${(p) => p.$filter};
  transition: all 200ms;

  ${(p) =>
    p.$loading &&
    `
    background: linear-gradient(to right, var(--sand10) 33%, var(--sand9) 66%, var(--sand10) 99%);
    background-position: center;
    animation: waveAnimation 5s linear infinite;
  `}

  @keyframes waveAnimation {
    0% {
      background-position: 0px 0;
    }
    100% {
      background-position: 100em 0;
    }
  }

  ${ButtonLinkWrapper}:hover & {
    border-color: var(--violet6);

    & > i {
      color: var(--violet10);
    }
  }

  ${ButtonLinkWrapper}:focus-within & {
    border-color: var(--violet6);

    & > i {
      color: var(--violet10);
    }
  }
`;

const IconCover = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(p) => p.$url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: inherit;
`;

const TextLink = styled("Link")`
  all: unset;

  leading-trim: both;
  text-edge: cap;
  font-feature-settings: "salt" on;
  font: var(--text-base);
  color: var(--violet8);
  text-decoration: underline;
  cursor: pointer;
  letter-spacing: 0.32px;
`;

//Recupera mediante props o context el id del usuario de la sesion actual
const accountId = props.accountId ?? context.accountId;
//Recupera mediante props o la clase interna Social el objeto con algunos parametros del usuario de la sesion actual
const profile = props.profile ?? Social.getr(`${accountId}/profile`);
//Guarda el nombre del usuario actual en la variable name
const name = profile.name;

const TRENDING_APPS_LIMIT = 6;
const dummyData = {
  slug: "",
  profile: {
    name: "",
    tagline: "",
    image: {
      url: "",
    },
  },
};
const prefillData = Array(TRENDING_APPS_LIMIT).fill(dummyData);

const nearCatalogApi = "https://nearcatalog.xyz/wp-json/nearcatalog/v1";
const topRating = "projects-by-category?cid=trending";
const [topRatingApps, setTopRatingApps] = useState(prefillData);
const [loading, setLoading] = useState(true);

const fetchTopRatingApps = () => {
  asyncFetch(`${nearCatalogApi}/${topRating}`)
    .then((res) => {
      const data = res.body;
      const dataList = Object.keys(data)
        .slice(0, TRENDING_APPS_LIMIT)
        .map((key) => data[key]);
      setTopRatingApps(dataList);
      setLoading(false);
    })
    .catch((err) =>
      console.log("Error during fetch the list of top rating apps: ", err)
    );
};

useEffect(() => {
  fetchTopRatingApps();
  return () => {
    setTopRatingApps(prefillData);
  };
}, []);

const Icon = ({ className, fontSize, ...forwardedProps }) => (
  <IconWrapper {...forwardedProps}>
    <i className={className} style={{ fontSize, flexShrink: 0 }} />
  </IconWrapper>
);

const RoundIcon = ({ url, ...forwardedProps }) => (
  <IconWrapper {...forwardedProps}>
    <IconCover $url={url} />
  </IconWrapper>
);

const ButtonLink = ({ href, target, icon, title, text }) => (
  <ButtonLinkWrapper href={href} target={target} $gap="24px" $padding="24px">
    <Icon
      className={icon}
      $size="40px"
      $background="var(--sand1)"
      $border="1px solid var(--sand6)"
      $borderRadius="4px"
      $fontSize="18px"
    />
    <Flex $direction="column" $gap="16px">
      <Flex $gap="8px" $alignItems="center">
        <Text $fontWeight="600" $letterSpacing="0.28px">
          {title}
        </Text>
        <Icon className="ph ph-caret-right" $fontSize="16px" />
      </Flex>
      <Text $size="text-s" $letterSpacing="0.28px">
        {text}
      </Text>
    </Flex>
  </ButtonLinkWrapper>
);

const Card = ({ title, text, children }) => (
  <Pattern
    $background="#fff"
    $borderRadius="24px"
    $border="1px solid var(--violet2)"
    $shadow="0px 0px 0px 1px rgba(0, 0, 0, 0.02), 0px 8px 10px 0px rgba(0, 0, 0, 0.06)"
  >
    <PatternContent $padding="24px">
      <Flex $direction="column" $gap="36px" $mobileGap="24px">
        <Flex $direction="column" $gap="24px">
          <Text $size="text-xl" $fontWeight="500">
            {title}
          </Text>
          <Text $color="sand11" $letterSpacing="0.32px">
            {text}
          </Text>
        </Flex>
        {children}
      </Flex>
    </PatternContent>
  </Pattern>
);

const TrendingApp = ({ href, url, name, tagline, loading }) => (
  <ButtonLinkWrapper
    href={href}
    $gap="12px"
    $alignItems="center"
    $noHover
    title={tagline}
    aria-disabled={loading}
    $pointerEvents={loading ? "none" : "auto"}
  >
    <RoundIcon
      url={url}
      $size="60px"
      $padding="5px"
      $borderRadius="50%"
      $background="var(--white)"
      $loading={loading}
      className="trending-round-icon"
    />
    <Text
      $size="text-s"
      $fontWeight="600"
      $overflowLines="2"
      $letterSpacing="0.28px"
      $loading={loading}
    >
      {name}
    </Text>
  </ButtonLinkWrapper>
);

return (
  <Wrapper className="gateway-page-container">
    <Section>
      <Container>
        <Pattern
          $background="linear-gradient(264deg, #d9fff9 0%, #23e8b1 99.35%)"
          $borderRadius="16px"
        >
          <PatternContent
            $padding="55px 24px 55px 48px"
            $mobilePadding="48px 20px"
          >
            <Grid $gap="24px" $mobileGap="48px" $columns="1fr 1fr">
              <Flex $direction="column" $gap="32px">
                <H1>Bienvenid@ {name}!</H1>
                <Text
                  $size="text-l"
                  $mobileSize="text-sm"
                  style={{ maxWidth: "385px" }}
                >
                  Comienza a construir componentes con herramientas faciles de
                  usar.
                </Text>
              </Flex>
              <Flex $direction="column" $gap="0" $mobileGap="48px">
                <ButtonLink
                  href="https://app.jutsu.ai"
                  target="_blank"
                  icon="ph-bold ph-plus"
                  title="Crea un proyecto"
                  text="Empieza con Jutsu.ai usando una plantilla o crea componentes de cero."
                />
                <ButtonLink
                  href="/components"
                  icon="ph-bold ph-git-fork"
                  title="Modifica un proyecto hecho"
                  text="Empieza editando un componente o aplicación de la comunidad."
                />
              </Flex>
            </Grid>
          </PatternContent>
        </Pattern>
      </Container>
    </Section>

    <Section>
      <Container>
        <Grid $gap="24px" $mobileGap="20px" $columns="1fr">
          <Card
            title="Cotizaciones criptomonedas hoy"
            text={
              <>
                <TextLink href="https://www.coingecko.com/">Consulta</TextLink>{" "}
                los precios actuales de tus criptomonedas
              </>
            }
          >
            <Grid
              style={{
                justifyContent: "center",
              }}
              $gap="1px"
            >
              <Widget src="pichtran.near/widget/CoinPrice" />
            </Grid>
          </Card>
        </Grid>
      </Container>
    </Section>

    <Section>
      <Container>
        <Grid $gap="24px" $mobileGap="20px" $columns="1fr 1fr">
          <Card
            title="Tendencias"
            text={
              <>
                <TextLink href="/applications">Encuentra</TextLink> inspiración
                en las aplicaciones del catálogo de Near
              </>
            }
          >
            <Grid $gap="20px" $rowGap="24px" $columns="1fr 1fr">
              {topRatingApps.map((app) => (
                <TrendingApp
                  key={app.slug}
                  href={`/nearcatalog.near/widget/Index?id=${app.slug}`}
                  url={app.profile.image.url}
                  name={app.profile.name}
                  tagline={app.profile.tagline}
                  loading={loading}
                />
              ))}
            </Grid>
          </Card>
          <Card
            title="Aprende más a fondo"
            text="Profundiza en la documentación o comienza con un tutorial de Jutsu.ai"
          >
            <Flex $direction="column" $gap="16px" $mobileGap="48px">
              <ButtonLink
                href="https://docs.near.org"
                target="_blank"
                icon="ph-bold ph-book-open-text"
                title="Documentación"
                text="Aprende conceptos clave y vuélvete más pro."
              />
              <ButtonLink
                href="https://app.jutsu.ai/learn"
                target="_blank"
                icon="ph-bold ph-video"
                title="Lecciones"
                text="Encuentra tutoriales de Jutsu.ai para crear una interfaz descentralizada o un contrato inteligente básico."
              />
            </Flex>
          </Card>
        </Grid>
      </Container>
    </Section>
  </Wrapper>
);
