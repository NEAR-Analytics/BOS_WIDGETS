const footer1 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588098/rafflestore/x_abhrox.svg";
const footer2 =
  "https://res.cloudinary.com/dfbqtfoxu/image/upload/v1700588097/rafflestore/near_uwk1hd.svg";

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

return (
  <Footer>
    <Title>Build on #BOS</Title>
    <img src={footer1} width="20px" height="20px" alt="footer" />
    <img src={footer2} width="20px" height="20px" alt="footer" />
  </Footer>
);
