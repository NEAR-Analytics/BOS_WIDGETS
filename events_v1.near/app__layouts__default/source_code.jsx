return (
  <>
    <div>DEFAULT</div>
    {props.engine.renderComponent(
      props.__component.name,
      props.__component.props,
      'none'
    )}
  </>
);
