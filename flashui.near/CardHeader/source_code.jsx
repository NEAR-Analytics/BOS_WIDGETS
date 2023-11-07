let width = props.width ?? "100%";
let padding = props.padding ?? ".5rem";
let margin = props.margin ?? null;
let background = props.background ?? null;
let border = props.border ?? null;
let borderRadius = props ?? null;
let textAlign = props ?? null;
let children = props.children ?? null;

const CardHeader = styled.div`
    width: ${width};
    padding: ${padding};
    margin: ${margin};
    background: ${background};
    border: ${border};
    border-radius: ${borderRadius};
    font-size: 1.5rem;
    text-align: ${textAlign};
    font-weight: bold;
`;

return <CardHeader>{children}</CardHeader>;
