const RemoveIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <circle cx="7" cy="7" r="6.5" fill="#DB504A" stroke="white" />
    <path
      d="M9.24976 4.75L4.74999 9.24977"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.75 4.75L9.24977 9.24977"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RemoveAction = styled.div`
  cursor: pointer;
position: relative;
background: #DB504A;
box-sizing: border-box;
border: 1px solid #fff;
max-width: 36px;
height:100%
min-width: 14px;
display: flex;
align-items:center;
justify-content:center;
flex: 1 1 auto;
border-radius:50%;
  @keyframes translateAnimationBtn {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: translateAnimationBtn 0.5s linear forwards;
  transition: all 0.3s;

  &:hover {
    svg {
      transform: scale(1.2);
    }
  }

  }
`;

const RemoveActionLineLeft = styled.div`
display: flex;
    width: 2px;
    height: 50%;
     position: absolute;
   
    transform: rotate(45deg) ;
    background: rgb(255, 255, 255);
   
`;
const RemoveActionLineRight = styled.div`
display: flex;
   width: 2px;
    height: 50%;
     position: absolute;
   
    transform: rotate(-45deg) ;
    background: rgb(255, 255, 255);`;

return (
  <RemoveAction onClick={props.onClick}>
    <RemoveActionLineLeft />
    <RemoveActionLineRight />
  </RemoveAction>
);
