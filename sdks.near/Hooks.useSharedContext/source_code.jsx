// Experimental hook
const useSharedContext = ({ with: [Store, status], from: widgetsSrc }) => {
  Store.init({
    app: {},
    initialized: false,
  });

  if (!status.initialized) {
    Store.update({
      app: Object.fromEntries(
        widgetsSrc.map((widget) => {
          let breadcrumb = widget.split("/");
          let name = breadcrumb.pop().split(".").pop();
          return [name, VM.require(widget)];
        })
      ),
      initialized: true,
      loaded:
        (Object.keys(status.app) &&
          typeof status.app[Object.keys(status.app).pop()] === "function") ||
        false,
    });
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

return useSharedContext;
