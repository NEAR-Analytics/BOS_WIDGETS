const Circle = styled.div`
    background-color: ${(props) => (props.active ? "#30C9F3" : "#BEBEBE")};
    padding:10px;
    border-radius:100px;
    display: flex;
width: 32px;
height: 32px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 10px;
 color:${(props) => (props.active ? "#fff" : "#404040")};
font-weight:700;
`;

const StepLabelContainer = styled.div`
    display: flex;
    opacity: ${(props) => (props.active ? "1" : "0.6")};
    width:fit-content;
    align-items:center;
`;

const Label = styled.p`
font-size: 16px;
 translate: 5px 8px;
font-style: normal;
font-weight: 500;
`;

return (
  <StepLabelContainer active={props.active}>
    <Circle active={props.active}>{props.stepNumber ?? 1}</Circle>
    <Label>{props.label ?? "label"}</Label>
  </StepLabelContainer>
);
