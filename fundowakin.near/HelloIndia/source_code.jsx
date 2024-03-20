const text = props.text ?? "Hello India!";
const fontFamily = props.fontFamily ?? "Arial, sans-serif";
const fontSize = props.fontSize ?? "22px";
const textColor = props.textColor ?? "orange";
const backgroundColor = props.backgroundColor ?? "green";
const height = props.height ?? "60px";
const width = props.width ?? "100%";
const logoUrl =
  props.imageUrl ||
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
        display: flex;
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
        margin-top: 10px; /* Spacing between text and logo */
      }

      .logo {
        max-width: 600px; /* Maximum logo width */
        width: 100%;
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
    style={{ height: "auto", backgroundColor }}
  />
);
