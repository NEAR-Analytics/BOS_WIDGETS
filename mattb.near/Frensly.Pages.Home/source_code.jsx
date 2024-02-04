const Sections = styled.div`
  display:flex;
  
  > div {
    :first-of-type {
       width:65%;
       flex-shrink:0;
    }
  }
`;

return (Store, status, props) => {
  if (
    status.loadedHeader &&
    status.loadedRecentlyVerified &&
    status.loadedHowToJoin &&
    !status.loadedHome
  ) {
    Store.update({ loadedHome: true });
  }

  return (
    <>
      <Widget
        src="mattb.near/widget/Frensly.Components.Header"
        onLoad={Store.update({ loadedHeader: true })}
      />
      <Sections>
        <Widget
          src="mattb.near/widget/Frensly.Components.RecentlyVerified"
          onLoad={Store.update({ loadedRecentlyVerified: true })}
        />
        <Widget
          src="mattb.near/widget/Frensly.Components.HowToJoin"
          onLoad={Store.update({ loadedHowToJoin: true })}
        />
      </Sections>
    </>
  );
};
