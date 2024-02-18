const Cube = styled.div`
  display: ${props => props.display || ''};
  flex: ${props => props.flex || ''};
  flex-grow: ${props => props.flexGrow || ''};
  flex-shrink: ${props => props.flexShrink || ''};
  flex-basis: ${props => props.flexBasis || ''};
  flex-direction: ${props => props.flexDirection || ''};
  flex-wrap: ${props => props.flexWrap || ''};
  justify-content: ${props => props.justifyContent || ''};
  align-items: ${props => props.alignItems || ''};
  align-content: ${props => props.alignContent || ''};
  align-self: ${props => props.alignSelf || ''};
  order: ${props => props.order || ''};
  width: ${props => props.width || ''};
  height: ${props => props.height || ''};
  max-width: ${props => props.maxWidth || ''};
  max-height: ${props => props.maxHeight || ''};
  margin: ${props => props.margin || ''};
  margin-top: ${props => props.marginTop || ''};
  margin-right: ${props => props.marginRight || ''};
  margin-bottom: ${props => props.marginBottom || ''};
  margin-left: ${props => props.marginLeft || ''};
  padding: ${props => props.padding || ''};
  padding-top: ${props => props.paddingTop || ''};
  padding-right: ${props => props.paddingRight || ''};
  padding-bottom: ${props => props.paddingBottom || ''};
  padding-left: ${props => props.paddingLeft || ''};
  background: ${props => props.background || ''};
  color: ${props => props.color || ''};
  border: ${props => props.border || ''};
  border-top: ${props => props.borderTop || ''};
  border-right: ${props => props.borderRight || ''};
  border-bottom: ${props => props.borderBottom || ''};
  border-left: ${props => props.borderLeft || ''};
  border-radius: ${props => props.borderRadius || ''};
  border-top-left-radius: ${props => props.borderTopLeftRadius || ''};
  border-top-right-radius: ${props => props.borderTopRightRadius || ''};
  border-bottom-left-radius: ${props => props.borderBottomLeftRadius || ''};
  border-bottom-right-radius: ${props => props.borderBottomRightRadius || ''};
  box-shadow: ${props => props.boxShadow || ''};
  text-align: ${props => props.textAlign || ''};
  position: ${props => props.position || ''};
  top: ${props => props.top || ''};
  right: ${props => props.right || ''};
  bottom: ${props => props.bottom || ''};
  left: ${props => props.left || ''};
  z-index: ${props => props.zIndex || ''};
  overflow: ${props => props.overflow || ''};
  cursor: ${props => props.cursor || ''};
  transition: ${props => props.transition || ''};
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
    cursor:pointer!important;
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
<Accordion as="ul" {...props}>
    {Array.from([1,2,3]).map((data, idx) => <AccordionItem as="li">{idx}</AccordionItem>)}
</Accordion>
</>