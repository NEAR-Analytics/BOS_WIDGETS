const Button0028 = styled.button`
  text-transform: uppercase;
  text-decoration: none;
  color: rgb(27, 27, 27);
  padding: 10px 30px;
  border: 1px solid;
  border-radius: 1000px;
  display: inline-block;
  transition: all 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(27, 27, 27, 0.5);
  }

  &:active {
    transform: translateY(-3px);
  }

  &::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    top: 0;
    left: 0;
    position: absolute;
    z-index: -1;
    transition: all 0.3s;
  }

  &:hover::after {
    background-color: rgb(0, 238, 255);
    transform: scaleX(1.4) scaleY(1.5);
    opacity: 0;
  }
`;

const text = props.text || "Button0028";
return (<Button0028>{text}</Button0028>);
