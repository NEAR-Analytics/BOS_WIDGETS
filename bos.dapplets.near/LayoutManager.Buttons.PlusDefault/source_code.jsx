const { onClick } = props

const ButtonPlusDefault = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  bottom: 7px;
  background: ${(p) => (p.default ? '#384bff !important' : '#f8f9ff !important')};
  position: relative;
  margin-top: 40px;
  cursor: pointer;
  border: 1px solid #384bff;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`

const plusDefault = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="13"
    viewBox="0 0 12 13"
    fill="none"
  >
    <path
      d="M6 1.5V11.5"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M1 6.5H11"
      stroke="white"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)

return <ButtonPlusDefault
  default
  title={!context.accountId ? 'Connect wallet' : null}
  onClick={!context.accountId ? null : onClick}
>
  {plusDefault}
</ButtonPlusDefault>