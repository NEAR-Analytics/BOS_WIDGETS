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
    background: "#ffffff",
    text: "#1A1A1A",
    border: "#D92D20",
    hoverBackground: "transparent",
    hoverText: "#1A1A1A",
    hoverBorder: "#D92D20",
  },
};
const variant = props.variant || "contained";

const Input = styled.input`
    background: ${themeColors[variant].background};
    color: ${themeColors[variant].text};
    font-size: 1em;
    padding: 0.25em 1em;
    padding-left: ${(props) => (props.startIcon ? "2.5rem" : "1em")} ;
    padding-right: ${(props) => (props.endIcon ? "2.5rem" : "1em")} ;
    border: ${(props) =>
      variant !== "text"
        ? `2px solid ${themeColors[variant]?.border}`
        : "none"};
    border-radius: 10px;
    transition: all 0.3s ease;
    padding-right:30px
    &::placeholder {
      color: ${themeColors[variant].text};
    }
  
    &:hover {
      background-color:${themeColors[variant].hoverBackground};
      color:${themeColors[variant].hoverText};
      border: ${`2px solid ${themeColors[variant]?.hoverBorder}`}
  }
    &:focus {
      outline: none;
      box-shadow: 0 0 5px ${themeColors[variant]?.hoverBorder};
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

const Textarea = styled.textarea`
    background: ${themeColors[variant].background};
    color: ${themeColors[variant].text};
    font-size: 1em;
    padding: 0.25em 1em;
    padding-left: ${(props) => (props.startIcon ? "2.5rem" : "1em")} ;
    padding-right: ${(props) => (props.endIcon ? "2.5rem" : "1em")} ;
    border: ${(props) =>
      props.variant !== "text"
        ? `2px solid ${themeColors[variant]?.border}`
        : "none"};
    border-radius: 10px;
    transition: all 0.3s ease;
    padding-right:30px
    &::placeholder {
      color: ${themeColors[variant].text};
    }
  
    &:hover {
      background-color:${themeColors[variant].hoverBackground};
      color:${themeColors[variant].hoverText};
      border: ${`2px solid ${themeColors[variant]?.hoverBorder}`}
  }
    &:focus {
      outline: none;
      box-shadow: 0 0 5px ${themeColors[variant]?.hoverBorder};
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
  cursor: pointer;
`;

const Tag = props.multiline ? Textarea : Input;

return (
  <div style={{ padding: "5px 0px" }}>
    <div style={{ padding: "5px 0px" }}>{props.label}</div>
    <InputContainer>
      {props.startIcon && <StartIcon>{props.startIcon}</StartIcon>}
      <Tag
        type={props.type || "text"}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        variant={props.variant}
        rows={props.rows || 5}
        style={props.style}
      />
      {props.endIcon && (
        <EndIcon onClick={props.rightIconClick}>{props.endIcon}</EndIcon>
      )}
    </InputContainer>
  </div>
);
