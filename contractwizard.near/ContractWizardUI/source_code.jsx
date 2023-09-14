State.init({
  tokenName: "",
  tokenSymbol: "",
  ftDecimals: 24,
  nftBaseURI: "",
  authOption: "noAuth",
});

const Background = styled.div`
    background-image: radial-gradient(#dad9e8 5%,transparent 0);
    background-color: #fcfcfc;
    background-size: 30px 30px;
    height: 100vh;
    width: 100%;
`;

const StyledWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;

  .token-type-desc {
    margin: 20px 0 30px 0;
  }
  .main-content-wrapper {
    display: flex;

    > div {
      padding: 20px;
    }

    .left-side {
      width: 30%;
      padding: 0 20px 0 0;
    }

    .right-side {
      width: 70%;
      background-color: #1b1b18;
      color: white;
      border-radius: 4px
    }

    @media(max-width: 800px) {
        flex-direction: column;
        
        .left-side, .right-side {
            width: 100%;
        }
        .right-side {
            margin-top: 30px;
        }
    }
  }

  h6 {
    margin: 15px 0;
  }

  .token-name-wrapper {
    label {
        margin-top: 10px;
    }
  }
`;

const TokenOptionTabs = () => (
  <Widget
    src="near/widget/DIG.Tabs"
    props={{
      variant: "pill",
      size: "large",
      items: [
        {
          name: "Fungible token (FT)",
          value: "1",
          content: <FTTokenSelection />,
          icon: "ph ph-coins",
        },
        {
          name: "Non-Fungible Token (NFT)",
          value: "2",
          content: <NFTTokenSelection />,
          icon: "ph ph-cards",
        },
      ],
    }}
  />
);

const FTTokenSelection = () => (
  <div>
    <div className="token-type-desc">
      Implements NEP 141 and NEP 148 token standards
    </div>
    <div className="main-content-wrapper">
      <div className="left-side">
        <h6>Settings</h6>
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
          <Widget
            src="near/widget/DIG.Input"
            type="number"
            props={{
              label: "Premint",
              placeholder: "0",
              onInput: (e) => State.update({ tokenSymbol: e.target.value }),
              value: state.tokenSymbol,
            }}
          />
          <Widget
            src="near/widget/DIG.Input"
            type="number"
            props={{
              label: "Decimals",
              placeholder: state.ftDecimals,
              onInput: (e) => State.update({ ftDecimals: e.target.value }),
              value: state.ftDecimals,
            }}
          />
        </div>
        <div>
          <AuthLayer />
          <BinaryOptions tokenType="ft" />
        </div>
      </div>
      <CodePreview />
    </div>
  </div>
);

const NFTTokenSelection = () => (
  <div>
    <div className="token-type-desc">
      Implements NEP 171, NEP 177, NEP 178 and NEP 181 token standards
    </div>
    <div className="main-content-wrapper">
      <div className="left-side">
        <h6>Settings</h6>
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
          <Widget
            src="near/widget/DIG.Input"
            props={{
              label: "Base URI",
              placeholder: "https://",
              onInput: (e) => State.update({ nftBaseURI: e.target.value }),
              value: state.nftBaseURI,
            }}
          />
        </div>
        <div>
          <AuthLayer />
          <BinaryOptions />
        </div>
      </div>
      <CodePreview />
    </div>
  </div>
);

const AuthLayer = () => (
  <>
    <h6>Access Control</h6>
    <Widget
      src="near/widget/DIG.InputSelect"
      props={{
        groups: [
          {
            label: "Select option",
            items: [
              {
                label: "No Access Control",
                value: "noAuth",
              },
              {
                label: "Ownership",
                value: "ownership",
              },
              {
                label: "Role-based access control",
                value: "roleBased",
              },
            ],
          },
        ],
        placeholder: "Select an option",
        rootProps: {
          value: state.authOption,
          onValueChange: (value) => {
            State.update({ authOption: value });
          },
        },
      }}
    />
  </>
);

const CodePreview = () => (
  <div className="right-side">
    <pre>console.log("Hello, World!")</pre>
  </div>
);

const BinaryOptions = (props) => (
  <>
    <h6>Features</h6>
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
        id: "checkbox-item-storageOptions",
        label: "Storage Mgmt Options",
      }}
    />
    {state.authOption !== "noAuth" && (
      <>
        <Widget
          src="near/widget/DIG.Checkbox"
          props={{
            id: "checkbox-item-pausable",
            label: "Pausable",
          }}
        />
        <Widget
          src="near/widget/DIG.Checkbox"
          props={{
            id: "checkbox-item-upgradeable",
            label: "Upgradeable",
          }}
        />
        <Widget
          src="near/widget/DIG.Checkbox"
          props={{
            id: "checkbox-item-mintable",
            label: "Mintable",
          }}
        />
      </>
    )}
  </>
);

return (
  <Background>
    <StyledWrapper>
      <h1>
        Token Wizard <i class="ph-bold ph-magic-wand"></i>
      </h1>
      <h5>
        Easily generate complete code snippets for your fungible and
        non-fungible token contracts.
      </h5>
      <TokenOptionTabs />
    </StyledWrapper>
  </Background>
);
