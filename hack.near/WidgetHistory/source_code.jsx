/*
---props---

props.widgetPath?: string,

*/

const initWidgetPath = props.widgetPath || "hack.near/widget/explore.things";

State.init({
  widgetPath: initWidgetPath,
});

return (
  <div>
    <h1 class="text-center">Widget History</h1>

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
      src={`hack.near/widget/WidgetHistory.History`}
      props={{
        widgetPath: state.widgetPath,
      }}
    />
  </div>
);
