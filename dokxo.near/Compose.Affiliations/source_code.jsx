const FormsectionAffiliation = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 100%;
height: auto;
flex: none;
 
flex-grow: 0;
@media only screen and (max-width: 480px) {
  

}
  `;
const AffiliationHead = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
 
width: 100%;
height: 26px;
flex: none;
order: 0;
flex-grow: 0;
@media only screen and (max-width: 480px) {
  
   
}
  `;
const AffiliationTitle = styled.div`
display: flex;
flex-direction: row;
justify-content:  space-between ;
align-items: center;
padding: 0px;
gap: 8px;
width: 100%;
height: 20px;
flex: none;
order: 0;
flex-grow: 0;
margin-top:16px;
padding-right:26px;
@media only screen and (max-width: 480px) {
  
  
  padding-right:0px;
}
  `;
const H2styled = styled.h1`
 
height: 14px;
font-family: Open Sans;
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
margin-top: 25px;
`;
const AffiliationBody = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;
width: 100%;
height: auto;
flex: none;
order: 1;
 

margin-top:16px;
@media only screen and (max-width: 480px) {
   
}
  `;
const CompanyTitle = styled.div`
width: 100%;
height: 12px;
font-family: Open Sans;
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
gap: 10px;
width: 100%;
height: 40px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
font-family: Open Sans;
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
display: flex;
align-items: center;
 
  `;
const AFDates = styled.div`
 

display: flex;  
width:100%;
gap:.25rem;
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
padding: 9px 10px;
gap: 10px;
width: 100%;
height: 40px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
font-family: Open Sans;
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 120%;
display: flex;
align-items: center;
 
@media only screen and (max-width: 480px) {
  
  
}
  `;
const FormsectionPlatformtextarea = styled.textarea`
box-sizing: border-box;
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 9px 10px;
width: 100%;
height: 100px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;

order: 1;

font-size: 12px;
@media only screen and (max-width: 480px) {
  
 
}
  `;
const Separator = styled.div`
width:100%;
height:2px;
background-color: #D0D6D966;
border: solid 0px transparent;
`;
const getCurdate = () => {
  let year = new Date(Date.now()).getFullYear().toString();
  console.log(year);
  let month =
    new Date(Date.now()).getMonth() < 10
      ? "0" + (new Date(Date.now()).getMonth() + 1)
      : new Date(Date.now()).getMonth() + 1;
  console.log(month);
  let day =
    new Date(Date.now()).getDate() < 10
      ? "0" + new Date(Date.now()).getDate().toString()
      : new Date(Date.now()).getDate().toString();
  console.log(day);
  let fullYEAR = year + "-" + month + "-" + day;
  console.log(fullYEAR);
  return fullYEAR;
};
let datnoe = getCurdate();
console.log("d", datnoe);
const {
  affiliations,
  addFields,
  removeField,
  handleAFFCompanyName,
  handleAFFStartdate,
  handleAFFEnddate,
  handleAFFRole,
} = props;
// State

return (
  <div
    name={"aff"}
    class="row col-sm-12 mx-auto    "
    style={{
      height: "auto",
      "padding-left": "16px",
      "padding-right": "16px",
    }}
  >
    {" "}
    <FormsectionAffiliation name="FormsectionAffiliation">
      <AffiliationHead>
        <AffiliationTitle>
          <H2styled>{"Afiliations"}</H2styled>
          <button
            name={"addsfd"}
            onClick={addFields}
            style={{
              background: "#FFD50D",
              "border-color": "#00000000",
              padding: "0px",
              "margin-left": "20px",
            }}
          >
            <label
              style={{
                "font-family": "Open Sans",
                "font-size": "12px",
                color: "#000000",
                "padding-left": "5px",
              }}
            >
              {" "}
              Add an Affiliation
            </label>
            <img
              style={{}}
              src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmbNqXEbUqSkGY7quBnyBqU6nKuXimYTnxTNsbYHnhdVXw?_gl=1*aubyn4*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njk0MjQwOC4xMS4xLjE2ODY5NDI0NzMuNTcuMC4w`}
            />
          </button>
        </AffiliationTitle>
        <div style={{ padding: "12px", width: "100%" }}>
          <Separator />
        </div>
      </AffiliationHead>

      <AffiliationBody>
        {affiliations.map((form, index) => {
          return (
            <div
              class="bg-white rounded"
              style={{ width: "100%", "margin-top": "20px" }}
            >
              <div
                class="row  col-sm-12     gap-1   "
                style={{
                  "padding-left": "16px",
                  "padding-top": "11px",
                }}
              >
                <div name="AFOrganization" class="row ">
                  <CompanyTitle>{"Organization Name"}</CompanyTitle>
                  <div>
                    <CompanyInputName
                      placeholder="Company Name"
                      value={form.company_name}
                      onChange={(event) => {
                        let _param = { index, event };
                        handleAFFCompanyName(_param);
                      }}
                    />
                  </div>
                </div>
                <div class="row   ">
                  {" "}
                  <AFDates name="AFdates">
                    <DateContItem>
                      <CompanyTitle>{"Start date"}</CompanyTitle>
                      <CompanyInput
                        type="date"
                        max={getCurdate()}
                        onChange={(event) => {
                          let _param = { index, event };
                          handleAFFStartdate(_param);
                        }}
                      ></CompanyInput>
                    </DateContItem>
                    <DateContItem>
                      <CompanyTitle>{"End date"}</CompanyTitle>
                      <CompanyInput
                        type="date"
                        max={getCurdate()}
                        onChange={(event) => {
                          let _param = { index, event };
                          handleAFFEnddate(_param);
                        }}
                      ></CompanyInput>
                    </DateContItem>
                  </AFDates>
                </div>

                <div class="row    py-2">
                  <CompanyTitle>{"Role Description"}</CompanyTitle>

                  <div>
                    <FormsectionPlatformtextarea
                      style={{
                        "font-family": "Open Sans",
                        "font-style": "normal",
                        "font-weight": "400",
                        "font-size": "12px",
                        height: "72px",
                      }}
                      name="Description"
                      id="Description"
                      type="text"
                      placeholder="Please describe your role at the organization"
                      value={form.role}
                      onChange={(event) => {
                        let _param = { index, event };
                        handleAFFRole(_param);
                      }}
                    />
                    <div
                      style={{
                        "margin-top": "5px",

                        order: "3",
                        width: "100%",
                        display: "flex",
                        "justify-content": "end",
                      }}
                    >
                      <label
                        style={{
                          "font-size": "8px",
                          display: "flex",
                          "vertical-align": "top",
                          "text-align": "center",
                          color:
                            form.role.length < 500 ? "#00000075" : "#ff000075",
                        }}
                      >
                        {form.role.length} - 500
                      </label>
                    </div>
                  </div>
                </div>

                <div class="row flex justify-content-end my-2">
                  <button
                    onClick={() => removeField(index)}
                    style={{
                      background: "#F1D6D5",
                      "border-color": "#C23F38",
                      width: "136px",
                      height: "28px",
                      display: "flex",
                      padding: " 2px 12px",

                      gap: " 6px",
                      "align-items": "center",
                    }}
                  >
                    <label
                      style={{
                        "font-family": "Open Sans",
                        "font-style": "normal",
                        "font-weight": "400",
                        "font-size": "12px",
                        "line-height": " 24px",
                        color: "#C23F38",
                        width: "136px",

                        display: "flex",
                      }}
                    >
                      Delete Affiliation
                    </label>
                    <img
                      style={{
                        width: "14px",
                        height: "14px",
                      }}
                      src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmRDcewbKHpy9SKAbskYYfRGfTXtUpunSY3f2D3aqyanJM?_gl=1*1vropbf*_ga*NTIwNjIxMzEyLjE2ODc4MTYwMTE.*_ga_5RMPXG14TE*MTY4NzgxNjAxNS4xLjEuMTY4NzgxNjExMi42MC4wLjA.`}
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </AffiliationBody>
    </FormsectionAffiliation>
  </div>
);
