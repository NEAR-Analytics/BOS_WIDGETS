const { onClick, top } = props

const ButtonEdit = styled.button`
  position: absolute;
  top: 0;
  margin-bottom: 0;
  border: none;
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  padding: 0;
  border: 1px solid #384bff;
  box-sizing: border-box;
  background: #fff !important;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    path {
      stroke: #384bff !important;
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
