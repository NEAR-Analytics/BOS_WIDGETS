const FormInput = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 10px;
width: ${props.width ? props.width : "100%"};
height:${props.height ? props.height : "30px"};
background:${props.background ? props.background : "#FFFFFF"}; 
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
font-family: Open Sans;
font-style: normal;
font-weight: 400;
font-size: ${props.fontSize ? props.fontSize : "10px"};
line-height: 120%;
display: flex;
align-items: center;
color:  ${props.fontColor ? props.fontColor : "#828688"};
`;

return (
  <FormInput
    type={props.type}
    value={props.value}
    placeholder={props.placeholder}
    onChange={(e) => props.onChange(e.target.value)}
  ></FormInput>
);
