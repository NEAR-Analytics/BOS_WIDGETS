const Button0018 = styled.button`
  outline: none;
  cursor: pointer;
  border: none;
  padding: 0.9rem 2rem;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05rem;
  font-weight: ${(props) =>props.fontweight ||"700"};
  font-size:  ${(props) =>props.fontsize ||"17px"};
  border-radius: 500px;
  overflow: hidden;
  background: #66ff66;
  color: ghostwhite;

  span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
  }

  &:hover span {
    color: black;
  }

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &::before {
    content: "";
    background: #000;
    width: 120%;
    left: -10%;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
  }

  &:hover::before {
    transform: translate3d(100%, 0, 0);
  }`;
const text = props.text || "Button0018";
const fontsize = props.fontsize;
const fontweight = props.fontweight;
return (
  <Button0018 fontsize={fontsize} fontweight={fontweight}>
    <span>{text}</span>
  </Button0018>
);
