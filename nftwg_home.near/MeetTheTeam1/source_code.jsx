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
  <MeetTeamContainer>
    <CoreText>
      {" "}
      The core contributors team is a diverse group comprising individuals with
      varied experiences. These contributors have been democratically elected by
      the community, sharing a common commitment to enhance innovations in Near
      NFTs. You can view the detailed election results by following this link :{" "}
      <a href="https://gov.near.org/t/nft-wg-election-results/35493">
        Election Results
      </a>
    </CoreText>
  </MeetTeamContainer>
);
