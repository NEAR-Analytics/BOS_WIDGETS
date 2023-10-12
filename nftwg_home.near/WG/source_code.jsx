const Layout = styled.div`
position: relative;
width: 1600px;
height: 6060px;
background: #FFFBDA;
`;
/*-------------Header----------*/
const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 16px 80px;
gap: 80px;
position: absolute;
width: 100%;
height: 80px;
left: 0px;
top: 0px;
background: #1B1B1B;
`;
const Logo = styled.div`
margin: 0 auto;
width: 40px;
height: 40px;
background: linear-gradient(153.16deg, #00758C 25.12%, #00916A 51.24%, #25A45B 74.77%);
flex: none;
order: 0;
flex-grow: 0;
`;
const MidWrapper1 = styled.div`
/* Frame 1 */
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 24px;
margin: 0 auto;
width: 480px;
height: 16px;
/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
`;
const home = styled.div`
/* Home */
width: 44px;
height: 16px;
font-family: inherit;
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */
color: #DFDFDF;
cursor:pointer;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;

const aboutUs = styled.div`
/* About Us */
width: 65px;
height: 16px;
cursor:pointer;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */
color: #DFDFDF;
white-space: nowrap;
/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
`;

const ourGoals = styled.div`
/* Our Goals */
width: 73px;
height: 16px;
cursor:pointer;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */
color: #DFDFDF;
white-space: nowrap;
/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
`;

const ourTeam = styled.div`
/* Our Team */
width: 71px;
height: 16px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */
color: #DFDFDF;
white-space: nowrap;
cursor:pointer;
/* Inside auto layout */
flex: none;
order: 3;
flex-grow: 0;
`;

const nftDappCentral = styled.div`
/* NFT DApp Central */
width: 131px;
height: 16px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */
color: #DFDFDF;
white-space: nowrap;
cursor:pointer;
/* Inside auto layout */
flex: none;
order: 4;
flex-grow: 0;
`;

const LastWrapper = styled.div`
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 0px;
gap: 24px;
margin: 0 auto;
width: 377px;
height: 48px;
/* Inside auto layout */
flex: none;
order: 2;
flex-grow: 0;
`;

const btn1 = styled.div`
/* Frame 3 */
box-sizing: border-box;
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 24px;
gap: 10px;
cursor:pointer;
width: 159px;
height: 48px;
border: 1px solid #FFFFFF;
border-radius: 4px;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
/* Our Workspace */
width: 170px;
height: 16px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */
color: #FFFFFF;
white-space: nowrap;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;
const btn2 = styled.div`
/* Frame 2 */
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 24px;
gap: 10px;
cursor:pointer;
width: 194px;
height: 48px;
background: #6333DD;
border-radius: 4px;
/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
/* Join Our Community */
width: 211px;
height: 16px;
font-family:inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */
color: #FEFEFE;
white-space: nowrap;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;
/*-------------------------Hero-------------------------*/
const Hero = styled.div`
position: absolute;
width: 1280px;
height: 756px;
left: 80px;
top: 180px;
`;
const ImageLayout = styled.div`
/* Placeholder / picture */
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 0px;
gap: 10px;
position: absolute;
width: 1350px;
height: 500px;
left: 10px;
top: 436px;
background-size: cover;
background-repeat: no-repeat;
background: url('https://i.ibb.co/qRHzxvw/Rectangle-23798.png'), #DDE1E6;
`;

const ImageCss = styled.div`
/* Rectangle 23798 */
width: 1350px;
height: 500px;
background: url('https://i.ibb.co/qRHzxvw/Rectangle-23798.png'), #D9D9D9;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
background-size: cover;
background-repeat: no-repeat;
`;

const Text1 = styled.div`
/* The NFT Workgroup */
position: absolute;
width: 300px;
height: 50px;
left: 10px;
top: 40px;
font-family: inherit;
font-style: normal;
font-weight: 1000;
font-size: 30px;
line-height: 120%;
/* identical to box height, or 24px */
text-transform: uppercase;
white-space: nowrap;
color: #6333DD;
`;

const Text2 = styled.div`
/* Empowering NFTs on NEAR: Bridging Communities, Pioneering Innovations! */
position: absolute;
width: 1280px;
height: 168px;
left: 10px;
top: 190px;
font-family: 'Outfit';
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 120%;
/* or 84px */
color: #333333;
`;
/*-----------------------------NFTStats----------------------*/

const NFTStats = styled.div`
/* Rectangle 23793 */
position: absolute;
width: 100%;
height: 500px;
top: 1280px;
background: #1B1B1B;
`;
const StarForStats = styled.div`
position: absolute;
width: 80px;
height: 80px;
left: 1273px;
top: 115px;
`;

const SecondaryHeadline = styled.div`
position: absolute;
width: 1280px;
height: 77px;
left: 80px;
top: 115px;
font-family: inherit;
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 110%;
color: #FFFFFF;
`;

const Paragraph = styled.div`
position: absolute;
width: 1280px;
height: 24px;
left: 80px;
top: 220px;
font-family: inherit;
font-style: normal;
font-weight: 900;
font-size: 20px;
line-height: 120%;
/* identical to box height, or 24px */
text-transform: uppercase;
color: #E7E7E7;
`;

const StatusContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0px;
position: absolute;
width: 1280px;
height: 112px;
left: 60px;
top: 300px;
`;
const StatusCard = styled.div`
box-sizing: border-box;
/* Auto layout */
display: flex;
flex-direction: column;
align-items: center;
padding: 16px;
gap: 16px;
margin: 0 auto;
width: 400px;
height: 112px;
background: #FFFFFF;
border: 1px solid #A0A0A0;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;

const Content = styled.div`
/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 16px;
width: 368px;
height: 80px;
/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`;

const Text = styled.div`
/* Text */
/* Auto layout */
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 10px 0px;
gap: 12px;
width: 368px;
height: 80px;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;
`;

const TitleContainer = styled.div`
/* Title Container */
/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 0px;
gap: 8px;
width: 368px;
height: 26px;
/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;
`;

const Title = styled.div`
width: 298px;
height: 26px;
/* Heading/4 */
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 110%;
/* or 26px */
color: #333333;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 1;
`;

const Badge = styled.div`
/* Badge */
/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 2px 12px;
width: 62px;
height: 24px;
background: #F2F4F8;
border-radius: 12px;
/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
`;

const TextForBadge = styled.div`
 /* Text */
width: 38px;
height: 20px;
/* Body/S */
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 140%;
/* identical to box height, or 20px */
text-align: center;
color: #333333;
/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;

const Description = styled.div`
/* Description Bottom */
width: 70px;
height: 22px;
/* Body/M */
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: %;
/* or 22px */
color: #697077;
/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
`;
/*----------------About Us --------------------*/

const AboutUsContainer = styled.div`
position: absolute;
width: 1280px;
height: 228px;
left: 80px;
top: 412px;
`;
const AboutUs = styled.div`
position: absolute;
width: 1280px;
height: 84px;
left: 80px;
top: 1612px;
font-family: inherit;
font-style: normal;
font-weight: 700;
font-size: 70px;
line-height: 120%;
/* identical to box height, or 84px */
color: #333333;
`;

const Sentence = styled.div`
position: absolute;
width: 610px;
height: 120px;
left: 80px;
top: 1720px;
font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 150.5%;
/* or 30px */
color: #333333;
`;

/*-------------------------Our Goals----------------------*/
const OurGoalsContainer = styled.div`
position: absolute;
width: 1440px;
height: 1551px;
left: 0px;
top: 2500px;
`;
const StarForOurGoals = styled.div`
position: absolute;
width: 112px;
height: 112px;
left: 960px;
top: 50px;
`;

const OurGoals = styled.div`
/* Our Goals */
position: absolute;
width: 280px;
height: 72px;
left: calc(50% - 280px/2);
top: 100px;
font-family: inherit;
font-style: normal;
font-weight: 700;
font-size: 60px;
line-height: 120%;
/* identical to box height, or 72px */
text-align: center;
white-space: nowrap;
color: #333333;
`;

const Container = styled.div`
position: absolute;
width: 610px;
height: 243.99px;
left: 30px;
top: 2.01px;
`;

const IconContainer = styled.div`
/* Container */
position: absolute;
width: 80px;
height: 80px;
left: 80px;
top: 300px;
background: #FFB6AB;
border-radius: 9.19427px;
`;

const Icon = styled.div`
position: absolute;
width: 80px;
height: 80px;
left: 20px;
top: 21.01px;
`;
const TextOurGoalsContainer = styled.div`
position: absolute;
width: 610px;
height: 134px;
left: 413px;
top: 400px;
`;

const TextOurGoals = styled.div`
position: absolute;
width: 291px;
height: 24px;
left: calc(50% - 291px/2 - 494.5px);
top: 22px;
font-family: inherit;
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 120%;
/* identical to box height, or 24px */
white-space:nowrap;
color: #333333;
`;
