    const formStyles = {
        row: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            padding: "10px",
            width: "100%",
        },
        rowFields: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "10px",
            width: "100%",
            alignItems: "center",
        },
        column: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: "10px",
        },
        columnTextLeft: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            padding: "10px",
            width: "50%",
        },
        columnTextRight: {
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            width: "50%",
        },
        textField: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px",
        },
        checkboxField: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "left",
            padding: "10px",
        },
        formLabel: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "10px",
        },
        button: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "10px",
        },
        listHeading: {
            fontWeight: "bold",
            fontSize: "1.2rem",
        },
        list: {

        },
        paragraph: {
            display: "flex",
            padding: "5px",
        }, 
    };

    const checkboxLabels = {
        label1: 'Use Managed RPC Service (Enterprise)',
        label2: 'Use Private RPC Service',
        label3: 'Use Managed Indexer (Enterprise)',
        label4: 'Use Private Indexer',
        label5: 'Use Fast Auth Onboarding',
    }

    const dropDownItems = [
        { value: "0", label: "Please select..." },
        { value: "100", label: "100 calls per month" },
        { value: "250", label: "250 calls per month" },
        { value: "500", label: "500 calls per month" },
        { value: "1k", label: "1k calls per month" },
        { value: "5k", label: "5k calls per month" },
        { value: "10k", label: "10k calls per month" },
        { value: "20k", label: "20k calls per month" },
        { value: "40k", label: "40k calls per month" },
        { value: "60k", label: "60k calls per month" },
        { value: "80k", label: "80k calls per month" },
        { value: "100k", label: "100k calls per month" },
        { value: "150k", label: "150k calls per month" },
        { value: "200k", label: "200k calls per month" },
        { value: "250k", label: "250k calls per month" },
    ];

const [bannerMessage, setBannerMessage] = useState(<div></div>);
const [callValue, setCallValue] = useState("");
const [formSuccess, setFormSuccess] = useState(false);
const [formData, setFormData] = useState({
    phase1: '',
    phase2: '',
    phase3: '',
    phase4: '',
    phase5: '',
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
});

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'select') {
        setCallValue(value);
    }
    setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
    }));
};

  const handleSubmit = (e) => {
    const emptyValuesArray =  []
    Object.entries(formData).map(([key, value]) => {
        if (key.includes('phase') && value === '') {
            emptyValuesArray.push(1);
        };
    });
    if (emptyValuesArray.length > 0) {
        setFormSuccess(false);
        setBannerMessage(<h3 style={{fontWeight: "bold",color: "red"}}>Please select calls for all Phases!</h3>);
    } else {
        setFormSuccess(true);
        props.submitDeveloperProfile(formData);
    };

  };

    return (
    <div>
        <div style={formStyles.row}>
            <div style={formStyles.columnTextLeft}>
                <p style={formStyles.paragraph}>To better help you estimate the cost of your project, please fill out the form below. Each phase represents a milestone in the development process.
                </p>
                <span style={formStyles.listHeading}>Example Phases:</span>
                <div style={formStyles.list}>
                    <li>Phase 1: Prototype</li>
                    <li>Phase 2: Alpha Release</li>
                    <li>Phase 3: Beta Release</li>
                    <li>Phase 4: Production Release</li>
                    <li>Phase 5: 12 months after Production Release</li>
                </div>
            </div>
            <div style={formStyles.columnTextRight}>
                <p style={formStyles.paragraph}>The number provided = the number of active users per minute. The pulldown lists have generic thresholds you can choose to get a close idea of what your expendentitures will be at common thresholds. You should choose values for all 5 phases for this demo.
                </p>
                <p style={formStyles.paragraph}>
                    Please check the boxes that apply to your project. If you are unsure, leave the box unchecked.
                </p>
            </div>
        </div>
        
        <form onSubmit={handleSubmit}>
        {/* Dropdown per phase */}
        <div style={formStyles.rowFields}>
        {Array.from({ length: 5 }, (_, index) => (
            <div key={index} style={formStyles.column}>
            <label style={formStyles.formLabel} htmlFor={`phase${index + 1}`}>{`Phase ${index + 1}:`}</label>
            <select
            name={`phase${index + 1}`}
            onChange={e => handleChange(e)}
            type="select"
            id={`phase${index + 1}`}
            >
            {dropDownItems.map((item) => (
                <option
                style={{textAlign: "center"}}  
                key={item.label} 
                value={item.value}>
                {item.label}
                </option>
            ))}
            </select>
            </div>
        ))}
        </div>

        {/* Checkboxes */}
        <div style={formStyles.rowFields}>
        {Array.from({ length: 5 }, (_, index) => (
            <div key={index} style={formStyles.column}>
            <label style={formStyles.formLabel}>
                <input
                style={formStyles.checkboxField}
                type="checkbox"
                name={`checkbox${index + 1}`}
                checked={formData[`checkbox${index + 1}`]}
                onChange={handleChange}
                />
                {checkboxLabels[`label${index + 1}`]}
            </label>
            </div>
        ))}
        </div>
        
        {/* Banner Alert */}
        <div style={formStyles.rowFields}>
        {bannerMessage}
        </div>

        {/* Submit Button */}
        <div style={formStyles.rowFields}>
        <button type="submit" style={formStyles.button}>Submit</button>
        </div>
        </form>
    </div>
    );