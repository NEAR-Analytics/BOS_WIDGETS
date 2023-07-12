const ModalCard = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
    background: rgba(0, 0, 0, 0.70);
 
@media only screen and (max-width: 480px) {
 
}
`;
const CommentCard = styled.div`
display: flex;
width: 296px;
padding: 20px;
flex-direction: column;
align-items: flex-start;
gap: 16px; 
border-radius: 10px;
background: #FFF;
border: 1px solid transparent;
 margin-left: auto;
 margin-right: auto;
 margin-buttom: 50%;
  
   
@media only screen and (max-width: 480px) {
 width: 90%;
 
}
`;

const CommentFooter = styled.div`
width:100%;
display: flex;
flex-direction:row;
justify-content: center;
align-items: flex-end;
gap: 12px;
@media only screen and (max-width: 480px) {
 
}
`;
const ExitContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: end;
gap: 16px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const IconContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: center;
gap: 16px;
align-self: stretch;
@media only screen and (max-width: 480px) {
 
}
`;
const CFCancel = styled.button`
display: flex;
padding: 8px 12px;
align-items: flex-start;
gap: 10px;
color: var(--buttons-white-default, #FFF);
font-family: "Open Sans";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px;
 
 
 
justify-content: center;
align-items: center;
gap: 10px;
color:#ff;
border-radius: 10px;
 border-width: 1px;
 
 
 
  background-image:  linear-gradient(90deg, #9333EA 0%, #4F46E5 100%), radial-gradient(circle at top left,#F0E1CE, #F0E1CE);
  background-origin: border-box;
  background-clip: padding-box, border-box;
@media only screen and (max-width: 480px) {
  
}
`;

const CFSubmit = styled.button`
font-family: "Open Sans";
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 24px;
 
justify-content: center;
align-items: center;
gap: 10px;
display: flex;
padding: 8px 12px;
 
border-radius: 10px;
 border-width: 1px;
  border: solid 1px transparent;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left,#9333EA,#4F46E5);
  background-origin: border-box;
  background-clip: padding-box, border-box;
 
@media only screen and (max-width: 480px) {
 width: 100%;
}
`;
let nominationContract = "nominations-v1.gwg-testing.near";
function handleSelfRevoke() {
  Storage.privateSet("Houseselected", props.house);
  Near.call(nominationContract, "self_revoke");
}

return (
  <ModalCard>
    <CommentCard>
      <ExitContainer>
        <div>
          <button
            onClick={props.onClickCancel}
            style={{
              margin: "0",
              padding: "0",
              background: "transparent",
              "border-color": "transparent",
            }}
          >
            {" "}
            <img
              alt="close"
              src={
                "https://nativonft.mypinata.cloud/ipfs/QmXeHUR2zF3VwLgiW6i8S1DgZBETpD55ynJktnPdSeC54m"
              }
            />
          </button>
        </div>
      </ExitContainer>
      <IconContainer>
        <img
          alt="close"
          src={
            "https://nativonft.mypinata.cloud/ipfs/QmYXaSUh7XnQH4VsogAwRQM7epuQaPGByM8C7ZazCp2Dk2"
          }
        />
        <div
          style={{
            display: "flex",
            "flex-direction": "column",
            "align-items": "center",
            gap: "20px",
          }}
        ></div>
      </IconContainer>
      <label
        style={{
          display: "flex",
          width: "100%",
          "flex-direction": "column",
          color: " var(--000000, #000)",
          "text-align": "center",
          "font-family": "Open Sans",
          "font-size": "20px",
          "font-style": "normal",
          "font-weight": "500",
          "line-height": "120%",
        }}
      >
        Are you sure about delete your nomination?
      </label>

      <CommentFooter>
        <CFCancel onClick={props.onClickCancel}>Cancel</CFCancel>
        <CFSubmit
          onClick={() => {
            handleSelfRevoke();
          }}
        >
          <p
            style={{
              margin: "0",
              background: "linear-gradient(90deg, #9333EA 0%, #4F46E5 100%)",
              "-webkit-background-clip": "text",
              "-webkit-text-fill-color": "transparent",
              "background-clip": "text",
              "text-fill-color": "transparent",
            }}
          >
            Delete nomination
          </p>
        </CFSubmit>
      </CommentFooter>
    </CommentCard>
  </ModalCard>
);
