const ShareButtonDiv = styled.div`
 
}
`;
const ShareButton = styled.button`
display: flex;
padding: 2px 12px;
align-items: flex-start;
gap: 10px;
border-radius: 4px;
background: var(--buttons-yellow-default, #FFD50D);
border: 1px solid #FFD50D;

`;
const ShareButtonText = styled.p`
color: var(--primary-black, #000);
font-size: 12px;
font-family: Open Sans;
font-weight: 500;
line-height: 24px;
margin: 0px;

`;

const ShareOptionButtonContainer = styled.button`
width: 100%;
padding:0px;
background:transparent;
border-color:transparent;
@media (hover: hover) {
 
  button:hover {
    color: black;
    background: #F8F8F9;
  }
}

`;
const ShareOptionButton = styled.button`
color: #000000;
width: 100%;
border-radius: 10px; 
border-color: transparent; 
background:#FFFFFF;
font-size: 12px;
font-family: Open Sans;
font-weight: 500;
line-height: 24px;
text-align: left
padding:0px;
 

`;

State.init({
  showShareOptions: false,
  shareText: "Copy",
});
function handleShare(urlToCopy) {
  console.log(urlToCopy);
  State.update({ shareText: "Copied" });
  clipboard.writeText(
    "https://near.org/#/yairnava.near/widget/NDC.Nomination.Candidate.Container?house=" +
      "&candidate="
  );

  setTimeout(() => {
    State.update({ showShareOptions: false, shareText: "Copy" });
  }, "1500");
}
return (
  <>
    <div class="col  ">
      <div
        style={{
          display: "flex",

          "justify-content": " end",
          "align-items": "center",
        }}
      >
        <ShareButton
          onClick={() => {
            State.update({ showShareOptions: !state.showShareOptions });
          }}
        >
          {" "}
          <ShareButtonText>Share</ShareButtonText>
        </ShareButton>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          "z-index": "3",
          "justify-content": " end",
          "align-items": "center",
          "margin-top": "5px",
        }}
      >
        {state.showShareOptions && (
          <div
            class="row"
            id="b"
            style={{
              width: "200px",
              height: "auto",
              "z-index": "10",
              top: "0",
              left: "50%",
              color: "rgb(255, 255, 255)",
              "background-color": "rgb(255, 255, 255)",
              "border-radius": "6px",
              padding: "2px 5px",
              display: "flex",
              gap: "5px",
              "box-shadow": ".1px .1px 5px",
            }}
          >
            {props.shareoptions.map((op) => {
              return (
                <OverlayTrigger
                  placement={"left"}
                  overlay={<Tooltip>{state.shareText}</Tooltip>}
                >
                  <ShareOptionButtonContainer>
                    <ShareOptionButton
                      onClick={() => {
                        handleShare(op.shareUrl);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          "justify-content": "space-between",
                          padding: "2px 5px",
                        }}
                      >
                        {op.title}
                        <img src={op.icon} />
                      </div>
                    </ShareOptionButton>
                  </ShareOptionButtonContainer>
                </OverlayTrigger>
              );
            })}
          </div>
        )}
      </div>
    </div>
  </>
);
