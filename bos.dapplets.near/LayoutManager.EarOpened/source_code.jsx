const { widgets, isEditMode, handleOpenMenu, enableEditMode, disableEditMode } = props

const WrapperButtonPlusDefault = styled.div`
  width: 43px;
  height: 62px;
  border-radius: 0px 4px 4px 0px;
  border: 1px solid rgb(56, 75, 255);
  position: absolute;
  top: 30px;
  background: #f8f9ff;
  z-index: 1081;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`

return widgets && widgets.length ? (
  <>
    <Widget src='bos.dapplets.near/widget/LayoutManager.SupportingSpan'/>
    <Widget
      src="bos.dapplets.near/widget/LayoutManager.Buttons.Plus"
      props={{ widgets, handleOpenMenu }}
    />
  </>
) : (
  <>
    {isEditMode ? (
      <Widget
        src='bos.dapplets.near/widget/LayoutManager.Buttons.Apply'
        props={{ onClick: disableEditMode }}
      />
    ) : (
      <Widget
        src='bos.dapplets.near/widget/LayoutManager.Buttons.Edit'
        props={{ onClick: enableEditMode }}
      />
    )}
    <WrapperButtonPlusDefault>
      <Widget
        src='bos.dapplets.near/widget/LayoutManager.Buttons.PlusDefault'
        props={{ onClick: handleOpenMenu }}
      />
    </WrapperButtonPlusDefault>
  </>
)
