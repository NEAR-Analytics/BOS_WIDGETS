const desktopImage =
  "https://ipfs.near.social/ipfs/bafkreifyeca44fyfg4nvtwm5kclfawstse33mjde5wmmj67jyc73cjdlz4";
const mobileImage =
  "https://ipfs.near.social/ipfs/bafkreid6crz4hcku7xaaqkvafogzohky22gcx44mvfaymx22dtg2chvime";

const Header = styled.img`
    @media (max-width: 650px) {    
         content:url(${mobileImage});   
    }
`;

return <Header src={desktopImage} style={{ width: "100%" }} />;
