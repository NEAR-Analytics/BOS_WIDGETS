const FormsectionPlatform = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 0px;
gap: 8px;
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
font-size: 12px;
line-height: 120%;
display: flex;
align-items: center;
color: #000000;
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
  issued1: "",
  issued2: "",
  issued3: "",
  addition_platform: "",
  error_msg: "",
});

return (
  <div
    class="row col-sm-12  mx-0  "
    name="div2"
    style={{ "padding-left": "16px", "padding-right": "16px" }}
  >
    <FormsectionPlatform name=" ">
      <FormsectionPlatformtitle>
        {"Platform: What’s your view and pledge on Key Issue 1?"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="Profile"
        id="Profile"
        type="text"
        placeholder="Elaborate on your position and pledge "
        onChange={(e) => {
          State.update({ issued1: e.target.value });
          console.log(state);
        }}
      />
    </FormsectionPlatform>
    <FormsectionPlatform>
      <FormsectionPlatformtitle>
        {"Platform: What’s your view and pledge on Key Issue 2"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="Profile"
        id="Profile"
        type="text"
        placeholder="Elaborate on your position and pledge "
        onChange={(e) => State.update({ issued2: e.target.value })}
      />
    </FormsectionPlatform>
    <FormsectionPlatform>
      <FormsectionPlatformtitle>
        {"Platform: What’s your view and pledge on Key Issue 3?"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="Profile"
        id="Profile"
        type="text"
        placeholder="Elaborate on your position and pledge "
        onChange={(e) => State.update({ issued3: e.target.value })}
      />
    </FormsectionPlatform>
    <FormsectionPlatform>
      <FormsectionPlatformtitle>
        {"Additional Platform"}{" "}
      </FormsectionPlatformtitle>
      <FormsectionPlatformtextarea
        name="Profile"
        id="Profile"
        type="text"
        placeholder="Elaborate on your position and additional issues and topics"
        onChange={(e) => State.update({ addition_platform: e.target.value })}
      />
    </FormsectionPlatform>
  </div>
);
