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
  const events = {
    onClick: (e, State) => {
      console.log("Parent event");
      State.init({ clicked: true });
      console.log(State.get("clicked"));
    },
  };

  return (
    <Cube as="ul" apply={AccordionFacet} events={events} {...props}>
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

return {
  Accordion,
  AccordionItem
};
