const { widgets, handleOpenMenu } = props

const ButtonPlus = styled.div`
  display: flex;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  position: relative;
  transform: ${(p) => (p.default ? 'translateY(-25px)' : 'translateY(39px)')};
  cursor: pointer;
  border: 1px solid #384bff;

  &:before {
    content: '';
    display: block;
    width: 1.5px;
    height: 11px;
    border-radius: 2px;
    background: #384bff;
    position: absolute;
    top: 6px;
    left: 10.5px;
  }

  &:after {
    content: '';
    display: block;
    height: 1px;
    width: 11px;
    border-radius: 2px;
    background: #384bff;
    position: absolute;
    top: 10.8px;
    left: 6px;
  }

  @keyframes translateAnimationBtn {
    0% {
      opacity: 0;
    }
    30% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation: translateAnimationBtn 0.5s linear forwards;

  &:hover {
    transform: translateY(-25px) scale(1.1);
  }
  transition: all 0.3s;
`

return (
  <ButtonPlus
    default={widgets && widgets.length ? true : false}
    style={{
      position: widgets && widgets.length ? 'unset' : 'absolute',
      zIndex: '1081',
    }}
    title={!context.accountId ? 'Connect wallet' : null}
    onClick={!context.accountId ? null : handleOpenMenu}
  />
)
