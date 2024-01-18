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
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.75 4.75L9.24977 9.24977"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
);
  
const RemoveAction = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  z-index: 1200;

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
`;

return (
    <RemoveAction onClick={() => props.onClick}>
        {RemoveIcon}
    </RemoveAction>
)