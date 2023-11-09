const Checkbox = styled.input`
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background-color: #bbb;
  transition: all 0.3s;

  &:checked {
    animation: rotateAnimation 0.3s ease-in forwards;
    background-color: rgb(120, 190, 120);
  }

  &::before {
    content: '';
    position: absolute;
    border: solid #fff;
    display: block;
    width: 0.3em;
    height: 0.6em;
    border-width: 0 0.2em 0.2em 0;
    z-index: 1;
    opacity: 0;
    right: calc(50% - 0.3em);
    top: calc(50% - 0.6em);
    transform: rotate(0deg);
    transition: all 0.3s;
    transform-origin: center center;
  }


  @keyframes rotateAnimation {
    0% {
      opacity: 1;
      transform: scale(1) rotateY(0deg);
    }

    50% {
      opacity: 0;
      transform: scale(0.8) rotateY(180deg);
    }

    100% {
      opacity: 1;
      transform: scale(1) rotateY(360deg);
    }
  }
`;
return <Checkbox type="checkbox" />;
