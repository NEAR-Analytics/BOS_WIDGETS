const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const widgetUrl = `https://api.pikespeak.ai/widgets/transfers/${account}`;

const isTransfer = fetch(widgetUrl);


return (
  <>{isTransfer.body != ""?
    <iframe
      style={{ width: "100%", height: "440px", marginTop: "40px" }}
      src={widgetUrl}
    ></iframe>:""}
  </>
);
