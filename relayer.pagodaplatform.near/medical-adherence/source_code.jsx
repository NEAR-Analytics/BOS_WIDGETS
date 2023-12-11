const style = {
  introduction: {
    backgroundImage: "linear-gradient(to bottom, #3498db, #2980b9)", // Example gradient background
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "100px",
    textAlign: "center",
  },
  text: {
    h2: {
      fontSize: "8vw",
      color: "white", // Set text color to white for better visibility
    },
    color: {
      color: "red",
    },
    p: {
      fontSize: "1.2em",
      marginBottom: "20px",
      color: "white", // Set text color to white for better visibility
    },
    buttons: {
      display: "inline-block",
      backgroundColor: "#2ecc71",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      textDecoration: "none",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonsHover: {
      backgroundColor: "#27ae60",
    },
  },
  textFirstChild: {
    color: "red",
  },
};

const Patient = "ibix.near";

const [showPatient, setShowPatient] = useState(false);

function handleShowPatient() {
  setShowPatient(true);
}

return (
  <>
    {!showPatient && (
      <div style={style.introduction}>
        <div style={style.text}>
          <p className="text-header">Take control of your health with</p>
          <h2 style={style.text.h2}>
            Med<span style={style.text.color}>Ease</span>{" "}
          </h2>
          <p style={style.text.p}>Your Personal Health Companion!</p>
          <p style={style.text.p}>Seamlessly manage your medications</p>
          <p
            style={{ ...style.text.buttons, ":hover": style.text.buttonsHover }}
            onClick={handleShowPatient}
          >
            Discover MedEase Now
          </p>
        </div>
      </div>
    )}

    {showPatient && <Widget src={`${Patient}/widget/Patient`} />}
  </>
);
