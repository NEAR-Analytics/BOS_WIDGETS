const { components, ...propsProps } = props;

return (
  <>
    {components.map(({ src, props }, i) => (
      <Widget key={i} src={src} props={{ ...propsProps, ...props }} />
    ))}
  </>
);
