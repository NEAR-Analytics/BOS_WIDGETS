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
const FooterContainer = styled.div`
position: absolute;
width: 1200px;
height: 240px;
left: 0px;
top: 5305px;
background: #1B1B1B;
`;
const FooterLogo = styled.div`
position:absolute;
 top:40px;
 left:60px;
`;
const FooterWrapper = styled.div`
display: flex;
flex-direction: row;
padding: 70px;
gap: 24px;

margin: 0 auto;
width: 480px;
height: 16px;


/* Inside auto layout */
flex: none;
order: 1;
flex-grow: 0;
margin: 0 auto;

`;
const FooterRightsWrapper = styled.div`
position:absolute;
 top:80px;
 left:250px;
 width: 1400px;
height: 16px;
flex: none;
order: 1;
flex-grow: 0;
margin: 0 auto;

`;
const FooterLine = styled.div`
position:absolute;
left:30px;
padding:100px;
flex: none;
order: 1;
flex-grow: 0;
`;
const FooterCopyright = styled.div`
position:absolute;
top:130px;
left:0px;
padding:0px;
flex: none;
order: 1;
flex-grow: 0;
`;
const CopyRightText = styled.div`
/* ©2023 NFT-WG. All rights reserved */

width: 292px;
height: 24px;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 150%;
/* identical to box height, or 24px */
display: flex;
align-items: center;
letter-spacing: -0.02em;

color: #FFFFFF;

mix-blend-mode: normal;

/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;


`;
return (
  <FooterContainer>
    <FooterLogo>
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.2426 28.8541V13.0986H17.6712L20.6774 26.8284H21.0667V13.0986H23.8783V28.8541H18.4498L15.4435 15.1243H15.0542V28.8541H12.2426Z"
          fill="url(#paint0_linear_144_224)"
        />
        <path
          d="M26.0826 28.8541V13.0986H35.5988V15.7995H28.9375V19.6034H35.0797V22.3043H28.9375V28.8541H26.0826Z"
          fill="url(#paint1_linear_144_224)"
        />
        <path
          d="M40.4905 28.8541V15.7995H36.0785V13.0986H47.7574V15.7995H43.3453V28.8541H40.4905Z"
          fill="url(#paint2_linear_144_224)"
        />
        <path
          d="M14.2311 46.5667L12.2579 30.9422H15.0676L16.5261 44.5132H16.9121L18.7995 30.9422H23.6896L25.577 44.5132H25.9631L27.4215 30.9422H30.2312L28.258 46.5667H23.3679L21.4376 32.6833H21.0515L19.1212 46.5667H14.2311Z"
          fill="url(#paint3_linear_144_224)"
        />
        <path
          d="M37.5788 46.8792C36.5493 46.8792 35.6127 46.6411 34.7691 46.165C33.9398 45.6739 33.2749 44.9671 32.7744 44.0445C32.2883 43.107 32.0452 41.9687 32.0452 40.6294V36.8796C32.0452 34.8707 32.5886 33.3306 33.6753 32.2592C34.7619 31.1729 36.2347 30.6298 38.0935 30.6298C39.938 30.6298 41.3607 31.1431 42.3616 32.1699C43.3768 33.1818 43.8844 34.5582 43.8844 36.2992V36.3885H41.0962V36.2099C41.0962 35.6594 40.9818 35.1609 40.753 34.7144C40.5385 34.268 40.2097 33.9183 39.7664 33.6654C39.3232 33.3975 38.7655 33.2636 38.0935 33.2636C37.0926 33.2636 36.3062 33.5835 35.7342 34.2234C35.1623 34.8632 34.8763 35.7338 34.8763 36.8349V40.6741C34.8763 41.7603 35.1623 42.6383 35.7342 43.3079C36.3062 43.9627 37.1069 44.29 38.1364 44.29C39.1659 44.29 39.9166 44.0073 40.3884 43.4418C40.8603 42.8764 41.0962 42.1621 41.0962 41.299V41.0758H37.5359V38.5759H43.8844V46.5667H41.2678V45.0712H40.8817C40.7816 45.3242 40.6172 45.5921 40.3884 45.8748C40.1739 46.1575 39.8451 46.3956 39.4018 46.5891C38.9586 46.7825 38.3509 46.8792 37.5788 46.8792Z"
          fill="url(#paint4_linear_144_224)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.4193 3.61174C7.02734 3.61174 3.46696 7.3208 3.46696 11.8962C3.46696 12.8935 2.69085 13.702 1.73348 13.702C0.776104 13.702 0 12.8935 0 11.8962C0 5.32609 5.11259 0 11.4193 0H48.299C54.7613 0 60 5.45748 60 12.1896V41.3544C60 42.3517 59.2239 43.1603 58.2665 43.1603C57.3091 43.1603 56.533 42.3517 56.533 41.3544V12.1896C56.533 7.45218 52.8465 3.61174 48.299 3.61174H11.4193Z"
          fill="url(#paint5_linear_144_224)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.73348 19.7743C2.69085 19.7743 3.46696 20.5828 3.46696 21.5801V47.8104C3.46696 52.5478 7.15345 56.3883 11.701 56.3883H26.0888C27.0462 56.3883 27.8223 57.1968 27.8223 58.1941C27.8223 59.1915 27.0462 60 26.0888 60H11.701C5.2387 60 0 54.5425 0 47.8104V21.5801C0 20.5828 0.776104 19.7743 1.73348 19.7743Z"
          fill="url(#paint6_linear_144_224)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_144_224"
            x1="1.67532e-07"
            y1="26.6807"
            x2="56.7142"
            y2="26.6807"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_144_224"
            x1="1.67532e-07"
            y1="26.6807"
            x2="56.7142"
            y2="26.6807"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_144_224"
            x1="1.67532e-07"
            y1="26.6807"
            x2="56.7142"
            y2="26.6807"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint3_linear_144_224"
            x1="1.67532e-07"
            y1="26.6807"
            x2="56.7142"
            y2="26.6807"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint4_linear_144_224"
            x1="1.67532e-07"
            y1="26.6807"
            x2="56.7142"
            y2="26.6807"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00C5FF" />
            <stop offset="0.335634" stop-color="#76A0D6" />
            <stop offset="0.617521" stop-color="#FEC9C4" />
            <stop offset="1" stop-color="#FAE2AD" />
          </linearGradient>
          <linearGradient
            id="paint5_linear_144_224"
            x1="1.95016"
            y1="17.228"
            x2="66.9785"
            y2="40.0815"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#0094E9" />
            <stop offset="0.479167" stop-color="#C154C5" />
            <stop offset="1" stop-color="#FF4B3C" />
          </linearGradient>
          <linearGradient
            id="paint6_linear_144_224"
            x1="1.95016"
            y1="21.7156"
            x2="20.0221"
            y2="57.4323"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#00758C" />
            <stop offset="0.526042" stop-color="#00916A" />
            <stop offset="1" stop-color="#25A45B" />
          </linearGradient>
        </defs>
      </svg>
    </FooterLogo>
    <FooterWrapper>
      <home>
        <a href="#home"> Home </a>
      </home>
      <aboutUs>
        {" "}
        <a href="#aboutus">About Us </a>
      </aboutUs>
      <ourGoals>
        <a href="#ourgoals"> Our Goals </a>
      </ourGoals>
      <ourTeam>
        {" "}
        <a href="#ourteam">Our Team</a>{" "}
      </ourTeam>
      <nftDappCentral>
        <a href="#nftdaapcentral"> NFT DApp Central </a>
      </nftDappCentral>
    </FooterWrapper>
    <FooterRightsWrapper>
      <FooterLine>
        <svg
          width="600"
          height="1"
          viewBox="0 0 600 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1320"
            y1="0.5"
            y2="0.5"
            stroke="white"
            stroke-opacity="0.24"
          />
        </svg>
      </FooterLine>
    </FooterRightsWrapper>
  </FooterContainer>
);
