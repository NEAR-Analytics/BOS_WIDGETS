const desktopImage =
  "https://ipfs.near.social/ipfs/bafkreigzwprpi2y6fpyasut4qn56x5lm3vwszjqspgolncr64uvjpewgxi";
const mobileImage =
  "https://ipfs.near.social/ipfs/bafkreigy5k3bj6fbn5tr37nb37cq3yucynyoaobtoqtcydjvyrad26dyam";

const Header = styled.img`
    @media (max-width: 650px) {    
         content:url(${mobileImage});   
    }
`;

return <Header src={desktopImage} style={{ width: "100%" }} />;
