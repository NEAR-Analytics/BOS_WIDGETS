const themeColors = {
  dark: {
    default: { background: "black", text: "white", border: "transparent" },
    success: {
      background: "black",
      text: "white",
      border: "#5FCF2A",
    },
    error: {
      background: "black",
      text: "white",
      border: "#D92D20",
    },
    warning: {
      background: "black",
      text: "white",
      border: "#FFA229",
    },
    info: {
      background: "black",
      text: "white",
      border: "#2A66F4",
    },
  },
  light: {
    default: { background: "white", text: "#323232", border: "black" },
    success: {
      background: "white",
      text: "#323232",
      border: "#5FCF2A",
    },
    error: {
      background: "white",
      text: "#323232",
      border: "#D92D20",
    },
    warning: {
      background: "white",
      text: "#323232",
      border: "#FFA229",
    },
    info: {
      background: "white",
      text: "#323232",
      border: "#2A66F4",
    },
  },
  contained: {
    default: { background: "white", text: "#323232", border: "#323232" },
    success: {
      background: "#EFFAEA",
      text: "#323232",
      border: "#5FCF2A",
    },
    error: {
      background: "#FBEAE9",
      text: "#323232",
      border: "#D92D20",
    },
    warning: {
      background: "#FFF6EA",
      text: "#323232",
      border: "#FFA229",
    },
    info: {
      background: "#EAF0FE",
      text: "#323232",
      border: "#2A66F4",
    },
  },
};
const theme = props.theme || "contained";
const variant = props.variant || "default";

const ToastContainer = styled.div`
  isolation: isolate;
  text-align: center;
  position: absolute;
  inset: 0;
  z-index: 2;
  background: transparent;
`;
const Toast = styled.div`
    position: absolute;
    border-radius: 8px;
    padding: 1em;
    width: 20vw;
    font-size:1rem
    min-width: 200px;
    text-align: left;
    word-break: break-word;
    color: ${themeColors[theme][variant].text};
    background: ${themeColors[theme][variant].background};
    border-bottom: 5px solid ${themeColors[theme][variant].border};
   ${(props) => {
     if (props.position === "top-left") {
       return `
          top: 0;
          left: 0;
        `;
     } else if (props.position === "top-center") {
       return `
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
     } else if (props.position === "top-right") {
       return `
          top: 0;
          right: 0;
        `;
     } else if (props.position === "bottom-left") {
       return `
          bottom: 0;
          left: 0;
        `;
     } else if (props.position === "bottom-center") {
       return `
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        `;
     } else if (props.position === "bottom-right") {
       return `
          bottom: 0;
          right: 0;
        `;
     } else {
       return `
          top: 0;
          right: 0;
        `;
     }
   }};
  `;

const ToastCloseIcon = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  cursor: pointer;
  font-weight: 700;
  font-size: 24px;
  color: ${themeColors[theme][variant].text};
`;

const autoClose = () => {
  setTimeout(() => {
    props.onClose && props.onClose();
  }, 5000);
};
autoClose();

return (
  <>
    {props.show && (
      <ToastContainer>
        <Toast style={props.style}>
          <div
            style={{
              width: "80%",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            {props.icon && props.icon}
            <div>
              <div
                style={{
                  textTransform: "capitalize",
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: 1,
                }}
              >
                {props.title ? props.title : null}
              </div>
              <div>{props.message}</div>
            </div>
          </div>
          <ToastCloseIcon onClick={props.onClose} style={props.iconStyle}>
            ⨉
          </ToastCloseIcon>
        </Toast>
      </ToastContainer>
    )}
  </>
);
