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
    position: relative;
    width: 23%;
    padding-bottom: 23%;
    float: left;
    height: 0;
    margin: 1%;
        box-sizing: border-box;
    max-width: 36px;
    max-height: 36px;
    min-width: 14px;
        min-height: 14px;
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
  transition: all 0.3s;
    svg {
        transition: all 0.3s;
  transform: scale(1.2);
  }
}

  svg {
   
    // transition: all 0.3s;
    // width: 100%;
    // max-width: 100%;
    // max-height: 100%;
 height: 100%;
width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
}

}
`;

return <RemoveAction onClick={props.onClick}>{RemoveIcon}</RemoveAction>;
