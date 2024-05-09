const StyledDialog = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`
const StyledMasker = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);
  z-index: 99;
`
const StyledDialogBody = styled.div`
  position: relative;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 334px;
  height: 221px;
  padding: 40px 14px 20px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledTips = styled.div`
  width: 306px;
  color: #FFF;
  text-align: center;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledButton = styled.div`
  margin: 17px 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 268px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--button-color);
  cursor: pointer;

  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledClose = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`
const {
  windowOpen,
  onClose
} = props
return (
  <StyledDialog>
    <StyledMasker onClick={onClose} />
    <StyledDialogBody>
      <StyledTips>
        New panpad users need to verify social accounts and submit on-chain verification before staking
      </StyledTips>
      <StyledButton
        onClick={() => {
          windowOpen("https://penpad.io/profile", "_blank")
        }}
      >Go to Panpad profile</StyledButton>
      <StyledClose onClick={onClose}>Close</StyledClose>
    </StyledDialogBody>
  </StyledDialog>
)