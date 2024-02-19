const Cube = ({
  as: DOMComponent,
  apply: Facet,
  extend: CustomFacetCSS,
  attributes: FacetAttributes,
  options: FacetOptions,
  children,
  ...Properties
}) => {
  const hasMediaStyles = Object.keys(Properties).find((key) =>
    key.startsWith("media")
  );
  const mediaStyles = hasMediaStyles
    ? Object.keys(Properties).reduce((css, key) => {
        const match = key.match(/media(MinWidth|MaxWidth)(\d+)/);

        if (match) {
          const [_, type, width] = match;
          const mediaType = type === "MinWidth" ? "min-width" : "max-width";
          const style = Properties[key];
          css += `@media (${mediaType}: ${width}px) { ${style} } `;
        }

        return css;
      }, "")
    : "";

  const attributeClasses = Object.keys(Properties)
    .filter(
      (prop) =>
        prop in FacetAttributes && Properties[prop] in FacetAttributes[prop]
    )
    .map((prop) => FacetAttributes[prop][Properties[prop]]);

  const optionClasses = Object.keys(FacetOptions)
    .filter((option) => option in Properties)
    .map((option) => FacetOptions[option]);

  const classNames = [...attributeClasses, ...optionClasses].join(" ");
  const Element = styled(Facet || DOMComponent || styled.div``)`
      ${CustomFacetCSS || ""}
      ${mediaStyles || ""}
  `;

  return (
    <Element as={DOMComponent} className={classNames} {...Properties}>
      {children}
    </Element>
  );
};

return {
  Cube,
};
