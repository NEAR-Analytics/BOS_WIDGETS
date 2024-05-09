const generateStyleFromProps = props => {
  return Object.keys(props).reduce((styleString, prop) => {
    const kebabCaseProp = prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    if (props[prop]) {
      styleString += `${kebabCaseProp}: ${props[prop]}!important;\n`;
    }
    return styleString;
  }, '');
};


const Facet = styled.div`
  ${props => generateStyleFromProps(props)}
`;

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

const Cube = ({ as: Component, apply: Facet, extend: CustomFacetCSS, onClick, onMouseEnter, onMouseLeave, onFocus, onBlur, onScroll, children, ...rest }) => {
    const FinalFacet = styled(Facet)`
        ${CustomFacetCSS || ''}
    `;
    
    const Wrapper = FinalFacet || Component || 'div';
    
    return (
        <Wrapper 
            as={Component} 
            onClick={onClick} 
            onMouseEnter={onMouseEnter} 
            onMouseLeave={onMouseLeave} 
            onFocus={onFocus} 
            onBlur={onBlur} 
            onScroll={onScroll} 
            {...rest}
        >
            {children}
        </Wrapper>
    );
};

const Accordion = ({ children, ...props }) => {
    return <Cube as="ul" apply={AccordionFacet} {...props}>
        {children}
    </Cube>;
}

const MyAccordionExtension = `
    background-color:red;
`;

return <>
<Accordion extend={MyAccordionExtension} onClick={() => console.log("Clicked")} maxWidth="800px">
    {Array.from([1,2,3]).map((data, idx) => <AccordionItemFacet as="li">{idx}</AccordionItemFacet>)}
</Accordion>
</>