const themeColors = {
  primary: {
    contained: {
      background: "#503BC4",
      text: "#ffffff",
      border: "#503BC4",
      hoverBackground: "#4936B2",
      hoverText: "#ffffff",
      hoverBorder: "#4936B2",
    },
    outlined: {
      background: "transparent",
      text: "#503BC4",
      border: "#503BC4",
      hoverBackground: "#503BC4",
      hoverText: "#ffffff",
      hoverBorder: "#503BC4",
    },
    text: {
      background: "transparent",
      text: "#503BC4",
      border: "none",
      hoverBackground: "transparent",
      hoverText: "#4936B2",
      hoverBorder: "none",
    },
  },
  secondary: {
    contained: {
      background: "#6c757d",
      text: "#ffffff",
      border: "#6c757d",
      hoverBackground: "#495057",
      hoverText: "#ffffff",
      hoverBorder: "#495057",
    },
    outlined: {
      background: "transparent",
      text: "#6c757d",
      border: "#6c757d",
      hoverBackground: "#6c757d",
      hoverText: "#ffffff",
      hoverBorder: "#6c757d",
    },
    text: {
      background: "transparent",
      text: "#6c757d",
      border: "none",
      hoverBackground: "transparent",
      hoverText: "#495057",
      hoverBorder: "none",
    },
  },
  success: {
    contained: {
      background: "#28a745",
      text: "#ffffff",
      border: "#28a745",
      hoverBackground: "#1e7e34",
      hoverText: "#ffffff",
      hoverBorder: "#1e7e34",
    },
    outlined: {
      background: "transparent",
      text: "#28a745",
      border: "#28a745",
      hoverBackground: "#28a745",
      hoverText: "#ffffff",
      hoverBorder: "#28a745",
    },
    text: {
      background: "transparent",
      text: "#28a745",
      border: "none",
      hoverBackground: "transparent",
      hoverText: "#1e7e34",
      hoverBorder: "none",
    },
  },
  info: {
    contained: {
      background: "#17a2b8",
      text: "#ffffff",
      border: "#17a2b8",
      hoverBackground: "#117a8b",
      hoverText: "#ffffff",
      hoverBorder: "#117a8b",
    },
    outlined: {
      background: "transparent",
      text: "#17a2b8",
      border: "#17a2b8",
      hoverBackground: "#17a2b8",
      hoverText: "#ffffff",
      hoverBorder: "#17a2b8",
    },
    text: {
      background: "transparent",
      text: "#17a2b8",
      border: "none",
      hoverBackground: "transparent",
      hoverText: "#117a8b",
      hoverBorder: "none",
    },
  },
  warning: {
    contained: {
      background: "#ffc107",
      text: "#ffffff",
      border: "#ffc107",
      hoverBackground: "#d39e00",
      hoverText: "#ffffff",
      hoverBorder: "#d39e00",
    },
    outlined: {
      background: "transparent",
      text: "#ffc107",
      border: "#ffc107",
      hoverBackground: "#ffc107",
      hoverText: "#ffffff",
      hoverBorder: "#ffc107",
    },
    text: {
      background: "transparent",
      text: "#ffc107",
      border: "none",
      hoverBackground: "transparent",
      hoverText: "#d39e00",
      hoverBorder: "none",
    },
  },
  error: {
    contained: {
      background: "#D92D20",
      text: "#ffffff",
      border: "#D92D20",
      hoverBackground: "#C5291D",
      hoverText: "#ffffff",
      hoverBorder: "#C5291D",
    },
    outlined: {
      background: "transparent",
      text: "#D92D20",
      border: "#D92D20",
      hoverBackground: "#D92D20",
      hoverText: "#ffffff",
      hoverBorder: "#D92D20",
    },
    text: {
      background: "transparent",
      text: "#D92D20",
      border: "none",
      hoverBackground: "transparent",
      hoverText: "#C5291D",
      hoverBorder: "none",
    },
  },
};

const Button = styled.button`
    background-color: ${(props) =>
      themeColors[props.theme]?.[props.variant]?.background ||
      themeColors[props.theme]?.contained?.background ||
      themeColors.primary.contained.background};
    color: ${(props) =>
      themeColors[props.theme]?.[props.variant]?.text ||
      themeColors[props.theme]?.contained?.text ||
      themeColors.primary.contained.text};
    font-size: 1em;
    padding: 0.25em 1em;
    border: ${(props) =>
      props.variant !== "text"
        ? `2px solid ${
            themeColors[props.theme]?.[props.variant]?.border ||
            themeColors[props.theme]?.contained?.border ||
            themeColors.primary.contained.border
          }`
        : "none"};
    border-radius: 10px;
    cursor: ${(props) =>
      props.disabled || props.loading ? "not-allowed" : "pointer"};
    &:hover {
      background-color: ${(props) =>
        themeColors[props.theme]?.[props.variant]?.hoverBackground ||
        themeColors[props.theme]?.contained?.hoverBackground ||
        themeColors.primary.contained.hoverBackground};
      color: ${(props) =>
        themeColors[props.theme]?.[props.variant]?.hoverText ||
        themeColors[props.theme]?.contained?.hoverText ||
        themeColors.primary.contained.hoverText}};
      border: ${(props) =>
        props.variant !== "text"
          ? `2px solid ${
              themeColors[props.theme]?.[props.variant]?.hoverBorder ||
              themeColors[props.theme]?.contained?.hoverBorder ||
              themeColors.primary.contained.hoverBorder
            }
            }`
          : "none"};
    }
    &:disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  `;

return (
  <div>
    <Button
      theme={props.theme}
      variant={props.variant}
      onClick={props.onClick}
      disabled={props.loading || props.disabled}
    >
      {props.loading ? (
        <div>loading</div>
      ) : (
        <div>{props.label ?? "Submit"}</div>
      )}
    </Button>
  </div>
);
