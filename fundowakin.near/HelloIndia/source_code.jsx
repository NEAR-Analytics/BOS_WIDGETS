initState({
  amount: "1",
  validator: "nearuaguild.poolv1.near",
});

const accountId = props.wallet_id || context.accountId;
const decimals = props.decimal_places ?? 1;

const res = fetch(`https://api.nearblocks.io/v1/account/${accountId}`);
const yourAccountBalance = (res.body.account[0].amount / 1e24).toFixed(
  decimals
);

const helloIndiaText = `Hello India! Your balance is: `;
const projectInfoText = `Your balance is: ${yourAccountBalance} Near`;
const fontFamily = "Arial, sans-serif";
const fontSize = "18px"; // Reduced font size
const headingFontSize = "24px"; // Reduced heading font size
const subheadingFontSize = "20px"; // Reduced subheading font size
const textColor = "orange";
const backgroundColor = "green";
const height = "100vh"; // use vh for full viewport height
const width = "100vw"; // use vw for full viewport width
const logoUrl =
  "https://zealy-webapp-images-prod.s3.eu-west-1.amazonaws.com/public/5d8a56da-0df6-4e25-ba2d-c2029e8dd760-logo.png";

const extendedCode = `
  <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');

    html, body {
      height: ${height};
      width: ${width};
      margin: 0;
      padding: 0;
      background-color: ${backgroundColor};
      font-family: 'Roboto', sans-serif;
    }

    .marquee {
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      background-color: ${backgroundColor};
      color: ${textColor};
      font-family: ${fontFamily};
      font-size: ${fontSize};
      line-height: 1.5; // Adjust line height for marquee
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .marquee span {
      display: inline-block;
      padding-left: 100%;
      animation: marquee 15s linear infinite;
    }

    @keyframes marquee {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    .content {
      color: ${textColor};
      font-family: ${fontFamily}, 'Roboto', sans-serif;
      text-align: center;
      padding-top: 20px;
    }

    h1 {
      font-size: ${headingFontSize};
    }

    h2 {
      font-size: ${subheadingFontSize};
    }

    p {
      font-size: ${fontSize};
    }

    .logo-container {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    .logo {
      max-width: 300px; // Reduced logo size
      width: auto; // ensure logo maintains aspect ratio
      height: auto; // ensure logo maintains aspect ratio
      transition: transform 0.3s, opacity 0.5s;
      opacity: 0;
    }

    .logo:hover {
      transform: scale(1.05);
      cursor: pointer;
    }

    .logo.loaded {
      opacity: 1;
    }
  </style>

  <div class="marquee">
    <span>${helloIndiaText}</span>
  </div>
  <div class="content">
    <h1>Project Information</h1>
    <h2>NEAR Protocol Projects</h2>
    <p>${projectInfoText}</p>
    <!-- You can add more formatted text here -->
  </div>
  <div class="logo-container">
    <img src="${logoUrl}" alt="Logo" class="logo" onload="this.classList.add('loaded')"/>
  </div>
`;

return (
  <iframe
    className="w-100"
    srcDoc={extendedCode}
    style={{ height: "1000px", backgroundColor }}
  />
);
