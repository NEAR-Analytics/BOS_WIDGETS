const hackBox = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="209"
    height="45"
    viewBox="0 0 209 45"
    fill="none"
  >
    <path
      d="M102.993 44.4535L102.993 9.42469L133.213 0.546387H209V32.5818L178.841 44.4422L102.993 44.4535Z"
      fill="#00EC97"
    />
    <path
      d="M0.722656 41.3401V10.3444H3.23378V24.4696H17.86V10.3444H20.3711V41.3401H17.86V26.6835H3.23378V41.3401H0.722656Z"
      fill="#666666"
    />
    <path
      d="M27.3586 41.3401V19.0675L36.2136 10.1673H37.7115L46.5665 19.0675V41.3401H44.0554V31.5543H29.8697V41.3401H27.3586ZM29.8697 29.296H44.0554V19.953L36.9625 12.824L29.8697 19.953V29.296Z"
      fill="#666666"
    />
    <path
      d="M53.5099 19.7316C53.5099 13.3997 56.9903 9.99014 63.3782 9.99014C69.8543 9.99014 73.2465 13.3997 73.2465 19.7316H70.8675C70.8675 14.8609 68.2683 12.2927 63.4663 12.2927C58.6644 12.2927 56.0211 14.8609 56.0211 19.7316V31.9528C56.0211 36.8236 58.6644 39.3918 63.4663 39.3918C68.2683 39.3918 70.8675 36.7793 70.8675 31.9528H73.2465C73.2465 38.2405 69.8543 41.6943 63.3782 41.6943C56.9903 41.6943 53.5099 38.2405 53.5099 31.9528V19.7316Z"
      fill="#666666"
    />
    <path
      d="M80.4102 41.3401V10.3444H82.9213V24.4696H86.9303L97.107 14.241V10.3001H99.6181V15.1266L89.2212 25.5766L99.6181 36.0265V41.3401H97.107V36.9564L86.8863 26.6835H82.9213V41.3401H80.4102Z"
      fill="#666666"
    />
    <path
      d="M106.341 41.3401V10.3444H116.386C121.716 10.3444 124.624 13.134 124.624 18.2704C124.624 21.7685 123.17 24.2924 120.395 25.2666C124.139 26.1079 126.078 28.8975 126.078 32.9712C126.078 38.4176 122.95 41.3401 117.091 41.3401H106.341ZM108.852 26.595V39.0376H117.091C121.276 39.0376 123.567 36.8679 123.567 32.8384C123.567 28.809 121.276 26.595 117.091 26.595H108.852ZM116.386 12.6469H108.852V24.3367H116.386C120.086 24.3367 122.069 22.2999 122.069 18.4918C122.069 14.6838 120.086 12.6469 116.386 12.6469Z"
      fill="#666666"
    />
    <path
      d="M132.757 31.9971V19.6874C132.757 13.3554 136.237 9.99014 142.625 9.99014C149.057 9.99014 152.494 13.3554 152.494 19.6874V31.9971C152.494 38.2848 149.057 41.6943 142.625 41.6943C136.237 41.6943 132.757 38.2848 132.757 31.9971ZM135.268 19.6874V31.9971C135.268 36.8236 137.867 39.3918 142.625 39.3918C147.427 39.3918 149.982 36.7793 149.982 31.9971V19.6874C149.982 14.8609 147.427 12.2927 142.625 12.2927C137.867 12.2927 135.268 14.8609 135.268 19.6874Z"
      fill="#666666"
    />
    <path
      d="M159.217 33.5912L167.323 25.4437L159.217 17.3848V10.3444H161.728V16.4992L169.041 23.8497L176.354 16.4992V10.3444H178.865V17.3848L170.803 25.4437L178.865 33.5912V41.3401H176.354V34.4325L169.041 27.1263L161.728 34.4325V41.3401H159.217V33.5912Z"
      fill="#666666"
    />
  </svg>
);

const Root = styled.div`
    .hero {
        img {
            width: 100%;
        }
    }
    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        h1 {
            color: var(--near-org-black, #000);
            font-family: Inter;
            font-size: 30.6px;
            font-style: normal;
            font-weight: 700;
            line-height: 56px; /* 183.007% */
            text-transform: uppercase;
        }
        h2 {
            color: #00EC97;
            font-family: Inter;
            font-size: 30.6px;
            font-style: normal;
            font-weight: 700;
            line-height: 56px;
            text-transform: uppercase;
            margin-left: 20px;
        }
    }
    .top {
        h2 {
            color: #00EC97;
            font-family: Inter;
            font-size: 30.6px;
            font-style: normal;
            font-weight: 700;
            line-height: 56px;
            text-transform: uppercase;
        }
         p {
            color: var(--near-org-black, #000);
            font-family: Inter;
            font-size: 15.3px;
            font-style: normal;
            font-weight: 400;
            line-height: 33px; /* 215.686% */
         }
    }

    .middle {
        display: flex;
        flex-direction: row;
        align-items: center;
        h1 {
            color: var(--near-org-black, #000);
            font-family: Inter;
            font-size: 30.6px;
            font-style: normal;
            font-weight: 300;
            margin-bottom: 0;
            margin-top: 5px;
        }
         svg {
            height: 40px;
         }
    }
`;

return (
  <Root>
    <div className="hero">
      <img src="https://ipfs.near.social/ipfs/bafkreidtv2o3d5hmvkdr2cm6hztpxewyuxnd3uyxnlmawtaxnjfh7eyymi" />
    </div>
    <div className="header">
      <h1>What is</h1> <h2>WEBFUSION</h2>
    </div>
    <div className="top">
      <h2>LAGOS 2023</h2>
      <p>
        WebFusion is an educational initiative by DevHub and NEAR Africa,
        addressing the long-standing challenge of onboarding web2 developers to
        blockchain technology. This initiative bridges the gap between web2 and
        web3 technologies by educating traditional web developers on building
        components and decentralized apps using NEAR's blockchain operating
        system.
      </p>
    </div>
    <div className="middle">
      <h1>POWERED BY:</h1> {hackBox}
    </div>
  </Root>
);
