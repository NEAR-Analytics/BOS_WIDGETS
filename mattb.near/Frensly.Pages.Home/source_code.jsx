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
    <Widget src="mattb.near/widget/Frensly.Components.Header" loading="Loading..." />

    <Sections>
      <Widget src="mattb.near/widget/Frensly.Components.RecentlyVerified" loading="Loading..." />
      <Widget src="mattb.near/widget/Frensly.Components.HowToJoin" loading="Loading..." />
    </Sections>
  </>
);
