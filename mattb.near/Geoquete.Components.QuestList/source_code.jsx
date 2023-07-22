const Main = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    align-items:flex-start;
    flex-wrap:wrap;

    & > div {
        margin-top:15px;
        
        &:not(:last-of-type) {
            margin-right:15px;
        }
    }

`;

return (
  <Main>
    <Widget src="mattb.near/widget/Geoquete.Components.Quest" />
    <Widget src="mattb.near/widget/Geoquete.Components.Quest" />
    <Widget src="mattb.near/widget/Geoquete.Components.Quest" />
    <Widget src="mattb.near/widget/Geoquete.Components.Quest" />
    <Widget src="mattb.near/widget/Geoquete.Components.Quest" />
  </Main>
);
