const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1.5s linear  infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const iconCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8" stroke="#1E2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
)
return (
  <StyledLoading>{iconCircle}</StyledLoading>
)