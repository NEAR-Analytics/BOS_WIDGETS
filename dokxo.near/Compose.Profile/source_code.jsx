const H2styled = styled.h1`
 
height: 14px;
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
flex: none;
order: 0;
flex-grow: 0;
`;
const LabelFile = styled.label`
box-sizing: border-box;
align-content: center,
width: 100%;
height: 38px;
background: #FFFFFF;
border: 1px dashed #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
@media only screen and (max-width: 480px) {
   
}

`;
const WrapNoWrap = styled.div`
display: flex;
flex-direction: row;  
width:100%;
gap:.25rem;
flex-wrap: nowrap;
@media only screen and (max-width: 480px) {
 flex-wrap: wrap;
 flex-direction: col;
}
`;
const Formsection = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 33%;
height: 60px;
flex: none;
order: 0;
flex-grow: 0;
@media only screen and (max-width: 480px) {
  
 width: 100%;
}
  `;
const InputStyled = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 9px 10px;
 
width: 100%;
height: 32px;
font-size: 12px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;

@media only screen and (max-width: 480px) {
  
 
}
`;
const FormsectionHouse = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 33%;
height: 54px;
flex: none;
display: flex;
order: 6;
flex-grow: 0;
@media only screen and (max-width: 480px) {
  
  width: 326px;
  display: none;
}

  `;
const FormsectionHouseDropdown = styled.select`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 8px 10px;
gap: 10px;
width: 100%;
height: 32px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;

font-size:12px;
font-family: 'Avenir';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
 
display: flex;
align-items: center;

color: #828688;
@media only screen and (max-width: 480px) {
  
  width: 326px;
}
  `;
const {
  img,
  name,
  profileAccount,
  house_intended,

  filesOnChange,
  handleName,
  handleProfile,
  handleHouse,
} = props;
return (
  <div class="w-100">
    <div
      class=" row col-sm-12  mx-0   "
      style={{ "padding-left": "16px", "padding-right": "16px" }}
    >
      <H2styled style={{ padding: " 0px" }}> Profile picture </H2styled>

      <LabelFile class="    ">
        <Files
          name="file"
          multiple={false}
          accepts={["image/*"]}
          minFileSize={1}
          clickable
          onChange={filesOnChange}
          style={{
            display: "flex",
            "justify-content": "center",
            height: "inherit",
          }}
        >
          <div class="row " style={{ display: "flex", "flex-wrap": "nowrap" }}>
            <div
              style={{
                width: "34px",
                display: "flex",
                "align-items": "center",
                "justify-content": "center",
              }}
            >
              {" "}
              <img
                src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmWyPdBc3nqDe2mAp26a4BAvDYiuk1JEfJiyGejff3ZrjL?_gl=1*mwwy4f*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njk2NDYyNi4xNC4xLjE2ODY5NjQ2NDQuNDIuMC4w`}
              />
            </div>

            <p
              style={{
                "font-family": "Avenir",
                "font-style": "normal",
                "font-weight": "400",
                "font-size": "12px",
                "line-height": "120%",
                display: "flex",
                "align-items": "center",
                color: "#828688",
                flex: "none",
                order: "1",
                "flex-grow": "0",

                "margin-bottom": "0rem",
              }}
            >
              {img.name === "" ? "Update your profile image" : img.name}
            </p>
          </div>
        </Files>
      </LabelFile>
    </div>
    <WrapNoWrap
      class="row col-sm-12     "
      name="div1"
      style={{
        "padding-top": "10px",
        "padding-left": "16px",
        "padding-right": "16px",
      }}
    >
      <Formsection style={{ order: "1" }}>
        <H2styled>Name </H2styled>
        <InputStyled
          name="Name"
          id="Name"
          type="text"
          placeholder="Nomination name"
          value={name}
          onChange={(e) => {
            handleName(e.target.value);
            console.log("name");
          }}
        />
      </Formsection>
      <Formsection style={{ order: "2" }}>
        <H2styled>Near Account </H2styled>
        <InputStyled
          name="Profile"
          id="Profile"
          type="text"
          placeholder="@username.near"
          onChange={(e) => {
            handleInputs("profileAccount", e.target.value);
            console.log("profileAccount");
          }}
        />
      </Formsection>
      <FormsectionHouse style={{ order: "3" }}>
        <H2styled>{"House"} </H2styled>
        <FormsectionHouseDropdown
          name="house-intended"
          id="house-intended"
          onChange={(e) => handleInputs("house_intended", e)}
        >
          <option default value="0">
            Select house
          </option>
          <option value="Council of Advisors">Council of Advisors</option>
          <option value="House Of Merit">House Of Merit</option>
          <option value="Transparency Commission">
            Transparency Commission
          </option>
        </FormsectionHouseDropdown>
      </FormsectionHouse>
    </WrapNoWrap>
  </div>
);
