const downArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 5.22778L19 18.2278M19 18.2278V5.74778M19 18.2278H6.52"
      stroke="black"
      stroke-width="1.21179"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

const Root = styled.button`
  width: 197.856px;
  height: 61.398px;
  flex-shrink: 0;
  background: var(--nearcon-app-medium-purple, #7269E1);
  position: relative;
  cursor: pointer;
  .buttonElement {
     display: flex;
      width: 200.23px;
      height: 61px;
      padding: 12.54px 19.23px 12.002px 20px;
      justify-content: center;
      align-items: center;
      background: var(--nearcon-app-spring-green, ${
        props.whiteBg ? "white" : "#00EC97"
      }); 
      border: 2px dashed #00EC97;
      margin-right: 5px;
      position: absolute;
      right: 2px;
      top: -9px;
      
      h1 {
        color: var(--solana-com-black-russian, #010102);
        margin-bottom: 0;
        text-align: center;
        font-family: Inter;
        font-size: 18px;
        font-style: normal;
        margin-right: 5px;
        font-weight: 700;
      }
  }
  .buttonElement:before {
    content: '';
  position: absolute;
  top: -4px; /* Adjust these values as needed to position the border outside the container */
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px dashed #00EC97;
  }
`;

const ButtonElement = styled.div`
 
`;

return (
  <Root>
    <div className="buttonElement">
      <h1>{props.title ?? "Register Now"}</h1> {downArrow}
    </div>
  </Root>
);
