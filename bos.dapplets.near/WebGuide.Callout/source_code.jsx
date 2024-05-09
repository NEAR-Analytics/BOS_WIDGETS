const Callout = styled.div`
  display: flex;
  width: 320px;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #02193a;
  background: #fffffe;
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
  <Callout>
    <Widget
      props={{ type: "callout" }}
      src="bos.dapplets.near/widget/WebGuide.Header"
    ></Widget>
    <Widget
      props={{
        status: {
          type: "info",
          text: "this info",
        },
        content: "this content",
      }}
      src="bos.dapplets.near/widget/WebGuide.Body"
    />
    <Widget
      props={{
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
    />
  </Callout>
);
