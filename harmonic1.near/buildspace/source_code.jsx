const cardStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column", // To align children vertically
  minHeight: "100vh", // Set the minimum height to take the full screen height
  // Rest of your styles...
};

const titleStyle = {
  fontSize: "2.25rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
};

const footerStyle = {
  fontSize: "1.25rem",
  fontWeight: "medium",
  marginBottom: "1.5rem",
};

const subTitleStyle = {
  fontSize: "1.25rem",
  marginBottom: "2rem",
};

const linkStyle = {
  backgroundColor: "#4472c4",
  color: "#fff",
  paddingTop: "0.75rem",
  paddingBottom: "0.75rem",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  borderRadius: "0.5rem",
  fontSize: "1.25rem",
  fontWeight: "600",
  textDecoration: "none",
};

const hoverLinkStyle = {
  backgroundColor: "#3b62a8",
};

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh", // Full viewport height
  backgroundColor: "#fff", // White background
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  alignItems: center;
  height: 90vh;
  background-color: #fff;
  // Mobile screens
  @media (max-width: 768px) {
    margin-top: 10rem;
  }
`;

const ChildContainer = styled.div`
  display: flex;
  > div {
    flex: 1;
    padding: 2rem;
  }
  > div:first-child {
    padding-left: 2rem;
  }

  // Mobile screens
  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 5rem;
  }
`;

const ChildContainer2 = styled.div`
  display: flex;
  > div {
    flex: 1;
    padding: 2rem;
  }

  > div:first-child {
    order: 1;
  }

  > div:last-child {
    order: 2;
  }
  
  // For mobile screens
  @media (max-width: 768px) {
    flex-direction: column;
    > div:first-child {
      order: 2; // This will make the first child appear second on mobile
    }

    > div:last-child {
      order: 1; // This will make the second child appear first on mobile
    }
    margin-bottom: 10rem;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  padding: 2rem;
  padding-left: 4rem;
  text-align: center;
  display: flex;            // Convert the container to a flex container
  flex-direction: column;  // Stack children vertically
  justify-content: center; // Center children vertically
  align-items: center;     // Center children horizontally

  @media (max-width: 768px) {
    padding-left: 2rem;
  }
`;

const feedStyle = {
  marginBottom: "6rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //justifyContent: "center",
  minHeight: "100vh",
};

let feedURL;
if (window.location.pathname === "harmonic1.near/widget/") {
  feedURL = "artist.feed";
} else {
  feedURL = "harmonic1.near/widget/artist.feed";
}

// <div
//             style={{ flex: 1, paddingLeft: "4rem", padding: "2rem" }}
//             className="text-center"
//           >
//console.log("Path", window.location.pathname);

return (
  <>
    <div style={cardStyle} className="m-4">
      <Container>
        <ChildContainer>
          <TextContainer>
            <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
              Simple Profiles to connect with your audience.
            </p>
            <p style={{ fontSize: "1.25rem" }}>
              Communicate and Coordinate with other artists. Host information
              and updates for your audience. Make Money.
            </p>
          </TextContainer>
          <div
            style={{
              flex: 1,
              //borderRadius: "1rem",
              //border: "0.5px solid black",
              maxHeight: "500px", // or whatever height you want to set
              overflow: "auto",
              //margin: "2rem",
            }}
          >
            <Widget
              src="harmonic1.near/widget/every.thing.view"
              props={{ path: "qsaharmonic.near/thing/artist/Quinn" }}
            />
          </div>
        </ChildContainer>
      </Container>
      <Container>
        <ChildContainer2>
          <div style={{ flex: 1 }}>
            <Widget src="harmonic1.near/widget/create.artist" />
          </div>
          <TextContainer>
            <p style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
              Promote your art, events, and merch.
            </p>
            <p style={{ fontSize: "1.25rem" }}>
              Create your Profile that no one but you control. Without the fear
              of intermediary platforms, share information with your audience on
              your own terms. Check out our{" "}
              <a href="https://youtu.be/55wqXhVTlLI">How To</a> video.
            </p>
          </TextContainer>
        </ChildContainer2>
      </Container>
      <div style={feedStyle} className="text-center">
        <h3 style={titleStyle}>Featured Profiles</h3>
        <div>
          <Widget
            src="harmonic1.near/widget/artist.feed"
            props={{
              featuredAccountIds: [
                //"harmonic1.near",
                "qsaharmonic.near",
                "mzmarshall.near",
              ],
            }}
          />
        </div>
        <a href={feedURL}>
          <h4 style={{ marginTop: "2rem" }}>See all.</h4>
        </a>
      </div>
    </div>

    <div style={footerStyle} className="m-2 text-center">
      Built by <span style={{ color: "#4472c4" }}>Harmonic</span> with Love.
    </div>
  </>
);
