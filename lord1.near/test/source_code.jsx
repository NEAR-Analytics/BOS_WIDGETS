const themeColor = props.themeColor;

const projecttheme = {
  height: "130px",
  align: "center",
  description: "To obtain further information, kindly click here. (⓿_⓿) ",
  brand: "Add a Label to",
  fontsize: "40px",
  fontweight: "40px",
  afterbrand: "Flipside",
  afterbrandcolor: themeColor?.dynamic_header?.afterbrandcolor || "#789efb",
  fontbrand: " Arial, sans-serif",
  color1brand: themeColor?.dynamic_header?.color1brand || "#000",
  color2brand: themeColor?.dynamic_header?.color2brand || "#806ce1",
  colordescription: themeColor?.dynamic_header?.colordescription || "#806ce1",
  fontsubtitle: " Arial, sans-serif",
  background:
    themeColor?.dynamic_header?.background ||
    "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(235,231,253,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3em;
  padding-bottom: 3em;
`;

const Header = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 2em;
  line-height: 1.4em;
  text-align: center;
  color: #000000;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  gap: 1em;
`;

const FormFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

State.init({
  blockchain: null,
  blockchainError: "",
  contract_address: "",
  contract_addressError: "",
  protocol: "",
  protocolError: "",
  contract_name: "",
  contract_nameError: "",
  label: null,
  labelError: "",
  sublabel: null,
  sublabelError: "",
  discord: "",
  discordError: "",
  accountsWithPermissions: [],
  accountsWithPermissionsIsFetched: false,
});

if (!state.accountsWithPermissionsIsFetched) {
  Near.asyncView(
    "social.near",
    "debug_get_permissions",
    { account_id: context.accountId },
    "final",
    false
  ).then((data) =>
    State.update({
      accountsWithPermissions: data
        .map(([info]) => info)
        .filter((info) => "AccountId" in info)
        .map(({ AccountId }) => AccountId),
      accountsWithPermissionsIsFetched: true,
    })
  );
}

const validateForm = () => {
  return (
    state.contract_address &&
    state.contract_addressError === "" &&
    state.blockchain &&
    state.blockchainError === "" &&
    state.label &&
    state.labelError === "" &&
    state.sublabel &&
    state.sublabelError === "" &&
    state.protocol &&
    state.protocolError === "" &&
    state.contract_name &&
    state.contract_nameError === "" &&
    (!state.discord || state.discordError === "")
  );
};
let chain = (
  <Widget
    src={`lord1.near/widget/Dropdown`}
    props={{
      label: "Select a Supported Chain *",
      placeholder: "Chains ",
      placeholdercolor: themeColor?.form?.placeholdercolor,
      inputbackgroundcolor: themeColor?.form?.inputbackgroundcolor,
      inputcolor: themeColor?.form?.inputcolor,
      labelcolor: themeColor?.form?.labelcolor,
      options: [
        { text: "Algorand", value: "Algorand" },
        { text: "Arbitrum", value: "Arbitrum" },
        { text: "Aurora", value: "Aurora" },
        { text: "Avalanche", value: "Avalanche" },
        { text: "Axelar", value: "Axelar" },
        { text: "Base", value: "Base" },
        { text: "Bitcoin", value: "Bitcoin" },
        { text: "BSC/Binance", value: "BSC/Binance" },
        { text: "Cosmos", value: "Cosmos" },
        { text: "Ethereum", value: "Ethereum" },
        { text: "EVMOS", value: "EVMOS" },
        { text: "Flow", value: "Flow" },
        { text: "Gnosis", value: "Gnosis" },
        { text: "Near *", value: "Near" },
        { text: "Optimism", value: "Optimism" },
        { text: "Osmosis", value: "Osmosis" },
        { text: "Polygon", value: "Polygon" },
        { text: "Sei", value: "Sei" },
        { text: "Solana", value: "Solana" },
        { text: "Terra", value: "Terra" },
        { text: "Thorchain", value: "Thorchain" },
      ],
      dev: state.blockchain,
      update: (blockchain) => State.update({ blockchain }),

      setError: (blockchainError) => State.update({ blockchainError }),
      error: state.blockchainError,
    }}
  />
);
let address = (
  <Widget
    src={`lord1.near/widget/Text`}
    props={{
      label: "Paste the Contract Address *",
      placeholdercolor: themeColor?.form?.placeholdercolor,
      inputbackgroundcolor: themeColor?.form?.inputbackgroundcolor,
      inputcolor: themeColor?.form?.inputcolor,
      labelcolor: themeColor?.form?.labelcolor,
      placeholder: "OxA9D1e08C7793af67e9d92fe308d5697FB81d3E43",
      value: state.contract_address,
      onChange: (contract_address) => State.update({ contract_address }),
      validate: () => {
        if (state.contract_address.length < 5) {
          State.update({
            contract_addressError: "Name must be at least 5 characters",
          });
          return;
        }

        if (state.contract_address.length > 100) {
          State.update({
            contract_addressError: "Name must be less than 100 characters",
          });
          return;
        }

        State.update({ contract_addressError: "" });
      },
      error: state.contract_addressError,
    }}
  />
);
let protocols = (
  <Widget
    src={`lord1.near/widget/Text`}
    props={{
      label: "Add the protocol the contract belongs to *",
      placeholdercolor: themeColor?.form?.placeholdercolor,
      inputbackgroundcolor: themeColor?.form?.inputbackgroundcolor,
      inputcolor: themeColor?.form?.inputcolor,
      labelcolor: themeColor?.form?.labelcolor,
      placeholder: "Coinbase",
      value: state.protocol,
      onChange: (protocol) => State.update({ protocol }),
      validate: () => {
        if (state.protocol.length < 2) {
          State.update({
            protocolError: "Name must be at least 2 characters",
          });
          return;
        }

        if (state.protocol.length > 100) {
          State.update({
            protocolError: "Name must be less than 100 characters",
          });
          return;
        }

        State.update({ protocolError: "" });
      },
      error: state.protocolError,
    }}
  />
);

let name = (
  <Widget
    src={`lord1.near/widget/Text`}
    props={{
      label: "Add the contract name *",
      placeholdercolor: themeColor?.form?.placeholdercolor,
      inputbackgroundcolor: themeColor?.form?.inputbackgroundcolor,
      inputcolor: themeColor?.form?.inputcolor,
      labelcolor: themeColor?.form?.labelcolor,
      placeholder: "Coinbase hot wallet 10",
      value: state.contract_name,
      onChange: (contract_name) => State.update({ contract_name }),
      validate: () => {
        if (state.contract_name.length < 5) {
          State.update({
            contract_nameError: "Name must be at least 5 characters",
          });
          return;
        }

        if (state.contract_name.length > 100) {
          State.update({
            contract_nameError: "Name must be less than 100 characters",
          });
          return;
        }

        State.update({ contract_nameError: "" });
      },
      error: state.contract_nameError,
    }}
  />
);

let labels = (
  <Widget
    src={`lord1.near/widget/Dropdown`}
    props={{
      label: "Select a Supported Label Type *",
      placeholdercolor: themeColor?.form?.placeholdercolor,
      inputbackgroundcolor: themeColor?.form?.inputbackgroundcolor,
      inputcolor: themeColor?.form?.inputcolor,
      labelcolor: themeColor?.form?.labelcolor,
      placeholder: "Label",
      options: [
        { text: "cex", value: "cex" },
        { text: "chadmin", value: "chadmin" },
        { text: "dapp", value: "dapp" },
        { text: "defi", value: "defi" },
        { text: "dex", value: "dex" },
        { text: "flotsam", value: "flotsam" },
        { text: "layer2", value: "layer2" },
        { text: "nft", value: "nft" },
        { text: "operator", value: "operator" },
        { text: "token", value: "token" },
      ],
      dev: state.label,
      update: (label) => State.update({ label }),
      setError: (labelError) => State.update({ labelError }),
      error: state.labelError,
    }}
  />
);
let sublabels = (
  <Widget
    src={`lord1.near/widget/Dropdown`}
    props={{
      label: "Select a Supported Label Subtype *",
      placeholdercolor: themeColor?.form?.placeholdercolor,
      inputbackgroundcolor: themeColor?.form?.inputbackgroundcolor,
      inputcolor: themeColor?.form?.inputcolor,
      labelcolor: themeColor?.form?.labelcolor,
      placeholder: "Subtype",
      options: [
        {
          text: "aggregator_contract",
          value: "aggregator_contract",
        },
        { text: "airdrop_contract", value: "airdrop_contract" },
        { text: "auction", value: "auction" },
        { text: "bridge", value: "bridge" },
        { text: "chadmin", value: "chadmin" },
        { text: "custody_contract", value: "custody_contract" },
        { text: "dao", value: "dao" },
        { text: "deposit_wallet", value: "deposit_wallet" },
        { text: "operator", value: "operator" },
        { text: "distributor_cex", value: "distributor_cex" },
        { text: "donation_address", value: "donation_address" },
        { text: "escrow", value: "escrow" },
        { text: "fee_wallet", value: "fee_wallet" },
        { text: "foundation", value: "foundation" },
        { text: "general_contract", value: "general_contract" },
        { text: "genesis_block", value: "genesis_block" },
        { text: "governance", value: "governance" },
        { text: "hot_wallet", value: "hot_wallet" },
        { text: "marketplace", value: "marketplace" },
        { text: "memo_hot_wallet", value: "memo_hot_wallet" },
        { text: "mining_pool", value: "mining_pool" },
        { text: "mint_burn", value: "mint_burn" },
        { text: "mint_contract", value: "mint_contract" },
        { text: "multisig", value: "multisig" },
        {
          text: "nf_position_manager",
          value: "nf_position_manager",
        },
        { text: "nf_token_contract", value: "nf_token_contract" },
        { text: "nft", value: "nft" },
        { text: "oracle", value: "oracle" },
        { text: "pool", value: "pool" },
        { text: "reserve", value: "reserve" },
        { text: "rewards", value: "rewards" },
        { text: "router", value: "router" },
        { text: "staking_contract", value: "staking_contract" },
        { text: "strategy", value: "strategy" },
        { text: "swap_contract", value: "swap_contract" },
        { text: "swap_router", value: "swap_router" },
        { text: "token_address", value: "token_address" },
        { text: "token_contract", value: "token_contract" },
        { text: "token_distribution", value: "token_distribution" },
        { text: "token_sale", value: "token_sale" },
        { text: "token_vesting", value: "token_vesting" },
        { text: "toxic", value: "toxic" },
        { text: "treasury", value: "treasury" },
        { text: "validator", value: "validator" },
        { text: "vault", value: "vault" },
        { text: "voting", value: "voting" },
      ],
      dev: state.sublabel,
      update: (sublabel) => State.update({ sublabel }),
      setError: (sublabelError) => State.update({ sublabelError }),
      error: state.sublabelError,
    }}
  />
);
let discords = (
  <Widget
    src={`lord1.near/widget/Text`}
    props={{
      label: "Discord Handle",
      placeholdercolor: themeColor?.form?.placeholdercolor,
      inputbackgroundcolor: themeColor?.form?.inputbackgroundcolor,
      inputcolor: themeColor?.form?.inputcolor,
      labelcolor: themeColor?.form?.labelcolor,
      placeholder: "@sick_discord_handle",
      value: state.discord,
      onChange: (discord) => State.update({ discord }),
      validate: () => {
        if (state.discord.length < 2) {
          State.update({
            discordError: "Name must be at least 2 characters",
          });
          return;
        }

        if (state.discord.length > 20) {
          State.update({
            discordError: "Name must be less than 20 characters",
          });
          return;
        }

        State.update({ discordError: "" });
      },
      error: state.discordError,
    }}
  />
);
if (!state.likeSound) {
  State.update({
    commitSound:
      "https://ipfs.near.social/ipfs/bafkreiakzjklz2h4saf7xxud4gtq7scpkcsann27o54myevzgwcxsbqowm",
    explainSound:
      "https://ipfs.near.social/ipfs/bafkreidgf72hc36zycdnwvgebum3lkdr4hm7n5hjzmn5dktnky7c7kh54u",
  });
  new Audio(state.likeSound);
}

return (
  <div
    className="my-4 shadow-sm  rounded-4"
    style={{ background: themeColor?.sbt_area?.section_bg }}
  >
    <div className="row g-4 w-100 pb-2 mx-0">
      <div className="col-12">
        <div
          style={{ background: themeColor?.sbt_area?.card_bg }}
          className="shadow-sm rounded-4 "
        >
          <div
            onClick={() => {
              const sound = new Audio(state.explainSound);
              sound.play();
            }}
          >
            <Widget
              src="lord1.near/widget/header-dynamic"
              props={projecttheme}
            />
          </div>

          <Container>
            <Form>
              {chain}
              {address}
              {protocols}
              {name}
              {labels}
              {sublabels}
              {discords}
              <FormFooter>
                <Widget
                  src={`contribut3.near/widget/Buttons.Green`}
                  props={{
                    disabled: !validateForm(),
                    onClick: () => {
                      if (!validateForm()) return;
                      const sound = new Audio(state.commitSound);
                      sound.play();
                      Social.set({
                        index: JSON.stringify({
                          value: {
                            gateway: "flipside_gateway",
                            method: "register_label",
                            blockchain: state.blockchain.value.trim(),
                            contract_address: state.contract_address.trim(),
                            protocol: state.protocol.trim(),
                            contract_name: state.contract_name.trim(),
                            label_type: state.label.value.trim(),
                            label_subtype: state.sublabel.value.trim(),
                            discord_handle: state.discord.trim(),
                          },
                        }),
                      });
                    },
                    text: (
                      <>
                        <svg
                          width="17"
                          height="18"
                          viewBox="0 0 17 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.875 16.5V12.75M2.875 5.25V1.5M1 3.375H4.75M1 14.625H4.75M9.25 2.25L7.94937 5.63165C7.73786 6.18157 7.6321 6.45653 7.46765 6.68781C7.32189 6.8928 7.1428 7.07189 6.93781 7.21765C6.70653 7.3821 6.43157 7.48786 5.88165 7.69937L2.5 9L5.88165 10.3006C6.43157 10.5121 6.70653 10.6179 6.93781 10.7824C7.1428 10.9281 7.32189 11.1072 7.46765 11.3122C7.6321 11.5435 7.73786 11.8184 7.94937 12.3684L9.25 15.75L10.5506 12.3684C10.7621 11.8184 10.8679 11.5435 11.0324 11.3122C11.1781 11.1072 11.3572 10.9281 11.5622 10.7824C11.7935 10.6179 12.0684 10.5121 12.6184 10.3006L16 9L12.6184 7.69937C12.0684 7.48786 11.7935 7.3821 11.5622 7.21765C11.3572 7.07189 11.1781 6.8928 11.0324 6.68781C10.8679 6.45653 10.7621 6.18157 10.5506 5.63165L9.25 2.25Z"
                            stroke="#11181C"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        Submit Contract to Flipside
                      </>
                    ),
                  }}
                />
              </FormFooter>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  </div>
);
