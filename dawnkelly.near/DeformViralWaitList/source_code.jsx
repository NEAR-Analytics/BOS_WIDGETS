return (
  <div
    style={{
      width: "720px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      backgroundColor: "#010104",
    }}
  >
    <div>
      <img
        src="https://cyan-interesting-takin-110.mypinata.cloud/ipfs/Qma65GpjGusWq1W5fSyFZX4JxT82XucD9467ufo7UVySF9"
        width="720px"
      />
    </div>
    <div
      style={{
        gap: "24px",
      }}
    >
      <h1
        style={{
          backgroundColor: "transparent",
          fontSize: "5em",
        }}
      >
        Build Austin
      </h1>
      <h2
        style={{
          backgroundColor: "transparent",
          fontSize: "2.5em",
          opacity: "1.0",
          marginLeft: "60px",
          marginRight: "60px",
          justifyContent: "center",
        }}
      >
        Civic minded projects to build better communities
      </h2>
      <p>Need some copy here about the event, happenings, etc.</p>

      {/**TODO: replace href value with with your Deform share link url */}

      <a
        href="https://www.deform.cc/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            backgroundColor: "#9e4e93",
            borderStyle: "solid",
            borderWidth: "2px",
            borderColor: "white",
            marginTop: "20px",
            marginBottom: "40px",
          }}
        >
          Reserve Your Spot
        </button>
      </a>
    </div>
  </div>
);
