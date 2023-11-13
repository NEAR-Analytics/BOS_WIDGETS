const MainContainer = styled.div`
  position: absolute;
  width: 1320px;
  height: 860px;
  left: 0px;
  top: 3300px;
`;
const BackgroundContainer = styled.div`
  position: absolute;
  width: 1320px;
  height: 860px;
  left: 0px;
  top: 6px;
  background: #1B1B1B;
`;
const CoreTextContainer = styled.div`
position: absolute;
width: 1200px;
height: 60px;
background: #1B1B1B;
`;

const ContentContainer = styled.div`
  position: absolute;
  width: 1180px;
  height: 788px;
  left: 10px;
  top: 10px;
`;

const NFTText = styled.div`
  position: absolute;
  width: 500px;
  height: 165px;
  left: 50px;
  top: 90px;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 125.5%;
  color: #FFFFFF;
`;

const CharterText = styled.div`
  position: absolute;
  width: 428px;
  height: 90px;
  left: 832px;
  top: 50px;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 150.5%;
  color: #FFFFFF;
`;

const Rectangle = styled.div`
  position: absolute;
  width: 8px;
  height: 159px;
  left: 692px;
  top: 50px;
  background: #FEFEFE;
`;

const CharterButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 40px;
  gap: 10px;
  position: absolute;
  width: 137px;
  height: 48px;
  left: 750px;
  top: 180px;
  background: #FEFEFE;
  border-radius: 4px;
  cursor: pointer;
`;

const Charter = styled.div`
  width: 57px;
  height: 16px;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #7B7B7B;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Star4 = styled.div`
  position: absolute;
  width: 113px;
  height: 113px;
  left: 1071px;
  top: 187px;
  
`;

const Star5 = styled.div`
  position: absolute;
  width: 65px;
  height: 65px;
  left: 835px;
  top: 300px;
  
`;

const Star6 = styled.div`
  position: absolute;
  width: 45px;
  height: 65px;
  left: 0px;
  top: 0px;
  
`;
const Star7 = styled.div`
  position: absolute;
  width: 45px;
  height: 65px;
  left: 10px;
  top: 300px;
  
`;
const Star8 = styled.div`
 position: absolute;
  width: 113px;
  height: 113px;
  left: 1071px;
  top: 650px;
`;

const MeetTheTeamText = styled.div`
  position: absolute;
  width: 767px;
  height: 84px;
  left: calc(50% - 700px/2);
  top: 440px;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 50px;
  line-height: 120%;
  text-align: center;
  color: #FFFFFF;
`;
const ImageContainer = styled.div`
position: absolute;
`;
const SocialContainer = styled.div`

position: absolute;
width: 100px;
height: 30px;
top: 40px;
display: flex;
justify-content: space-between; /* Use 'justify-content' for spacing between flex items */
flex-direction: row;
`;
const SocialIcon = styled.div`
left:20;
width:20;
height:20;
`;
const NameContainer = styled.div`
position: absolute;
display: flex;
justify-content: space-between; /* Use 'justify-content' for spacing between flex items */
flex-direction: row;
font-family: inherit;
font-weight: 700;
font-size: 15px;
color:#FFFFFF;
white-space:nowrap;
`;
const CoreText = styled.div`
font-family: inherit;
font-size: 20px;
font-weight: 400;
line-height: 30px;
letter-spacing: 0em;
text-align: center;
color: #F2F2F2;


`;

return (
  <MainContainer id="ourteam">
    <BackgroundContainer>
      <ContentContainer>
        <NFTText>
          NFTs will lead the Web 3 evolution with limitless utility and endless
          fun!
        </NFTText>
        <CharterText style={{ left: 750 }}>
          Our charter is the compass guiding the NFT Working Group—a roadmap of
          goals, plans, and vision, ensuring transparency and progress.
        </CharterText>
        <Rectangle />
        <CharterButton>
          <a
            href="https://docs.google.com/document/d/1NgG3e4NqbTlml7F5Wfihhizfei6g17mT/edit?usp=sharing&ouid=107607394251431268575&rtpof=true&sd=true"
            target="blank"
          >
            {" "}
            <Charter>Charter</Charter>
          </a>
        </CharterButton>
        <Star4>
          <svg
            width="113"
            height="113"
            viewBox="0 0 113 113"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M56.5 0L59.6961 53.3039L113 56.5L59.6961 59.6961L56.5 113L53.3039 59.6961L0 56.5L53.3039 53.3039L56.5 0Z"
              fill="#FFD88D"
            />
          </svg>
        </Star4>
        <Star5>
          <svg
            width="65"
            height="65"
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.5 0L35.0279 29.9721L65 32.5L35.0279 35.0279L32.5 65L29.9721 35.0279L0 32.5L29.9721 29.9721L32.5 0Z"
              fill="#F29B9B"
            />
          </svg>
        </Star5>
        <Star6>
          <svg
            width="65"
            height="65"
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.5 0L35.0279 29.9721L65 32.5L35.0279 35.0279L32.5 65L29.9721 35.0279L0 32.5L29.9721 29.9721L32.5 0Z"
              fill="#85EBB3"
            />
          </svg>
        </Star6>
        <Star7>
          <svg
            width="97"
            height="109"
            viewBox="0 0 97 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.5 0L45.583 51.417L97 54.5L45.583 57.583L42.5 109L39.417 57.583L-12 54.5L39.417 51.417L42.5 0Z"
              fill="#6333DD"
            />
          </svg>
        </Star7>
        <Star8>
          <svg
            width="50"
            height="65"
            viewBox="0 0 97 109"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M54.5 0L57.583 51.417L109 54.5L57.583 57.583L54.5 109L51.417 57.583L0 54.5L51.417 51.417L54.5 0Z"
              fill="#25A45B"
            />
          </svg>
        </Star8>
        <MeetTheTeamText style={{ top: 340 }}>Meet The Team</MeetTheTeamText>
        <ImageContainer style={{ top: 450, left: 100 }}>
          <img
            style={{ width: 140, height: 150 }}
            src="https://cdn.discordapp.com/attachments/1132232613210357780/1160924867080753203/Aurobot.webp?ex=65366e89&is=6523f989&hm=de32abee5e8d7a308c515a7f4913978ad81230286594124230f51a977f7960ab&"
          />
        </ImageContainer>

        <ImageContainer style={{ top: 450, left: 480 }}>
          <img
            style={{ width: 140, height: 140 }}
            src="https://cdn.discordapp.com/attachments/1132232613210357780/1160922786118766703/bafkreihsi6z7t2g2blipzzfgmbamfaqjfiifoyfrc47qjt3a3u7p3rbpce.png?ex=65366c99&is=6523f799&hm=532962b74dfd141d6879d8fb0e3a2ac6abdc6389936e998fc9430069c8c3f1fa&"
          />
        </ImageContainer>
        <ImageContainer style={{ top: 450, left: 850 }}>
          <img
            style={{ width: 140, height: 140 }}
            src="https://cdn.discordapp.com/attachments/932622483662733332/1161374194144133190/1651673561336.jpeg?ex=65381101&is=65259c01&hm=b17f6e79be503b9c50ad09e5ee774f4055698f198f5dae68d71f7a4cf41cc32f&"
          />
        </ImageContainer>
        <ImageContainer style={{ top: 450, left: 1142 }}>
          <img
            style={{ width: 140, height: 140 }}
            src="https://svgshare.com/i/zd3.svg"
          />
        </ImageContainer>

        <SocialContainer style={{ top: 620, left: 115 }}>
          <SocialIcon>
            <NameContainer style={{ left: 35, top: -10 }}>Kirk</NameContainer>
            <a
              href="https://near.social/mob.near/widget/ProfilePage?accountId=krikkraktrak.near"
              target="blank"
            >
              <img
                style={{ width: 20, height: 20 }}
                src="https://near.social/favicon.png"
              />
            </a>
          </SocialIcon>

          <SocialIcon>
            <a
              href="https://gov.near.org/t/self-nomination-nft-revival-dao-krik/35332"
              target="blank"
            >
              <img
                style={{ width: 20, height: 20 }}
                src="https://cdn.discordapp.com/attachments/1135845507189702748/1162113622244347974/self-introduction.svg?ex=653ac1a6&is=65284ca6&hm=93e8c533053b22ea0bbdf66e06ece735bbace3a746ad382a4c2772a3fb467fd7&"
              />
            </a>
          </SocialIcon>
        </SocialContainer>
        <SocialContainer style={{ top: 620, left: 500 }}>
          <NameContainer style={{ left: 20, top: -20 }}>Aescobar</NameContainer>
          <SocialIcon>
            <a
              href="https://near.social/mob.near/widget/ProfilePage?accountId=escobarindo.near"
              target="blank"
            >
              <img
                style={{ width: 20, height: 20 }}
                src="https://near.social/favicon.png"
              />
            </a>
          </SocialIcon>
          <SocialIcon>
            <a
              href="https://id.linkedin.com/in/aescobar-mike-85208b285"
              target="blank"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12.262V20H15.7132V12.78C15.7132 10.9658 15.0929 9.7284 13.5418 9.7284C12.3573 9.7284 11.6519 10.5631 11.3423 11.3695C11.229 11.6579 11.2 12.0596 11.2 12.4633V20H6.91117C6.91117 20 6.96929 7.77265 6.91117 6.50482H11.2V8.41758L11.1719 8.46162H11.2V8.41758C11.7691 7.5 12.7862 6.18813 15.0639 6.18813C17.8847 6.18813 20 8.11766 20 12.262ZM2.42597 0C0.959968 0 0 1.00671 0 2.33117C0 3.62626 0.931911 4.66338 2.36986 4.66338H2.39792C3.89398 4.66338 4.82289 3.62626 4.82289 2.33117C4.79683 1.00671 3.89398 0 2.42597 0ZM0.254522 20H4.54131V6.50482H0.254522V20Z"
                  fill="white"
                />
              </svg>
            </a>
          </SocialIcon>
          <SocialIcon>
            <a
              href="https://gov.near.org/t/self-nomination-nft-wg-core-contributors/35359"
              target="blank"
            >
              <img
                style={{ width: 20, height: 20 }}
                src="https://cdn.discordapp.com/attachments/1135845507189702748/1162113622244347974/self-introduction.svg?ex=653ac1a6&is=65284ca6&hm=93e8c533053b22ea0bbdf66e06ece735bbace3a746ad382a4c2772a3fb467fd7&"
              />
            </a>
          </SocialIcon>
        </SocialContainer>
        <SocialContainer style={{ top: 620, left: 870 }}>
          <NameContainer style={{ left: -5, top: -20 }}>
            Tej (aka Punter)
          </NameContainer>
          <SocialIcon>
            <a
              href="https://near.social/mob.near/widget/ProfilePage?accountId=nearversedao.near"
              target="blank"
            >
              <img
                style={{ width: 20, height: 20 }}
                src="https://near.social/favicon.png"
              />
            </a>
          </SocialIcon>
          <SocialIcon>
            <a
              href="https://www.linkedin.com/in/tej-mirthinti-b2bb575a/"
              target="blank"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 12.262V20H15.7132V12.78C15.7132 10.9658 15.0929 9.7284 13.5418 9.7284C12.3573 9.7284 11.6519 10.5631 11.3423 11.3695C11.229 11.6579 11.2 12.0596 11.2 12.4633V20H6.91117C6.91117 20 6.96929 7.77265 6.91117 6.50482H11.2V8.41758L11.1719 8.46162H11.2V8.41758C11.7691 7.5 12.7862 6.18813 15.0639 6.18813C17.8847 6.18813 20 8.11766 20 12.262ZM2.42597 0C0.959968 0 0 1.00671 0 2.33117C0 3.62626 0.931911 4.66338 2.36986 4.66338H2.39792C3.89398 4.66338 4.82289 3.62626 4.82289 2.33117C4.79683 1.00671 3.89398 0 2.42597 0ZM0.254522 20H4.54131V6.50482H0.254522V20Z"
                  fill="white"
                />
              </svg>
            </a>
          </SocialIcon>
          <SocialIcon>
            <a
              href="https://gov.near.org/t/self-nomination-nft-wg-election/35357"
              target="blank"
            >
              <img
                style={{ width: 20, height: 20 }}
                src="https://cdn.discordapp.com/attachments/1135845507189702748/1162113622244347974/self-introduction.svg?ex=653ac1a6&is=65284ca6&hm=93e8c533053b22ea0bbdf66e06ece735bbace3a746ad382a4c2772a3fb467fd7&"
              />
            </a>
          </SocialIcon>
        </SocialContainer>
        <SocialContainer style={{ top: 620, left: 1165 }}>
          <NameContainer style={{ left: 10, top: -20 }}>NDC Plug</NameContainer>
        </SocialContainer>
      </ContentContainer>
    </BackgroundContainer>
    <CoreTextContainer style={{ top: 740, left: 30 }}>
      <CoreText>
        The core contributors team is a diverse group comprising individuals
        with varied experiences. These contributors have been democratically
        elected by the community, sharing a common commitment to enhance
        innovations in Near NFTs. You can view the detailed election results by
        following this link:{" "}
        <a
          href="https://gov.near.org/t/nft-wg-election-results/35493"
          target="blank"
        >
          Election Results.
        </a>
      </CoreText>
    </CoreTextContainer>
  </MainContainer>
);
