const Sections = styled.div`
  display:flex;
  
  > div {
    :first-of-type {
       width:65%;
       flex-shrink:0;
    }
  }
`;

return (
  <>
    <Widget src="mattb.near/widget/Frensly.Components.Header" />

    <Sections>
      <Widget src="mattb.near/widget/Frensly.Components.RecentlyVerified" />
      <Widget src="mattb.near/widget/Frensly.Components.HowToJoin" />
    </Sections>
  </>
);
