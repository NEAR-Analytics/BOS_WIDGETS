let current_user = context.accountId;
let User = styled.div`
text-align: right;
font-weight: 500;
font-size: 1.2rem;
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
        {current_user ? (
          <User>{current_user}</User>
        ) : (
          <a href="https://near.org/signin">
            <button>Login to NEAR</button>
          </a>
        )}
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
            style={{
              width: "150px",
              backgroundColor: "#00ffae",
              border: "none",
            }}
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
            style={{
              color: "#fff",
              width: "250px",
              marginTop: "15px",
              backgroundColor: "rgb(131, 96, 195)",
              border: "none",
            }}
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
          width="350px"
          height="350px"
        />
      </div>
    </div>

    <div style={{ width: "100%" }}>
      <div
        class="d-flex flex-sm-column flex-md-row align-items-center"
        style={{ width: "80%", margin: "80px auto", gap: "100px" }}
      >
        <div style={{ width: "70%" }}>
          <h3 style={{ fontSize: "1.8em", color: "blueviolet" }}>
            Master Market Analysis for Forex and Crypto Trading
          </h3>
          <p style={{ fontSize: "1.2em" }}>
            With Dropouts' College, you can elevate your trading game regardless
            of your current skill level. We offer comprehensive, free courses
            that cover everything from the basics to advanced trading strategies
            in both forex and crypto markets. Propel your trading journey today
            with our expert guidance
          </p>
        </div>
        <div style={{ width: "30%" }}>
          <img
            src="https://res.cloudinary.com/dfbqtfoxu/image/upload/v1692804471/section-image_jy0maq.jpg"
            alt="crypto"
            width="300px"
            height="300px"
            style={{ borderRadius: "50%", border: "4px solid #a68484" }}
          />
        </div>
      </div>

      <div
        class="d-flex flex-sm-column flex-md-row align-items-center"
        style={{ width: "80%", margin: "80px auto", gap: "100px" }}
      >
        <div style={{ width: "30%" }}>
          <img
            src="https://res.cloudinary.com/dfbqtfoxu/image/upload/v1692804473/section-image3_jnzej2.jpg"
            alt="crypto"
            width="300px"
            height="300px"
            style={{ borderRadius: "50%", border: "4px solid #a68484" }}
          />
        </div>
        <div style={{ width: "70%" }}>
          <h3 style={{ fontSize: "1.8em", color: "blueviolet" }}>
            Master Market Analysis, For Free
          </h3>
          <p style={{ fontSize: "1.2em" }}>
            Grow your trading prowess with our comprehensive course. Receive
            free, lesson-by-lesson PDFs direct to your inbox, providing you with
            a solid foundation in market analysis for both Forex and Crypto
            trading. Advance your skills at no cost today with Dropouts’
            College.
          </p>
        </div>
      </div>

      <div
        class="d-flex flex-sm-column flex-md-row align-items-center"
        style={{ width: "80%", margin: "80px auto", gap: "100px" }}
      >
        <div style={{ width: "70%" }}>
          <h3 style={{ fontSize: "1.8em", color: "blueviolet" }}>
            Master the Market, Manage the Risk
          </h3>
          <p style={{ fontSize: "1.2em" }}>
            Trading is not just about buying and selling—it's a game of
            psychology and risk management. At Dropouts' College, gain an edge
            with mentorship on market analysis, risk management, and trading
            psychology. Learn to navigate both forex and crypto markets
            confidently, from basic to advanced levels.
          </p>
        </div>
        <div style={{ width: "30%" }}>
          <img
            src="https://res.cloudinary.com/dfbqtfoxu/image/upload/v1692804469/section-image2_hyv6i6.jpg"
            alt="crypto"
            width="300px"
            height="300px"
            style={{ borderRadius: "50%", border: "4px solid #a68484" }}
          />
        </div>
      </div>

      <div
        class="d-flex flex-sm-column flex-md-row align-items-center"
        style={{ width: "80%", margin: "80px auto", gap: "100px" }}
      >
        <div style={{ width: "30%" }}>
          <img
            src="https://res.cloudinary.com/dfbqtfoxu/image/upload/v1692804456/section-image5_sje5r0.svg"
            alt="crypto"
            width="300px"
            height="300px"
            style={{ borderRadius: "50%", border: "4px solid #a68484" }}
          />
        </div>
        <div style={{ width: "70%" }}>
          <h3 style={{ fontSize: "1.8em", color: "blueviolet" }}>
            Join a thriving community of eager learners.
          </h3>
          <p style={{ fontSize: "1.2em" }}>
            Step into a dynamic and supportive learning environment where you're
            not alone. Join over 100 students who are already gaining valuable
            insights on market analysis for forex and crypto trading, from basic
            to advanced levels, for free.
          </p>
        </div>
      </div>
    </div>

    <div
      class="container-fluid py-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        height: "350px",
        backgroundImage: "linear-gradient(to right, #8360c3, #2ebf91)",
      }}
    >
      <h3>Ready to get started ?</h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          style={{
            width: "150px",
            margin: "15px 0",
            backgroundColor: "#00ffae",
            border: "none",
          }}
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfmGbjrbj8mvgXEkrQdV8PYkvPTWOMvpjxOCdIOI2Mo-Y7AIQ/viewform"
            target="blank"
            style={{ textDecoration: "none", color: "#fff" }}
          >
            Register Now{" "}
          </a>
        </button>
        <button
          style={{
            color: "#fff",
            width: "250px",
            marginTop: "15px",
            backgroundColor: "rgb(131, 96, 195)",
            border: "none",
          }}
          type="button"
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
    </div>

    <div
      class="d-flex container-fluid justify-content-between align-items-center"
      style={{
        height: "350px",
        textAlign: "center",
        color: "#585858",
      }}
    >
      <div>
        <p>
          <b>Other services:</b> <br />
          A.I bot trading <br />
          Consultation <br />
          Fund Management <br />
          <b>Please contact for more Information</b> <br />{" "}
          Thetradingpostfx@gmail.com
        </p>
      </div>

      <div>
        <p>
          <p>
            <b>Social</b>
          </p>{" "}
          <a
            href="https://twitter.com/eielhart_?s=21"
            style={{ marginRight: "15px" }}
          >
            <img
              src="https://res.cloudinary.com/dfbqtfoxu/image/upload/v1692804459/twitter1_oxt91b.png"
              width="40px"
              height="40px"
            />
          </a>
          <a href="https://t.me/etcentre">
            <img
              src="https://res.cloudinary.com/dfbqtfoxu/image/upload/v1692804459/telegram_wfphvt.png"
              width="40px"
              height="40px"
            />
          </a>
        </p>
      </div>

      <div>
        <p>
          <b>Legal:</b> <br />
          Terms of service <br />
          Privacy
        </p>
      </div>
    </div>
  </>
);
