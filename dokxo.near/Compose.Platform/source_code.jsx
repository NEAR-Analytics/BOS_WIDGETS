const FormsectionPlatform = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px 0px 0px 0px;
width: 100%;
 
flex: none;
order: 3;
flex-grow: 0;
@media only screen and (max-width: 480px) {
  
   
}
  `;
const FormsectionPlatformtitle = styled.h2`
width: 100%;
height: 28px;
font-family: 'Avenir';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
margin-bottom: 0px;
order: 1;
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

order: 2;

font-size: 12px;
@media only screen and (max-width: 480px) {
  
 
}
  `;

const {
  HAYInvolve,
  WIYStrategy,
  issued1,
  issued2,
  issued3,
  addition_platform,
  handleHAYInvolve,
  handleWIYStrategy,
  handleIssued1,
  handleIssued2,
  handleIssued3,
  handleAditional,
} = props;

return (
  <div
    class="row col-sm-12  mx-0  "
    name="div2"
    style={{ "padding-left": "16px", "padding-right": "16px" }}
  >
    <FormsectionPlatform name="HAYInvolve">
      <FormsectionPlatformtitle>
        {
          "How are you involved with the NEAR ecosystem? Why are you a qualified candidate? Why should people vote for you?"
        }{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="HAYInvolve"
        id="HAYInvolve"
        type="text"
        placeholder="Elaborate"
        value={HAYInvolve}
        onChange={(e) => {
          handleHAYInvolve(e.target.value);
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
            color: HAYInvolve.length < 2000 ? "#00000075" : "#ff000075",
          }}
        >
          {HAYInvolve.length} - 2000
        </label>
      </div>
    </FormsectionPlatform>
    <FormsectionPlatform name="WIYStrategy">
      <FormsectionPlatformtitle>
        {"What is your strategy to develop the NEAR ecosystem?"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="WIYStrategy"
        id="WIYStrategy"
        type="text"
        placeholder="Elaborate on your strategy"
        value={WIYStrategy}
        onChange={(e) => {
          handleWIYStrategy(e.target.value);
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
            color: WIYStrategy.length < 2000 ? "#00000075" : "#ff000075",
          }}
        >
          {WIYStrategy.length} - 2000
        </label>
      </div>
    </FormsectionPlatform>
    <FormsectionPlatform name="KI-1">
      <FormsectionPlatformtitle>
        {"Platform: What’s your view and pledge on Key Issue 1?"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="issued1"
        id="issued1"
        type="text"
        placeholder="Elaborate on your position and pledge "
        value={issued1}
        onChange={(e) => {
          handleIssued1(e.target.value);
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
            color: issued1.length < 2000 ? "#00000075" : "#ff000075",
          }}
        >
          {issued1.length} - 2000
        </label>
      </div>
    </FormsectionPlatform>
    <FormsectionPlatform name="KI-2">
      <FormsectionPlatformtitle>
        {"Platform: What’s your view and pledge on Key Issue 2"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="issued2"
        id="issued2"
        type="text"
        placeholder="Elaborate on your position and pledge "
        value={issued2}
        onChange={(e) => {
          handleIssued2(e.target.value);
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
            color: issued2.length < 2000 ? "#00000075" : "#ff000075",
          }}
        >
          {issued2.length} - 2000
        </label>
      </div>
    </FormsectionPlatform>
    <FormsectionPlatform name="KI-3">
      <FormsectionPlatformtitle>
        {"Platform: What’s your view and pledge on Key Issue 3?"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="issued3"
        id="issued3"
        type="text"
        placeholder="Elaborate on your position and pledge "
        value={issued3}
        onChange={(e) => {
          handleIssued3(e.target.value);
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
            color: issued3.length < 2000 ? "#00000075" : "#ff000075",
          }}
        >
          {issued3.length} - 2000
        </label>
      </div>
    </FormsectionPlatform>
    <FormsectionPlatform name="AddP">
      <FormsectionPlatformtitle>
        {"Additional Platform"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="issuedA"
        id="issuedA"
        type="text"
        placeholder="Elaborate on your position and your pledge on additional issues and topics"
        value={addition_platform}
        onChange={(e) => {
          handleAditional(e.target.value);
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
            color: addition_platform.length < 2000 ? "#00000075" : "#ff000075",
          }}
        >
          {addition_platform.length} - 2000
        </label>
      </div>
    </FormsectionPlatform>
  </div>
);
