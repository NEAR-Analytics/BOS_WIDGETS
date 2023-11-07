const type = props.type ?? "loading";
const color = props.color ?? "blue";
const size = props.size ?? "sm";

let colorType = "";
let typeProps = "";
let sizeProps = "";

switch (type) {
  case "loading-grow":
    typeProps = "spinner-grow";
    break;
  case "loading":
    typeProps = "spinner-border";
    break;
  default:
    break;
}
if (size) {
  switch (size) {
    case "sm":
      sizeProps = `${typeProps + "-sm"}   `;
      break;

    case "lg":
      sizeProps = `${typeProps + "-lg"}   `;
      break;
    default:
      break;
  }
}
switch (color) {
  case "blue":
    colorType = "text-primary";
    break;
  case "red":
    colorType = "text-danger";
    break;
  case "black":
    colorType = "text-dark";
    break;
  case "white":
    colorType = "text-light";
    break;
  case "yellow":
    colorType = "text-warning";
    break;
  case "grey":
    colorType = "text-secondary";
    break;
  default:
    break;
}
// render
// return (
//   <Widget
//     src="flashui.testnet/widget/Loading"
//     props={{ type: "loading", color: "red", size: "md" }}
//   />
// );

return (
  <div class={`${typeProps} ${colorType} ${sizeProps} `} role="status"></div>
);
