/*-------------Header----------*/
const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 16px 80px;
gap: 80px;
position: absolute;
width: 1200px;
height: 80px;

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
const HeaderContainer = styled.div`
position:absolute;
width:1200px;
height:80px;
`;
return (
  <Header>
    <div class="Logo">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.16177 19.236V8.7324H11.7808L13.7849 17.8856H14.0445V8.7324H15.9189V19.236H12.2998L10.2957 10.0829H10.0362V19.236H8.16177Z"
          fill="url(#paint0_linear_144_283)"
        />
        <path
          d="M17.3884 19.236V8.7324H23.7325V10.533H19.2916V13.0689H23.3865V14.8695H19.2916V19.236H17.3884Z"
          fill="url(#paint1_linear_144_283)"
        />
        <path
          d="M26.9937 19.236V10.533H24.0523V8.7324H31.8382V10.533H28.8969V19.236H26.9937Z"
          fill="url(#paint2_linear_144_283)"
        />
        <path
          d="M9.48743 31.0445L8.17196 20.6282H10.0451L11.0174 29.6755H11.2747L12.533 20.6282H15.7931L17.0514 29.6755H17.3087L18.281 20.6282H20.1541L18.8387 31.0445H15.5786L14.2917 21.7888H14.0344L12.7475 31.0445H9.48743Z"
          fill="url(#paint3_linear_144_283)"
        />
        <path
          d="M25.0525 31.2528C24.3662 31.2528 23.7418 31.0941 23.1794 30.7766C22.6265 30.4493 22.1833 29.9781 21.8496 29.363C21.5255 28.738 21.3635 27.9791 21.3635 27.0863V24.5864C21.3635 23.2471 21.7257 22.2204 22.4502 21.5061C23.1746 20.7819 24.1565 20.4198 25.3957 20.4198C26.6253 20.4198 27.5738 20.7621 28.2411 21.4466C28.9179 22.1212 29.2563 23.0388 29.2563 24.1995V24.259H27.3975V24.14C27.3975 23.7729 27.3212 23.4406 27.1687 23.143C27.0257 22.8454 26.8065 22.6122 26.511 22.4436C26.2155 22.265 25.8437 22.1757 25.3957 22.1757C24.7284 22.1757 24.2041 22.389 23.8228 22.8156C23.4415 23.2422 23.2509 23.8225 23.2509 24.5566V27.116C23.2509 27.8402 23.4415 28.4255 23.8228 28.8719C24.2041 29.3084 24.7379 29.5267 25.4243 29.5267C26.1106 29.5267 26.611 29.3382 26.9256 28.9612C27.2402 28.5843 27.3975 28.1081 27.3975 27.5327V27.3839H25.0239V25.7173H29.2563V31.0445H27.5118V30.0475H27.2545C27.1877 30.2161 27.0781 30.3947 26.9256 30.5832C26.7826 30.7717 26.5634 30.9304 26.2679 31.0594C25.9724 31.1883 25.5672 31.2528 25.0525 31.2528Z"
          fill="url(#paint4_linear_144_283)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.61286 2.40782C4.68489 2.40782 2.3113 4.88053 2.3113 7.93077C2.3113 8.59568 1.7939 9.13469 1.15565 9.13469C0.517403 9.13469 0 8.59568 0 7.93077C0 3.55073 3.40839 0 7.61286 0H32.1994C36.5075 0 40 3.63832 40 8.12641V27.5696C40 28.2345 39.4826 28.7735 38.8443 28.7735C38.2061 28.7735 37.6887 28.2345 37.6887 27.5696V8.12641C37.6887 4.96812 35.231 2.40782 32.1994 2.40782H7.61286Z"
          fill="url(#paint5_linear_144_283)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.15565 13.1828C1.7939 13.1828 2.3113 13.7219 2.3113 14.3868V31.8736C2.3113 35.0319 4.76897 37.5922 7.80065 37.5922H17.3926C18.0308 37.5922 18.5482 38.1312 18.5482 38.7961C18.5482 39.461 18.0308 40 17.3926 40H7.80065C3.49247 40 0 36.3617 0 31.8736V14.3868C0 13.7219 0.517403 13.1828 1.15565 13.1828Z"
          fill="url(#paint6_linear_144_283)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_144_283"
            x1="1.11688e-07"
            y1="17.7871"
            x2="37.8094"
            y2="17.7871"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_144_283"
            x1="1.11688e-07"
            y1="17.7871"
            x2="37.8094"
            y2="17.7871"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_144_283"
            x1="1.11688e-07"
            y1="17.7871"
            x2="37.8094"
            y2="17.7871"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_144_283"
            x1="1.11688e-07"
            y1="17.7871"
            x2="37.8094"
            y2="17.7871"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_144_283"
            x1="1.11688e-07"
            y1="17.7871"
            x2="37.8094"
            y2="17.7871"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_144_283"
            x1="1.30011"
            y1="11.4854"
            x2="44.6523"
            y2="26.721"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0094E9" />
            <stop offset="0.479167" stop-color="#C154C5" />
            <stop offset="1" stop-color="#FF4B3C" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_144_283"
            x1="1.30011"
            y1="14.4771"
            x2="13.348"
            y2="38.2882"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00758C" />
            <stop offset="0.526042" stop-color="#00916A" />
            <stop offset="1" stop-color="#25A45B" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <home>
      <a href="#home">Home</a>
    </home>
    <aboutUs>
      <a href="#aboutus">About Us</a>
    </aboutUs>
    <ourGoals>
      <a href="#ourgoals">Our Goals</a>
    </ourGoals>
    <ourTeam>
      <a href="#ourteam">Our Team</a>
    </ourTeam>
    <nftDappCentral>
      <a href="#nftdaapcentral">NFT DApp Central</a>
    </nftDappCentral>

    <LastWrapper>
      <btn1>
        <a
          style={{ textDecoration: "none", color: "#FFFFFF" }}
          href="https://trello.com/b/cT8mF8wz/nft-wg"
        >
          Our Workspace
        </a>
      </btn1>
      <btn2> Join Our Community</btn2>
    </LastWrapper>
  </Header>
);
