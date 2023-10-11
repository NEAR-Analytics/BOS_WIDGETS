const Dropdown = styled.select`

box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 10px;
gap: 10px;
width: 100%;
height: 35px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 10px;
flex: none;
order: 1;

font-size:12px;
font-family: Open Sans;
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
 
display: flex;
align-items: center;

color: #828688;
@media only screen and (max-width: 480px) {
   
}
  
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

    <Dropdown
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => {
        console.log("hijo", e.target.value);
        onChangeFunction(e.target.value);
      }}
    >
      <option default value="">
        Select issuer
      </option>
      {props.options.map((op) => {
        return <option value={op.value}>{op.label}</option>;
      })}
    </Dropdown>
  </Colcont>
);
