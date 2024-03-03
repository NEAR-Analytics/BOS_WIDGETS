const { onClick, top } = props

const ButtonApply = styled.button`
  position: absolute;
  top: 0;
  margin-bottom: 0;
  padding: 0;
  padding-right: 2px;
  display: flex;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(56, 75, 255, 1);
  transition: all 0.2s;

  &:hover {
    background-color: rgba(6, 25, 205, 1);
  }
`;

const iconApply = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="14"
    viewBox="0 0 15 14"
    fill="none"
  >
    <path
      d="M2 7H9.125M3.5 9.25L1.25 7L3.5 4.75M7.25 3.25V2.5C7.25 2.10218 7.40804 1.72064 7.68934 1.43934C7.97064 1.15804 8.35218 1 8.75 1H12.5C12.8978 1 13.2794 1.15804 13.5607 1.43934C13.842 1.72064 14 2.10218 14 2.5V11.5C14 11.8978 13.842 12.2794 13.5607 12.5607C13.2794 12.842 12.8978 13 12.5 13H8.75C8.35218 13 7.97064 12.842 7.68934 12.5607C7.40804 12.2794 7.25 11.8978 7.25 11.5V10.75"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="white"
    />
  </svg>
);

return <ButtonApply style={{ top: top ? '5px' : '' }} onClick={onClick}>{iconApply}</ButtonApply>
