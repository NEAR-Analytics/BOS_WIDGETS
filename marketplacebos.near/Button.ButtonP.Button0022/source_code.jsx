const Button0022 = styled.button`
  position: relative;
  border: none;
  font-size: ${(props) => props.fontsize || "14px"};
  font-family: inherit;
  color: #fff;
  width: ${(props) => props.width || "9em"};
  height: ${(props) => props.height || "3em"};
  line-height: 2em;
  text-align: center;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 300%;
  border-radius: 30px;
  z-index: 1;
  cursor: pointer;

  &:hover {
    animation: ani 8s linear infinite;
    border: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
    background-size: 400%;
    border-radius: 35px;
    transition: 1s;
  }

  &:hover::before {
    filter: blur(20px);
  }

  &:active {
    background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  }

  @keyframes ani {
    0% {
      background-position: 0%;
    }

    100% {
      background-position: 400%;
    }
  }
`;
const text = props.text || "Button0022";
const width = props.width;
const height = props.height;
const fontsize = props.fontsize;

return (
  <Button0022 width={width} height={height} fontsize={fontsize}>
    {text}
  </Button0022>
);
