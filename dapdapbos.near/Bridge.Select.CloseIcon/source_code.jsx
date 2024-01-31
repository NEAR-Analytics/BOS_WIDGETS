const Size = props.size || 18;
const disabled = props.disabled || false

const CloseIcon = styled.div`
  cursor: pointer;
  transition: 0.5s;
  :hover {
    opacity: 0.8;
    transform: scale(1.3);
  }
`;

return (
  <CloseIcon
    style={{ width: Size * 1.5, height: Size * 1.5, opacity: disabled ? 0.5 : 1 }}
    onClick={() => {
      props.onClose?.();
    }}
  >
    <svg
      width={Size}
      height={Size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.5 5L5.5 15M5.5 5L15.5 15"
        stroke="currentColor"
        stroke-width="1.66667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </CloseIcon>
);
