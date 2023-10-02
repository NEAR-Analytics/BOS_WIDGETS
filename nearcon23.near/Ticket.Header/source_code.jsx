const desktopImage = "https://nearcon.s3.amazonaws.com/ticket-hero.png";
const mobileImage = "https://nearcon.s3.amazonaws.com/ticket-hero-mobile.png";

const Header = styled.img`
    @media (max-width: 650px) {    
         content:url(${mobileImage});   
    }
`;

return <Header src={desktopImage} style={{ width: "100%" }} />;
