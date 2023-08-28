
const categories = ['ALL', 'A', 'B', 'C', 'D'];
//const [activeTab, setActiveTab] = useState('전체');
State.init({ activeTab: 'ALL' });

const tabNavigationStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    margin: '20px',
};

const tabButtonsStyle = {
    display: 'flex',
    gap: '10px',
};

const tabButtonStyle = {
    backgroundColor: '#f0f0f0',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px 8px 0 0',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
};

const activeTabButtonStyle = {
    backgroundColor: '#333',
    color: 'white',
};

const tabContentStyle = {
    border: '1px solid #ddd',
    borderRadius: '0 0 8px 8px',
    padding: '20px',
    width: '300px',
    backgroundColor: 'white',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '-1px',
};

const handleTabClick = (category) => {
    //setActiveTab(category);
    State.update({ activeTab: category });

};

return (
    <div style={tabNavigationStyle}>
        <div style={tabButtonsStyle}>
            {categories.map((category) => (
                <button
                    key={category}
                    style={{
                        ...tabButtonStyle,
                        ...(activeTab == category ? activeTabButtonStyle : {}),
                    }}
                    onClick={() => handleTabClick(category)}
                >
                    {category}
                </button>
            ))}
        </div>
        <div style={tabContentStyle}>
            {state.activeTab == 'ALL' && <p>ALL contents</p>}
            {state.activeTab == 'A' && <p>A contents</p>}
            {state.activeTab == 'B' && <p>B contents</p>}
            {state.activeTab == 'C' && <p>C contents</p>}
            {state.activeTab == 'D' && <p>D contents</p>}
        </div>
    </div>
);
