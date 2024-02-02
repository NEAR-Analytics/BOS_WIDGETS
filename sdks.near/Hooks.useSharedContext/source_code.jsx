// Experimental hook
const useSharedContext = ({ with: [Store, status], from: widgetsSrc }) => {
  Store.init({
    app: {},
    initialized: false,
  });

  let content = Object.fromEntries(
    widgetsSrc.map((widget) => {
      let breadcrumb = widget.split("/");
      let name = breadcrumb.pop().split(".").pop();
      return [name, VM.require(widget)];
    })
  );

  const checkLoaded = () =>
    setTimeout(() => {
      if (
        Object.keys(content) &&
        typeof content[Object.keys(content).pop()] === "function"
      ) {
        Store.update({ loaded: true, app: content });
      } else {
        checkLoaded();
      }
    }, 300);

  if (!status.initialized) {
    Store.update({
      initialized: true,
      loaded: false,
    });
  }

  if (!status.loaded) {
    checkLoaded();
  }

  return status.loaded
    ? Object.fromEntries(
        widgetsSrc.map((widget) => {
          let breadcrumb = widget.split("/");
          let name = breadcrumb.pop().split(".").pop();
          return [name, () => status.app[name](Store, status)];
        })
      )
    : Object.fromEntries(
        widgetsSrc.map((widget) => {
          let breadcrumb = widget.split("/");
          let name = breadcrumb.pop().split(".").pop();
          return [name, () => <>Loading</>];
        })
      );
};

const { Toolbar } = useSharedContext({
  with: [State, state],
  from: [`mattb.near/widget/Frensly.Components.Toolbar`],
});

return (
  <>
    <Toolbar></Toolbar>
  </>
);
