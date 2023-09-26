const desktopImage =
  "https://ipfs.near.social/ipfs/bafkreib6tjp2xnrshhzepmahr36f7yunksw7m66rcivexdxznaxzol5no4";
const mobileImage = desktopImage;

const Header = styled.img`
    @media (max-width: 650px) {    
         content:url(${mobileImage});   
    }
`;

return <Header src={desktopImage} style={{ width: "100%" }} />;
