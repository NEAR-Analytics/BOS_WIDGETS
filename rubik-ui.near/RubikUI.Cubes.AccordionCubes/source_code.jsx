const { Cube } = VM.require("rubik-ui.near/widget/RubikUI.Cubes.Cube") || {
  Cube: () => <></>,
};

const { AccordionFacet, AccordionItemFacet } = VM.require(
  "rubik-ui.near/widget/RubikUI.Facets.AccordionFacets"
) || {
  AccordionFacet: styled.div``,
  AccordionItemFacet: styled.div``,
};

const Accordion = ({ children, ...props }) => {
  return (
    <Cube as="ul" apply={AccordionFacet} {...props}>
      {children}
    </Cube>
  );
};

const AccordionItem = ({ children, ...props }) => {
  return (
    <Cube as="li" apply={AccordionItemFacet} {...props}>
      {children}
    </Cube>
  );
};

return (
  <>
    <Accordion
      extend={MyAccordionExtension}
      onClick={() => console.log("Hello world!")}
      width="800px"
      borderTop="4px solid #000"
    >
      {Array.from([1, 2, 3]).map((data, idx) => (
        <AccordionItemFacet as="li">{idx}</AccordionItemFacet>
      ))}
    </Accordion>
  </>
);
