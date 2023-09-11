const Owner = "socializer.near";

State.init({
  sate: false,
});

//Styles

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: stretch;
  flex-direction: column;
  background: white;
  overflow: auto;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 96px);
  flex-direction: row;
  background: white;
  overflow: auto;
  position: relative;
  padding-bottom: 15px;
`;

return (
  <Wrapper>
    <Widget src={`${Owner}/widget/Header`} />
    <Content>
      <Widget src={`${Owner}/widget/Sidebar`} />
      <Widget src={`${Owner}/widget/Dashboard`} />
    </Content>
  </Wrapper>
);
