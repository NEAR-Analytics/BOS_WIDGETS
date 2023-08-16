const view = props.view;
const path = props.path;
const tab = props.tab;
const selectedIndexerPath = props.selectedIndexerPath;

return (
  <Widget
    src={`dev-queryapi.dataplatform.near/widget/QueryApi.Dashboard`}
    props={{
      view,
      path,
      tab,
      selectedIndexerPath,
    }}
  />
);
