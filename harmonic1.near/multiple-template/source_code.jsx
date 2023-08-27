const Wrapper = styled.div`
  /* Your styling for the overall wrapper */
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlexChild = styled.div`
  border: 1px solid black;
  border-radius: 1rem;
  flex: 1;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
    margin-left: 10px;
  }
`;

return (
  <Wrapper>
    <div>
      <Widget
        src="efiz.near/widget/every.thing.raw"
        props={{ path: "harmonic1.near/thing/artist/jas" }}
      />
    </div>
    <FlexContainer>
      <FlexChild>
        <Widget
          src="harmonic1.near/widget/every.thing.view"
          props={{ path: "harmonic1.near/thing/artist/jas" }}
        />
      </FlexChild>
      <FlexChild>
        <Widget
          src="harmonic1.near/widget/every.thing.view"
          props={{
            path: "harmonic1.near/thing/artist/jas",
            options: {
              templateOverride: "harmonic1.near/widget/artist-content-template",
            },
          }}
        />
      </FlexChild>
    </FlexContainer>
  </Wrapper>
);
