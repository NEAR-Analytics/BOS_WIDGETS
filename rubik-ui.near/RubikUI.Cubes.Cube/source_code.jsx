const Cube = ({
  as: DOMComponent,
  apply: Facet,
  extend: CustomFacetCSS,
  options: facetOptions,
  children,
  ...rest
}) => {
  const FinalFacet = Facet
    ? styled(Facet)`
        ${CustomFacetCSS || ""}
    `
    : null;
  const Wrapper = FinalFacet || DOMComponent || "div";
  const parseOptions = () => {
    return {};
  };

  return (
    <Wrapper as={DOMComponent} {...parseOptions(facetOptions)} {...rest}>
      {children}
    </Wrapper>
  );
};

return {
  Cube,
};
