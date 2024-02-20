const Cube = ({
  as: DOMComponent,
  apply: Facet,
  extend: CustomFacetCSS,
  attributes: CubeAttributes,
  options: CubeOptions,
  events: CubeEvents,
  state: CubeState,
  children,
  ...Properties
}) => {
  CubeAttributes ??= {};
  CubeOptions ??= {};
  CubeEvents ??= {};
  CubeState ??= null;

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
        prop in CubeAttributes && Properties[prop] in CubeAttributes[prop]
    )
    .map((prop) => CubeAttributes[prop][Properties[prop]]);

  const optionClasses = Object.keys(CubeOptions)
    .filter((option) => option in Properties)
    .map((option) => CubeOptions[option]);

  const combinedEventHandlers = Object.keys(CubeEvents).reduce(
    (events, event) => {
      if (event in Properties) {
        const CustomEvent = Properties[event];
        delete Properties[event];
          
        return {
          ...events,
          [event]: (e) => {
            CustomEvent(e);
            CubeEvents[event](e, CubeState);
          },
        };
      }

      return {
        ...events,
        [event]: (e) => CubeEvents[event](e, CubeState),
      };
    },
    {}
  );

  const classNames = [...attributeClasses, ...optionClasses].join(" ");
  const Element = styled(Facet || DOMComponent || styled.div``)`
      ${CustomFacetCSS || ""}
      ${mediaStyles || ""}
  `;

  return (
    <Element
      as={DOMComponent}
      className={classNames}
      {...combinedEventHandlers}
      {...Properties}
    >
      {children}
    </Element>
  );
};

return {
  Cube,
};
