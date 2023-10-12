const MeetTheTeamContainer = styled.div`
  position: absolute;
  width: 1200px;
  height: 1551px;
  left: 0;
  top: 3700px;
  background: #1B1B1B;
`;

const CharterContainer = styled.div`
  position: absolute;
  width: 600px;
  height: 165px;
  left: 80px;
  top: 0; /* Set the top value as needed */
`;

const CharterContainer1 = styled.div`
  position: absolute;
  width: 700px;
  height: 165px;
  left: 0;
  top: 230px;
  font-family: inherit;
  font-style: normal;
  font-weight: 700;
  font-size: 44px;
  line-height: 125.5%;
  color: #FFFFFF;
`;

const CharterBtnContainer = styled.div`
/* Frame 2 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 40px;
gap: 10px;

position: absolute;
width: 137px;
height: 48px;
left: 980px;
top: 340px;

background: #FEFEFE;
border-radius: 4px;
cursor:pointer;


`;
const Charter = styled.div`

width: 57px;
height: 16px;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */

color: #7B7B7B;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;
const StarForCharter = styled.div`

/* Star 6 */

position: absolute;
width: 65px;
height: 65px;
left: 128px;
top: 30px;

`;

const MeetTeamContainer = styled.div`
position: absolute;
width: 1464px;
height: 725px;
left: 500px;
top: 780px;
`;

const CoreTeamContainer = styled.div`
top: 450px, 
left: 700px,
position: absolute;
width: 946px;
height: 534px;
top: 353px;

`;
const CoreText = styled.div`
position: absolute;
width: 1205px;
height: 60px;
left: 200px;
top: 1410px;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 150.5%;
/* or 30px */
text-align: center;

color: #F2F2F2;
`;

const SocialContainer = styled.div`

position: absolute;
width: 200px;
height: 60px;
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
const ParentContainer = styled.div`
  position: absolute;
  width: 1200px;
  height: 1551px;
  left: 0;
  top: 3700px;
  background: #1B1B1B;

`;

return (
  /************---------------------Meet our
    team----------------------------------------*/
  <ParentContainer>
    <MeetTheTeamContainer>
      <CharterContainer>
        <CharterContainer1 id="ourteam">
          NFTs will lead the Web 3 evolution with limitless utility and endless
          fun!
        </CharterContainer1>
      </CharterContainer>
      <CharterContainer style={{ left: 930, top: 230 }}>
        <div>
          <svg
            width="8"
            height="159"
            viewBox="0 0 8 159"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="8" height="159" fill="#FEFEFE" />
          </svg>
        </div>
      </CharterContainer>
      <CharterContainer>
        <CharterContainer1
          style={{
            left: 900,
            fontSize: 20,
            fontWeight: 400,
            width: 328,
            height: 90,
          }}
        >
          Our charter is the compass guiding the NFT Working Group—a roadmap of
          goals, plans, and vision, ensuring transparency and progress.
        </CharterContainer1>
      </CharterContainer>

      <CharterBtnContainer>
        <Charter>Charter</Charter>
      </CharterBtnContainer>

      <StarForCharter>
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
      </StarForCharter>
      <StarForCharter style={{ top: 600, left: 1000 }}>
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
      </StarForCharter>
      <StarForCharter style={{ top: 400, left: 1400 }}>
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
      </StarForCharter>
      <MeetTeamContainer>
        <CoreTeamContainer>
          <div
            style={{
              width: 867,
              height: 84,
              font: "inherit",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: 70,
            }}
          >
            Meet the Team
          </div>
        </CoreTeamContainer>
      </MeetTeamContainer>

      <MeetTeamContainer style={{ top: 1315, left: 350 }}>
        <div
          style={{
            top: 100,
            width: 190,
            height: 30,
            fontFamily: "inherit",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          Kirk
          <div
            style={{
              width: 200,
              height: 22,
              fontFamily: "inherit",
              color: "#FFFFFF",
              fontWeight: 400,
              fontSize: 16,
            }}
          ></div>
        </div>
      </MeetTeamContainer>

      <MeetTeamContainer style={{ top: 1315, left: 730 }}>
        <div
          style={{
            top: 100,
            width: 190,
            height: 30,
            fontFamily: "inherit",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          Aescobar
          <div
            style={{
              width: 200,
              height: 22,
              fontFamily: "inherit",
              color: "#FFFFFF",
              fontWeight: 400,
              fontSize: 16,
            }}
          ></div>
        </div>
      </MeetTeamContainer>

      <MeetTeamContainer style={{ top: 1315, left: 1100 }}>
        <div
          style={{
            top: 100,
            width: 190,
            height: 30,
            fontFamily: "inherit",
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          Tej (aka Punter)
          <div
            style={{
              width: 200,
              height: 22,
              fontFamily: "inherit",
              color: "#FFFFFF",
              fontWeight: 400,
              fontSize: 16,
            }}
          ></div>
        </div>
        <StarForCharter style={{ left: -1100, top: -280 }}>
          <div>
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
          </div>
        </StarForCharter>

        <StarForCharter style={{ left: 320, top: 120 }}>
          <div>
            <svg
              width="97"
              height="109"
              viewBox="0 0 97 109"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M54.5 0L57.583 51.417L109 54.5L57.583 57.583L54.5 109L51.417 57.583L0 54.5L51.417 51.417L54.5 0Z"
                fill="#25A45B"
              />
            </svg>
          </div>
        </StarForCharter>
      </MeetTeamContainer>
      <MeetTeamContainer style={{ top: 1000, left: 240 }}>
        <div>
          <img
            style={{ width: 280, height: 280 }}
            src="https://cdn.discordapp.com/attachments/1132232613210357780/1160924867080753203/Aurobot.webp?ex=65366e89&is=6523f989&hm=de32abee5e8d7a308c515a7f4913978ad81230286594124230f51a977f7960ab&"
          />
        </div>
      </MeetTeamContainer>
      <MeetTeamContainer style={{ top: 1000, left: 640 }}>
        <div>
          <img
            style={{ width: 280, height: 280 }}
            src="https://cdn.discordapp.com/attachments/1132232613210357780/1160922786118766703/bafkreihsi6z7t2g2blipzzfgmbamfaqjfiifoyfrc47qjt3a3u7p3rbpce.png?ex=65366c99&is=6523f799&hm=532962b74dfd141d6879d8fb0e3a2ac6abdc6389936e998fc9430069c8c3f1fa&
"
          />
        </div>
      </MeetTeamContainer>
      <MeetTeamContainer style={{ top: 1000, left: 1030 }}>
        <div>
          <img
            style={{ width: 280, height: 280 }}
            src="https://cdn.discordapp.com/attachments/932622483662733332/1161374194144133190/1651673561336.jpeg?ex=65381101&is=65259c01&hm=b17f6e79be503b9c50ad09e5ee774f4055698f198f5dae68d71f7a4cf41cc32f&
"
          />
        </div>
      </MeetTeamContainer>
      <SocialContainer style={{ top: 1350, left: 270 }}>
        <SocialIcon>
          <a href="https://near.social/mob.near/widget/ProfilePage?accountId=krikkraktrak.near">
            <img
              style={{ width: 20, height: 20 }}
              src="https://near.social/favicon.png
"
            />
          </a>
        </SocialIcon>
        <SocialIcon>
          <a href="https://gov.near.org/t/self-nomination-nft-revival-dao-krik/35332">
            <img
              style={{ width: 20, height: 20 }}
              src="https://cdn.discordapp.com/attachments/1135845507189702748/1161713477589667850/Self-Intro-icon.svg?ex=65394cfc&is=6526d7fc&hm=78beed194efa12f9e31d0f6c456f54a2a900c4a5b6c0327684cb1003a87509f4&
"
            />
          </a>
        </SocialIcon>
      </SocialContainer>

      <SocialContainer style={{ top: 1350, left: 680 }}>
        <SocialIcon>
          <a href="https://near.social/mob.near/widget/ProfilePage?accountId=escobarindo.near">
            <img
              style={{ width: 20, height: 20 }}
              src="https://near.social/favicon.png
"
            />
          </a>
        </SocialIcon>
        <SocialIcon>
          <a href="https://id.linkedin.com/in/aescobar-mike-85208b285">
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
          <a href="https://gov.near.org/t/self-nomination-nft-wg-core-contributors/35359">
            <img
              style={{ width: 20, height: 20 }}
              src="https://cdn.discordapp.com/attachments/1135845507189702748/1161713477589667850/Self-Intro-icon.svg?ex=65394cfc&is=6526d7fc&hm=78beed194efa12f9e31d0f6c456f54a2a900c4a5b6c0327684cb1003a87509f4&
"
            />
          </a>
        </SocialIcon>
      </SocialContainer>

      <SocialContainer style={{ top: 1350, left: 1080 }}>
        <SocialIcon>
          <a href="https://near.social/mob.near/widget/ProfilePage?accountId=nearversedao.near">
            <img
              style={{ width: 20, height: 20 }}
              src="https://near.social/favicon.png
"
            />
          </a>
        </SocialIcon>
        <SocialIcon>
          <a href="https://www.linkedin.com/in/tej-mirthinti-b2bb575a/">
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
          <a href="https://gov.near.org/t/self-nomination-nft-wg-election/35357">
            <img
              style={{ width: 20, height: 20 }}
              src="https://cdn.discordapp.com/attachments/1135845507189702748/1161713477589667850/Self-Intro-icon.svg?ex=65394cfc&is=6526d7fc&hm=78beed194efa12f9e31d0f6c456f54a2a900c4a5b6c0327684cb1003a87509f4&
"
            />
          </a>
        </SocialIcon>
      </SocialContainer>
      <CoreText>
        {" "}
        The core contributors team is a diverse group comprising individuals
        with varied experiences. These contributors have been democratically
        elected by the community, sharing a common commitment to enhance
        innovations in Near NFTs. You can view the detailed election results by
        following this link :{" "}
        <a href="https://gov.near.org/t/nft-wg-election-results/35493">
          Election Results
        </a>
      </CoreText>
    </MeetTheTeamContainer>
  </ParentContainer>
);
