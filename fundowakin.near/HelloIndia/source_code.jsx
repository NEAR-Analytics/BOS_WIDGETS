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
const displayCode = `
    <style>
      html, body {
        padding: 0;
        margin: 0;
      }

      .banner-text {
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        background-color: ${backdropColor};
        color: ${fontColor};
        font-family: ${typeFace};
        font-size: ${letterSize};
        line-height: ${boxHeight};
        height: ${boxHeight};
        width: ${boxWidth};
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 100%;
        animation: banner-slide 15s linear infinite;
      }

      @keyframes banner-slide {
        from { transform: translateX(0%); }
        to { transform: translateX(-100%); }
      }

      .logo {
        width: ${boxWidth};
        display: block; /* Ensures the logo is centered if it's smaller than the container */
        margin: auto; /* Adds automatic margins to center the logo horizontally */
      }
    </style>

    <div class="banner-text">
      ${greetingMessage}
    </div>
    <img src="${logoUrl}" alt="Logo" class="logo"/>
  `;

return (
  <iframe
    className="full-width"
    srcDoc={displayCode}
    style={{
      height: `calc(${boxHeight} + 200px)`, // Adjust the 200px as needed for your logo's height
      backgroundColor: backdropColor,
    }}
  />
);
