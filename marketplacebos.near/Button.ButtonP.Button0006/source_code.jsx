const Button0006 = styled.button`
   border: none;
  border-radius: 20px;
  background: linear-gradient(32deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  transition: all 1.5s ease;
  font-family: 'Ropa Sans', sans-serif;
  font-weight: bold;
  letter-spacing: 0.05rem;
  padding: 0;
  cursor: pointer;
  width:  ${(props) => props.width || "180px"};
  height: ${(props) => props.height || "55px"};
  span {
    display: inline-block;
    padding: 15px 35px;
    font-size: 17px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.0625); /* #ffffff10 with 10% opacity */
    backdrop-filter: blur(20px);
    transition: 0.4s ease-in-out;
    transition-property: color;
    height: 100%;
    width: 100%;

    &:hover {
      backdrop-filter: blur(0px);
      color: #ffffff;
    }
  }`;
const text = props.text || "Button0006";
const width= props.width;
const height= props.height;


return (
  <Button0006 width={width} height={height}>
    <span>{text}</span>
  </Button0006>
);
