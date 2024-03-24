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

const helloIndiaText = `Hello India!`;
const projectInfoText = `Your balance is: ${yourAccountBalance} Near`;
const fontFamily = "Arial, sans-serif";
const textColor = "orange";
const backgroundColor = "green";
const logoUrl =
  "https://zealy-webapp-images-prod.s3.eu-west-1.amazonaws.com/public/5d8a56da-0df6-4e25-ba2d-c2029e8dd760-logo.png";

const extendedCode = `
  <style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');

    html, body {
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: ${backgroundColor};
      font-family: 'Roboto', sans-serif;
      overflow: hidden;
    }

    #container {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: flex-start;
      align-items: center;
    }

    .marquee {
      white-space: nowrap;
      overflow: hidden;
      position: relative;
      background-color: ${backgroundColor};
      color: ${textColor};
      font-family: ${fontFamily};
      font-size: 22px;
      line-height: 50px;
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
      margin: 20px 0;
    }

    .logo {
      max-width: 200px;
      width: auto;
      height: auto;
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

    .text-content {
      color: ${textColor};
      text-align: center;
      padding: 20px;
      font-family: ${fontFamily}, 'Roboto', sans-serif;
    }

    .text-content h1 {
      font-size: 2em;
    }

    .text-content h2 {
      font-size: 1.5em;
    }

    .text-content p {
      font-size: 1em;
    }
  </style>

  <div id="container">
    <div class="marquee">
      <span>${helloIndiaText}</span>
    </div>
    <div class="logo-container">
      <img src="${logoUrl}" alt="Logo" class="logo" onload="this.classList.add('loaded')"/>
    </div>
    <div class="text-content">
      <h1>What Is NEAR Protocol?</h1>
      <h2>NEAR General Information</h2>
      <p>NEAR Protocol is a layer-one blockchain that was designed as a community-run cloud computing platform and that eliminates some of the limitations that have been bogging competing blockchains, such as low transaction speeds, low throughput and poor interoperability. This provides the ideal environment for DApps and creates a developer and user-friendly platform. For instance, NEAR uses human-readable account names, unlike the cryptographic wallet addresses common to Ethereum. NEAR also introduces unique solutions to scaling problems and has its own consensus mechanism called “Doomslug.”

NEAR Protocol is being built by the NEAR Collective, its community that is updating the initial code and releasing updates to the ecosystem. Its declared goal is to build a platform that is “secure enough to manage high value assets like money or identity and performant enough to make them useful for everyday people.”

Flux, a protocol that allows developers to create markets based on assets, commodities, real-world events, and Mintbase, an NFT minting platform are examples of projects being built on NEAR Protocol.</p>
      <p>${projectInfoText}</p>
    </div>
  </div>
`;

return (
  <iframe
    className="w-100"
    srcDoc={extendedCode}
    style={{ height: "100vh", backgroundColor, border: "none" }}
  />
);
