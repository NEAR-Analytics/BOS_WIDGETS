const AUTH_OPTION = {
  NO_AUTH: "noAuth",
  OWNERSHIP: "ownership",
  ROLE_BASED: "roleBased",
};

State.init({
  fungibleToken: true,
  tokenName: "MyToken",
  tokenSymbol: "MTK",
  ftDecimals: 24,
  ftPremint: null,
  nftBaseURI: "",
  authOption: AUTH_OPTION.NO_AUTH,
  owner: "",
  mintable: false,
  burnable: false,
  contractOutput: "",
});

const Background = styled.div`
    background-image: radial-gradient(#dad9e8 5%,transparent 0);
    background-size: 50px 50px;
    min-height: 100vh;
    width: 100%;
`;

const StyledWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 50px;
    padding-bottom: 200px;

  > button {
    margin: 20px 10px 20px 0;
  }

  a {
    color: inherit;
    :hover {
        color: var(--violet8);
    }
  }

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

    > pre {
      width: 70%;
      min-height: 694px;

      div {
        border-radius: 6px
      }
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

  h5 {
    margin: 15px 0;
  }

  h6 {
    margin: 15px 0;
  }

  label {
    margin-top: 10px;
  }

  .badge {
    margin: 0 0 30px 0;
  }
`;

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
                value: AUTH_OPTION.NO_AUTH,
              },
              {
                label: "Ownership",
                value: AUTH_OPTION.OWNERSHIP,
              },
              {
                label: "Role-based access control",
                value: AUTH_OPTION.ROLE_BASED,
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
    {state.authOption !== AUTH_OPTION.NO_AUTH && (
      <Widget
        src="near/widget/DIG.Input"
        props={{
          label: "Owner",
          placeholder: "satoshi.near",
          onInput: (e) => State.update({ owner: e.target.value }),
          value: state.owner,
          assistiveText:
            "If left blank, the deploying account becomes the default owner.",
        }}
      />
    )}
  </>
);

const BinaryOptions = () => (
  <>
    <h6>Features</h6>
    <Widget
      src="near/widget/DIG.Checkbox"
      props={{
        id: "checkbox-item-burnable",
        label: "Burnable",
        checked: state.burnable,
        onCheckedChange: (e) => State.update({ burnable: e }),
      }}
    />
    <Widget
      src="near/widget/DIG.Checkbox"
      props={{
        id: "checkbox-item-storageOptions",
        label: "Storage Mgmt Options",
      }}
    />
    {state.authOption !== AUTH_OPTION.NO_AUTH && (
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

const tokenStandardsDescriptions = (props) => {
  const baseUrl = (nep) =>
    `https://github.com/near/NEPs/blob/master/neps/nep-${nep}.md`;

  const anchor = (nep) => (
    <a target="blank_" href={baseUrl(`0${nep}`)}>
      NEP {nep}
    </a>
  );

  if (props.fungibleToken) {
    return (
      <>
        Implements {anchor("141")}
        and
        {anchor("148")} token standards
      </>
    );
  } else {
    return (
      <>
        Implements {anchor("171")}, {anchor("177")}, {anchor("178")} and{" "}
        {anchor("181")} token standards
      </>
    );
  }
};

const sourceCode = `
\`\`\`rust
${state.contractOutput}
\`\`\`
`;

return (
  <>
    <Widget
      src="contractwizard.near/widget/CodeGenerator"
      props={{
        message: {
          token: {
            which: state.fungibleToken ? "ft" : "nft",
            config: {
              name: state.tokenName,
              symbol: state.tokenSymbol,
              decimals: state.ftDecimals,
              preMint: state.ftPremint,
              mintable: state.mintable,
              burnable: state.burnable,
            },
          },
          plugins: {
            owner: { accountId: state.owner },
            pause: {},
            rbac: { accountId: state.owner },
          },
        },
        onMessage: (e) => {
          State.update({ contractOutput: e });
        },
      }}
    />
    <Background>
      <StyledWrapper>
        <Widget
          src="near/widget/DIG.Badge"
          props={{
            label:
              "This component is still in early development and should not be used for mainnet purposes.",
            iconLeft: "ph-bold ph-warning",
            variant: "alert",
            className: "badge",
          }}
        />
        <h1>
          Token Wizard <i class="ph-bold ph-magic-wand"></i>
        </h1>
        <h5>
          Easily generate complete code snippets for your fungible and
          non-fungible NEAR token contracts.
        </h5>
        <Widget
          src="near/widget/DIG.Button"
          props={{
            label: "Fungible token (FT)",
            iconLeft: "ph ph-coins",
            onClick: (e) => State.update({ fungibleToken: true }),
            size: "large",
            variant: !state.fungibleToken ? "secondary" : "primary",
          }}
        />
        <Widget
          src="near/widget/DIG.Button"
          props={{
            label: "Non-Fungible Token (NFT)",
            iconLeft: "ph ph-cards",
            onClick: (e) => State.update({ fungibleToken: false }),
            size: "large",
            variant: state.fungibleToken ? "secondary" : "primary",
          }}
        />
        <div>
          <div className="token-type-desc">
            <tokenStandardsDescriptions fungibleToken={state.fungibleToken} />
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
                    onInput: (e) =>
                      State.update({ tokenSymbol: e.target.value }),
                    value: state.tokenSymbol,
                  }}
                />
                {state.fungibleToken && (
                  <>
                    <Widget
                      src="near/widget/DIG.Input"
                      type="number"
                      props={{
                        label: "Premint",
                        placeholder: 0,
                        onInput: (e) =>
                          State.update({ ftPremint: e.target.value }),
                        value: state.ftPremint,
                      }}
                    />
                    <Widget
                      src="near/widget/DIG.Input"
                      type="number"
                      props={{
                        label: "Decimals",
                        placeholder: 24,
                        onInput: (e) =>
                          State.update({ ftDecimals: e.target.value }),
                        value: state.ftDecimals,
                      }}
                    />
                  </>
                )}
                {!state.fungibleToken && (
                  <Widget
                    src="near/widget/DIG.Input"
                    props={{
                      label: "Base URI",
                      placeholder: "https://",
                      onInput: (e) =>
                        State.update({ nftBaseURI: e.target.value }),
                      value: state.nftBaseURI,
                    }}
                  />
                )}
                <AuthLayer />
                <BinaryOptions />
              </div>
            </div>
            <Markdown text={sourceCode} />
          </div>
        </div>
      </StyledWrapper>
    </Background>
  </>
);
