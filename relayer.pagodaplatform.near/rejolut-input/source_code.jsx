const themeColors = {
  contained: {
    background: "#ffffff",
    text: "#666666",
    border: "#969696",
    hoverBackground: "transparent",
    hoverText: "#1A1A1A",
    hoverBorder: "#503BC4",
  },
  outlined: {
    background: "#ffffff",
    text: "#666666",
    border: "#969696",
    hoverBackground: "transparent",
    hoverText: "#1A1A1A",
    hoverBorder: "#503BC4",
  },
  text: {
    background: "#ffffff",
    text: "#666666",
    border: "none",
    hoverBackground: "transparent",
    hoverText: "#1A1A1A",
    hoverBorder: "#503BC4",
  },
  error: {
    background: "#dc3545",
    text: "#dc3545",
    border: "#dc3545",
    hoverBackground: "#a71d2a",
    hoverText: "#ffffff",
    hoverBorder: "#a71d2a",
  },
};

const Input = styled.input`
    background-color: ${(props) =>
      themeColors[props.variant]?.background ||
      themeColors.contained.background};
    color: ${(props) =>
      themeColors[props.variant]?.text || themeColors.contained.text};
    font-size: 1em;
    padding: 0.25em 1em;
    padding-left: ${(props) => (props.startIcon ? "2.5rem" : "1em")} ;
    padding-right: ${(props) => (props.endIcon ? "2.5rem" : "1em")} ;
    border: ${(props) =>
      props.variant !== "text"
        ? `2px solid ${
            themeColors[props.variant]?.border || themeColors.contained.border
          }`
        : "none"};
    border-radius: 10px;
    transition: all 0.3s ease;
    padding-right:30px
    &::placeholder {
      color: ${(props) =>
        themeColors[props.variant]?.text || themeColors.contained.text};
    }
  
    &:hover {
      background-color: ${(props) =>
        themeColors[props.variant]?.hoverBackground ||
        themeColors[props.variant]?.background ||
        themeColors.contained.background};
      color: ${(props) =>
        themeColors[props.variant]?.hoverText ||
        themeColors[props.variant]?.text ||
        themeColors.contained.text};
      border: ${(props) =>
        `2px solid ${
          themeColors[props.variant]?.hoverBorder ||
          themeColors[props.variant]?.border ||
          themeColors.contained.border
        }`}
  }
    &:focus {
      outline: none;
      box-shadow: 0 0 5px ${(props) =>
        themeColors[props.variant]?.hoverBorder ||
        themeColors.contained.hoverBorder};
    }
  
    &:disabled {
      background-color: transparent;
      color: #D2D2D2;
      border: 2px solid #D2D2D2;
      cursor: not-allowed;
    }
  
    ${(props) =>
      props.error &&
      `
      border-color: ${themeColors.error.border};
      color: ${themeColors.error.text};
    `}
  `;
const InputContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StartIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
`;

const EndIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
`;

return (
  <div>
    <div>{props.label}</div>
    <InputContainer>
      {props.startIcon && <StartIcon>{props.startIcon}</StartIcon>}
      <Input
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        variant={props.variant}
      />
      {props.endIcon && (
        <EndIcon onClick={props.rightIconClick}>{props.endIcon}</EndIcon>
      )}
    </InputContainer>
  </div>
);
