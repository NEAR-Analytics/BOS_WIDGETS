const { Facet } = VM.require("rubik-ui.near/widget/RubikUI.Facets.Facet") || {
  Facet: styled.div``,
};

const AccordionFacet = styled(Facet)`
    padding:0;
    margin:0;
    width:100%;
    max-width:100%;
    background-color:rgba(0,0,0,.02);
    border-radius:20px;
    list-style:none;
    box-shadow:0 0 0 1px rgba(0,0,0,.05);
    transition:all .2s;

    :hover {
        box-shadow: 0 0 0 5px rgba(0,0,0,.05);
        transition:all .2s;
    }
`;

const AccordionItemFacet = styled(Facet)`
    margin:0;
    padding:0;
    width:100%;
    padding:13px;
    cursor:pointer;
    transition: all .2s;

    :hover {
        cursor:pointer;
        background-color:rgba(0,0,0,.01);
        transition: all .2s;
    }

    :not(:last-of-type) {
        border-bottom:3px solid rgba(0,0,0,.05);
    }
`;

return {
  AccordionFacet,
  AccordionItemFacet
};
