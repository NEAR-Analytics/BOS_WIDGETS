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
      src={`saidulbadhon.near/widget/SearchPage.ComponentDetails-fork.WidgetHistory.History`}
      props={{
        widgetPath: state.widgetPath,
        theme: props.theme,
        copyToClipboard: props.copyToClipboard
      }}
    />
  </div>
);
