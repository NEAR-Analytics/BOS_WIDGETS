const WIDGET_OWNER = "mattb.near";

const Main = styled.div`
  position:relative;
`;
const HeaderWrapper = styled.div`
  position:sticky;
  top:0;
  left:0;
`;
const JumbotronWrapper = styled.div`
`;

return (
  <Main>
    <HeaderWrapper>
      <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.Header`} />
    </HeaderWrapper>
    <JumbotronWrapper>
      <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.HomeSection`} />
    </JumbotronWrapper>
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.StorySection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.MainTopicsSection`} />
  </Main>
);
