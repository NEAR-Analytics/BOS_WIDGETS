let width = props.width ?? "100%";
let border = props.border ?? "none";
let borderTop = props.borderTop ?? null;
let borderBottom = props.borderBottom ?? null;
let borderLeft = props.borderLeft ?? null;
let borderRight = props.borderRight ?? null;
let margin = props.margin ?? ".5rem";
let maxWidth = props.maxWidth ?? null;
let minWidth = props.minWidth ?? null;
let background = props.background ?? null;
let boxShadow = props.boxShadow ?? null;
let overflow = props.overflow ?? null;
let children = props.children ?? null;

const Table = styled.table`
    width: ${width};
    max-width: ${maxWidth};
    min-width: ${minWidth};
    background: ${background};
    border: ${border};
    border-top: ${borderTop};
    border-bottom: ${borderBottom};
    border-left: ${borderLeft};
    border-right: ${borderRight};
    margin: ${margin};
    box-shadow: ${boxShadow};
    overflow: ${overflow};
`;

return <Table>{children}</Table>;
