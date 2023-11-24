const WrapperContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #00EC97;
  margin-bottom: 10px;
  text-align: center;
`;

const Description = styled.p`
  margin: 10px 0;
  color: #151515;
  text-align: center;
`;

const WidgetContainer = styled.div`
  margin-top: 20px;
`;

return (
  <WrapperContainer>
    <Title>Community Event?</Title>
    <Description>Would you go to a monthly NEAR community event?</Description>
    <Description>
      If YES: Enter the city you would like to attend the event in and click
      SUBMIT.
    </Description>
    <Description>If NO: Click NO</Description>
    <Description>
      You may enter multiple cities and browse existing votes.
    </Description>
    <WidgetContainer>
      <Widget src="communityevent.near/widget/vote_count" />
    </WidgetContainer>
    <WidgetContainer>
      <Widget src="communityevent.near/widget/vote" />
    </WidgetContainer>
    <WidgetContainer>
      <Widget src="communityevent.near/widget/city_list" />
    </WidgetContainer>
  </WrapperContainer>
);
