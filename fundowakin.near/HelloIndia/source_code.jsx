const greetingMessage = props.text || "Hello India!";
const typeFace = props.fontFamily || "Arial, sans-serif";
const letterSize = props.fontSize || "22px";
const fontColor = props.textColor || "orange";
const backdropColor = props.backgroundColor || "green";
const boxHeight = props.height || "60px";
const boxWidth = props.width || "100%";
const logoUrl =
  props.imageUrl ||
  "https://zealy-webapp-images-prod.s3.eu-west-1.amazonaws.com/public/5d8a56da-0df6-4e25-ba2d-c2029e8dd760-logo.png";

const fullScreenCode = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html, body {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
      }

      .full-screen-container {
        width: 100%;
        height: 100%;
        background-color: ${backdropColor};
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }

      .banner-text {
        width: 100%;
        height: ${boxHeight};
        line-height: ${boxHeight};
        background-color: ${backdropColor};
        color: ${fontColor};
        font-family: ${typeFace};
        font-size: ${letterSize};
        text-align: center;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
      }

      .logo {
        width: 100%; /* Adjust if you want to set a max-width for your logo */
        max-width: 600px; /* Optional: set a max-width for the logo */
        height: auto;
        margin-top: 1rem;
        transition: opacity 1s, transform 0.3s;
        opacity: 0;
      }

      .logo:hover {
        transform: scale(1.1);
        cursor: pointer;
      }

      .logo.loaded {
        opacity: 1;
      }

    </style>

    <div class="full-screen-container">
      <div class="banner-text">${greetingMessage}</div>
      <img src="${logoUrl}" alt="Logo" class="logo" onload="this.classList.add('loaded')"/>
    </div>
  `;

return (
  <iframe
    style={{
      width: "100vw",
      height: "100vh",
      border: "none",
    }}
    srcDoc={fullScreenCode}
    allowFullScreen
  />
);
