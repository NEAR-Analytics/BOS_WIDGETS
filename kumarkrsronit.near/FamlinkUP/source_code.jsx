const App = () => {
  const [activeContent, setActiveContent] = useState("Content1");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const styles = {
    bannerText: {
      fontSize: "24px",
      fontWeight: "bold",
    },

    navbar: {
      backgroundColor: "#90EE90",
      display: "flex",
      justifyContent: "space-between",
      padding: "40px",
      alignItems: "center",
      marginDown: "50px",
    },

    logo: {
      height: "69px",
      width: "69px",
      marginLeft: "2px",
    },

    hidden: {
      display: "none",
    },

    button: {
      backgroundColor: "#FF7722",
      border: "none",
      padding: "8px 16px",
      margin: "0 10px",
      cursor: "pointer",
      color: "white",
    },

    buttonHover: {
      backgroundColor: "#0D0115",
    },
    dropdownButtonHover: {
      backgroundColor: "#0D0115",
    },

    footer: {
      backgroundColor: "white",
      padding: "20px",
      textAlign: "center",
      color: "black",
    },

    styleDropdownContainer: {
      position: "relative",
      marginLeft: "auto",
    },

    styleDropdownButton: {
      backgroundColor: "#FF7722",
      color: "white",
      border: "none",
      cursor: "pointer",
    },

    styleDropdownContent: {
      position: "absolute",
      backgroundColor: "#0D0115",
      minWidth: "160px",
      boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
      zIndex: 1,
      top: "100%",
      display: isDropdownOpen ? "block" : "none",
    },

    styleDropdownItem: {
      padding: "12px 16px",
      textDecoration: "none",
      display: "block",
      color: "white",
      cursor: "pointer",
    },
  };

  const user = "kumarkrsronit.near";

  const Content1 = () => (
    <div>
      <Widget src={`${user}/widget/Famlinkup_homepage`} />
    </div>
  );

  const Content2 = () => (
    <div>
      <Widget src={`${user}/widget/Famlinkup_aboutus`} />
    </div>
  );

  const contentComponents = {
    Content1: <Content1 />,
    Content2: <Content2 />,
  };

  const handleButtonClick = () => {
    setActiveContent("Content1");
  };

  const handleButton2Click = () => {
    setActiveContent("Content2");
  };

  const LogoUrl = "https://i.ibb.co/cFrVQKN/IMG-2501.jpg";

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function Footer() {
    return (
      <div style={styles.footer}>
        <div>&copy; {new Date().getFullYear()} @FamLinkup</div>
        <div>
          {" "}
          visit web2 : https://socialbook-abhay2131.onrender.com/mainsite{" "}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.navbar}>
        <img style={styles.logo} src={LogoUrl} alt="Logo" />
        <div style={styles.styleDropdownContainer}>
          <button
            style={
              activeContent === "Content1"
                ? { ...styles.button, ...styles.buttonHover }
                : styles.button
            }
            onClick={handleButtonClick}
          >
            Home
          </button>
          <button
            style={
              isDropdownOpen === true
                ? {
                    ...styles.styleDropdownButton,
                    ...styles.dropdownButtonHover,
                  }
                : styles.styleDropdownButton
            }
            onClick={toggleDropdown}
          >
            Visit Web2 site
          </button>
          <div style={styles.styleDropdownContent}>
            <a href="" style={styles.styleDropdownItem}>
              Join communities
            </a>
            <a href="" style={styles.styleDropdownItem}>
              Add friends
            </a>
            <a href="" style={styles.styleDropdownItem}>
              Join events
            </a>
          </div>
          <button
            style={
              activeContent === "Content2"
                ? { ...styles.button, ...styles.buttonHover }
                : styles.button
            }
            onClick={handleButton2Click}
          >
            About
          </button>
        </div>
      </div>

      {contentComponents[activeContent] && (
        <div style={styles.content}>{contentComponents[activeContent]}</div>
      )}
      <div style={styles.hidden}></div>
      <Footer />
    </div>
  );
};

return <App />;
