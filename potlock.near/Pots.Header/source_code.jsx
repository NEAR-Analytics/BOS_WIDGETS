const {
  ownerId,
  potId,
  potDetail,
  MAX_DONATION_MESSAGE_LENGTH,
  formatDate,
  referrerId,
  sybilRequirementMet,
  NADA_BOT_URL,
} = props;

const loraCss = fetch("https://fonts.googleapis.com/css2?family=Lora&display=swap").body;

Big.PE = 100;

// console.log("header props: ", props);

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 60px 80px;
  gap: 40px;
  width: 100%;
  background: #f6f5f3;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 40%;
`;

const Title = styled.div`
  color: #292929;
  font-size: 48px;
  font-weight: 400;
  line-height: 56px;
  word-wrap: break-word;
  font-family: "Lora";

  ${loraCss}
`;

const Description = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
`;

const ColumnRightSegment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 24px 0px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const H2 = styled.div`
  color: #292929;
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  word-wrap: break-word;
`;

const H3 = styled.div`
  color: #292929;
  font-size: 22px;
  font-weight: 600;
  line-height: 28px;
  word-wrap: break-word;
`;

const H4 = styled.div`
  color: #7b7b7b;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const Time = styled.span`
  color: #292929;
  font-size: 17px;
  font-weight: 600;
  line-height: 24px;
  word-wrap: break-word;
`;

const StatusText = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  word-wrap: break-word;
  margin-left: 12px;
`;

const ModalTitle = styled.div`
  color: #525252;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
  margin-bottom: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  line-height: 16px;
  word-wrap: break-word;
  color: #2e2e2e;
`;

const FeeText = styled.div`
  color: #292929;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`;

const TotalsSubtext = styled.div`
  color: #7b7b7b;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  word-wrap: break-word;
  text-transform: uppercase;
`;

State.init({
  isMatchingPoolModalOpen: false,
  matchingPoolDonationAmountNear: "",
  matchingPoolDonationAmountNearError: "",
  matchingPoolDonationMessage: "",
  matchingPoolDonationMessageError: "",
  bypassProtocolFee: false,
  isOnRegistry: false,
});

// console.log("props in header: ", props);

// console.log("pot config: ", potDetail);

const {
  owner,
  admins,
  chef,
  pot_name,
  pot_description,
  application_start_ms,
  application_end_ms,
  public_round_start_ms,
  public_round_end_ms,
  min_matching_pool_donation_amount,
  referral_fee_matching_pool_basis_points,
  base_currency,
  matching_pool_balance,
  public_donations_count,
  total_public_donations,
  registry_provider,
  protocol_config_provider,
  cooldown_end_ms,
  all_paid_out,
} = potDetail;

// console.log("potDetail: ", potDetail);

const protocolConfigContractId = protocol_config_provider.split(":")[0];
const protocolConfigViewMethodName = protocol_config_provider.split(":")[1];
const protocolConfig = Near.view(protocolConfigContractId, protocolConfigViewMethodName, {});

const now = Date.now();
const applicationNotStarted = now < application_start_ms;
const applicationOpen = now >= application_start_ms && now < application_end_ms;
const publicRoundNotStarted = now < public_round_start_ms;
const publicRoundOpen = now >= public_round_start_ms && now < public_round_end_ms;
const publicRoundClosed = now >= public_round_end_ms;
const userIsAdminOrGreater = admins.includes(context.accountId) || owner === context.accountId;
const userIsChefOrGreater = userIsAdminOrGreater || chef === context.accountId;

const canPayoutsBeSet = publicRoundClosed && userIsChefOrGreater && !cooldown_end_ms;
const canPayoutsBeProcessed =
  publicRoundClosed && userIsAdminOrGreater && now >= cooldown_end_ms && !all_paid_out;
const cooldownPeriodInProgress = publicRoundClosed && now < cooldown_end_ms;
const potComplete = all_paid_out;

const existingApplication = Near.view(potId, "get_application_by_project_id", {
  project_id: context.accountId,
});

if (registry_provider) {
  const [contractId, methodName] = registry_provider.split(":");
  Near.asyncView(contractId, methodName, { account_id: context.accountId }).then((isOnRegistry) => {
    State.update({ isOnRegistry });
  });
}

const canApply = applicationOpen && !existingApplication && !userIsChefOrGreater;

const registryRequirementMet = state.isOnRegistry || !registry_provider;

// const publicRoundOpen = true;

const handleFundMatchingPool = () => {
  State.update({ isMatchingPoolModalOpen: true });
};

const handleApplyToPot = () => {
  props.setApplicationModalOpen(true);
};

const totalMatchingPoolAmount =
  props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(matching_pool_balance);

const handleMatchingPoolDonation = () => {
  const { matchingPoolDonationAmountNear } = state;
  const args = {
    message: state.matchingPoolDonationMessage,
    matching_pool: true,
    referrer_id: referrerId || null,
    bypass_protocol_fee: state.bypassProtocolFee,
  };
  // const deposit = Big(JSON.stringify(args).length * 0.00003).plus(Big("10000000000000000000000")); // add extra 0.01 NEAR as buffer
  const amountFloat = parseFloat(matchingPoolDonationAmountNear || 0);
  if (!amountFloat) {
    State.update({ matchingPoolDonationAmountNearError: "Invalid amount" });
    return;
  }
  const amountIndivisible =
    props.SUPPORTED_FTS[base_currency.toUpperCase()].toIndivisible(amountFloat);
  const transactions = [
    {
      contractName: potId,
      methodName: "donate",
      deposit: amountIndivisible,
      args,
      gas: props.ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ----> // TODO: implement
};

const handleProcessPayouts = () => {
  // TODO: implement admin_process_payouts
  const args = {};
  const transactions = [
    {
      contractName: potId,
      methodName: "admin_process_payouts",
      deposit: "0",
      args,
      gas: props.ONE_TGAS.mul(100),
    },
  ];
  Near.call(transactions);
  // NB: we won't get here if user used a web wallet, as it will redirect to the wallet
  // <---- EXTENSION WALLET HANDLING ----> // TODO: implement
};

// console.log("protocolConfig: ", protocolConfig);

const protocolFeeAmountNear = state.bypassProtocolFee
  ? 0
  : (state.matchingPoolDonationAmountNear * protocolConfig?.basis_points) / 10_000 || 0;

const referrerFeeAmountNear = referrerId
  ? (state.matchingPoolDonationAmountNear * referral_fee_matching_pool_basis_points) / 10_000 || 0
  : 0;

const getApplicationTagText = () => {
  if (applicationNotStarted) return "Application Round Not Started";
  if (applicationOpen) return props.daysUntil(application_end_ms) + " left to apply";
  else return "Application Round Ended";
};

const getMatchingRoundTagText = () => {
  if (publicRoundNotStarted) return "Matching Round Not Started";
  if (publicRoundOpen) return props.daysUntil(public_round_end_ms) + " left in round";
  else return "Matching Round Ended";
};

return (
  <Container>
    <Column style={{ gap: "24px" }}>
      <Title>{pot_name}</Title>
      <Row style={{ gap: "24px" }}>
        {/* Application tag */}
        <Widget
          src={`${ownerId}/widget/Pots.Tag`}
          props={{
            ...props,
            backgroundColor: applicationOpen ? "#EFFEFA" : "#EBEBEB",
            borderColor: applicationOpen ? "#33DDCB" : "#DBDBDB",
            textColor: applicationOpen ? "#023131" : "#192C07",
            text: getApplicationTagText(),
            textStyle: { fontWeight: 500, marginLeft: applicationOpen ? "8px" : "0px" },
            preElements: applicationOpen ? (
              <Widget
                src={`${ownerId}/widget/Components.Indicator`}
                props={{
                  colorOuter: "#CAFDF3",
                  colorInner: "#33DDCB",
                  animate: true,
                }}
              />
            ) : null,
          }}
        />
        {/* Matching round tag */}
        <Widget
          src={`${ownerId}/widget/Pots.Tag`}
          props={{
            ...props,
            backgroundColor: publicRoundOpen ? "#F7FDE8" : "#EBEBEB",
            borderColor: publicRoundOpen ? "#9ADD33" : "#DBDBDB",
            textColor: "#192C07",
            text: getMatchingRoundTagText(),
            textStyle: { fontWeight: 500, marginLeft: publicRoundOpen ? "8px" : "0px" },
            preElements: publicRoundOpen ? (
              <Widget
                src={`${ownerId}/widget/Components.Indicator`}
                props={{
                  colorOuter: "#D7F5A1",
                  colorInner: "#9ADD33",
                  animate: true,
                }}
              />
            ) : null,
          }}
        />
      </Row>
      <Description>{pot_description}</Description>
      <Row style={{ width: "100%" }}>
        <Column style={{ width: "100%" }}>
          <H3>{`${props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(
            total_public_donations
          )}  ${base_currency.toUpperCase()}`}</H3>
          <TotalsSubtext>donated</TotalsSubtext>
        </Column>
        <Column style={{ width: "100%" }}>
          <H3>{public_donations_count}</H3>
          <TotalsSubtext>{`Donor${public_donations_count !== 1 ? "s" : ""}`}</TotalsSubtext>
        </Column>
      </Row>
    </Column>
    <Column>
      <ColumnRightSegment
        style={{ borderTop: "1px #7B7B7B solid", borderBottom: "1px #7B7B7B solid" }}
      >
        <Row style={{ gap: "8px" }}>
          <H2>{`${props.SUPPORTED_FTS[base_currency.toUpperCase()].fromIndivisible(
            matching_pool_balance
          )} ${base_currency.toUpperCase()} `}</H2>
          <Description>Matching funds available</Description>
        </Row>
      </ColumnRightSegment>
      <ColumnRightSegment>
        {applicationOpen && (
          <>
            <Row
              style={{
                // marginTop: "24px",
                marginBottom: "8px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Row>
                <Widget
                  src={`${ownerId}/widget/Components.Indicator`}
                  props={{
                    colorOuter: "#CAFDF3",
                    colorInner: "#33DDCB",
                    animate: true,
                  }}
                />
                <StatusText style={{ color: "#0B7A74" }}>All applications are open</StatusText>
              </Row>
              <StatusText style={{ color: "#292929" }}>
                {props.daysUntil(application_end_ms) + " to go"}
              </StatusText>
            </Row>
            <H4>
              Application starts on <Time>{formatDate(application_start_ms)}</Time> and ends on{" "}
              <Time>{formatDate(application_end_ms)}</Time>
            </H4>
          </>
        )}
        {publicRoundOpen && (
          <>
            <Row
              style={{
                marginTop: applicationOpen ? "24px" : "0px",
                marginBottom: "8px",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Row>
                <Widget
                  src={`${ownerId}/widget/Components.Indicator`}
                  props={{
                    colorOuter: "#D7F5A1",
                    colorInner: "#9ADD33",
                    animate: true,
                  }}
                />
                <StatusText style={{ color: "#4A7714" }}>Matching round live</StatusText>
              </Row>
              <StatusText style={{ color: "#292929" }}>
                {"Ends in " + props.daysUntil(public_round_end_ms)}
              </StatusText>
            </Row>
            <H4>
              Round starts on <Time>{formatDate(public_round_start_ms)}</Time> and ends on{" "}
              <Time>{formatDate(public_round_end_ms)}</Time>
            </H4>
          </>
        )}
        {publicRoundClosed && (
          <Row>
            <Widget
              src={`${ownerId}/widget/Components.Indicator`}
              props={{
                colorOuter: "#DBDBDB",
                colorInner: "#A6A6A6",
              }}
            />
            <StatusText style={{ color: "#525252" }}>Matching Round Ended</StatusText>
          </Row>
        )}
      </ColumnRightSegment>
      <Row style={{ gap: "24px" }}>
        {canApply && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: registryRequirementMet ? "Apply to pot" : "Register to Apply",
              onClick: registryRequirementMet ? handleApplyToPot : null,
              href: registryRequirementMet ? null : props.hrefWithEnv(`?tab=createproject`),
              target: "_self",
            }}
          />
        )}
        {now < public_round_end_ms && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: publicRoundOpen || canApply ? "secondary" : "primary",
              text: "Fund matching pool",
              onClick: handleFundMatchingPool,
            }}
          />
        )}
        {publicRoundOpen && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              type: "primary",
              text: sybilRequirementMet ? "Donate to projects" : "Verify to Donate",
              href: sybilRequirementMet
                ? props.hrefWithEnv(`?tab=pot&potId=${potId}&nav=projects`)
                : NADA_BOT_URL,
              target: sybilRequirementMet ? "_self" : "_blank",
            }}
          />
        )}
        {canPayoutsBeSet && (
          <Widget
            src={`${ownerId}/widget/Pots.CalculateSetPayoutsButton`}
            props={{
              ...props,
              potDetail,
            }}
          />
        )}
        {canPayoutsBeProcessed && (
          <Widget
            src={`${ownerId}/widget/Components.Button`}
            props={{
              ...props,
              type: "primary",
              text: "Process Payouts",
              onClick: handleProcessPayouts,
            }}
          />
        )}
        {cooldownPeriodInProgress && (
          <div>Cooldown period ends on {formatDate(cooldown_end_ms)}</div>
        )}
        {potComplete && <div style={{ color: "red" }}>Pot complete</div>}
      </Row>
    </Column>
    <Widget
      src={`${ownerId}/widget/Components.Modal`}
      props={{
        ...props,
        isModalOpen: state.isMatchingPoolModalOpen,
        onClose: () => State.update({ isMatchingPoolModalOpen: false }),
        children: (
          <>
            <ModalTitle>
              Enter matching pool contribution amount in NEAR
              {["0", "1"].includes(min_matching_pool_donation_amount)
                ? "(no minimum)"
                : `(Min. ${props.yoctosToNear(min_matching_pool_donation_amount)})`}
            </ModalTitle>
            <Widget
              src={`${ownerId}/widget/Inputs.Text`}
              props={{
                inputStyle: {
                  background: "#FAFAFA",
                },
                placeholder: "Enter amount here in NEAR",
                value: state.matchingPoolDonationAmountNear,
                onChange: (matchingPoolDonationAmountNear) =>
                  State.update({ matchingPoolDonationAmountNear }),
                validate: () => {
                  // TODO: add validation logic here
                  State.update({ matchingPoolDonationAmountNearError: "" });
                },
                error: state.matchingPoolDonationAmountNearError,
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
                value: state.matchingPoolDonationMessage,
                onChange: (matchingPoolDonationMessage) =>
                  State.update({ matchingPoolDonationMessage }),
                validate: () => {
                  if (state.matchingPoolDonationMessage.length > MAX_DONATION_MESSAGE_LENGTH) {
                    State.update({
                      matchingPoolDonationMessageError: `Message must be less than ${MAX_DONATION_MESSAGE_LENGTH} characters`,
                    });
                    return;
                  }

                  State.update({ matchingPoolDonationMessageError: "" });
                },
                error: state.matchingPoolDonationMessageError,
              }}
            />
            {/* <props.ToDo>Display fees breakdown and amount after fees</props.ToDo> */}
            <Row>
              <Widget
                src={`${ownerId}/widget/Inputs.Checkbox`}
                props={{
                  id: "bypassFeeSelector",
                  checked: state.bypassProtocolFee,
                  onClick: (e) => {
                    State.update({ bypassProtocolFee: e.target.checked });
                  },
                }}
              />
              <Label htmlFor="bypassFeeSelector">
                Bypass protocol fee ({protocolConfig?.basis_points / 100 || "-"}%)
              </Label>
            </Row>
            <Row style={{ marginTop: "12px" }}>
              <FeeText>
                Protocol fee (to {protocolConfig?.account_id}): {protocolFeeAmountNear} NEAR
              </FeeText>
            </Row>
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
                {state.matchingPoolDonationAmountNear -
                  protocolFeeAmountNear -
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
                    !state.matchingPoolDonationAmountNear ||
                    !!state.matchingPoolDonationAmountNearError ||
                    !parseFloat(state.matchingPoolDonationAmountNear),
                  text: `Contribute${
                    state.matchingPoolDonationAmountNear
                      ? ` ${state.matchingPoolDonationAmountNear} ${base_currency.toUpperCase()}`
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
  </Container>
);
