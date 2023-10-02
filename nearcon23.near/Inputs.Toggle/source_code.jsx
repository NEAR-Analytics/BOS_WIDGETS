const Box = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5em;
  width:fit-content;
  border-width:0px;

  .switch {
    width: 50px;
    height: 25px;
    padding: 0;
    background-color: var(--blackA9);
    border-radius: 9999px;
    position: relative;
    box-shadow: 0 2px 10px var(--blackA7);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  .switch[data-state="checked"] {
     border-width:0px;
    background-color: #63E3A4;
  }

  .switch {
    border-width:0px;
    background-color: gray;
  }

  .thumb {
    display: block;
    width: 21px;
    transform: scale(1.5);
    border-width:0px;
    height: 21px;
    background-color: white;
    border-radius: 9999px;
    border-width:0px;
    box-shadow: 0 2px 2px var(--blackA7);
    transition: transform 100ms;
    transform: translateX(2px);
    will-change: transform;
  }
  .thumb[data-state="checked"] {
    transform: translateX(28px);
  }
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  margin-left:10px;
  margin-right:10px;
  line-height: 1em;
  color: gray;
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
