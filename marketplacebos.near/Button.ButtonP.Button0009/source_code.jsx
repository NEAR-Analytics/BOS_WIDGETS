const Button0009 = styled.button`
  position: relative;
  width: 11em;
  height: 4em;
  outline: none;
  transition: 0.1s;
  background-color: transparent;
  border: none;
  font-size: 13px;
  font-weight: bold;
  color: #ddebf0;
  cursor: pointer;

  #clip {
    --color: #2761c3;
    position: absolute;
    top: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border: 5px double var(--color);
    box-shadow: inset 0px 0px 15px #195480;
    clip-path: polygon(
      30% 0%,
      70% 0%,
      100% 30%,
      100% 70%,
      70% 100%,
      30% 100%,
      0% 70%,
      0% 30%
    );
  }

  .arrow {
    position: absolute;
    transition: 0.2s;
    background-color: #2761c3;
    top: 35%;
    width: 11%;
    height: 30%;
  }

  #leftArrow {
    left: -13.5%;
    clip-path: polygon(100% 0, 100% 100%, 0 50%);
  }

  #rightArrow {
    clip-path: polygon(100% 49%, 0 0, 0 100%);
    left: 103%;
  }

  &:hover #rightArrow {
    background-color: #27c39f;
    left: -14%;
    animation: 0.6s ease-in-out both infinite alternate rightArrow8;
  }

  &:hover #leftArrow {
    background-color: #27c39f;
    left: 103%;
    animation: 0.6s ease-in-out both infinite alternate leftArrow8;
  }

  .corner {
    position: absolute;
    width: 4em;
    height: 4em;
    background-color: #2761c3;
    box-shadow: inset 1px 1px 8px #2781c3;
    transform: scale(1) rotate(45deg);
    transition: 0.2s;
  }

  #rightTop {
    top: -1.98em;
    left: 91%;
  }

  #leftTop {
    top: -1.96em;
    left: -3.0em;
  }

  #leftBottom {
    top: 2.10em;
    left: -2.15em;
  }

  #rightBottom {
    top: 45%;
    left: 88%;
  }

  &:hover #leftTop {
    animation: 0.1s ease-in-out 0.05s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  &:hover #rightTop {
    animation: 0.1s ease-in-out 0.15s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  &:hover #rightBottom {
    animation: 0.1s ease-in-out 0.25s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  &:hover #leftBottom {
    animation: 0.1s ease-in-out 0.35s both changeColor8,
      0.2s linear 0.4s both lightEffect8;
  }

  &:hover .corner {
    transform: scale(1.25) rotate(45deg);
  }

  &:hover #clip {
    animation: 0.2s ease-in-out 0.55s both greenLight8;
    --color: #27c39f;
  }`;
  const text = props.text || "Button0009";

return (
  <Button0009>
    {text}
    <div id="clip">
      <div id="leftTop" className="corner"></div>
      <div id="rightBottom" className="corner"></div>
      <div id="rightTop" className="corner"></div>
      <div id="leftBottom" className="corner"></div>
    </div>
    <span id="rightArrow" className="arrow"></span>
    <span id="leftArrow" className="arrow"></span>
  </Button0009>
);
