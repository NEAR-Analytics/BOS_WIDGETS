const widget = (src, props, other) => (
  <Widget src={src} props={props} {...other} />
);


const { pages, onPageChange, templates, Children } = props;

State.init({
  mobileNavbarOpen: false,
});

const update = (k, v) => State.update({ [k]: v });

return (
  <>
    {/* I'm passing in a template that could be configured in the app provider? */}
    {widget(
      templates["NAVBAR"] ??
        "createit.near/widget/templates.ui.navbar.default",
      {
        open: state.mobileNavbarOpen,
        setOpen: (v) => update("mobileNavbarOpen", v),
        pages,
        onPageChange,
        Children,
      },
    )}
  </>
);
