let EvenBackground = props.EvenBackground ?? null;
let OddBackground = props.OddBackground ?? null;
let children = props.children ?? null;

const TableRow = styled.tr`
    &:nth-child(even) {
        background: ${EvenBackground};        
    }
    &:nth-child(odd) {
        background: ${OddBackground};
    }
`

return (
    <TableRow>{children}</TableRow>
)