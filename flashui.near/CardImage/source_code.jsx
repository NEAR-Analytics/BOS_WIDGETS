let width = props.width ?? "auto";
let height = props.height ?? "auto";
let src = props.src ?? null;
let borderRadius = props.borderRadius ?? null;

const CardImage = styled.div`
    width: ${width};
    height: ${height};
    background-image: url(${src});
    background-position: center;
    background-repeat: no-repeat, repeat;
    background-size: contain;
    border-bottom: .1rem solid rgba(0, 0, 0, .3);
    border-radius: ${borderRadius};
`;

return <CardImage />;
