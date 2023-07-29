State.init({
  components: null,
});

const onChange = (value) => {
  State.update({ components: value?.result });
};

return (
  <>
    <Widget
      src={"hack.near/widget/ComponentSearch"}
      props={{ onChange: onChange }}
    />
    {state.components && state.components.length !== 0 ? <></> : null}
  </>
);
