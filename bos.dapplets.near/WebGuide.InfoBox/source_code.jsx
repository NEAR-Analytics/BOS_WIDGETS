const InfoBox = styled.div`
  display: flex;
  width: 545px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #02193a;
  background: #fffffe;
  position: relative;
  left: 19px;
  font-family: sans-serif;
`;

const CalloutTitle = styled.div`
  color: #02193a;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 149%; /* 26.82px */
`;

const CalloutDescription = styled.div`
  color: #7a818b;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 149%; /* 17.88px */
`;

return (
  <OverlayTrigger
    show={isVisibleStep}
    delay={{ show: 250, hide: 300 }}
    placement="right"
    // overlay={callout}
  >
    <InfoBox>
      <Widget  props={{ type: "infobox" }} src="bos.dapplets.near/widget/WebGuide.Header"></Widget>
      <Widget
        props={{
          status: {
            type: "error",
            text: "this info infobox",
          },
          content: "this content infobox ",
        }}
        src="bos.dapplets.near/widget/WebGuide.Body"
      ></Widget>
      <Widget
        props={{
          type:'infobox',
          buttons: [
            {
              variant: "secondary",
              disabled: false,
              onClick: () => {},
              label: "Prev",
            },
            {
              variant: "primary",
              disabled: false,
              onClick: () => {},
              label: "Next",
            },
          ],
        }}
        src="bos.dapplets.near/widget/WebGuide.Footer"
      ></Widget>
    </InfoBox>
  </OverlayTrigger>
);
