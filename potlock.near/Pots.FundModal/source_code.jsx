const { isMatchingPoolModalOpen, onClose, potDetail, referrerId, potId } =
  props;
const {
  protocol_config_provider,
  chef_fee_basis_points,
  chef,
  base_currency,
  min_matching_pool_donation_amount,
  referral_fee_matching_pool_basis_points,
} = potDetail;
State.init({
  matchingPoolDonationAmountNear: "",
  matchingPoolDonationAmountNearError: "",
  matchingPoolDonationMessage: "",
  matchingPoolDonationMessageError: "",
  bypassProtocolFee: false,
  bypassChefFee: false,
});
const {
  matchingPoolDonationAmountNear,
  matchingPoolDonationAmountNearError,
  matchingPoolDonationMessage,
  matchingPoolDonationMessageError,
  bypassProtocolFee,
  bypassChefFee,
} = state;
const { yoctosToNear } = VM.require("potlock.near/widget/utils") || {
  yoctosToNear: () => "",
};
const { _address } = VM.require(
  `potlock.near/widget/Components.DonorsUtils`
) || {
  _address: () => "",
};
const { ownerId, MAX_DONATION_MESSAGE_LENGTH, SUPPORTED_FTS, ONE_TGAS } =
  VM.require("potlock.near/widget/constants") || {
    ownerId: "",
    ONE_TGAS: 0,
    MAX_DONATION_MESSAGE_LENGTH: 0,
    SUPPORTED_FTS: {},
  };
const protocolConfigContractId = protocol_config_provider.split(":")[0];
const protocolConfigViewMethodName = protocol_config_provider.split(":")[1];
const protocolConfig = Near.view(
  protocolConfigContractId,
  protocolConfigViewMethodName,
  {}
);
const protocolFeeRecipientProfile = Social.getr(
  `${protocolConfig?.account_id}/profile`
);
const chefProfile = Social.getr(`${chef}/profile`);
const chefFeeAmountNear = bypassChefFee
  ? 0
  : (matchingPoolDonationAmountNear * potDetail?.chef_fee_basis_points) /
      10_000 || 0;
const protocolFeeAmountNear = bypassProtocolFee
  ? 0
  : (matchingPoolDonationAmountNear * protocolConfig?.basis_points) / 10_000 ||
    0;
const referrerFeeAmountNear = referrerId
  ? (matchingPoolDonationAmountNear * referral_fee_matching_pool_basis_points) /
      10_000 || 0
  : 0;
const handleMatchingPoolDonation = () => {
  const args = {
    message: matchingPoolDonationMessage,
    matching_pool: true,
    referrer_id: referrerId || null,
    bypass_protocol_fee: bypassProtocolFee,
  };
  if (state.bypassChefFee) {
    args.custom_chef_fee_basis_points = 0;
  }
  const amountFloat = parseFloat(matchingPoolDonationAmountNear || 0);
  if (!amountFloat) {
    State.update({ matchingPoolDonationAmountNearError: "Invalid amount" });
    return;
  }
  const amountIndivisible =
    SUPPORTED_FTS[base_currency.toUpperCase()].toIndivisible(amountFloat);
  const transactions = [
    {
      contractName: potId,
      methodName: "donate",
      deposit: amountIndivisible,
      args,
      gas: ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ----> // TODO: implement
};
const ModalTitle = styled.div`
  color: #525252;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin-bottom: 8px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const UserChipLink = styled.a`
  display: flex;
  flex-direction: row;
  margin: 0px 4px;
  margin-left: auto;
  padding: 2px 12px;
  gap: 4px;
  border-radius: 32px;
  background: #ebebeb;
  &:hover {
    text-decoration: none;
  }
`;
const TextBold = styled.div`
  color: #292929;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  word-wrap: break-word;
  text-align: center;
`;
const FeeText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const Label = styled.label`
  width: 100%;
  font-size: 12px;
  line-height: 16px;
  word-wrap: break-word;
  color: #2e2e2e;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
console.log(protocolFeeRecipientProfile);
return (
  <Widget
    src={`${ownerId}/widget/Components.Modal`}
    props={{
      ...props,
      isModalOpen: isMatchingPoolModalOpen,
      onClose,
      children: (
        <>
          <ModalTitle>
            Enter matching pool contribution amount in NEAR
            {["0", "1"].includes(min_matching_pool_donation_amount)
              ? "(no minimum)"
              : `(Min. ${yoctosToNear(min_matching_pool_donation_amount)})`}
          </ModalTitle>
          <Widget
            src={`${ownerId}/widget/Inputs.Text`}
            props={{
              inputStyle: {
                background: "#FAFAFA",
              },
              placeholder: "Enter amount here in NEAR",
              value: matchingPoolDonationAmountNear,
              onChange: (matchingPoolDonationAmountNear) =>
                State.update({
                  matchingPoolDonationAmountNear,
                }),
              validate: () => {
                // TODO: add validation logic here
                State.update({ matchingPoolDonationAmountNearError: "" });
              },
              error: matchingPoolDonationAmountNearError,
            }}
          />
          <Widget
            src={`${ownerId}/widget/Inputs.TextArea`}
            props={{
              noLabel: true,
              inputRows: 5,
              inputStyle: {
                background: "#FAFAFA",
              },
              placeholder: "Enter an optional message",
              value: matchingPoolDonationMessage,
              onChange: (matchingPoolDonationMessage) =>
                State.update({ matchingPoolDonationMessage }),
              validate: () => {
                if (
                  matchingPoolDonationMessage.length >
                  MAX_DONATION_MESSAGE_LENGTH
                ) {
                  State.update({
                    matchingPoolDonationMessageError: `Message must be less than ${MAX_DONATION_MESSAGE_LENGTH} characters`,
                  });
                  return;
                }
                State.update({ matchingPoolDonationMessageError: "" });
              },
              error: matchingPoolDonationMessageError,
            }}
          />
          <Row>
            <Widget
              src={`${ownerId}/widget/Inputs.Checkbox`}
              props={{
                id: "bypassProtocolFeeSelector",
                checked: bypassProtocolFee,
                onClick: (e) => {
                  State.update({ bypassProtocolFee: e.target.checked });
                },
              }}
            />
            <Label htmlFor="bypassProtocolFeeSelector">
              Bypass {protocolConfig?.basis_points / 100 || "-"}% protocol fee
              to{" "}
              <UserChipLink
                href={`https://near.social/mob.near/widget/ProfilePage?accountId=${protocolConfig?.account_id}`}
                target="_blank"
              >
                <Widget
                  src={`${ownerId}/widget/Project.ProfileImage`}
                  props={{
                    ...props,
                    accountId: protocolConfig?.account_id,
                    style: {
                      height: "12px",
                      width: "12px",
                    },
                  }}
                />
                <TextBold>
                  {_address(
                    protocolFeeRecipientProfile?.name ||
                      protocolConfig?.account_id
                  )}
                </TextBold>
              </UserChipLink>
            </Label>
          </Row>
          {chef && chef_fee_basis_points > 0 && (
            <Row style={{ marginTop: "6px" }}>
              <Widget
                src={`${ownerId}/widget/Inputs.Checkbox`}
                props={{
                  id: "bypassChefFeeSelector",
                  checked: bypassChefFee,
                  onClick: (e) => {
                    State.update({ bypassChefFee: e.target.checked });
                  },
                }}
              />
              <Label htmlFor="bypassChefFeeSelector">
                Bypass {chef_fee_basis_points / 100 || "-"}% chef fee to
                <UserChipLink
                  href={`https://near.social/mob.near/widget/ProfilePage?accountId=${chef}`}
                  target="_blank"
                >
                  <Widget
                    src={`${ownerId}/widget/Project.ProfileImage`}
                    props={{
                      ...props,
                      accountId: chef,
                      style: {
                        height: "12px",
                        width: "12px",
                      },
                    }}
                  />
                  <TextBold>{chefProfile?.name || chef}</TextBold>
                </UserChipLink>
              </Label>
            </Row>
          )}
          <Row style={{ marginTop: "12px" }}>
            <FeeText>Protocol fee: {protocolFeeAmountNear} NEAR</FeeText>
          </Row>
          {chef && chef_fee_basis_points > 0 && (
            <Row style={{ marginTop: "12px" }}>
              <FeeText>Chef fee: {chefFeeAmountNear} NEAR</FeeText>
            </Row>
          )}
          <Row style={{ marginTop: "6px" }}>
            {referrerId && (
              <FeeText>
                Referrer fee (to {referrerId}): {referrerFeeAmountNear} NEAR
              </FeeText>
            )}
          </Row>
          <Row style={{ marginTop: "6px" }}>
            <FeeText>
              Net donation amount:{" "}
              {matchingPoolDonationAmountNear -
                protocolFeeAmountNear -
                chefFeeAmountNear -
                referrerFeeAmountNear}{" "}
              NEAR
            </FeeText>
          </Row>
          <Row style={{ justifyContent: "flex-end", marginTop: "12px" }}>
            <Widget
              src={`${ownerId}/widget/Components.Button`}
              props={{
                type: "primary",
                disabled:
                  !matchingPoolDonationAmountNear ||
                  !!matchingPoolDonationAmountNearError ||
                  !parseFloat(matchingPoolDonationAmountNear),
                text: `Contribute${
                  matchingPoolDonationAmountNear
                    ? ` ${matchingPoolDonationAmountNear} ${base_currency.toUpperCase()}`
                    : ""
                } to matching pool`,
                onClick: handleMatchingPoolDonation,
              }}
            />
          </Row>
        </>
      ),
    }}
  />
);
