const {account, ftList, widgetProvider} = props;
const maxHeight = props.maxHeight || 400;
const boxShadow = props.boxShadow || "3px 2px 24px rgba(68, 152, 224, 0.3)";
const apiUrl = `https://api.pikespeak.ai/daos/bounties/${account}`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;
const userAccountId = context.accountId;
const apiBountyDoneUrl = `https://api.pikespeak.ai/daos/bounty-done-by-target/${account}?target=${userAccountId}`;
const apiBountyClaimsUrl = `https://api.pikespeak.ai/daos/bounty-claims/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const bountiesRes = fetch(apiUrl, {
    mode: "cors",
    headers: {
        "x-api-key": publicApiKey,
    },
});

const bounties = bountiesRes.body && bountiesRes.body.length && bountiesRes.body.sort((a, b) => b.id - a.id);


const CardWrapper = styled.div`
  position: relative;
  box-shadow: ${boxShadow};
  border-radius: 4px;
  padding: 20px;
  margin: 40px 0px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`;

const Label = styled.span`
  color: #8c8c8c;
  font-size: 11px;
`;

const Description = styled.div`
  overflow: auto;
  max-height: 150px;
`;

const forgeUrl = (apiUrl, params) =>
    apiUrl +
    Object.keys(params).reduce(
        (paramString, p) => paramString + `${p}=${params[p]}&`,
        "?"
    );

const parseDescription = (description) => {
    const parsedDesc = description
        .replaceAll("$$$$", " ")
        .replaceAll("\n\n", " ");
    const parts = parsedDesc.split(" ");

    const parsedParts = parts.map((p) => {
        const url = p.match(/https:\/\/\S*/g);
        if (url) {
            return (
                <a href={p} target="_blank">
                    {p}
                </a>
            );
        }
        return p + " ";
    });

    return parsedParts;
};

const fetchPolicy = (params) => {
    const policy = fetch(forgeUrl(apiPolicyUrl, params), {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    })

    policy.body && State.update({
        policy: policy.body,
    });
};

!state.policy && fetchPolicy({daos: [account]});

const fetchClaims = (params) => {
    asyncFetch(forgeUrl(apiBountyClaimsUrl, params), {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    }).then(({err, body, ok}) => {
        if (ok) {
            State.update({
                userClaims: body,
            });
        }
    });
}

!state.userClaims && fetchClaims({account: userAccountId});

const fetchClaimBountyDone = () => {
    asyncFetch(apiBountyDoneUrl, {
        mode: "cors",
        headers: {
            "x-api-key": publicApiKey,
        },
    }).then(({err, body, ok}) => {
        if (ok) {
            State.update({
                claimedBountyDone: body,
            });
        }
    });
}

userAccountId && !state.claimedBountyDone && fetchClaimBountyDone();

const claimBounty = (bounty) => {
    State.update({
        isModalOpen: true,
        modalType: 'claim',
        bountyId: bounty.id,
        formattedBountyDeadline: formatCountdown(Number(b.max_deadline) / Math.pow(10, 9))
    })
}


const formatCountdown = (seconds) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds - d * 24 * 3600) / 3600);
    const m = Math.floor((seconds - d * 24 * 3600 - h * 3600) / 60);
    const s = Math.floor(seconds - d * 24 * 3600 - h * 3600 - m * 60);

    let res = "";

    if (d > 0) {
        res += `${d}d `;
    }

    if (h > 0) {
        res += `${h}h `;
    }

    if (m > 0) {
        res += `${m}m `;
    }

    if (!res && s > 0 && s < 60) {
        res = "less than a minute";
    }

    return res;
};

let TimeLeft = styled.span`
  color: rgba(68, 152, 224);
`;

let Status = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: bold;
  color: ${(props) => {
    switch (props.status) {
      case "Done":
        return "#ff5e03";
      case "Active":
        return "#13a36e";
      case "In progress":
        return "#ff8743";
    }
  }}
`;

let ClaimButton = styled.button`
  position: absolute;
  top: 60px;
  right: 20px;
`;

let ClaimMsg = styled.p`
  position: absolute;
  top: 60px;
  right: 20px;
`;

const ClaimBountyCard = <Widget
    src={`${widgetProvider}/widget/NDC-bounty-claim`}
    props={{
        account,
        bountyBond: state.policy.state.policy.bounty_bond,
        bounty: bounties && bounties.find((b) => b.id === state.bountyId),
        formattedBountyDeadline: state.formattedBountyDeadline
    }}
/>

const BountyDone = <Widget
    src={`${widgetProvider}/widget/NDC-bounty-done`}
    props={{
        account,
        bountyBond: state.policy.state.policy.bounty_bond,
        bounty: bounties && bounties.find((b) => b.id === state.bountyId),
        target: userAccountId
    }}
/>


const UserClaim = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background: rgba(68, 152, 224, 0.1);
  padding: 10px;
  border-radius: 4px;
`;

const openProposal = (bountyId) => {
    State.update({
        isModalOpen: true,
        modalType: 'bountyDone',
        bountyId
    })
}
const getUserClaimComp = (claim, proposal) => {
    if(!claim) return "";
    if(!proposal) {
        return <UserClaim>
            <p>You have claimed this bounty!</p>
            <p>If your work is done you can
                <button onClick={() => openProposal(claim.bounty_id)}>send a bountyDone proposal</button>
            </p>
        </UserClaim>;
    } else {
        return <UserClaim>
            <p>You have made a bountyDone proposal for this bounty! Check it here: </p>
            <a
                href={`https://near.org/${widgetProvider}/widget/NDC-Page?tab=proposal&proposal_id=${proposal.proposal_id}`}
                target="_blank"
            >
                {proposal.proposal_id}
            </a>
        </UserClaim>
    }
}

const toggleModal = (isOpen) => {
    State.update({isModalOpen: isOpen});
};
const getStatus = (b) => {
    switch (true) {
        case (b.times === 0):
            return "Done";
        case (b.times === b.claimNumber):
            return "In progress";
        case (b.times != b.claimNumber):
            return "Active"
    }
}

const getModalWidget = (type) => {
    switch(type) {
        case "claim":
            return ClaimBountyCard;
        case "bountyDone":
            return BountyDone;
    }
}

return (
    <div style={{marginTop: "40px"}}>
        {state.isModalOpen && state.policy && <Widget
            src={`${widgetProvider}/widget/NDC-modal`}
            props={{
                isOpen: state.isModalOpen,
                toggleModal,
                component: getModalWidget(state.modalType),
            }}
        />}
        <h2>Bounties</h2>
        {bountiesRes && bountiesRes.body.length && state.policy && ftList ? bounties.map((b) =>
            <CardWrapper>
                <Status status={getStatus(b)}>
                    {getStatus(b)}
                </Status>
                {b.times && b.times != b.claimNumber ? <ClaimButton onClick={() => claimBounty(b)}>
                    Claim
                </ClaimButton> : b.times === b.claimNumber && b.times != 0?
                    <ClaimMsg>All claims has been currently taken for this bounty</ClaimMsg>: ""
                }
                {state.userClaims&&state.claimedBountyDone&&
                    getUserClaimComp(
                        state.userClaims.find((us) => us.bounty_id === b.id),
                        state.claimedBountyDone.find((p) => Number(p.proposal.kind.bounty_id) === b.id)
                    )
                }
                <InfoWrapper>
                    <Label>Id</Label>
                    <Description>
                        {b.id}
                    </Description>
                </InfoWrapper>
                <InfoWrapper>
                    <Label>Description</Label>
                    <Description>
                        {parseDescription(b.description)}
                    </Description>
                </InfoWrapper>
                <InfoWrapper>
                    <Label>Reward</Label>
                    <Widget
                        src={`${widgetProvider}/widget/table_ft_formatter`}
                        props={{
                            ftList,
                            ft: b.token,
                            amount: b.amount,
                        }}
                    />
                </InfoWrapper>
                <InfoWrapper>
                    <Label>Deadline</Label>
                    <Description>
                        <TimeLeft>
                            {formatCountdown(Number(b.max_deadline) / Math.pow(10, 9))}
                        </TimeLeft>
                    </Description>
                </InfoWrapper>
                <InfoWrapper>
                    <Label>Claimable</Label>
                    <Description>
                        {b.times} times
                    </Description>
                </InfoWrapper>
                {b.times > 0 &&
                    <InfoWrapper>
                        <Label>Bounty bond</Label>
                        <Widget
                            src={`${widgetProvider}/widget/table_ft_formatter`}
                            props={{
                                ftList,
                                ft: "",
                                amount: state.policy.state.policy.bounty_bond,
                            }}
                        />
                    </InfoWrapper>
                }
            </CardWrapper>
        ) : ""}
        {!bounties && state.policy && <div>There is no bounties for {account}</div>}
    </div>
);
