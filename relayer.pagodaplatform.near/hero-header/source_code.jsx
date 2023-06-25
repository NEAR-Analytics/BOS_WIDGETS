const HeroWrapper = styled.div`
  padding: 32px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  font-weight: normal;
`;

// const HeroTextHeader = ({ title, subtitle }) => {
return (
  <HeroWrapper>
    <Title>{props.title}</Title>
    <Subtitle>{props.subtitle}</Subtitle>
  </HeroWrapper>
);
// };

// return <HeroTextHeader title={props.title} subtitle={props.subtitle} />;
