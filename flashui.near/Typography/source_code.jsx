// Content
let text = props.text ?? "Paragraph";

// Text Color
let color = props.color ?? "black";
let background = props.background ?? "transparency";

// Text Alignment
let textAlign = props.textAlign ?? "left";
let reverse = props.reverse ?? false;
let verticalAlign = props.verticalAlign ?? "baseline";

// Text Decoration
let textDecoration = props.textDecoration ?? "none";

// Text Transform
let textTransform = props.textTransform ?? "none";

// Text Spacing
let textIndent = props.textIndent ?? "0";
let letterSpacing = props.letterSpacing ?? "0";
let lineHeight = props.lineHeight ?? "1";
let wordSpacing = props.wordSpacing ?? "0";
let whiteSpace = props.whiteSpace ?? "nowrap";

// Text Size
let variant = props.variant ?? "p";
let fontSize = props.fontSize;
let component = props.component ?? "p";
let fontWeight = props.fontWeight ?? "regular";

// Text Shadow
let textShadow = props.textShadow ?? "none";

if (!fontSize) {
  switch (variant) {
    case "h1":
      fontSize = "6vw";
      break;
    case "h2":
      fontSize = "5vw";
      break;
    case "h3":
      fontSize = "4vw";
      break;
    case "h4":
      fontSize = "3vw";
      break;
    case "h5":
      fontSize = "2vw";
      break;
    case "h6":
      fontSize = "1.5vw";
      break;
    case "p":
      fontSize = "1vw";
      break;
    default:
      break;
  }
}

const Typography = styled.h1`
  color: ${color};
  background: ${background};

  text-align: ${textAlign};
  direction: ${reverse ? "rtl" : "ltr"};
  unicode-bidi: bidi-override;
  vertical-align: ${verticalAlign};

  text-decoration: ${textDecoration};

  text-transform: ${textTransform};

  text-indent: ${textIndent};
  letter-spacing: ${letterSpacing};
  line-height: ${lineHeight};
  word-spacing: ${wordSpacing};
  white-space: ${whiteSpace};

  font-size: ${fontSize};
  font-weight: ${fontWeight};
  
  text-shadow: ${textShadow};
`;

switch (component) {
  case "h1":
    return (
      <h1>
        <Typography>{text}</Typography>
      </h1>
    );
  case "h2":
    return (
      <h2>
        <Typography>{text}</Typography>
      </h2>
    );
  case "h3":
    return (
      <h4>
        <Typography>{text}</Typography>
      </h4>
    );
  case "h4":
    return (
      <h4>
        <Typography>{text}</Typography>
      </h4>
    );
  case "h5":
    return (
      <h5>
        <Typography>{text}</Typography>
      </h5>
    );
  case "h6":
    return (
      <h6>
        <Typography>{text}</Typography>
      </h6>
    );
  case "p":
    return (
      <p>
        <Typography>{text}</Typography>
      </p>
    );
  default:
    break;
}
