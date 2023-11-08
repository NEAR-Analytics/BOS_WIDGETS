return (
  <div>
    {props.components.map(({ src, props }, i) => (
      <Widget key={i} src={src} props={props} />
    ))}
  </div>
);
