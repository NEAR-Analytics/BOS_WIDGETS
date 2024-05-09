const $ = VM.require("sdks.near/widget/Loader");
const { useSharedContext } = $("@sdks/hooks");
const { RoutesManager } = $("@sdks/routes-manager");
const OWNER = "mattb.near";

const Main = styled.div`
    border-radius:15px;
    overflow:hidden;
    background: #fff;
    border: 2px solid rgba(0,0,0,.05);
    padding-bottom:1.8rem;
    margin-bottom:1rem;
`;

const Wrapper = styled.div`
    position:relative;
    min-height:100vh;
`;

const { Toolbar } = useSharedContext({
  with: [State, state],
  from: [`${OWNER}/widget/Frensly.Components.Toolbar`],
  skeletons: {
    Toolbar: VM.require("mattb.near/widget/Frensly.Skeletons.Toolbar"),
  },
});

const { Route, RouterView } = new RoutesManager(State, state, {
  home: <Widget src={`${OWNER}/widget/Frensly.Pages.Home`} />,
  explore: <Widget src={`${OWNER}/widget/Frensly.Pages.Explore`} />,
  frensly: <Widget src={`${OWNER}/widget/Frensly.Pages.Frens`} />,
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
