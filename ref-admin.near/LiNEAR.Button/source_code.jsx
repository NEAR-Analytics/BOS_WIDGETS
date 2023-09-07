const PrimaryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  font-weight: 500;
  font-size: 20px;
  width: 100%;
  background: #00ffa3;
  border-radius: 8px;
  overflow: hidden;
  padding: 8px 0;
  position: relative;
  z-index: 0;
  color: #101011;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 770px) {
    font-size: 16px;
  }
`;

const OutlineButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #00ffa3;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  padding: 8px 0;
  transition: all 0.3s ease-in-out;
  background: #1a2e33;
  border: 1px solid #00ffa3;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 770px) {
    font-size: 16px;
  }
`;
const type = props.type || "primary"; // primary || outline
if (type === "outline") {
  return (
    <OutlineButton disabled={props.disabled} onClick={props.onClick}>
      {props.text} {props.firstIconName}
    </OutlineButton>
  );
} else {
  return (
    <PrimaryButton disabled={props.disabled} onClick={props.onClick}>
      {props.text} {props.firstIconName}
    </PrimaryButton>
  );
}
