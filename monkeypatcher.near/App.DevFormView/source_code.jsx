const [developerProfile, setDeveloperProfile] = useState(null);
const [headerText, setHeaderText] = useState(null);

const devStyles = {
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        fontSize: "2rem",
    },
    body: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "300px",
        width: "100%",
    },
  };

{!developerProfile && (
    setHeaderText("Enter Project Metrics")
)}
{developerProfile && (
    setHeaderText("Project Cost Estimate")
)}

return (
    <div>
        <Widget src="monkeypatcher.near/App.Header" trust={{ mode: "trusted-author" }} />
        <h1 style={devStyles.header}>{headerText}</h1>
        <div>
            {!developerProfile && (
                <Widget
                    src="monkeypatcher.near/App.DevFormComponent"
                    props={{
                        submitDeveloperProfile: (formData) => {
                            setDeveloperProfile(formData);
                        },
                    }}
                />
            )}
            {developerProfile && (
                <Widget 
                    src="monkeypatcher.near/App.DevResultPage"
                    props={{
                        developerProfile
                    }} 
                />
            )}
        </div>
        <div><Widget src="monkeypatcher.near/App.Footer" trust={{ mode: "trusted-author" }} /></div>
    </div>
);