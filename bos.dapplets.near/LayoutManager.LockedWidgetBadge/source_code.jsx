const LockedIcon = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="6.5" fill="#3D7FFF" stroke="white" />
    <g>
      <path
        d="M9.33333 6.66666H4.66667C4.29848 6.66666 4 6.96514 4 7.33333V9.66666C4 10.0349 4.29848 10.3333 4.66667 10.3333H9.33333C9.70152 10.3333 10 10.0349 10 9.66666V7.33333C10 6.96514 9.70152 6.66666 9.33333 6.66666Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.33337 6.66666V5.33333C5.33337 4.8913 5.50897 4.46738 5.82153 4.15482C6.13409 3.84226 6.55801 3.66666 7.00004 3.66666C7.44207 3.66666 7.86599 3.84226 8.17855 4.15482C8.49111 4.46738 8.66671 4.8913 8.66671 5.33333V6.66666"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

const Badge = styled.span`
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
`;

return <Badge>{LockedIcon}</Badge>;
