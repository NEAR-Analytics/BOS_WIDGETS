const sccStyles = {
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
};

return (
    <div>
        <Widget src="monkeypatcher.near/App.Header" trust={{ mode: "trusted-author" }} />
        <div style={sccStyles.row}></div>
        <div style={sccStyles.row}>
            <div style={sccStyles.column}>
                <a href="/monkeypatcher.near/App.ProviderFormView">I want to be a Provider of Services</a>
            </div>
            <div style={sccStyles.column}>
                <a href="/monkeypatcher.near/App.DevFormView" >I want to develop an app on the BOS</a>
            </div>
        </div>
    </div>
);