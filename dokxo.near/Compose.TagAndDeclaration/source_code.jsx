const Formsectiontag = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 100%;
height: 60px;
flex: none;
order: 0;
flex-grow: 0;
margin-top:10px;
@media only screen and (max-width: 480px) {
  
  
}
  `;
const H2styled = styled.h1`
 
height: 14px;
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
flex: none;
order: 0;
flex-grow: 0;
`;
const InputStyled = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 9px 10px;
 
width: 100%;
height: 34px;
font-size: 12px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;

@media only screen and (max-width: 480px) {
  
 
}
`;
const H2Declarationstyled = styled.h1`
width: 100%;
height: 14px;
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
flex: none;
 
flex-grow: 0;
margin-top:15px;
`;
const FormsectionDecaration = styled.div`
display: flex;
flex-direction: row;
align-items: center;
 
gap: 8px;
width: 264px;
height: 20px;
flex: none;
order: 1;
flex-grow: 0;
  `;
const InputcheckboxStyled = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 0px;
gap: 10px;
width: 20px;
height: 20px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 4px;
flex: none;
order: 0;
flex-grow: 0;
`;

const PStyled = styled.p`
width: 236px;
height: 14px;
font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
flex: none;
order: 1;
flex-grow: 0;
margin-top: 0; 
margin-bottom:0;
`;

const AStyled = styled.a`
margin-left:4px;
height: 14px;
font-family: 'Avenir';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
flex: none;
order: 1;
flex-grow: 0;
text-decoration-line: underline;

`;
// State
State.init({
  agreement: false,
  tags: "",
  error_msg: "",
});
const { agreement, tags, handleTags, handleDeclaration } = props;
return (
  <div
    class="row col-sm-12  mx-0   "
    style={{
      "padding-left": "16px",
      "padding-right": "16px",
      height: "auto",
    }}
  >
    <Formsectiontag>
      <H2styled>{"Tags"} </H2styled>

      <InputStyled
        style={{
          "font-family": "Avenir",
          "font-style": "normal",
          "font-weight": "400",
          "font-size": "12px",
          "line-height": "120%",
        }}
        name="Tags"
        id="Tags"
        type="text"
        value={tags}
        placeholder="Add tags separated by comma"
        onChange={(e) => {
          handleTags(e);
        }}
      />
    </Formsectiontag>

    <div style={{ padding: "0px" }}>
      <H2Declarationstyled>
        {"Declaration of transparency "}
      </H2Declarationstyled>
      <FormsectionDecaration
        style={{
          "margin-top": "15px",
        }}
      >
        <InputcheckboxStyled
          type="checkbox"
          value={agreement}
          onChange={(e) => {
            handleDeclaration(e);
          }}
        />
        <PStyled>
          I agree the <AStyled>{"Declaration of transparency"} </AStyled>
        </PStyled>
      </FormsectionDecaration>
    </div>
  </div>
);
