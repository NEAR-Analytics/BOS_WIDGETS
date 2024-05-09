const { text } = props;

const SwitchRoot = styled("Switch.Root")`
  all: unset;
  display: block;
  width: 100px;
  height: 40px;
  border: 3px solid #000;
  border-radius: 9999px;
  position: relative;
  background-color: #fff;
`;

const SwitchThumb = styled("Switch.Thumb")`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.25);
  border-radius: 9999px;
  height: 30px;
  width: 30px;
  transition: transform 200ms;
  transform: translateX(5px);
  will-change: transform;
  color: white;

  &[data-state="checked"] {
    transform: translateX(65px);
  }
`;

return (
  <SwitchRoot>
    <SwitchThumb>
      <div>{text}</div>
    </SwitchThumb>
  </SwitchRoot>
);
