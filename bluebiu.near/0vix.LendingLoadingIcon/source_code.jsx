const Size = props.size || 18;

const Loading = styled.div`
  width: ${Size}px;
  height: ${Size}px;
  line-height: ${Size}px;
  animation: loading 1s linear infinite;
  transform-origin: center center;
  display: inline-block;
  text-align: center;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

return (
  <Loading style={{ ...props.style }}>
    <svg
      width={Size}
      height={Size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity="0.2"
        cx="9"
        cy="9"
        r="8"
        stroke="white"
        stroke-width="2"
      />
      <path
        d="M1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </Loading>
);
