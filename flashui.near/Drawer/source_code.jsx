let direction = props.direction ?? "left";
let background = props.background ?? "white";
let isOpen = props.isOpen ?? false;
let action, top, bottom, right, left, width, height;
let onClose = props.onClose;

switch (direction) {
  case "left":
    action = "slideFromLeft";
    height = "100vh";
    width = props.width ?? "30%";
    top = "0";
    left = "0";
    break;
  case "right":
    action = "slideFromRight";
    height = "100vh";
    width = props.width ?? "30%";
    top = "0";
    right = "0";
    break;
  case "bottom":
    action = "slideFromBottom";
    height = props.height ?? "30%";
    width = "100%";
    bottom = "0";
    left = "0";
    break;
  case "top":
    action = "slideFromTop";
    height = props.height ?? "30%";
    width = "100%";
    top = "0";
    left = "0";
    break;
}

const DrawerBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: rgba(0,0,0,0.5);
`;

const Drawer = styled.div`
    @keyframes slideFromRight {
        0%      {  transform: translate(200%, 0)}
        100%    {  transform: translate(0, 0)}
    }
    @keyframes slideFromLeft {
        0%      {  transform: translate(-100%, 0)}
        100%    {  transform: translate(0, 0)}
    }
    @keyframes slideFromBottom {
        0%      {  transform: translate(0, 200%)}
        100%    {  transform: translate(0, 0)}
    }
    @keyframes slideFromTop {
        0%      {  transform: translate(0, -100%)}
        100%    {  transform: translate(0, 0)}
    }
    position: absolute;
    right: ${right};
    top: ${top};
    left: ${left};
    bottom: ${bottom};
    height: ${height};
    width: ${width};
    background: ${background};
    animation: ${action} .4s;
`;

return (
  <>
    {isOpen && (
      <DrawerBackground onClick={onClose}>
        <Drawer>{props.children}</Drawer>
      </DrawerBackground>
    )}
  </>
);
