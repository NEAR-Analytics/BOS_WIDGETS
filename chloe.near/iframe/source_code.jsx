// Existing styled components
const Container = styled.div`
  background-color: #000;
  color: #fff;
`;

const IframeContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  margin-bottom: 20px;
`;

// Updated styled component for Widget layout
const WidgetContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// New styled component for individual Widgets
const StyledWidget = styled.div`
  flex: 1;
  min-width: calc(25% - 10px);
  box-sizing: border-box;
  margin: 5px;
`;

return (
  <Container>
    {/* Embedding the iframe */}
    <IframeContainer>
      <iframe
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        src="https://pd.marmaj.org/"
        title="Marma-J-Gaming-iframe"
      ></iframe>
    </IframeContainer>

    {/* Widget layout */}
    <WidgetContainer>
      <StyledWidget>
        <Widget src={"jay100.near/widget/PixelParty-Widget"} />
      </StyledWidget>
      <StyledWidget>
        <Widget src={"jay100.near/widget/PixelPets-Widget"} />
      </StyledWidget>
      <StyledWidget>
        <Widget src={"jay100.near/widget/CH-Widget"} />
      </StyledWidget>
      <StyledWidget>
        <Widget src={"jay100.near/widget/CTT-Widget"} />
      </StyledWidget>
    </WidgetContainer>
  </Container>
);
