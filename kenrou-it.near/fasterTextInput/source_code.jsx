State.update({ text: props.firstText });

const returnText = (e) => {
  return e.target.value;
};
const stateUpdate = props.stateUpdate;
const filterText = props.filterText ?? returnText;

return (
  <input
    className="form-control mt-2"
    value={props.forceClear ? "" : state.text}
    readonly={props.editable ? "readonly" : false}
    disabled={props.editable ? "disabled" : false}
    onBlur={() => stateUpdate({ articleId: state.text })}
    onChange={(e) => {
      State.update({
        text: filterText(e),
      });
      props.forceClear && props.stateUpdate({ clearArticleId: false });
    }}
  />
);
