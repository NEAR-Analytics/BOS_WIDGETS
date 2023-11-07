let children = props.children;
let textAlign = props.textAlign;
let verticalAlign = props.verticalAlign;
let padding = props.padding;
let margin = props.margin;

const ListItem = styled.li`
    text-align: ${textAlign};
    vertical-align: ${verticalAlign};
    padding: ${padding};
    margin: ${margin};
`;

return <ListItem>{children}</ListItem>;
