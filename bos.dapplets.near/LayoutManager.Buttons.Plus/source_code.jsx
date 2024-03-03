const { widgets, onClick } = props

const ButtonPlus = styled.button`
  display: flex;
  position: absolute;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  border: 1px solid #384bff;
  z-index: 1081;
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
      bottom: widgets && widgets.length ? '0' : '9px',
      border: widgets && widgets.length ? '1px solid #384bff' : 'none',
    }}
    title={!context.accountId ? 'Connect wallet' : null}
    onClick={!context.accountId ? null : onClick}
  >
    {plusIcon}
  </ButtonPlus>
)
