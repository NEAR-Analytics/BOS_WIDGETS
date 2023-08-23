let Greet = "Good evening";

const Button = styled.button`
  padding: 10px;
  border: 2px solid blue;
  border-radius: 4px;
`;

return (
  <>
    <div
      class="container-fluid py-4"
      style={{
        color: "#fff",
        height: "100vh",
        backgroundImage: "linear-gradient(to right, #8360c3, #2ebf91)",
      }}
    >
      <div class="text-center">
        <h1 style={{ fontSize: "3.5em" }}>
          Master the markets with <br />
          Dropouts' College
        </h1>
        <p
          style={{
            fontSize: "1.2em",
            margin: "15px 0",
            lineHeight: "1.5",
            color: "#f5f5f5",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Get top-notch, comprehensive training in forex and <br />
          crypto market analysis. Whether you're a beginner or an advanced{" "}
          <br />
          trader, our free courses are designed to help you succeed
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            class="btn btn-primary"
            style={{ width: "150px" }}
          >
            <a
              href="https://t.me/etcentre"
              target="blank"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Register Now{" "}
            </a>
          </button>
          <button
            style={{ color: "#fff", width: "250px", marginTop: "15px" }}
            type="button"
            class="btn btn-outline-secondary"
          >
            <a
              href="https://dropouts-newsletter.beehiiv.com/subscribe"
              target="blank"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Subscribe to our newsletter
            </a>
          </button>
        </div>
        <img
          src="https://res.cloudinary.com/dfbqtfoxu/image/upload/v1692790055/headerImage_ses4ka.svg"
          alt="hero-image"
          width="400px"
          height="400px"
        />
      </div>
    </div>
  </>
);
