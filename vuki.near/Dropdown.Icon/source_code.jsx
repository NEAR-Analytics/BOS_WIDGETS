const icon = props.icon ?? null;

const ImageContainer = styled.div`
display: flex;
column-gap: 0.5rem;
align-items: center;
justify-content: center;
width: 1.5rem;
height: 1.5rem;
`;

return <ImageContainer>{icon}</ImageContainer>;
