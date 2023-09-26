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
  ftPremintReceiver: "",
  nftBaseURI: "",
  authOption: AUTH_OPTION.NO_AUTH,
  owner: "",
  mintable: false,
  burnable: false,
  pausable: false,
  showToast: false,
  contractOutput: "",
});

const Background = styled.div`
    width: 100%;
`;

const StyledWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    padding: 70px;
    background-image: radial-gradient(rgb(218, 217, 232) 5%, #f9f9f9 0px);
    background-size: 30px 30px;
    border-radius: 6px;

    @media(max-width: 800px) {
        padding: 20px;
    }

  > button {
    margin: 20px 10px 20px 0;
  }

  a {
    color: var(--violet8);
    :hover {
        color: var(--violet10);
    }
  }

  .token-type-desc {
    margin: 20px 0 30px 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      margin-left: auto;
    }
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
      div {
        border-radius: 6px;
        min-height: 700px;
      }
    }

    @media(max-width: 800px) {
        flex-direction: column;
        
        .left-side {
            width: 100%;
        }
        > pre {
            margin-top: 30px;
            width: 100%;
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

  button[role="checkbox"][data-state="unchecked"] {
    background-color: white;
  }

  div[data-radix-content-popper-wrapper] {
    z-index: 100000;
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
          label:
            state.authOption === AUTH_OPTION.OWNERSHIP
              ? "Owner"
              : "Highest role",
          placeholder: "satoshi.near",
          onInput: (e) => State.update({ owner: e.target.value }),
          value: state.owner,
          assistiveText:
            state.authOption === AUTH_OPTION.OWNERSHIP
              ? "If left blank, the deploying account becomes the default owner."
              : "If left blank, the deploying account receives the highest role.",
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
    {/*<Widget
      src="near/widget/DIG.Checkbox"
      props={{
        id: "checkbox-item-storageOptions",
        label: "Storage Mgmt Options",
      }}
    />*/}
    {state.authOption !== AUTH_OPTION.NO_AUTH && (
      <>
        <Widget
          src="near/widget/DIG.Checkbox"
          props={{
            id: "checkbox-item-pausable",
            label: "Pausable",
            checked: state.pausable,
            onCheckedChange: (e) => State.update({ pausable: e }),
          }}
        />
        {/*<Widget
          src="near/widget/DIG.Checkbox"
          props={{
            id: "checkbox-item-upgradeable",
            label: "Upgradeable",
          }}
        />*/}
        <Widget
          src="near/widget/DIG.Checkbox"
          props={{
            id: "checkbox-item-mintable",
            label: "Mintable",
            checked: state.mintable,
            onCheckedChange: (e) => State.update({ mintable: e }),
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
      <div>
        Implements {anchor("141")}
        and
        {anchor("148")} token standards
      </div>
    );
  } else {
    return (
      <div>
        Implements {anchor("171")}, {anchor("177")}, {anchor("178")} and{" "}
        {anchor("181")} token standards
      </div>
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
              baseUri: !state.fungibleToken ? state.nftBaseURI : null,
              decimals: state.fungibleToken ? state.ftDecimals : null,
              preMint: state.fungibleToken ? state.ftPremint : null,
              preMintReceiver: state.fungibleToken
                ? state.ftPremintReceiver
                : null,
              mintable:
                state.authOption !== AUTH_OPTION.NO_AUTH && state.mintable,
              burnable: state.burnable,
            },
          },
          plugins: {
            ...(state.authOption === AUTH_OPTION.OWNERSHIP
              ? { owner: { accountId: state.owner } }
              : {}),
            ...(state.pausable && state.authOption !== AUTH_OPTION.NO_AUTH
              ? { pause: {} }
              : {}),
            ...(state.authOption === AUTH_OPTION.ROLE_BASED
              ? { rbac: { accountId: state.owner } }
              : {}),
          },
        },
        onMessage: (e) => {
          State.update({ contractOutput: e });
        },
      }}
    />
    <Background>
      <StyledWrapper>
        <h1>
          Token Wizard <i class="ph-bold ph-magic-wand"></i>
        </h1>
        <h5>
          Generate complete Rust code snippets for your fungible and
          non-fungible NEAR token contracts.
        </h5>
        <Widget
          src="near/widget/DIG.Button"
          props={{
            label: "Fungible token (FT)",
            iconLeft: "ph ph-coins",
            onClick: (e) => State.update({ fungibleToken: true }),
            size: "large",
            variant: !state.fungibleToken ? "secondary" : "affirmative",
          }}
        />
        <Widget
          src="near/widget/DIG.Button"
          props={{
            label: "Non-Fungible Token (NFT)",
            iconLeft: "ph ph-cards",
            onClick: (e) => State.update({ fungibleToken: false }),
            size: "large",
            variant: state.fungibleToken ? "secondary" : "affirmative",
          }}
        />
        <div>
          <div className="token-type-desc">
            <tokenStandardsDescriptions fungibleToken={state.fungibleToken} />
            <Widget
              src="near/widget/DIG.Toast"
              props={{
                description: "Code copied to clipboard!",
                type: "success",
                open: state.showToast,
                onOpenChange: (value) => State.update({ showToast: value }),
                trigger: (
                  <Widget
                    src="near/widget/DIG.Button"
                    props={{
                      label: "Copy",
                      iconLeft: "ph ph-clipboard",
                      variant: "primary",
                      onClick: () => {
                        clipboard.writeText(state.contractOutput);
                        State.update({ showToast: true });
                      },
                    }}
                  />
                ),
                providerProps: { duration: 1500 },
              }}
            />
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
                    {state.ftPremint && (
                      <Widget
                        src="near/widget/DIG.Input"
                        props={{
                          label: "Premint receiver",
                          placeholder: "satoshi.near",
                          assistiveText:
                            "If left blank, the deploying account becomes the default receiver of the premint amount.",
                          onInput: (e) =>
                            State.update({ ftPremintReceiver: e.target.value }),
                          value: state.ftPremintReceiver,
                        }}
                      />
                    )}
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
