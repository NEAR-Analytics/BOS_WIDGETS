const footerStyles = {
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px",
        backgroundColor: 'black',
        color: 'white',
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
}

return (
    <div>
        <div style={footerStyles.row}>
        <div style={footerStyles.column}>
            <a href="/monkeypatcher.near/scc">HOME</a>
        </div>
        <div style={footerStyles.column}>
            <a href="/monkeypatcher.near/App.ProviderFormView">PROVIDER FORM</a>
        </div>
        <div style={footerStyles.column}>
            <a href="/monkeypatcher.near/App.DevFormView" >DEVELOPER FORM</a>
        </div>
        </div>
    </div>
);
