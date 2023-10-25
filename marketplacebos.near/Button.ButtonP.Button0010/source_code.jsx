const Button0010 = styled.button`
  color: ${(props) => props.color|| "#ecf0f1"};
  font-size: 17px;
  background-color: #e67e22;
  border: 1px solid #f39c12;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 6px 0px #d35400;
  transition: all 0.1s;

  &:active {
    box-shadow: 0px 2px 0px #d35400;
    position: relative;
    top: 2px;
  }`;

  const text = props.text || "Button0010";
  const color = props.color;
return <Button0010>{text}</Button0010>;
