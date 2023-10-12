const MeetTheTeamContainer = styled.div`
/* Rectangle 23793 */

position: absolute;
width: 1600px;
height: 1551px;
left: 0px;
top: 3700px;

background: #1B1B1B;

`;
const CharterContainer = styled.div`
position: absolute;
width: 1280px;
height: 165px;
left: 80px;
top: px;
`;
const CharterContainer1 = styled.div`
/* NFTs will lead the Web 3 evolution with limitless utility and endless fun! */

position: absolute;
width: 700px;
height: 165px;
left: 0px;
top: 230px;

font-family: inherit;
font-style: normal;
font-weight: 700;
font-size: 44px;
line-height: 125.5%;
/* or 55px */

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

return (
  /************---------------------Meet our
    team----------------------------------------*/
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
          width: 528,
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
  </MeetTheTeamContainer>
);
