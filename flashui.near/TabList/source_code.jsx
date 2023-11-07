let data = props.data || [];
let children = props.children || null;
let listElement = data.map((d, index) => (
  <Widget
    src="flashui.testnet/widget/TabListItem"
    props={{
      targetPanel: d.targetPanel,
      text: d.text,
      active: d.active,
    }}
  />
));

return (
  <>
    <ul class="nav nav-tabs" role="tablist">
      {listElement}
      {children}
    </ul>
  </>
);
