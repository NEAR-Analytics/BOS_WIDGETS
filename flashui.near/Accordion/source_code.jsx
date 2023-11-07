let data = props.data || [];
let children = props.children || null;
let listElement = data.map((d, index) => (
  <Widget
    src="flashui.testnet/widget/AccordionItem"
    props={{
      title: d.title,
      content: d.content,
      show: d.show,
    }}
  />
));

return (
  <>
    <div className="accordion">
      {listElement}
      {children}
    </div>
  </>
);
