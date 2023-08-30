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
    <Widget
      src={`bozon.near/widget/WidgetHistory.History`}
      props={{
        widgetPath: state.widgetPath,
      }}
    />
  </div>
);
