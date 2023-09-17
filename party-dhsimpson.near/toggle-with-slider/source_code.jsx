const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #2196F3;
  }

  &:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
  }

  border-radius: 34px;

  &:before {
    border-radius: 50%;
  }
`;

const [isChecked, setIsChecked] = useState(true);

const handleToggle = () => {
  setIsChecked(!isChecked);

  // 여기에 토글 상태에 따른 로직을 실행하실 수 있습니다.
  // if (isChecked) {
  //   console.log("Switched Off");
  // } else {
  //   console.log("Switched On");
  // }
};

return (
  <Switch>
    <Input type="checkbox" checked={isChecked} onChange={handleToggle} />
    <Slider className="slider round" />
  </Switch>
);
