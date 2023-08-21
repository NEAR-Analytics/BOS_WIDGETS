const { tosName, targetComponent, logOut } = props;
const targetProps = props?.targetProps || {};
const acceptanceKey = tosName; // may change

return (
  <div>
    <Widget src={targetComponent} props={targetProps} />
  </div>
);
