const Button0005 = styled.button`
font-family: monospace;
  font-size: 1em;
  color: #FAFAFA;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 10px;
  border: ${(props) => props.border || "4px solid #FAFAFA"};
  background: #252525;
  box-shadow: ${(props) => props.boxshadow || " 6px 6px #fafafa"};
  cursor: pointer;
  margin: 35px 0;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:active {
    box-shadow: none;
    transform: translate(5px, 5px);
  }`;
const text = props.text || "Button0005";
const border = props.border;
const boxshadow = props.boxshadow;

return <Button0005 border={border} boxshadow={boxshadow}>{text}</Button0005>;
