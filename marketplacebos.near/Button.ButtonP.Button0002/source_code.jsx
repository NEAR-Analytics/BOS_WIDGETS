const Button0002 = styled.button`
  height: ${(props) => props.fontsize || "3em"};
  width: ${(props) => props.fontsize || "8em"};
  border: none;
  border-radius: 10em;
  background: #016dd9;
  font-size: 17px;
  color: #ffffff;
  font-family: inherit;
  font-weight: 500;

  &:hover {
    animation-name: shakeAnimation;
    animation-duration: 0.3s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes shakeAnimation {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }`;
const text = props.text || "Button0002";
const height = props.height;
const width = props.width;
return <Button0002>{text}</Button0002>;
