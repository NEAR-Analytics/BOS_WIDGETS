const Button0027 = styled.button`
 background-color: white;
  color: black;
  border-radius: 10em;
  font-size: ${(props) => props.fontsize ||"17px"};
  font-weight: ${(props) => props.fontsize ||"600"};
  padding: 1em 2em;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 1px solid black;
  box-shadow: 0 0 0 0 black;

  &:hover {
    transform: translateY(-4px) translateX(-2px);
    box-shadow: 2px 5px 0 0 black;
  }

  &:active {
    transform: translateY(2px) translateX(1px);
    box-shadow: 0 0 0 0 black;
  }
`;

const text = props.text || "Button0027";
const fontsize = props.fontsize;
const fontweight = props.fontweight;

return (<Button0027 fontsize={fontsize} fontweight={fontweight}>{text}</Button0027>);
