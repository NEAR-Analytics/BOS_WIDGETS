console.log({ components: props.components });

return (
  <>
    {props.components.map(({ src, props }, i) => (
      <Widget key={i} src={src} props={props} />
    ))}
  </>
);
