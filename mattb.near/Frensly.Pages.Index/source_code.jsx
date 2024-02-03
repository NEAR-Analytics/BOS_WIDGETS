const $ = VM.require("sdks.near/widget/Loader");
const { useSharedContext } = $("@sdks/hooks");
const { RoutesManager } = $("@sdks/routes-manager");
const OWNER = "mattb.near";

const Main = styled.div`
    border-radius:15px;
    overflow:hidden;
    background: #fff;
    border: 2px solid rgba(0,0,0,.05);
`;

const Wrapper = styled.div`
    position:relative;
    min-height:100vh;
`;

const { Route, RouterView } = new RoutesManager(State, state, {
  home: <Widget src={`${OWNER}/widget/Frensly.Pages.Home`} />,
  explore: <>Explore</>,
});

const { Toolbar } = useSharedContext({
  with: [State, state],
  from: [`${OWNER}/widget/Frensly.Components.Toolbar`],
});

return (
  <>
    <Main>
      <Wrapper>
        <Toolbar props={{ Route }}></Toolbar>
        <RouterView />
      </Wrapper>
    </Main>
  </>
);
