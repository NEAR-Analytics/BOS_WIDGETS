let width = props.width ?? "100%";
let padding = props.padding ?? ".5rem";
let margin = props.margin ?? null;
let background = props.background ?? null;
let border = props.border ?? null;
let borderRadius = props ?? null;
let textAlign = props ?? null;
let fontSize = props ?? "1rem";
let children = props.children ?? null;

const CardFooter = styled.div`
    width: ${width};
    padding: ${padding};
    margin: ${margin};
    background: ${background};
    border: ${border};
    border-radius: ${borderRadius};
    font-size: ${fontSize};
    text-align: ${textAlign};
    font-weight: bold;
`;

return <CardFooter>{children}</CardFooter>;
