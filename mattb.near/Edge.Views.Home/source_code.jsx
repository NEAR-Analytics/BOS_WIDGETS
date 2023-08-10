const WIDGET_OWNER = "mattb.near";

const Main = styled.div`
  position:relative;
`;
const HeaderWrapper = styled.div`
  position:fixed;
  top:0;
  left:0;
`;
const JumbotronWrapper = styled.div`
  margin-top:70px;
`;

return (
  <Main>
    <HeaderWrapper>
      <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.Header`} />
    </HeaderWrapper>
    <JumbotronWrapper>
      <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.HomeSection`} />
    </JumbotronWrapper>
  </Main>
);
