let background = props.background ?? "#1e66f5";
let variant = props.variant ?? "filled";
let color = props.color ?? "#ffffff";
let padding = props.padding ?? ".5rem 1rem";
let radius = props.radius ?? ".5rem";
let disable = props.disable ?? false;
let loading = props.loading ?? false;
let border;
let cursor = "pointer";
let hover = null;

if (disable) {
  background = "#ccd0da";
  color = "#9ca0b0";
  cursor = "not-allowed";
}

switch (variant) {
  case "filled":
    if (!disable) {
      hover = `
            opacity: 0.8;
        `;
    }
    border = `2px solid ${background}`;
    break;
  case "outlined":
    if (!disable) {
      hover = `
            background: ${background};
            color: ${color};
        `;
    }
    border = `2px solid ${background}`;
    if (color == "#ffffff") {
      color = background;
    }
    background = "transparency";
    break;
  case "text":
    if (!disable) {
      hover = `
            background: ${background + 22};
        `;
    }
    color = background;
    background = "transparency";
    border = `2px solid ${background}`;
    break;
  default:
    break;
}

const Button = styled.button`
    all: unset;
    background: ${background};
    color: ${color};
    padding: ${padding};
    border-radius: ${radius};
    border: ${border};
    cursor: ${cursor};
    &: hover {
        ${hover}
    }
`;

return <Button>{props.text}</Button>;
