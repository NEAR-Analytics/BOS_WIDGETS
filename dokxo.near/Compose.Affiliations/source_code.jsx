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
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 10px;
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
height: 30px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
font-family: 'Avenir';
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
gap: 8px;
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
height: 30px;
background: #FFFFFF;
border: 1px solid #D0D6D9;
border-radius: 8px;
flex: none;
order: 1;
flex-grow: 0;
font-family: 'Avenir';
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
// State
State.init({
  afiliation: [
    {
      company_name: "",
      start_date: "",
      end_date: "",
      role: "",
    },
  ],

  error_msg: "",
});

const addFields = () => {
  var temp = state.afiliation;
  let object = {
    company_name: "",
    start_date: "",
    end_date: "",
    role: "",
  };

  if (temp.length === 6) {
    return;
  } else {
    temp.push(object);
    State.update({ afiliation: temp });
  }
};
const removeField = (index) => {
  let data = state.afiliation;
  console.log(data);
  data.splice(index, 1);
  console.log(data);
  State.update({ afiliation: data });
};

return (
  <div
    class="row col-sm-12  mx-0   "
    style={{
      "padding-left": "16px",
      "padding-right": "16px",
      height: "auto",
    }}
  >
    {" "}
    <FormsectionAffiliation name="FormsectionAffiliation">
      <AffiliationHead>
        <AffiliationTitle>
          <H2styled>{"Afiliations"}</H2styled>
          <button
            onClick={addFields}
            style={{
              background: "#FFD50D",
              "border-color": "#00000000",
              padding: "0px",
            }}
          >
            <label
              style={{
                "font-family": "Avenir",
                "font-size": "12px",
                color: "#000000",
                "padding-left": "5px",
              }}
            >
              {" "}
              Add More Affiliations
            </label>
            <img
              style={{}}
              src={`https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmbNqXEbUqSkGY7quBnyBqU6nKuXimYTnxTNsbYHnhdVXw?_gl=1*aubyn4*rs_ga*YTcxZDg1OTgtZTYyOC00M2U2LWE4MTctNzUzMDRkMjA3ZWVl*rs_ga_5RMPXG14TE*MTY4Njk0MjQwOC4xMS4xLjE2ODY5NDI0NzMuNTcuMC4w`}
            />
          </button>
        </AffiliationTitle>
        <hr
          style={{
            width: "100%",
            height: "0.5px",
            border: "1px solid rgba(208, 214, 217, 0.4)",
            flex: "none",
            order: "1",
            "margin-top": "5px",
            "flex-grow": "0",
          }}
        />
      </AffiliationHead>

      <AffiliationBody>
        {state.afiliation.map((form, index) => {
          return (
            <div
              class="bg-white rounded"
              style={{ width: "100%", height: "295px" }}
            >
              <div
                class="row  col-sm-12  mx-0  gap-1   "
                style={{
                  "padding-left": "16px",
                  "padding-top": "11px",
                }}
              >
                <div name="AFOrganization" class="row px-0">
                  <CompanyTitle>{"Organization Name"}</CompanyTitle>
                  <div>
                    <CompanyInputName
                      placeholder="Company Name"
                      onChange={(event) => {
                        let data = state.afiliation;
                        console.log("updating the company");
                        data[index].company_name = event.target.value;
                        State.update({ afiliation: data });
                        console.log(state);
                      }}
                    />
                  </div>
                </div>
                <div class="row">
                  {" "}
                  <AFDates name="AFdates">
                    <DateContItem>
                      <CompanyTitle>{"Start date"}</CompanyTitle>
                      <CompanyInput
                        type="date"
                        placeholder="Company Name"
                        onChange={(event) => {
                          let data = state.afiliation;
                          console.log("updating the start");
                          data[index].start_date = event.target.value;
                          State.update({ afiliation: data });
                          console.log(state);
                        }}
                      ></CompanyInput>
                    </DateContItem>
                    <DateContItem>
                      <CompanyTitle>{"End date"}</CompanyTitle>
                      <CompanyInput
                        type="date"
                        placeholder="Company Name"
                        onChange={(event) => {
                          let data = state.afiliation;
                          console.log("updating the end");
                          data[index].end_date = event.target.value;
                          State.update({ afiliation: data });
                          console.log(state);
                        }}
                      ></CompanyInput>
                    </DateContItem>
                  </AFDates>
                </div>

                <div class="row px-0">
                  <CompanyTitle>{"Role Description"}</CompanyTitle>

                  <div>
                    <FormsectionPlatformtextarea
                      style={{
                        "font-family": "Avenir",
                        "font-style": "normal",
                        "font-weight": "400",
                        "font-size": "10px",
                        height: "60px",
                      }}
                      name="Description"
                      id="Description"
                      type="text"
                      placeholder="Add tags that describe your nomination, separated by comma"
                      onChange={(event) => {
                        let data = state.afiliation;
                        console.log("updating the Description");
                        data[index].role = event.target.value;
                        State.update({ afiliation: data });
                        console.log(state);
                      }}
                    />
                  </div>
                </div>

                <div class="row flex justify-content-end mt-2">
                  <button
                    onClick={removeField}
                    style={{
                      background: "#F1D6D5",
                      "border-color": "#C23F38",
                      width: "136px",
                      height: "28px",
                      display: "flex",
                    }}
                  >
                    <label
                      style={{
                        "font-family": "Avenir",
                        "font-style": "normal",
                        "font-weight": "400",
                        "font-size": "12px",
                        color: "#C23F38",
                        width: "136px",
                        height: "28px",
                        display: "flex",
                      }}
                    >
                      Delete Affiliation
                    </label>
                    <img
                      style={{
                        width: "20px",
                        height: "20px",
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
