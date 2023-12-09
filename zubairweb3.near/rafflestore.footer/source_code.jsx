const horizon =
  "https://ipfs.near.social/ipfs/bafkreihszpflge5j3g35td67xh7fw5z37rgyumh75uzabqrfnpcjfag2we";
const devhub =
  "https://ipfs.near.social/ipfs/bafkreido4srg4aj7l7yg2tz22nbu3ytdidjczdvottfr5ek6gqorwg6v74";

const astra =
  "https://ipfs.near.social/ipfs/bafkreidmuwft6jc52qu6srew7scvvbirkir4cljq6ogta6kelnjs3rvimq";

const nfortune =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1702112062/nfortune_t2qkp8.jpg";

const Footer = styled.div`
background: #003C8C;
padding: 0.75rem 1rem;
display: flex;
gap: 0.75rem;
justify-content: center;
align-items: center;
width: 100%;
height: auto;
`;

const Title = styled.span`
color: #fff;
`;

const styledImg = styled.img`
width: 25px;
height: 25px;
border-radius: 50%;
`;

return (
  <Footer>
    <Title>Build on #BOS</Title>
    <styledImg src={nfortune} alt="footer" />
    <styledImg src={devhub} alt="footer" />
    <styledImg src={horizon} alt="footer" />
    <styledImg src={astra} alt="footer" />
  </Footer>
);
