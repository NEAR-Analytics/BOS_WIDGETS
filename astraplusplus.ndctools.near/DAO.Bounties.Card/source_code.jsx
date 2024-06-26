const { bounty, proposal } = props;

const shorten = (str, len) => {
    if (str.length <= len) {
        return str;
    }
    return str.slice(0, len) + "...";
};

const Claims = styled.div`
    background: #f0f0f087;
    padding: 15px;
    border-radius: 10px;
`;

const Wrapper = styled.div`
    border: 1px solid transparent;
    width: max-content;

    &:hover {
        border: 1px solid #4498e0;
    }

    a {
        color: #4498e0;
        text-decoration: none;

        &:hover {
        color: #4498e0cc;
    }
`;

const Icon = ({ success }) => {
    return (
        <div>
            {success ? (
                <i
                    class="bi-check-circle large"
                    style={{
                        fontSize: "27px",
                        color: "rgba(130, 226, 153, 1)"
                    }}
                ></i>
            ) : (
                <i
                    class="bi-dash-circle large"
                    style={{ fontSize: "27px", color: "rgba(241, 157, 56, 1)" }}
                ></i>
            )}
        </div>
    );
};

const IconWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NEARSym = () => {
    return (
        <svg
            width={"32px"}
            height={"32px"}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="16" cy="16" r="16" fill="black"></circle>
            <g clip-path="url(#clip0000000003)">
                <path
                    d="M20.8422 8.84471L17.4978 13.776C17.4501 13.847 17.43 13.9328 17.4411 14.0174C17.4522 14.102 17.4938 14.1798 17.5582 14.2363C17.6225 14.2928 17.7053 14.3243 17.7913 14.3249C17.8772 14.3254 17.9604 14.2951 18.0256 14.2395L21.3178 11.4036C21.3371 11.3865 21.361 11.3753 21.3866 11.3714C21.4122 11.3675 21.4383 11.3711 21.4619 11.3818C21.4855 11.3924 21.5054 11.4096 21.5193 11.4314C21.5331 11.4531 21.5403 11.4783 21.54 11.504V20.3824C21.54 20.4095 21.5316 20.4361 21.5158 20.4583C21.5001 20.4806 21.4779 20.4975 21.4522 20.5068C21.4265 20.516 21.3985 20.5172 21.3721 20.5102C21.3456 20.5031 21.322 20.4882 21.3044 20.4673L11.3533 8.63726C11.1933 8.44956 10.994 8.29873 10.7693 8.19525C10.5446 8.09178 10.2999 8.03815 10.0522 8.03809H9.70444C9.2524 8.03809 8.81887 8.21642 8.49922 8.53386C8.17957 8.8513 8 9.28185 8 9.73078V22.2351C8 22.684 8.17957 23.1145 8.49922 23.432C8.81887 23.7494 9.2524 23.9277 9.70444 23.9277V23.9277C9.99591 23.9278 10.2825 23.8537 10.537 23.7125C10.7914 23.5713 11.0051 23.3677 11.1578 23.1211L14.5022 18.1898C14.5499 18.1188 14.57 18.033 14.5589 17.9484C14.5478 17.8638 14.5062 17.7861 14.4418 17.7295C14.3775 17.673 14.2947 17.6415 14.2087 17.641C14.1228 17.6404 14.0396 17.6707 13.9744 17.7264L10.6822 20.5622C10.6629 20.5794 10.639 20.5906 10.6134 20.5944C10.5878 20.5983 10.5617 20.5947 10.5381 20.5841C10.5145 20.5734 10.4946 20.5562 10.4807 20.5345C10.4669 20.5128 10.4597 20.4875 10.46 20.4618V11.5813C10.46 11.5541 10.4684 11.5276 10.4842 11.5053C10.4999 11.483 10.5221 11.4661 10.5478 11.4568C10.5735 11.4476 10.6015 11.4464 10.6279 11.4534C10.6544 11.4605 10.678 11.4755 10.6956 11.4963L20.6456 23.3286C20.8056 23.5163 21.0049 23.6671 21.2296 23.7706C21.4543 23.874 21.699 23.9277 21.9467 23.9277H22.2944C22.5184 23.9279 22.7401 23.8842 22.947 23.7992C23.154 23.7142 23.342 23.5895 23.5004 23.4324C23.6588 23.2752 23.7844 23.0885 23.8702 22.8831C23.9559 22.6776 24 22.4574 24 22.2351V9.73078C24 9.28185 23.8204 8.8513 23.5008 8.53386C23.1811 8.21642 22.7476 8.03809 22.2956 8.03809C22.0041 8.03801 21.7175 8.11211 21.4631 8.25332C21.2086 8.39453 20.9949 8.59814 20.8422 8.84471V8.84471Z"
                    fill="white"
                ></path>
            </g>
            <defs>
                <clipPath id="clip00033">
                    <rect
                        width="16"
                        height="16"
                        fill="white"
                        transform="translate(8 7.9834)"
                    ></rect>
                </clipPath>
            </defs>
        </svg>
    );
};

const getTokenInfo = (bounty) => {
    let token;
    let value;
    let icon;

    switch (bounty?.token) {
        case "":
            token = "NEAR";
            value = Big(bounty.amount).div(Big(10).pow(24)).toFixed();
            icon = <NEARSym />;
            break;
        case "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near":
            token = "USDC.e";
            value = Big(bounty.amount).div(Big(10).pow(6)).toFixed();
            icon = "";
            break;
    }

    return { token, value, icon };
};

const getStatusVariant = (bounty, claim) => {
    let statusicon;
    let statustext;
    let statusvariant;

    const prop = bounty?.bountyDoneProposals.find(
        (doneProp) => doneProp.bountyClaimId === claim.id
    );

    switch (prop.status) {
        case "Approved":
            statusicon = "bi bi-check-circle";
            statustext = prop.status;
            statusvariant = "success";
            break;
        case "InProgress":
            statusicon = "spinner-border spinner-border-sm";
            statustext = "In Progress";
            statusvariant = "primary";
            break;
        default:
            statusicon = "spinner-border spinner-border-sm";
            statustext = "In Progress";
            statusvariant = "primary";
            break;
    }

    return {
        statusicon,
        statustext,
        statusvariant
    };
};

const formatDate = (date, short) => {
    date = new Date(date);
    return `${
        [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ][date.getMonth()]
    } ${date.getDate()}, ${
        short ? date.getFullYear().toString().slice(-2) : date.getFullYear()
    }`;
};

return (
    <Wrapper className="ndc-card p-4 d-flex flex-column gap-2 h-100 w-100">
        <div className="d-flex gap-3 justify-content-between align-items-center">
            <Widget
                src="nearui.near/widget/Element.Badge"
                props={{
                    children: <>Bounty ID #{bounty?.bountyId}</>,
                    variant: `info round outline`,
                    size: "lg"
                }}
            />
            <Widget
                src="nearui.near/widget/Element.Badge"
                props={{
                    children: formatDate(bounty?.createdAt),
                    variant: `info round`,
                    size: "lg"
                }}
            />
        </div>

        <div className="w-50">
            <div className="text-muted small">Proposer</div>
            <Widget
                src="mob.near/widget/Profile.ShortInlineBlock"
                props={{ accountId: proposal?.proposer, tooltip: true }}
            />
        </div>
        <div className="d-flex justify-content-between gap-4 my-3">
            <IconWrapper>
                <Icon success={proposal?.createdAt} />
                <small className="text-center">
                    Proposal <br /> Phase
                </small>
            </IconWrapper>
            <IconWrapper>
                <Icon success={bounty?.createdAt} />
                <small className="text-center">
                    Available <br /> Bounty
                </small>
            </IconWrapper>
            <IconWrapper>
                <Icon
                    success={
                        !(
                            new Date(parseInt(bounty?.maxDeadline) / 1000) >
                                new Date() &&
                            bounty?.bountyDoneProposals?.filter(
                                (prop) => prop.kind.type === "BountyDone"
                            ).length === 0
                        )
                    }
                />
                <small className="text-center"> In Progress</small>
            </IconWrapper>
            <IconWrapper>
                <Icon
                    success={
                        bounty?.bountyDoneProposals?.filter(
                            (prop) => prop.kind.type === "BountyDone"
                        ).length > 0
                    }
                />
                <small> Completed</small>
            </IconWrapper>
        </div>
        <div className="text-muted small">Description</div>
        <div className="small">
            <Markdown text={bounty?.description?.replace(/\${4,}/, "\n")} />
        </div>
        <div className="d-flex justify-content-between">
            <div className="text-muted small">Amount</div>
            <div>
                <span className="symbol">{getTokenInfo(bounty).icon}</span>
                <b>{getTokenInfo(bounty).value}</b>
                {getTokenInfo(bounty).token}
            </div>
        </div>
        {/* <div className="d-flex justify-content-between gap-3">
            <Widget
                src="nearui.near/widget/Input.Button"
                props={{
                    children: (
                        <>
                            <i className="bi bi-chat-left"></i>
                            {props.commentsCount} comments
                        </>
                    ),
                    variant: "outline info w-100"
                }}
            />
            <Widget
                src="nearui.near/widget/Input.Button"
                props={{
                    children: (
                        <>
                            <i className="bi bi-ok"></i>
                            Claim
                        </>
                    ),
                    variant: "info w-100"
                }}
            />
        </div> */}

        <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="text-muted small">Claimers</div>
            <div>
                {bounty?.numberOfClaims} / {bounty?.times}
            </div>
        </div>
        {bounty?.bountyClaims?.map((claim) => (
            <Claims className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column gap-2">
                    <div className="text-muted small">Claimed by</div>
                    <small>
                        <b>{claim.accountId}</b>
                    </small>
                </div>
                <div className="d-flex flex-column gap-2">
                    <Widget
                        src="nearui.near/widget/Element.Badge"
                        props={{
                            children: (
                                <>
                                    <i
                                        className={
                                            getStatusVariant(bounty, claim)
                                                .statusicon
                                        }
                                        style={{
                                            fontSize: "16px",
                                            marginRight: "5px",
                                            borderWidth: "2px",
                                            animationDuration: "3s"
                                        }}
                                    ></i>
                                    {getStatusVariant(bounty, claim).statustext}
                                </>
                            ),
                            variant: `${
                                getStatusVariant(bounty, claim).statusvariant
                            } round`,
                            size: "md"
                        }}
                    />
                    <div className="small">
                        {formatDate(parseInt(claim.startTime) / 1000000, true)}{" "}
                        - {formatDate(parseInt(claim.endTime) / 1000000, true)}
                    </div>
                </div>
            </Claims>
        ))}
    </Wrapper>
);
