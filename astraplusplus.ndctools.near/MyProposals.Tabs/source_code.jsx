const { tabs, tab } = props;

State.init({
  tab: "",
  tabs: {},
});

const update = (newState) => State.update(newState);

return (
  <div className="w-100">
    <Widget
      src={`/*__@appAccount__*//widget/DAO.Layout.Tabs`}
      props={{
        tabs: state.tabs,
        tab: state.tab,
        allowHref: false,
        update,
      }}
    />
  </div>
);
