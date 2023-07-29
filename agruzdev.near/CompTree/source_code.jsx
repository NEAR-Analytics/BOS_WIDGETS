State.init({
  components: null,
});

const onChange = (value) => {
  State.update({ components: value?.result });
};

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Item = styled.div`
  margin-top: 10px;
`;

return (
  <Main>
    <Item>
      <Widget
        src={"hack.near/widget/ComponentSearch"}
        props={{ onChange: onChange }}
      />
    </Item>
    {state.components && state.components.length !== 0
      ? state.components.map((component) => (
          <Item>
            <Widget
              src={"agruzdev.near/widget/CompTree.View.ComponentCard"}
              props={{ src: component.widgetSrc }}
            />
          </Item>
        ))
      : null}
  </Main>
);
