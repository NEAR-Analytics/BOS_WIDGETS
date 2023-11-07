let direction = props.direction ?? "row";
let wrap = props.wrap ?? "wrap";
let justifyContent = props.justifyContent ?? null;
let alignItems = props.alignItems ?? null;
let alignContent = props.alignContent ?? null;
let spacing = props.spacing ?? null;
let width = props.width ?? "100%";
let background = props.background ?? null;
let children = props.children ?? null;

const Stack = styled.div`
    width: ${width};
    background: ${background};
    display: flex;
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    align-content: ${alignContent};
    gap: ${spacing};
`;

return <Stack>{children}</Stack>;
