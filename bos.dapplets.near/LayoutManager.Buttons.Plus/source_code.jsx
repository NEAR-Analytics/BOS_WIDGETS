const { widgets, onClick } = props

const ButtonPlus = styled.button`
  position: absolute;
  padding: 0;
  display: flex;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  background-color: white;
  border: 1px solid #384bff;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1081;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(208, 211, 255, 1);
  }
`

const plusIcon = (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 6V16" stroke="#384BFF" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 11H16" stroke="#384BFF" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

return (
  <ButtonPlus
    style={{
      bottom: widgets && widgets.length ? '0' : '6px',
      border: widgets && widgets.length ? '1px solid #384bff' : 'none',
      backgroundColor: widgets && widgets.length ? '': 'white',
    }}
    onClick={onClick}
  >
    {plusIcon}
  </ButtonPlus>
)
