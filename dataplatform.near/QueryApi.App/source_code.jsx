const view = props.view;
const path = props.path;
const tab = props.tab;
const activeIndexerView = props.activeIndexerView;
const selectedIndexerPath = props.selectedIndexerPath;

return (
  <Widget
    src={`dataplatform.near/widget/QueryApi.Dashboard`}
    props={{
      view,
      path,
      tab,
      selectedIndexerPath,
      activeIndexerView
    }}
  />
);
