const Button0002 = styled.button`
  height: 3em;
  width: 8em;
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
  }
`;

const props = {
  copyBtn:
    "const Button0002 = styled.button`\n" +
    `height: 3em;
  width: 8em;
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
  }` +
    "`;" +
    `\n return(
    <Button0002>Button 0002</Button0002>
)`,
  component: <Button0002>Button0002</Button0002>,
  detailLink: "https://near.org/marketplacebos.near/widget/Detail.Button0002",
};
return (
  <>
    <Widget src="marketplacebos.near/widget/CardMain.CardMini" props={props} />
  </>
);
