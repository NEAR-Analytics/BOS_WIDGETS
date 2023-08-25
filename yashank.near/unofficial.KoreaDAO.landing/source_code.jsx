State.init({
  disp: false,
});

const Title = styled.h1`
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: #37cd82;
`;

const Wrapper = styled.div`
  padding: 4em;
  background: black;
  display : ${state.disp ? "block" : "none"}
`;
const Wrap = styled.div`
  padding: 4em;
  background: white;
  display : ${state.disp ? "block" : "none"}
`;

const Img = styled.img`
  scale: 0.8;
`;

const Block = styled.div`
  text-align: center;
`;

const Spred = styled.span`
  color : white
`;

const Heading = styled.h1`
  color : black;
  text-align : left;
  font-weight: bold;
`;

const handleDisplay = () => {
  State.update({
    disp: true,
  });
};
const P = styled.span`
  color : black;
`;
const Button = styled.button`
    display : ${!state.disp ? "block" : "none"}
`;

return (
  <>
    <Wrapper>
      <Block>
        <Img src="https://i.postimg.cc/zBQg2GfX/koreaDao.png" alt="KoreaDao" />
        <Title>
          <Spred>Korea</Spred> DAO
        </Title>
      </Block>
    </Wrapper>
    <Button onClick={handleDisplay}>Near Korea DAO</Button>
    <Wrap>
      <Title>
        <Heading>Introduction</Heading>
      </Title>
      <P>
        NEAR Protocol Korea DAO was created in April 2022 by CoinEasy, one of
        the largest crypto communities in South Korea.
      </P>
      <P>
        The mission of the NEAR Protocol Korea DAO is to spread the value of
        NEAR and blockchain technology through education and social activities
        among South Koreans. The community currently has over 900 members in the
        Telegram channel and over 5000 members in their Twitter.
      </P>
    </Wrap>
  </>
);
