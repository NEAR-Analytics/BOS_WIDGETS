const Logo =
  "https://ipfs.near.social/ipfs/bafkreiah5hm6yuiairy7mzrq3zy4bwiycxjsmbu7fcx7exuekcifyo2ote";
const CharterImg =
  "https://ipfs.near.social/ipfs/bafkreihluonmwtbubzmuvdgjhydlvtg3mevm6qk3fmawxhlsugn6ofizpy";
const MarketingImg =
  "https://ipfs.near.social/ipfs/bafkreiapnuryaiqhjbri347uoyto3wlmqsdoqwzuv7xxtb7sc6tqpd44fa";
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

const MarketingURL =
  "https://near.org/megha19.near/widget/She-is-near-marketing";

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

    .body-text {
        line-height: 30px;
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
        .h2-custom {
            font-size: 30px;
            font-weight: 550;
            line-height: 40px;
        }
        .h3-custom {
            font-size: 25px;
            font-weight: 500;
            line-height: 30px;
        }
    }
    @media screen and (max-width: 1000px) {
        .h1-custom {
            font-size: 45px;
            font-weight: 550;
            line-height: 50px;
        }
        .h2-custom {
            font-size: 29px;
            font-weight: 550;
            line-height: 40px;
        }
        .h3-custom {
            font-size: 25px;
            font-weight: 500;
            line-height: 30px;
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
    .h2-custom {
        font-size: 25px;
        font-weight: 500;
        line-height: 30px;
    }
    .h3-custom {
        font-size: 20px;
        font-weight: 650;
        line-height: 30px;
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

const BodyText = () => {
  return (
    <div className="body-text">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
      nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut
      wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
      lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum Lorem
      ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi
      enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
      lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
      iriure dolor in hendrerit in vulputate Ut wisi enim ad minim veniam, quis
      nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea
      commodo consequat. Duis autem vel eum iriure dolor in hendrerit in
      vulputate
    </div>
  );
};

const LargeScreenComponent = () => {
  return (
    <LargeContainer>
      <div class="d-flex gap-5">
        <div class="d-flex flex-column gap-5 flex-08">
          <div class="h1-custom">
            Welcome to <br /> She is Near
          </div>
          <div class="h3-custom">
            The women’s DAO for the <br /> NEAR ecosystem{" "}
          </div>
          <div class="h3-custom">How did we get here?</div>
          <BodyText />
        </div>
        <div class="d-flex flex-column gap-3 align-items-center flex-1">
          <LogoImg src={Logo} />
          <div class="grid-4">
            <a href={``} target="_blank" rel="noreferrer">
              <GridImg src={CharterImg} />
            </a>
            <a href={``} target="_blank" rel="noreferrer">
              <GridImg src={EducationalImg} />
            </a>
            <a href={MarketingURL} target="_blank" rel="noreferrer">
              <GridImg src={MarketingImg} />
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
        <div class="h1-custom">Welcome to She is Near</div>
        <div class="h3-custom">The women’s DAO for the NEAR ecosystem </div>
        <img
          src={Logo}
          height={300}
          style={{ objectFit: "cover", alignSelf: "center" }}
        />
        <div class="h3-custom">How did we get here?</div>
        <BodyText />
        <div className="d-flex flex-column gap-2">
          <a href={``} target="_blank" rel="noreferrer">
            <SmallImg src={PartnershipsTextImg} />
          </a>
          <a href={MarketingURL} target="_blank" rel="noreferrer">
            <SmallImg src={MarketingTextImg} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SmallImg src={ChartedTextImg} />
          </a>
          <a href={``} target="_blank" rel="noreferrer">
            <SmallImg src={EducationalTextImg} />
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
