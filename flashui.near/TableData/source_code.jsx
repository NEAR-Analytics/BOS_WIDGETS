let children = props.children ?? null;
let border = props.border ?? "none";
let padding = props.padding ?? ".5rem 1rem";
let textAlign = props.textAlign ?? "center";
let verticalAlign = props.verticalAlign ?? "center";
let background = props.background ?? null;
let borderTop = props.borderTop ?? null;
let borderBottom = props.borderBottom ?? null;
let borderLeft = props.borderLeft ?? null;
let borderRight = props.borderRight ?? null;
let boxShadow = props.boxShadow ?? null;
let fontSize = props.fontSize ?? "1rem";
let fontWeight = props.fontWeight ?? "regular";

const TableData = styled.td`    
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    border: ${border};   
    padding: ${padding};   
    text-align: ${textAlign};    
    vertical-align ${verticalAlign}:    
    background: ${background};    
    border-top: ${borderTop};    
    border-bottom: ${borderBottom};    
    border-left: ${borderLeft};    
    border-right: ${borderRight}; 
    box-shadow: ${boxShadow};
`;
return <TableData>{children}</TableData>;
