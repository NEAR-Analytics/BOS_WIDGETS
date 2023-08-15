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
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.SpeakersSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.HostsSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.SponsorsSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.ProgramSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.TicketsSection`} />
    <Widget src={`${WIDGET_OWNER}/widget/Edge.Components.Footer`} />
  </Main>
);
