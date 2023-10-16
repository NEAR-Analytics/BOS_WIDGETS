/*-----------------------------NFTStats----------------------*/

const NFTStats = styled.div`

/* Rectangle 23793 */

position: absolute;
width: 1320px;
height: 500px;
top: 1280px;
background: #1B1B1B;

`;
const StarForStats = styled.div`

position: absolute;
width: 80px;
height: 80px;
left: 1073px;
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
width: 1080px;
height: 112px;
left: 60px;
top: 300px;

`;
const StatusCard = styled.div`
box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
align-items: center;
padding: 1px;
gap: 1px;

margin: 0 auto;
width: 300px;
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

width: 268px;
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

width: 268px;
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
padding: 10px;
gap: 8px;

width: 290px;
height: 26px;


/* Inside auto layout */
flex: none;
order: 0;
align-self: stretch;
flex-grow: 0;


`;

const Title = styled.div`
width: 168px;
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
padding:10px;
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
return (
  /*------------NFTStats----------------*/
  <NFTStats>
    <SecondaryHeadline>NEAR NFT Stats.</SecondaryHeadline>
    <StarForStats>
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 0L42.2627 37.7373L80 40L42.2627 42.2627L40 80L37.7373 42.2627L0 40L37.7373 37.7373L40 0Z"
          fill="#FFD88D"
        />
      </svg>
    </StarForStats>
    <Paragraph>Powered by mintbase</Paragraph>
    <StatusContainer>
      <StatusCard>
        <Content>
          <Text>
            <TitleContainer>
              <Title>Total Transactions</Title>
              <Badge>
                <TextForBadge>+2.2%</TextForBadge>
              </Badge>
            </TitleContainer>
            <Description>2,764,932</Description>
          </Text>
        </Content>
      </StatusCard>
      <StatusCard>
        <Content>
          <Text>
            <TitleContainer>
              <Title>24H Transactions</Title>
              <Badge>
                <TextForBadge>-2.5%</TextForBadge>
              </Badge>
            </TitleContainer>
            <Description>2,764,932</Description>
          </Text>
        </Content>
      </StatusCard>
      <StatusCard>
        <Content>
          <Text>
            <TitleContainer>
              <Title>24H Minted</Title>
              <Badge>
                <TextForBadge>0.0%</TextForBadge>
              </Badge>
            </TitleContainer>
            <Description>2,764,932</Description>
          </Text>
        </Content>
      </StatusCard>
    </StatusContainer>
  </NFTStats>
);
