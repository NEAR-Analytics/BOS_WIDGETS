const Owner = "nftwg_home.near";
const SearchInput = "nearhorizon.near";
State.init({
  isToggleActive: true,
  isWidgetVisible: true,
  toggleBoxLeft: "50px",
  filteredCards: [], // Initially, set it to data1
  searchQuery: "",
  searchBarClicked: false,
});

const handleToggleClick = () => {
  State.update({
    isToggleActive: !state.isToggleActive,
    toggleBoxLeft: state.isToggleActive ? "200px" : "50px",
    cards: state.isToggleActive ? data2 : data1,
  });
};
const data1 = [
  {
    title: "Humans Of Near",
    imageSrc:
      "https://imgtr.ee/images/2023/10/23/c406744cb2519c3ff347cd46806db29e.png",
    description:
      "Humans of Near is a Map of IAM Human SBT holders. Built by the NFT Workgroup.",
    buttonText: "Completed",
    fontSize: 20,
    href: "https://near.org/humans-of-near.near/widget/humans.nearverselabs.com",
  },
  {
    title: "Socializer",
    imageSrc:
      "https://imgtr.ee/images/2023/10/23/57b442df1ce536dbf207c6ed36bfae63.png",
    description: "Socializer is an interactive rewards portal for Near Social.",
    buttonText: "In Progress",
    fontSize: 20,
  },
];

const handleSearchChange = (event) => {
  const searchQuery = event.target.value.toLowerCase();
  let filteredCards = data1; // Initialize with all cards
  if (searchQuery) {
    filteredCards = data1.filter((card) => {
      // Implement your search logic here; e.g., check if card title includes the searchQuery
      return card.title.toLowerCase().includes(searchQuery);
    });
  }

  State.update({
    searchQuery: searchQuery,
    filteredCards: filteredCards,
    searchBarClicked: true,
  });
};

const DaapCentralContainer = styled.div`
position:absolute;
width:1320px;
height:1100px;
top:4250px;
background: #FFFBDA;
`;

const DaapCentralHeading = styled.div`
width: 867px
height: 168px
top: 1518px
left: 306px
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
width: 486px;
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
background: ${(props) => (props.isActive ? "#333333" : "transparent")};
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



/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;
color:#333333
`;

const ToggleText2 = styled.div`
/* Community Innovations */

width: 239px;
height: 24px;
cursor:pointer;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 120%;
white-space:nowrap;
/* identical to box height, or 24px */

color "#333333"


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

`;

const SearchContainer = styled.div`
/* Group 1000004191 */

position: absolute;
width: 780px;
height: 56px;


`;
const Filter = styled.div`

/* Frame 2 */

box-sizing: border-box;

/* Auto layout */
/* Frame 2 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 48px;
gap: 16px;

position: absolute;
width: 203px;
height: 56px;
left: 1158px;
top: 4842px;

background: #333333;
border: 1px solid #333333;
border-radius: 24px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;

`;

const FilterText = styled.div`

/* Filters */

width: 74px;
height: 14px;

font-family: inherit;
font-style: normal;
font-weight: 500;
font-size: 19px;
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
const AppCard = styled.div`
position:absolute;
width:900;
height:540;

`;
const Card = styled.div`
box-sizing: border-box;
position: absolute;
width: 400px;
height: 313px;
background: #FFFFFF;
border: 1px solid #A0A0A0;
border-radius: 10px;



`;
const CardContent = styled.div`
position: absolute;
width: 400px;
height: 13px;
`;
const AppLinkButton = styled.div`
/* Frame 2 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 132px;
gap: 10px;
cursor:pointer;

position: absolute;
width: 352px;
height: 48px;


background: #D9D9D9;
border: 1px solid #F0F0F0;
border-radius: 79px;
`;
const ApplinkText = styled.div`
/* View Details */

width: 88px;
height: 16px;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */

color: #333333;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

`;
const WidgetContainer = styled.div`
  /* Add a container for the widget */
  position: absolute;
  width: 900px;
  height: 540px;
  top: 400px; /* Adjust the top position */
  left: 40px;
  display: ${state.isWidgetVisible ? "block" : "none"};
  overflow-y: scroll;
`;
const Line = styled.div`
/* Line 6 */
position: absolute;
width: 399px;
height: 0px;
border: 1px solid #A0A0A0;

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
    <ToggleContainer style={{ left: 390 }}>
      <ToggleText1
        isActive={state.isToggleActive}
        onClick={() => handleToggleClick()}
        style={{
          fontWeight: state.isToggleActive ? 600 : 400,
          fontSize: 20,
        }}
      >
        NFT WG Projects
      </ToggleText1>

      <ToggleText2
        isActive={!state.isToggleActive}
        onClick={() => handleToggleClick()}
        style={{
          fontWeight: state.isToggleActive ? 400 : 600,
          fontSize: 20,
        }}
      >
        Community Innovations
      </ToggleText2>
    </ToggleContainer>
    <SearchContainer style={{ top: 300, left: 250 }}>
      <input type="search" onChange={handleSearchChange} />
    </SearchContainer>
    <WidgetContainer style={{ left: 200 }}>
      {state.isToggleActive && state.searchBarClicked && state.searchQuery ? (
        state.filteredCards.map((card, index) => (
          <Card key={index}>
            <CardContent style={{ top: 10, left: 10 }}>
              <img
                style={{ width: "80px", height: "80px" }}
                src={card.imageSrc}
                alt={card.title}
              />
            </CardContent>
            <CardContent
              style={{
                fontSize: "24px",
                top: "50px",
                left: "170px",
                fontWeight: 700,
              }}
            >
              {card.title}
            </CardContent>

            <CardContent
              style={{ fontSize: "16px", top: "100px", left: "10px" }}
            >
              {card.description}
            </CardContent>
            <CardContent style={{ top: "180px" }}>
              <Line style={{ width: "100%" }} />
            </CardContent>
            <CardContent>
              <AppLinkButton style={{ top: "200px", left: "20px" }}>
                <a href={card.href} target="_blank">
                  <ApplinkText>{card.buttonText}</ApplinkText>
                </a>
              </AppLinkButton>
            </CardContent>
          </Card>
        ))
      ) : (
        <Widget src={`${Owner}/widget/CardForNFTWG`} props={props} />
      )}
    </WidgetContainer>
  </DaapCentralContainer>
);
