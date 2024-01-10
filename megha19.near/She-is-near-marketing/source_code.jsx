const Logo =
  "https://ipfs.near.social/ipfs/bafkreiah5hm6yuiairy7mzrq3zy4bwiycxjsmbu7fcx7exuekcifyo2ote";
const CharterImg =
  "https://ipfs.near.social/ipfs/bafkreihluonmwtbubzmuvdgjhydlvtg3mevm6qk3fmawxhlsugn6ofizpy";
const MarketingImg =
  "https://ipfs.near.social/ipfs/bafkreidzdyaevlopap2aq3ygn6e4s7ur3g7xtr6eyqd7mvymtc7kczapxu";
const EducationalImg =
  "https://ipfs.near.social/ipfs/bafkreicsxdahr5novaskzaoaporsptuqq22yqiihovy5ofdib6ttl2avlu";
const PartnershipsImg =
  "https://ipfs.near.social/ipfs/bafkreih5qtgjcli6mw2eu7frtjorkevm5vpyzigthcv5ks7ifyby2q7bna";

const TelegramIcon =
  "https://ipfs.near.social/ipfs/bafkreihviz6lmqnuij7ffyi7nlts66dcyr2amtxwhfcs4jm27h7sfb6kom";
const NearIcon =
  "https://ipfs.near.social/ipfs/bafkreibsyfqvtmo45ao3ap4kor7axsdldjd6lm6weirm3egchfgjld2vli";
const LinkdinIcon =
  "https://ipfs.near.social/ipfs/bafkreihxd2t2al5kbsppnw4zh2morfanwbxbndmi6mznm22ac6m4py7j3q";

const PartnershipsTextImg =
  "https://ipfs.near.social/ipfs/bafkreihfvlvoydrc5l4usttqb6t7rlntsghdlzjmszsrt2p7pscok7bnhy";
const ChartedTextImg =
  "https://ipfs.near.social/ipfs/bafkreidm6tmge4g34juxk3gabha6y4tb2urbq56qef3tnrypyhqdzrhje4";
const MarketingTextImg =
  "https://ipfs.near.social/ipfs/bafkreigtdxg27goqmitdsfgglhhg4g6326vq5sx2b242mam44p5bipxkcm";
const EducationalTextImg =
  "https://ipfs.near.social/ipfs/bafkreidnycmhvr2nsm4zlobqrizg5awgv5xtcuzsrr4uhxi76tdwt5zuj4";
const LogoTextImg =
  "https://ipfs.near.social/ipfs/bafkreidumcmgej3m6dovy7ghsa7xbekg7zpwptwjudhqxvg7hobgcfdd4q";

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Poppins&display=swap"
).body;

if (!cssFont) return "";

const Theme = styled.div`
    font-family: "Poppins", sans-serif;
    ${cssFont}

    .grid-4 {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }

    .cursor {
        cursor: pointer;
    }

    a {
        all: unset;
    }
`;

const LargeContainer = styled.div`
    padding: 2rem;
    .h1-custom {
        font-size: 70px;
        font-weight: 550;
        line-height: 80px;
    }
    .h2-custom {
        font-size: 40px;
        font-weight: 550;
        line-height: 50px;
    }
    .h3-custom {
        font-size: 25px;
        font-weight: 500;
        line-height: 30px;
    }

    .flex-1 {
        flex: 1;
    }

    .flex-08 {
        flex: 0.8;
    }

    .description {
        font-size: 18px;
        line-height: 35px;
        font-weight: lighter;
    }

    .subheading {
        font-size: 30px;
        line-height: 40px;
        font-weight: 500;
    }

    @media screen and (max-width: 1300px) {
        .flex-08 {
            flex: 1;
        }
    }

    @media screen and (max-width: 1200px) {
        padding: 1rem;
        .h1-custom {
            font-size: 50px;
            font-weight: 550;
            line-height: 60px;
        }
    }
    @media screen and (max-width: 1000px) {
        .h1-custom {
            font-size: 45px;
            font-weight: 550;
            line-height: 50px;
        }

        .description {
            font-size: 15px;
            line-height: 28px;
            font-weight: lighter;
        }

        .subheading {
            font-size: 25px;
            line-height: 35px;
            font-weight: 500;
        }
    }

    @media screen and (max-width: 700px) {
        display: none;
    }
`;

const LogoImg = styled.img`
    height: 420px;
    @media screen and (max-width: 1300px) {
        height: 300px;
    }
    @media screen and (max-width: 1100px) {
        height: 260px;
    }
    @media screen and (max-width: 900px) {
        height: 220px;
    }
`;
const GridImg = styled.img`
    cursor: pointer;
    height: 200px;
    @media screen and (max-width: 1300px) {
        height: 140px;
    }
    @media screen and (max-width: 1100px) {
        height: 120px;
    }
    @media screen and (max-width: 900px) {
        height: 100px;
    }
`;

const SmallContainer = styled.div`
    padding: 1rem;
    .h1-custom {
        font-size: 40px;
        font-weight: 700;
        line-height: 40px;
    }

    .description {
        font-size: 17px;
        line-height: 30px;
        font-weight: lighter;
    }

    .subheading {
        font-size: 25px;
        line-height: 35px;
        font-weight: 600;
    }

    @media screen and (min-width: 700px) {
        display: none;
    }
`;

const SocialIconImg = styled.img`
    height: 80px;

    @media screen and (max-width: 1100px) {
        height: 60px;
    }
    @media screen and (max-width: 700px) {
        height: 80px;
    }
`;

const SocialIcons = ({ text, src }) => {
  return (
    <div className="d-flex flex-column gap-2 align-items-center">
      <SocialIconImg src={src} />
      <div>{text}</div>
    </div>
  );
};

const SmallImg = styled.img`
    cursor: pointer;
    height: 90px;
    width: -webkit-fill-available;

    @media screen and (max-width: 600px) {
        height: 60px;
    }
`;

const Description = () => {
  return (
    <div className="description">
      The She is Near marketing team is embracing a grassroots DAO approach to
      ensure that we support and fund initiatives from our community members.{" "}
      <br /> The majority of marketing efforts, such as content campaigns,
      contests, social media threads, and any communication strategies to engage
      the community, are to be executed by active DAO members.
    </div>
  );
};

const BodyText = () => {
  return (
    <div className="description">
      <ul>
        <li>
          Highlighting women who are actively contributing and making strides in
          the ecosystem.
        </li>
        <li>
          Raising awareness about gender-related issues and providing career
          advice and tips for women to navigate these challenges.
        </li>
        <li>
          Amplifying the efforts of other teams, including partnerships,
          education, and technical development.
        </li>
        <li>
          Continuously updating and maintaining a consistent brand identity.
        </li>
        <li>Expanding our social media presence.</li>
        <li>
          Support and fund marketing initiatives put forth by our community
          members that align with and champion the points outlined above,
          following the approved process on the forum.
        </li>
      </ul>
    </div>
  );
};

const SubHeading = () => {
  return (
    <div className="subheading">
      With our marketing initiatives, we aim to achieve our missions:
    </div>
  );
};

const LargeScreenComponent = () => {
  return (
    <LargeContainer>
      <div class="d-flex gap-5">
        <div class="d-flex flex-column gap-5 flex-08">
          <div class="h1-custom">Marketing team</div>
          <Description />
          <SubHeading />
          <BodyText />
        </div>
        <div class="d-flex flex-column gap-3 align-items-center flex-1">
          <LogoImg src={MarketingImg} />
          <div class="grid-4">
            <a href={``} target="_blank" rel="noreferrer">
              <GridImg src={CharterImg} />
            </a>
            <a href={``} target="_blank" rel="noreferrer">
              <GridImg src={EducationalImg} />
            </a>
            <a href={``} target="_blank" rel="noreferrer">
              <GridImg src={Logo} />
            </a>
            <a href={``} target="_blank" rel="noreferrer">
              <GridImg src={PartnershipsImg} />
            </a>
          </div>
        </div>
        <div class="d-flex flex-column gap-3 align-items-center">
          <a href={``} target="_blank" rel="noreferrer">
            <SocialIcons text="Telegram" src={TelegramIcon} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SocialIcons text="Near Social" src={NearIcon} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SocialIcons text="LinkdIn" src={LinkdinIcon} />
          </a>
        </div>
      </div>
    </LargeContainer>
  );
};

const MobileScreenComponent = () => {
  return (
    <SmallContainer>
      <div className="d-flex flex-column gap-4">
        <div class="h1-custom">Marketing team</div>
        <img
          src={MarketingImg}
          height={300}
          style={{ objectFit: "cover", alignSelf: "center" }}
        />
        <Description />
        <SubHeading />
        <BodyText />
        <div className="d-flex flex-column gap-2">
          <a href={``} target="_blank" rel="noreferrer">
            <SmallImg src={PartnershipsTextImg} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SmallImg src={EducationalTextImg} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SmallImg src={ChartedTextImg} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SmallImg src={LogoTextImg} />
          </a>
        </div>
        <div class="d-flex flex-row gap-3 align-items-center justify-content-center">
          <a href={``} target="_blank" rel="noreferrer">
            <SocialIcons text="Telegram" src={TelegramIcon} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SocialIcons text="Near Social" src={NearIcon} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SocialIcons text="LinkdIn" src={LinkdinIcon} />
          </a>
        </div>
      </div>
    </SmallContainer>
  );
};

return (
  <Theme>
    <LargeScreenComponent />
    <MobileScreenComponent />
  </Theme>
);
