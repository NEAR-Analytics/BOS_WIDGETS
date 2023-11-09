const CustomLoader = styled.div`--d: 22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: #766DF4;
  box-shadow: 
    calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
    calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
    calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
    calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
    calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
    calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
    calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
  animation: s7 1s infinite steps(8);

  @keyframes s7 {
    100% {
      transform: rotate(1turn);
    }
  }`;
return <CustomLoader />;
