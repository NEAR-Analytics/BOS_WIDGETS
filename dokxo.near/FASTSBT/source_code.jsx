const ModalCard = styled.div`
width: 100%;
height:100%;
z-index: 1;
background: rgba(0, 0, 0, 0.70);


 
@media only screen and (max-width: 320px) {
background: rgba(255, 0, 0, 0.70);

}
`;

const Header = styled.div`
width:100%;
height: 50px;
background: #000000;
display: flex;
flex-direction:row;
justify-content:center;
align-items: center;
gap: 4px;
flex-shrink:0;


  `;
const Headerlabel = styled.label`
  color: white;
  font-family: Open Sans;
  font-style": normal;
  font-weight: 400;
  line-height: 120%;


  `;
const CardStyled = styled.div`
 
width: 95%;
 
background: #F8F8F9;
border-radius: 10px;
margin-top:12px;
margin-left:auto;
margin-right:auto;

@media only screen and (max-width: 480px) {
  width: 100%;
}

  `;
const BodyForm = styled.div`
display: flex;
flex-direction: column;
align-items: flex-center;

width: 100%;
height: auto;
padding:12px 12px;


@media only screen and (max-width: 480px) {
  
   
   
}
  `;
const InputStyled = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 9px 10px;
width: 100%;
height: 35px;
font-size: 12px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
@media only screen and (max-width: 480px) {
  
 
}
`;
const FooterForm = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;

width: 100%;
height: auto;
padding-right:12px;
@media only screen and (max-width: 480px) {
  
   
   
}
  `;

const FormsectionHouse_ = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 33%;
height: 54px;
flex: none;
display: none;
order: 6;
flex-grow: 0;
@media only screen and (max-width: 480px) {
  
  
  display: flex;
}

  `;
const Dropdown = styled.select`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 10px;
gap: 10px;
width: 100%;
height: 32px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;

font-size:12px;
font-family: Open Sans
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
font-family: Open Sans
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 120%;
color: #000000;
`;
const H2styled = styled.h1`
 
height: 14px;
font-family: Open Sans
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

const MetaTitles = styled.div`
width: 100%;
height: 12px;
font-family: Open Sans;
font-style: normal;
font-weight: 500;
font-size: 11px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
flex: none;
order: 0;
flex-grow: 0;
margin-top:10px;
margin-bottom:10px;
@media only screen and (max-width: 480px) {
  
   
}
  `;

const CompanyInputName = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 9px 10px;

width: 100%;
height: 30px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
font-family: Open Sans;
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 120%;
display: flex;
align-items: center;
color: #828688;
 
  `;
const AFDates = styled.div`
padding-left:0px;

display: flex;  
width:100%;
gap:.5rem;
flex-wrap: nowrap;
@media only screen and (max-width: 480px) {
 
}
`;
const DateContItem = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
width: 50%;
height: 50px;
flex: none;
order: 0;
flex-grow: 1;
margin-bottom:10px;

@media only screen and (max-width: 480px) {
  
 
   
}
  `;
const CompanyInput = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px 10px;
width: 100%;
height: 30px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
font-family: Open Sans;
font-style: normal;
font-weight: 400;
font-size: 10px;
line-height: 120%;
display: flex;
align-items: center;
color: #828688;
@media only screen and (max-width: 480px) {
  
  
}
  `;
const Submitcontainer = styled.div`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 8px;
margin-bottom:16px;

`;
const SubmitBtn = styled.button`
 display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
color:#000;
display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 10px;
 border-width: 1px;
  border: solid 1px transparent;
 
 
  background-image: linear-gradient(#FFD50D, #FFD50D), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
}

`;

const MetaCard = styled.div`
background:#FFFFFF;
border-radius:.375rem;
width: 100%;
height: 295px;
margin-top:20px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
@media only screen and (max-width: 480px) {
  
 
}
  `;

const CancelBtn = styled.button`
  display: flex;
width: 107px;
padding: 8px 12px;
justify-content: center;
align-items: center;
gap: 10px;
color:#9333EA;
border-radius: 10px;
 border-width: 1px;
  border: solid 1px #9333EA;
 
 
  background-image: linear-gradient(#fff, #fff), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
 
}
`;

const HiddeableWidget = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: block;
  }
`;
const CustomCheckbox = styled.div`
 width:20px;
 height:20px;
 background:${
   state.ischeckselected
     ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);"
     : "#F8F8F9;"
 }
border: medium solid ${
  state.ischeckselected
    ? "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%);"
    : "black"
};
border-radius:4px;
 
`;
const Reference = styled.input`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 9px 10px;
width: 100%;
height: 30px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
font-family: Open Sans,
font-style: normal,
font-weight: 400,
font-size: 10px,
height: 60px,

@media only screen and (max-width: 480px) {
  
 
}
  `;
const Separator = styled.div`
width:100%;
height:2px;
background-color: #D0D6D966;
border: solid 0px transparent;
margin-top:10px;
`;
const NDCicon =
  "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmP5CETfUsGFqdcsnrfPgUk3NvRh78TGZcX2srfCVFuvqi?_gl=1*faq1pt*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4OTg3Njc1OC4xMS4xLjE2ODk4NzY4MjYuNjAuMC4w";
const CheckIcon =
  "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmVGE45rLuHiEHh8RPfL11QsQBXVDfmdV3pevZU7CG1ucg?preview=1&_gl=1*1dpaowv*_ga*Mzc5OTE2NDYyLjE2ODg1MTY4MTA.*_ga_5RMPXG14TE*MTY4OTg4MDMyOS4xMi4xLjE2ODk4ODA3MTAuMTkuMC4w";
// State
State.init({
  theme: "",
  Dao_Contract: "",
  Issuer_selected: null,
  Receiver: "",
  ClassIdSelected: "",
  IssuedT: "",
  ExpiresAt: "",
  ischeckselected: false,
});

return (
  <ModalCard>
    <Header>
      <img src={NDCicon} />
      <Headerlabel>FAST-SBT</Headerlabel>
    </Header>

    <CardStyled name="compose" class="Cardstyled">
      <BodyForm class="mx-auto">
        <div className="d-flex flex-column mt-2">
          <H1styled>DAO</H1styled>
          <InputStyled
            type="text"
            placeholder="Input DAO contract address"
            value={state.Dao_Contract}
            onChange={(e) => {
              State.update({ Dao_Contract: e.target.value });
            }}
          />
        </div>
        <div className="d-flex flex-column mt-2">
          <H1styled>Issuer</H1styled>
          <Dropdown
            placeholder="Input DAO contract address"
            value={state.Issuer_selected}
            onChange={(e) => {
              State.update({ Issuer_selected: e.target.value });
            }}
          >
            <option default value="0">
              Select issuer
            </option>
            {}
            <option value="nothing">more options from fetch</option>
          </Dropdown>
        </div>
        <div className="d-flex flex-column mt-2">
          <H1styled>Receiver</H1styled>
          <InputStyled
            type="text"
            placeholder="dokxo.near"
            value={state.Receiver}
            onChange={(e) => {
              State.update({ Receiver: e.target.value });
            }}
          />
        </div>
        <div className="d-flex flex-column mt-2">
          <div class="d-flex">
            <H1styled>Metadata</H1styled>
            <CustomCheckbox
              onClick={() => {
                State.update({ ischeckselected: !state.ischeckselected });
              }}
            >
              {state.ischeckselected ? (
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    "object-fit": "cover",
                  }}
                  src={CheckIcon}
                />
              ) : (
                <></>
              )}
            </CustomCheckbox>
          </div>
          {state.ischeckselected ? (
            <MetaCard>
              <div
                class="row  col-sm-12  mx-0  gap-1   "
                style={{
                  "padding-left": "16px",
                  "padding-top": "11px",
                }}
              >
                <div name="Classid" class="row px-0">
                  <MetaTitles>{"Class id"}</MetaTitles>
                  <div>
                    <Dropdown
                      value={state.ClassIdSelected}
                      onChange={(e) => {
                        State.update({ ClassIdSelected: e.target.value });
                      }}
                    >
                      <option default value="0">
                        Select token class id
                      </option>
                      {}
                      <option value="nothing">more options from fetch</option>
                    </Dropdown>
                  </div>
                </div>
                <div class="row">
                  {" "}
                  <AFDates name="AFdates">
                    <DateContItem>
                      <MetaTitles>{"Issued at date"}</MetaTitles>
                      <CompanyInput
                        type="date"
                        value={state.IssuedT}
                        onChange={(e) => {
                          State.update({ IssuedT: e.target.value });
                        }}
                      ></CompanyInput>
                    </DateContItem>
                    <DateContItem>
                      <MetaTitles>{"Expires at"}</MetaTitles>
                      <CompanyInput
                        type="date"
                        value={state.ExpiresAt}
                        onChange={(e) => {
                          State.update({ ExpiresAt: e.target.value });
                        }}
                      ></CompanyInput>
                    </DateContItem>
                  </AFDates>
                </div>

                <div class="row px-0">
                  <MetaTitles>
                    {"Reference = link to a JSON file (eg, IPFS)."}
                  </MetaTitles>

                  <div>
                    <CompanyInput
                      value={state.Reference}
                      placeholder="Write your reference (optional)"
                      onChange={(e) => {
                        State.update({ Reference: e.target.value });
                      }}
                    />
                  </div>
                </div>

                <div class="row px-0">
                  <MetaTitles>
                    {"Reference hash = Base64-encoded sha256 hash of JSON."}
                  </MetaTitles>

                  <div style={{ "font-size": "10px" }}>
                    <CompanyInput
                      value={state.Reference}
                      placeholder="Write your reference hash (optional)"
                      onChange={(e) => {
                        State.update({ Reference: e.target.value });
                      }}
                    />
                  </div>
                </div>
              </div>
            </MetaCard>
          ) : (
            <Separator></Separator>
          )}

          <div className="d-flex flex-column mt-2">
            <H1styled>Memo</H1styled>
            <InputStyled
              type="text"
              placeholder="Write a memo"
              value={state.Memo}
              onChange={(e) => {
                State.update({ Memo: e.target.value });
              }}
            />
          </div>
        </div>
      </BodyForm>

      <FooterForm name="Footerform">
        <Submitcontainer>
          <SubmitBtn onClick={console.log("click")}> Submit </SubmitBtn>
        </Submitcontainer>
      </FooterForm>
    </CardStyled>
  </ModalCard>
);
