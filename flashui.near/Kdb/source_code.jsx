let text = props.text ?? "";

const Kbd = styled.div`
    padding: 6px;
    height: 100%;
    background: #EDF2F6;
    display: inline;
    font-weight: bold;
    border: 0.5px solid #E2E8F0;
    border-radius: 15px;
`;

return <Kbd>{text}</Kbd>;
