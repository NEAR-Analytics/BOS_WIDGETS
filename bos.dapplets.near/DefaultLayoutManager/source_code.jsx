if (!props.widgets || props.widgets.length === 0) return <></>;

return (
  <>
    {props.widgets.map((widget, i) => (
      <Widget key={i} src={widget.src} props={widget.props} />
    ))}
  </>
);
