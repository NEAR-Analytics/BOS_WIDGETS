const desktopImage = "https://nearcon.s3.amazonaws.com/speakers-hero.png";
const mobileImage = "https://nearcon.s3.amazonaws.com/speakers-hero-mobile.png";

const Header = styled.img`
    @media (max-width: 650px) {    
         content:url(${mobileImage});   
    }
`;

return <Header src={desktopImage} style={{ width: "100%" }} />;
