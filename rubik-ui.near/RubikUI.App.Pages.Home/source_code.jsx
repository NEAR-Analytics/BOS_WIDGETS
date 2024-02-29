const { Rubik: Theme } = VM.require("rubik-ui.near/widget/RubikUI.Themes.RubikTheme") || {
  Rubik: (() => <></>)
};

const { RubikLogo: Logo } = VM.require("rubik-ui.near/widget/RubikUI.Components.Core") || {
  RubikLogo: (() => <></>)
};

const { Accordion, AccordionItem } = VM.require("rubik-ui.near/widget/RubikUI.Cubes.AccordionCubes") || {
  Accordion: (() => <></>),
  AccordionItem: (() => <></>)
};

const { AccordionFacet } = VM.require("rubik-ui.near/widget/RubikUI.Facets.AccordionFacets") || {
  AccordionFacet: (() => <></>)
};

const MyAccordionFacet = styled(AccordionFacet || styled.div)`
  background-color:lightgreen;
  font-weight:bold;
  border-radius:5px;
  margin-top:20px;
`;

return (
  <Theme>
    <Logo></Logo>

    <p>Standard Accordion Cube:</p>
    <Accordion>
      {Array.from([1, 2, 3]).map((data, idx) => (
        <AccordionItem>{idx}</AccordionItem>
      ))}
    </Accordion>
    <br/><br/>
    <p>Inline Customized Accordion Cube (and media query at 800px) :</p>
    <Accordion
      mediaMaxWidth800="background-color:red"
      onClick={() => console.log("Accordion clicked!")}
      width="800px"
      fontWeight="bold"
    >
      {Array.from([1, 2, 3]).map((data, idx) => (
        <AccordionItem>{idx}</AccordionItem>
      ))}
    </Accordion>
    <br/><br/>

    <p>Accordion Cube with extended Facet:</p>
    <Accordion
      apply={MyAccordionFacet}
    >
      {Array.from([1, 2, 3]).map((data, idx) => (
        <AccordionItem>{idx}</AccordionItem>
      ))}
    </Accordion>

    <p></p>
  </Theme>
);
