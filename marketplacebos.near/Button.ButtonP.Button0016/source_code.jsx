const Button0016 = styled.button`
  width: ${(props) => props.width || "150px"};
  height: ${(props) => props.height || "60px"};
  border: 3px solid #315cfd;
  border-radius: 45px;
  transition: all 0.3s;
  cursor: pointer;
  background: white;
  font-size: ${(props) => props.fontsize || "1.2em"};
  font-weight:  ${(props) => props.fontweight || "550"};
  font-family: 'Montserrat', sans-serif;

  &:hover {
    background: #315cfd;
    color: white;
    font-size: 1.5em;
  }`;
const text = props.text || "Button0016";
const width = props.width;
const height = props.height;
const fontsize = props.fontsize;
const fontweight = props.fontweight;
return (
  <Button0016 width={width} height={height}>
    {text}
  </Button0016>
);
