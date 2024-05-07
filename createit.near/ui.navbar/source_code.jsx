const widget = (src, props, other) => (
  <Widget src={src} props={props} {...other} />
);


const { pages, onPageChange, template } = props;

State.init({
  mobileNavbarOpen: false,
});

const update = (k, v) => State.update({ [k]: v });

return (
  <>
    {widget(
      template ?? "createit.near/widget/templates.ui.navbar.default",
      {
        open: state.mobileNavbarOpen,
        setOpen: (v) => update("mobileNavbarOpen", v),
        pages,
        onPageChange,
      },
    )}
  </>
);
