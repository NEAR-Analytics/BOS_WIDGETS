const desktopImage =
  "https://ipfs.near.social/ipfs/bafkreicjciucingvja4hli3wx4pla7rh5dhyxgirdsjbceaz3cs63orezi";
const mobileImage =
  "https://ipfs.near.social/ipfs/bafkreig3kjljw3o5dld3yteq7hnoniglmzvhac7r5ezpbdfetwcmc3gyde";

const Header = styled.img`
    @media (max-width: 650px) {    
         content:url(${mobileImage});   
    }
`;

return <Header src={desktopImage} style={{ width: "100%" }} />;
