const { onClick, top } = props

const ButtonEdit = styled.button`
  position: absolute;
  top: 0;
  margin-bottom: 0;
  padding: 0;
  display: flex;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border: 1px solid #384bff;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(208, 211, 255, 1);
  }

  svg {
    path {
      stroke: #384bff;
    }
  }
`;

const iconEdit = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path d="M12 7L2 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

return <ButtonEdit style={{ top: top ? '5px' : '' }} onClick={onClick}>{iconEdit}</ButtonEdit>
