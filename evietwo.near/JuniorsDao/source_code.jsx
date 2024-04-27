const Container = styled.div`
  display: block;
  
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;
`;

const Logo = styled.img`
  height: 80px;
  width: auto;
`;

const Body = styled.div`
  margin-top: 20px;
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: #333;
`;

return (
  <Container>
    {/* Body */}
    <Logo
      src="https://i.postimg.cc/668xPByn/Juniors-DAO.png"
      alt="Near Junirs DAO logo"
    ></Logo>
    <Body>
      <h2>Near Juniors DAO</h2>
      <p>
        Near Juniors DAO is a place where junior developers collaborate, learn,
        and contribute to projects in the Near Protocol ecosystem. The DAO
        provides opportunities for skill development, networking, and real-world
        experience in blockchain development.
      </p>
    </Body>
  </Container>
);
