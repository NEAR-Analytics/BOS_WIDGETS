const devTextStyles = {
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        fontSize: "2rem",
    },
    body: {
        width: "100%",
        margin: "10px",
        padding: "10px",
    },
};

const checkboxLabels = [
    'Use Managed RPC Service (Enterprise)',
    'Use Private RPC Service',
    'Use Managed Indexer (Enterprise)',
    'Use Private Indexer',
    'Use Fast Auth Onboarding',
];

const developerProfile = props.developerProfile;

const basicText = (<p style={devTextStyles.body}>Thank you for submitting your metrics. Following is a breakdown of projected costs across phases.</p>);

const valuesText = Object.entries(developerProfile).map(([key, value]) => {
    if (key.includes("phase") && value !=='') {
        const phaseNumString = key.slice(-1);
        const phaseString = `Phase ${phaseNumString}`;
        return (<p id={key}>In {phaseString} you selected {value} calls per month.</p>);
    }
    if (key.includes("checkbox") && value === true) {
        const checkboxNumString = key.slice(-1);
        const index = parseInt(checkboxNumString) - 1;
        const checkboxString = `Checkbox ${checkboxNumString}`;
        return (<p id={key}>Because you selected {checkboxString} we are including costs for: {checkboxLabels[index]}.</p>);
    }
});

return (
    <div>
        <div style={devTextStyles.body}>
            {basicText} 
            {valuesText} 
        </div> 
    </div>
);