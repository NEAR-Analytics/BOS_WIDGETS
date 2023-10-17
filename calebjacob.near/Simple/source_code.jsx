console.log(props.item);

return (
  <div>
    <p>Hello World: {props.item.id}</p>
    <Widget
      src="calebjacob.near/widget/NestedSimple"
      props={{ item: props.item }}
    />
  </div>
);
