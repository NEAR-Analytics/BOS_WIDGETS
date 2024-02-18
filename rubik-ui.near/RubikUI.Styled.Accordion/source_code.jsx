const generateStyleFromProps = props => {
  return Object.keys(props).reduce((styleString, prop) => {
    const kebabCaseProp = prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    if (props[prop]) {
      styleString += `${kebabCaseProp}: ${props[prop]}!important;\n`;
    }
    return styleString;
  }, '');
};

const Cube = styled.div`
  ${props => generateStyleFromProps(props)}
`;

const Accordion = styled(Cube)`
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

const AccordionItem = styled(Cube)`
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

const props = {
    maxWidth: "800px",
    backgroundColor: "red"
};

return <>
<Accordion {...props}>
    {Array.from([1,2,3]).map((data, idx) => <AccordionItem as="li">{idx}</AccordionItem>)}
</Accordion>
</>