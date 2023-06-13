// Constants
const {widgetProvider, parent} = props;

const refUrl = "https://api.stats.ref.finance/api/ft";
const tab = props.tab || "overview";
const proposal_id = props.proposal_id;
const selectedDao = props.selectedDao || "ndctrust.sputnik-dao.near";

// Initial state
State.init({
    selectedDao,
});

const WidgetsContainer = styled.div`

`;

// Fetch
const ftList = fetch(refUrl);

// Components

const Balances = (
    <Widget
        src={`${widgetProvider}/widget/account_balance`}
        props={{
            account: state.selectedDao,
            ftList: ftList.body && ftList.body,
            widgetProvider,
        }}
    />
);

const NearTransfers = (
    <Widget
        src={`${widgetProvider}/widget/near_transfers`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const FTransfers = (
    <Widget
        src={`${widgetProvider}/widget/ft_transfers`}
        props={{
            account: state.selectedDao,
            ftList: ftList.body && ftList.body,
            widgetProvider,
        }}
    />
);


const ProposalStatus = (
    <Widget
        src={`${widgetProvider}/widget/proposals-status`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const ProposalsByMonth = (
    <Widget
        src={`${widgetProvider}/widget/proposal-by-month`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const Proposals = (
    <Widget
        src={`${widgetProvider}/widget/proposals`}
        props={{
            account: state.selectedDao,
            ftList: ftList.body && ftList.body,
            widgetProvider,
            parent
        }}
    />
);

const Policy = (
    <Widget
        src={`${widgetProvider}/widget/NDC-policy`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const VotersByProposal = (
    <Widget
        src={`${widgetProvider}/widget/NDC-members-voters`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const VoteHistory = (
    <Widget
        src={`${widgetProvider}/widget/NDC-vote-history`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const TransfersOverview = (
    <Widget
        src={`${widgetProvider}/widget/NDC-transfers-overview`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const TransfersByAccount = (
    <Widget
        src={`${widgetProvider}/widget/NDC-transfers-by-account`}
        props={{
            account: state.selectedDao,
            widgetProvider,
            ftList: ftList.body && ftList.body,
        }}
    />
);

const ProposalCountByAccount = (
    <Widget
        src={`${widgetProvider}/widget/NDC-proposals-count-by-account`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const Search = (
    <Widget
        src={`${widgetProvider}/widget/NDC-search`}
        props={{
            account: state.selectedDao,
            widgetProvider,
            ftList: ftList.body && ftList.body,
            proposal_id,
        }}
    />
);

const AddProposal = (
    <Widget
        src={`${widgetProvider}/widget/NDC-add-proposal`}
        props={{
            account: state.selectedDao,
            widgetProvider,
        }}
    />
);

const Bounties = (
    <Widget
        src={`${widgetProvider}/widget/NDC-bounty-list`}
        props={{
            account: state.selectedDao,
            widgetProvider,
            ftList: ftList.body && ftList.body,
        }}
    />
);

const Tabs = (
    <Widget
        src={`${widgetProvider}/widget/NDC-Tabs`}
        props={{
            widgetProvider,
            parent,
            selectedDao,
            tabs: [
                {
                    value: "overview",
                    label: "Overview",
                    selected: tab === "overview",
                    components: (
                        <WidgetsContainer>
                            {ProposalsByMonth}
                            {TransfersOverview}
                         {/*   {TransfersByAccount}*/}
                            {ProposalStatus}
                        </WidgetsContainer>
                    ),
                },
                {
                    value: "proposals",
                    label: "Proposals",
                    selected: tab === "proposals",
                    components: <WidgetsContainer>{Proposals}</WidgetsContainer>,
                },
                {
                    value: "treasury",
                    label: "Treasury",
                    selected: tab === "treasury",
                    components: (
                        <WidgetsContainer>
                            {Balances}
                            {NearTransfers}
                            {FTransfers}
                        </WidgetsContainer>
                    ),
                },
                {
                    value: "members",
                    label: "Members",
                    selected: tab === "members",
                    components: (
                        <WidgetsContainer>
                            {ProposalCountByAccount}
                            {VoteHistory}
                            {VotersByProposal}
                        </WidgetsContainer>
                    ),
                },
                {
                    value: "policy",
                    label: "Policy",
                    selected: tab === "policy",
                    components: <WidgetsContainer>{Policy}</WidgetsContainer>,
                },
                {
                    value: "proposal",
                    label: "Proposal search",
                    selected: tab === "proposal",
                    components: <WidgetsContainer>{Search}</WidgetsContainer>,
                },
                {
                    value: "addProposal",
                    label: "Add proposal",
                    selected: tab === "addProposal",
                    components: <WidgetsContainer>{AddProposal}</WidgetsContainer>,
                },
                {
                    value: "bounties",
                    label: "Bounties",
                    selected: tab === "bounties",
                    components: <WidgetsContainer>{Bounties}</WidgetsContainer>,
                },
            ],
            widgetProvider,
        }}
    />
);

const selectDao = ({target: {value}}) => {
    State.update({selectedDao: value});
};

const Select = (
    <Widget
        src={`${widgetProvider}/widget/NDC-select`}
        props={{
            options: [
/*
                {value: "pikespeak.sputnik-dao.near", label: "pikespeak"},
*/
                {value: "ndctrust.sputnik-dao.near", label: "Trust"},
                {value: "gwg.sputnik-dao.near", label: "GWG"},
                {value: "marketing.sputnik-dao.near", label: "Marketing"},
                {value: "creativesdao.sputnik-dao.near", label: "Creatives"},
                {value: "neardevgov.sputnik-dao.near", label: "Gov"},
            ],
            selectedOption: state.selectedDao,
            onChange: selectDao,
            top: 29,
        }}
    />
);

return (
    <>
        {props.hasSelector &&Select}
        {Tabs}
    </>
);
