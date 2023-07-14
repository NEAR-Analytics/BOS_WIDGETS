State.init({ text: props.firstText });

const returnText = (e) => {
  return e.target.value;
};
const stateUpdate = props.stateUpdate;
const filterText = props.filterText ?? returnText;

return (
  <input
    className="form-control mt-2"
    value={state.text}
    onBlur={() => stateUpdate({ articleId: state.text })}
    onChange={(e) => {
      State.update({
        text: filterText(e),
      });
    }}
  />
);
