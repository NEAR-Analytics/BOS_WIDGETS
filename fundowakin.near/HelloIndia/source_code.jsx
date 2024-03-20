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
      html, body, div, iframe {
        margin: 0;
        padding: 0;
        border: none;
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
      }

      body {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        background-color: ${backdropColor};
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
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

    <div class="banner-text">${greetingMessage}</div>
    <img src="${logoUrl}" alt="Logo" class="logo" onload="this.classList.add('loaded')"/>
  `;

return (
  <iframe
    style={{
      width: "100vw", // Set iframe width to 100% of the viewport width
      height: "100vh", // Set iframe height to 100% of the viewport height
      border: "none",
      display: "block", // This removes any default inline styles that might cause alignment issues
    }}
    srcDoc={fullScreenCode}
    allowFullScreen
  />
);
