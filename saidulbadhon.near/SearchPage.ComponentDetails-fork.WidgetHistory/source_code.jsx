/*
---props---

props.widgetPath?: string,

*/

const initWidgetPath = props.widgetPath || "devgovgigs.near/widget/Ideas";

State.init({
  widgetPath: initWidgetPath,
});

return (
  <div>
    <div class="input-group mb-3">
      <input
        class="form-control"
        placeholder={initWidgetPath}
        defaultValue={state.widgetPath || initWidgetPath}
        onBlur={(e) => {
          State.update({
            widgetPath: e.target.value,
          });
        }}
      />
    </div>
    <Widget
      src={`bozon.near/widget/WidgetHistory.History`}
      props={{
        widgetPath: state.widgetPath,
      }}
    />
  </div>
);
