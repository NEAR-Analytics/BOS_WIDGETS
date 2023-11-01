const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  width:fit-content;
  border-width:0px;
  background-color: transparent;

  .switch {
    width: 30px;
    height: 18px;
    padding: 0;
    border-radius: 9999px;
    background-color: transparent;
    border: 4px solid black;
    position: relative;
    box-shadow: 0 2px 10px var(--blackA7);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .thumb {
    display: block;
    width: 8px;
    border-width:0px;
    height: 8px;
    background-color: transparent;
    border-radius: 9999px;
    border: 3px solid black;
    box-shadow: 0 2px 2px var(--blackA7);
    transition: transform 100ms;
    transform: translate(2px);
    will-change: transform;
  }
  .thumb[data-state="checked"] {
    transform: translate(12px);
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  margin-left:1px;
  margin-right:1px;
  line-height: 1em;
  font-style: normal;
`;

return (
  <Box>
    {props?.leftLabel && (
      <Label htmlFor={props.id}>{props?.leftLabel ?? "Left Label"}</Label>
    )}
    <Switch.Root
      checked={props.value}
      onCheckedChange={props.onChange}
      id={props.id}
      className="switch"
    >
      <Switch.Thumb className="thumb" />
    </Switch.Root>
    {props?.rightLabel && (
      <Label htmlFor={props.id}>{props?.rightLabel ?? "Right Label"}</Label>
    )}
  </Box>
);
