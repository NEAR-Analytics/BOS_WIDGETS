const DaapCentralContainer = styled.div`
position:absolute;
width:1200px;
height:1100px;
top:4400px;
background: #FFFBDA;
`;

const DaapCentralHeading = styled.div`
width: 867px
height: 168px
top: 1518px
left: 286px
`;
const DaapCentralHeadingLine = styled.div`
font-family: inherit;
font-size: 70px;
font-weight: 700;
line-height: 84px;
letter-spacing: 0em;
text-align: center;
`;

const ToggleContainer = styled.div`
/* Frame 57 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 16px;
gap: 16px;

position: absolute;
width: 436px;
height: 56px;


border: 1px solid #333333;
border-radius: 8px;
`;
const ToggleBox = styled.div`
/* Frame 54 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 12px;
gap: 10px;

width: 179px;
height: 40px;

border: 1px solid #333333;
border-radius: 8px;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;
const ToggleText1 = styled.div`


/* NFT WG Projects */

width: 164px;
height: 24px;
cursor:pointer;

font-family: inherit;
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 120%;
/* identical to box height, or 24px */
white-space:nowrap;
color: #333333;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
`;

const ToggleText2 = styled.div`
/* Community Innovations */

width: 209px;
height: 24px;
cursor:pointer;

font-family: 'inherit';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 120%;
/* identical to box height, or 24px */

color: #333333;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

`;

const SearchContainer = styled.div`
/* Group 1000004191 */

position: absolute;
width: 1200px;
height: 56px;


`;
const Filter = styled.div`

/* Frame 2 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 48px;
gap: 10px;
cursor:pointer;

position: absolute;
width: 103px;
height: 26px;


background: #333333;
border: 1px solid #333333;
border-radius: 24px;
`;

const FilterText = styled.div`

/* Filters */

width: 24px;
height: 14px;

font-family: inherit;
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 24px */

color: #F0F0F0;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
`;

const SearchBar = styled.div`
/* Group 1000004190 */

position: absolute;





/* Rectangle 23798 */

box-sizing: border-box;

position: absolute;
width: 800px;
height: 56px;

background: #FFFFFF;
border: 1px solid #A0A0A0;
border-radius: 6px;
`;

const ListMyAppHereContainer = styled.div`
/* Frame 3 */

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 40px;
gap: 10px;
cursor:pointer;

position: absolute;
width: 201px;
height: 48px;


background: #6333DD;
border-radius: 4px;
`;
const ListMyAppHereText = styled.div`

/* List My App Here */

width: 121px;
height: 16px;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */

color: #FFFFFF;
white-space:nowrap;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


`;

const INeedSupportContainer = styled.div`
/* Frame 58 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 40px;
gap: 10px;
white-space:nowrap;
cursor:pointer;

position: absolute;
width: 186px;
height: 48px;


background: #FFFFFF;
border-radius: 4px;

`;
const INeedSupportText = styled.div`
/* I Need Support */

width: 106px;
height: 16px;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */

color: #1B1B1B;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

`;

return (
  <DaapCentralContainer>
    <DaapCentralHeading>
      <DaapCentralHeadingLine id="nftdaapcentral">
        DApp Central
      </DaapCentralHeadingLine>
      <DaapCentralHeadingLine
        style={{ fontWeight: 400, fontSize: 20, left: 395 }}
      >
        NEAR centric innovations built by the Work Group and the wider Near
        Projects / Communities
      </DaapCentralHeadingLine>
    </DaapCentralHeading>

    <ToggleContainer style={{ left: 50 }}>
      <ToggleBox>
        <ToggleText1>NFT WG Projects</ToggleText1>
      </ToggleBox>
      <ToggleText2>Community Innovations</ToggleText2>
    </ToggleContainer>

    <SearchContainer style={{ top: 300, left: 50 }}>
      <SearchBar>
        <input style={{ width: 800, height: 56 }} type="search" />
      </SearchBar>

      <Filter style={{ left: 900, top: 10 }}>
        <svg
          width="10"
          height="10"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.125 7.875H1.875C1.57663 7.875 1.29048 7.75647 1.0795 7.5455C0.868526 7.33452 0.75 7.04837 0.75 6.75C0.75 6.45163 0.868526 6.16548 1.0795 5.9545C1.29048 5.74353 1.57663 5.625 1.875 5.625H22.125C22.4234 5.625 22.7095 5.74353 22.9205 5.9545C23.1315 6.16548 23.25 6.45163 23.25 6.75C23.25 7.04837 23.1315 7.33452 22.9205 7.5455C22.7095 7.75647 22.4234 7.875 22.125 7.875ZM18.375 13.125H5.625C5.32663 13.125 5.04048 13.0065 4.8295 12.7955C4.61853 12.5845 4.5 12.2984 4.5 12C4.5 11.7016 4.61853 11.4155 4.8295 11.2045C5.04048 10.9935 5.32663 10.875 5.625 10.875H18.375C18.6734 10.875 18.9595 10.9935 19.1705 11.2045C19.3815 11.4155 19.5 11.7016 19.5 12C19.5 12.2984 19.3815 12.5845 19.1705 12.7955C18.9595 13.0065 18.6734 13.125 18.375 13.125ZM13.875 18.375H10.125C9.82663 18.375 9.54048 18.2565 9.3295 18.0455C9.11853 17.8345 9 17.5484 9 17.25C9 16.9516 9.11853 16.6655 9.3295 16.4545C9.54048 16.2435 9.82663 16.125 10.125 16.125H13.875C14.1734 16.125 14.4595 16.2435 14.6705 16.4545C14.8815 16.6655 15 16.9516 15 17.25C15 17.5484 14.8815 17.8345 14.6705 18.0455C14.4595 18.2565 14.1734 18.375 13.875 18.375Z"
            fill="#F0F0F0"
          />
        </svg>

        <FilterText>Filters</FilterText>
      </Filter>
    </SearchContainer>

    <ListMyAppHereContainer style={{ top: 1000, left: 30 }}>
      <ListMyAppHereText>List My App Here</ListMyAppHereText>
    </ListMyAppHereContainer>
    <INeedSupportContainer style={{ top: 1000, left: 270 }}>
      <INeedSupportText>I Need Support</INeedSupportText>
    </INeedSupportContainer>
  </DaapCentralContainer>
);
