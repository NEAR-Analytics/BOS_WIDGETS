

const widgetUrl = `https://api.pikespeak.ai/widgets/network/weeklytransactions`;
return (
    <>
        <iframe
            style={{ width: "100%", height: "440px", marginTop: "40px" }}
            src={widgetUrl}
        ></iframe>
    </>
);