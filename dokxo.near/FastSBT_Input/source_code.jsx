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

const H1styled = styled.h1`

width: 100%;
height: 10px;
font-family: Open Sans;
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 120%;
color: #000000;

`;
const Colcont = styled.div`

margin-top:.5rem;
 width:33.3%;
 @media only screen and (max-width: 820px) {
 width:100%;
}
@media only screen and (max-width: 480px) {
 width:100%;
 
}

`;

const onChangeFunction = props.onchangeFunc;
return (
  <Colcont>
    <H1styled>{props.title}</H1styled>
    <FormInput
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => {
        console.log("hijo", e.target.value);
        onChangeFunction(e.target.value);
      }}
    ></FormInput>
  </Colcont>
);
