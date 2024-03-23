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

const text = `Hello India! Your balance is: ${yourAccountBalance} Near`;
const fontFamily = "Arial, sans-serif";
const fontSize = "22px";
const textColor = "orange";
const backgroundColor = "green";
const height = "100%";
const width = "100%";
const logoUrl =
  "https://zealy-webapp-images-prod.s3.eu-west-1.amazonaws.com/public/5d8a56da-0df6-4e25-ba2d-c2029e8dd760-logo.png";

const extendedCode = `
  <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');

    body {
      margin: 0;
      font-family: 'Roboto', sans-serif;
    }

    .marquee {
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      color: ${textColor};
      background-color: ${backgroundColor};
      font-family: ${fontFamily}, 'Roboto', sans-serif;
      font-size: ${fontSize};
      height: ${height};
      width: ${width};
      align-items: center;
      justify-content: start;
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

    .logo-container {
      width: ${width};
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }

    .logo {
      max-width: 600px;
      width: 100%;
      height: 100%;
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
    <span>${text}</span>
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
