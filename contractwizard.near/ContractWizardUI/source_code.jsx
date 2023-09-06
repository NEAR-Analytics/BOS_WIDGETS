State.init({
  tokenName: "",
  tokenSymbol: "",
});

const StyledWrapper = styled.div`
  > div {
    padding: 20px;
  }
  .main-content-wrapper {
    display: flex;

    > div {
      padding: 20px;
    }

    .left-side {
      width: 30%;
    }

    .right-side {
      width: 70%;
      background-color: #1b1b18;
      color: white;
      border-radius: 4px
    }
  }

`;

return (
  <StyledWrapper>
    <div>NEAR Contract Wizard</div>
    <div>
      <Widget
        src="near/widget/DIG.Button"
        props={{
          label: "ERC20",
        }}
      />
      <Widget
        src="near/widget/DIG.Button"
        props={{
          label: "ERC721",
        }}
      />
      <Widget
        src="near/widget/DIG.Button"
        props={{
          label: "ERC1155",
        }}
      />
    </div>
    <div className="main-content-wrapper">
      <div className="left-side">
        <div>SETTINGS</div>
        <div className="token-name-wrapper">
          <Widget
            src="near/widget/DIG.Input"
            props={{
              label: "Name",
              placeholder: "MyToken",
              onInput: (e) => State.update({ tokenName: e.target.value }),
              value: state.tokenName,
            }}
          />
          <Widget
            src="near/widget/DIG.Input"
            props={{
              label: "Symbol",
              placeholder: "MTK",
              onInput: (e) => State.update({ tokenSymbol: e.target.value }),
              value: state.tokenSymbol,
            }}
          />
        </div>
        <div>
          <Widget
            src="near/widget/DIG.Input"
            type="number"
            props={{
              label: "Premint",
              placeholder: "10",
              onInput: (e) => State.update({ tokenSymbol: e.target.value }),
              value: state.tokenSymbol,
            }}
          />
        </div>
        <div>
          <div>FEATURES</div>
          <Widget
            src="near/widget/DIG.Checkbox"
            props={{
              id: "checkbox-item-mintable",
              label: "Mintable",
            }}
          />
          <Widget
            src="near/widget/DIG.Checkbox"
            props={{
              id: "checkbox-item-burnable",
              label: "Burnable",
            }}
          />
          <Widget
            src="near/widget/DIG.Checkbox"
            props={{
              id: "checkbox-item-pausable",
              label: "Pausable",
            }}
          />
        </div>
      </div>
      <div className="right-side">Right side preview</div>
    </div>
  </StyledWrapper>
);
