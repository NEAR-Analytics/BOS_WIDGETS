const Wrapper = styled.div`
    background: radial-gradient(
      circle,
       ${props.fromBackground}  30%,
       ${props.toBackground}  80%
    );

  padding: 25px 20px;
  border-radius:15px ;
  margin-top:40px ;
  margin-right:10px ;
  margin-left:10px ;


  @media (max-width: 1000px) {
    padding: 112px 24px;
  }
`;

const Text = styled.p`
  font-family: "FK Grotesk", sans-serif;
  font-size: ${(p) => p.size ?? "18px"};
  line-height: ${(p) => p.lineHeight ?? "1.5"};
  font-weight: ${(p) => p.weight ?? "400"};
  color: ${(p) => p.color ?? `${props.titlenelowBackground}`};
  margin: 0;
`;

const Logo = styled.div`
  height: 32px;
  svg {
    height: 100%;
  }
`;

const Container = styled.div`
  display: grid;
  gap: 45px;
  max-width: 1040px;
  margin: 0 auto;
`;

const Icons = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  a {
    display: block;
    transition: all 200ms;

    &:hover,
    &:focus {
      opacity: 0.7;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    gap: 24px;
  }
`;

const LinkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;

  div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  ul {
    display: grid;
    list-style: none;
    gap: 8px;
    margin: 0;
    padding: 0;
  }

  a {
    font-family: "FK Grotesk", sans-serif;
    font-size: 13px;
    line-height: 1.2;
    font-weight: 400;
    color: ${props.belowBackground};

    &:hover,
    &:focus,
    &:active {
      color: ${props.belowBackground};
      text-decoration: underline;
      outline: none;
    }
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

return (
  <div>
    <Wrapper>
      <Container>
        <Logo
          style={{
            "font-size": "20px",
            "font-weight": "bold",
            color: `${props.titleBackground}`,
          }}
        >
          Forefront Tak
        </Logo>

        <LinkGrid>
          <div>
            <Text size="16px" weight="400" style={{ "font-weight": "bold" }}>
              Tools
            </Text>
            <ul>
              <li>
                <a
                  href="https://near.social/forefront_tak.near/widget/Forefront.Home"
                  target="_blank"
                >
                  App
                </a>
              </li>
              <li>
                <a
                  href="https://flipsidecrypto.xyz/teams/Forefront_Tak"
                  target="_blank"
                >
                  Dashboards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <Text size="16px" weight="500" style={{ "font-weight": "bold" }}>
              Doc
            </Text>
            <ul>
              <li>
                <a href="" target="_blank">
                  Docs
                </a>
              </li>{" "}
            </ul>
          </div>

          <div>
            <Text size="16px" weight="500" style={{ "font-weight": "bold" }}>
              Contact
            </Text>
            <ul>
              <li>
                <a href="https://twitter.com/Forefront_Tak" target="_blank">
                  Twitter
                </a>
              </li>

              <li>
                <a
                  href="https://near.social/mob.near/widget/ProfilePage?accountId=forefront_tak.near"
                  target="_blank"
                >
                  Near Social
                </a>
              </li>
            </ul>
          </div>
        </LinkGrid>
      </Container>{" "}
      <p
        style={{
          "text-align": "center",
          "font-size": "15px",
          "margin-bottom": 0,
          "padding-top": "50px",
        }}
      >
        {" "}
        <a
          href="https://twitter.com/Lordking_Tv"
          target="_blank"
          style={{
            color: `${props.titleBackground}`,
          }}
        >
          Built by Lordking 👑
        </a>
      </p>
    </Wrapper>
  </div>
);
